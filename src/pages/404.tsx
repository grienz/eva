import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { RiAlarmWarningFill } from 'react-icons/ri';

export default function FourZeroFour() {
  const t = useTranslations('404');

  return (
    <div className="flex flex-col items-center justify-center mt-40 md:flex-row md:space-x-6">
      <div className="space-x-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-6xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 md:border-r-2 md:px-6 md:text-8xl md:leading-14">
          404
        </h1>
      </div>
      <div>
        <RiAlarmWarningFill
          size={60}
          className="text-gray-600 dark:text-yellow-300"
        />
      </div>
      <div className="max-w-md">
        <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
          {t('title')}
        </p>
        <p className="mb-8">{t('body')}</p>
        <Link href="/">
          <button className="inline rounded-lg border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors duration-150 hover:bg-teal-800 focus:outline-none dark:hover:bg-teal-400">
            {t('button')}
          </button>
        </Link>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}
