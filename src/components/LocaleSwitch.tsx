import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

// eslint-disable-next-line import/prefer-default-export
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
      <span className="hidden items-center px-1 text-base font-medium uppercase text-gray-800 transition-all duration-100 hover:text-teal-600 dark:text-gray-50 dark:hover:text-teal-400 md:text-xl lg:py-4">
        {router.locale === "tr" ? "tr" : "en"}
      </span>
      <div className="hover:animate-pulse">{t("flag")}</div>
    </button>
  );
}
