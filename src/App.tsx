import { ErrorBoundary } from "./components/ErrorBoundary";
import { Footer } from "./components/Footer";
import { Outlet } from "react-router";
import { NavigationBar } from "./components/NavigationBar";
import { useAppSelector } from "./hooks/appHook";

const App = () => {
  const isLight = useAppSelector((state) => state.theme.isLight);
  return (
    <ErrorBoundary>
      <div
        className="container mx-auto p-3 flex flex-col gap-3 h-full"
        data-testid="app-wrapper"
        data-theme={`${isLight ? "" : "dark"}`}
      >
        <main
          className="bg-blue-50 rounded-2xl p-3 flex flex-col gap-2 grow dark:bg-stone-800"
          data-testid="app-main-container"
        >
          <NavigationBar />
          <Outlet />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default App;
