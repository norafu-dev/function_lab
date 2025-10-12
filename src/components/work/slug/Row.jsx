import ImageCard from "../ImageCard";
import VideoCard from "../VideoCard";
import { getImageInfo } from "@/lib/utils";

const DEFAULT_VIDEO_RATIO = 16 / 9;

const getVideoAspectRatio = (aspectRatio) => {
  if (!aspectRatio) return DEFAULT_VIDEO_RATIO;

  const [width, height] = aspectRatio.split(":").map(Number);

  if (!Number.isFinite(width) || !Number.isFinite(height) || height === 0) {
    return DEFAULT_VIDEO_RATIO;
  }

  return width / height;
};

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

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: getVideoAspectRatio(item.aspectRatio) }}
    >
      <VideoCard src={item} alt={alt} />
    </div>
  );
}

export default Row;
