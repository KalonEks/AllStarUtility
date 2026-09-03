"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { defaultServiceNeeded, serviceNeededOptions } from "@/lib/content";

function summaryLabel(values: string[]) {
  if (!values.length) return "Select a service";
  return values
    .map((value) => serviceNeededOptions.find(([option]) => option === value)?.[1] ?? value)
    .join(", ");
}

export function toggleServiceNeeded(current: string[], value: string) {
  if (value === defaultServiceNeeded) {
    return current.includes(defaultServiceNeeded) ? [] : [defaultServiceNeeded];
  }
  const withoutUnsure = current.filter((item) => item !== defaultServiceNeeded);
  if (withoutUnsure.includes(value)) return withoutUnsure.filter((item) => item !== value);
  return [...withoutUnsure, value];
}

export function ServiceNeededSelect({
  values,
  onChange,
}: {
  values: string[];
  onChange: (next: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const placeholder = values.length === 0;

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="service-needed-select" ref={rootRef}>
      <button
        type="button"
        className="field"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={`service-needed-select__value${placeholder ? " service-needed-select__value--placeholder" : ""}`}>
          {summaryLabel(values)}
        </span>
        <ChevronDown size={18} aria-hidden />
      </button>
      {open ? (
        <div className="service-needed-select__menu" id={listId} role="listbox" aria-multiselectable="true">
          {serviceNeededOptions.map(([value, label]) => {
            const selected = values.includes(value);
            return (
              <button
                key={value}
                type="button"
                role="option"
                aria-selected={selected}
                className="service-needed-select__option"
                onClick={() => onChange(toggleServiceNeeded(values, value))}
              >
                <span className="service-needed-select__check" aria-hidden>
                  {selected ? <Check size={12} strokeWidth={3} /> : null}
                </span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
