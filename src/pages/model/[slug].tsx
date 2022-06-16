import { useTranslations } from "next-intl";
import type { ParsedUrlQuery } from "querystring";

import { Container } from "@/components/Container";
import { PageTop } from "@/components/PageTop";
import { ProductsGrid } from "@/components/ProductsGrid";
import { SectionSeparator } from "@/components/SectionSeparator";
import { Subtitle } from "@/components/Subtitle";
import { getAllModelSlugs, getModelAndRelatedProducts } from "@/utils/api";

interface IParams extends ParsedUrlQuery {
  slug: string;
}
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>["props"];

export default function Model({ model, modelProducts }: Props) {
  const t = useTranslations("Titles");
  return (
    <Container title={model.modelName} ogImage={model.modelPicture}>
      <div className="mx-auto flex max-w-2xl flex-col items-start justify-center border-gray-200 pb-16 dark:border-gray-700">
        {model && (
          <>
            <PageTop
              title={model.modelName}
              subtitle=""
              socials={model.modelSocials}
              pictureUrl={model.modelPicture}
              text={model.modelInfo}
            />
            <SectionSeparator />
            <Subtitle>
              {`${t("model_related_articles")}${model.modelName}`}
            </Subtitle>
          </>
        )}
        {modelProducts && modelProducts.length > 0 && (
          <ProductsGrid products={modelProducts} />
        )}
      </div>
    </Container>
  );
}

export async function getStaticPaths({ locales }: { locales: string[] }) {
  const allModels = await getAllModelSlugs();
  const allPathsWithLocales = allModels
    .map(({ slug }) =>
      locales.map((locale) => ({
        params: {
          slug: `/model/${slug}`
        },
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
  const { modelProducts, ...model } = await getModelAndRelatedProducts(
    locale,
    params.slug.replace(/\/$/, "").split("/").pop() as string
  );
  return {
    props: {
      model,
      modelProducts,
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}
