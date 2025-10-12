import ImageCard from "../ImageCard";
import VideoCard from "../VideoCard";
import { getImageInfo } from "@/lib/utils";

const Row = ({ items = [], alt }) => {
  const twoCols = items.length === 2;

  return (
    <div
      className={`${twoCols ? "grid md:grid-cols-2 gap-[6px]" : ""} mb-[6px] padding-x`}
    >
      {twoCols ? (
        <>
          <Media item={items[0]} alt={alt} />
          <Media item={items[1]} alt={alt} />
        </>
      ) : (
        items[0] && <Media item={items[0]} alt={alt} />
      )}
    </div>
  );
};

function Media({ item, alt }) {
  if (!item) return null;

  if (item.type === "image" && item.image) {
    const { ratio } = getImageInfo(item.image);
    return (
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: ratio }}
      >
        <ImageCard src={item} alt={alt} />
      </div>
    );
  }

  // 视频统一 1440/810
  return (
    <div className="relative w-full overflow-hidden aspect-[1440/810]">
      <VideoCard src={item} alt={alt} />
    </div>
  );
}

export default Row;
