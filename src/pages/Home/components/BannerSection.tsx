import { Box, Grid, makeStyles, Theme, Typography, Button, useMediaQuery, useTheme } from '@material-ui/core';
import Navigation from './Navigation';

const useStyles = makeStyles((theme: Theme) => ({
  mainContainer: {
    height: 640,
    [theme.breakpoints.down('sm')]: {
      height: 600,
    },
    [theme.breakpoints.down('md')]: {
      background: 'url(/images/bg_mobile.png)',
      backgroundSize: 'cover',
    },
    background: 'none',
  },
  videoContainer: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    '& video': {
      objectFit: "fill",
      width: "100%",
    },
  },
  container: {
    zIndex: 3,
    position: "absolute",
    width: "100%",
  },
  textContainer: {
    zIndex: 5,
  },
  iconContainer: {
    [theme.breakpoints.down('sm')]: {
      zIndex: 0,
      position: "absolute",
      right: "2vh",
      bottom: "-2vh",
      '& img': {
        width: 250,
      }
    },
    [theme.breakpoints.down('xs')]: {
      zIndex: 0,
      position: "absolute",
      right: "5vw",
      bottom: "-150px",
      '& img': {
        width: 150,
      }
    },
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 64,
    [theme.breakpoints.down('sm')]: {
      marginTop: 24,
    },
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
  cover: {
    width: 151,
  },
  button: {
    width: '300px',
    height: '52px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    padding: '16px',
    background: 'white',
    fontSize: 18,
    boxShadow: "0px 4px 50px rgba(0, 0, 0, 0.09)",
    borderRadius: 12,
    color: "616568",
    '&:hover': {
      background: 'white',
    },
  },
}));

const BannerSection: React.FC = () => {
  const classes = useStyles();
  const navigateToInvest = () => {
    window.open(process.env.NEXT_PUBLIC_INVEST_DOMAIN);
  };
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.videoContainer}>
        {!matches &&
          <video autoPlay loop muted height={640}>
            <source src={'/videos/landing_bg.mp4'} type='video/mp4' />
          </video>
        }
      </Box>
      <Box className={classes.container}>
        <Navigation />
        <Box className={classes.contentContainer}>
          <Grid container >
            <Grid item md={1} />
            <Grid item sm={12} md={7} lg={7} className={classes.textContainer}>
              <Box paddingX={4}>
                <Typography variant='h1' className={classes.title}>
                  Reimagining Decentralized Finance
                </Typography>
                <Typography variant='inherit' className={classes.subtitle}>
                  Impossible Finance is a multi-chain incubator, launchpad,
                  and swap platform which offers a robust product-first ecosystem that
                  supports top-tier blockchain projects to targeted user audiences.
                </Typography>
                <Box marginTop={4} />
                <Button
                  className={classes.button}
                  onClick={navigateToInvest}
                >
                  Launch App
                </Button>
              </Box>
            </Grid>
            <Grid item sm={12} md={4} lg={4} className={classes.iconContainer}>
              <Box
                marginTop={2}
                display='flex'
                justifyContent='center'
                alignItems='center'
              >
                <img
                  src={"/images/F_outline.svg"}
                  alt='outline'
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default BannerSection;
