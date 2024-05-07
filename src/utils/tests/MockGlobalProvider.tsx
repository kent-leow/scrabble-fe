import { FC } from 'react';
import GlobalContext from '~/core/contexts/GlobalContext';
import { mockScoreRules } from '~/core/domains/scores/scores.mock';

interface MockGlobalProviderProps {
  scoreRules?: Record<string, number>;
  children: React.ReactNode;
}

const MockGlobalProvider: FC<MockGlobalProviderProps> = ({
  scoreRules = mockScoreRules,
  children,
}) => {
  return (
    <GlobalContext.Provider
      value={{
        scoreRules,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default MockGlobalProvider;
