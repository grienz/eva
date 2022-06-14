import { ProductBody } from '@/components/ProductBody';
import { SanityImage } from '@/components/SanityImage';
import { Socials } from '@/components/Socials';
import { globalConfig } from '@/config/global.config';

export function PageTop({
  title,
  subtitle = '',
  socials = [],
  pictureUrl = '',
  text
}) {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-start">
      <div className="flex flex-col pr-8">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1  text-gray-800 dark:text-gray-200">
          {title}
        </h1>
        {subtitle && (
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight  text-gray-800 dark:text-gray-200">
            {subtitle}
          </h2>
        )}
        <ProductBody text={text} />
        <div className="flex itms-center align-middle mb-2">
          {socials.length > 0 && <Socials socials={socials} />}
        </div>
      </div>
      {pictureUrl && (
        <div className="flex-col">
          <div className="mb-4 md:mb-0 w-32 h-32 md:w-48 md:h-48">
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
