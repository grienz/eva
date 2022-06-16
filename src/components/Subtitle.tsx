// eslint-disable-next-line import/prefer-default-export
export function Subtitle({ children }: { children: string }) {
  return (
    <h3 className="mb-6 text-2xl font-semibold tracking-tight text-gray-800 dark:text-gray-200 md:text-3xl">
      {children}
    </h3>
  );
}
