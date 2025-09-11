import { getVideoUrl, getImageInfo } from "@/lib/utils";

const VideoCard = ({ src }) => {
  const { file, thumbnail } = src;
  const videoUrl = getVideoUrl(file);
  const { imgUrl } = getImageInfo(thumbnail);

  return (
    <video
      src={videoUrl}
      style={{ aspectRatio: 1920 / 1080 }}
      thumbnail={imgUrl}
      autoPlay
      loop
    />
  );
};

export default VideoCard;
