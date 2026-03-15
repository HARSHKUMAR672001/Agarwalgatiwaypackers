import nodemailer from "nodemailer";

type EnquiryPayload = {
    name: string;
    phone: string;
    email?: string;
    movingFrom: string;
    movingTo: string;
    movingDate?: string;
    service: string;
    message: string;
};

type MailConfig = {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    pass: string;
    to: string;
    from: string;
};

export function getAllowedOrigins() {
    return (process.env.ALLOWED_ORIGINS ||
        "http://127.0.0.1:3000,http://localhost:3000,https://agarwalgatiwaypackers.com,https://www.agarwalgatiwaypackers.com")
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean);
}

export function getMailConfig(): MailConfig {
    return {
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT || 465),
        secure: String(process.env.SMTP_SECURE || "true").toLowerCase() === "true",
        user: process.env.SMTP_USER || "",
        pass: process.env.SMTP_PASS || "",
        to: process.env.MAIL_TO || process.env.SMTP_USER || "",
        from: process.env.MAIL_FROM || process.env.SMTP_USER || ""
    };
}

export function validateMailConfig() {
    const config = getMailConfig();

    if (!config.user || !config.pass || !config.to || !config.from) {
        throw new Error("SMTP server is not configured. Set SMTP_USER, SMTP_PASS, MAIL_TO and MAIL_FROM in environment variables.");
    }

    return config;
}

export function validateEnquiry(data: Partial<EnquiryPayload>) {
    const requiredFields: Array<keyof EnquiryPayload> = ["name", "phone", "movingFrom", "movingTo", "service", "message"];

    requiredFields.forEach((field) => {
        if (!String(data[field] || "").trim()) {
            throw new Error("Please fill all required fields before sending your enquiry.");
        }
    });

    if (!/^\d{10}$/.test(String(data.phone || "").trim())) {
        throw new Error("Enter a valid 10 digit phone number.");
    }
}

function escapeHtml(value: string) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function buildMailHtml(data: EnquiryPayload) {
    const rows = [
        ["Name", data.name],
        ["Phone", data.phone],
        ["Email", data.email || "Not provided"],
        ["Moving From", data.movingFrom],
        ["Moving To", data.movingTo],
        ["Preferred Date", data.movingDate || "Not selected"],
        ["Service", data.service],
        ["Message", data.message]
    ]
        .map(([label, value]) => {
            return `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:700;">${escapeHtml(label)}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${escapeHtml(value)}</td></tr>`;
        })
        .join("");

    return `
        <div style="font-family:Arial,sans-serif;color:#201815;">
            <h2 style="margin-bottom:16px;color:#db200e;">New website enquiry from Agarwal Gatiway Packers and Movers Chennai</h2>
            <table style="border-collapse:collapse;width:100%;max-width:680px;">
                ${rows}
            </table>
        </div>
    `;
}

function buildMailText(data: EnquiryPayload) {
    return [
        "New website enquiry from Agarwal Gatiway Packers and Movers Chennai",
        "",
        `Name: ${data.name}`,
        `Phone: ${data.phone}`,
        `Email: ${data.email || "Not provided"}`,
        `Moving From: ${data.movingFrom}`,
        `Moving To: ${data.movingTo}`,
        `Preferred Date: ${data.movingDate || "Not selected"}`,
        `Service: ${data.service}`,
        "",
        "Message:",
        data.message
    ].join("\n");
}

export async function sendEnquiryEmail(data: EnquiryPayload) {
    const config = validateMailConfig();
    const transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: {
            user: config.user,
            pass: config.pass
        }
    });

    await transporter.sendMail({
        to: config.to,
        from: config.from,
        replyTo: String(data.email || "").trim() || config.user,
        subject: `New Chennai enquiry: ${data.service} | ${data.name}`,
        text: buildMailText(data),
        html: buildMailHtml(data)
    });
}
