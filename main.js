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

const ENQUIRY_ENDPOINT = "/api/enquiry";

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

function renderChennaiAreas() {
    if (!areaTags || !areaCount || !areaSummary || !areaDatalist) {
        return;
    }

    areaCount.textContent = `${chennaiAreas.length}+ areas`;
    areaSummary.textContent = `Agarwalgatiwaypackers supports packers and movers in Chennai, household shifting services in Chennai and bike transportation services across ${chennaiAreas.slice(0, 12).join(", ")} and many more localities.`;

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

function validateFormData(data) {
    if (!/^\d{10}$/.test(data.phone)) {
        throw new Error("Enter a valid 10 digit phone number.");
    }

    if (!data.name || !data.movingFrom || !data.movingTo || !data.service || !data.message) {
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

async function sendEnquiry(data) {
    if (window.location.protocol === "file:") {
        throw new Error("Run `npm run dev` or `npm start` and open http://127.0.0.1:3000 instead of the file directly.");
    }

    const response = await fetch(ENQUIRY_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    let payload = {};

    try {
        payload = await response.json();
    } catch (error) {
        payload = {};
    }

    if (!response.ok) {
        throw new Error(payload.message || "Unable to send the enquiry right now.");
    }
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
