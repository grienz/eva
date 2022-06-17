import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
// eslint-disable-next-line import/prefer-default-export
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
  const isActive = router.asPath === href;
  return (
    <Link href={href}>
      <a
        className={cn(
          isActive ? " text-teal-600" : "text-gray-800  dark:text-gray-50",
          "nav-link py-2 pr-4 text-base font-medium md:text-xl lg:py-4"
        )}
      >
        <span className="hidden lg:block xl:block 2xl:block">{text}</span>
        <div className="mx-2 lg:hidden xl:hidden 2xl:hidden">{icon}</div>
      </a>
    </Link>
  );
}
