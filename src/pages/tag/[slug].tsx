import { useTranslations } from 'next-intl';

import { Container } from '@/components/Container';
import { PageTop } from '@/components/PageTop';
import { ProductsGrid } from '@/components/ProductsGrid';
import { SectionSeparator } from '@/components/SectionSeparator';
import { Subtitle } from '@/components/Subtitle';
import { getAllTagSlugs, getTagAndRelatedProducts } from '@/lib/api';

export default function Tag({ tag, sameTagProducts }) {
  const t = useTranslations('Titles');
  return (
    <Container title={tag.tagTitle} ogImage={tag.tagPicture}>
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto pb-16">
        {tag && (
          <>
            <PageTop
              title={tag.tagTitle}
              subtitle=""
              pictureUrl={tag.tagPicture}
              text={tag.tagText}
            />
            <SectionSeparator />
            <Subtitle>
              {`${t('tag_related_articles')}
              "${tag.tagTitle.toLowerCase()}"`}
            </Subtitle>
          </>
        )}
        {sameTagProducts?.length > 0 && (
          <ProductsGrid products={sameTagProducts} />
        )}
      </div>
    </Container>
  );
}

export async function getStaticPaths({ locales }) {
  const allTags = await getAllTagSlugs();
  const allPathsWithLocales = allTags
    .map((tag) =>
      locales.map((locale) => ({
        params: {
          slug: `/tag/${tag.slug}`
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
  const { sameTagProducts, ...tag } = await getTagAndRelatedProducts(
    locale,
    params.slug.replace(/\/$/, '').split('/').pop()
  );
  return {
    props: {
      tag,
      sameTagProducts,
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}
