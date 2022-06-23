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
  const sortedModels = models.sort(
    (a, b) => b.relatedProductsCount - a.relatedProductsCount
  );
  const sortedTags = tags.sort(
    (a, b) => b.relatedProductsCount - a.relatedProductsCount
  );
  return (
    <Container title={t("categories")}>
      <div className="mx-auto flex  min-h-screen max-w-2xl flex-col items-start justify-center border-gray-200 dark:border-gray-700">
        <div className="mb-12 flex flex-col items-start justify-start divide-y divide-gray-300 dark:divide-gray-500 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
          <div className="space-x-2 pt-2 md:space-y-5">
            <h1 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-200 sm:leading-10 md:border-r-2   md:pr-6 md:text-5xl">
              {t("models")}
            </h1>
          </div>
          <div className="flex max-w-lg flex-wrap">
            {sortedModels &&
              sortedModels.length > 0 &&
              sortedModels.map((model) => (
                <div key={model.modelSlug} className="m-2">
                  <Link href={`/model/${model.modelSlug}`}>
                    <a className="m-2 flex text-base font-medium text-stone-900 transition-all delay-100 hover:text-sky-600 dark:text-stone-100 dark:hover:text-sky-400">
                      <AvatarImage
                        url={model.modelPicture}
                        alt={model.modelName}
                      />
                      <span className="m-1 p-1">{`${model.modelName} (${model.relatedProductsCount})`}</span>
                    </a>
                  </Link>
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-col items-start justify-start divide-y divide-gray-300 dark:divide-gray-500 md:mb-6 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
          <div className="space-x-2 pt-2 md:space-y-5">
            <h1 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-200 sm:leading-10 md:border-r-2   md:pr-6 md:text-5xl">
              {t("tags")}
            </h1>
          </div>
          <div className="flex max-w-lg flex-wrap">
            {sortedTags &&
              sortedTags.length > 0 &&
              sortedTags.map((tag) => (
                <div key={tag.tagSlug} className="m-4">
                  <Link href={`/tag/${tag.tagSlug}`}>
                    <a className="m-2 flex text-base font-medium text-stone-900 transition-all delay-100 hover:text-sky-600 dark:text-stone-100 dark:hover:text-sky-400">
                      <AvatarImage url={tag.tagPicture} alt={tag.tagName} />
                      <span className="m-1 p-1">{`${tag.tagName} (${tag.relatedProductsCount})`}</span>
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
