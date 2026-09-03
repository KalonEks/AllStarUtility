"use client";

import { useRef } from "react";
import { formatInquiryStatus } from "@/lib/display-format";

export function InquiryFilters({
  q,
  service,
  urgency,
  status,
  serviceOptions,
  urgencyOptions,
  statusOptions,
}: {
  q: string;
  service: string;
  urgency: string;
  status: string;
  serviceOptions: ReadonlyArray<readonly [string, string]>;
  urgencyOptions: ReadonlyArray<readonly [string, string]>;
  statusOptions: readonly string[];
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const activeCount = [service, urgency, status].filter(Boolean).length;

  function openFilters() {
    dialogRef.current?.showModal();
  }

  function closeFilters() {
    dialogRef.current?.close();
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <form className="grid flex-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end" method="get">
        <input type="hidden" name="service" value={service} />
        <input type="hidden" name="urgency" value={urgency} />
        <input type="hidden" name="status" value={status} />
        <label className="label">
          Search
          <input className="field" name="q" defaultValue={q} placeholder="Name, email, phone, city, or address" />
        </label>
        <button className="button-primary justify-center sm:min-w-28" type="submit">
          Search
        </button>
      </form>

      <button className="button-primary justify-center sm:min-w-28" type="button" onClick={openFilters}>
        Filters{activeCount ? ` (${activeCount})` : ""}
      </button>

      <dialog
        ref={dialogRef}
        className="admin-filter-dialog"
        aria-labelledby="inquiry-filters-heading"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeFilters();
        }}
      >
        <form className="admin-filter-dialog__panel grid gap-4" method="get" action="/admin/inquiries">
          <div className="flex items-start justify-between gap-3">
            <h2 id="inquiry-filters-heading" className="text-lg font-black text-white">
              Filters
            </h2>
            <button className="button-ghost px-2 py-1 text-sm" type="button" onClick={closeFilters}>
              Close
            </button>
          </div>
          <input type="hidden" name="q" value={q} />
          <label className="label">
            Service
            <select className="field" name="service" defaultValue={service}>
              <option value="">All services</option>
              {serviceOptions.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="label">
            Urgency
            <select className="field" name="urgency" defaultValue={urgency}>
              <option value="">All urgency</option>
              {urgencyOptions.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="label">
            Status
            <select className="field" name="status" defaultValue={status}>
              <option value="">All statuses</option>
              {statusOptions.map((value) => (
                <option key={value} value={value}>
                  {formatInquiryStatus(value)}
                </option>
              ))}
            </select>
          </label>
          <button className="button-primary justify-center" type="submit">
            Filter
          </button>
        </form>
      </dialog>
    </div>
  );
}
