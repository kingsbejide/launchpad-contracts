import { createMuiTheme } from '@material-ui/core/styles';
// import AcreRegular from './fonts/Acre-Regular.ttf';

// const acre = {
//   fontFamily: 'Acre',
//   fontStyle: 'normal',
//   fontDisplay: 'swap',
//   fontWeight: 400,
//   src: `
//     local('Acre'),
//     local('Acre-Regular'),
//     url(${AcreRegular}) format('ttf')
//   `,
//   unicodeRange:
//     'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
// };

const defaultTheme = createMuiTheme();
// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    fontFamily: 'Raleway, Arial',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      [defaultTheme.breakpoints.down('xs')]: {
        fontSize: '28px',
      },
    },
    h2: {
      fontSize: '2.125rem',
    },
    h3: {
      fontSize: '1.75rem',
    },
    h4: {
      fontSize: '1.5rem',
      [defaultTheme.breakpoints.down('xs')]: {
        fontSize: '18px',
      },
    },
    h5: {
      fontSize: '1.375rem',
    },
    h6: {
      fontSize: '1.125rem',
    },
    subtitle1: {
      fontSize: '1.125rem',
      fontWeight: 700,
    },
    subtitle2: {
      fontSize: '0.93rem',
      fontWeight: 900,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.87rem',
    },
    button: {
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem',
    },
  },
  // overrides: {
  //   MuiCssBaseline: {
  //     '@global': {
  //       '@font-face': [acre],
  //     },
  //   },
  // },
  palette: {
    background: {
      default: '#fff',
    },
    text: {
      primary: '#3B4346',
      secondary: '#616568',
      disabled: '#A6A8AA',
    },
  },
});

export default theme;
