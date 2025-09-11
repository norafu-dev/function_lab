const work = {
  name: "work",
  title: "Work",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
    },
    {
      name: "homepage",
      title: "Is At Homepage",
      type: "boolean",
    },
    {
      name: "homepageOrder",
      title: "Homepage Order",
      type: "number",
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["Brand", "Print", "Digital"],
      },
    },
    {
      name: "workPageOrder",
      title: "Work Page Order",
      type: "number",
    },
    {
      name: "cover",
      title: "Cover",
      type: "object",
      fields: [
        {
          name: "image",
          title: "Image",
          type: "image",
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
    },
    {
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        {
          name: "image",
          title: "Image",
          type: "image",
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
    },

    {
      name: "tag",
      title: "Tag",
      type: "string",
    },
    {
      name: "year",
      title: "Year",
      type: "number",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "client",
      title: "Client",
      type: "string",
    },
    {
      name: "design_director",
      title: "Design Director",
      type: "string",
    },
    {
      name: "concept_development",
      title: "Concept development",
      type: "string",
    },

    {
      name: "production",
      title: "Production",
      type: "string",
    },
    {
      name: "director_photographer",
      title: "Director/Photographer",
      type: "string",
    },
    // 内容行数
    {
      name: "row1",
      title: "Row 1",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
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
        },
      ],
    },
    {
      name: "row2",
      title: "Row 2",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
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
        },
      ],
    },
    {
      name: "row3",
      title: "Row 3",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
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
        },
      ],
    },
    {
      name: "row4",
      title: "Row 4",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
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
        },
      ],
    },
    {
      name: "row5",
      title: "Row 5",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
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
        },
      ],
    },
    {
      name: "row6",
      title: "Row 6",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
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
        },
      ],
    },
    {
      name: "row7",
      title: "Row 7",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
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
        },
      ],
    },
    {
      name: "row8",
      title: "Row 8",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
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
        },
      ],
    },
    {
      name: "row9",
      title: "Row 9",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
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
        },
      ],
    },
    {
      name: "row10",
      title: "Row 10",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
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
        },
      ],
    },
    {
      name: "row16",
      title: "Row 16",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
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
        },
      ],
    },
  ],
};

export default work;
