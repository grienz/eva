import groq from "groq";

const modelData = `{
    "modelName": title[$locale],
    "modelSlug": slug.current,
    "modelPicture": picture.asset -> url,
  }`;

const tagsData = `{
    "tagName": title[$locale],
    "tagSlug": slug.current
  }`;

const productData = `
  "productTitle": title[$locale],
  "productSlug": slug.current,
  "productImageUrl": coverImage.asset-> url,
  "productDate": _createdAt`;

export const getFeaturedProductsQuery = groq`*[_type == 'product' && featured == true] {
  ${productData},
  "model": model -> ${modelData},
  "tags": tags[] -> ${tagsData},
} [$skip...$limit] | order(_createdAt desc)`;

export const getPageContentQuery = groq`*[_type == 'page' && slug.current == $slug]{
  "pageTitle": title[$locale],
  "pagePicture": picture.asset -> url,
  "pageText": text[$locale]
}[0]`;

export const getAllProductSlugsQuery = groq`*[_type == 'product'] {
  "slug": slug.current,
}`;

export const getAllModelSlugsQuery = groq`*[_type == 'model'] {
  "slug": slug.current,
}`;

export const getAllTagSlugsQuery = groq`*[_type == 'tag'] {
  "slug": slug.current,
}`;

export const getProductAndRelatedProductsQuery = groq`*[_type == 'product'  && slug.current == $slug] {
  ${productData},
  "productText": text[$locale],
  "model": model -> ${modelData},
  "tags": tags[] -> ${tagsData},
  "relatedProducts": relatedProducts[] -> {
      ${productData},
      "model": model -> ${modelData},
      "tags": tags[] -> ${tagsData},
  }
}[0]`;

export const getModelAndRelatedProductsQuery = groq`*[_type == 'model' && slug.current ==  $slug]{
  "modelName": title[$locale],
  "modelSlug": slug.current,
  "modelInfo": info[$locale],
  "modelPicture": picture.asset -> url,
  "modelSocials": social,
  "modelProducts": *[_type == 'product' && references(^._id)] {
    ${productData},
    "model": model -> ${modelData},
    "tags": tags[] -> ${tagsData},
  } [$skip...$limit] | order(_createdAt desc)
}[0]`;

export const getTagAndRelatedProductsQuery = groq`*[_type == 'tag' &&  slug.current ==  $slug] {
  "tagName": title[$locale],
  "tagSlug": slug.current,
  "tagText": text[$locale],
  "tagPicture": picture.asset -> url,
  "sameTagProducts": *[_type == 'product' && references(^._id)] {
    ${productData},
    "model": model -> ${modelData},
    "tags": tags[] -> ${tagsData},
  } [$skip...$limit] | order(_createdAt desc)
}[0]`;
export const getPaginatedProductsQuery = groq`*[_type == 'product'] {
  ${productData},
  "model": model ->${modelData},
  "tags": tags[] -> ${tagsData},
} [$skip...$limit] | order(_createdAt desc)`;

export const getTagsAndRelatedProductsCountQuery = groq`*[_type=="tag"] {
  "tagName": title[$locale],
  "tagSlug": slug.current,
  "tagPicture": picture.asset -> url,
  "relatedProductsCount": count(*[_type=='product' && references(^._id)])
}`;

export const getModelsAndRelatedProductsCountQuery = groq`*[_type=="model"] {
  "modelName": title[$locale],
  "modelSlug": slug.current,
  "modelPicture": picture.asset -> url,
  "relatedProductsCount": count(*[_type=='product' && references(^._id)])
}`;

export const getTotalProductsNumberQuery = groq`count(*[_type == 'product'])`;
