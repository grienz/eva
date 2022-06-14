import { Carousel } from '@/components/Carousel';

export function ProductCarousel({ products }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-x-0 md:gap-x-12 gap-y-10">
      {products.map((product) => {
        return (
          <Carousel
            key={product.productSlug}
            title={product.productTitle}
            previewImage={product.productImageUrl}
            slug={product.productSlug}
          />
        );
      })}
    </section>
  );
}
