import { createBrowserRouter } from "react-router";
import App from "../App";
import AboutPage from "../page/aboutPage/AboutPage";
import { HomePage } from "../page/homePage/HomePage";
import { NotFoundPage } from "../page/notFound/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: HomePage },
      { path: "/about", Component: AboutPage },

      { path: "*", Component: NotFoundPage },
    ],
    errorElement: <NotFoundPage />,
  },
]);
