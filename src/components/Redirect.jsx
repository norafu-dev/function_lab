import Link from "next/link";

const Redirect = ({ text, href }) => {
  return (
    <Link
      href={href}
      className="block w-full text-md pt-[6px] md:pt-[10px] lg:pt-[20px] border-t border-white"
    >
      {text}
    </Link>
  );
};

export default Redirect;
