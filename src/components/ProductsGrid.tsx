import { ProductCard } from "@/components/ProductCard";
import type { ProductBase } from "@/typings/schema-types";
// eslint-disable-next-line import/prefer-default-export
export function ProductsGrid({ products }: { products: ProductBase[] }) {
  return (
    <section className="mb-16 grid grid-cols-1 gap-x-0 gap-y-10 md:gap-x-12">
      {products.map((product) => (
        <ProductCard
          key={product.productSlug}
          title={product.productTitle}
          previewImage={product.productImageUrl}
          date={product.productDate}
          model={product.model}
          tags={product.tags}
          slug={product.productSlug}
        />
      ))}
    </section>
  );
}
