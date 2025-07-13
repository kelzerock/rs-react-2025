import { Component } from "react";
import type { PropsAbsent } from "../models/types/propsAbsent";

export class CrashComponent extends Component<PropsAbsent> {
  constructor(props: PropsAbsent) {
    super(props);
    throw new Error("Simulate error!");
  }
}
