import { Typography } from '@mui/material';
import { FC, ReactNode, useMemo } from 'react';

interface PasswordHelperTextProps {
  tester: (password: string) => boolean;
  value: string;
  children: ReactNode;
}

const PasswordHelperText: FC<PasswordHelperTextProps> = ({
  tester,
  value,
  children,
}) => {
  const valid = useMemo(() => tester(value), [value, tester]);

  return (
    <Typography
      variant="body2"
      sx={{
        color: valid ? 'green' : 'inherit',
      }}
    >
      {valid ? <span>&#x2714;</span> : <span>&#10060;</span>}&nbsp;&nbsp;
      {children}
    </Typography>
  );
};

export default PasswordHelperText;
