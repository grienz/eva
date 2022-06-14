import { parseISO } from 'date-fns';
import Link from 'next/link';
import { useIntl } from 'next-intl';

import { AvatarImage } from '@/components/AvatarImage';

export function ProductMeta({ model, date }) {
  const intl = useIntl();
  return (
    <>
      <div className="relative">
        <AvatarImage url={model.modelPicture} alt={model.modelName} />
      </div>
      <div className="pl-2 flex-1">
        <Link href={`/model/${model.modelSlug}`}>
          <a className="font-bold text-base hover:text-teal-600  transition-all delay-100 dark:hover:text-teal-400">
            {model.modelName}
          </a>
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <time>
            {intl.formatDateTime(parseISO(date), {
              year: 'numeric',
              month: 'long'
            })}
          </time>
        </p>
      </div>
    </>
  );
}
