// eslint-disable-next-line import/prefer-default-export
export function ExternalLink({
  href,
  children
}: {
  href: string;
  children: JSX.Element;
}) {
  return (
    <a
      className="items-center pl-4 text-sm font-medium text-gray-800 transition-all delay-100 hover:text-teal-800 dark:text-gray-50 dark:hover:text-teal-400 md:text-base"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      {children}
    </a>
  );
}
