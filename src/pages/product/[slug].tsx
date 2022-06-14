import { useTranslations } from 'next-intl';

import { Container } from '@/components/Container';
import { ProductBody } from '@/components/ProductBody';
import { ProductMeta } from '@/components/ProductMeta';
import { ProductsGrid } from '@/components/ProductsGrid';
import { SanityImage } from '@/components/SanityImage';
import { SectionSeparator } from '@/components/SectionSeparator';
import { Subtitle } from '@/components/Subtitle';
import { Tags } from '@/components/Tags';
import { globalConfig } from '@/config/global.config';
import { getAllProductSlugs, getProductAndRelatedProducts } from '@/lib/api';

export default function Product({ product, relatedProducts }) {
  const t = useTranslations('Titles');
  if (!product || relatedProducts?.lenght === 0) return <p>no data</p>;
  return (
    <Container
      title={product.productTitle}
      ogImage={product.productImageUrl}
      date={product.productDate}
      type="article"
    >
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto pb-16">
        <div className="flex flex-col">
          <h1 className="font-bold text-3xl md:text-5xl tracking-tight  text-gray-800 dark:text-gray-200">
            {product.productTitle}
          </h1>

          <SanityImage
            alt={product.productTitle}
            url={product.productImageUrl}
            width={globalConfig.images.defaultProductImageWidth}
            height={globalConfig.images.defaultProductImageHeight}
          />
          <ProductBody text={product.productText} />

          <div className="flex flex-row mt-4">
            <ProductMeta date={product.productDate} model={product.model} />
          </div>
        </div>
        <div className="flex flex-row text-sm justify-end my-2">
          <Tags tags={product.tags} />
        </div>
        <SectionSeparator />
        <Subtitle>{t('related_products')}</Subtitle>
        {relatedProducts && <ProductsGrid products={relatedProducts} />}
      </div>
    </Container>
  );
}

export async function getStaticPaths({ locales }) {
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
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params, locale }) {
  const { relatedProducts, ...product } = await getProductAndRelatedProducts(
    locale,
    params.slug.replace(/\/$/, '').split('/').pop()
  );
  return {
    props: {
      product,
      relatedProducts,
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}
