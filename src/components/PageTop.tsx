import { ProductBody } from "@/components/ProductBody";
import { SanityImage } from "@/components/SanityImage";
import { Socials } from "@/components/Socials";
import type { PortableText } from "@/typings/schema-types";
import { globalConfig } from "@/utils/global.config";

export type PageTopProps = {
  title: string;
  subtitle?: string;
  socials?: string[];
  pictureUrl?: string;
  text: PortableText;
};

export function PageTop({
  title,
  subtitle = "",
  socials = [],
  pictureUrl = "",
  text
}: PageTopProps) {
  return (
    <div className="flex flex-col-reverse items-start sm:flex-row">
      <div className="flex flex-col pr-8">
        <h1 className="mb-1 text-3xl font-bold tracking-tight text-gray-800  dark:text-gray-200 md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <h2 className="text-2xl font-medium tracking-tight text-gray-800  dark:text-gray-200 md:text-3xl">
            {subtitle}
          </h2>
        )}
        <ProductBody text={text} />
        <div className="itms-center mb-2 flex align-middle">
          {socials.length > 0 && <Socials socials={socials} />}
        </div>
      </div>
      {pictureUrl && (
        <div className="flex-col">
          <div className="mb-4 h-32 w-32 md:mb-0 md:h-48 md:w-48">
            <SanityImage
              alt={title}
              width={globalConfig.images.defaultRoundImageWidthHeight}
              isRounded={true}
              url={pictureUrl}
            />
          </div>
        </div>
      )}
    </div>
  );
}
