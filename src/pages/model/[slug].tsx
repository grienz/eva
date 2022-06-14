import { useTranslations } from 'next-intl';

import { Container } from '@/components/Container';
import { PageTop } from '@/components/PageTop';
import { ProductsGrid } from '@/components/ProductsGrid';
import { SectionSeparator } from '@/components/SectionSeparator';
import { Subtitle } from '@/components/Subtitle';
import { getAllModelSlugs, getModelAndRelatedProducts } from '@/lib/api';

export default function Model({ model, modelProducts }) {
  const t = useTranslations('Titles');
  return (
    <Container title={model.modelTitle} ogImage={model.modelPicture}>
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        {model && (
          <>
            <PageTop
              title={model.modelTitle}
              subtitle=""
              socials={model.modelSocials}
              pictureUrl={model.modelPicture}
              text={model.modelInfo}
            />
            <SectionSeparator />
            <Subtitle>
              {t('model_related_articles')}
              {model.modelTitle}
            </Subtitle>
          </>
        )}
        {modelProducts?.length > 0 && <ProductsGrid products={modelProducts} />}
      </div>
    </Container>
  );
}

export async function getStaticPaths({ locales }) {
  const allModels = await getAllModelSlugs();
  const allPathsWithLocales = allModels
    .map((model) =>
      locales.map((locale) => ({
        params: {
          slug: `/model/${model.slug}`
        },
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
  const { modelProducts, ...model } = await getModelAndRelatedProducts(
    locale,
    params.slug.replace(/\/$/, '').split('/').pop()
  );
  return {
    props: {
      model,
      modelProducts,
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}
