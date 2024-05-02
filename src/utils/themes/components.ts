import { Components } from '@mui/material/styles/components';
import { Theme } from '@mui/material/styles/createTheme';
import MuiAppBar from '~/utils/themes/components/MuiAppBar';
import MuiButton from '~/utils/themes/components/MuiButton';
import MuiTextField from '~/utils/themes/components/MuiTextField';

const components: Components<Omit<Theme, 'components'>> = {
  MuiAppBar: MuiAppBar,
  MuiButton: MuiButton,
  MuiTextField: MuiTextField,
};

export default components;
