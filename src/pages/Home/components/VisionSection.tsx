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
  },
  title: {
    fontWeight: 800,
  },
  caption: {
    fontWeight: 800,
    fontSize: '42px',
    color: '#A6A8AA',
    '& span': {
      color: theme.palette.text.secondary,
      background: 'linear-gradient(to bottom, transparent 70%, #00FFB9 30%)',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '24px',
    },
  },
}));

const VisionSection: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const quoteWidth = matches ? 50 : 60;
  const quoteHeight = matches ? 39 : 47;
  return (
    <Box
      className={classes.contentContainer}
      paddingTop={16}
      paddingBottom={32}
    >
      <Container maxWidth='md'>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='h1' align='center' className={classes.title}>
              Our Vision
            </Typography>
            <Box marginTop={6} paddingX={6} position='relative'>
              <Typography
                variant='h1'
                align='center'
                className={classes.caption}
              >
                <Box
                  display={matches ? 'flex' : 'inline-block'}
                  position={matches ? 'initial' : 'absolute'}
                  justifyContent='flex-start'
                  marginLeft={matches ? 0 : `-${quoteWidth + 30}px`}
                  marginTop={matches ? 0 : -2}
                >
                  <img
                    src='/images/quote-left.png'
                    alt='quote'
                    width={quoteWidth}
                    height={quoteHeight}
                  />
                </Box>
                Level the playing field
                <br /> by building a <span>fair</span>, more{' '}
                <span>accessible</span> open financial system for all.
                <Box
                  display={matches ? 'flex' : 'inline-block'}
                  position={matches ? 'initial' : 'absolute'}
                  justifyContent='flex-end'
                  marginLeft={5}
                  marginTop={2}
                >
                  <img
                    src='/images/quote-right.png'
                    alt='quote'
                    width={quoteWidth}
                    height={quoteHeight}
                  />
                </Box>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default VisionSection;
