import Image from "next/image";
import logo from "../../../../public/assets/rss-logo.svg";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const AboutPage = () => {
  const t = useTranslations("About");
  return (
    <div
      className=" bg-stone-50 dark:bg-stone-700 rounded-md p-4 grow flex flex-col gap-6"
      data-testid="wrapper"
    >
      <h1
        className=" font-bold text-3xl dark:text-stone-400"
        data-testid="title"
      >
        {t("title")}
      </h1>
      <div
        className="grid grid-cols-7 p-3 border-8 rounded-md border-stone-200 gap-4 dark:text-stone-200 dark:font-medium"
        data-testid="addition-info"
      >
        <p className=" col-span-5 text-justify">{t("paragraph-1")}</p>
        <p className=" col-span-5 col-start-2 text-justify">
          {t("paragraph-2")}
        </p>
        <p className=" col-span-5 col-start-3 text-justify">
          {t("paragraph-3")}
        </p>
      </div>
      <div className="border-8 rounded-md border-stone-200 gap-4 grow ">
        <Link
          href="https://rs.school/"
          target="_blank"
          rel="noreferrer"
          className="w-full h-full flex justify-center items-center relative"
        >
          <span className=" font-bold text-2xl text-center dark:text-stone-300">
            {t("rsschool")}
          </span>
          <Image
            src={logo}
            alt="Logo Rsschool"
            className=" max-w-3/4 max-h-3/4 opacity-15 absolute"
            data-testid="logo-rs"
          />
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
