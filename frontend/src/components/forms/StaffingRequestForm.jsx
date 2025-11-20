import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';

const STAFF_ROLES = [
  'Frontend Developer',
  'Backend Developer',
  'Fullstack Developer',
  'QA Engineer',
  'DevOps',
  'UI/UX Designer',
  'Project Manager',
  'Business Analyst',
  'Other',
];

const ENGAGEMENT_TYPES = [
  'Full-time Dedicated',
  'Part-time Dedicated',
  'Hourly/On-demand',
  'Team Extension',
  'Project-based',
];

const SENIORITY = [
  'Junior',
  'Middle',
  'Senior',
  'Lead',
];

export default function StaffingRequestForm({ onSuccess, onError }) {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    roles: [],
    engagement: '',
    seniority: '',
    duration: '',
    startDate: '',
    rate: '',
    message: '',
    gdprConsent: false,
    website: '',
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function handleRoleChange(role) {
    setForm((prev) => {
      const roles = prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role];
      return { ...prev, roles };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        page: typeof window !== 'undefined' ? window.location.pathname : undefined,
        referrer: typeof document !== 'undefined' ? document.referrer : undefined,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      };

      const res = await fetch('/api/staffing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || 'Failed to submit request');
      }

      // Reset form and notify parent
      setForm({
        name: '', email: '', company: '', roles: [], engagement: '', seniority: '', duration: '', startDate: '', rate: '', message: '', gdprConsent: false, website: ''
      });
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Input name="name" required minLength={2} placeholder="Your Name" value={form.name} onChange={handleChange} />
        <Input name="email" type="email" required placeholder="Work Email" value={form.email} onChange={handleChange} />
        <Input name="company" placeholder="Company (optional)" value={form.company} onChange={handleChange} />
      </div>
      <div>
        <div className="mb-2 font-medium text-gray-700">Needed Roles *</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {STAFF_ROLES.map((role) => (
            <label key={role} className="flex items-center gap-2 text-sm">
              <Checkbox checked={form.roles.includes(role)} onCheckedChange={() => handleRoleChange(role)} />
              {role}
            </label>
          ))}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <div className="mb-2 font-medium text-gray-700">Engagement Type *</div>
          <Select value={form.engagement} onValueChange={(v) => setForm((f) => ({ ...f, engagement: v }))} required>
            <SelectTrigger>
              <SelectValue placeholder="Select engagement" />
            </SelectTrigger>
            <SelectContent>
              {ENGAGEMENT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <div className="mb-2 font-medium text-gray-700">Seniority *</div>
          <Select value={form.seniority} onValueChange={(v) => setForm((f) => ({ ...f, seniority: v }))} required>
            <SelectTrigger>
              <SelectValue placeholder="Select seniority" />
            </SelectTrigger>
            <SelectContent>
              {SENIORITY.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Input name="duration" placeholder="Duration (e.g. 6 months)" value={form.duration} onChange={handleChange} />
        <Input name="startDate" placeholder="Start Date (e.g. Jan 2026)" value={form.startDate} onChange={handleChange} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Input name="rate" placeholder="Expected Rate (USD/hour or month)" value={form.rate} onChange={handleChange} />
      </div>
      <Textarea name="message" rows={4} placeholder="Describe your project, stack, or any requirements..." value={form.message} onChange={handleChange} />
      <div className="flex items-center gap-2">
        <input id="gdprConsent" name="gdprConsent" type="checkbox" checked={form.gdprConsent} onChange={handleChange} required />
        <label htmlFor="gdprConsent" className="text-sm text-gray-700">
          I accept the <a className="text-primary underline" href="/legal/privacy" target="_blank" rel="noreferrer noopener">Privacy Policy</a>
        </label>
      </div>
      <button type="submit" disabled={submitting} className="bg-primary text-white px-6 py-3 rounded w-full sm:w-auto text-base font-medium hover:bg-primary/90 transition-colors">
        {submitting ? 'Sending…' : 'Request Staff Proposal'}
      </button>
    </form>
  );
}
