import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { ABOUT_QUERY } from "@/sanity/lib/queries";

const AboutPage = async () => {
  const about = await client.fetch(ABOUT_QUERY);
  const awards = (about?.awards ?? [])
    .slice()
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

  return (
    <div className="px-[15px] md:px-[30px] pt-[120px] md:pt-[160px]">
      {/* Hero */}
      {about?.title && (
        <p className="max-w-[1200px] text-[28px] md:text-[48px] lg:text-[64px] leading-tight">
          {about.title}
        </p>
      )}

      {/* Specialties */}
      <section className="mt-[120px] border-t pt-[40px] md:pt-[60px]">
        <h2 className="text-[48px] md:text-[80px] lg:text-[96px] leading-none mb-[30px] md:mb-[50px]">
          Specialties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[40px] md:gap-[60px] pb-[40px] md:pb-[80px] border-b">
          {about?.specialties?.map((sp, i) => (
            <div key={i}>
              <h3 className="text-[22px] md:text-[26px] mb-4">{sp.category}</h3>
              <ul className="space-y-2 text-white/70 text-[12px] md:text-[14px]">
                {sp.items?.map((it, idx) => (
                  <li key={idx}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Manifesto */}
      <section className="mt-[80px] md:mt-[120px]">
        <h2 className="text-[48px] md:text-[80px] lg:text-[96px] leading-none mb-[20px] md:mb-[30px]">
          Manifesto
        </h2>
        <div className="border-t">
          {about?.manifesto?.map((m, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-2 gap-[20px] md:gap-[40px] py-[20px] md:py-[30px] border-b"
            >
              <h3 className="text-[18px] md:text-[22px]">{m.title}</h3>
              <p className="text-white/80 text-[12px] md:text-[14px] leading-relaxed">
                {m.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Clients + Awards */}
      <section className="mt-[80px] md:mt-[120px] border-t pt-[20px] md:pt-[30px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[60px]">
          <div>
            <h3 className="text-[22px] md:text-[26px] mb-4">Clients</h3>
            <ul className="columns-2 md:columns-3 gap-6 text-white/70 text-[12px] md:text-[14px] leading-relaxed">
              {about?.clients?.map((c, i) => (
                <li key={i} className="break-inside-avoid">
                  {c.name}
                  {c.industry ? (
                    <span className="text-white/50"> — {c.industry}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[22px] md:text-[26px] mb-4">
              Awards & Showcases
            </h3>
            <ul className="text-white/70 text-[12px] md:text-[14px] space-y-1">
              {awards.map((a, i) => (
                <li key={i}>
                  <span className="text-white">{a.title}</span>
                  {a.year ? ` ${a.year}` : ""}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section className="mt-[80px] md:mt-[120px] border-t pt-[20px] md:pt-[30px] pb-[60px]">
        <div className="grid grid-cols-6 md:grid-cols-12 items-center text-[18px] md:text-[24px] lg:text-[22px]">
          <div className="col-span-6 md:col-span-6">See our projects →</div>
          <div className="col-span-6 md:col-span-6 underline underline-offset-4">
            <Link href="mailto:hi@functionlab.design">
              hi@functionlab.design
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
