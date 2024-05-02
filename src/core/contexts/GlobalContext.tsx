import { createContext } from 'react';

export interface GlobalContextProps {
  scoreRules: Record<string, number>;
}

const GlobalContext = createContext<GlobalContextProps>({
  scoreRules: {},
});

export default GlobalContext;
