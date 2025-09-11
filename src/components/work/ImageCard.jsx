import Image from "next/image";
import { getImageInfo } from "@/lib/utils";

const ImageCard = ({ src, alt }) => {
  const { imgUrl } = getImageInfo(src.image);
  return (
    <div className="w-full h-full">
      <Image src={imgUrl} alt={alt} fill />
    </div>
  );
};

export default ImageCard;
