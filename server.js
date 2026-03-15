const fs = require("fs");
const path = require("path");
const http = require("http");
const nodemailer = require("nodemailer");

const ROOT_DIR = __dirname;
const ENV_FILE = path.join(ROOT_DIR, ".env");
const MAX_BODY_SIZE = 1024 * 1024;

const MIME_TYPES = {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".ico": "image/x-icon",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png"
};

loadEnvFile();

const HOST = process.env.HOST || "127.0.0.1";
const PORT = Number(process.env.PORT || 3000);
const NODE_ENV = process.env.NODE_ENV || "development";

let transporter;

function loadEnvFile() {
    if (!fs.existsSync(ENV_FILE)) {
        return;
    }

    const contents = fs.readFileSync(ENV_FILE, "utf8");

    contents.split(/\r?\n/).forEach((line) => {
        const trimmed = line.trim();

        if (!trimmed || trimmed.startsWith("#")) {
            return;
        }

        const separatorIndex = trimmed.indexOf("=");

        if (separatorIndex === -1) {
            return;
        }

        const key = trimmed.slice(0, separatorIndex).trim();
        let value = trimmed.slice(separatorIndex + 1).trim();

        if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }

        if (!(key in process.env)) {
            process.env[key] = value;
        }
    });
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
        throw new Error("SMTP server is not configured. Set SMTP_USER, SMTP_PASS, MAIL_TO and MAIL_FROM in .env.");
    }
}

function getTransporter() {
    validateServerConfig();

    if (!transporter) {
        const config = getMailConfig();

        transporter = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            secure: config.secure,
            auth: {
                user: config.user,
                pass: config.pass
            }
        });
    }

    return transporter;
}

function sendJson(response, statusCode, payload) {
    response.writeHead(statusCode, {
        "Content-Type": "application/json; charset=utf-8"
    });
    response.end(JSON.stringify(payload));
}

function logRequest(method, requestUrl, statusCode) {
    if (NODE_ENV === "production") {
        return;
    }

    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${method} ${requestUrl} -> ${statusCode}`);
}

function resolveStaticPath(requestUrl) {
    const requestPath = new URL(requestUrl, "http://localhost").pathname;
    const pathname = requestPath === "/" ? "/index.html" : decodeURIComponent(requestPath);
    const resolvedPath = path.resolve(ROOT_DIR, `.${pathname}`);

    if (!resolvedPath.startsWith(ROOT_DIR)) {
        return null;
    }

    return resolvedPath;
}

function serveStaticFile(filePath, response) {
    fs.readFile(filePath, (error, fileBuffer) => {
        if (error) {
            logRequest("GET", filePath, 404);
            sendJson(response, 404, { message: "File not found." });
            return;
        }

        const extension = path.extname(filePath).toLowerCase();
        response.writeHead(200, {
            "Content-Type": MIME_TYPES[extension] || "application/octet-stream"
        });
        response.end(fileBuffer);
        logRequest("GET", filePath, 200);
    });
}

function readJsonBody(request) {
    return new Promise((resolve, reject) => {
        let body = "";

        request.on("data", (chunk) => {
            body += chunk;

            if (body.length > MAX_BODY_SIZE) {
                reject(new Error("Request body is too large."));
                request.destroy();
            }
        });

        request.on("end", () => {
            try {
                resolve(JSON.parse(body || "{}"));
            } catch (error) {
                reject(new Error("Invalid request payload."));
            }
        });

        request.on("error", reject);
    });
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

async function handleEnquiry(request, response) {
    try {
        const data = await readJsonBody(request);
        validateEnquiry(data);

        const config = getMailConfig();

        await getTransporter().sendMail({
            to: config.to,
            from: config.from,
            replyTo: String(data.email || "").trim() || config.user,
            subject: `New Chennai enquiry: ${data.service} | ${data.name}`,
            text: buildMailText(data),
            html: buildMailHtml(data)
        });

        logRequest(request.method || "POST", request.url || "/api/enquiry", 200);
        sendJson(response, 200, { message: "Enquiry sent successfully." });
    } catch (error) {
        const statusCode = error.message === "Invalid request payload." || error.message === "Please fill all required fields before sending your enquiry." || error.message === "Enter a valid 10 digit phone number."
            ? 400
            : 500;

        logRequest(request.method || "POST", request.url || "/api/enquiry", statusCode);
        sendJson(response, statusCode, {
            message: error.message || "Unable to send the enquiry right now."
        });
    }
}

const server = http.createServer((request, response) => {
    if (!request.url) {
        logRequest(request.method || "UNKNOWN", "unknown", 400);
        sendJson(response, 400, { message: "Invalid request." });
        return;
    }

    if (request.method === "GET" && request.url === "/api/health") {
        logRequest(request.method, request.url, 200);
        sendJson(response, 200, { status: "ok" });
        return;
    }

    if (request.method === "POST" && request.url === "/api/enquiry") {
        handleEnquiry(request, response);
        return;
    }

    if (request.method === "GET") {
        const filePath = resolveStaticPath(request.url);

        if (!filePath) {
            logRequest(request.method, request.url, 403);
            sendJson(response, 403, { message: "Forbidden path." });
            return;
        }

        serveStaticFile(filePath, response);
        return;
    }

    logRequest(request.method || "UNKNOWN", request.url, 405);
    sendJson(response, 405, { message: "Method not allowed." });
});

server.on("error", (error) => {
    console.error("Server failed to start:", error.message);
    process.exit(1);
});

server.listen(PORT, HOST, () => {
    console.log(`Agarwalgatiwaypackers server running on http://${HOST}:${PORT} (${NODE_ENV})`);
});

["SIGINT", "SIGTERM"].forEach((signal) => {
    process.on(signal, () => {
        console.log(`Received ${signal}, shutting down server.`);
        server.close(() => process.exit(0));
    });
});
