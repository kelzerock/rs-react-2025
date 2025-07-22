import { ErrorBoundary } from "./components/ErrorBoundary";
import { Footer } from "./components/Footer";
import { Outlet } from "react-router";
import { NavigationBar } from "./components/NavigationBar";

const App = () => {
  return (
    <div className="container mx-auto p-3 flex flex-col gap-3 h-full">
      <ErrorBoundary>
        <div className="bg-blue-100 rounded-2xl p-3 flex flex-col gap-2 grow">
          <NavigationBar />
          <Outlet />
        </div>
        <Footer />
      </ErrorBoundary>
    </div>
  );
};

export default App;
