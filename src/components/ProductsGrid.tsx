import { ProductCard } from "@/components/ProductCard";
import type { ProductBase } from "@/typings/schema-types";

export function ProductsGrid({ products }: { products: ProductBase[] }) {
  return (
    <section className="mb-12 grid grid-cols-1 gap-x-0 gap-y-4 md:grid-cols-2 md:gap-x-4">
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
