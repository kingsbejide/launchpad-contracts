import {
  Box,
  makeStyles,
  Typography,
  Theme,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import Link from 'next/link'
import LinksJson from '../../../common/components/LinksJson';
import WalletCopy from '../../../common/components/WalletCopy';

const useStyles = makeStyles((theme: Theme) => ({
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    justifyItems: 'center',
    background: '#F2F4F5',
    '& a': {
      textDecoration: 'none',
      color: `${theme.palette.text.secondary}`,
    },
  },
  mobile: {
    '& a': {
      textDecoration: 'none',
      color: `${theme.palette.text.secondary}`,
    },
  }
}));

const BottomBanner: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return matches ? (
    <Box className={classes.contentContainer}>
      <Box display='flex' justifyContent='center' paddingY={6}>
        {LinksJson.map((value) => (
          <Box
            key={value.title}
            display='flex'
            flexDirection='column'
            paddingX={10}
          >
            <Box marginBottom={1.5}>
              <Typography variant='subtitle2'>{value.title}</Typography>
            </Box>
            {value.items.map((elem) => (
              <Box key={elem.title} marginBottom={1.5}>
                <a href={elem.url}>
                  <Typography variant='body1'>{elem.title}</Typography>
                </a>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      <Box>
        <WalletCopy walletAddress="0xb0e1fc65c1a741b4662b813eb787d369b8614af1" walletImage="/favicon.png" walletSymbol="IF" />
      </Box>
      <Box m={2} display='flex' justifyContent='center' alignItems="center" paddingY={10}>
        <Box>
          <Typography variant='body2'>
            © {new Date().getFullYear()} Impossible.Finance{' '} 
          </Typography>
        </Box>
        <Box marginLeft={2} marginRight={2}>
          <Link href="/terms">
            <a><Typography variant='body1'>Terms</Typography></a>
          </Link>
        </Box>
        <div>|</div>
        <Box marginLeft={2} marginRight={2}>
          <Link href="/privacy">
            <a><Typography variant='body1'>Privacy Policy</Typography></a>
          </Link>
        </Box>
        <div>|</div>
        <Box marginLeft={2} marginRight={2}>
          <Link href="/cookie">
            <a><Typography variant='body1'>Cookie Policy</Typography></a>
          </Link>
        </Box>
      </Box>
    </Box>
  ) : (
    <Box justifyContent='center' paddingY={10}>
      <Box mb={4}>
        <WalletCopy walletAddress="0xb0e1fc65c1a741b4662b813eb787d369b8614af1" walletImage="/favicon.png" walletSymbol="IF" />
      </Box>
      <Box justifyContent='center'  display='flex' marginLeft={2} marginRight={2}>
        <Typography variant='body2'>
          © {new Date().getFullYear()} Impossible.Finance{' '} 
        </Typography>
      </Box>
      <Box justifyContent='center' alignItems="center" className={classes.mobile} display='flex'>
        <Box marginLeft={2} marginRight={2}>
          <Link href="/terms">
            <a><Typography variant='body1'>Terms</Typography></a>
          </Link>
        </Box>
        <div>|</div>
        <Box marginLeft={2} marginRight={2}>
          <Link href="/privacy">
            <a><Typography variant='body1'>Privacy Policy</Typography></a>
          </Link>
        </Box>
        <div>|</div>
        <Box marginLeft={2} marginRight={2}>
          <Link href="/cookie">
            <a><Typography variant='body1'>Cookie Policy</Typography></a>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default BottomBanner;
