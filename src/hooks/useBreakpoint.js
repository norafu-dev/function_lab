import { useEffect, useState } from "react";

const TABLET_MIN_WIDTH = 600;
const DESKTOP_MIN_WIDTH = 1035;

const getBreakpoint = (width) => {
  if (width >= DESKTOP_MIN_WIDTH) return "desktop";
  if (width >= TABLET_MIN_WIDTH) return "tablet";
  return "mobile";
};

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleResize = () => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
};

export default useBreakpoint;
