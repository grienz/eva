import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function MoreproductsControls({ isDisabled }) {
  const t = useTranslations('Product');
  return (
    <div className="flex w-full flex-row flex-nowrap  place-items-center justify-center">
      {isDisabled ? (
        <p className="group  inline-flex items-center text-lg  font-medium text-gray-500 md:text-xl">
          <span>{`${t('more_products')} →`}</span>
        </p>
      ) : (
        <Link href={`/product/list/1`}>
          <a className="group inline-flex items-center text-base  font-medium text-gray-800  transition-all delay-100 hover:text-teal-600 dark:text-gray-200 dark:hover:text-teal-400">
            <span>{`${t('more_products')} →`}</span>
          </a>
        </Link>
      )}
    </div>
  );
}
