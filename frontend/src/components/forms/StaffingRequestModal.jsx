import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '../ui/dialog';
import StaffingRequestForm from './StaffingRequestForm';

export default function StaffingRequestModal({ open, onOpenChange }) {
  const [success, setSuccess] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-full">
        <DialogHeader>
          <DialogTitle>Request Dedicated Staff</DialogTitle>
          <DialogClose />
        </DialogHeader>
        {success ? (
          <div className="py-12 text-center">
            <div className="text-2xl font-bold mb-4">Thank you!</div>
            <div className="text-gray-600 mb-6">We received your request and will contact you within 24 hours.</div>
            <button className="bg-primary text-white px-6 py-2 rounded" onClick={() => onOpenChange(false)}>
              Close
            </button>
          </div>
        ) : (
          <StaffingRequestForm onSuccess={() => setSuccess(true)} />
        )}
      </DialogContent>
    </Dialog>
  );
}
