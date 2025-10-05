"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const isStudio = pathname.includes("/studio");
  if (isStudio) return null;
  return (
    <footer className="w-full padding-x footer-text">
      <div className="grid-layout mb-[200px] md:mb-[300px] lg:mb-[400px] pt-[6px] md:pt-[10px] lg:pt-[20px] border-t border-secondary">
        <div className="col-span-3 md:col-span-6">Get in touch → </div>
        <div className="col-start-* underline underline-offset-2 md:underline-offset-7">
          <Link href="mailto:hi@functionlab.design">hi@functionlab.design</Link>
        </div>
      </div>
      {/* phone */}
      <div className="md:hidden flex justify-between items-center h-[65px] border-t">
        <div>© Function Lab 2025</div>
        <div>
          <Link
            href="https://www.instagram.com/function_lab_design/"
            className="hidden md:block underline-offset"
          >
            Instagram
          </Link>
          <Link
            href="mailto:hi@functionlab.design"
            className="underline underline-offset-2"
          >
            Get in touch →
          </Link>
        </div>
      </div>
      {/* tablet and desktop */}
      <div className="hidden md:grid grid-cols-12 items-center h-[89px] border-t lg:text-[22px] lg:leading-[28px]">
        <div className="col-span-6 lg:col-span-9">© Function Lab 2025</div>
        {/* 占据剩余空间 */}
        <div className="col-start-* col-span-6 lg:col-span-3 flex justify-between">
          <Link
            href="https://www.instagram.com/function_lab_design/"
            className="hidden md:block underline-offset"
          >
            Instagram
          </Link>
          <Link
            href="mailto:hi@functionlab.design"
            className="underline-offset"
          >
            Get in touch →
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
