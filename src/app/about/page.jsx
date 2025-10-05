import { client } from "@/sanity/lib/client";
import { ABOUT_QUERY } from "@/sanity/lib/queries";
import { ABOUT } from "@/lib/data";
import Info from "@/components/Info";
import Redirect from "@/components/Redirect";
import { cn } from "@/lib/cn";

const AboutPage = async () => {
  const about = await client.fetch(ABOUT_QUERY);
  const awards = (about?.awards ?? [])
    .slice()
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

  return (
    <div>
      {ABOUT.info && <Info info={ABOUT.info} />}
      <div className="padding-x">
        {/* Hero */}
        {about?.title && <p className="">{about.title}</p>}

        {/* Specialties for desktop */}
        <section className="hidden md:block">
          <Title title="Specialties" />
          <div className="grid-layout">
            {about?.specialties?.map((sp, i) => (
              <div key={i} className="col-span-4">
                <SubTitle title={sp.category} />
                <ul className="text-base text-secondary">
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
              className="grid grid-cols-6 gap-x-[7px] pt-[6px] mb-[60px] border-t border-secondary"
            >
              <h2 className="text-md col-span-2">{sp.category}</h2>
              <ul className="col-span-4 text-base text-secondary">
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
          <div className="border-t border-secondary">
            {about?.manifesto?.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "grid-layout pt-[6px] lg:pt-[20px] mb-[60px] md:mb-[100px] lg:mb-[160px]",
                  i != 0 && "border-t border-secondary"
                )}
              >
                <h2 className="col-span-6 mb-[26px] md:mb-[35px] text-md">
                  {m.title}
                </h2>
                <p className="col-span-6 text-base text-secondary whitespace-pre-line md:translate-y-[2px] lg:translate-y-[8px]">
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
              <ul className="text-base">
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
              <div className="col-span-2">
                <SubTitle title="Awards & Showcases" />
              </div>
              <ul className="text-base col-span-4">
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
    <h1
      className={cn(
        "text-lg py-[6px] lg:py-[20px] mt-[200px] lg:mt-[400px] mb-[90px] md:mb-[150px] lg:mb-[200px] border-t border-secondary",
        className
      )}
    >
      {title}
    </h1>
  );
};

const SubTitle = ({ title }) => {
  return (
    <h2 className="text-md py-[6px] lg:py-[20px] mb-[30px] border-t border-secondary">
      {title}
    </h2>
  );
};

export default AboutPage;
export { Title };
