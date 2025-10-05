"use client";

import { usePathname } from "next/navigation";
import LaptopNav from "./LaptopNav";
import MobileNav from "./MobileNav";

const Nav = () => {
  const pathname = usePathname();
  const isStudio = pathname.includes("/studio");
  if (isStudio) return null;
  return (
    <>
      <div className="hidden md:block">
        <LaptopNav />
      </div>
      <div className="md:hidden">
        <MobileNav />
      </div>
    </>
  );
};

export default Nav;
