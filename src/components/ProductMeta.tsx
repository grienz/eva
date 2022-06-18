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
    <>
      <div className="relative">
        <AvatarImage url={model.modelPicture} alt={model.modelName} />
      </div>
      <div className="flex-1 px-2">
        <Link href={`/model/${model.modelSlug}`}>
          <a className="text-base font-bold transition-all  delay-100 hover:text-teal-600 dark:hover:text-teal-400">
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
    </>
  );
}
