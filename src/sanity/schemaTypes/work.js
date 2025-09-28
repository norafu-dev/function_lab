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
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Brand", value: "Brand" },
          { title: "Print", value: "Print" },
          { title: "Digital", value: "Digital" },
        ],
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
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
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
      name: "credits",
      title: "Credits",
      type: "text",
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
                {
                  name: "autoplay",
                  title: "Autoplay",
                  type: "boolean",
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
                {
                  name: "autoplay",
                  title: "Autoplay",
                  type: "boolean",
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
                {
                  name: "autoplay",
                  title: "Autoplay",
                  type: "boolean",
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
                {
                  name: "autoplay",
                  title: "Autoplay",
                  type: "boolean",
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
                {
                  name: "autoplay",
                  title: "Autoplay",
                  type: "boolean",
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
                {
                  name: "autoplay",
                  title: "Autoplay",
                  type: "boolean",
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
                {
                  name: "autoplay",
                  title: "Autoplay",
                  type: "boolean",
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
                {
                  name: "autoplay",
                  title: "Autoplay",
                  type: "boolean",
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
                {
                  name: "autoplay",
                  title: "Autoplay",
                  type: "boolean",
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
                {
                  name: "autoplay",
                  title: "Autoplay",
                  type: "boolean",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "row11",
      title: "Row 11",
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
                {
                  name: "autoplay",
                  title: "Autoplay",
                  type: "boolean",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "row12",
      title: "Row 12",
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
                {
                  name: "autoplay",
                  title: "Autoplay",
                  type: "boolean",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "row13",
      title: "Row 13",
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
                {
                  name: "autoplay",
                  title: "Autoplay",
                  type: "boolean",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "row14",
      title: "Row 14",
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
                {
                  name: "autoplay",
                  title: "Autoplay",
                  type: "boolean",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "row15",
      title: "Row 15",
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
                {
                  name: "autoplay",
                  title: "Autoplay",
                  type: "boolean",
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
                {
                  name: "autoplay",
                  title: "Autoplay",
                  type: "boolean",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "row17",
      title: "Row 17",
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
                {
                  name: "autoplay",
                  title: "Autoplay",
                  type: "boolean",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "row18",
      title: "Row 18",
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
      name: "row19",
      title: "Row 19",
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
                {
                  name: "autoplay",
                  title: "Autoplay",
                  type: "boolean",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "row20",
      title: "Row 20",
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
                {
                  name: "autoplay",
                  title: "Autoplay",
                  type: "boolean",
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
