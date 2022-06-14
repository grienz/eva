/* eslint-disable simple-import-sort/imports */
/* eslint-disable import/order */
import { getSanityClient } from './sanity';
import { getSkipValue } from './contentUtils';
import { globalConfig } from '@/config/global.config';

import {
  getFeaturedProductsQuery,
  getPageContentQuery,
  getAllProductSlugsQuery,
  getAllModelSlugsQuery,
  getAllTagSlugsQuery,
  getProductAndRelatedProductsQuery,
  getModelAndRelatedProductsQuery,
  getTagAndRelatedProductsQuery,
  getPaginatedProductsQuery,
  getTagsAndRelatedProductsCountQuery,
  getModelsAndRelatedProductsCountQuery,
  getTotalProductsNumberQuery
} from './queries';

const client = getSanityClient({ useCdn: false });

export async function getFeaturedProducts(locale) {
  const data = await client.fetch(getFeaturedProductsQuery, {
    locale,
    skip: 0,
    limit: globalConfig.pagination.pageSize
  });
  return data;
}

export async function getPageContent(locale, slug) {
  const data = await client.fetch(getPageContentQuery, {
    locale,
    slug
  });
  return data;
}

export async function getModelsAndRelatedProductsCount(locale) {
  const data = await client.fetch(getModelsAndRelatedProductsCountQuery, {
    locale
  });
  return data;
}

export async function getTagsAndRelatedProductsCount(locale) {
  const data = await client.fetch(getTagsAndRelatedProductsCountQuery, {
    locale
  });
  return data;
}

export async function getAllTagSlugs() {
  const data = await client.fetch(getAllTagSlugsQuery);
  return data;
}

export async function getTagAndRelatedProducts(locale, slug) {
  const data = await client.fetch(getTagAndRelatedProductsQuery, {
    locale,
    slug,
    skip: 0,
    limit: globalConfig.pagination.allProductsSize
  });
  return data;
}

export async function getAllModelSlugs() {
  const data = await client.fetch(getAllModelSlugsQuery);
  return data;
}

export async function getModelAndRelatedProducts(locale, slug) {
  const data = await client.fetch(getModelAndRelatedProductsQuery, {
    locale,
    slug,
    skip: 0,
    limit: globalConfig.pagination.allProductsSize
  });
  return data;
}

export async function getAllProductSlugs() {
  const data = await client.fetch(getAllProductSlugsQuery);
  return data;
}

export async function getProductAndRelatedProducts(locale, slug) {
  const data = await client.fetch(getProductAndRelatedProductsQuery, {
    locale,
    slug,
    skip: 0,
    limit: globalConfig.pagination.moreProductsSize
  });
  return data;
}

export async function getPaginatedProducts(locale, page) {
  const data = await client.fetch(getPaginatedProductsQuery, {
    locale,
    skip: getSkipValue(page),
    limit: globalConfig.pagination.pageSize + getSkipValue(page)
  });
  return data;
}

export async function getTotalProductsNumber() {
  const totalProducts: number = await client.fetch(getTotalProductsNumberQuery);
  return Number(totalProducts);
}
