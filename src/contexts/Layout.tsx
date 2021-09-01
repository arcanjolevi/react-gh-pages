import { ReactNode } from "react";
import { useState } from "react";
import { createContext } from "react";

type ComponentProps = {
  children: ReactNode;
};

export type Layout =
  | "map"
  | "fleet"
  | "settings"
  | "drivers"
  | "finances"
  | "calls"
  | "filters"
  | "estatistics"
  | "routes"
  | "checks";

type LayoutObject = {
  currentLayout: Layout;
  setCurrentLayout: (param: Layout) => void;
};

export const LayoutContext = createContext({} as LayoutObject);

export function LayoutContextProvider(props: ComponentProps) {
  const [currentLayout, setCurrentLayout] = useState<Layout>("map");

  return (
    <LayoutContext.Provider value={{ currentLayout, setCurrentLayout }}>
      {props.children}
    </LayoutContext.Provider>
  );
}
