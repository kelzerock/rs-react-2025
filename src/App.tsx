import { Component } from "react";
import { Search } from "./components/Search";

class App extends Component {
  render() {
    return (
      <div className="container mx-auto p-3 flex flex-col gap-2">
        <div className="bg-blue-100 rounded-2xl p-3">
          <h1 className="p-4 text-4xl">application</h1>
          <Search />
        </div>
      </div>
    );
  }
}

export default App;
