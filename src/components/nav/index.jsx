"use client";

import LaptopNav from "./LaptopNav";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathname = usePathname();
  const isStudio = pathname.includes("/studio");
  if (isStudio) return null;
  return (
    <div className="hidden md:block">
      <LaptopNav />
    </div>
  );
};

export default Nav;
