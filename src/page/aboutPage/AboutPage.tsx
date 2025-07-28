import logo from "../../assets/rss-logo.svg";

const AboutPage = () => {
  return (
    <div
      className=" bg-stone-50 rounded-md p-4 grow flex flex-col gap-6"
      data-testid="wrapper"
    >
      <h1 className=" font-bold text-3xl" data-testid="title">
        Hi, I&apos;m Aleksei
      </h1>
      <div
        className="grid grid-cols-7 p-3 border-8 rounded-md border-stone-200 gap-4"
        data-testid="addition-info"
      >
        <p className=" col-span-5 text-justify">
          I build apps using JavaScript, TypeScript, and React, and I&apos;m
          always diving deeper into UI/UX details, performance tricks, and
          component architecture. Lately I&apos;ve been experimenting with PHP
          and WordPress, tweaking templates, customizing themes, and learning
          the quirks of backend-ish workflows.
        </p>
        <p className=" col-span-5 col-start-2 text-justify">
          I care a lot about accessibility, responsive design, and writing code
          that&apos;s easy to understand (for humans and machines). Whether
          it&apos;s debugging something gnarly in the browser or improving how
          feedback gets delivered in the UI, I like solving problems that
          actually make things better.
        </p>
        <p className=" col-span-5 col-start-3 text-justify">
          Still exploring, still learning — and always up for building things
          that people actually enjoy using.
        </p>
      </div>
      <div className="border-8 rounded-md border-stone-200 gap-4 grow ">
        <a
          href="https://rs.school/"
          target="_blank"
          rel="noreferrer"
          className="w-full h-full flex justify-center items-center relative"
        >
          <span className=" font-bold text-2xl text-center">
            The best school for web developer
          </span>
          <img
            src={logo}
            alt="Logo Rsschool"
            className=" max-w-3/4 max-h-3/4 opacity-15 absolute"
            data-testid="logo-rs"
          />
        </a>
      </div>
    </div>
  );
};

export default AboutPage;
