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
    fontWeight: 800,
    fontSize: '42px',
    color: '#FFFFFF',
    [theme.breakpoints.down('xs')]: {
      fontSize: '24px',
    },
  },
  impImage: {
    '& img': {
      maxWidth: '80%',
      width: "auto",
      height: "auto",
    }
  }
}));

const VisionSection: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const quoteWidth = matches ? 350 : 860;
  const quoteHeight = matches ? 339 : 747;
  return (
    <Box
      className={classes.contentContainer}
      paddingTop={8}
      paddingBottom={matches ? 5 : 24}
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
                // align='center'
                className={classes.caption}
              >
                Level the playing field
                <br /> by building a <span>fair</span>, more{' '}
                <span>accessible</span> open financial system for all.
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <Box
              display={matches ? 'flex' : 'inline-block'}
              position={matches ? 'initial' : 'absolute'}
              justifyContent='flex-end'
              // marginLeft={5}
              marginTop={matches ? 0 : "-10vh"}
              className={classes.impImage}
            >
              <img
                src='/images/IMpossible.svg'
                alt='quote'
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default VisionSection;
