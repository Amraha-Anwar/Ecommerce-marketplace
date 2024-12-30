export const product = {
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    {
      name: "image",
      title: "Product Image",
      type: "image",
    },
    {
      name: "name",
      title: "Product Title",
      type: "string",
    },
    {
      name: "price",
      title: "Product Price",
      type: "number",
    },
    {
      name: "description",
      title: "Product Description",
      type: "text",
    },
    {
      name: "slug",
      type: "slug",
      title: "Product Slug",
      options: {
        source: "name",
      },
    },
  ],
};
