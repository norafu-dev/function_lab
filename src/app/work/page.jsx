import { client } from "@/sanity/lib/client";
import { WORKS_QUERY } from "@/sanity/lib/queries";
import Categories from "@/components/work/Categories";
import WorkList from "@/components/work/WorkList";

const WorkListPage = async () => {
  const categories = [
    { label: "All", href: "/work" },
    { label: "Brand", href: "/work?category=brand" },
    { label: "Print", href: "/work?category=print" },
    { label: "Digital", href: "/work?category=digital" },
  ];
  const works = await client.fetch(WORKS_QUERY);

  return (
    <div className="mt-[250px] md:mt-[390px]">
      <Categories categories={categories} />
      <WorkList works={works} />
    </div>
  );
};

export default WorkListPage;
