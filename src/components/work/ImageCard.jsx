import Image from "next/image";
import { getImageInfo } from "@/lib/utils";
import { cn } from "@/lib/cn";

const ImageCard = ({ src, alt, className }) => {
  const { imgUrl } = getImageInfo(src.image);
  return (
    <div className={cn("w-full h-full", className)}>
      <Image src={imgUrl} alt={alt} fill />
    </div>
  );
};

export default ImageCard;
