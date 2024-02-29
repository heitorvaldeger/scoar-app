import { ThemeProvider } from "@emotion/react";
import { createTheme, TextField } from "@mui/material";

import { InputDefaultPropsType } from './types';

declare module '@mui/material/styles' {
  interface Palette {
    default: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    default?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    default: true;
  }
}

const theme = createTheme({
  palette: {
    default: {
      main: '#121212',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: 'Nunito'
  }
});

export const InputDefault = (props: InputDefaultPropsType) => {
  const {
    color: color = 'default',
    ...rest
  } = props;

  return (
    <ThemeProvider theme={theme}>
      <TextField
        color={color}
        {...rest}
      />
    </ThemeProvider>
  );
}
