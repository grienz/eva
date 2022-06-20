import Link from "next/link";

import { product } from "@/components/Icons";
import type { TagBase } from "@/typings/schema-types";
// eslint-disable-next-line import/prefer-default-export
export function Tags({ tags }: { tags: TagBase[] }) {
  return (
    <>
      {tags &&
        tags.map((tag) => (
          <Link href={`/tag/${tag.tagSlug}`} key={tag.tagSlug}>
            <a className="ml-3 mt-2 mb-2 flex rounded-lg border border-slate-400 px-1 text-sm lowercase text-gray-600 transition-all delay-100  hover:border-teal-800 hover:text-teal-800 dark:text-white dark:hover:border-teal-400 dark:hover:text-teal-400">
              <span className="flex pr-1 pt-1  hover:text-teal-800 dark:hover:text-teal-400">
                {product}
              </span>
              {`${tag.tagName}`}
            </a>
          </Link>
        ))}
    </>
  );
}
