import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full px-[15px] md:px-[30px] text-[15px] md:text-[24px] lg:text-[22px]">
      <div className="grid grid-cols-6 md:grid-cols-12 pt-[6px] mb-[200px] md:mb-[300px]  md:pt-[10px] lg:pt-[20px] border-t lg:text-[56px]">
        <div className="col-span-3 md:col-span-6">Get in touch → </div>
        <div className="col-start-* underline underline-offset-4">
          <Link href="mailto:hi@functionlab.design">hi@functionlab.design</Link>
        </div>
      </div>
      {/* phone */}
      <div className="md:hidden flex justify-between items-center h-[65px] border-t">
        <div>© Function Lab 2025</div>
        <div>
          <Link
            href="https://www.instagram.com/"
            className="hidden md:block underline underline-offset-4"
          >
            Instagram
          </Link>
          <Link
            href="mailto:hi@functionlab.design"
            className="underline underline-offset-4"
          >
            Get in touch →
          </Link>
        </div>
      </div>
      {/* tablet and desktop */}
      <div className="hidden md:grid grid-cols-12 items-center h-[90px] border-t">
        <div className="col-span-6 lg:col-span-9">© Function Lab 2025</div>
        {/* 占据剩余空间 */}
        <div className="col-start-* col-span-6 lg:col-span-3 flex justify-between">
          <Link
            href="https://www.instagram.com/"
            className="hidden md:block underline underline-offset-4"
          >
            Instagram
          </Link>
          <Link
            href="mailto:hi@functionlab.design"
            className="underline underline-offset-4"
          >
            Get in touch →
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
