import { ThemeOptions } from '@mui/material';
import { grey } from '@mui/material/colors';

export const theme: ThemeOptions = {
  spacing: 4,

  palette: {
    text: {
      primary: 'rgba(0, 0, 0, 0.70)',
    },

    background: {
      default: grey[100],
    },

    primary: {
      light: '#ffffff',
      main: '#1976d2',
    },

    secondary: {
      light: '#ffa040',
      main: '#ff6f00',
      dark: '#c43e00',
      contrastText: '#fafafa',
    },
  },

  typography: {
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",

    h1: {
      fontSize: '2rem',
    },

    h2: {
      fontSize: '1.3rem',
      fontWeight: 400,
    },

    h3: {
      fontSize: '1.1rem',
    },

    h4: {
      fontSize: '1.06rem',
    },

    h5: {
      fontSize: '1.03rem',
    },

    h6: {
      fontSize: '1rem',
    },

    body1: {
      fontSize: '0.9rem',
    },

    body2: {
      fontSize: '0.8rem',
    },

    button: {
      textTransform: 'none',
    },
  },

  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
    },
  },
};
