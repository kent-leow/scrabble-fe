import { Card, CardContent, Stack } from '@mui/material';
import { FC, ReactNode } from 'react';
import LoadingBackdrop from '~/components/molecules/LoadingBackdrop';

interface CenteredCardProps {
  children: ReactNode;
  loading?: boolean;
}

const CenteredCard: FC<CenteredCardProps> = ({ loading = false, children }) => {
  return (
    <Stack alignItems="center" justifyContent="center" flexGrow={1} margin={20}>
      <Card variant="outlined" sx={{ p: 2 }}>
        <CardContent>{children}</CardContent>
      </Card>
      <LoadingBackdrop open={loading} />
    </Stack>
  );
};

export default CenteredCard;
