import { cn } from "@/lib/cn";
import { renderStarEmphasis } from "@/lib/utils";

const Info = ({ info, className }) => {
  return (
    <h1
      className={cn(
        "w-full px-[15px] md:px-[30px] mt-[250px] lg:mt-[392px] text-md select-none",
        className
      )}
    >
      {renderStarEmphasis(info)}
    </h1>
  );
};

export default Info;
