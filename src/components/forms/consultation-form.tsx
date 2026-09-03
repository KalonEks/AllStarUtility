"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Phone, Send } from "lucide-react";
import { propertyTypes, referralOptions, serviceNeededOptions, urgencyOptions } from "@/lib/content";
import { business, minnesota } from "@/lib/site";
import { constrainPhoneInput, constrainZipInput } from "@/lib/us-contact";
import { serviceNeededValues } from "@/lib/validation";
import type { ConsultationFormState } from "@/lib/validation";
import {
  personalInfoStepSchema,
  propertyDetailsStepSchema,
  serviceDetailsStepSchema,
  submitStepSchema,
} from "@/lib/validation";

const STEPS = [
  "Personal Information",
  "Property Details",
  "Service Details",
  "Submit Request",
] as const;

const defaultFormData: ConsultationFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  propertyType: "residential",
  serviceAddress: "",
  city: "",
  state: "MN",
  zip: "",
  serviceNeeded: "",
  urgency: "planning-quote-only",
  message: "",
  additionalDetails: "",
  howHeard: "",
  consent: false,
  companyWebsite: "",
  turnstileToken: "",
};

const SESSION_STORAGE_KEY = "asu_consultation_session_id";
const DEMO_SESSION_ID = "demo-session";
const RECEIPT_HEADING_ID = "consultation-receipt-heading";

function presetService(value?: string): ConsultationFormState["serviceNeeded"] {
  if (value && (serviceNeededValues as readonly string[]).includes(value)) {
    return value as ConsultationFormState["serviceNeeded"];
  }
  return "";
}

function optionLabel(options: ReadonlyArray<readonly string[]>, value: string) {
  return options.find((option) => option[0] === value)?.[1] ?? value;
}

export function ConsultationForm({ defaultService }: { defaultService?: string }) {
  const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
  const [step, setStep] = useState(1);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ConsultationFormState>({
    ...defaultFormData,
    serviceNeeded: presetService(defaultService),
  });
  const [status, setStatus] = useState<"idle" | "saving" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [duplicateAddress, setDuplicateAddress] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const trackingRef = useRef<Record<string, string>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid"];
    const captured: Record<string, string> = {
      landingPage: window.location.href,
      referrer: document.referrer,
    };
    keys.forEach((key) => {
      const value = params.get(key) || window.localStorage.getItem(`asu_${key}`) || "";
      if (value) {
        captured[key] = value;
        window.localStorage.setItem(`asu_${key}`, value);
      }
    });
    trackingRef.current = captured;

    const storedSessionId = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!storedSessionId || demoMode) return;

    fetch(`/api/inquiries/sessions/${storedSessionId}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((body) => {
        if (!body) {
          window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
          return;
        }
        setSessionId(body.sessionId);
        setStep(body.currentStep);
        setFormData((current) => ({ ...current, ...body.payload }));
      })
      .catch(() => window.sessionStorage.removeItem(SESSION_STORAGE_KEY));
  }, [demoMode]);

  function updateField(name: keyof ConsultationFormState, value: string | boolean) {
    if (name === "serviceAddress" || name === "city" || name === "state" || name === "zip") {
      setDuplicateAddress(false);
    }
    setFormData((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => {
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  function stepPayload(currentStep: number) {
    if (currentStep === 1) {
      return {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      };
    }
    if (currentStep === 2) {
      return {
        propertyType: formData.propertyType,
        serviceAddress: formData.serviceAddress,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
      };
    }
    if (currentStep === 3) {
      return {
        serviceNeeded: formData.serviceNeeded,
        urgency: formData.urgency,
        message: formData.message,
      };
    }
    return {
      additionalDetails: formData.additionalDetails,
      howHeard: formData.howHeard,
      consent: formData.consent,
      companyWebsite: formData.companyWebsite,
      turnstileToken: formData.turnstileToken,
    };
  }

  function validateCurrentStep() {
    const payload = stepPayload(step);
    const schema =
      step === 1
        ? personalInfoStepSchema
        : step === 2
          ? propertyDetailsStepSchema
          : step === 3
            ? serviceDetailsStepSchema
            : submitStepSchema;

    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      const errors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0];
        if (typeof key === "string" && !errors[key]) errors[key] = issue.message;
      });
      setFieldErrors(errors);
      return false;
    }

    setFieldErrors({});
    return true;
  }

  function applyRequestError(body: { error?: string; code?: string } | null, fallback: string) {
    setStatus("error");
    if (body?.code === "duplicate_address") {
      setDuplicateAddress(true);
      setMessage("");
      return;
    }
    setDuplicateAddress(false);
    setMessage(body?.error || fallback);
  }

  async function saveStep(eventType: "step_completed" | "step_back" = "step_completed") {
    if (eventType === "step_completed" && !validateCurrentStep()) return false;

    setStatus("saving");
    setMessage("");
    if (eventType === "step_completed") setDuplicateAddress(false);

    if (demoMode) {
      if (step === 1 && eventType === "step_completed" && !sessionId) {
        setSessionId(DEMO_SESSION_ID);
        window.sessionStorage.setItem(SESSION_STORAGE_KEY, DEMO_SESSION_ID);
      }
      setStep((current) =>
        eventType === "step_back" ? Math.max(current - 1, 1) : Math.min(current + 1, STEPS.length),
      );
      setStatus("idle");
      return true;
    }

    try {
      if (step === 1 && eventType === "step_completed" && !sessionId) {
        const response = await fetch("/api/inquiries/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            step: 1,
            data: stepPayload(1),
            ...trackingRef.current,
          }),
        });
        const body = await response.json().catch(() => null);
        if (!response.ok) {
          applyRequestError(body, "We could not save your progress. Please try again.");
          return false;
        }
        setSessionId(body.sessionId);
        window.sessionStorage.setItem(SESSION_STORAGE_KEY, body.sessionId);
        setStep(body.currentStep);
        setStatus("idle");
        return true;
      }

      if (!sessionId) {
        setStatus("error");
        setMessage("Your session expired. Please start again from step 1.");
        return false;
      }

      const response = await fetch(`/api/inquiries/sessions/${sessionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step,
          data: stepPayload(step),
          eventType,
        }),
      });
      const body = await response.json().catch(() => null);
      if (!response.ok) {
        applyRequestError(body, "We could not save your progress. Please try again.");
        return false;
      }

      setStep(body.currentStep);
      setStatus("idle");
      return true;
    } catch {
      setStatus("error");
      setMessage("We could not save your progress. Please try again.");
      return false;
    }
  }

  async function onNext() {
    await saveStep("step_completed");
  }

  async function onBack() {
    if (step === 1) return;
    if (sessionId) {
      await saveStep("step_back");
      return;
    }
    setStep((current) => Math.max(current - 1, 1));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateCurrentStep()) return;
    if (!sessionId) {
      setStatus("error");
      setMessage("Your session expired. Please start again from step 1.");
      return;
    }

    setStatus("submitting");
    setMessage("");
    setDuplicateAddress(false);

    if (demoMode) {
      setStatus("success");
      window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
      setSessionId(null);
      return;
    }

    const response = await fetch(`/api/inquiries/sessions/${sessionId}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, ...trackingRef.current }),
    });

    if (response.ok) {
      setStatus("success");
      window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
      setSessionId(null);
      window.dispatchEvent(new CustomEvent("asu:consultation-submitted"));
      return;
    }

    const body = await response.json().catch(() => null);
    applyRequestError(body, "The form could not be submitted. Please call All-Star Utilities if the issue is urgent.");
  }

  function startAnotherRequest() {
    setStatus("idle");
    setStep(1);
    setFormData({ ...defaultFormData, serviceNeeded: presetService(defaultService) });
    setFieldErrors({});
    setMessage("");
    setDuplicateAddress(false);
    setSessionId(null);
    window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
  }

  return (
    <div className="glass-panel grid gap-5 p-5 md:p-6">
      {status === "success" ? (
        <ConsultationReceipt data={formData} demoMode={demoMode} onStartAnother={startAnotherRequest} />
      ) : (
        <div className="grid gap-5">
      <div className="grid gap-3">
        <div className="flex items-center justify-between gap-3">
          {STEPS.map((label, index) => {
            const stepNumber = index + 1;
            const active = step === stepNumber;
            const complete = step > stepNumber;
            return (
              <div key={label} className="flex flex-1 flex-col items-center gap-2 text-center">
                <span
                  className={`grid size-8 place-items-center rounded-full text-xs font-black ${
                    active
                      ? "bg-[#d71920] text-white"
                      : complete
                        ? "bg-[#0b63ce] text-white"
                        : "border border-white/20 bg-white/5 text-white/55"
                  }`}
                >
                  {stepNumber}
                </span>
                <span className={`hidden text-[0.68rem] font-bold uppercase tracking-wide sm:block ${active ? "text-white" : "text-white/55"}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full bg-[linear-gradient(90deg,#d71920_0%,#0b63ce_100%)] transition-all duration-300" style={{ width: `${(step / STEPS.length) * 100}%` }} />
        </div>
        <p className="text-center text-sm font-black text-white">{STEPS[step - 1]}</p>
      </div>

      <form onSubmit={onSubmit} className="grid gap-4">
        <input type="text" name="companyWebsite" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" value={formData.companyWebsite} onChange={() => undefined} />

        {demoMode ? (
          <p className="rounded-lg border border-[#3b8ff0]/35 bg-[#3b8ff0]/10 px-4 py-3 text-center text-sm font-bold text-[#3b8ff0]">
            Demo preview mode — form submissions are disabled.
          </p>
        ) : null}

        {step === 1 ? (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="label">
                First Name
                <input className="field" name="firstName" autoComplete="given-name" value={formData.firstName} onChange={(event) => updateField("firstName", event.target.value)} required />
                {fieldErrors.firstName ? <span className="text-xs font-bold text-[#f87171]">{fieldErrors.firstName}</span> : null}
              </label>
              <label className="label">
                Last Name
                <input className="field" name="lastName" autoComplete="family-name" value={formData.lastName} onChange={(event) => updateField("lastName", event.target.value)} required />
                {fieldErrors.lastName ? <span className="text-xs font-bold text-[#f87171]">{fieldErrors.lastName}</span> : null}
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="label">
                Email
                <input className="field" name="email" type="email" autoComplete="email" value={formData.email} onChange={(event) => updateField("email", event.target.value)} required />
                {fieldErrors.email ? <span className="text-xs font-bold text-[#f87171]">{fieldErrors.email}</span> : null}
              </label>
              <label className="label">
                Phone
                <input
                  className="field"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="651-555-0123"
                  maxLength={14}
                  value={formData.phone}
                  onChange={(event) => updateField("phone", constrainPhoneInput(event.target.value))}
                  required
                />
                {fieldErrors.phone ? <span className="text-xs font-bold text-[#f87171]">{fieldErrors.phone}</span> : null}
              </label>
            </div>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <label className="label">
              Property Type
              <select className="field" name="propertyType" value={formData.propertyType} onChange={(event) => updateField("propertyType", event.target.value)} required>
                {propertyTypes.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className="label">
              Service Address
              <input className="field" name="serviceAddress" autoComplete="street-address" value={formData.serviceAddress} onChange={(event) => updateField("serviceAddress", event.target.value)} required />
              {fieldErrors.serviceAddress ? <span className="text-xs font-bold text-[#f87171]">{fieldErrors.serviceAddress}</span> : null}
            </label>
            <div className="grid gap-4 md:grid-cols-[1fr_120px_150px]">
              <label className="label">
                City
                <input className="field" name="city" autoComplete="address-level2" value={formData.city} onChange={(event) => updateField("city", event.target.value)} required />
                {fieldErrors.city ? <span className="text-xs font-bold text-[#f87171]">{fieldErrors.city}</span> : null}
              </label>
              <label className="label">
                State
                <input
                  className="field"
                  name="state"
                  autoComplete="address-level1"
                  value={minnesota.abbreviation}
                  readOnly
                  aria-readonly="true"
                />
                {fieldErrors.state ? <span className="text-xs font-bold text-[#f87171]">{fieldErrors.state}</span> : null}
              </label>
              <label className="label">
                ZIP
                <input
                  className="field"
                  name="zip"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  placeholder="55116"
                  maxLength={10}
                  value={formData.zip}
                  onChange={(event) => updateField("zip", constrainZipInput(event.target.value))}
                  required
                />
                {fieldErrors.zip ? <span className="text-xs font-bold text-[#f87171]">{fieldErrors.zip}</span> : null}
              </label>
            </div>
          </>
        ) : null}

        {step === 3 ? (
          <>
            <label className="label">
              Service Needed
              <select className="field" name="serviceNeeded" value={formData.serviceNeeded} onChange={(event) => updateField("serviceNeeded", event.target.value)} required>
                <option value="">Select a service</option>
                {serviceNeededOptions.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              {fieldErrors.serviceNeeded ? <span className="text-xs font-bold text-[#f87171]">{fieldErrors.serviceNeeded}</span> : null}
            </label>
            <label className="label">
              Urgency
              <select className="field" name="urgency" value={formData.urgency} onChange={(event) => updateField("urgency", event.target.value)} required>
                {urgencyOptions.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className="label">
              Current Issue / Description
              <textarea className="field min-h-32" name="message" value={formData.message} onChange={(event) => updateField("message", event.target.value)} required />
              {fieldErrors.message ? <span className="text-xs font-bold text-[#f87171]">{fieldErrors.message}</span> : null}
            </label>
          </>
        ) : null}

        {step === 4 ? (
          <>
            <label className="label">
              Referral
              <select className="field" name="howHeard" value={formData.howHeard} onChange={(event) => updateField("howHeard", event.target.value)}>
                <option value="">Select a referral source</option>
                {referralOptions.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className="label">
              Additional Details (If Any)
              <textarea className="field min-h-28" name="additionalDetails" value={formData.additionalDetails} onChange={(event) => updateField("additionalDetails", event.target.value)} />
            </label>
            <label className="flex gap-3 text-sm leading-6 text-white/78">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent === true}
                onChange={(event) => updateField("consent", event.target.checked)}
                required
                className="mt-1 accent-[#d71920]"
              />
              I consent to All-Star Utilities storing this inquiry and contacting me about the requested sewer, water, excavation, or pipe lining service.
            </label>
            {fieldErrors.consent ? <span className="text-xs font-bold text-[#f87171]">{fieldErrors.consent}</span> : null}
          </>
        ) : null}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          {step > 1 ? (
            <button className="button-secondary justify-center" type="button" onClick={onBack} disabled={status === "saving" || status === "submitting"}>
              <ArrowLeft size={18} aria-hidden />
              Back
            </button>
          ) : (
            <span />
          )}

          {step < 4 ? (
            <button className="button-primary justify-center sm:min-w-44" type="button" onClick={onNext} disabled={status === "saving"}>
              {status === "saving" ? "Saving..." : "Continue"}
              <ArrowRight size={18} aria-hidden />
            </button>
          ) : (
            <button className="button-primary justify-center sm:min-w-52" type="submit" disabled={status === "submitting"}>
              <Send size={18} aria-hidden />
              {status === "submitting" ? "Submitting..." : "Submit Consultation Request"}
            </button>
          )}
        </div>

        {duplicateAddress ? (
          <p className="form-alert" role="alert">
            An inquiry has already been submitted for this address. If this isn&apos;t correct, please call{" "}
            <a href={`tel:${business.phoneHref}`}>{business.phone}</a>.
          </p>
        ) : null}

        {status === "error" && message ? (
          <p className="font-bold text-[#f87171]" role="status">
            {message}
          </p>
        ) : null}

        <p className="text-center text-xs leading-5 text-white/55">
          This form is for consultation requests. If you have an active sewer or water emergency, call {business.emergencyPhone}.
        </p>
      </form>
        </div>
      )}
    </div>
  );
}

function ConsultationReceipt({
  data,
  demoMode,
  onStartAnother,
}: {
  data: ConsultationFormState;
  demoMode: boolean;
  onStartAnother: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const additionalDetails = (data.additionalDetails ?? "").trim();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      headingRef.current?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="consultation-receipt" role="region" aria-labelledby={RECEIPT_HEADING_ID}>
      <div className="consultation-receipt__header">
        <div className="consultation-receipt__stamp">
          <Check size={18} aria-hidden />
        </div>
        <div>
          <p className="eyebrow">Request received</p>
          <h2 id={RECEIPT_HEADING_ID} ref={headingRef} tabIndex={-1}>
            Thank you for your inquiry.
          </h2>
          <p className="consultation-receipt__lede" role="status">
            Your consultation request was received. Someone from All-Star Utilities will reach out as soon as they are
            available.
          </p>
          {demoMode ? <p className="consultation-receipt__lede">This is a preview. Your request was not sent.</p> : null}
          <p className="consultation-receipt__emergency">
            If this is an active sewer or water emergency, call{" "}
            <a href={`tel:${business.emergencyPhoneHref}`}>{business.emergencyPhone}</a>.
          </p>
        </div>
      </div>

      <div className="consultation-receipt__body">
        <section className="consultation-receipt__group">
          <h3 className="consultation-receipt__group-title">Contact</h3>
          <dl>
            <ReceiptRow label="First Name" value={data.firstName} />
            <ReceiptRow label="Last Name" value={data.lastName} />
            <ReceiptRow label="Email" value={data.email} />
            <ReceiptRow label="Phone" value={data.phone} />
          </dl>
        </section>

        <section className="consultation-receipt__group">
          <h3 className="consultation-receipt__group-title">Property</h3>
          <dl>
            <ReceiptRow label="Property Type" value={optionLabel(propertyTypes, data.propertyType)} />
            <ReceiptRow label="Service Address" value={data.serviceAddress} />
            <ReceiptRow label="City" value={data.city} />
            <ReceiptRow label="State" value={data.state} />
            <ReceiptRow label="ZIP" value={data.zip} />
          </dl>
        </section>

        <section className="consultation-receipt__group">
          <h3 className="consultation-receipt__group-title">Service</h3>
          <dl>
            <ReceiptRow label="Service Needed" value={optionLabel(serviceNeededOptions, data.serviceNeeded)} />
            <ReceiptRow label="Urgency" value={optionLabel(urgencyOptions, data.urgency)} />
            <ReceiptRow label="Current Issue / Description" value={data.message} />
          </dl>
        </section>

        {additionalDetails ? (
          <section className="consultation-receipt__group">
            <h3 className="consultation-receipt__group-title">Additional Details</h3>
            <dl>
              <div className="consultation-receipt__row">
                <dd>{additionalDetails}</dd>
              </div>
            </dl>
          </section>
        ) : null}
      </div>

      <div className="consultation-receipt__actions">
        <a className="button-primary" href={`tel:${business.phoneHref}`}>
          <Phone size={18} aria-hidden />
          Call {business.phone}
        </a>
        <button className="button-secondary" type="button" onClick={onStartAnother}>
          Submit Another Request
        </button>
      </div>
    </div>
  );
}

function ReceiptRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="consultation-receipt__row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
