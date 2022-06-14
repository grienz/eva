import Link from 'next/link';

import { ProductMeta } from '@/components/ProductMeta';
import { SanityImage } from '@/components/SanityImage';
import { Tags } from '@/components/Tags';
import { globalConfig } from '@/config/global.config';
import { truncate } from '@/lib/contentUtils';

export function ProductCard({ title, previewImage, date, model, tags, slug }) {
  return (
    <div className="my-4 md:my-0">
      <SanityImage
        slug={slug}
        alt={title}
        url={previewImage}
        width={globalConfig.images.defaultProductPreviewImageWidth}
        height={globalConfig.images.defaultProductImagePreviewHeight}
      />
      <h4 className="w-full mt-4 font-medium  text-lg hover:text-teal-600  transition-all delay-100 dark:hover:text-teal-400  text-gray-800 dark:text-gray-200">
        <Link href={`/product/${slug}`}>
          <a>{truncate(title)}</a>
        </Link>
      </h4>
      <div className="mb-4 flex flex-row text-sm  justify-end">
        <Tags tags={tags} />
      </div>
      <div className="flex flex-row ">
        <ProductMeta date={date} model={model} />
      </div>
    </div>
  );
}
