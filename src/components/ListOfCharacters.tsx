import { Component, type ReactNode } from "react";
import type { MainCharacter } from "../models/types/mainCharacter";
import { Character } from "./Character";

type Props = {
  list: MainCharacter[];
};
export class ListOfCharacters extends Component<Props> {
  render(): ReactNode {
    if (this.props.list.length === 0) {
      return <h2>Characters are absent</h2>;
    }
    return (
      <ul className="bg-cyan-100 p-2 rounded-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
        {this.props.list.map((character) => (
          <Character data={character} key={character.uid} />
        ))}
      </ul>
    );
  }
}
