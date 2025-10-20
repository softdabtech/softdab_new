import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { fetchContactDetail } from '@/lib/admin-api';

export default function ContactDetailModal({ id, open, onOpenChange }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open || !id) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchContactDetail(id)
      .then((res) => {
        if (!cancelled) setData(res);
      })
      .catch((e) => !cancelled && setError(e.message || 'Failed to load'))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [open, id]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Contact Detail #{id}</DialogTitle>
        </DialogHeader>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {data && (
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Name" value={data.name} />
              <Field label="Email" value={data.email} />
              <Field label="Company" value={data.company} />
              <Field label="Role" value={data.role} />
              <Field label="Service" value={data.service} />
              <Field label="Timeline" value={data.timeline} />
              <Field label="Budget" value={data.budget} />
              <Field label="Submitted" value={data.submitted_at} />
              <Field label="Status" value={data.status} />
              <Field label="IP" value={data.ip_address} />
              <Field label="Referrer" value={data.referrer} />
              <Field label="Page" value={data.page} />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">User Agent</div>
              <div className="p-2 rounded bg-muted text-xs break-words">{data.user_agent}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Message</div>
              <div className="p-3 rounded bg-muted whitespace-pre-wrap text-sm max-h-60 overflow-auto">{data.message}</div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="p-2 rounded bg-muted text-sm break-words">{value || '—'}</div>
    </div>
  );
}
