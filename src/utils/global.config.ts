import { about, category, home, mail, product } from "@/components/Icons";

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
    { href: "/", title: "home", icon: home },
    { href: "/product/list/1", title: "product", icon: product },
    { href: "/categories", title: "categories", icon: category },
    { href: "/about", title: "about", icon: about },
    { href: "/contact", title: "contact", icon: mail }
  ],
  siteUrl: "https://evasmartshower.vercel.app",
  instagramLink: "https://www.instagram.com/evasmartshower/",
  telegramLink: "https://t.me/evasmartshower",
  facebookLink: "https://www.facebook.com/",
  githubLink: "https://github.com/grienz/evasmartshower",
  youtubeLink: "https://www.youtube.com/channel",
  mail: "mailto:evasmartshower@gmail.com",
  copyright: "Eva Smart Shower",
  trimmedHeaderLength: 55
};

export const sanityConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2021-10-21"
};
