import type { Metadata, Viewport } from "next";
import { Manrope, Sora } from "next/font/google";
import type { ReactNode } from "react";

import { RevealInit } from "@/components/reveal-init";

import "./globals.css";

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope"
});

const sora = Sora({
    subsets: ["latin"],
    variable: "--font-sora"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://agarwalgatiwaypackers.com";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: "Agarwal Packers And Movers Chennai | Household Shifting & Bike Transportation",
    description:
        "Agarwal Gatiway offers packers and movers in Chennai with household shifting services, bike transportation services, packing, loading and relocation support across Anna Nagar, Adyar, Velachery, Tambaram and major Chennai localities. Call 9991973464.",
    keywords: [
        "Agarwal Packers And Movers",
        "packers and movers",
        "Household shifting Services",
        "Bike Transportation services",
        "Agarwal Packers And Movers Chennai",
        "packers and movers Chennai",
        "household shifting Chennai",
        "bike transportation Chennai"
    ],
    robots: {
        index: true,
        follow: true
    },
    alternates: {
        canonical: "/"
    },
    openGraph: {
        type: "website",
        locale: "en_IN",
        title: "Agarwal Packers And Movers Chennai",
        description: "Packers and movers in Chennai for household shifting, bike transportation and relocation support. Call 9991973464.",
        url: "/",
        images: [
            {
                url: "/images/logo.png",
                alt: "Agarwal Gatiway Packers and Movers logo"
            }
        ]
    },
    icons: {
        icon: "/images/favicon.ico"
    }
};

export const viewport: Viewport = {
    themeColor: "#db200e"
};

export default function RootLayout({
    children
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${manrope.variable} ${sora.variable} bg-[#fff8ef] font-sans text-[#201815] antialiased`}>
                <RevealInit />
                {children}
            </body>
        </html>
    );
}
