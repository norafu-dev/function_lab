const WorkPage = async ({ params }) => {
  const { slug } = await params;
  return <div> {slug} </div>;
};

export default WorkPage;
