'use client';
import isAuth from '~/utils/auth/isAuth';
import { FC, useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { IScoreResponse } from '~/core/domains/scores/scores.type';
import { fetchScores } from '~/core/apis/scores.api';
import { useRouter } from 'next/navigation';
import { ROUTES } from '~/utils/constants/routes';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '~/utils/constants/queryKeys';
import { displayErrorToast } from '~/utils/helpers/toast';
import CenteredCard from '~/components/templates/CenteredCard';

const ScoresPage: FC = () => {
  const { push } = useRouter();
  const [scores, setScores] = useState<IScoreResponse[]>([]);

  const { isLoading, isError, error, data, refetch } = useQuery({
    queryKey: [QUERY_KEYS.SCORES],
    queryFn: fetchScores,
  });

  if (isError) {
    displayErrorToast(error);
  }

  useEffect(() => {
    setScores(data ?? []);
  }, [data]);

  return (
    <CenteredCard>
      <Stack spacing={2}>
        <Typography variant="h4">High Scores</Typography>
        {isLoading && <Typography>Loading...</Typography>}
        {!scores.length && !isLoading && (
          <Typography>No scores yet!</Typography>
        )}
        {!!scores.length && (
          <Stack spacing={1}>
            {scores.map((score, index) => (
              <Stack key={`score-${index}`} direction="row">
                <Typography
                  flexGrow={1}
                >{`${index + 1}. ${score.string} (${score.user.username})`}</Typography>
                <Typography>{score.score}</Typography>
              </Stack>
            ))}
          </Stack>
        )}
        <Stack sx={{ mt: '40px !important' }} spacing={2}>
          <Button variant="contained" onClick={() => refetch()}>
            Refresh
          </Button>
          <Button variant="outlined" onClick={() => push(ROUTES.HOME)}>
            Back
          </Button>
        </Stack>
      </Stack>
    </CenteredCard>
  );
};

export default isAuth(ScoresPage);
