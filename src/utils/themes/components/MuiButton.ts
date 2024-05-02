import { ComponentsProps } from '@mui/material/styles/props';
import { ComponentsOverrides } from '@mui/material/styles/overrides';
import { ComponentsVariants } from '@mui/material/styles/variants';
import { Theme } from '@mui/material/styles/createTheme';
import colors from '~/utils/themes/colors';
import typography from '~/utils/themes/typography';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}

const MuiButton: {
  defaultProps?: ComponentsProps['MuiButton'];
  styleOverrides?: ComponentsOverrides<Theme>['MuiButton'];
  variants?: ComponentsVariants['MuiButton'];
} = {
  styleOverrides: {
    root: {
      ...typography.body600,
      textTransform: 'none',
      minWidth: 'auto',
      whiteSpace: 'nowrap',
      color: colors.greyscale['900'],
    },
  },
  variants: [
    {
      props: { variant: 'contained' },
      style: {
        borderColor: colors.greyscale['900'],
        borderRadius: '1.75rem',
        backgroundColor: colors.greyscale['900'],
        color: colors.greyscale['0'],
        '&:hover': {
          color: colors.greyscale['0'],
          backgroundColor: colors.greyscale['900'],
          borderColor: colors.greyscale['900'],
        },
      },
    },
    {
      props: { variant: 'outlined' },
      style: {
        borderColor: colors.greyscale['900'],
        borderRadius: '1.75rem',
        '&:hover': {
          borderColor: colors.greyscale['900'],
        },
      },
    },
    {
      props: { variant: 'text' },
      style: {
        borderRadius: '1.75rem',
      },
    },
    {
      props: { variant: 'dashed' },
      style: {
        ...typography.body600,
        color: colors.greyscale['0'],
        borderRadius: '0',
        padding: '0 0.25rem',
        backgroundColor: 'transparent',
        backgroundImage: `linear-gradient(to right, ${colors.pink['600']} 50%, rgba(255,255,255,0) 0%)`,
        backgroundPosition: 'bottom',
        backgroundSize: '0.5rem 0.25rem',
        backgroundRepeat: 'repeat-x',
        // borderBottom: `0.25rem dashed ${colors.pink['600']}`,
        '&:hover': {},
      },
    },
  ],
};

export default MuiButton;
