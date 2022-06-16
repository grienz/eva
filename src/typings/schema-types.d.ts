import type {
  SanityBlock,
  SanityImageAsset,
  SanityKeyed
} from "sanity-codegen";

export type { SanityBlock, SanityImageAsset, SanityKeyed };

export type ProductBase = {
  productTitle: string;
  productSlug: string;
  productImageUrl: string;
  productDate: string;
  model: ModelBase;
  tags: TagBase[];
};

export type Product = ProductBase & {
  productText: PortableText;
  relatedProducts?: ProductBase[];
};

export type ModelBase = {
  modelName: string;
  modelSlug: string;
  modelPicture: string;
};

export type Model = ModelBase & {
  modelInfo: PortableText;
  modelSocials?: string[];
  modelProducts?: ProductBase[];
};

export type TagBase = {
  tagName: string;
  tagSlug: string;
};

export type Tag = TagBase & {
  tagText: PortableText;
  tagPicture: string;
  sameTagProducts?: ProductBase[];
};

export type Page = {
  pageTitle: string;
  pagePicture: string;
  pageText: PortableText;
};

export type PortableText = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
    }>
>;

export type ProductsByModel = {
  modelName: string;
  modelSlug: string;
  modelPicture: string;
  relatedProductsCount: number;
};

export type ProductsByTag = {
  tagName: string;
  tagSlug: string;
  tagPicture: string;
  relatedProductsCount: number;
};

export type Slug = {
  slug: string;
};
