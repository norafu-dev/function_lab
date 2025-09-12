import { NEWS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { getImageInfo, formatDate } from "@/lib/utils";
import Image from "next/image";
import Redirect from "@/components/Redirect";
import { ClampWithReadMore } from "@/components/work/slug/Description";
import { NEWS } from "@/lib/data";
import Info from "@/components/Info";

const NewsPage = async () => {
  const news = await client.fetch(NEWS_QUERY);
  const newsWithImageInfo = news.map((item) => ({
    title: item.title,
    cover: getImageInfo(item.cover),
    date: formatDate(item.date),
  }));
  return (
    <div>
      {NEWS.info && <Info info={NEWS.info} />}
      <div className="px-[15px] md:px-[30px]">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-[6px] gap-y-[60px] lg:gap-x-[30px] lg:gap-y-[30px]">
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

        {NEWS.keepReading && (
          <div className="md:w-1/2 mt-[30px] md:mt-[75px] lg:mt-[100px] mb-[100px] md:mb-[200px] lg:mb-[400px]">
            <h2 className="mb-[15px] lg:mb-[30px] text-md">Keep reading →</h2>
            <ClampWithReadMore
              text={NEWS.keepReading}
              lines={4}
              color="text-[#8C8C8C]"
            />
          </div>
        )}

        <div className="w-full mb-[15px] md:mb-[30px] lg:mb-[90px]">
          <Redirect text="See our projects →" href={`/work`} />
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
