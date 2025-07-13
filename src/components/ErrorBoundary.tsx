import { Component } from "react";
import type { ErrorBoundaryProps } from "../models/types/errorBoundaryProps";
import type { ErrorBoundaryState } from "../models/types/errorBoundaryState";

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: Readonly<{ hasError: boolean }>;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center text-red-500">
          <h1>Something went wrong...</h1>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 p-2 bg-blue-300 rounded cursor-pointer hover:bg-blue-500 border border-2 border-white text-white font-bold"
          >
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
