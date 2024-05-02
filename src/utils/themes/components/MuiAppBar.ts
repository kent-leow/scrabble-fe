import { ComponentsProps } from '@mui/material/styles/props';
import { ComponentsOverrides } from '@mui/material/styles/overrides';
import { ComponentsVariants } from '@mui/material/styles/variants';
import { Theme } from '@mui/material/styles/createTheme';
import colors from '~/utils/themes/colors';

const MuiAppBar: {
  defaultProps?: ComponentsProps['MuiAppBar'];
  styleOverrides?: ComponentsOverrides<Theme>['MuiAppBar'];
  variants?: ComponentsVariants['MuiAppBar'];
} = {
  styleOverrides: {
    root: {
      background: colors.greyscale['900'],
    },
  },
};

export default MuiAppBar;
