"use client";

import useBreakpoint from "@/hooks/useBreakpoint";
import { getVideoUrl, getImageInfo } from "@/lib/utils";
import Hero from "./Hero";
import TabletHero from "./TabletHero";
import MobileHero from "./MobileHero";

const ResponsiveHero = ({ video }) => {
  const breakpoint = useBreakpoint();
  const src = getVideoUrl(video.file);
  const poster = video.thumbnail ? getImageInfo(video.thumbnail).imgUrl : null;

  if (!breakpoint) {
    return <section className="h-screen w-full" aria-hidden="true" />;
  }

  if (breakpoint === "desktop") return <Hero src={src} poster={poster} />;
  if (breakpoint === "tablet") return <TabletHero src={src} poster={poster} />;
  if (breakpoint === "mobile") return <MobileHero src={src} poster={poster} />;
  return null;
};

export default ResponsiveHero;
