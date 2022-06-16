/* eslint-disable simple-import-sort/imports */
/* eslint-disable import/order */
import type {
  Model,
  Page,
  Product,
  ProductBase,
  ProductsByModel,
  ProductsByTag,
  Slug,
  Tag
} from "@/typings/schema-types";
import { globalConfig } from "./global.config";
import { getSkipValue } from "./contentUtils";
import { getSanityClient } from "./sanity";

import {
  getAllModelSlugsQuery,
  getAllProductSlugsQuery,
  getAllTagSlugsQuery,
  getModelAndRelatedProductsQuery,
  getModelsAndRelatedProductsCountQuery,
  getFeaturedProductsQuery,
  getPageContentQuery,
  getPaginatedProductsQuery,
  getProductAndRelatedProductsQuery,
  getTagAndRelatedProductsQuery,
  getTagsAndRelatedProductsCountQuery,
  getTotalProductsNumberQuery
} from "./queries";

const client = getSanityClient({ useCdn: false });

export async function getFeaturedProducts(
  locale: string
): Promise<ProductBase[]> {
  const data = await client.fetch(getFeaturedProductsQuery, {
    locale,
    skip: 0,
    limit: globalConfig.pagination.pageSize
  });
  return data;
}

export async function getPageContent(
  locale: string,
  slug: string
): Promise<Page> {
  const data = await client.fetch(getPageContentQuery, {
    locale,
    slug
  });
  return data;
}

export async function getModelsAndRelatedProductsCount(
  locale: string
): Promise<ProductsByModel[]> {
  const data = await client.fetch(getModelsAndRelatedProductsCountQuery, {
    locale
  });
  return data;
}

export async function getTagsAndRelatedProductsCount(
  locale: string
): Promise<ProductsByTag[]> {
  const data = await client.fetch(getTagsAndRelatedProductsCountQuery, {
    locale
  });
  return data;
}

export async function getAllTagSlugs(): Promise<Slug[]> {
  const data = await client.fetch(getAllTagSlugsQuery);
  return data;
}

export async function getTagAndRelatedProducts(
  locale: string,
  slug: string
): Promise<Tag> {
  const data = await client.fetch(getTagAndRelatedProductsQuery, {
    locale,
    slug,
    skip: 0,
    limit: globalConfig.pagination.allProductsSize
  });
  return data;
}

export async function getAllModelSlugs(): Promise<Slug[]> {
  const data = await client.fetch(getAllModelSlugsQuery);
  return data;
}

export async function getModelAndRelatedProducts(
  locale: string,
  slug: string
): Promise<Model> {
  const data = await client.fetch(getModelAndRelatedProductsQuery, {
    locale,
    slug,
    skip: 0,
    limit: globalConfig.pagination.allProductsSize
  });
  return data;
}

export async function getAllProductSlugs(): Promise<Slug[]> {
  const data = await client.fetch(getAllProductSlugsQuery);
  return data;
}

export async function getProductAndRelatedProducts(
  locale: string,
  slug: string
): Promise<Product> {
  const data = await client.fetch(getProductAndRelatedProductsQuery, {
    locale,
    slug,
    skip: 0,
    limit: globalConfig.pagination.moreProductsSize
  });
  return data;
}

export async function getPaginatedProducts(
  locale: string,
  page: number
): Promise<ProductBase[]> {
  const data = await client.fetch(getPaginatedProductsQuery, {
    locale,
    skip: getSkipValue(page),
    limit: globalConfig.pagination.pageSize + getSkipValue(page)
  });
  return data;
}

export async function getTotalProductsNumber(): Promise<number> {
  const totalProducts: number = await client.fetch(getTotalProductsNumberQuery);
  return Number(totalProducts);
}
