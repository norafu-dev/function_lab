const about = {
  name: "about",
  title: "About",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "specialties",
      title: "Specialties",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "category", title: "Category", type: "string" },
            {
              name: "items",
              title: "Items",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
        },
      ],
    },

    {
      name: "manifesto",
      title: "Manifesto",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "content", title: "Content", type: "text" },
          ],
        },
      ],
    },

    {
      name: "clients",
      title: "Clients",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Name",
              type: "string",
            },
            {
              name: "industry",
              title: "Industry",
              type: "string",
            },
          ],
        },
      ],
    },

    {
      name: "awards",
      title: "Awards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "year", title: "Year", type: "number" },
          ],
        },
      ],
    },
  ],
};

export default about;
