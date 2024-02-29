import { Button as ButtonMui, ButtonProps, createTheme, styled } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { ButtonDefaultProps } from "./types";

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
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
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
});

const Button = styled(ButtonMui)<ButtonProps>(() => ({
  fontFamily: 'Nunito',
}))

export const ButtonDefault = (props: ButtonDefaultProps) => {
  const {
    text: text,
    color: color = 'default',
    ...rest
  } = props;

  return (
    <ThemeProvider theme={theme}>
      <Button color={color} {...rest}>
        {text}
      </Button>
    </ThemeProvider>
  );
}