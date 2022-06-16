import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { LocaleSwitch } from "@/components/LocaleSwitch";
import { NavItemHeader } from "@/components/NavItemHeader";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { globalConfig } from "@/utils/global.config";

// eslint-disable-next-line import/prefer-default-export
export function Header() {
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("Navigation");
  useEffect(() => setMounted(true), []);

  return (
    <nav className="pb-8 pt-4 sm:pb-16">
      <a href="#skip" className="skip-nav">
        Skip to content
      </a>
      <div className="flex justify-between">
        <div className="flex items-center">
          {globalConfig.menuLinks.map((link, index) => (
            <NavItemHeader
              href={link.href}
              text={index === 0 ? `${globalConfig.copyright}` : t(link.title)}
              key={link.title}
            />
          ))}
        </div>
        {mounted && (
          <div className="align-middlle flex items-center">
            <LocaleSwitch />
            <ThemeSwitch />
          </div>
        )}
      </div>
    </nav>
  );
}
