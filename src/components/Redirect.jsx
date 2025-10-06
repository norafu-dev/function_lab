import Link from "next/link";
import { cn } from "@/lib/cn";

const Redirect = ({ text, href, className }) => {
  return (
    <Link
      href={href}
      className={cn(
        "block w-full text-[15px] leading-[18px] md:text-[24px] md:leading-[26px] lg:text-[56px] lg:leading-[60px] pt-[6px] md:pt-[10px] lg:pt-[20px] border-t border-secondary",
        className
      )}
    >
      {text}
    </Link>
  );
};

export default Redirect;
