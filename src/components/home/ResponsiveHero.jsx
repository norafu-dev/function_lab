"use client";

import useBreakpoint from "@/hooks/useBreakpoint";
import Hero from "./Hero";
import TabletHero from "./TabletHero";
import MobileHero from "./MobileHero";

const ResponsiveHero = () => {
  const breakpoint = useBreakpoint();

  if (!breakpoint) {
    return <section className="h-screen w-full" aria-hidden="true" />;
  }

  if (breakpoint === "desktop") return <Hero />;
  if (breakpoint === "tablet") return <TabletHero />;
  if (breakpoint === "mobile") return <MobileHero />;
  return null;
};

export default ResponsiveHero;
