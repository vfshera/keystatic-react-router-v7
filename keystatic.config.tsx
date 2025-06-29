import { collection, config, fields } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "content/posts/*",
      columns: ["title", "description"],
      format: { contentField: "content" },
      schema: {
        cover: fields.image({
          label: "Cover Image",
          directory: "public/images/posts",
          publicPath: "/images/posts/",
        }),
        title: fields.slug({
          name: {
            label: "Title",
            description: "The title of the post",
            validation: { isRequired: true },
          },
          slug: {
            label: "SEO-friendly slug",
            description: "This will define the file name for this entry",
          },
        }),
        description: fields.text({ label: "Description", multiline: true }),
        publishDate: fields.date({
          label: "Publish Date",
          defaultValue: new Date().toString(),
          validation: { isRequired: true },
        }),
        isDraft: fields.checkbox({
          label: "Draft",
          description: "Mark this post as draft",
          defaultValue: true,
        }),
        content: fields.markdoc({ label: "Content" }),
      },
    }),
  },
});
