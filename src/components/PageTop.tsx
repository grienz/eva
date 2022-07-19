import { ProductBody } from "@/components/ProductBody";
import { RoundImage } from "@/components/RoundImage";
import { Socials } from "@/components/Socials";
import type { PortableText } from "@/typings/schema-types";

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
        <h1 className="gradient-header mb-1 pb-2 text-3xl font-bold tracking-tight md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <h2 className="mb-1 pb-1 text-2xl  font-medium tracking-tight text-gray-800  dark:text-gray-200 md:text-3xl">
            {subtitle}
          </h2>
        )}
        <ProductBody text={text} />
        <div className="mb-1 flex items-center align-middle">
          {socials.length > 0 && <Socials socials={socials} />}
        </div>
      </div>
      {pictureUrl && (
        <div className="flex">
          <div className="lg:h-76 lg:w-76 mb-4 h-48 w-48 md:mb-0 md:h-64 md:w-64">
            <RoundImage alt={title} url={pictureUrl} />
          </div>
        </div>
      )}
    </div>
  );
}
