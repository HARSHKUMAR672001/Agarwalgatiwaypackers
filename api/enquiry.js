const nodemailer = require("nodemailer");

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "https://agarwalgatiwaypackers.com,https://www.agarwalgatiwaypackers.com,http://127.0.0.1:3000,http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

function setCorsHeaders(req, res) {
    const origin = req.headers.origin;

    if (origin && ALLOWED_ORIGINS.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }

    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
    res.setHeader("Vary", "Origin");
}

function getMailConfig() {
    return {
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT || 465),
        secure: String(process.env.SMTP_SECURE || "true").toLowerCase() === "true",
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
        to: process.env.MAIL_TO || process.env.SMTP_USER,
        from: process.env.MAIL_FROM || process.env.SMTP_USER
    };
}

function validateServerConfig() {
    const config = getMailConfig();

    if (!config.user || !config.pass || !config.to || !config.from) {
        throw new Error("SMTP server is not configured. Set SMTP_USER, SMTP_PASS, MAIL_TO and MAIL_FROM in Vercel environment variables.");
    }

    return config;
}

function validateEnquiry(data) {
    const requiredFields = ["name", "phone", "movingFrom", "movingTo", "service", "message"];

    requiredFields.forEach((field) => {
        if (!String(data[field] || "").trim()) {
            throw new Error("Please fill all required fields before sending your enquiry.");
        }
    });

    if (!/^\d{10}$/.test(String(data.phone || "").trim())) {
        throw new Error("Enter a valid 10 digit phone number.");
    }
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function buildMailHtml(data) {
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
            <h2 style="margin-bottom:16px;color:#db200e;">New website enquiry from Agarwalgatiwaypackers Chennai</h2>
            <table style="border-collapse:collapse;width:100%;max-width:680px;">
                ${rows}
            </table>
        </div>
    `;
}

function buildMailText(data) {
    return [
        "New website enquiry from Agarwalgatiwaypackers Chennai",
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

module.exports = async function handler(req, res) {
    setCorsHeaders(req, res);
    res.setHeader("Cache-Control", "no-store");

    if (req.method === "OPTIONS") {
        res.statusCode = 204;
        res.end();
        return;
    }

    if (req.method !== "POST") {
        res.status(405).json({ message: "Method not allowed." });
        return;
    }

    try {
        const data = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
        validateEnquiry(data);
        const config = validateServerConfig();

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

        res.status(200).json({ message: "Enquiry sent successfully." });
    } catch (error) {
        const message = error.message || "Unable to send the enquiry right now.";
        const statusCode = message === "Please fill all required fields before sending your enquiry."
            || message === "Enter a valid 10 digit phone number."
            ? 400
            : 500;

        res.status(statusCode).json({ message });
    }
};
