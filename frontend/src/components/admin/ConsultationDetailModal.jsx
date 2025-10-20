import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { fetchConsultationDetail } from '@/lib/admin-api';

export default function ConsultationDetailModal({ id, open, onOpenChange }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open || !id) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchConsultationDetail(id)
      .then((res) => { if (!cancelled) setData(res); })
      .catch((e) => !cancelled && setError(e.message || 'Failed to load'))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [open, id]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Expert Consultation #{id}</DialogTitle>
        </DialogHeader>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {data && (
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Type" value={data.client_type} />
              <Field label="Priority" value={String(data.priority)} />
              <Field label="Name" value={data.name} />
              <Field label="Email" value={data.email} />
              <Field label="Company" value={data.company} />
              <Field label="Phone" value={data.phone} />
              <Field label="Submitted" value={data.submitted_at} />
              <Field label="Status" value={data.status} />
              <Field label="IP" value={data.ip_address} />
              <Field label="Referrer" value={data.referrer} />
              <Field label="Page URL" value={data.page_url} />
              <Field label="UTM" value={[data.utm_source, data.utm_medium, data.utm_campaign].filter(Boolean).join(' / ')} />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">User Agent</div>
              <div className="p-2 rounded bg-muted text-xs break-words">{data.user_agent}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Brief Message</div>
              <div className="p-3 rounded bg-muted whitespace-pre-wrap text-sm max-h-60 overflow-auto">{data.brief_message}</div>
            </div>
            {data.details && typeof data.details === 'object' && (
              <div>
                <div className="text-xs text-gray-500 mb-1">Details</div>
                <div className="p-3 rounded bg-muted max-h-72 overflow-auto">
                  <table className="w-full text-sm">
                    <tbody>
                      {Object.entries(data.details).filter(([, v]) => v != null && v !== '').map(([k, v]) => (
                        <tr key={k}>
                          <td className="py-1 pr-3 align-top text-gray-600 whitespace-nowrap">{formatKey(k)}</td>
                          <td className="py-1 break-words">{String(v)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
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

function formatKey(k) {
  return k.replace(/_/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
}
