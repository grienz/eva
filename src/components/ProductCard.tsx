import Link from "next/link";

import { ProductMeta } from "@/components/ProductMeta";
import { SanityImage } from "@/components/SanityImage";
import { Tags } from "@/components/Tags";
import type { ModelBase, TagBase } from "@/typings/schema-types";
import { truncate } from "@/utils/contentUtils";

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
    <div className="my-2 rounded-md border-1 border-sky-600 bg-slate-200 p-0.5 dark:border-sky-400 dark:bg-slate-800 md:my-0">
      <SanityImage slug={slug} alt={title} url={previewImage} />
      <h4 className="navbar-link my-2 ml-2 text-xl font-medium ">
        <Link href={`/product/${slug}`}>
          <a className="product-header-link">{truncate(title)}</a>
        </Link>
      </h4>
      <div className="my-2 flex flex-row justify-end text-sm">
        {<Tags tags={tags} />}
      </div>
      <div className="flex flex-row">
        <ProductMeta date={date} model={model} />
      </div>
    </div>
  );
}
