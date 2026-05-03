import type { MetadataRoute } from "next";

import { generatedLandingPages } from "@/lib/site-content";

const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://agarwalgatiwaypackers.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    return [
        {
            url: siteUrl,
            lastModified,
            changeFrequency: "weekly",
            priority: 1
        },
        ...generatedLandingPages.map((page) => ({
            url: `${siteUrl}${page.href}`,
            lastModified,
            changeFrequency: "weekly" as const,
            priority: 0.85
        }))
    ];
}
