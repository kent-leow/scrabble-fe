import { createTheme } from '@mui/material';
import palette from '~/utils/themes/palette';
import components from '~/utils/themes/components';
import typography from '~/utils/themes/typography';
import breakpoints from '~/utils/themes/breakpoints';

const theme = createTheme({
  spacing: 4,
  palette: palette,
  breakpoints: breakpoints,
  typography: typography,
  components: components,
});

export default theme;
