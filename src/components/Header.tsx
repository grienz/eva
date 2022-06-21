import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { LocaleSwitch } from "@/components/LocaleSwitch";
import { NavItemHeader } from "@/components/NavItemHeader";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { GLOBAL_CONFIG } from "@/utils/global.config";

// eslint-disable-next-line import/prefer-default-export
export function Header() {
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("Navigation");
  useEffect(() => setMounted(true), []);

  return (
    <nav className="mb-3 rounded-b-lg border border-teal-600 px-2 dark:bg-slate-900">
      <a href="#skip" className="skip-nav">
        &gt;
      </a>
      <div className="flex justify-between">
        <div className="flex items-center">
          {GLOBAL_CONFIG.menuLinks.map((link, index) => (
            <NavItemHeader
              href={link.href}
              text={index === 0 ? `${GLOBAL_CONFIG.copyright}` : t(link.title)}
              key={link.title}
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
