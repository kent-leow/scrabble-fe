'use client';

import React, { ReactNode, useEffect } from 'react';
import GlobalContext from '~/core/contexts/GlobalContext';
import { useScoresAPI } from '~/core/hooks/apis/useScoresAPI.api';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '~/utils/constants/queryKeys';
import { APP_CONFIGS } from '~/utils/constants/appConfigs';

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const { getScoresRules } = useScoresAPI();
  const [scoreRules, setScoreRules] = React.useState<Record<string, number>>(
    {},
  );

  const { data: scoresRulesData } = useQuery({
    queryKey: [QUERY_KEYS.GET_SCORES_RULES],
    queryFn: getScoresRules,
    staleTime: APP_CONFIGS.STALE_TIME,
  });

  useEffect(() => {
    setScoreRules(scoresRulesData ?? {});
  }, [scoresRulesData]);

  return (
    <GlobalContext.Provider value={{ scoreRules }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
