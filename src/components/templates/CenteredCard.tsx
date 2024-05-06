import { Card, CardContent, Stack } from '@mui/material';
import { FC, ReactNode } from 'react';

interface CenteredCardProps {
  children: ReactNode;
}

const CenteredCard: FC<CenteredCardProps> = ({ children }) => {
  return (
    <Stack alignItems="center" justifyContent="center" flexGrow={1} margin={20}>
      <Card variant="outlined" sx={{ p: 2 }}>
        <CardContent>{children}</CardContent>
      </Card>
    </Stack>
  );
};

export default CenteredCard;
