import { parseISO } from "date-fns";
import Link from "next/link";
import { useIntl } from "next-intl";

import { AvatarImage } from "@/components/AvatarImage";
import type { ModelBase } from "@/typings/schema-types";

export type ProductMetaProps = {
  date: string;
  model: ModelBase;
};

export function ProductMeta({ model, date }: ProductMetaProps) {
  const intl = useIntl();
  return (
    <div className="ml-2 mt-1 mb-1 flex flex-row">
      <AvatarImage url={model.modelPicture} alt={model.modelName} />
      <div className="flex-1 pl-2">
        <Link href={`/model/${model.modelSlug}`}>
          <a className="text-sm font-bold text-slate-800 transition-all delay-100 hover:text-sky-600 dark:text-slate-100 dark:hover:text-sky-400">
            {model.modelName}
          </a>
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <time>
            {intl.formatDateTime(parseISO(date), {
              year: "numeric",
              month: "long"
            })}
          </time>
        </p>
      </div>
    </div>
  );
}
