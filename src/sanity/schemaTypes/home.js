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
          name: "file",
          title: "File",
          type: "file",
          options: {
            accept: ["video/*"],
          },
        },
        {
          name: "thumbnail",
          title: "Thumbnail",
          type: "image",
        },
      ],
    },
  ],
};

export default home;
