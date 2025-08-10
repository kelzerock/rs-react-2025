import { LINK_TO_GITHUB, LINK_TO_RS } from "../constant/global-constant";
import logo from "../assets/rss-logo.svg";

export const Footer = () => {
  return (
    <footer
      className="flex justify-evenly items-center bg-gray-300 p-4 font-semibold text-xl rounded-2xl"
      data-testid="footer"
    >
      <a
        href={LINK_TO_GITHUB}
        target="_blank"
        rel="noreferrer"
        data-testid="link-to-author"
      >
        created by <span>Aleksei Zhuchkov</span>
      </a>
      <a
        href={LINK_TO_RS}
        className="flex gap-1.5"
        data-testid="link-to-rsschool"
      >
        <span>RSSchool 2025 react</span>
        <img src={logo} alt="logo rsschool" className="w-[24px] h-auto" />
      </a>
    </footer>
  );
};
