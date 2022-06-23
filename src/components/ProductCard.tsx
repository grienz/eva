import Link from "next/link";

import { ProductMeta } from "@/components/ProductMeta";
import { SanityImage } from "@/components/SanityImage";
import { Tags } from "@/components/Tags";
import type { ModelBase, TagBase } from "@/typings/schema-types";
import { truncate } from "@/utils/contentUtils";
import { GLOBAL_CONFIG } from "@/utils/global.config";

export type ProductCardProps = {
  title: string;
  previewImage: string;
  date: string;
  model: ModelBase;
  tags: TagBase[];
  slug: string;
};

export function ProductCard({
  title,
  previewImage,
  date,
  model,
  tags,
  slug
}: ProductCardProps) {
  return (
    <div className="m-1 rounded-md border-1 border-sky-600 p-1 dark:border-sky-400">
      <SanityImage
        slug={slug}
        alt={title}
        url={previewImage}
        width={GLOBAL_CONFIG.images.defaultProductPreviewImageWidth}
        height={GLOBAL_CONFIG.images.defaultProductImagePreviewHeight}
      />
      <h4 className="product-header-link m-3 w-full text-lg  font-medium">
        <Link href={`/product/${slug}`}>
          <a>{truncate(title)}</a>
        </Link>
      </h4>
      <div className="flex flex-row justify-end text-sm">
        {<Tags tags={tags} />}
      </div>
      <div className="m-3 flex flex-row ">
        <ProductMeta date={date} model={model} />
      </div>
    </div>
  );
}
