import { Component, type ReactNode } from "react";
import { saveDataToLocalStorage } from "../utils/saveDataToLocalStorage";
import { LocalStorageKey } from "../models/enums/localStorageKey";
import { loadDataFromLocalStorage } from "../utils/loadDataFromLocalStorage";

type PropsSearchComponent = {
  onInputChange: (value: string) => void;
  isLoading: boolean;
  initialValue: string;
};

export class Search extends Component<PropsSearchComponent> {
  state: Readonly<{ inputValue: string }>;

  constructor(props: PropsSearchComponent) {
    super(props);
    this.state = {
      inputValue: props.initialValue,
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target) {
      const inputValue = e.target.value.trim();
      this.setState((prevState) => {
        return { ...prevState, inputValue };
      });
    }
  }

  private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = this.state.inputValue.trim();
    saveDataToLocalStorage(value, LocalStorageKey.inputData);
    this.props.onInputChange(value);
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
    const { isLoading } = this.props;
    return (
      <form className="flex gap-2 flex-wrap" onSubmit={this.handleSubmit}>
        <input
          className="bg-gray-500 text-white text-2xl rounded-md p-2 disabled:bg-gray-300 disabled:text-gray-100 disabled:cursor-auto w-full sm:w-auto"
          type="text"
          value={this.state.inputValue}
          onChange={this.handleInput}
          disabled={isLoading}
        />
        <button
          disabled={isLoading}
          type="submit"
          className=" w-full sm:w-auto disabled:cursor-auto bg-emerald-500 text-white text-2xl py-2 px-4 rounded-md font-semibold hover:bg-emerald-600 cursor-pointer disabled:bg-gray-300 disabled:text-gray-100"
        >
          Search by name
        </button>
      </form>
    );
  }
}
