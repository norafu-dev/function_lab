const info = {
  name: "info",
  title: "Info",
  type: "document",
  fields: [
    {
      name: "key",
      title: "Key",
      type: "string",
      options: {
        list: [
          { title: "Home", value: "home" },
          { title: "About", value: "about" },
          { title: "Lab", value: "lab" },
          { title: "News", value: "news" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "content",
      title: "Content",
      type: "text",
      rows: 5,
    },
    {
      name: "mobileContent",
      title: "Mobile Content",
      type: "text",
      rows: 5,
    },
    {
      name: "secondaryContent",
      title: "Secondary Content",
      type: "text",
      rows: 5,
    },
  ],
};

export default info;
