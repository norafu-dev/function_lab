const home = {
  name: "home",
  title: "Home",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "video",
      title: "Video",
      type: "object",
      fields: [
        {
          name: "url",
          title: "Url",
          type: "url",
        },
        {
          name: "autoplay",
          title: "Autoplay",
          type: "boolean",
        },
        {
          name: "background",
          title: "Background",
          type: "boolean",
        },
        {
          name: "loop",
          title: "Loop",
          type: "boolean",
        },
      ],
    },
  ],
};

export default home;
