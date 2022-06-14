import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function PaginationControls({ currentPage, totalPages = 0 }) {
  const t = useTranslations('Product');
  const isLeftDisabled = currentPage === 1;
  const isRightDisabled = currentPage === totalPages;

  return (
    <div className="flex flex-row justify-between place-items-center  w-full flex-nowrap">
      {isLeftDisabled ? (
        <p className="group  inline-flex items-center font-medium  text-base text-gray-500">
          <span>{` ← ${t('previous_page')}`}</span>
        </p>
      ) : (
        <Link href={`/product/p/${Number(currentPage - 1)}`}>
          <a className="group  inline-flex items-center font-medium hover:text-teal-600 text-base  transition-all delay-100 dark:hover:text-teal-400">
            <span>{`← ${t('previous_page')}`}</span>
          </a>
        </Link>
      )}
      {isRightDisabled ? (
        <p className="group  inline-flex items-center font-medium  text-base text-gray-500">
          <span>{`${t('next_page')} →`}</span>
        </p>
      ) : (
        <Link href={`/product/p/${Number(currentPage + 1)}`}>
          <a className="group  inline-flex items-center font-medium  hover:text-teal-600  transition-all delay-100 dark:hover:text-teal-400">
            <span>{`${t('next_page')} →`}</span>
          </a>
        </Link>
      )}
    </div>
  );
}
