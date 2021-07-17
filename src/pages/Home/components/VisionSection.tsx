import {
  Box,
  Container,
  Grid,
  makeStyles,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    justifyItems: 'center',
    backgroundImage: 'url(/images/bg_ourvision.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
    [theme.breakpoints.down('md')]: {
      backgroundImage: 'url(/images/bg_ourvision.svg)',
    },
    color: '#FFFFFF',
    textShadow: "0px 0px 30px #09C490",
  },
  title: {
    fontWeight: 800,
  },
  caption: {
    fontWeight: 700,
    fontSize: '42px',
    color: '#FFFFFF',
    [theme.breakpoints.down('xs')]: {
      fontSize: '24px',
    },
  },
  impImage: {
    '& img': {
      width: 650,
      [theme.breakpoints.down('sm')]: {
        width: 360,
      },
      height: "auto",
    }
  },
  whiteLine: {
    background: 'white',
    height: 2,
    marginTop: 120,
    [theme.breakpoints.down('sm')]: {
      marginTop: 24,
    },
    width: "80%"
  }
}));

const VisionSection: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      className={classes.contentContainer}
      paddingTop={8}
      paddingBottom={8}
      marginTop={8}
      marginBottom={8}
    >
      <Container maxWidth='lg'>
        <Grid container>
          <Grid item lg={6} md={6} xs={12}>
            <Typography variant='h1' align='left' className={classes.title}>
              Our Vision
            </Typography>
            <Box marginTop={6} position='relative'>
              <Typography
                variant='h1'
                className={classes.caption}
              >
                Level the playing field
                <br /> by building a <span>fair</span>, more{' '}
                <span>accessible</span> open financial system for all.
              </Typography>
            </Box>
            <Box className={classes.whiteLine}></Box>
          </Grid>
          {!matches && 
          <Grid item lg={6} md={6} xs={12}>
            <Box
              display='inline-block'
              position='absolute'
              justifyContent='flex-end'
              marginTop="-188px"
              className={classes.impImage}
            >
              <img
                src='/images/IMpossible.svg'
                alt='quote'
              />
            </Box>
          </Grid>
          }
        </Grid>
      </Container>
    </Box>
  );
};

export default VisionSection;
