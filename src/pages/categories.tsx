import Link from "next/link";
import { useTranslations } from "next-intl";

import { AvatarImage } from "@/components/AvatarImage";
import { Container } from "@/components/Container";
import { catalogdownload } from "@/components/Icons";
import { PageTop } from "@/components/PageTop";
import { SectionSeparator } from "@/components/SectionSeparator";
import {
  getModelsAndRelatedProductsCount,
  getPageContent,
  getTagsAndRelatedProductsCount
} from "@/utils/api";
import { GLOBAL_CONFIG } from "@/utils/global.config";

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>["props"];

export default function GetAllModelsAndTags({ models, tags, pageData }: Props) {
  const t = useTranslations("Titles");
  const sortedModels = models.sort(
    (a, b) => b.relatedProductsCount - a.relatedProductsCount
  );
  const sortedTags = tags.sort(
    (a, b) => b.relatedProductsCount - a.relatedProductsCount
  );
  return (
    <Container
      title={pageData.pageTitle}
      ogImage={pageData.pagePicture}
      description={pageData.pageText}
    >
      <div className="mx-auto flex  min-h-screen max-w-2xl flex-col items-start justify-center">
        {pageData && (
          <PageTop
            title={pageData.pageTitle}
            subtitle=""
            text={pageData.pageText}
            pictureUrl={pageData.pagePicture}
          />
        )}
        <SectionSeparator />
        <a
          href={GLOBAL_CONFIG.catalog}
          target="_blank"
          title={t("catalog")}
          rel="noopener noreferrer"
        >
          <button className="flex flex-row items-center rounded-lg border-1 border-sky-400 bg-transparent px-6 py-2 text-sm font-medium text-slate-900 shadow transition-colors duration-150 hover:bg-sky-600 focus:outline-none dark:border-sky-600 dark:text-white dark:hover:bg-sky-400">
            {t("catalog")} - {catalogdownload}
          </button>
        </a>
        <div className="my-6 flex flex-col items-start justify-start divide-y divide-slate-600 dark:divide-slate-400 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
          <div className="space-x-2 pt-2 md:space-y-5">
            <h1 className="border-sky-600 pb-2 text-3xl font-bold tracking-tight text-gray-800 dark:border-sky-400 dark:text-gray-200 sm:leading-10 md:border-r-2 md:pr-6 md:text-5xl">
              {t("models")}
            </h1>
          </div>
          <div className="flex max-w-lg flex-wrap">
            {sortedModels &&
              sortedModels.length > 0 &&
              sortedModels.map((model) => (
                <div key={model.modelSlug} className="m-2">
                  <Link href={`/model/${model.modelSlug}`}>
                    <a className="m-1 flex p-1 text-base font-medium text-stone-900 transition-all delay-100 hover:text-sky-600 dark:text-stone-100 dark:hover:text-sky-400">
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
        <div className="my-6 flex flex-col items-start justify-start divide-y divide-slate-600 dark:divide-slate-400 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
          <div className="space-x-2 pt-2 md:space-y-5">
            <h1 className="border-sky-600 pb-2 text-3xl font-bold tracking-tight text-gray-800 dark:border-sky-400 dark:text-gray-200 sm:leading-10 md:border-r-2  md:pr-6 md:text-5xl">
              {t("tags")}
            </h1>
          </div>
          <div className="flex max-w-lg flex-wrap">
            {sortedTags &&
              sortedTags.length > 0 &&
              sortedTags.map((tag) => (
                <div key={tag.tagSlug} className="m-4">
                  <Link href={`/tag/${tag.tagSlug}`}>
                    <a className="m-1 flex p-1 text-base font-medium  text-stone-900 transition-all delay-100 hover:text-sky-600 dark:text-stone-100 dark:hover:text-sky-400">
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
  const pageData = await getPageContent(locale, "categories");

  return {
    props: {
      pageData,
      models,
      tags,
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}
