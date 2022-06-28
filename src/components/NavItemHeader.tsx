import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

import { getActiveStatus } from "@/utils/contentUtils";

export function NavItemHeader({
  href,
  text,
  icon
}: {
  href: string;
  text: string;
  icon: JSX.Element;
}) {
  const router = useRouter();
  return (
    <Link href={href}>
      <a
        className={cn(
          getActiveStatus(href, router.asPath)
            ? "text-sky-600 dark:text-sky-400"
            : "text-gray-800  dark:text-gray-50",
          "nav-link inline-block py-2 pr-4  text-base font-medium md:text-xl lg:py-4"
        )}
      >
        <span className="capsize">{text}</span>
        <div className="capsize mx-2 lg:hidden xl:hidden 2xl:hidden">
          {icon}
        </div>
      </a>
    </Link>
  );
}
