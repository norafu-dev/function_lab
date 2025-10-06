"use client";

import { useSearchParams } from "next/navigation";
import WorkCard from "./WorkCard";

const WorkList = ({ works }) => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  // 添加数据验证
  if (!works || !Array.isArray(works)) {
    return <div className="text-center py-20">暂无作品数据</div>;
  }

  // 过滤掉没有 hero 数据的作品
  const validWorks = works.filter(
    (work) => work && work.hero && work.hero.type
  );

  if (validWorks.length === 0) {
    return <div className="text-center py-20">暂无有效的作品数据</div>;
  }

  return (
    <div className="lg:grid lg:grid-cols-2 gap-[6px] mb-[200px]">
      {!categoryParam
        ? validWorks.map((work) => (
            <WorkCard
              key={work.title}
              work={work}
              autoplay={true}
              scale={true}
            />
          ))
        : validWorks
            .filter(
              (work) =>
                Array.isArray(work.category) &&
                work.category
                  .map((item) => item.toLowerCase())
                  .includes(categoryParam)
            )
            .map((work) => (
              <WorkCard
                key={work.title}
                work={work}
                autoplay={true}
                scale={true}
              />
            ))}
    </div>
  );
};

export default WorkList;
