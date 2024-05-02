import { ComponentsProps } from '@mui/material/styles/props';
import { ComponentsOverrides } from '@mui/material/styles/overrides';
import { ComponentsVariants } from '@mui/material/styles/variants';
import { Theme } from '@mui/material/styles/createTheme';
import colors from '~/utils/themes/colors';
import typography from '~/utils/themes/typography';

const MuiTextField: {
  defaultProps?: ComponentsProps['MuiTextField'];
  styleOverrides?: ComponentsOverrides<Theme>['MuiTextField'];
  variants?: ComponentsVariants['MuiTextField'];
} = {
  variants: [
    {
      props: { variant: 'outlined' },
      style: {
        '&.outlined-alpha': {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            padding: '12px 16px',
            '& fieldset': {
              borderColor: colors.greyscale['200'],
            },
            '&.Mui-error fieldset': {
              borderColor: `${colors.semanticRed['400']} !important`,
            },
            '&.Mui-focused:not(.Mui-disabled) fieldset': {
              borderColor: colors.greyscale['900'],
            },
            '&.Mui-disabled fieldset': {
              borderColor: colors.greyscale['200'],
            },
            '&:hover:not(.Mui-disabled) fieldset': {
              borderColor: colors.greyscale['900'],
            },
            '& input, & .MuiSelect-select': {
              padding: 0,
              height: '24px',
              ...typography.body400,
            },
          },
        },
      },
    },
  ],
};

export default MuiTextField;
