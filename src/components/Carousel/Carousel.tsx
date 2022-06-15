import Link from 'next/link';

import { SanityImage } from '@/components/SanityImage';
import { globalConfig } from '@/config/global.config';
import { truncate } from '@/lib/contentUtils';

export function Carousel({ title, previewImage, slug }) {
  return (
    <div className="carousel slide carousel-fade carousel-dark relative ">
      <SanityImage
        slug={slug}
        alt={title}
        url={previewImage}
        width={globalConfig.images.defaultProductPreviewImageWidth}
        height={globalConfig.images.defaultProductImagePreviewHeight}
      />
      <h4 className="w-full  font-medium  text-lg hover:text-teal-600  transition-all delay-100 dark:hover:text-teal-400  text-gray-800 dark:text-gray-200">
        <Link href={`/product/${slug}`}>
          <a>{truncate(title)}</a>
        </Link>
      </h4>
    </div>
  );
}
