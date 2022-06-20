import Link from "next/link";

import { ProductMeta } from "@/components/ProductMeta";
import { SanityImage } from "@/components/SanityImage";
import { Tags } from "@/components/Tags";
import type { ModelBase, TagBase } from "@/typings/schema-types";
import { truncate } from "@/utils/contentUtils";
import { globalConfig } from "@/utils/global.config";

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
    <div className="my-4 rounded-md border-1 border-teal-600 px-1 py-1 md:my-0">
      <SanityImage
        slug={slug}
        alt={title}
        url={previewImage}
        width={globalConfig.images.defaultProductPreviewImageWidth}
        height={globalConfig.images.defaultProductImagePreviewHeight}
      />
      <h4 className="mt-4 w-full text-lg  font-medium text-gray-800  transition-all delay-100 hover:text-teal-600  dark:text-gray-200 dark:hover:text-teal-400">
        <Link href={`/product/${slug}`}>
          <a>{truncate(title)}</a>
        </Link>
      </h4>
      <div className="flex flex-row justify-end text-sm">
        {<Tags tags={tags} />}
      </div>
      <div className="flex flex-row ">
        <ProductMeta date={date} model={model} />
      </div>
    </div>
  );
}
