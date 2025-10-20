import React, { useEffect, useState } from 'react';
import { fetchContacts, fetchConsultations } from '@/lib/admin-api';
import ContactDetailModal from '@/components/admin/ContactDetailModal';
import ConsultationDetailModal from '@/components/admin/ConsultationDetailModal';

export default function AdminPage() {
  const [contacts, setContacts] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [contactId, setContactId] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [consultationId, setConsultationId] = useState(null);
  const [consultationOpen, setConsultationOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const [c1, c2] = await Promise.all([fetchContacts(), fetchConsultations()]);
        if (!cancelled) {
          setContacts(c1);
          setConsultations(c2);
        }
      } catch (e) {
        if (!cancelled) setError(e.message || 'Failed to load admin data');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin</h1>
      {loading && <p>Loading…</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section>
            <h2 className="text-lg font-semibold mb-3">Contact Forms</h2>
            <div className="overflow-x-auto border rounded-md">
              <table className="w-full text-sm">
                <thead className="bg-muted text-left">
                  <tr>
                    <Th>ID</Th>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Company</Th>
                    <Th>Date</Th>
                    <Th>Status</Th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((r) => (
                    <tr key={r.id} className="hover:bg-muted/40 cursor-pointer" onClick={() => { setContactId(r.id); setContactOpen(true); }}>
                      <Td>{r.id}</Td>
                      <Td>{r.name}</Td>
                      <Td>{r.email}</Td>
                      <Td>{r.company}</Td>
                      <Td>{r.date}</Td>
                      <Td>{r.status}</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">Expert Consultations</h2>
            <div className="overflow-x-auto border rounded-md">
              <table className="w-full text-sm">
                <thead className="bg-muted text-left">
                  <tr>
                    <Th>ID</Th>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Company</Th>
                    <Th>Type</Th>
                    <Th>Priority</Th>
                    <Th>Date</Th>
                    <Th>Status</Th>
                  </tr>
                </thead>
                <tbody>
                  {consultations.map((r) => (
                    <tr key={r.id} className="hover:bg-muted/40 cursor-pointer" onClick={() => { setConsultationId(r.id); setConsultationOpen(true); }}>
                      <Td>{r.id}</Td>
                      <Td>{r.name}</Td>
                      <Td>{r.email}</Td>
                      <Td>{r.company}</Td>
                      <Td>{r.client_type}</Td>
                      <Td>{r.priority}</Td>
                      <Td>{r.date}</Td>
                      <Td>{r.status}</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      <ContactDetailModal id={contactId} open={contactOpen} onOpenChange={setContactOpen} />
      <ConsultationDetailModal id={consultationId} open={consultationOpen} onOpenChange={setConsultationOpen} />
    </div>
  );
}

function Th({ children }) {
  return <th className="px-3 py-2 border-b font-medium text-gray-700">{children}</th>;
}
function Td({ children }) {
  return <td className="px-3 py-2 border-b align-top">{children}</td>;
}
