const brochure = {
  name: 'brochure',
  title: 'Catalog',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "Posters Catalog 2026"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used in the page URL, e.g. /catalogs/posters-catalog-2026.',
      options: {
        source: 'title',
        maxLength: 60,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      description: 'Optional blurb shown on the Catalogs page.',
    },
    {
      name: 'pdf',
      title: 'PDF File',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'products',
      title: 'Products Covered',
      type: 'array',
      description: 'Pick every product this catalog includes.',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
      validation: (Rule) => Rule.min(1),
    },
  ],
  preview: {
    select: {
      title: 'title',
      products: 'products',
    },
    prepare({ title, products }) {
      const count = products?.length || 0
      return {
        title,
        subtitle: `${count} product${count === 1 ? '' : 's'}`,
      }
    },
  },
}

export default brochure
