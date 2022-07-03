import { useTranslations } from "next-intl";

import { ExternalLink } from "@/components/ExternalLink";
import { facebook, instagram, logo, mail, telegram } from "@/components/Icons";
import { NavItemFooter } from "@/components/NavItemFooter";
import { SectionSeparator } from "@/components/SectionSeparator";
import { GLOBAL_CONFIG } from "@/utils/global.config";

const copyrightYear = new Date().getFullYear();

export function Footer() {
  const t = useTranslations("Navigation");

  return (
    <footer className="mx-auto mb-6  flex w-full max-w-2xl flex-col">
      <SectionSeparator />
      <div className="flex justify-between">
        <div className="inline-flex items-center">
          {GLOBAL_CONFIG.menuLinks.map((link, index) => (
            <NavItemFooter
              href={link.href}
              text={index === 0 ? `${t("home")}` : t(link.title)}
              key={link.title}
            />
          ))}
        </div>
        <div className="inline-flex items-center">
          <ExternalLink href={GLOBAL_CONFIG.telegramLink}>
            {telegram}
          </ExternalLink>
          <ExternalLink href={GLOBAL_CONFIG.facebookLink}>
            {facebook}
          </ExternalLink>
          <ExternalLink href={GLOBAL_CONFIG.instagramLink}>
            {instagram}
          </ExternalLink>
          <ExternalLink href={GLOBAL_CONFIG.mail}>{mail}</ExternalLink>
        </div>
      </div>
      <div className="my-4 flex flex-row items-center justify-center py-2 text-sm">
        <a
          className=" pb-2 text-xs font-thin text-gray-800 transition-all delay-100 hover:text-sky-600 dark:text-gray-50 dark:hover:text-sky-400 md:text-sm"
          target="_blank"
          rel="noopener noreferrer"
          href={GLOBAL_CONFIG.githubLink}
          title={t("sourcecode")}
        >
          {logo}
        </a>
        <a
          className="  pl-2 text-xs font-thin text-gray-800 transition-all delay-100 hover:text-sky-600 dark:text-gray-50 dark:hover:text-sky-400 md:text-sm"
          rel="noopener noreferrer"
          title={GLOBAL_CONFIG.copyright}
        >
          {t("copyright")} © {copyrightYear} {GLOBAL_CONFIG.copyright}
        </a>
      </div>
    </footer>
  );
}
