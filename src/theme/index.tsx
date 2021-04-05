import { createMuiTheme } from '@material-ui/core/styles';
import AcreRegular from './fonts/Acre-Regular.ttf';
import AcreMedium from './fonts/Acre-Medium.ttf';
import AcreBold from './fonts/Acre-Bold.ttf';
import AcreExtrabold from './fonts/Acre-Extrabold.ttf';
import ArcaMajoraBold from './fonts/ArcaMajora3-Bold.woff';
import ArcaMajoraHeavy from './fonts/ArcaMajora3-Heavy.woff';

const acreFontsList = [
  { fontWeight: 400, file: AcreRegular },
  { fontWeight: 500, file: AcreMedium },
  { fontWeight: 700, file: AcreBold },
  { fontWeight: 900, file: AcreExtrabold },
];

const arcaMajoraList = [
  { fontWeight: 700, file: ArcaMajoraBold },
  { fontWeight: 900, file: ArcaMajoraHeavy },
];

const acreFonts = acreFontsList.map((font) => ({
  fontFamily: 'Acre',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: font.fontWeight,
  src: `
    url(${font.file})
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
}));

const acraMajoraFonts = arcaMajoraList.map((font) => ({
  fontFamily: '"Arca Majora 3"',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: font.fontWeight,
  src: `
    url(${font.file}) format('woff')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
}));

const defaultTheme = createMuiTheme();
// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    fontFamily: 'Acre, "Arca Majora 3"',
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
      fontFamily: '"Arca Majora 3"',
    },
    subtitle2: {
      fontSize: '0.93rem',
      fontWeight: 900,
      fontFamily: '"Arca Majora 3"',
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
  overrides: {
    MuiCssBaseline: {
      '@global': {
        // eslint:disable-next-line
        '@font-face': [...acreFonts, ...acraMajoraFonts],
      },
    },
  },
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
