"use client";

import { useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Info from "@/components/Info";
import Redirect from "@/components/Redirect";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AboutContent = ({ about, info, awards }) => {
  const containerRef = useRef(null);

  const sortedAwards = useMemo(() => awards, [awards]);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray(
        containerRef.current?.querySelectorAll(".about-section") ?? []
      );

      sections.forEach((section) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        });

        const titleLine = section.querySelector(".about-title-line");
        const titleText = section.querySelectorAll(".about-title-text");
        const subtitleLines = section.querySelectorAll(".about-subtitle-line");
        const subtitleText = section.querySelectorAll(".about-subtitle-text");
        const fades = section.querySelectorAll(".about-fade");

        if (titleLine) {
          tl.fromTo(
            titleLine,
            { scaleX: 0, transformOrigin: "left" },
            {
              scaleX: 1,
              duration: 0.6,
              ease: "power2.out",
            }
          );
        }

        if (titleText.length) {
          tl.from(
            titleText,
            {
              opacity: 0,
              y: "40%",
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.05,
            },
            "-=0.3"
          );
        }

        if (subtitleLines.length) {
          tl.from(
            subtitleLines,
            {
              scaleX: 0,
              transformOrigin: "left",
              duration: 0.4,
              ease: "power2.out",
              stagger: 0.08,
            },
            "-=0.2"
          );
        }

        if (subtitleText.length) {
          tl.from(
            subtitleText,
            {
              opacity: 0,
              y: 20,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.08,
            },
            "-=0.2"
          );
        }

        if (fades.length) {
          tl.from(
            fades,
            {
              opacity: 0,
              y: 20,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.1,
            },
            "-=0.15"
          );
        }
      });

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      {info?.content && <Info info={info.content} />}

      <div className="padding-x">
        {about?.title && (
          <p className="about-title-paragraph about-fade text-base mt-[40px] md:mt-[60px]">
            {about.title}
          </p>
        )}

        {/* Specialties for desktop */}
        <section className="about-section hidden md:block">
          <AnimatedTitle title="Specialties" />
          <div className="grid-layout">
            {about?.specialties?.map((sp, i) => (
              <div key={i} className="col-span-4 about-fade">
                <AnimatedSubTitle title={sp.category} />
                <ul className="text-base text-secondary">
                  {sp.items?.map((it, idx) => (
                    <li key={idx} className="about-fade">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Specialties for mobile */}
        <section className="about-section block md:hidden">
          <AnimatedTitle title="Specialties" />
          {about?.specialties?.map((sp, i) => (
            <div
              key={i}
              className="grid grid-cols-6 gap-x-[7px] pt-[6px] mb-[60px]"
            >
              <AnimatedSubTitle
                title={sp.category}
                className="col-span-2"
                lineClassName="col-span-6"
              />
              <ul className="col-span-4 text-base text-secondary about-fade">
                {sp.items?.map((it, idx) => (
                  <li key={idx}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Manifesto */}
        <section className="about-section">
          <AnimatedTitle title="Manifesto" />
          <div className="border-t border-secondary">
            {about?.manifesto?.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "grid-layout pt-[6px] lg:pt-[20px] mb-[60px] md:mb-[100px] lg:mb-[160px]",
                  i !== 0 && "border-t border-secondary"
                )}
              >
                <h2 className="col-span-6 mb-[26px] md:mb-[35px] text-md about-fade">
                  {m.title}
                </h2>
                <p className="col-span-6 text-base text-secondary whitespace-pre-line md:translate-y-[2px] lg:translate-y-[8px] about-fade">
                  {m.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Clients + Awards */}
        <section className="about-section my-[200px] lg:my-[400px]">
          <div className="grid-layout">
            <div className="col-span-6">
              <AnimatedSubTitle title="Clients" />
              <ul className="text-base">
                {about?.clients?.map((c, i) => (
                  <li key={i} className="break-inside-avoid about-fade">
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
              <AnimatedSubTitle title="Awards & Showcases" />
              <ul className="text-base col-span-4">
                {sortedAwards.map((a, i) => (
                  <li key={i} className="about-fade">
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

const AnimatedTitle = ({ title, className }) => {
  return (
    <div
      className={cn(
        "about-title-block mb-[90px] md:mb-[150px] lg:mb-[200px]",
        className
      )}
    >
      <div className="about-title-line about-line" />
      <h1 className="about-title-text text-lg py-[6px] lg:py-[20px] mt-[200px] lg:mt-[400px]">
        {title}
      </h1>
    </div>
  );
};

const AnimatedSubTitle = ({ title, className, lineClassName }) => {
  return (
    <div className={cn("about-subtitle-block", className)}>
      <div className={cn("about-subtitle-line about-line", lineClassName)} />
      <h2 className="about-subtitle-text text-md py-[6px] lg:py-[20px] mb-[30px]">
        {title}
      </h2>
    </div>
  );
};

export default AboutContent;
