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
    <nav className="sticky top-0 z-50 rounded-b-lg border-x-1 border-b-2 border-teal-600 bg-slate-100 bg-opacity-40 px-2 drop-shadow-md backdrop-blur-lg backdrop-opacity-60 dark:bg-slate-900 dark:bg-opacity-40">
      <a href="#skip" className="skip-nav">
        &gt;
      </a>
      <div className="flex justify-between">
        <div className="flex items-center">
          {globalConfig.menuLinks.map((link, index) => (
            <NavItemHeader
              href={link.href}
              text={index === 0 ? `${globalConfig.copyright}` : t(link.title)}
              key={link.title}
              icon={link.icon}
            />
          ))}
        </div>
        {mounted && (
          <div className="flex items-center align-middle">
            <LocaleSwitch />
            <ThemeSwitch />
          </div>
        )}
      </div>
    </nav>
  );
}
