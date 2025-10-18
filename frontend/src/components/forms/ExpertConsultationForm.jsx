// frontend/src/components/forms/ExpertConsultationForm.jsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';

const ExpertConsultationForm = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Common fields
    clientType: '',
    name: '',
    email: '',
    company: '',
    briefMessage: '',
    phone: '',
    consent: false,
    
    // Honeypot
    website: '',
    
    // Type-specific fields
    startup: {
      stage: '',
      budgetRange: '',
      timeline: '',
      foundersCount: '',
      targetMarkets: '',
      tractionMetrics: '',
      techStack: '',
      ndaRequired: false
    },
    product: {
      productSize: '',
      teamSize: '',
      majorPain: '',
      currentStack: '',
      activeUsers: '',
      slaRequirements: '',
      complianceNeeds: '',
      deploymentModel: ''
    },
    outsourcing: {
      projectType: '',
      duration: '',
      budgetRange: '',
      repoAccess: false,
      ciCd: '',
      deliverables: '',
      acceptanceCriteria: '',
      procurementProcess: ''
    },
    outstaff: {
      rolesNeeded: '',
      startDate: '',
      engagementLength: '',
      interviewProcess: '',
      timezoneOverlap: '',
      securityClearances: ''
    }
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateTypeField = (type, field, value) => {
    setFormData(prev => ({
      ...prev,
      [type]: { ...prev[type], [field]: value }
    }));
  };

  const trackEvent = (eventName, params = {}) => {
    console.log(`📊 GA4 Event: ${eventName}`, params);
    if (window.gtag) {
      window.gtag('event', eventName, params);
    }
  };

  const validateStep1 = () => {
    if (!formData.clientType) {
      toast.error('Please select your client type');
      return false;
    }
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast.error('Please enter a valid email');
      return false;
    }
    if (!formData.briefMessage.trim()) {
      toast.error('Please tell us about your needs');
      return false;
    }
    return true;
  };

  const handleContinue = () => {
    if (!validateStep1()) return;
    
    trackEvent('contact_form_step_complete', {
      type: formData.clientType,
      step: 1
    });
    
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast.error('Please accept the privacy policy to continue');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare submission data
      const submission = {
        client_type: formData.clientType,
        name: formData.name,
        email: formData.email,
        company: formData.company || null,
        brief_message: formData.briefMessage,
        phone: formData.phone || null,
        consent: formData.consent,
        website: formData.website, // honeypot
        utm_source: new URLSearchParams(window.location.search).get('utm_source'),
        utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
        utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
        referrer: document.referrer,
        page_url: window.location.href
      };

      // Add type-specific details
      if (formData.clientType === 'startup') {
        submission.startup_details = formData.startup;
      } else if (formData.clientType === 'product') {
        submission.product_details = formData.product;
      } else if (formData.clientType === 'outsourcing') {
        submission.outsourcing_details = formData.outsourcing;
      } else if (formData.clientType === 'outstaff') {
        submission.outstaff_details = formData.outstaff;
      }

      const response = await fetch('/api/expert-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission)
      });

      const data = await response.json();

      if (response.ok) {
        trackEvent('contact_form_submitted', {
          type: formData.clientType,
          priority: data.priority
        });

        toast.success('Request submitted successfully! We\'ll respond within 24 hours.');
        onClose();
        
        // Reset form
        setStep(1);
        setFormData({
          clientType: '',
          name: '',
          email: '',
          company: '',
          briefMessage: '',
          phone: '',
          consent: false,
          website: '',
          startup: { stage: '', budgetRange: '', timeline: '', foundersCount: '', targetMarkets: '', tractionMetrics: '', techStack: '', ndaRequired: false },
          product: { productSize: '', teamSize: '', majorPain: '', currentStack: '', activeUsers: '', slaRequirements: '', complianceNeeds: '', deploymentModel: '' },
          outsourcing: { projectType: '', duration: '', budgetRange: '', repoAccess: false, ciCd: '', deliverables: '', acceptanceCriteria: '', procurementProcess: '' },
          outstaff: { rolesNeeded: '', startDate: '', engagementLength: '', interviewProcess: '', timezoneOverlap: '', securityClearances: '' }
        });
      } else {
        throw new Error(data.detail || 'Submission failed');
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      trackEvent('contact_form_error', {
        type: formData.clientType,
        error: error.message
      });
      toast.error('An error occurred. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTypeSpecificFields = () => {
    if (formData.clientType === 'startup') {
      return (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Startup Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="stage">Project Stage *</Label>
              <Select value={formData.startup.stage} onValueChange={(val) => updateTypeField('startup', 'stage', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idea">Idea</SelectItem>
                  <SelectItem value="concept">Concept</SelectItem>
                  <SelectItem value="mvp">MVP</SelectItem>
                  <SelectItem value="growth">Growth</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="budgetRange">Budget Range (USD)</Label>
              <Select value={formData.startup.budgetRange} onValueChange={(val) => updateTypeField('startup', 'budgetRange', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-20k">Under $20k</SelectItem>
                  <SelectItem value="20k-50k">$20k - $50k</SelectItem>
                  <SelectItem value="50k-100k">$50k - $100k</SelectItem>
                  <SelectItem value="100k-200k">$100k - $200k</SelectItem>
                  <SelectItem value="200k+">$200k+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="timeline">Timeline</Label>
              <Select value={formData.startup.timeline} onValueChange={(val) => updateTypeField('startup', 'timeline', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">Urgent (1-2 weeks)</SelectItem>
                  <SelectItem value="1-3-months">1-3 months</SelectItem>
                  <SelectItem value="3-6-months">3-6 months</SelectItem>
                  <SelectItem value="6-months+">6+ months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="foundersCount">Number of Founders</Label>
              <Input
                id="foundersCount"
                type="number"
                min="1"
                value={formData.startup.foundersCount}
                onChange={(e) => updateTypeField('startup', 'foundersCount', e.target.value)}
                placeholder="e.g., 2"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="targetMarkets">Target Markets</Label>
            <Input
              id="targetMarkets"
              value={formData.startup.targetMarkets}
              onChange={(e) => updateTypeField('startup', 'targetMarkets', e.target.value)}
              placeholder="e.g., US, EU, Asia"
            />
          </div>

          <div>
            <Label htmlFor="tractionMetrics">Traction Metrics (users, MRR, etc.)</Label>
            <Textarea
              id="tractionMetrics"
              value={formData.startup.tractionMetrics}
              onChange={(e) => updateTypeField('startup', 'tractionMetrics', e.target.value)}
              placeholder="e.g., 1000 beta users, $5k MRR"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="techStack">Desired Tech Stack</Label>
            <Input
              id="techStack"
              value={formData.startup.techStack}
              onChange={(e) => updateTypeField('startup', 'techStack', e.target.value)}
              placeholder="e.g., React, Node.js, PostgreSQL"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="ndaRequired"
              checked={formData.startup.ndaRequired}
              onCheckedChange={(checked) => updateTypeField('startup', 'ndaRequired', checked)}
            />
            <Label htmlFor="ndaRequired" className="font-normal cursor-pointer">
              NDA Required
            </Label>
          </div>
        </div>
      );
    }

    if (formData.clientType === 'product') {
      return (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Product Company Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="productSize">Product Size *</Label>
              <Select value={formData.product.productSize} onValueChange={(val) => updateTypeField('product', 'productSize', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Early">Early Stage</SelectItem>
                  <SelectItem value="Growth">Growth</SelectItem>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="teamSize">Current Team Size</Label>
              <Select value={formData.product.teamSize} onValueChange={(val) => updateTypeField('product', 'teamSize', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select team size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10</SelectItem>
                  <SelectItem value="11-50">11-50</SelectItem>
                  <SelectItem value="51-200">51-200</SelectItem>
                  <SelectItem value="200+">200+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="majorPain">Main Challenge / Pain Point *</Label>
            <Textarea
              id="majorPain"
              value={formData.product.majorPain}
              onChange={(e) => updateTypeField('product', 'majorPain', e.target.value)}
              placeholder="Describe your main challenge in one sentence"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="currentStack">Current Tech Stack</Label>
            <Input
              id="currentStack"
              value={formData.product.currentStack}
              onChange={(e) => updateTypeField('product', 'currentStack', e.target.value)}
              placeholder="e.g., AWS, React, Python, PostgreSQL"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="activeUsers">Active Users</Label>
              <Input
                id="activeUsers"
                value={formData.product.activeUsers}
                onChange={(e) => updateTypeField('product', 'activeUsers', e.target.value)}
                placeholder="e.g., 10k monthly active"
              />
            </div>

            <div>
              <Label htmlFor="deploymentModel">Deployment Model</Label>
              <Select value={formData.product.deploymentModel} onValueChange={(val) => updateTypeField('product', 'deploymentModel', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cloud">Cloud (AWS/GCP/Azure)</SelectItem>
                  <SelectItem value="on-prem">On-Premise</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="complianceNeeds">Compliance Requirements</Label>
            <Input
              id="complianceNeeds"
              value={formData.product.complianceNeeds}
              onChange={(e) => updateTypeField('product', 'complianceNeeds', e.target.value)}
              placeholder="e.g., HIPAA, GDPR, SOC 2"
            />
          </div>

          <div>
            <Label htmlFor="slaRequirements">SLA Requirements</Label>
            <Textarea
              id="slaRequirements"
              value={formData.product.slaRequirements}
              onChange={(e) => updateTypeField('product', 'slaRequirements', e.target.value)}
              placeholder="Describe your uptime and support needs"
              rows={3}
            />
          </div>
        </div>
      );
    }

    if (formData.clientType === 'outsourcing') {
      return (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Outsourcing Project Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="projectType">Project Type *</Label>
              <Select value={formData.outsourcing.projectType} onValueChange={(val) => updateTypeField('outsourcing', 'projectType', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="greenfield">Greenfield (New Project)</SelectItem>
                  <SelectItem value="rework">Rework / Refactoring</SelectItem>
                  <SelectItem value="migration">Migration</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="duration">Estimated Duration</Label>
              <Select value={formData.outsourcing.duration} onValueChange={(val) => updateTypeField('outsourcing', 'duration', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-3-months">1-3 months</SelectItem>
                  <SelectItem value="3-6-months">3-6 months</SelectItem>
                  <SelectItem value="6-12-months">6-12 months</SelectItem>
                  <SelectItem value="12-months+">12+ months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="budgetRange">Budget Range (USD)</Label>
              <Select value={formData.outsourcing.budgetRange} onValueChange={(val) => updateTypeField('outsourcing', 'budgetRange', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-50k">Under $50k</SelectItem>
                  <SelectItem value="50k-100k">$50k - $100k</SelectItem>
                  <SelectItem value="100k-200k">$100k - $200k</SelectItem>
                  <SelectItem value="200k-500k">$200k - $500k</SelectItem>
                  <SelectItem value="500k+">$500k+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="ciCd">CI/CD Pipeline</Label>
              <Input
                id="ciCd"
                value={formData.outsourcing.ciCd}
                onChange={(e) => updateTypeField('outsourcing', 'ciCd', e.target.value)}
                placeholder="e.g., GitHub Actions, Jenkins"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="deliverables">Expected Deliverables</Label>
            <Textarea
              id="deliverables"
              value={formData.outsourcing.deliverables}
              onChange={(e) => updateTypeField('outsourcing', 'deliverables', e.target.value)}
              placeholder="Describe what you expect to receive"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="acceptanceCriteria">Acceptance Criteria</Label>
            <Textarea
              id="acceptanceCriteria"
              value={formData.outsourcing.acceptanceCriteria}
              onChange={(e) => updateTypeField('outsourcing', 'acceptanceCriteria', e.target.value)}
              placeholder="How will you measure project success?"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="procurementProcess">Procurement Process</Label>
            <Input
              id="procurementProcess"
              value={formData.outsourcing.procurementProcess}
              onChange={(e) => updateTypeField('outsourcing', 'procurementProcess', e.target.value)}
              placeholder="e.g., RFP, direct contract, etc."
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="repoAccess"
              checked={formData.outsourcing.repoAccess}
              onCheckedChange={(checked) => updateTypeField('outsourcing', 'repoAccess', checked)}
            />
            <Label htmlFor="repoAccess" className="font-normal cursor-pointer">
              Repository Access Available
            </Label>
          </div>
        </div>
      );
    }

    if (formData.clientType === 'outstaff') {
      return (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Team Extension Details</h3>
          
          <div>
            <Label htmlFor="rolesNeeded">Roles Needed *</Label>
            <Textarea
              id="rolesNeeded"
              value={formData.outstaff.rolesNeeded}
              onChange={(e) => updateTypeField('outstaff', 'rolesNeeded', e.target.value)}
              placeholder="e.g., 2x Senior Frontend Engineers, 1x QA Lead"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="startDate">Expected Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.outstaff.startDate}
                onChange={(e) => updateTypeField('outstaff', 'startDate', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="engagementLength">Engagement Length</Label>
              <Select value={formData.outstaff.engagementLength} onValueChange={(val) => updateTypeField('outstaff', 'engagementLength', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select length" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3-6-months">3-6 months</SelectItem>
                  <SelectItem value="6-12-months">6-12 months</SelectItem>
                  <SelectItem value="12-months+">12+ months</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="timezoneOverlap">Required Timezone Overlap</Label>
            <Input
              id="timezoneOverlap"
              value={formData.outstaff.timezoneOverlap}
              onChange={(e) => updateTypeField('outstaff', 'timezoneOverlap', e.target.value)}
              placeholder="e.g., 4 hours overlap with EST"
            />
          </div>

          <div>
            <Label htmlFor="interviewProcess">Interview Process Preferences</Label>
            <Textarea
              id="interviewProcess"
              value={formData.outstaff.interviewProcess}
              onChange={(e) => updateTypeField('outstaff', 'interviewProcess', e.target.value)}
              placeholder="Describe your interview requirements"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="securityClearances">Security / Compliance Requirements</Label>
            <Input
              id="securityClearances"
              value={formData.outstaff.securityClearances}
              onChange={(e) => updateTypeField('outstaff', 'securityClearances', e.target.value)}
              placeholder="e.g., Security clearance, NDA, background checks"
            />
          </div>
        </div>
      );
    }

    return null;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Let's Start a Conversation</h2>
            <p className="text-gray-600">Tell us about your project and we'll match you with the right team.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress indicator */}
        {step === 2 && (
          <div className="px-6 py-4 bg-gray-50 border-b">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2">
              <span className="font-medium">Step 2 of 2</span>
              <span>•</span>
              <span>~30 seconds to complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full transition-all duration-300 w-full"></div>
            </div>
          </div>
        )}

        {/* Form Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="clientType" className="text-base">I am a *</Label>
                  <Select 
                    value={formData.clientType} 
                    onValueChange={(val) => {
                      updateField('clientType', val);
                      trackEvent('contact_form_open', { type: val });
                    }}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select your type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="startup">Startup (MVP, Early Stage)</SelectItem>
                      <SelectItem value="product">Product Company (Scaling, Growth)</SelectItem>
                      <SelectItem value="outsourcing">Looking for Outsourcing (Project-Based)</SelectItem>
                      <SelectItem value="outstaff">Looking for Outstaff (Dedicated Team)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-base">Your Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="John Doe"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-base">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="john@company.com"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="company" className="text-base">Company (Optional)</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => updateField('company', e.target.value)}
                      placeholder="Your Company"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-base">Phone (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="briefMessage" className="text-base">Tell us in one sentence what you need *</Label>
                  <Textarea
                    id="briefMessage"
                    value={formData.briefMessage}
                    onChange={(e) => updateField('briefMessage', e.target.value)}
                    placeholder="e.g., We need a mobile app for our fintech startup..."
                    rows={4}
                    className="mt-2"
                  />
                </div>

                {/* Honeypot field (hidden) */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={(e) => updateField('website', e.target.value)}
                  style={{ position: 'absolute', left: '-9999px' }}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>

                {renderTypeSpecificFields()}

                <div className="border-t pt-8">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) => updateField('consent', checked)}
                    />
                    <Label htmlFor="consent" className="font-normal text-sm text-gray-600 cursor-pointer">
                      I agree to the{' '}
                      <a href="/legal/privacy-policy" className="text-blue-600 hover:underline" target="_blank">
                        Privacy Policy
                      </a>
                      {' '}and consent to SoftDAB processing my data for the purpose of this inquiry. *
                    </Label>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="border-t p-6 bg-gray-50">
          {step === 1 ? (
            <Button
              type="button"
              onClick={handleContinue}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
            >
              Continue
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          ) : (
            <div className="flex gap-4">
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpertConsultationForm;