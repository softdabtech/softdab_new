"""
Email template renderer for client confirmation emails
"""
import os
import logging
from datetime import datetime
from typing import Dict, Any, Optional
from jinja2 import Template

logger = logging.getLogger(__name__)

class ClientEmailRenderer:
    """Renders client confirmation emails using Jinja2 templates"""
    
    def __init__(self):
        self.template_path = os.path.join(os.path.dirname(__file__), 'templates', 'client_confirmation_email.html')
        self._load_template()
    
    def _load_template(self):
        """Load the email template"""
        try:
            with open(self.template_path, 'r', encoding='utf-8') as f:
                self.template = Template(f.read())
        except Exception as e:
            logger.error(f"Failed to load email template: {e}")
            self.template = None
    
    def render_contact_form_email(self, contact_data: Dict[str, Any]) -> str:
        """Render email for regular contact form submission"""
        if not self.template:
            return self._fallback_contact_email(contact_data)
        
        template_vars = {
            'form_type': 'contact_form',
            'form_type_display': 'Contact Form',
            'name': contact_data['name'],
            'email': contact_data['email'],
            'company': contact_data.get('company', ''),
            'phone': contact_data.get('phone', ''),
            'role': contact_data.get('role', ''),
            'service': contact_data.get('service', ''),
            'timeline': contact_data.get('timeline', ''),
            'budget': contact_data.get('budget', ''),
            'message': contact_data.get('message', ''),
            'submission_date': self._format_date(contact_data.get('submitted_at') or datetime.now()),
            'consultation_details': None,
            'priority': None,
            'sla_hours': None,
            'client_type_display': None,
            'assigned_team': None,
            'unsubscribe_url': None
        }
        
        try:
            return self.template.render(**template_vars)
        except Exception as e:
            logger.error(f"Failed to render contact form email template: {e}")
            return self._fallback_contact_email(contact_data)
    
    def render_expert_consultation_email(self, consultation_data: Dict[str, Any], routing_info: Dict[str, Any]) -> str:
        """Render email for expert consultation submission"""
        if not self.template:
            return self._fallback_expert_email(consultation_data, routing_info)
        
        # Parse details if it's a JSON string
        details = consultation_data.get('details', {})
        if isinstance(details, str):
            try:
                import json
                details = json.loads(details)
            except:
                details = {}
        
        # Format details for display
        consultation_details = []
        if details:
            detail_labels = {
                'stage': 'Project Stage',
                'budget_range': 'Budget',
                'timeline': 'Timeline',
                'founders_count': 'Number of Founders',
                'target_markets': 'Target Markets',
                'traction_metrics': 'Traction Metrics',
                'tech_stack': 'Tech Stack',
                'nda_required': 'NDA Required',
                'product_size': 'Product Size',
                'team_size': 'Team Size',
                'major_pain': 'Major Pain Point',
                'current_stack': 'Current Stack',
                'active_users': 'Active Users',
                'sla_requirements': 'SLA Requirements',
                'compliance_needs': 'Compliance Needs',
                'deployment_model': 'Deployment Model',
                'project_type': 'Project Type',
                'duration': 'Duration',
                'repo_access': 'Repository Access',
                'ci_cd': 'CI/CD',
                'deliverables': 'Deliverables',
                'acceptance_criteria': 'Acceptance Criteria',
                'procurement_process': 'Procurement Process',
                'roles_needed': 'Required Roles',
                'start_date': 'Start Date',
                'engagement_length': 'Engagement Length',
                'interview_process': 'Interview Process',
                'timezone_overlap': 'Timezone Overlap',
                'security_clearances': 'Security Clearances'
            }
            
            for key, value in details.items():
                if value and key in detail_labels:
                    if isinstance(value, bool):
                        value = 'Yes' if value else 'No'
                    consultation_details.append((detail_labels[key], str(value)))
        
        # Client type display names
        client_type_map = {
            'startup': 'Startup',
            'product': 'Product Company',
            'outsourcing': 'Project Outsourcing',
            'outstaff': 'Team Extension'
        }
        
        template_vars = {
            'form_type': 'expert_consultation',
            'form_type_display': 'Expert Consultation',
            'name': consultation_data['name'],
            'email': consultation_data['email'],
            'company': consultation_data.get('company', ''),
            'phone': consultation_data.get('phone', ''),
            'role': None,  # Not in expert consultation form
            'service': None,  # Not in expert consultation form
            'timeline': None,  # Not in expert consultation form  
            'budget': None,  # Not in expert consultation form
            'message': consultation_data.get('brief_message', ''),
            'submission_date': self._format_date(consultation_data.get('submitted_at') or datetime.now()),
            'consultation_details': consultation_details,
            'priority': consultation_data.get('priority', 5),
            'sla_hours': routing_info.get('sla_hours', 24),
            'client_type_display': client_type_map.get(consultation_data.get('client_type', ''), 'Consultation'),
            'assigned_team': ', '.join(routing_info.get('assigned_to', ['SoftDAB Team'])),
            'unsubscribe_url': None
        }
        
        try:
            return self.template.render(**template_vars)
        except Exception as e:
            logger.error(f"Failed to render expert consultation email template: {e}")
            return self._fallback_expert_email(consultation_data, routing_info)
    
    def _format_date(self, date_obj) -> str:
        """Format date for display"""
        if isinstance(date_obj, str):
            try:
                date_obj = datetime.fromisoformat(date_obj.replace('Z', '+00:00'))
            except:
                return date_obj
        
        if isinstance(date_obj, datetime):
            return date_obj.strftime('%d.%m.%Y в %H:%M')
        
        return str(date_obj)
    
    def _fallback_contact_email(self, contact_data: Dict[str, Any]) -> str:
        """Fallback plain HTML email for contact form"""
        return f"""
        <html>
        <body style='font-family:Arial,sans-serif;background:#f9f9f9;padding:24px;'>
            <div style='max-width:600px;margin:auto;background:#fff;border-radius:8px;padding:32px;box-shadow:0 2px 8px #eee;'>
                <h2 style='color:#2F89FC;'>Thank you for reaching out!</h2>
                <p>Dear <b>{contact_data['name']}</b>,</p>
                <p>We've received your message and will get back to you shortly (typically within 24 hours).</p>
                
                <div style='background:#f8f9fa;padding:16px;border-radius:8px;margin:16px 0;'>
                    <h3 style='margin:0 0 12px 0;color:#333;'>Your submission details:</h3>
                    <p><b>Company:</b> {contact_data.get('company', 'Not specified')}</p>
                    <p><b>Email:</b> {contact_data['email']}</p>
                    <p><b>Service:</b> {contact_data.get('service', 'Not specified')}</p>
                    <p><b>Budget:</b> {contact_data.get('budget', 'Not specified')}</p>
                    <p><b>Message:</b> {contact_data.get('message', 'Not specified')}</p>
                </div>
                
                <p style='color:#666;font-size:13px;'>Best regards,<br>SoftDAB Team<br>info@softdab.tech</p>
            </div>
        </body>
        </html>
        """
    
    def _fallback_expert_email(self, consultation_data: Dict[str, Any], routing_info: Dict[str, Any]) -> str:
        """Fallback plain HTML email for expert consultation"""
        return f"""
        <html>
        <body style='font-family:Arial,sans-serif;background:#f9f9f9;padding:24px;'>
            <div style='max-width:600px;margin:auto;background:#fff;border-radius:8px;padding:32px;box-shadow:0 2px 8px #eee;'>
                <h2 style='color:#2F89FC;'>Thank you for your consultation request!</h2>
                <p>Dear <b>{consultation_data['name']}</b>,</p>
                <p>We've received your expert consultation request and will contact you within <b>{routing_info.get('sla_hours', 24)} hours</b>.</p>
                
                <div style='background:#f8f9fa;padding:16px;border-radius:8px;margin:16px 0;'>
                    <h3 style='margin:0 0 12px 0;color:#333;'>Your submission details:</h3>
                    <p><b>Consultation Type:</b> {consultation_data.get('client_type', 'Not specified')}</p>
                    <p><b>Company:</b> {consultation_data.get('company', 'Not specified')}</p>
                    <p><b>Email:</b> {consultation_data['email']}</p>
                    <p><b>Phone:</b> {consultation_data.get('phone', 'Not specified')}</p>
                    <p><b>Priority:</b> {consultation_data.get('priority', 5)}/10</p>
                    <p><b>Message:</b> {consultation_data.get('brief_message', 'Not specified')}</p>
                </div>
                
                <p style='color:#666;font-size:13px;'>Best regards,<br>SoftDAB Team<br>info@softdab.tech</p>
            </div>
        </body>
        </html>
        """

# Global instance
email_renderer = ClientEmailRenderer()