import { Component } from "react";
import { Search } from "./components/Search";
import { ListOfCharacters } from "./components/ListOfCharacters";
import { isResponse } from "./utils/checkFn/isResponse";
import type { PropsAbsent } from "./models/types/propsAbsent";
import type { StateAppComponent } from "./models/types/stateAppComponent";
import { requestAPI } from "./utils/requestAPI";

class App extends Component<PropsAbsent, Readonly<StateAppComponent>> {
  state: Readonly<StateAppComponent>;

  constructor(props: PropsAbsent) {
    super(props);
    this.state = {
      characters: [],
      isLoading: true,
      inputSearch: "",
    };
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.requestToApi = this.requestToApi.bind(this);
  }

  handleSearchInputChange = (value: string): void => {
    this.setState({ inputSearch: value });
  };

  async requestToApi(): Promise<void> {
    try {
      const response = await requestAPI(this.state.inputSearch);
      if (!response.ok) return;

      const data = await response.json();
      if (isResponse(data)) {
        this.setState({ characters: data.characters, isLoading: false });
      } else {
        this.setState({ characters: [], isLoading: false });
      }
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      this.setState({ isLoading: false });
    }
  }

  async componentDidMount(): Promise<void> {
    await this.requestToApi();
  }

  async componentDidUpdate(
    prevProps: PropsAbsent,
    prevState: StateAppComponent,
  ): Promise<void> {
    if (prevState.inputSearch !== this.state.inputSearch) {
      this.setState({ isLoading: true });
      await this.requestToApi();
    }
  }

  render() {
    const { characters, isLoading } = this.state;

    return (
      <div className="container mx-auto p-3">
        <div className="bg-blue-100 rounded-2xl p-3 flex flex-col gap-2">
          <h1 className="p-4 text-4xl">StarTrek characters library:</h1>
          <Search onInputChange={this.handleSearchInputChange} />

          {isLoading ? (
            <p className="text-gray-500 text-xl">Загрузка данных...</p>
          ) : characters.length > 0 ? (
            <ListOfCharacters list={characters} />
          ) : (
            <p className="text-red-500">Нет данных для отображения.</p>
          )}
        </div>
      </div>
    );
  }
}

export default App;
