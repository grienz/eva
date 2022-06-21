import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
// eslint-disable-next-line import/prefer-default-export
export function NavItemHeader({ href, text }: { href: string; text: string }) {
  const router = useRouter();
  const isActive = router.asPath === href;
  return (
    <Link href={href}>
      <a
        className={cn(
          isActive ? " text-teal-600" : "text-gray-800  dark:text-gray-50",
          "nav-link py-2 px-2 text-base font-medium md:text-xl lg:py-4"
        )}
      >
        {text}
      </a>
    </Link>
  );
}
