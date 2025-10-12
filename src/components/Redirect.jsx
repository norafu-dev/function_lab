import Link from "next/link";
import { cn } from "@/lib/cn";

const Redirect = ({ text, href, className }) => {
  return (
    <Link
      href={href}
      className={cn(
        "redirect-link block w-full text-[15px] leading-[18px] md:text-[24px] md:leading-[26px] lg:text-[56px] lg:leading-[60px] pt-[6px] md:pt-[10px] lg:pt-[20px] border-t border-secondary transition-colors duration-300",
        className
      )}
    >
      <span className="inline-flex items-center gap-2">
        <span className="redirect-text transition-colors duration-300">
          {text.replace("→", "")}
        </span>
        <span className="redirect-arrow inline-flex transition-transform duration-300 translate-x-0">
          →
        </span>
      </span>
    </Link>
  );
};

export default Redirect;
