import { useTranslations } from 'next-intl';

import { Container } from '@/components/Container';
import { PageTop } from '@/components/PageTop';
import { PaginationControls } from '@/components/PaginationControls';
import { ProductsGrid } from '@/components/ProductsGrid';
import { SectionSeparator } from '@/components/SectionSeparator';
import { globalConfig } from '@/config/global.config';
import {
  getPageContent,
  getPaginatedProducts,
  getTotalProductsNumber
} from '@/lib/api';

export default function ProductIndexPage({
  pageData,
  paginatedProducts,
  page,
  totalPages
}) {
  const t = useTranslations('Titles');
  if (!pageData || paginatedProducts?.lenght === 0) return <p>no data</p>;

  return (
    <Container title={`${t('product_page')} ${page}/${totalPages}`}>
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <PageTop
          title={`${pageData.pageTitle} (${page}/${totalPages})`}
          subtitle=""
          pictureUrl={pageData.pagePicture}
          text={pageData.pageText}
        />
        <SectionSeparator />
        {paginatedProducts?.length > 0 && (
          <ProductsGrid products={paginatedProducts} />
        )}
        <PaginationControls
          currentPage={Number(page)}
          totalPages={Number(totalPages)}
        />
      </div>
    </Container>
  );
}

export async function getStaticPaths({ locales }) {
  const totalProducts = await getTotalProductsNumber();
  const totalPages = Math.ceil(
    totalProducts / globalConfig.pagination.pageSize
  );
  const allPathsWithLocales = Array.from(
    { length: totalPages - 1 },
    (_, i) => i + 1
  )
    .map((page) =>
      locales.map((locale) => ({
        params: { page: `/product/list/${page}` },
        locale
      }))
    )
    .flat();
  return {
    paths: allPathsWithLocales,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params, locale }) {
  const paginatedProducts = await getPaginatedProducts(
    locale,
    Number(params.page)
  );
  const pageData = await getPageContent(locale, '/');
  const totalProducts = await getTotalProductsNumber();
  const totalPages = Math.ceil(
    totalProducts / globalConfig.pagination.pageSize
  );
  return {
    props: {
      pageData,
      paginatedProducts,
      page: params.page,
      totalPages,
      messages: (await import(`../../../messages/${locale}.json`)).default
    }
  };
}
