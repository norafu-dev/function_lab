const lab = {
  name: "lab",
  title: "Lab",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "size",
      title: "Size",
      type: "string",
      options: {
        list: ["sm", "md", "lg"],
      },
    },
    {
      name: "cover",
      title: "Cover",
      type: "image",
    },
  ],
};

export default lab;
