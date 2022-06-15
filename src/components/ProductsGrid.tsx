import { ProductCard } from '@/components/ProductCard';

export function ProductsGrid({ products }) {
  return (
    <section className="grid grid-cols-1 gap-x-0 md:gap-x-12 gap-y-10 mb-16">
      {products.map((product) => {
        return (
          <ProductCard
            key={product.productSlug}
            title={product.productTitle}
            previewImage={product.productImageUrl}
            date={product.productDate}
            model={product.model}
            tags={product.tags}
            slug={product.productSlug}
          />
        );
      })}
    </section>
  );
}
