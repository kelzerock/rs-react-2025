"use client";

import { Paths } from "../models/enums/paths";
import logo from "../../public/assets/logo.webp";
import { ThemePanel } from "./ThemePanel";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, Link } from "@/i18n/navigation";

export const NavigationBar = () => {
  const t = useTranslations("NavigationBar");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <header
      data-testid="wrapper"
      className="flex gap-6 bg-stone-50 dark:bg-stone-700 p-4 rounded-md items-center relative"
    >
      <Image
        data-testid="logo"
        src={logo}
        alt="logo star trek"
        className="w-[50px] h-[50px] rounded-full"
      />
      <nav className="h-auto" data-testid="nav">
        <ul className="flex rounded-md bg-stone-300 dark:bg-stone-400 h-auto p-2 gap-2">
          {Object.entries(Paths).map(([key, value]) => {
            return (
              <li key={key} className="w-full h-full sm:w-auto">
                <Link
                  href={value}
                  className={`block text-3xl font-bold bg-stone-300 dark:bg-stone-700 dark:hover:bg-stone-500 dark:text-stone-400 rounded-md p-3 hover:bg-stone-700 hover:text-stone-200 transition-colors duration-500 capitalize ${
                    pathname === value ? "underline" : ""
                  }`}
                >
                  {t(key)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="flex gap-2 justify-end">
        <Link
          href={pathname}
          locale={locale === "en" ? "ru" : "en"}
          className="bg-rose-600 text-white rounded-md p-2"
        >
          Change language ({locale === "en" ? "ru" : "en"})
        </Link>
      </div>
      <ThemePanel />
    </header>
  );
};
