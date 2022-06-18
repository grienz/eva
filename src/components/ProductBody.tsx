import { PortableText } from "@portabletext/react";

import { SanityImage } from "@/components/SanityImage";
import type { PortableText as PortableTextType } from "@/typings/schema-types";
import { globalConfig } from "@/utils/global.config";

const ptComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      // eslint-disable-next-line no-underscore-dangle
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative py-8">
          <SanityImage
            alt={value.alt ?? ""}
            url={value}
            width={globalConfig.images.defaultProductImageWidth}
            height={globalConfig.images.defaultProductImageHeight}
          />
        </div>
      );
    }
  }
};

// eslint-disable-next-line import/prefer-default-export
export function ProductBody({ text }: { text: PortableTextType }) {
  return (
    <div className="prose-p:py-4 prose dark:prose-dark lg:prose-xl mx-auto w-full max-w-2xl  selection:bg-fuchsia-300 selection:text-fuchsia-900">
      <PortableText value={text} components={ptComponents} />
    </div>
  );
}
