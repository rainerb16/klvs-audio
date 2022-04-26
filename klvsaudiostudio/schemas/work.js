export default {
  name: "work",
  title: "Work",
  type: "document",
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: "title",
      type: "string",
    },
    {
      name: "description",
      type: "text"
    },
    {
      name: "workType",
      title: "Work Type",
      type: "string",
      options: {
        list: [
          {
            value: "mastering", 
            title: "Mastering"
          },
          {
            value: "personal", 
            title: "Personal"
          },
          {
            value: "other", 
            title: "Other"
          }
        ]
      }
    },
    {
      name: "link",
      type: "url",
    },
    {
      name: "tags",
      type: "array",
      of: [
        {
          type: "string"
        }
      ],
      options: {
        layout: "tags"
      }
    }
  ],
};
