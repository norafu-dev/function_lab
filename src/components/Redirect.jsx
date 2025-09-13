import Link from "next/link";
import { cn } from "@/lib/cn";

const Redirect = ({ text, href, className }) => {
  return (
    <Link
      href={href}
      className={cn(
        "block w-full text-md pt-[6px] md:pt-[10px] lg:pt-[20px] border-t border-white",
        className
      )}
    >
      {text}
    </Link>
  );
};

export default Redirect;
