import { PaletteOptions } from '@mui/material/styles/createPalette';
import colors from '~/utils/themes/colors';

const palette: PaletteOptions = {
  primary: colors.forestGreen,
  secondary: colors.pink,
  grey: colors.greyscale,
  success: colors.semanticGreen,
  error: colors.semanticRed,
  warning: colors.semanticYellow,
  info: colors.semanticBlue,
};

export default palette;
