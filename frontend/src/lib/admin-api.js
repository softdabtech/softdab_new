// Normalize provided API base (should include /api already in production)
const rawApi = import.meta.env.VITE_API_URL || '';
const API = rawApi.endsWith('/api') ? rawApi : `${rawApi}/api`;

export async function fetchContacts() {
  const res = await fetch(`${API}/contact`);
  if (!res.ok) throw new Error('Failed to load contacts');
  return res.json();
}

export async function fetchContactDetail(id) {
  const res = await fetch(`${API}/contact/${id}`);
  if (!res.ok) throw new Error('Failed to load contact detail');
  return res.json();
}

export async function fetchConsultations() {
  const res = await fetch(`${API}/expert-consultation`);
  if (!res.ok) throw new Error('Failed to load consultations');
  return res.json();
}

export async function fetchConsultationDetail(id) {
  const res = await fetch(`${API}/expert-consultation/${id}`);
  if (!res.ok) throw new Error('Failed to load consultation detail');
  return res.json();
}
