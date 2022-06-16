import { useTranslations } from "next-intl";
import type { ParsedUrlQuery } from "querystring";

import { Container } from "@/components/Container";
import { ProductBody } from "@/components/ProductBody";
import { ProductMeta } from "@/components/ProductMeta";
import { ProductsGrid } from "@/components/ProductsGrid";
import { SanityImage } from "@/components/SanityImage";
import { SectionSeparator } from "@/components/SectionSeparator";
import { Subtitle } from "@/components/Subtitle";
import { Tags } from "@/components/Tags";
import { getAllProductSlugs, getProductAndRelatedProducts } from "@/utils/api";
import { globalConfig } from "@/utils/global.config";

interface IParams extends ParsedUrlQuery {
  slug: string;
}
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>["props"];

export default function Product({ product, relatedProducts }: Props) {
  const t = useTranslations("Titles");
  if (!product || relatedProducts?.length === 0) {
    return <p>no data</p>;
  }
  return (
    <Container
      title={product.productTitle}
      ogImage={product.productImageUrl}
      date={product.productDate}
      type="article"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-start justify-center pb-16">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold tracking-tight text-gray-800  dark:text-gray-200 md:text-5xl">
            {product.productTitle}
          </h1>
          <div className="mb-2 flex flex-row justify-end py-2 text-sm">
            <Tags tags={product.tags} />
          </div>
          <SanityImage
            alt={product.productTitle}
            url={product.productImageUrl}
            width={globalConfig.images.defaultProductImageWidth}
            height={globalConfig.images.defaultProductImageHeight}
          />

          <div className="mt-4 flex flex-row pt-2">
            <ProductMeta date={product.productDate} model={product.model} />
          </div>
        </div>
        <ProductBody text={product.productText} />
        <SectionSeparator />
        <Subtitle>{t("related_products")}</Subtitle>
        {relatedProducts && <ProductsGrid products={relatedProducts} />}
      </div>
    </Container>
  );
}

export async function getStaticPaths({ locales }: { locales: string[] }) {
  const allProducts = await getAllProductSlugs();
  const allPathsWithLocales = allProducts
    .map(({ slug }) =>
      locales.map((locale) => ({
        params: { slug: `/product/${slug}` },
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
  const { relatedProducts, ...product } = await getProductAndRelatedProducts(
    locale,
    params.slug.replace(/\/$/, "").split("/").pop() as string
  );
  return {
    props: {
      product,
      relatedProducts,
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}
