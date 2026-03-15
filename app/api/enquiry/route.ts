import { NextRequest, NextResponse } from "next/server";

import { getAllowedOrigins, sendEnquiryEmail, validateEnquiry } from "@/lib/mail";

export const runtime = "nodejs";

function buildCorsHeaders(request: NextRequest) {
    const headers = new Headers({
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST,OPTIONS",
        Vary: "Origin"
    });
    const origin = request.headers.get("origin");
    if (origin && getAllowedOrigins().includes(origin)) {
        headers.set("Access-Control-Allow-Origin", origin);
    }
    return headers;
}

export async function OPTIONS(request: NextRequest) {
    return new NextResponse(null, {
        status: 204,
        headers: buildCorsHeaders(request)
    });
}

export async function POST(request: NextRequest) {
    const headers = buildCorsHeaders(request);
    try {
        const payload = (await request.json()) as Record<string, string>;
        validateEnquiry(payload);

        await sendEnquiryEmail({
            name: String(payload.name || "").trim(),
            phone: String(payload.phone || "").trim(),
            email: String(payload.email || "").trim(),
            movingFrom: String(payload.movingFrom || "").trim(),
            movingTo: String(payload.movingTo || "").trim(),
            movingDate: String(payload.movingDate || "").trim(),
            service: String(payload.service || "").trim(),
            message: String(payload.message || "").trim()
        });

        return NextResponse.json(
            { message: "Enquiry sent successfully." },
            {
                status: 200,
                headers
            }
        );
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unable to send the enquiry right now.";
        const status =
            message === "Please fill all required fields before sending your enquiry." ||
            message === "Enter a valid 10 digit phone number."
                ? 400
                : 500;

        return NextResponse.json(
            { message },
            {
                status,
                headers
            }
        );
    }
}
