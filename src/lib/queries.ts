import groq from 'groq';

export const getFeaturedProductsQuery = groq`*[_type == 'product' && featured == true] {
  "productTitle": title[$locale],
  "productSlug": slug.current,
  "model": model -> {
    "modelName": title[$locale],
    "modelSlug": slug.current,
    "modelPicture": picture.asset -> url,
  },
  "tags": tags[] -> {
    "tagName": title[$locale],
    "tagSlug": slug.current
  },
  "productImageUrl": coverImage.asset-> url,
  "productDate": _createdAt
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
  "productTitle": title[$locale],
  "productSlug": slug.current,
  "productImageUrl": coverImage.asset-> url,
  "productDate": _createdAt,
  "productText": text[$locale],
  "model": model -> {
    "modelName": title[$locale],
    "modelSlug": slug.current,
    "modelPicture": picture.asset -> url,
  },
  "tags": tags[] -> {
    "tagName": title[$locale],
    "tagSlug": slug.current
  },
  "relatedProducts": relatedProducts[] -> {
      "productTitle": title[$locale],
      "productSlug": slug.current,
      "productDate": _createdAt,
      "productImageUrl": coverImage.asset-> url,
      "model": model -> {
        "modelName": title[$locale],
        "modelSlug": slug.current,
        "modelPicture": picture.asset -> url,
      },
      "tags": tags[] -> {
        "tagName": title[$locale],
        "tagSlug": slug.current
      },
  }
}[0]`;

export const getModelAndRelatedProductsQuery = groq`*[_type == 'model' && slug.current ==  $slug]{
  "modelTitle": title[$locale],
  "modelSlug": slug.current,
  "modelInfo": info[$locale],
  "modelPicture": picture.asset -> url,
  "modelSocials": social,
  "modelProducts": *[_type == 'product' && references(^._id)] {
    "productTitle": title[$locale],
    "productSlug": slug.current,
    "productDate": _createdAt,
    "productImageUrl": coverImage.asset-> url,
    "model": model -> {
      "modelName": title[$locale],
      "modelSlug": slug.current,
      "modelPicture": picture.asset -> url,
    },
    "tags": tags[] -> {
      "tagName": title[$locale],
      "tagSlug": slug.current
    },
  } [$skip...$limit] | order(_createdAt desc)
}[0]`;

export const getTagAndRelatedProductsQuery = groq`*[_type == 'tag' &&  slug.current ==  $slug] {
  "tagTitle": title[$locale],
  "tagSlug": slug.current,
  "tagText": text[$locale],
  "tagPicture": picture.asset -> url,
  "sameTagProducts": *[_type == 'product' && references(^._id)] {
    "productTitle": title[$locale],
    "productSlug": slug.current,
    "productDate": _createdAt,
    "productImageUrl": coverImage.asset-> url,
    "model": model -> {
      "modelName": title[$locale],
      "modelSlug": slug.current,
      "modelPicture": picture.asset -> url,
    },
    "tags": tags[] -> {
      "tagName": title[$locale],
      "tagSlug": slug.current
    },
  } [$skip...$limit] | order(_createdAt desc)
}[0]`;
export const getPaginatedProductsQuery = groq`*[_type == 'product'] {
  "productTitle": title[$locale],
  "productSlug": slug.current,
  "productDate": _createdAt,
  "productImageUrl": coverImage.asset-> url,
  "model": model -> {
    "modelName": title[$locale],
    "modelSlug": slug.current,
    "modelPicture": picture.asset -> url,
  },
  "tags": tags[] -> {
    "tagName": title[$locale],
    "tagSlug": slug.current
},
} [$skip...$limit] | order(_createdAt desc)`;

export const getTagsAndRelatedProductsCountQuery = groq`*[_type=="tag"] {
  "tagTitle": title[$locale],
  "tagSlug": slug.current,
  "tagPicture": picture.asset -> url,
  "relatedProductsCount": count(*[_type=='product' && references(^._id)])
}`;

export const getModelsAndRelatedProductsCountQuery = groq`*[_type=="model"] {
  "modelTitle": title[$locale],
  "modelSlug": slug.current,
  "modelPicture": picture.asset -> url,
  "relatedProductsCount": count(*[_type=='product' && references(^._id)])
}`;

export const getTotalProductsNumberQuery = groq`count(*[_type == 'product'])`;
