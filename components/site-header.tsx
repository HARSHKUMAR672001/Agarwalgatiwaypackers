"use client";

import Image from "next/image";
import { useState } from "react";

type SiteHeaderProps = {
    phoneHref: string;
    phoneNumber: string;
    locationsLabel?: string;
};

const baseNavLinks = [
    { href: "#services", label: "Services" },
    { href: "#faq", label: "FAQ" }
] as const;

export function SiteHeader({ phoneHref, phoneNumber, locationsLabel = "Chennai Areas" }: SiteHeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const navLinks = [
        baseNavLinks[0],
        { href: "#locations", label: locationsLabel },
        baseNavLinks[1]
    ] as const;

    return (
        <>
            <header className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <a href="#top" className="flex items-center gap-3">
                        <Image
                            src="/images/logo.png"
                            alt="Agarwal Gatiway Packers and Movers logo"
                            width={2720}
                            height={1568}
                            priority
                            className="h-14 w-auto rounded-2xl bg-white p-1 shadow-[0_20px_60px_rgba(32,24,21,0.08)]"
                        />
                        <div>
                            <p className="font-display text-lg font-bold text-[#201815]">Agarwal Gatiway</p>
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#db200e]">Packers &amp; Movers</p>
                        </div>
                    </a>

                    <button
                        type="button"
                        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 text-[#201815] md:hidden"
                        aria-label="Toggle menu"
                        aria-expanded={isOpen}
                        onClick={() => setIsOpen((open) => !open)}
                    >
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                            <path d="M4 7h16" />
                            <path d="M4 12h16" />
                            <path d="M4 17h16" />
                        </svg>
                    </button>

                    <nav className="hidden items-center gap-8 md:flex">
                        {navLinks.map((link) => (
                            <a key={link.href} href={link.href} className="text-sm font-semibold text-[#201815]/70 transition hover:text-[#db200e]">
                                {link.label}
                            </a>
                        ))}
                        <a href="#contact" className="rounded-full bg-[#db200e] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#201815]">
                            Free Enquiry
                        </a>
                    </nav>
                </div>

                {isOpen ? (
                    <div className="border-t border-black/10 bg-white/95 px-4 py-4 md:hidden">
                        <nav className="flex flex-col gap-3">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="rounded-2xl px-4 py-3 font-semibold text-[#201815]/75 transition hover:bg-[#db200e]/5 hover:text-[#db200e]"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                className="rounded-2xl bg-[#db200e] px-4 py-3 text-center font-bold text-white"
                                onClick={() => setIsOpen(false)}
                            >
                                Send Enquiry
                            </a>
                            <a
                                href={phoneHref}
                                className="rounded-2xl border border-black/10 px-4 py-3 text-center font-bold text-[#201815]"
                                onClick={() => setIsOpen(false)}
                            >
                                Call {phoneNumber}
                            </a>
                        </nav>
                    </div>
                ) : null}
            </header>
        </>
    );
}
