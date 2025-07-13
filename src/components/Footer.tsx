import { Component, type ReactNode } from "react";
import { LINK_TO_GITHUB, LINK_TO_RS } from "../constant/global-constant";
import logo from "../assets/rss-logo.svg";

export class Footer extends Component {
  render(): ReactNode {
    return (
      <footer className="flex justify-evenly items-center bg-gray-300 p-4 font-semibold text-xl rounded-2xl">
        <a href={LINK_TO_GITHUB} target="_blank" rel="noreferrer">
          created by <span>Aleksei Zhuchkov</span>
        </a>
        <a href={LINK_TO_RS} className="flex gap-1.5">
          <span>RSSchool 2025 react</span>
          <img src={logo} alt="logo rsschool" className="w-[24px] h-auto" />
        </a>
      </footer>
    );
  }
}
