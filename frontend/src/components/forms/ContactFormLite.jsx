import React, { useState } from 'react';

export default function ContactFormLite({ onSuccess, onError }) {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const form = e.currentTarget;
      const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        company: form.company.value.trim(),
        role: form.role.value.trim(),
        service: form.service.value,
        timeline: form.timeline.value,
        budget: form.budget.value,
        message: form.message.value.trim(),
        gdprConsent: form.gdprConsent.checked,
        marketingConsent: form.marketingConsent.checked,
        website: "",
      };

      if (!data.gdprConsent) {
        throw new Error('Please accept the Privacy Policy');
      }

      const res = await fetch('https://softdab.tech/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || 'Failed to submit form');
      }
      form.reset();
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
        <input name="name" required minLength={2} placeholder="Name" className="border p-3 rounded" />
        <input name="email" type="email" required placeholder="Work Email" className="border p-3 rounded" />
        <input name="company" required minLength={2} placeholder="Company" className="border p-3 rounded" />
        <select name="role" required className="border p-3 rounded">
          <option value="">Select your role</option>
          <option>CEO/Founder</option>
          <option>CTO/Technical Director</option>
          <option>Product Manager</option>
          <option>Project Manager</option>
          <option>Development Team Lead</option>
          <option>Business Analyst</option>
          <option>Marketing Director</option>
          <option>Operations Manager</option>
          <option>Startup Founder</option>
          <option>Other</option>
        </select>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <select name="service" required className="border p-3 rounded">
          <option value="">Select a service</option>
          <option>Web Development</option>
          <option>Mobile Development</option>
          <option>Cloud Solutions</option>
          <option>Data Engineering</option>
          <option>DevOps</option>
          <option>Consulting</option>
        </select>
        <select name="timeline" required className="border p-3 rounded">
          <option value="">Select a timeline</option>
          <option>ASAP</option>
          <option>1-3 months</option>
          <option>3-6 months</option>
          <option>6+ months</option>
          <option>Not sure yet</option>
        </select>
        <select name="budget" required className="border p-3 rounded">
          <option value="">Select a budget</option>
          <option>Under $50K</option>
          <option>$50K - $100K</option>
          <option>$100K - $250K</option>
          <option>$250K+</option>
          <option>Not sure yet</option>
        </select>
      </div>
      <textarea name="message" required minLength={20} rows={5} placeholder="Tell us about your project..." className="border p-3 rounded w-full" />
      <div className="flex items-center gap-2">
        <input id="gdprConsent" name="gdprConsent" type="checkbox" required />
        <label htmlFor="gdprConsent" className="text-sm text-gray-700">
          I accept the <a className="text-primary underline" href="/legal/privacy" target="_blank" rel="noreferrer noopener">Privacy Policy</a>
        </label>
      </div>
      <div className="flex items-center gap-2">
        <input id="marketingConsent" name="marketingConsent" type="checkbox" />
        <label htmlFor="marketingConsent" className="text-sm text-gray-700">I want to receive updates</label>
      </div>
      <button type="submit" disabled={submitting} className="bg-primary text-white px-6 py-3 rounded">
        {submitting ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
