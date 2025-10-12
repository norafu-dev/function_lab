import { client } from "@/sanity/lib/client";
import {
  WORK_QUERY_BY_SLUG,
  NEXT_WORK_BY_WORK_PAGE_ORDER,
  FIRST_WORK_BY_WORK_PAGE_ORDER,
} from "@/sanity/lib/queries";
import Description from "@/components/work/slug/Description";
import Hero from "@/components/work/slug/Hero";
import Row from "@/components/work/slug/Row";
import Credits from "@/components/work/slug/Credits";
import Redirect from "@/components/Redirect";

const WorkPage = async ({ params }) => {
  const { slug } = await params;
  const work = await client.fetch(WORK_QUERY_BY_SLUG, { slug });

  const { title, hero, description, tags, year, credits, rows, workPageOrder } =
    work;

  const validRows = Array.isArray(rows)
    ? rows.filter((r) => Array.isArray(r) && r.length > 0 && r.length <= 2)
    : [];

  // 尝试获取下一个项目
  let nextWork = await client.fetch(NEXT_WORK_BY_WORK_PAGE_ORDER, {
    workPageOrder: workPageOrder + 1,
  });

  // 如果没有下一个项目（已经是最后一个），则获取第一个项目
  if (!nextWork) {
    nextWork = await client.fetch(FIRST_WORK_BY_WORK_PAGE_ORDER);
  }

  return (
    <div>
      <Hero cover={hero} title={title} />
      <Description
        title={title}
        description={description}
        tags={tags}
        year={year}
        credits={credits}
      />
      {validRows.map((row, i) => (
        <Row key={i} items={row} alt={`${title}-row-${i + 1}`} />
      ))}
      <Credits credits={credits} />
      {nextWork && (
        <div className="w-full padding-x mb-[15px] md:mb-[30px] lg:mb-[90px]">
          <Redirect text="Next project →" href={`/work/${nextWork.slug}`} />
        </div>
      )}
    </div>
  );
};

export default WorkPage;
