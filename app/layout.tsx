import type { Metadata, Viewport } from "next";
import { Manrope, Sora } from "next/font/google";
import Script from "next/script";
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
    title: "Agarwal Packers And Movers Chennai | Household Shifting, Bike & Car Transportation",
    description:
        "Agarwal Gatiway offers packers and movers in Chennai with household shifting services, bike transportation services, Car Transportation services, Car Carrier Services, packing, loading and relocation support. Call 9991973464.",
    keywords: [
        "Agarwal Packers And Movers",
        "packers and movers",
        "Household shifting Services",
        "Bike Transportation services",
        "Car Transportation services",
        "Car Carrier Services",
        "Agarwal Packers And Movers Chennai",
        "packers and movers Chennai",
        "household shifting Chennai",
        "bike transportation Chennai",
        "car transportation Chennai",
        "car carrier Chennai"
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
        description: "Packers and movers in Chennai for household shifting, bike transportation, car transportation, car carrier and relocation support. Call 9991973464.",
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
                <Script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=AW-18063799766"
                    strategy="afterInteractive"
                />
                <Script id="google-ads-gtag" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'AW-18063799766');
                    `}
                </Script>
                <RevealInit />
                {children}
            </body>
        </html>
    );
}
