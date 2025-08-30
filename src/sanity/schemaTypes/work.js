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
          type: "file",
        },
      ],
      options: {
        layout: "grid",
      },
    },
    // 首图
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
          type: "file",
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
    // 内容图片
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
              type: "file",
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
              type: "file",
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
              type: "file",
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
              type: "file",
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
              type: "file",
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
              type: "file",
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
              type: "file",
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
              type: "file",
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
              type: "file",
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
              type: "file",
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
              type: "file",
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
              type: "file",
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
              type: "file",
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
              type: "file",
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
              type: "file",
            },
          ],
        },
      ],
    },
  ],
};

export default work;
