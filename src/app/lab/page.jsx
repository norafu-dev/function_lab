import { client } from "@/sanity/lib/client";
import { LAB_QUERY } from "@/sanity/lib/queries";
import INFOS from "@/lib/data";
import DomWanderCanvas from "@/components/lab/DomWanderCanvas";

const LabPage = async () => {
  const lab = await client.fetch(LAB_QUERY);
  return (
    <div>
      {INFOS.lab && (
        <div className="w-full px-[15px] md:px-[30px] mt-[400px] mb-[200px] text-[56px] leading-[60px]">
          {INFOS.lab}
        </div>
      )}
      <div className="w-full h-[100vh] sm:h-[300vh]">
        <DomWanderCanvas lab={lab} />
      </div>
    </div>
  );
};

export default LabPage;
