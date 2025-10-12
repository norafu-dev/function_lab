"use client";

import useBreakpoint from "@/hooks/useBreakpoint";
import { getVideoUrl, getImageInfo } from "@/lib/utils";
import Hero from "./Hero";
import TabletHero from "./TabletHero";
import MobileHero from "./MobileHero";

const ResponsiveHero = ({ video, info }) => {
  const breakpoint = useBreakpoint();
  if (!video) {
    return null;
  }

  const src = getVideoUrl(video.file);
  const poster = video.thumbnail ? getImageInfo(video.thumbnail).imgUrl : null;
  const desktopInfo = info?.content ?? null;
  const mobileInfo = info?.mobileContent ?? desktopInfo;

  if (!breakpoint) {
    return <section className="h-screen w-full" aria-hidden="true" />;
  }

  if (breakpoint === "desktop")
    return <Hero src={src} poster={poster} info={desktopInfo} />;
  if (breakpoint === "tablet")
    return <TabletHero src={src} poster={poster} info={desktopInfo} />;
  if (breakpoint === "mobile")
    return <MobileHero src={src} poster={poster} info={mobileInfo} />;
  return null;
};

export default ResponsiveHero;
