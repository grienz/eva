import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

export function LocaleSwitch() {
  const t = useTranslations("Navigation");
  const router = useRouter();
  const handleLocale = (locale: string) =>
    router.push(router.asPath, router.asPath, { locale });
  return (
    <button
      aria-label="Toggle Site Language"
      type="button"
      className="flex items-center "
      onClick={() => handleLocale(router.locale === "tr" ? "en" : "tr")}
    >
      <span className="hidden items-center text-base font-medium text-gray-800 transition-all duration-100 hover:text-sky-600 dark:text-gray-50 dark:hover:text-sky-400 md:text-xl lg:py-4">
        {router.locale === "tr" ? "tr" : "en"}
      </span>
      <div className="transition-all duration-100 hover:animate-pulse">
        {t("flag")}
      </div>
    </button>
  );
}
