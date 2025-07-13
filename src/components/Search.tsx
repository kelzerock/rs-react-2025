import { Component, type ReactNode } from "react";
import { saveDataToLocalStorage } from "../utils/saveDataToLocalStorage";
import { LocalStorageKey } from "../models/enums/localStorageKey";
import { loadDataFromLocalStorage } from "../utils/loadDataFromLocalStorage";

type Props = {
  onInputChange: (value: string) => void;
};

export class Search extends Component<Props> {
  state: Readonly<{ inputValue: string }>;

  constructor(props: Props) {
    super(props);
    this.state = {
      inputValue: "",
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target) {
      this.setState((prevState) => {
        return { ...prevState, inputValue: e.target.value };
      });
    }
  }

  private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("submit");
    saveDataToLocalStorage(this.state.inputValue, LocalStorageKey.inputData);
    this.props.onInputChange(this.state.inputValue);
  }

  componentDidMount(): void {
    const data = loadDataFromLocalStorage(LocalStorageKey.inputData);
    if (data) {
      this.setState((prevState) => ({
        ...prevState,
        inputValue: String(data),
      }));
    }
  }

  render(): ReactNode {
    return (
      <form className="flex gap-2" onSubmit={this.handleSubmit}>
        <input
          className="bg-gray-300 rounded-md p-2"
          type="text"
          value={this.state.inputValue}
          onChange={this.handleInput}
        />
        <button
          type="submit"
          className="bg-emerald-500 text-white text-2xl p-2 rounded-2xl"
        >
          Search
        </button>
      </form>
    );
  }
}
