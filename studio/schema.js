import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

const supportedLanguages = [
  { id: 'tr', title: 'Türkçe', isDefault: true },
  { id: 'en', title: 'İngilizce' }
];
const baseLanguage = supportedLanguages.find((l) => l.isDefault);

const localeString = {
  title: 'Localized string',
  name: 'localeString',
  type: 'object',
  fieldsets: [
    {
      title: 'Türkçe - İngilizce Çeviri',
      name: 'translations',
      options: { collapsible: false }
    }
  ],
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: 'string',
    fieldset: 'translations'
  }))
};

const localePortableText = {
  title: 'Localized portable text',
  name: 'localePortableText',
  type: 'object',
  fieldsets: [
    {
      title: 'Türkçe - İngilizce Çeviri',
      name: 'translations',
      options: { collapsible: false }
    }
  ],
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: 'portableText',
    fieldset: 'translations'
  }))
};

const modelSchema = {
  name: 'model',
  title: 'Model',
  description: 'Model hakkında bilgi ve instagram linki ekleyebilirsiniz.',
  type: 'document',
  preview: {
    select: {
      title: `title.${baseLanguage.id}`
    }
  },
  fields: [
    {
      name: 'title',
      title: 'Model İsmi',
      validation: (Rule) => Rule.required(),
      type: 'localeString'
    },
    {
      name: 'slug',
      title: 'Model Uzantı',
      validation: (Rule) => Rule.required(),
      type: 'slug',
      options: {
        source: 'name'
      }
    },
    {
      name: 'picture',
      title: 'Model Fotoğrafı',
      validation: (Rule) => Rule.required(),
      type: 'image'
    },
    {
      name: 'description',
      title: 'Model hakkında açıklama',
      type: 'localePortableText'
    },
    {
      name: 'social',
      title: 'Sosyal medya linki',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {}
        }
      ]
    }
  ]
};

const breakSchema = {
  name: 'break',
  type: 'object',
  title: 'Break',
  fields: [
    {
      name: 'style',
      type: 'string',
      title: 'Break style',
      options: {
        list: [
          {
            title: 'Line break',
            value: 'lineBreak'
          },
          {
            title: 'Read more',
            value: 'readMore'
          }
        ]
      }
    }
  ]
};
const pageSchema = {
  name: 'page',
  title: 'Sayfa',
  description: 'Hakkımızda iletişim gibi sayfalar oluşturabilirsiniz.',
  type: 'document',
  preview: {
    select: {
      title: `title.${baseLanguage.id}`
    }
  },
  fields: [
    {
      name: 'title',
      title: 'Sayfa başlığı',
      validation: (Rule) => Rule.required(),
      type: 'localeString'
    },
    {
      name: 'slug',
      title: 'Sayfa uzantısı',
      validation: (Rule) => Rule.required(),
      type: 'slug',
      options: {
        source: 'title'
      }
    },
    {
      name: 'picture',
      title: 'Sayfa fotoğrafı',
      validation: (Rule) => Rule.required(),
      type: 'image'
    },
    {
      name: 'text',
      title: 'Sayfa içeriği',
      type: 'localePortableText'
    }
  ]
};

const productSchema = {
  name: 'product',
  title: 'Ürün',
  description: 'Ürün detayı.',
  type: 'document',
  preview: {
    select: {
      title: `title.${baseLanguage.id}`
    }
  },
  fields: [
    {
      name: 'title',
      title: 'Ürün başlığı',
      validation: (Rule) => Rule.required(),
      type: 'localeString'
    },
    {
      name: 'slug',
      title: 'Ürün uzantısı',
      validation: (Rule) => Rule.required(),
      type: 'slug',
      options: {
        source: 'title'
      }
    },
    {
      name: 'coverImage',
      title: 'Ürün fotoğrafı',
      validation: (Rule) => Rule.required(),
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'featured',
      title: 'Ana sayfada gösterilsin mi?',
      type: 'boolean'
    },
    {
      name: 'model',
      title: 'Ürün modeli seçiniz',
      validation: (Rule) => Rule.required(),
      type: 'reference',
      to: [
        {
          type: 'model'
        }
      ],
      options: {
        disableNew: true
      }
    },
    {
      name: 'text',
      title: 'Ürün içeriği',
      type: 'localePortableText'
    },
    {
      name: 'properties',
      title: 'Ürün için özellik ekleyiniz',
      validation: (Rule) => Rule.required(),
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'property'
            }
          ]
        }
      ],
      options: {
        disableNew: true
      }
    },
    {
      name: 'relatedProducts',
      title: 'Benzer ürünleri ekleyebilirsiniz',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'product'
            }
          ]
        }
      ]
    }
  ]
};

const portableTextSchema = {
  name: 'portableText',
  type: 'array',
  title: 'Rich text',
  of: [
    {
      type: 'block',
      of: [
        {
          type: 'image'
        },
        {
          type: 'reference',
          to: [
            {
              type: 'product'
            },
            {
              type: 'model'
            },
            {
              type: 'property'
            },
            {
              type: 'page'
            }
          ]
        }
      ],
      styles: [
        {
          title: 'Normal text',
          value: 'normal'
        },
        {
          title: 'Heading 1',
          value: 'h1'
        },
        {
          title: 'Heading 2',
          value: 'h2'
        },
        {
          title: 'Heading 3',
          value: 'h3'
        },
        {
          title: 'Heading 4',
          value: 'h4'
        },
        {
          title: 'Heading 5',
          value: 'h5'
        },
        {
          title: 'Heading 6',
          value: 'h6'
        },
        {
          title: 'Quote',
          value: 'blockquote'
        }
      ],
      marks: {
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                title: 'Link',
                name: 'href',
                type: 'url'
              }
            ]
          },
          {
            type: 'image'
          },
          {
            type: 'reference',
            to: [
              {
                type: 'product'
              },
              {
                type: 'model'
              },
              {
                type: 'property'
              },
              {
                type: 'page'
              }
            ]
          }
        ]
      }
    },
    {
      type: 'break'
    },
    {
      type: 'image'
    },
    {
      type: 'reference',
      to: [
        {
          type: 'product'
        },
        {
          type: 'model'
        },
        {
          type: 'property'
        },
        {
          type: 'page'
        }
      ]
    }
  ]
};

const propertySchema = {
  name: 'property',
  title: 'Özellik',
  description: 'Profil cam gibi özellikler giriniz.',
  type: 'document',
  preview: {
    select: {
      title: `title.${baseLanguage.id}`
    }
  },
  fields: [
    {
      name: 'title',
      title: 'Özellik ismi',
      validation: (Rule) => Rule.required(),
      type: 'localeString'
    },
    {
      name: 'slug',
      title: 'Özellik uzantısı',
      validation: (Rule) => Rule.required(),
      type: 'slug',
      options: {
        source: 'title'
      }
    },
    {
      name: 'picture',
      title: 'Özellik fotoğrafı',
      validation: (Rule) => Rule.required(),
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'text',
      title: 'Açıklaması',
      validation: (Rule) => Rule.required(),
      type: 'localePortableText'
    }
  ]
};

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    breakSchema,
    portableTextSchema,
    productSchema,
    modelSchema,
    propertySchema,
    pageSchema,
    localeString,
    localePortableText
  ])
});
