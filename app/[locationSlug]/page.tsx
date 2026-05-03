import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ChennaiKeywordsSection } from "@/components/chennai-keywords-section";
import { EnquiryForm } from "@/components/enquiry-form";
import { SiteHeader } from "@/components/site-header";
import {
  areaWiseParagraphs,
  chennaiAreas,
  faqs,
  featureCards,
  getAreaFromLocationSlug,
  getChennaiRouteFromSlug,
  generatedLandingPages,
  locationPages,
  longFormBlocks,
  phoneHref,
  phoneNumber,
  processSteps,
  seoHighlights,
  services,
  trustPoints,
} from "@/lib/site-content";

type LocationPageProps = {
  params: Promise<{
    locationSlug: string;
  }>;
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://agarwalgatiwaypackers.com";

const topTrustCards = [
  {
    title: "Quick move discussion",
    description:
      "Phone, WhatsApp and enquiry form options make it easy to share route, goods volume, vehicle details and timing.",
  },
  {
    title: "Combined relocation support",
    description:
      "Household shifting, bike transportation, car carrier services, packing and loading can be discussed together.",
  },
] as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return generatedLandingPages.map((page) => ({
    locationSlug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  const { locationSlug } = await params;
  const locationName = getAreaFromLocationSlug(locationSlug);
  const routePage = getChennaiRouteFromSlug(locationSlug);

  if (!locationName && !routePage) {
    return {
      title: "Location Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalPath = `/${locationSlug}`;
  const pageTitle = routePage
    ? routePage.title
    : `Agarwal Packers And Movers ${locationName}`;
  const packersKeyword = routePage
    ? routePage.title
    : `packers and movers in ${locationName}`;
  const keywordTarget = routePage
    ? `Chennai to ${routePage.destination}`
    : locationName!;
  const title = `${pageTitle} | Household Shifting, Car Carrier & Bike Transportation`;
  const description = `Agarwal Gatiway offers ${packersKeyword} with household shifting services, bike transportation services, Car Transportation services, Car Carrier Services, packing, loading and relocation support. Call ${phoneNumber}.`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: [
      "Agarwal Packers And Movers",
      "packers and movers",
      "Household shifting Services",
      "Bike Transportation services",
      "Car Transportation services",
      "Car Carrier Services",
      `Agarwal Packers And Movers ${keywordTarget}`,
      `packers and movers ${keywordTarget}`,
      `packers and movers in ${keywordTarget}`,
      `household shifting ${keywordTarget}`,
      `household shifting services in ${keywordTarget}`,
      `bike transportation ${keywordTarget}`,
      `bike transportation services in ${keywordTarget}`,
      `car transportation ${keywordTarget}`,
      `car transportation services in ${keywordTarget}`,
      `car carrier ${keywordTarget}`,
      `car carrier services in ${keywordTarget}`,
      ...(routePage ? [routePage.keyword] : []),
    ],
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      title,
      description,
      url: canonicalPath,
      images: [
        {
          url: "/images/logo.png",
          alt: "Agarwal Gatiway Packers and Movers logo",
        },
      ],
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { locationSlug } = await params;
  const areaName = getAreaFromLocationSlug(locationSlug);
  const routePage = getChennaiRouteFromSlug(locationSlug);

  if (!areaName && !routePage) {
    notFound();
  }

  const isRoutePage = Boolean(routePage);
  const locationName = routePage
    ? `Chennai to ${routePage.destination}`
    : areaName!;
  const pageTitleKeyword = routePage
    ? routePage.title
    : `Agarwal Packers And Movers in ${locationName}`;
  const packersKeyword = routePage
    ? routePage.title
    : `packers and movers in ${locationName}`;
  const moveScope = routePage
    ? `from Chennai to ${routePage.destination}`
    : `across ${locationName}`;
  const localityPhrase = routePage
    ? `Chennai pickup localities and ${routePage.destination} delivery planning`
    : `${locationName} localities`;
  const sectionAreaLabel = routePage ? "Chennai Route" : `${locationName} Service Area`;
  const routeKeywordHref = routePage?.href;
  const canonicalPath = `/${locationSlug}`;
  const whatsappHref = `https://wa.me/919991973464?text=${encodeURIComponent(
    `Hello Agarwal Gatiway, I need a quote for my move ${moveScope}.`
  )}`;
  const whatsappHelpHref = `https://wa.me/919991973464?text=${encodeURIComponent(
    `Hello Agarwal Gatiway, I need help with ${packersKeyword}.`
  )}`;

  const localizedFeatureCards = featureCards.map((card) => ({
    title: localizeText(card.title, locationName),
    description: localizeText(card.description, locationName),
  }));
  const localizedSeoHighlights = seoHighlights.map((highlight) => ({
    title: localizeText(highlight.title, locationName),
    description: localizeText(highlight.description, locationName),
  }));
  const localizedServices = services.map((service) => ({
    title: localizeText(service.title, locationName),
    description: localizeText(service.description, locationName),
  }));
  const localizedLongFormBlocks = routePage
    ? [
        {
          eyebrow: routePage.title,
          title: `Moving support from Chennai to ${routePage.destination}.`,
          paragraphs: [
            `For ${routePage.title}, customers can request packing, loading, household shifting, bike transportation and car carrier support from Chennai pickup areas to ${routePage.destination}. The move can be planned around item volume, vehicle requirement, floor level, pickup timing and delivery coordination.`,
            `The route discussion helps confirm whether the customer needs only goods transport, a complete packing plan, two-wheeler movement, Car Transportation services or Car Carrier Services. This keeps the Chennai to ${routePage.destination} relocation clearer before the move date is fixed.`,
          ],
        },
        {
          eyebrow: "Household Shifting Services",
          title: `Home relocation from Chennai to ${routePage.destination}.`,
          paragraphs: [
            `Household shifting from Chennai to ${routePage.destination} may include furniture, kitchen goods, electronics, appliances, clothes, mattresses, boxes and fragile items. The enquiry call helps estimate packing material, labour support, vehicle size and expected transit planning.`,
            `Customers can share pickup locality, destination address, preferred date and item details so the team can coordinate the relocation plan for Chennai to ${routePage.destination} with practical communication from start to finish.`,
          ],
        },
        {
          eyebrow: "Vehicle Transportation Services",
          title: `Bike and car carrier services on the Chennai to ${routePage.destination} route.`,
          paragraphs: [
            `Bike transportation services and Car Transportation services can be requested together with household shifting or separately for the Chennai to ${routePage.destination} route. Customers can provide vehicle model, pickup point, destination and timing preference during enquiry.`,
            `Car Carrier Services are useful when a customer wants a car moved along with household goods or as an independent vehicle movement. Route coordination, pickup timing and delivery planning are discussed before confirming the service.`,
          ],
        },
      ]
    : longFormBlocks.map((block) => ({
        eyebrow: localizeText(block.eyebrow, locationName),
        title: localizeText(block.title, locationName),
        paragraphs: block.paragraphs.map((paragraph) =>
          localizeText(paragraph, locationName)
        ),
      }));
  const localizedTrustPoints = trustPoints.map((point) => ({
    title: localizeText(point.title, locationName),
    description: localizeText(point.description, locationName),
  }));
  const localizedAreaParagraphs = areaWiseParagraphs.map((item) => ({
    title: routePage ? item.title : localizeText(item.title, locationName),
    description: routePage
      ? item.description
      : localizeText(item.description, locationName),
  }));
  const localizedProcessSteps = processSteps.map((step) => ({
    title: localizeText(step.title, locationName),
    description: localizeText(step.description, locationName),
  }));
  const localizedFaqs = faqs.map((faq) => ({
    question: localizeText(faq.question, locationName),
    answer: localizeText(faq.answer, locationName),
  }));
  const localizedTopTrustCards = topTrustCards.map((card) => ({
    title: localizeText(card.title, locationName),
    description: localizeText(card.description, locationName),
  }));
  const areaSuggestions = [
    locationName,
    ...chennaiAreas.filter((area) => area !== locationName),
  ];
  const locationSummary = routePage
    ? `Agarwal Gatiway Packers and Movers supports ${routePage.keyword}, household shifting services, bike transportation services, Car Transportation services and Car Carrier Services from Chennai to ${routePage.destination}.`
    : `Agarwal Gatiway Packers and Movers supports packers and movers in ${locationName}, household shifting services in ${locationName}, bike transportation services, Car Transportation services and Car Carrier Services around ${locationName} with Chennai-wide relocation support.`;
  const movingCompanyJsonLd = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: "Agarwal Gatiway Packers and Movers",
    description: `${pageTitleKeyword} offering household shifting services, bike transportation services, Car Transportation services, Car Carrier Services, packing and relocation support.`,
    telephone: "+91-9991973464",
    url: `${siteUrl}${canonicalPath}`,
    areaServed: {
      "@type": "Place",
      name: locationName,
    },
    serviceType: [
      "Packers and Movers",
      "Household Shifting Services",
      "Bike Transportation Services",
      "Car Transportation Services",
      "Car Carrier Services",
      "Loading and Unloading",
      "Local and Intercity Relocation",
    ],
    image: `${siteUrl}/images/logo.png`,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageTitleKeyword,
        item: `${siteUrl}${canonicalPath}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(movingCompanyJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <div className="grain pointer-events-none fixed inset-0 -z-10 opacity-50" />

      <div className="border-b border-white/10 bg-[#db200e] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="font-semibold">
            Agarwal Gatiway {pageTitleKeyword}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/12 px-4 py-2 font-medium">
              Household shifting, bike and car transport
            </span>
            <a
              href={phoneHref}
              className="rounded-full bg-white px-4 py-2 font-bold text-[#db200e] transition hover:bg-[#fcca0d] hover:text-[#201815]"
            >
              Call {phoneNumber}
            </a>
          </div>
        </div>
      </div>

      <SiteHeader
        phoneHref={phoneHref}
        phoneNumber={phoneNumber}
        locationsLabel={isRoutePage ? "Chennai Routes" : `${locationName} Areas`}
      />

      <main id="top">
        <section className="relative overflow-hidden">
          <div className="hero-orb absolute -left-16 top-14 h-56 w-56 rounded-full bg-[#fcca0d]/35" />
          <div className="hero-orb absolute right-0 top-24 h-72 w-72 rounded-full bg-[#db200e]/20" />

          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.08fr)_430px]">
              <div data-reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#db200e]/10 bg-white/80 px-4 py-2 text-sm font-semibold text-[#db200e] shadow-[0_20px_60px_rgba(32,24,21,0.08)]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#fcca0d]" />
                  {locationName} relocation support
                </span>

                <h1 className="mt-6 max-w-4xl font-display text-4xl font-extrabold leading-tight text-[#201815] sm:text-5xl lg:text-6xl">
                  {pageTitleKeyword} for safe household shifting, bike
                  transportation and car carrier services.
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-[#201815]/75">
                  Agarwal Gatiway helps families, tenants and businesses move{" "}
                  {moveScope} with careful packing, organized loading, on-time
                  pickup and responsive support. If you need {packersKeyword},
                  household shifting services, bike transportation services, Car
                  Transportation services or Car Carrier Services, the team can
                  discuss the move details clearly.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={phoneHref}
                    className="inline-flex items-center justify-center rounded-full bg-[#db200e] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#201815]"
                  >
                    Call Now
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-6 py-4 text-sm font-bold text-[#201815] transition hover:border-[#db200e] hover:text-[#db200e]"
                  >
                    Book Free Enquiry
                  </a>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#fcca0d] bg-[#fcca0d]/30 px-6 py-4 text-sm font-bold text-[#201815] transition hover:bg-[#fcca0d]"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    WhatsApp Quote
                  </a>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {localizedFeatureCards.map((card) => (
                    <div
                      key={card.title}
                      className="rounded-3xl border border-[#db200e]/10 bg-white/80 p-5 shadow-[0_20px_60px_rgba(32,24,21,0.08)]"
                    >
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#db200e]">
                        {card.title}
                      </p>
                      <p className="mt-3 text-base leading-7 text-[#201815]/70">
                        {card.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-col gap-5 rounded-[2rem] border border-[#db200e]/10 bg-white/80 p-5 shadow-[0_20px_60px_rgba(32,24,21,0.08)] sm:flex-row sm:items-center">
                  <div className="overflow-hidden rounded-[1.5rem] border border-[#db200e]/10 bg-white p-3">
                    <Image
                      src="/images/logo.png"
                      alt="Agarwal Gatiway truck icon"
                      width={2720}
                      height={1568}
                      className="h-20 w-auto object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#db200e]">
                      Popular {locationName} services
                    </p>
                    <p className="mt-2 text-base leading-7 text-[#201815]/75">
                      Customers can contact us for{" "}
                      <strong>{pageTitleKeyword}</strong>,{" "}
                      <strong>{packersKeyword}</strong>,{" "}
                      <strong>household shifting services</strong>,{" "}
                      <strong>bike transportation services</strong>,{" "}
                      <strong>Car Transportation services</strong> and{" "}
                      <strong>Car Carrier Services</strong> for {locationName}
                      customers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:justify-self-end" data-reveal>
                <EnquiryForm
                  areas={areaSuggestions}
                  phoneHref={phoneHref}
                  phoneNumber={phoneNumber}
                  locationName={locationName}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {localizedSeoHighlights.map((highlight) => (
              <article
                key={highlight.title}
                className="rounded-[1.75rem] border border-[#db200e]/10 bg-white p-6 shadow-[0_20px_60px_rgba(32,24,21,0.08)]"
                data-reveal
              >
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#db200e]">
                  {highlight.title}
                </p>
                <p className="mt-3 text-base leading-7 text-[#201815]/70">
                  {highlight.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="services"
          className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div data-reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#db200e]">
                Our Services
              </p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold text-[#201815] sm:text-4xl">
                Packers and movers services designed for {locationName} homes,
                offices, bikes and car carrier requirements.
              </h2>
            </div>
            <p
              className="max-w-2xl text-base leading-8 text-[#201815]/70"
              data-reveal
            >
              The page is focused on the services people typically look for
              first: packers and movers, household shifting services and bike
              transportation services, Car Transportation services and Car
              Carrier Services from {localityPhrase} to city or outstation
              destinations.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {localizedServices.map((service, index) => (
              <article
                key={service.title}
                className="rounded-[2rem] border border-[#db200e]/10 bg-white p-6 shadow-[0_20px_60px_rgba(32,24,21,0.08)]"
                data-reveal
              >
                <div
                  className={`inline-flex rounded-2xl p-3 ${index % 2 === 0 ? "bg-[#db200e]/10 text-[#db200e]" : "bg-[#fcca0d]/35 text-[#db200e]"}`}
                >
                  <ServiceIcon index={index} />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-[#201815]">
                  {service.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-[#201815]/70">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl" data-reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#db200e]">
              Moving Services for {locationName}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-[#201815] sm:text-4xl">
              Practical relocation support for homes, offices, bikes and cars.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#201815]/72">
              Moving for {locationName} can involve apartment access, pickup
              timing, fragile goods, loading labour, vehicle movement and route
              coordination. The sections below explain how Agarwal Gatiway
              supports packing, loading, household shifting, bike
              transportation, car transportation and car carrier services for
              {isRoutePage ? "this route" : "local and intercity moves"}.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {localizedLongFormBlocks.map((block) => (
              <article
                key={block.title}
                className="rounded-[2rem] border border-[#db200e]/10 bg-white p-7 shadow-[0_20px_60px_rgba(32,24,21,0.08)]"
                data-reveal
              >
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#db200e]">
                  {block.eyebrow}
                </p>
                <h3 className="mt-4 font-display text-2xl font-bold text-[#201815]">
                  {block.title}
                </h3>
                {block.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="mt-5 text-base leading-8 text-[#201815]/72"
                  >
                    {paragraph}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#201815] text-white">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
              <div data-reveal>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#fcca0d]">
                  {isRoutePage
                    ? "Why customers choose this route support"
                    : `Why ${locationName} families choose us`}
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                  Reliable moving starts with clear planning before the truck
                  arrives.
                </h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-white/75">
                  Families and businesses need clarity on packing, labour,
                  timing, route, vehicle movement and delivery coordination.
                  Our enquiry flow is built to collect those details quickly so
                  the move can be planned with fewer surprises.
                </p>

                <div className="mt-8 space-y-4">
                  {localizedTopTrustCards.map((card) => (
                    <div
                      key={card.title}
                      className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5"
                    >
                      <p className="font-semibold text-[#fcca0d]">
                        {card.title}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-white/70">
                        {card.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {localizedTrustPoints.map((point, index) => (
                  <article
                    key={point.title}
                    className="rounded-[1.9rem] border border-white/10 bg-white/5 p-6"
                    data-reveal
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#fcca0d]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-4 font-display text-2xl font-bold">
                      {point.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-white/75">
                      {point.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="locations"
          className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
        >
          <div className="grid gap-8 lg:grid-cols-[330px_minmax(0,1fr)]">
            <div data-reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#db200e]">
                {sectionAreaLabel}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-[#201815] sm:text-4xl">
                {isRoutePage
                  ? `Packers and movers coverage for ${locationName} enquiries.`
                  : `Packers and movers coverage for ${locationName} and nearby Chennai localities.`}
              </h2>
              <p className="mt-5 text-base leading-8 text-[#201815]/70">
                {isRoutePage
                  ? `This page is focused on the ${locationName} route, with pickup support from major Chennai neighborhoods like Anna Nagar, Adyar, Velachery, Tambaram, Porur, OMR and Sholinganallur.`
                  : `This page is focused on ${locationName}, and the same service structure is available across major Chennai neighborhoods like Anna Nagar, Adyar, Velachery, Tambaram, Porur, OMR, Sholinganallur and many more nearby localities.`}
              </p>
              <p className="mt-6 rounded-[1.75rem] border border-[#db200e]/10 bg-white p-5 text-sm leading-7 text-[#201815]/70 shadow-[0_20px_60px_rgba(32,24,21,0.08)]">
                {locationSummary}
              </p>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-[#db200e] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#201815]"
              >
                Enquire for {locationName}
              </a>
            </div>

            <div
              className="rounded-[2rem] border border-[#db200e]/10 bg-white p-6 shadow-[0_20px_60px_rgba(32,24,21,0.08)] sm:p-8"
              data-reveal
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#db200e]">
                    Coverage List
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-[#201815]">
                    Location pages covered under Chennai
                  </h3>
                </div>
                <span className="inline-flex w-fit rounded-full bg-[#fcca0d]/35 px-4 py-2 text-sm font-bold text-[#201815]">
                  {locationPages.length}+ areas
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {locationPages.map((page) => (
                  <a
                    key={page.slug}
                    href={page.href}
                    className={`area-chip transition hover:border-[#db200e]/35 hover:bg-[#db200e]/10 ${
                      page.area === locationName ? "bg-[#fcca0d]/45" : ""
                    }`}
                    aria-current={page.area === locationName ? "page" : undefined}
                  >
                    {page.area}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8 lg:pb-16">
          <div className="rounded-[2.5rem] border border-[#db200e]/10 bg-white p-8 shadow-[0_20px_60px_rgba(32,24,21,0.08)] sm:p-10">
            <div className="max-w-4xl" data-reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#db200e]">
                Area-Wise Moving Support
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-[#201815] sm:text-4xl">
                Chennai locality coverage for {locationName} moves.
              </h2>
              <p className="mt-5 text-base leading-8 text-[#201815]/72">
                Each pickup area has different moving conditions, from
                apartment towers and gated communities to busy streets and
                suburban routes. Customers can request packing, loading,
                household shifting, bike transportation and car carrier support
                based on their pickup area, destination and item volume.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {localizedAreaParagraphs.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[2rem] border border-[#db200e]/10 bg-[#fff8ef] p-6"
                  data-reveal
                >
                  <h3 className="font-display text-2xl font-bold text-[#201815]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-[#201815]/72">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="rounded-[2.5rem] bg-gradient-to-br from-[#db200e] to-[#201815] p-8 text-white shadow-[0_25px_80px_rgba(32,24,21,0.16)] sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div data-reveal>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#fcca0d]">
                  Simple Process
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                  How your move gets planned with us
                </h2>
                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  {localizedProcessSteps.map((step, index) => (
                    <article
                      key={step.title}
                      className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6"
                    >
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#fcca0d]">
                        Step {index + 1}
                      </p>
                      <h3 className="mt-3 font-display text-xl font-bold">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/75">
                        {step.description}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <div
                className="rounded-[2rem] border border-white/10 bg-white/10 p-6"
                data-reveal
              >
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#fcca0d]">
                  Direct Contact
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold">
                  Need an urgent moving conversation?
                </h3>
                <p className="mt-4 text-base leading-7 text-white/75">
                  Call now for household shifting, bike transportation or car
                  carrier services for {locationName}.
                </p>
                <a
                  href={phoneHref}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#fcca0d] px-6 py-4 text-sm font-bold text-[#201815] transition hover:bg-white"
                >
                  {phoneNumber}
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        <ChennaiKeywordsSection currentHref={routeKeywordHref ?? canonicalPath} />

        <section
          id="faq"
          className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8"
        >
          <div className="text-center" data-reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#db200e]">
              FAQ
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-[#201815] sm:text-4xl">
              Common questions for {packersKeyword}
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {localizedFaqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-[1.75rem] border border-[#db200e]/10 bg-white p-6 shadow-[0_20px_60px_rgba(32,24,21,0.08)]"
                data-reveal
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl font-bold text-[#201815]">
                  {faq.question}
                  <svg
                    className="h-6 w-6 shrink-0 text-[#db200e]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                <p className="mt-4 text-base leading-8 text-[#201815]/70">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-24 pt-6 sm:px-6 lg:px-8">
          <div className="rounded-[2.5rem] border border-[#db200e]/10 bg-white p-8 shadow-[0_20px_60px_rgba(32,24,21,0.08)] sm:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div data-reveal>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#db200e]">
                  Final CTA
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold text-[#201815] sm:text-4xl">
                  Need {packersKeyword} right now?
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-[#201815]/70">
                  Call{" "}
                  <a href={phoneHref} className="font-bold text-[#db200e]">
                    {phoneNumber}
                  </a>{" "}
                  or send a quick enquiry for {locationName} household shifting
                  services, bike transportation services, car transportation
                  services, car carrier services or local packers and movers
                  support.
                </p>
              </div>

              <div className="flex flex-wrap gap-4" data-reveal>
                <a
                  href={phoneHref}
                  className="inline-flex items-center justify-center rounded-full bg-[#db200e] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#201815]"
                >
                  Call {phoneNumber}
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full border border-black/10 bg-[#fcca0d]/35 px-6 py-4 text-sm font-bold text-[#201815] transition hover:bg-[#fcca0d]"
                >
                  Send Enquiry
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/10 bg-white/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-[#201815]/65 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>
            &copy; {new Date().getFullYear()} Agarwal Gatiway All rights
            reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={phoneHref} className="font-semibold text-[#db200e]">
              {phoneNumber}
            </a>
            <a href="#locations" className="font-semibold text-[#201815]/70">
              {locationName} Service Areas
            </a>
            <a href="#contact" className="font-semibold text-[#201815]/70">
              Contact Form
            </a>
            <a
              href="#chennai-keywords"
              className="font-semibold text-[#201815]/70"
            >
              Chennai Routes
            </a>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm font-bold text-[#201815]/65 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <span className="inline-flex text-center text-sm font-bold text-[#201815]/65">
            Disclaimer: Agarwal Gatiway packers and movers is in independent and
            trustworthy relocation Company in India. we do not accept or claim
            Our any partnership or any other relationship With "Agarwal Packers
            and Movers LTD" DSR Group. "Agarwal packers and movers" any of the
            other companies and business
          </span>
        </div>
      </footer>

      <div className="fixed inset-x-4 bottom-4 z-50 md:hidden">
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-black/10 bg-white/95 p-3 shadow-[0_25px_80px_rgba(32,24,21,0.16)] backdrop-blur-xl">
          <a
            href={phoneHref}
            className="inline-flex items-center justify-center rounded-xl bg-[#db200e] px-4 py-3 text-sm font-bold text-white"
          >
            Call Now
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-xl bg-[#fcca0d] px-4 py-3 text-sm font-bold text-[#201815]"
          >
            Get Quote
          </a>
        </div>
      </div>

      <a
        href={whatsappHelpHref}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-24 right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_25px_80px_rgba(32,24,21,0.16)] transition hover:scale-105 md:bottom-6 md:right-6"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </>
  );
}

function localizeText(text: string, locationName: string) {
  return text.replaceAll("Chennai", locationName);
}

function ServiceIcon({ index }: { index: number }) {
  const icons = [
    <TruckIcon key="truck" />,
    <BikeIcon key="bike" />,
    <GridIcon key="grid" />,
    <PackageIcon key="package" />,
    <ShiftIcon key="shift" />,
    <RouteIcon key="route" />,
  ];

  return icons[index] ?? <PackageIcon />;
}

function TruckIcon() {
  return (
    <svg
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7h13v10H3z" />
      <path d="M16 10h3l2 2v5h-5" />
      <circle cx="7.5" cy="18" r="1.5" />
      <circle cx="17.5" cy="18" r="1.5" />
    </svg>
  );
}

function BikeIcon() {
  return (
    <svg
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 16V7h9" />
      <path d="M13 16h4l2-3v-2l-2-2h-3" />
      <circle cx="8" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
      <path d="M14 7h4" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h7v7H4z" />
      <path d="M13 4h7v7h-7z" />
      <path d="M4 13h7v7H4z" />
      <path d="M13 13h7v7h-7z" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3 4 7v10l8 4 8-4V7z" />
      <path d="m4 7 8 4 8-4" />
      <path d="M12 11v10" />
    </svg>
  );
}

function ShiftIcon() {
  return (
    <svg
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12h18" />
      <path d="M12 3v18" />
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </svg>
  );
}

function RouteIcon() {
  return (
    <svg
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 11h18" />
      <path d="M6 7h12" />
      <path d="M7 15h10" />
      <path d="M9 19h6" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2C6.61 2 2.2 6.4 2.2 11.82c0 1.74.45 3.43 1.32 4.92L2 22l5.42-1.42a9.78 9.78 0 0 0 4.61 1.18h.01c5.42 0 9.83-4.41 9.83-9.83a9.74 9.74 0 0 0-2.82-7.02Zm-7.02 15.2h-.01a8.13 8.13 0 0 1-4.14-1.13l-.3-.18-3.21.84.86-3.13-.2-.32a8.1 8.1 0 0 1-1.26-4.37c0-4.49 3.66-8.15 8.16-8.15 2.18 0 4.22.85 5.76 2.39a8.1 8.1 0 0 1 2.38 5.76c0 4.5-3.66 8.16-8.15 8.16Zm4.47-6.1c-.25-.12-1.47-.72-1.69-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.79.96-.15.17-.29.18-.54.07-.25-.12-1.05-.39-2-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.38.1-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.41 1.01 2.58c.12.16 1.74 2.65 4.21 3.72.59.25 1.05.41 1.41.53.59.18 1.12.16 1.54.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29Z" />
    </svg>
  );
}
