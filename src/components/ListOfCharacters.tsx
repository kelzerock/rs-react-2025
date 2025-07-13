import { Component, type ReactNode } from "react";
import type { MainCharacter } from "../models/types/mainCharacter";

type Props = {
  list: MainCharacter[];
};
export class ListOfCharacters extends Component<Props> {
  render(): ReactNode {
    if (this.props.list.length === 0) {
      return <h2>Characters are absent</h2>;
    }
    return (
      <ul className="bg-cyan-100 p-2 rounded-2xl flex flex-col gap-2">
        {this.props.list.map((character) => (
          <li key={character.uid}>
            <span>{character.name}</span>
          </li>
        ))}
      </ul>
    );
  }
}
