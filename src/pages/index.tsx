import { useTranslations } from 'next-intl';

import { Container } from '@/components/Container';
import { MoreproductsControls } from '@/components/MoreProductsControls';
import { PageTop } from '@/components/PageTop';
import { ProductsGrid } from '@/components/ProductsGrid';
import { SectionSeparator } from '@/components/SectionSeparator';
import { Subtitle } from '@/components/Subtitle';
import {
  getFeaturedProducts,
  getPageContent,
  getTotalProductsNumber
} from '@/lib/api';

export default function Index({ pageData, featuredProducts, total }) {
  const t = useTranslations('Titles');
  return (
    <Container title={pageData.pageTitle}>
      <div className="flex flex-col justify-center items-start max-w-2xl  mx-auto pb-16">
        {pageData && (
          <PageTop
            title={pageData.pageTitle}
            subtitle=""
            pictureUrl={pageData.pagePicture}
            text={pageData.pageText}
          />
        )}
        <SectionSeparator />
        <Subtitle>{t('featured_products')}</Subtitle>
        {featuredProducts?.length > 0 && (
          <ProductsGrid products={featuredProducts} />
        )}
        <MoreproductsControls isDisabled={total < 6} />
      </div>
    </Container>
  );
}

export async function getStaticProps({ locale }) {
  const featuredProducts = await getFeaturedProducts(locale);
  const pageData = await getPageContent(locale, '/');
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
