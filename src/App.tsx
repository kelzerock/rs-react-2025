import { Component } from "react";
import { Search } from "./components/Search";
import { ListOfCharacters } from "./components/ListOfCharacters";
import { isResponse } from "./utils/checkFn/isResponse";
import type { PropsAbsent } from "./models/types/propsAbsent";
import type { StateAppComponent } from "./models/types/stateAppComponent";
import { requestAPI } from "./utils/requestAPI";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { CrashComponent } from "./components/CrashComponent";
import { loadDataFromLocalStorage } from "./utils/loadDataFromLocalStorage";
import { LocalStorageKey } from "./models/enums/localStorageKey";
import { Footer } from "./components/Footer";

class App extends Component<PropsAbsent, Readonly<StateAppComponent>> {
  state: Readonly<StateAppComponent>;

  constructor(props: PropsAbsent) {
    super(props);
    this.state = {
      characters: [],
      isLoading: true,
      inputSearch: "",
      isError: false,
      responseStatus: null,
    };
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.requestToApi = this.requestToApi.bind(this);
  }

  handleSearchInputChange = (value: string): void => {
    this.setState({ inputSearch: value });
  };

  async requestToApi(): Promise<void> {
    try {
      this.setState({ responseStatus: null });
      const response = await requestAPI(this.state.inputSearch);
      if (response.status >= 400) {
        this.setState({ responseStatus: response.status });
      }
      if (!response.ok) return;

      const data = await response.json();
      if (isResponse(data)) {
        this.setState({ characters: data.characters, isLoading: false });
      } else {
        this.setState({ characters: [], isLoading: false });
      }
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      this.setState({ characters: [], isLoading: false });
    }
  }

  async componentDidMount(): Promise<void> {
    const savedSearch = loadDataFromLocalStorage(LocalStorageKey.inputData);
    const searchQuery = savedSearch ? String(savedSearch) : "";

    await this.setState({ inputSearch: searchQuery });
    await this.requestToApi();
  }

  async componentDidUpdate(
    _: PropsAbsent,
    prevState: StateAppComponent,
  ): Promise<void> {
    if (prevState.inputSearch !== this.state.inputSearch) {
      this.setState({ isLoading: true });
      await this.requestToApi();
    }
  }

  onSimulateError = (): void => {
    this.setState({ isError: true });
  };

  render() {
    const { characters, isLoading, isError, inputSearch, responseStatus } =
      this.state;

    return (
      <div className="container mx-auto p-3 flex flex-col gap-3 h-full">
        <div className="bg-blue-100 rounded-2xl p-3 flex flex-col gap-2 grow">
          <h1 className="p-4 text-4xl">StarTrek characters library:</h1>
          <ErrorBoundary>
            <Search
              onInputChange={this.handleSearchInputChange}
              isLoading={isLoading}
              initialValue={inputSearch}
            />
            {isError && <CrashComponent />}
            {isLoading ? (
              <p className="text-gray-500 text-xl" aria-label="Loading data...">
                Loading data...
              </p>
            ) : (
              <ListOfCharacters list={characters} />
            )}
            {responseStatus !== null && (
              <p className="text-red-600 text-sm font-medium mt-2">
                Error connecting to API. Status code: {responseStatus}
              </p>
            )}
            <button
              className="p-2 bg-red-600 hover:bg-red-800 cursor-pointer text-white rounded-md font-semibold"
              onClick={this.onSimulateError}
            >
              Emulate error!
            </button>
          </ErrorBoundary>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
