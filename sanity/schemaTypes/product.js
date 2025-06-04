const product = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'product_id',
      title: 'Product ID',
      type: 'slug',
      options: {
        source: doc => `${doc.name}-${Date.now()}`, // ensures uniqueness
        maxLength: 50,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: Rule => Rule.required().positive(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
}

export default product
