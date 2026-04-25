declare module "react" {
  export type FormEvent<T = Element> = Event & {
    currentTarget: T;
    target: EventTarget | null;
    preventDefault(): void;
  };

  export function useMemo<T>(factory: () => T, deps: readonly unknown[]): T;
  export function useState<S>(initialState: S | (() => S)): [S, (value: S | ((previous: S) => S)) => void];
}

declare module "react/jsx-runtime" {
  export const jsx: unknown;
  export const jsxs: unknown;
  export const Fragment: unknown;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elementName: string]: any;
  }
}
