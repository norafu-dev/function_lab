"use client";

import { useSearchParams } from "next/navigation";
import WorkCard from "./WorkCard";

const WorkList = ({ works }) => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  return (
    <div className="md:grid grid-cols-2 gap-[6px]">
      {!categoryParam
        ? works.map((work) => <WorkCard key={work.title} work={work} />)
        : works
            .filter((work) => work.category.toLowerCase() === categoryParam)
            .map((work) => <WorkCard key={work.title} work={work} />)}
    </div>
  );
};

export default WorkList;
