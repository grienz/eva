import { PortableText } from '@portabletext/react';

import { SanityImage } from '@/components/SanityImage';
import { globalConfig } from '@/config/global.config';

const ptComponents = {
  types: {
    image: ({ value }) => {
      // eslint-disable-next-line no-underscore-dangle
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative py-8">
          <SanityImage
            alt={value.alt ?? ''}
            url={value}
            width={globalConfig.images.defaultProductImageWidth}
            height={globalConfig.images.defaultProductImageHeight}
          />
        </div>
      );
    }
  }
};

export function ProductBody({ text }) {
  return (
    <div className="selection:bg-fuchsia-300 selection:text-fuchsia-900 max-w-2xl mx-auto w-full prose-p:py-4 prose  dark:prose-dark lg:prose-xl">
      <PortableText value={text} components={ptComponents} />
    </div>
  );
}
