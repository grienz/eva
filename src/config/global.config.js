export const globalConfig = {
  pagination: {
    pageSize: 6,
    moreProductsSize: 6,
    featuredProductsSize: 6,
    allProductsSize: 50
  },
  images: {
    defaultProductImageWidth: 1024,
    defaultProductImageHeight: 600,
    defaultProductPreviewImageWidth: 640,
    defaultProductImagePreviewHeight: 376,
    defaultAvatarImageWidthHeight: 44,
    defaultRoundImageWidthHeight: 256,
    defaultQuality: 80
  },
  menuLinks: [
    { href: '/', title: 'home' },
    { href: '/product/list/1', title: 'product' },
    { href: '/categories', title: 'categories' },
    { href: '/about', title: 'about' },
    { href: '/contact', title: 'contact' }
  ],
  siteUrl: 'http://localhost:3000',
  instagramLink: 'https://www.instagram.com/evasmartshower/',
  telegramLink: 'https://t.me/evasmartshower',
  facebookLink: 'https://www.facebook.com/evasmartshower/',
  githubLink: 'https://github.com/grienz/evasmartshower',
  youtubeLink: 'https://www.youtube.com/channel',
  mail: 'mailto:evasmartshower@gmail.com',
  copyright: 'Eva Smart Shower',
  trimmedHeaderLength: 55
};

export const sanityConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2021-10-21'
};
