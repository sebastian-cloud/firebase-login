import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    forBackground: Palette['primary'],
    dark: Palette['primary'],
    third: Palette['primary'],
  }
  interface PaletteOptions {
    forBackground: PaletteOptions['primary'],
    dark: PaletteOptions['primary'],
    third: PaletteOptions['primary'],
  }
}

// Create a theme instance.
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#FF597B',
      contrastText: '#EEEEEE'
    },
    secondary: {
      main: '#524A4E',
      contrastText: '#EEEEEE'
    },
    dark: {
      main: '#EEEEEE',
      contrastText: '#524A4E'
    },
    third: {
      main: 'F9B5D0',
      contrastText: '#524A4E'
    },
    forBackground: {
      main: '#EEEEEE'
    },
  },
});


export default customTheme;