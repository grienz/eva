export const GLOBAL_CONFIG = {
  pagination: {
    pageSize: 8,
    moreProductsSize: 8,
    featuredProductsSize: 8,
    allProductsSize: 64
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
    { href: "/", title: "home" },
    { href: "/product/list/1", title: "product" },
    { href: "/categories", title: "categories" },
    { href: "/about", title: "about" },
    { href: "/contact", title: "contact" }
  ],
  siteUrl: "http://localhost:3000",
  instagramLink: "https://www.instagram.com/evasmartshower/",
  telegramLink: "https://t.me/evasmartshower",
  facebookLink: "https://www.facebook.com/",
  githubLink: "https://github.com/grienz/eva",
  youtubeLink: "https://www.youtube.com/channel",
  mail: "mailto:evasmartshower@gmail.com",
  copyright: "Eva Smart Shower",
  trimmedHeaderLength: 55
};

export const SANITY_CONFIG = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2021-10-21",
  useCdn: false
};

export const SEO = {
  title: "EVA Smart Shower. Banyonuza değer katar.",
  description: "Duşakabin ve banyo sistemleri imalat, montaj hizmeti.",
  openGraph: {
    titleTemplate: "EVA Smart Shower. Banyonuza değer katar.",
    description: "Duşakabin ve banyo sistemleri imalat, montaj hizmeti.",
    type: "website",
    url: "http://localhost:3000/",
    site_name: "Eva Smart Shower",
    robots: "follow, index"
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image"
  }
};
