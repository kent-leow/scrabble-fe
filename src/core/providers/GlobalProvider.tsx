'use client';

import React, { ReactNode, useEffect } from 'react';
import GlobalContext from '~/core/contexts/GlobalContext';
import { useScoresAPI } from '~/core/hooks/apis/useScoresAPI.hook';

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const { fetchScoringRules } = useScoresAPI();
  const [scoreRules, setScoreRules] = React.useState<Record<string, number>>(
    {},
  );

  useEffect(() => {
    fetchScoringRules().then((rules) => setScoreRules(rules));
  }, []);

  return (
    <GlobalContext.Provider value={{ scoreRules }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
