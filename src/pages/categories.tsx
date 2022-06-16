import Link from "next/link";
import { useTranslations } from "next-intl";

import { AvatarImage } from "@/components/AvatarImage";
import { Container } from "@/components/Container";
import {
  getModelsAndRelatedProductsCount,
  getTagsAndRelatedProductsCount
} from "@/utils/api";

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>["props"];

export default function GetAllModelsAndTags({ models, tags }: Props) {
  const t = useTranslations("Titles");
  const sortedAutors = models.sort(
    (a, b) => b.relatedProductsCount - a.relatedProductsCount
  );
  const sortedTags = tags.sort(
    (a, b) => b.relatedProductsCount - a.relatedProductsCount
  );
  return (
    <Container title={t("categories")}>
      <div className="mx-auto flex  min-h-screen max-w-2xl flex-col items-start justify-center border-gray-200 pb-16 dark:border-gray-700">
        <div className="flex flex-col items-start justify-start divide-y divide-gray-300 dark:divide-gray-500 md:mb-6 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
          <div className="space-x-2 pt-2 pb-4 md:space-y-5">
            <h1 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-200 sm:leading-10 md:border-r-2   md:pr-6 md:text-5xl">
              {t("models")}
            </h1>
          </div>
          <div className="flex max-w-lg flex-wrap">
            {sortedAutors &&
              sortedAutors.length > 0 &&
              sortedAutors.map((model) => (
                <div key={model.modelSlug} className="mt-2 mb-2 mr-5">
                  <Link href={`/model/${model.modelSlug}`}>
                    <a className="mr-3 text-base font-medium text-teal-600 transition-all delay-100 hover:text-teal-800 dark:hover:text-teal-400">
                      <AvatarImage
                        url={model.modelPicture}
                        alt={model.modelName}
                      />
                      {`${model.modelName} (${model.relatedProductsCount})`}
                    </a>
                  </Link>
                </div>
              ))}
          </div>
        </div>
        <div className="mb-6 flex flex-col items-start justify-start divide-y divide-gray-300 dark:divide-gray-500 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
          <div className="space-x-2 pt-2 pb-4 md:space-y-5">
            <h1 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-200 sm:leading-10 md:border-r-2   md:pr-6 md:text-5xl">
              {t("tags")}
            </h1>
          </div>
          <div className="flex max-w-lg flex-wrap">
            {sortedTags &&
              sortedTags.length > 0 &&
              sortedTags.map((tag) => (
                <div key={tag.tagSlug} className="mt-2 mb-2 mr-5">
                  <Link href={`/tag/${tag.tagSlug}`}>
                    <a className="mr-3 text-base font-medium  text-teal-600 transition-all delay-100 hover:text-teal-800 dark:hover:text-teal-400">
                      <AvatarImage url={tag.tagPicture} alt={tag.tagName} />
                      {`#${tag.tagName} (${tag.relatedProductsCount})`}
                    </a>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  const models = await getModelsAndRelatedProductsCount(locale);
  const tags = await getTagsAndRelatedProductsCount(locale);

  return {
    props: {
      models,
      tags,
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}
