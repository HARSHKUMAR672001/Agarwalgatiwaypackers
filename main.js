const chennaiAreas = [
    "Anna Nagar",
    "Adyar",
    "Velachery",
    "Tambaram",
    "Mylapore",
    "Royapettah",
    "Sholinganallur",
    "Kanchipuram",
    "Kilpauk",
    "Porur",
    "Poonamallee",
    "Nungambakkam",
    "Ambattur",
    "Kolathur",
    "Choolaimedu",
    "Chromepet",
    "Ekkaduthangal",
    "Thiruvanmiyur",
    "Tiruvottiyur",
    "Nanganallur",
    "Avadi",
    "Arakkonam",
    "Chengalpattu",
    "Navalur",
    "Thoraipakkam",
    "T Nagar",
    "Alwarpet",
    "Adambakkam",
    "Besant Nagar",
    "Kodambakkam",
    "Kelambakkam",
    "Medavakkam",
    "Madipakkam",
    "Mogappair",
    "Guduvanchery",
    "Pallikaranai",
    "Perungudi",
    "Ramapuram",
    "KK Nagar",
    "Kottivakkam",
    "East Coast Road",
    "Siruseri",
    "Perumbakkam",
    "Vadapalani",
    "Nolambur",
    "Kumbakonam",
    "Aminjikarai",
    "Kadapakkam",
    "Mandeville",
    "Mugalivakkam",
    "Kavankarai",
    "Maduravoyal",
    "Sriperumbudur",
    "Alandur",
    "Guindy",
    "Kadirvedu",
    "Peerkankaranai",
    "OMR",
    "Triplicane",
    "Mahindra World City",
    "Perungalathur",
    "Kolapakkam",
    "Iyyappanthangal"
];

// Replace these placeholders before publishing the enquiry form live.
const SMTP_CONFIG = {
    toEmail: "your-email@example.com",
    secureToken: "YOUR_SMTPJS_SECURE_TOKEN",
    host: "kabiryadav55555@gmail.com",
    username: "kabiryadav55555@gmail.com",
    password: "hpzz hlkc rpqh ypor",
    fromEmail: "harshkumar672001@gmail.com",
    siteLabel: "Agarwalgatiwaypackers Chennai"
};

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const enquiryForm = document.getElementById("enquiry-form");
const submitButton = document.getElementById("submit-button");
const formStatus = document.getElementById("form-status");
const areaTags = document.getElementById("area-tags");
const areaCount = document.getElementById("area-count");
const areaSummary = document.getElementById("area-summary");
const areaDatalist = document.getElementById("chennai-areas");
const movingDateInput = document.getElementById("moving-date");
const yearTarget = document.getElementById("year");

const isPlaceholderConfig = (value) => !value || value.includes("YOUR_") || value.includes("your-");

function setStatus(message, tone = "neutral") {
    formStatus.textContent = message;
    formStatus.className = "text-sm font-medium";

    if (tone === "success") {
        formStatus.classList.add("form-status-success");
        return;
    }

    if (tone === "error") {
        formStatus.classList.add("form-status-error");
        return;
    }

    formStatus.classList.add("form-status-neutral");
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function renderChennaiAreas() {
    if (!areaTags || !areaCount || !areaSummary || !areaDatalist) {
        return;
    }

    areaCount.textContent = `${chennaiAreas.length}+ areas`;
    areaSummary.textContent = `Coverage includes ${chennaiAreas.slice(0, 12).join(", ")} and many more Chennai neighborhoods.`;

    chennaiAreas.forEach((area) => {
        const tag = document.createElement("span");
        tag.className = "area-chip";
        tag.textContent = area;
        areaTags.appendChild(tag);

        const option = document.createElement("option");
        option.value = area;
        areaDatalist.appendChild(option);
    });
}

function configureDateField() {
    if (!movingDateInput) {
        return;
    }

    const today = new Date().toISOString().split("T")[0];
    movingDateInput.min = today;
}

function setCurrentYear() {
    if (yearTarget) {
        yearTarget.textContent = new Date().getFullYear();
    }
}

function toggleMobileMenu() {
    if (!menuToggle || !mobileMenu) {
        return;
    }

    menuToggle.addEventListener("click", () => {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isExpanded));
        mobileMenu.classList.toggle("hidden");
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

function revealOnScroll() {
    const elements = document.querySelectorAll("[data-reveal]");

    if (!("IntersectionObserver" in window)) {
        elements.forEach((element) => element.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12
        }
    );

    elements.forEach((element) => observer.observe(element));
}

function buildEmailBody(data) {
    const details = [
        ["Name", data.name],
        ["Phone", data.phone],
        ["Email", data.email || "Not provided"],
        ["Moving From", data.movingFrom],
        ["Moving To", data.movingTo],
        ["Preferred Date", data.movingDate || "Not selected"],
        ["Service", data.service],
        ["Message", data.message]
    ];

    const rows = details
        .map(([label, value]) => {
            return `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:700;">${escapeHtml(label)}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${escapeHtml(value)}</td></tr>`;
        })
        .join("");

    return `
        <div style="font-family:Arial,sans-serif;color:#201815;">
            <h2 style="margin-bottom:16px;color:#db200e;">New website enquiry from ${escapeHtml(SMTP_CONFIG.siteLabel)}</h2>
            <table style="border-collapse:collapse;width:100%;max-width:680px;">
                ${rows}
            </table>
        </div>
    `;
}

function buildMailPayload(data) {
    if (isPlaceholderConfig(SMTP_CONFIG.toEmail)) {
        throw new Error("Set your receiver email in main.js before using the enquiry form.");
    }

    const payload = {
        To: SMTP_CONFIG.toEmail,
        From: SMTP_CONFIG.fromEmail || SMTP_CONFIG.username || SMTP_CONFIG.toEmail,
        Subject: `New Chennai enquiry: ${data.service} | ${data.name}`,
        Body: buildEmailBody(data),
        ReplyTo: data.email || SMTP_CONFIG.fromEmail || SMTP_CONFIG.username || SMTP_CONFIG.toEmail
    };

    if (!isPlaceholderConfig(SMTP_CONFIG.secureToken)) {
        payload.SecureToken = SMTP_CONFIG.secureToken;
        return payload;
    }

    if (SMTP_CONFIG.host && SMTP_CONFIG.username && SMTP_CONFIG.password) {
        payload.Host = SMTP_CONFIG.host;
        payload.Username = SMTP_CONFIG.username;
        payload.Password = SMTP_CONFIG.password;
        return payload;
    }

    throw new Error("Add an SMTPJS secure token or SMTP host credentials in main.js before going live.");
}

async function sendEnquiry(data) {
    if (!window.Email || typeof window.Email.send !== "function") {
        throw new Error("SMTP library did not load. Check your internet connection and try again.");
    }

    const response = await window.Email.send(buildMailPayload(data));

    if (typeof response === "string" && response.toLowerCase().includes("ok")) {
        return;
    }

    throw new Error(response || "Unable to send the enquiry right now.");
}

function validateFormData(data) {
    if (!/^\d{10}$/.test(data.phone)) {
        throw new Error("Enter a valid 10 digit phone number.");
    }

    if (!data.name.trim() || !data.movingFrom.trim() || !data.movingTo.trim() || !data.service.trim() || !data.message.trim()) {
        throw new Error("Please fill all required fields before sending your enquiry.");
    }
}

function formDataToObject(formData) {
    return {
        name: formData.get("name")?.trim() || "",
        phone: formData.get("phone")?.trim() || "",
        email: formData.get("email")?.trim() || "",
        movingFrom: formData.get("movingFrom")?.trim() || "",
        movingTo: formData.get("movingTo")?.trim() || "",
        movingDate: formData.get("movingDate")?.trim() || "",
        service: formData.get("service")?.trim() || "",
        message: formData.get("message")?.trim() || ""
    };
}

function attachFormHandler() {
    if (!enquiryForm) {
        return;
    }

    enquiryForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(enquiryForm);

        if ((formData.get("website") || "").trim()) {
            return;
        }

        const data = formDataToObject(formData);

        try {
            validateFormData(data);
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
            setStatus("Sending your enquiry...", "neutral");

            await sendEnquiry(data);

            enquiryForm.reset();
            configureDateField();
            setStatus("Enquiry sent successfully. We will contact you soon.", "success");
        } catch (error) {
            setStatus(error.message || "Unable to send the enquiry right now.", "error");
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Send Enquiry";
        }
    });
}

renderChennaiAreas();
configureDateField();
setCurrentYear();
toggleMobileMenu();
revealOnScroll();
attachFormHandler();
