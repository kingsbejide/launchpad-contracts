import {
  Box,
  Container,
  Grid,
  makeStyles,
  Theme,
  Typography,
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
    fontSize: '46px',
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
  return (
    <Box
      className={classes.contentContainer}
      paddingTop={16}
      paddingBottom={32}
    >
      <Container maxWidth='lg'>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='h1' align='center' className={classes.title}>
              Our Vision
            </Typography>
            <Box marginTop={4} paddingX={6}>
              <Typography
                variant='h1'
                align='center'
                className={classes.caption}
              >
                Level the playing field by building a <span>fair</span>, more{' '}
                <span>accessible</span> open financial system for all.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default VisionSection;
