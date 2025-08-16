import { LINK_TO_GITHUB, LINK_TO_RS } from "../constant/global-constant";
import Image from "next/image";
import logo from "../../public/assets/rss-logo.svg";
import { Link } from "@/i18n/navigation";

export const Footer = () => {
  return (
    <footer
      className="flex justify-evenly items-center bg-gray-300 p-4 font-semibold text-xl rounded-2xl"
      data-testid="footer"
    >
      <Link href={LINK_TO_GITHUB} target="_blank" rel="noreferrer">
        created by <span>Aleksei Zhuchkov</span>
      </Link>
      <Link href={LINK_TO_RS} className="flex gap-1.5">
        <span>RSSchool 2025 react</span>
        <Image src={logo} alt="logo rsschool" className="w-[24px] h-auto" />
      </Link>
    </footer>
  );
};
