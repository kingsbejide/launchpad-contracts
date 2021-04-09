import { Box, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import GradientButton from '../../../common/components/GradientButton';
import Navigation from './Navigation';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundImage: 'url(/images/background/Banner.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
    [theme.breakpoints.down('md')]: {
      backgroundImage: 'url(/images/background/Banner_mobile.svg)',
    },
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '80vh',
  },
  title: {
    color: 'white',
    fontSize: '72px',
    fontWeight: 700,
    '& span': {
      color: '#FF0EA9',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '34px',
    },
  },
  subtitle: {
    fontSize: '20px',
    color: 'white',
    [theme.breakpoints.down('xs')]: {
      fontSize: '15px',
    },
  },
  button: {
    width: '300px',
    height: '52px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}));

const BannerSection: React.FC = () => {
  const classes = useStyles();
  const navigateToSwap = () => {
    window.open('https://swap.impossible.finance/');
  };
  return (
    <Box className={classes.container}>
      <Navigation />
      <Box className={classes.contentContainer}>
        <Grid container>
          <Grid item md={1} />
          <Grid item xs={12} md={12} lg={7}>
            <Box paddingX={4}>
              <Typography variant='h1' className={classes.title}>
                Inclusive financial instruments via <span>DeFi</span>
              </Typography>
              <Typography variant='inherit' className={classes.subtitle}>
                Impossible Finance uses decentralised financial protocols to
                give everyone the same access to financial products, which were
                previously only available to institutions and select individuals
              </Typography>
              <Box marginTop={4} />
              <GradientButton
                className={classes.button}
                onClick={navigateToSwap}
              >
                Launch App
              </GradientButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default BannerSection;
