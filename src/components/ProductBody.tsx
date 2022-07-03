import { PortableText } from "@portabletext/react";

import { SanityImage } from "@/components/SanityImage";
import type { PortableText as PortableTextType } from "@/typings/schema-types";

const ptComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      // eslint-disable-next-line no-underscore-dangle
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative py-8">
          <SanityImage alt={value.alt ?? ""} url={value} />
        </div>
      );
    }
  }
};

export function ProductBody({ text }: { text: PortableTextType }) {
  return (
    <div className="prose dark:prose-dark lg:prose-xl mx-auto w-full max-w-2xl">
      <PortableText value={text} components={ptComponents} />
    </div>
  );
}
