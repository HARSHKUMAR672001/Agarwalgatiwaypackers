export const phoneNumber = "9991973464";
export const phoneHref = `tel:+91${phoneNumber}`;
export const whatsappHref = `https://wa.me/919991973464?text=Hello%20Agarwal%20Gatiway%2C%20I%20need%20a%20quote%20for%20my%20move%20in%20Chennai.`;
export const whatsappHelpHref = `https://wa.me/919991973464?text=Hello%20Agarwal%20Gatiway%2C%20I%20need%20help%20with%20packers%20and%20movers%20in%20Chennai.`;

export const chennaiAreas = [
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
] as const;

export type ChennaiArea = (typeof chennaiAreas)[number];

export function slugifyLocation(location: string) {
    return location
        .toLowerCase()
        .replace(/&/g, " and ")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export function getLocationPageSlug(location: string) {
    return `packers-and-movers-in-${slugifyLocation(location)}`;
}

export const locationPages = chennaiAreas.map((area) => ({
    area,
    slug: getLocationPageSlug(area),
    href: `/${getLocationPageSlug(area)}`
})) as readonly {
    area: ChennaiArea;
    slug: string;
    href: string;
}[];

export function getAreaFromLocationSlug(slug: string) {
    return locationPages.find((page) => page.slug === slug)?.area;
}

export const chennaiRouteDestinations = [
    "Pallakad",
    "Coimbatore",
    "Mumbai",
    "Pune",
    "Vishakapatnam",
    "Delhi",
    "Gurgaon",
    "Kolkata",
    "Kochin",
    "Trivandrum",
    "Madurai",
    "Trichy",
    "Kanyakumari",
    "Nagpur",
    "Ahmedabad",
    "Bhopal",
    "Indore Nashik",
    "Noida",
    "Solapur",
    "Kolhapur",
    "Dehradun",
    "Jammu Kashmir",
    "Bhatinda",
    "Chandigarh",
    "Sivakashi",
    "Tuticorin",
    "Patna",
    "Hubbli",
    "Goa",
    "Dhanbad",
    "Bhubaneswar",
    "Hyderabad",
    "All Over India"
] as const;

export type ChennaiRouteDestination = (typeof chennaiRouteDestinations)[number];

export function getChennaiRouteSlug(destination: string) {
    return `packers-and-movers-chennai-to-${slugifyLocation(destination)}`;
}

export const chennaiRoutePages = chennaiRouteDestinations.map((destination) => {
    const title = `Packers and Movers Chennai to ${destination}`;

    return {
        destination,
        title,
        keyword: title.toUpperCase(),
        slug: getChennaiRouteSlug(destination),
        href: `/${getChennaiRouteSlug(destination)}`
    };
}) as readonly {
    destination: ChennaiRouteDestination;
    title: string;
    keyword: string;
    slug: string;
    href: string;
}[];

export const chennaiKeywordPages = [
    {
        title: "Packers and Movers Chennai",
        keyword: "PACKERS AND MOVERS CHENNAI",
        href: "/"
    },
    ...chennaiRoutePages.map((page) => ({
        title: page.title,
        keyword: page.keyword,
        href: page.href
    }))
] as const;

export const generatedLandingPages = [
    ...locationPages,
    ...chennaiRoutePages
] as const;

export function getChennaiRouteFromSlug(slug: string) {
    return chennaiRoutePages.find((page) => page.slug === slug);
}

export const featureCards = [
    {
        title: "Household shifting",
        description: "Complete packing, loading, transport and unloading support for flats, villas, PG moves and family relocations."
    },
    {
        title: "Bike transportation",
        description: "Careful two-wheeler pickup and secure transit handling for local Chennai transfers and outstation delivery."
    },
    {
        title: "Car transportation",
        description: "Car transportation services and car carrier services for owners who need safer vehicle movement from Chennai."
    },
    {
        title: "Fast response",
        description: "Get a direct callback on 9991973464 for schedule planning, quote discussion and moving coordination."
    },
    {
        title: "Chennai coverage",
        description: "Serving Anna Nagar, Adyar, Velachery, Tambaram, OMR, Porur, Ambattur, T Nagar and dozens of nearby areas."
    }
] as const;

export const seoHighlights = [
    {
        title: "Clear service planning",
        description: "Share pickup area, destination, goods volume and vehicle shifting needs so the move can be planned properly."
    },
    {
        title: "Packing support",
        description: "Household items, appliances, furniture and fragile goods can be discussed before confirming packing and loading support."
    },
    {
        title: "Vehicle relocation",
        description: "Bike transportation, Car Transportation services and Car Carrier Services can be requested for local or intercity routes."
    },
    {
        title: "Quick contact",
        description: "Call, WhatsApp or submit the enquiry form to discuss household shifting, office moves or route-based relocation."
    }
] as const;

export const services = [
    {
        title: "Household Shifting Services",
        description: "Packing, carton management, loading, transit planning and unloading support for apartment, villa and family moves in Chennai."
    },
    {
        title: "Bike Transportation Services",
        description: "Two-wheeler movement support with secure handling for residents shifting homes, students relocating or owners moving their bike out of Chennai."
    },
    {
        title: "Car Transportation Services",
        description: "Car transportation services for customers moving their vehicle from Chennai with planned pickup, carrier coordination and route support."
    },
    {
        title: "Car Carrier Services",
        description: "Car carrier services for intercity vehicle movement, including route planning, loading coordination and safer transit handling."
    },
    {
        title: "Office and Commercial Relocation",
        description: "Planned office shifting for small businesses, inventory movement, workstation packing and organized labeling to reduce disruption."
    },
    {
        title: "Packing and Loading Support",
        description: "Protective wrapping, furniture preparation, careful stacking and organized loading for safer transit from any Chennai locality."
    },
    {
        title: "Local Chennai Shifting",
        description: "Short-distance relocations within Chennai neighborhoods including apartments, rental homes, hostels and small warehouse transfers."
    },
    {
        title: "Intercity Relocation from Chennai",
        description: "For customers moving from Chennai to another city, the team can plan routing, item categorization and timing coordination."
    }
] as const;

export const longFormBlocks = [
    {
        eyebrow: "Packers and Movers in Chennai",
        title: "Complete moving support for homes, rentals, offices and long-distance routes.",
        paragraphs: [
            "Agarwal Gatiway Packers and Movers helps customers plan household shifting in Chennai with practical support from the first enquiry to final unloading. The team can guide packing needs, item handling, pickup timing, loading access, vehicle requirement and route planning for apartment moves, villa shifting, rental relocation and office movement.",
            "Every move is different, so the work is planned around the customer route, item volume, floor level, lift availability, parking access and delivery schedule. Whether the requirement is local Chennai shifting or an intercity move from Chennai, the focus stays on organized packing, careful loading, timely transport and clear communication."
        ]
    },
    {
        eyebrow: "Household Shifting Services",
        title: "Household shifting with packing, loading and delivery coordination.",
        paragraphs: [
            "Household goods usually include furniture, kitchen items, appliances, clothes, electronics, cots, mattresses, wardrobes, fragile decor and daily-use boxes. The service is planned so these items can be packed, grouped and loaded in a more systematic way before transport begins.",
            "Customers moving between Anna Nagar, Adyar, Velachery, Tambaram, Porur, OMR, Medavakkam, Perumbakkam and nearby areas can request support for local moves as well as outstation relocation. The enquiry call helps confirm packing material, vehicle size, labour requirement and expected shifting time."
        ]
    },
    {
        eyebrow: "Bike Transportation Services",
        title: "Two-wheeler shifting for local and outstation relocation needs.",
        paragraphs: [
            "Bike transportation services are useful for students, working professionals, tenants and families who need a two-wheeler moved with their household goods or as a separate vehicle movement. The team can discuss pickup point, destination, model details and timing before the move is scheduled.",
            "Two-wheeler relocation can be requested for local Chennai transfers or intercity routes from Chennai. Customers can also combine bike transport with home shifting, office relocation, packing and loading support for a single coordinated move."
        ]
    },
    {
        eyebrow: "Car Transportation Services",
        title: "Car carrier support for vehicle movement from Chennai.",
        paragraphs: [
            "Car Transportation services and Car Carrier Services help customers move a vehicle when shifting home, changing job location or sending a car to another city. The enquiry can include car model, pickup area, destination city, preferred date and whether household goods are moving on the same route.",
            "For intercity relocation, car carrier planning is handled along with route coordination and communication. Customers can ask for car carrier services from Chennai together with household shifting services, bike transportation services, packing and loading support."
        ]
    }
] as const;

export const trustPoints = [
    {
        title: "Move planning before pickup",
        description: "The enquiry call collects pickup area, destination, item volume, access details and vehicle shifting needs before scheduling the move."
    },
    {
        title: "Packing and loading care",
        description: "Household goods, furniture, appliances and fragile items are discussed in advance so packing and loading support can be arranged properly."
    },
    {
        title: "Bike and car carrier support",
        description: "Customers can request two-wheeler transport, Car Transportation services or Car Carrier Services along with household shifting."
    },
    {
        title: "Direct coordination",
        description: "Phone, WhatsApp and enquiry form support keep communication simple for local Chennai moves and intercity relocation routes."
    }
] as const;

export const areaWiseParagraphs = [
    {
        title: "Central Chennai moving support",
        description: "For Mylapore, Royapettah, Triplicane, T Nagar, Alwarpet, Nungambakkam, Kilpauk, Aminjikarai, Choolaimedu, Kodambakkam and Vadapalani, customers often need apartment-friendly packing, careful loading and timing coordination around narrow streets, parking limits and building access."
    },
    {
        title: "South Chennai household shifting",
        description: "In Adyar, Besant Nagar, Thiruvanmiyur, Velachery, Madipakkam, Medavakkam, Nanganallur, Adambakkam, Alandur, Guindy, Pallikaranai, Perungudi and Kottivakkam, the service is suited for apartments, independent houses, gated communities and family relocations with household goods, bikes or cars."
    },
    {
        title: "OMR and ECR relocation routes",
        description: "Sholinganallur, OMR, Thoraipakkam, Navalur, Siruseri, Kelambakkam, East Coast Road, Perumbakkam, Mahindra World City, Guduvanchery and Perungalathur often need rental shifting, employee relocation, student moves, bike transportation and car carrier support for city and outstation routes."
    },
    {
        title: "West Chennai shifting support",
        description: "Porur, Ramapuram, KK Nagar, Mugalivakkam, Kolapakkam, Iyyappanthangal, Poonamallee, Maduravoyal, Nolambur, Mogappair, Ambattur and Sriperumbudur moves usually require route planning for larger household goods, office items, storage materials and vehicle movement."
    },
    {
        title: "North and outer Chennai coverage",
        description: "Anna Nagar, Kolathur, Tiruvottiyur, Avadi, Kadirvedu, Kavankarai, Peerkankaranai, Chromepet, Ekkaduthangal and Tambaram customers can request household shifting, office transfers, loading support, bike transportation and car transportation services based on the route and item volume."
    },
    {
        title: "Suburban and intercity moves",
        description: "For Kanchipuram, Arakkonam, Chengalpattu, Kadapakkam, Kumbakonam and other connected routes, customers can discuss intercity relocation, packing material, loading labour, vehicle carrier needs and delivery coordination before confirming the move."
    }
] as const;

export const processSteps = [
    {
        title: "Send your enquiry",
        description: "Share your name, mobile number, Chennai pickup area and the service you need."
    },
    {
        title: "Receive a callback",
        description: "We discuss timing, shifting volume, access details and any bike, car carrier or fragile-item requirements."
    },
    {
        title: "Schedule the move",
        description: "Your preferred date, route and service plan are aligned for local Chennai or intercity moving."
    },
    {
        title: "Shift with coordination",
        description: "Packing, loading, transport and delivery are handled with clear communication from start to finish."
    }
] as const;

export const faqs = [
    {
        question: "Do you handle household shifting services inside Chennai?",
        answer: "Yes. The page is structured around Chennai household shifting, including apartment moves, villa shifting, rental relocations and intercity moves that start from Chennai."
    },
    {
        question: "Can I book bike transportation services from Chennai?",
        answer: "Yes. Bike transportation services are included in the enquiry form and service sections so customers can clearly request two-wheeler pickup and movement support."
    },
    {
        question: "Do you provide car transportation services and car carrier services?",
        answer: "Yes. Customers can request car transportation services or car carrier services along with household shifting, bike transportation or intercity relocation enquiries from Chennai."
    },
    {
        question: "Which Chennai localities are covered?",
        answer: "Coverage includes Anna Nagar, Adyar, Velachery, Tambaram, Mylapore, Sholinganallur, Porur, Ambattur, OMR, T Nagar and many more Chennai areas listed in the service area section."
    },
    {
        question: "Will enquiries come to email through the website form?",
        answer: "Yes. The contact form is connected to a secure Next.js API route that uses Nodemailer on the server side, so enquiries can reach your configured email inbox without exposing SMTP credentials in the browser."
    }
] as const;
