"use client";

import type { FormEvent } from "react";
import { useState } from "react";

type EnquiryFormProps = {
    areas: readonly string[];
    phoneHref: string;
    phoneNumber: string;
    locationName?: string;
};

type FormState = {
    name: string;
    phone: string;
    email: string;
    movingFrom: string;
    movingTo: string;
    movingDate: string;
    service: string;
    message: string;
    website: string;
};

const initialState: FormState = {
    name: "",
    phone: "",
    email: "",
    movingFrom: "",
    movingTo: "",
    movingDate: "",
    service: "",
    message: "",
    website: ""
};

export function EnquiryForm({ areas, phoneHref, phoneNumber, locationName = "Chennai" }: EnquiryFormProps) {
    const [form, setForm] = useState<FormState>(initialState);
    const [status, setStatus] = useState<{ tone: "neutral" | "success" | "error"; message: string }>({
        tone: "neutral",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const today = new Date().toISOString().split("T")[0];

    function updateField(field: keyof FormState, value: string) {
        setForm((current) => ({
            ...current,
            [field]: value
        }));
    }

    function validateForm() {
        if (!/^\d{10}$/.test(form.phone)) {
            throw new Error("Enter a valid 10 digit phone number.");
        }

        if (!form.name || !form.movingFrom || !form.movingTo || !form.service || !form.message) {
            throw new Error("Please fill all required fields before sending your enquiry.");
        }
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (form.website.trim()) {
            return;
        }

        try {
            validateForm();
            setIsSubmitting(true);
            setStatus({ tone: "neutral", message: "Sending your enquiry..." });

            const response = await fetch("/api/enquiry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: form.name.trim(),
                    phone: form.phone.trim(),
                    email: form.email.trim(),
                    movingFrom: form.movingFrom.trim(),
                    movingTo: form.movingTo.trim(),
                    movingDate: form.movingDate.trim(),
                    service: form.service.trim(),
                    message: form.message.trim()
                })
            });

            const payload = (await response.json().catch(() => ({}))) as { message?: string };

            if (!response.ok) {
                throw new Error(payload.message || "Unable to send the enquiry right now.");
            }

            setForm(initialState);
            setStatus({ tone: "success", message: "Enquiry sent successfully. We will contact you soon." });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unable to send the enquiry right now.";
            setStatus({ tone: "error", message });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div id="contact" className="glass-panel floating-card rounded-[2rem] border border-white/70 p-6 shadow-[0_25px_80px_rgba(32,24,21,0.16)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#db200e]">Quick Enquiry</p>
                    <h2 className="mt-3 font-display text-3xl font-bold text-[#201815]">Request your {locationName} moving callback</h2>
                </div>
                <div className="hidden rounded-2xl bg-[#fcca0d]/35 p-3 text-[#db200e] sm:block">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z" />
                        <path d="m3 7.5 9 4.5 9-4.5" />
                        <path d="M12 12v9" />
                    </svg>
                </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-[#201815]/70">
                Share your move details and we will review the enquiry for packing, shifting or bike transport support in {locationName}.
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="website"
                    autoComplete="off"
                    tabIndex={-1}
                    className="hidden"
                    value={form.website}
                    onChange={(event) => updateField("website", event.target.value)}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-[#201815]">Full Name</span>
                        <input
                            type="text"
                            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#201815] outline-none transition focus:border-[#db200e] focus:ring-4 focus:ring-[#db200e]/10"
                            placeholder="Your full name"
                            required
                            value={form.name}
                            onChange={(event) => updateField("name", event.target.value)}
                        />
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-[#201815]">Phone Number</span>
                        <input
                            type="tel"
                            inputMode="numeric"
                            minLength={10}
                            maxLength={10}
                            pattern="[0-9]{10}"
                            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#201815] outline-none transition focus:border-[#db200e] focus:ring-4 focus:ring-[#db200e]/10"
                            placeholder="10 digit mobile number"
                            required
                            value={form.phone}
                            onChange={(event) => updateField("phone", event.target.value.replace(/\D/g, "").slice(0, 10))}
                        />
                    </label>
                </div>

                <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#201815]">Email Address</span>
                    <input
                        type="email"
                        className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#201815] outline-none transition focus:border-[#db200e] focus:ring-4 focus:ring-[#db200e]/10"
                        placeholder="Optional email for reply"
                        value={form.email}
                        onChange={(event) => updateField("email", event.target.value)}
                    />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-[#201815]">Moving From</span>
                        <input
                            type="text"
                            list="chennai-areas"
                            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#201815] outline-none transition focus:border-[#db200e] focus:ring-4 focus:ring-[#db200e]/10"
                            placeholder={`Example: ${locationName}`}
                            required
                            value={form.movingFrom}
                            onChange={(event) => updateField("movingFrom", event.target.value)}
                        />
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-[#201815]">Moving To</span>
                        <input
                            type="text"
                            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#201815] outline-none transition focus:border-[#db200e] focus:ring-4 focus:ring-[#db200e]/10"
                            placeholder="Destination city or area"
                            required
                            value={form.movingTo}
                            onChange={(event) => updateField("movingTo", event.target.value)}
                        />
                    </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-[#201815]">Preferred Date</span>
                        <input
                            type="date"
                            min={today}
                            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#201815] outline-none transition focus:border-[#db200e] focus:ring-4 focus:ring-[#db200e]/10"
                            value={form.movingDate}
                            onChange={(event) => updateField("movingDate", event.target.value)}
                        />
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-[#201815]">Service Required</span>
                        <select
                            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#201815] outline-none transition focus:border-[#db200e] focus:ring-4 focus:ring-[#db200e]/10"
                            required
                            value={form.service}
                            onChange={(event) => updateField("service", event.target.value)}
                        >
                            <option value="">Select service</option>
                            <option value="Household Shifting Services">Household Shifting Services</option>
                            <option value="Bike Transportation Services">Bike Transportation Services</option>
                            <option value="Packers and Movers">Packers and Movers</option>
                            <option value="Office Relocation">Office Relocation</option>
                            <option value="Loading and Unloading">Loading and Unloading</option>
                        </select>
                    </label>
                </div>

                <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#201815]">Enquiry Details</span>
                    <textarea
                        rows={4}
                        className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#201815] outline-none transition focus:border-[#db200e] focus:ring-4 focus:ring-[#db200e]/10"
                        placeholder="Tell us about your household items, floor level, bike model or preferred timing."
                        required
                        value={form.message}
                        onChange={(event) => updateField("message", event.target.value)}
                    />
                </label>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-[#db200e] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#201815] disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {isSubmitting ? "Sending..." : "Send Enquiry"}
                </button>

                <p className={`text-sm font-medium ${status.tone === "success" ? "form-status-success" : status.tone === "error" ? "form-status-error" : "form-status-neutral"}`} aria-live="polite">
                    {status.message}
                </p>
            </form>

            <div className="mt-6 grid gap-3 rounded-[1.75rem] bg-[#201815] p-5 text-sm text-white/80 sm:grid-cols-2">
                <div>
                    <p className="font-semibold text-white">Phone Support</p>
                    <a href={phoneHref} className="mt-2 inline-block text-lg font-bold text-[#fcca0d]">
                        {phoneNumber}
                    </a>
                </div>
                <div>
                    <p className="font-semibold text-white">Best For</p>
                    <p className="mt-2 leading-6">Local {locationName} moves, household shifting and bike transport enquiries.</p>
                </div>
            </div>

            <datalist id="chennai-areas">
                {areas.map((area) => (
                    <option key={area} value={area} />
                ))}
            </datalist>
        </div>
    );
}
