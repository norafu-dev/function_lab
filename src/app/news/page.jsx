import INFOS from "@/lib/data";
import { NEWS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { getImageInfo, formatDate } from "@/lib/utils";
import Image from "next/image";

const NewsPage = async () => {
  const news = await client.fetch(NEWS_QUERY);
  const newsWithImageInfo = news.map((item) => ({
    title: item.title,
    cover: getImageInfo(item.cover),
    date: formatDate(item.date),
  }));
  return (
    <div className="px-[15px] md:px-[30px]">
      {INFOS.news && (
        <div className="w-full mt-[400px] mb-[200px] text-[56px] leading-[60px]">
          {INFOS.news}
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-[6px] gap-y-[60px] sm:gap-x-[30px] sm:gap-y-[30px]">
        {newsWithImageInfo.map(
          ({ cover: { imgUrl, ratio }, title, date }, index) => (
            <div key={index}>
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: ratio }}
              >
                <Image src={imgUrl} alt={title || `news-${index + 1}`} fill />
              </div>
              <div className="text-[12px] leading-[15px] pt-[10px] lg:text-[22px] lg:leading-[28px] lg:pt-[30px]">
                <span className="text-[#373737]">{date}</span>
                &nbsp;
                {title}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default NewsPage;
