import { useTranslations } from "next-intl";

import { Container } from "@/components/Container";
import { MoreProductsControls } from "@/components/MoreProductsControls";
import { PageTop } from "@/components/PageTop";
import { ProductsGrid } from "@/components/ProductsGrid";
import { SectionSeparator } from "@/components/SectionSeparator";
import { Subtitle } from "@/components/Subtitle";
import {
  getFeaturedProducts,
  getPageContent,
  getTotalProductsNumber
} from "@/utils/api";

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>["props"];

export default function Index({ pageData, featuredProducts, total }: Props) {
  const t = useTranslations("Titles");

  return (
    <Container
      title={pageData.pageTitle}
      ogImage={pageData.pagePicture}
      description={pageData.pageText}
    >
      <div className="mx-auto flex max-w-2xl flex-col items-start  justify-center pb-16">
        {pageData && (
          <PageTop
            title={pageData.pageTitle}
            subtitle=""
            pictureUrl={pageData.pagePicture}
            text={pageData.pageText}
          />
        )}
        <SectionSeparator />
        <Subtitle>{t("featured_products")}</Subtitle>
        {featuredProducts?.length > 0 && (
          <ProductsGrid products={featuredProducts} />
        )}
        <MoreProductsControls isDisabled={total < 6} />
      </div>
    </Container>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  const featuredProducts = await getFeaturedProducts(locale);
  const pageData = await getPageContent(locale, "/");
  const total = await getTotalProductsNumber();
  return {
    props: {
      pageData,
      featuredProducts,
      total,
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}
