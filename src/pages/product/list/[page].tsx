import { useTranslations } from "next-intl";
import type { ParsedUrlQuery } from "querystring";

import { Container } from "@/components/Container";
import { PageTop } from "@/components/PageTop";
import { PaginationControls } from "@/components/PaginationControls";
import { ProductsGrid } from "@/components/ProductsGrid";
import { SectionSeparator } from "@/components/SectionSeparator";
import {
  getPageContent,
  getPaginatedProducts,
  getTotalProductsNumber
} from "@/utils/api";
import { GLOBAL_CONFIG } from "@/utils/global.config";

interface IParams extends ParsedUrlQuery {
  page: string;
}
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>["props"];

export default function ProductIndexPage({
  pageData,
  paginatedProducts,
  page,
  totalPages
}: Props) {
  const t = useTranslations("Titles");
  if (!pageData || paginatedProducts?.length === 0) {
    return <p>no data</p>;
  }

  return (
    <Container title={`${t("product_page")} ${page}/${totalPages}`}>
      <div className="mx-auto flex max-w-2xl flex-col items-start justify-center border-gray-200 pb-16 dark:border-gray-700">
        <PageTop
          title={`${pageData.pageTitle} (${page}/${totalPages})`}
          subtitle=""
          pictureUrl={pageData.pagePicture}
          text={pageData.pageText}
        />
        <div className="relative mb-4 w-full"></div>
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

export async function getStaticPaths({ locales }: { locales: string[] }) {
  const totalProducts = await getTotalProductsNumber();
  const totalPages = Math.ceil(
    totalProducts / GLOBAL_CONFIG.pagination.pageSize
  );
  const allPathsWithLocales = Array.from(
    { length: totalPages - 1 },
    (_, i) => i + 1
  )
    .map((page) =>
      locales.map((locale) => ({
        params: { page: `/product/p/${page}` },
        locale
      }))
    )
    .flat();
  return {
    paths: allPathsWithLocales,
    fallback: "blocking"
  };
}

export async function getStaticProps({
  params,
  locale
}: {
  params: IParams;
  locale: string;
}) {
  const paginatedProducts = await getPaginatedProducts(
    locale,
    Number(params.page)
  );
  const pageData = await getPageContent(locale, "/");
  const totalProducts = await getTotalProductsNumber();
  const totalPages = Math.ceil(
    totalProducts / GLOBAL_CONFIG.pagination.pageSize
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
