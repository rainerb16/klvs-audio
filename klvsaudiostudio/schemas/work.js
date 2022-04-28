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
            value: "mixing", 
            title: "Mixing"
          }
        ]
      }
    },
    {
      title: 'URL',
      name: 'href',
      type: 'url',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel']
      })
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
    },
    {
      name: 'code',
      title: 'Code Embed',
      type: 'code',
      options: {
        theme: 'solarized_dark',
        language: 'js',
        languageAlternatives: [
          {title: 'Javascript', value: 'js'},
          {title: 'HTML', value: 'html'},
          {title: 'CSS', value: 'css'},
          {title: 'SASS', value: 'sass'},
        ]
      }
    },
  ],
};
