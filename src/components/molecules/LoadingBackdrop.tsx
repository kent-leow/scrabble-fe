import { Backdrop, CircularProgress } from '@mui/material';
import { FC, useEffect, useState } from 'react';

interface LoadingBackdropProps {
  open: boolean;
}

const LoadingBackdrop: FC<LoadingBackdropProps> = ({ open }) => {
  const [backdropOpen, setBackdropOpen] = useState(open);

  useEffect(() => {
    setBackdropOpen(open);
  }, [open]);

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={backdropOpen}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingBackdrop;
