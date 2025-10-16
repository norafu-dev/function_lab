import { client } from "@/sanity/lib/client";
import { ABOUT_QUERY, INFO_QUERY_BY_KEY } from "@/sanity/lib/queries";
import Info from "@/components/Info";
import Redirect from "@/components/Redirect";
import { cn } from "@/lib/cn";
import AboutScrollAnimations from "@/components/about/AboutScrollAnimations";

const AboutPage = async () => {
  const about = await client.fetch(ABOUT_QUERY);
  const info = await client.fetch(INFO_QUERY_BY_KEY, { key: "about" });
  const awards = (about?.awards ?? [])
    .slice()
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

  return (
    <div>
      <AboutScrollAnimations />
      {info?.content && <Info info={info.content} />}
      <div className="padding-x">
        {/* Hero */}
        {about?.title && (
          <p className="about-animate-fade text-base mt-[40px] md:mt-[60px]">
            {about.title}
          </p>
        )}

        {/* Specialties for desktop */}
        <section className="hidden md:block">
          <Title title="Specialties" />
          <div className="grid-layout">
            {about?.specialties?.map((sp, i) => (
              <div key={i} className="col-span-4 about-animate-subblock">
                <div className="about-animate-line h-px w-full bg-[var(--color-secondary)]" />
                <h2 className="about-animate-subtext text-md py-[6px] lg:py-[20px] mb-[30px]">
                  {sp.category}
                </h2>
                <ul className="text-base text-secondary about-animate-fade">
                  {sp.items?.map((it, idx) => (
                    <li key={idx}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Specialties for mobile */}
        <section className="block md:hidden">
          <Title title="Specialties" />
          {about?.specialties?.map((sp, i) => (
            <div
              key={i}
              className="about-animate-subblock grid grid-cols-6 gap-x-[7px] mb-[60px]"
            >
              <div className="about-animate-line col-span-6 h-px bg-[var(--color-secondary)]" />
              <h2 className="about-animate-subtext text-md col-span-2 py-[6px]">
                {sp.category}
              </h2>
              <ul className="col-span-4 text-base text-secondary about-animate-fade pt-[6px] md:pt-0">
                {sp.items?.map((it, idx) => (
                  <li key={idx}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Manifesto */}
        <section>
          <Title title="Manifesto" />
          <div className="about-animate-subblock">
            <div className="about-animate-line h-px w-full bg-[var(--color-secondary)]" />
            {about?.manifesto?.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "grid-layout pt-[6px] lg:pt-[20px] mb-[60px] md:mb-[100px] lg:mb-[160px] about-animate-fade",
                  i != 0 && "border-t border-secondary"
                )}
              >
                <h2 className="col-span-6 mb-[26px] md:mb-[35px] text-md about-animate-fade">
                  {m.title}
                </h2>
                <p className="col-span-6 text-base text-secondary whitespace-pre-line md:translate-y-[2px] lg:translate-y-[8px] about-animate-fade">
                  {m.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Clients + Awards */}
        <section className="my-[200px] lg:my-[400px]">
          <div className="grid-layout">
            <div className="col-span-6">
              <SubTitle title="Clients" />
              <ul className="text-base about-animate-fade">
                {about?.clients?.map((c, i) => (
                  <li key={i} className="break-inside-avoid">
                    {c.name}
                    {c.industry ? (
                      <span className="text-secondary pl-[5px]">
                        {c.industry}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-6 mt-[100px] md:mt-[0px]">
              <SubTitle title="Awards & Showcases" />
              <ul className="text-base col-span-4 about-animate-fade">
                {awards.map((a, i) => (
                  <li key={i}>
                    <span className="pr-[5px]">{a.title}</span>
                    <span className="text-secondary">
                      {a.year ? a.year : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
      <div className="w-full padding-x mb-[15px] md:mb-[30px] lg:mb-[90px]">
        <Redirect text="See our projects →" href={`/work`} />
      </div>
    </div>
  );
};

const Title = ({ title, className }) => {
  return (
    <div
      className={cn(
        "about-title-block mt-[200px] lg:mt-[400px] mb-[60px] md:mb-[100px] lg:mb-[200px]",
        className
      )}
    >
      <div className="about-animate-line h-px w-full bg-[var(--color-secondary)]" />
      <h1 className="about-animate-title text-lg py-[6px] lg:py-[20px]">
        {title}
      </h1>
    </div>
  );
};

const SubTitle = ({ title, className }) => {
  return (
    <div className={cn("about-subtitle-block mb-[30px]", className)}>
      <div className="about-animate-line h-px w-full bg-[var(--color-secondary)]" />
      <h2 className="about-animate-subtext text-md py-[6px] lg:py-[20px]">
        {title}
      </h2>
    </div>
  );
};

export default AboutPage;
export { Title };
