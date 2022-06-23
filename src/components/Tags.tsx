import Link from "next/link";

import type { TagBase } from "@/typings/schema-types";
// eslint-disable-next-line import/prefer-default-export
export function Tags({ tags }: { tags: TagBase[] }) {
  return (
    <>
      {tags &&
        tags.map((tag) => (
          <Link href={`/tag/${tag.tagSlug}`} key={tag.tagSlug}>
            {/*  <a className="mx-1 my-1 flex rounded-md border border-slate-400 px-1 py-1 text-sm lowercase text-gray-600 transition-all delay-100  hover:border-teal-800 hover:text-teal-800 dark:text-white dark:hover:border-teal-400 dark:hover:text-teal-400">
              {`${tag.tagName}`}
            </a> */}

            <a className="my-1 mr-1 border-stone-900 p-1 text-xs lowercase text-stone-900 transition-all delay-100 hover:text-sky-600  dark:text-stone-100 dark:hover:text-sky-400">
              <span className=" text-sky-600 dark:text-sky-400">#</span>
              {`${tag.tagName}`}
            </a>
          </Link>
        ))}
    </>
  );
}
