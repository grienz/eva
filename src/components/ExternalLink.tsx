export function ExternalLink({
  href,
  children,
  title
}: {
  href: string;
  title?: string;
  children: JSX.Element;
}) {
  return (
    <a
      className="items-center pl-4 text-sm font-medium text-gray-800 transition-all delay-100 hover:text-sky-600 dark:text-gray-50 dark:hover:text-sky-400 md:text-base"
      target="_blank"
      title={title}
      rel="noopener noreferrer"
      href={href}
    >
      {children}
    </a>
  );
}
