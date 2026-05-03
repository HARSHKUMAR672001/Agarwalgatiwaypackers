import { chennaiKeywordPages } from "@/lib/site-content";

type ChennaiKeywordsSectionProps = {
  currentHref?: string;
};

export function ChennaiKeywordsSection({
  currentHref,
}: ChennaiKeywordsSectionProps) {
  return (
    <section
      id="chennai-keywords"
      className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
    >
      <div className="rounded-[2.5rem] border border-[#db200e]/10 bg-white p-8 shadow-[0_20px_60px_rgba(32,24,21,0.08)] sm:p-10">
        <div className="max-w-4xl" data-reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#db200e]">
            Popular Chennai Routes
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[#201815] sm:text-4xl">
            Packers and movers from Chennai to major Indian cities.
          </h2>
          <p className="mt-5 text-base leading-8 text-[#201815]/72">
            Choose your destination route to view moving support for household
            shifting, packing, loading, bike transportation, Car Transportation
            services and Car Carrier Services from Chennai.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {chennaiKeywordPages.map((page) => (
            <a
              key={page.href}
              href={page.href}
              className={`area-chip transition hover:border-[#db200e]/35 hover:bg-[#db200e]/10 ${
                page.href === currentHref ? "bg-[#fcca0d]/45" : ""
              }`}
              aria-current={page.href === currentHref ? "page" : undefined}
            >
              {page.keyword}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
