import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { AvatarImage } from '@/components/AvatarImage';
import { Container } from '@/components/Container';
import { SectionSeparator } from '@/components/SectionSeparator';
import {
  getModelsAndRelatedProductsCount,
  getTagsAndRelatedProductsCount
} from '@/lib/api';

export default function GetAllModelsAndTags({ models, tags }) {
  const t = useTranslations('Titles');
  const sortedModels = models.sort(
    (a, b) => b.relatedProductsCount - a.relatedProductsCount
  );
  const sortedTags = tags.sort(
    (a, b) => b.relatedProductsCount - a.relatedProductsCount
  );
  return (
    <Container title={t('categories')}>
      <div className="flex flex-col  justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16 min-h-screen">
        <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
          <SectionSeparator />
        </div>
        <div className="flex flex-col items-start justify-start divide-y divide-gray-300 dark:divide-gray-500 mb-16 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
          <div className="space-x-2 pt-2 pb-4 md:space-y-5">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight sm:leading-10 md:border-r-2 md:pr-6   text-gray-800 dark:text-gray-200">
              {t('models')}
            </h1>
          </div>
          <div className="flex max-w-lg flex-wrap">
            {sortedModels?.length > 0 &&
              sortedModels.map((model) => {
                return (
                  <div key={model} className="mt-2 mb-2 mr-5">
                    <Link href={`/model/${model.modelSlug}`}>
                      <a className="mr-3 text-base font-medium text-teal-600 transition-all delay-100 hover:text-teal-800 dark:hover:text-teal-400">
                        <AvatarImage
                          url={model.modelPicture}
                          alt={model.modelName}
                        />
                        {` ${model.modelTitle} (${model.relatedProductsCount})`}
                      </a>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="flex flex-col items-start justify-start divide-y divide-gray-300 dark:divide-gray-500 mb-16 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
          <div className="space-x-2 pt-2 pb-4 md:space-y-5">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight sm:leading-10 md:border-r-2 md:pr-6   text-gray-800 dark:text-gray-200">
              {t('tags')}
            </h1>
          </div>
          <div className="flex max-w-lg flex-wrap">
            {sortedTags?.length > 0 &&
              sortedTags.map((tag) => {
                return (
                  <div key={tag} className="mt-2 mb-2 mr-5">
                    <Link href={`/tag/${tag.tagSlug}`}>
                      <a className="mr-3 text-base font-medium  text-teal-600 transition-all delay-100 hover:text-teal-800 dark:hover:text-teal-400">
                        <AvatarImage url={tag.tagPicture} alt={tag.tagName} />
                        {`#${tag.tagTitle} (${tag.relatedProductsCount})`}
                      </a>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Container>
  );
}

export async function getStaticProps({ locale }) {
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
