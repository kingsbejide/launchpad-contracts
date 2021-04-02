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
import DesktopRoadMap from './DesktopRoadMap';
import MobileRoadMap from './MobileRoadMap';

const useStyles = makeStyles((theme: Theme) => ({
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    justifyItems: 'center',
    background: 'url(/images/background/Roadmap.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    overflow: 'hidden',
    minHeight: '100vh',
    backgroundPosition: 'center',
  },
  title: {
    fontWeight: 800,
  },
}));

const BannerSection: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Box className={classes.contentContainer} paddingY={8} paddingX={2}>
      <Container maxWidth='lg'>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='h1' align='center' className={classes.title}>
              We're building the Impossible
            </Typography>
            <Typography variant='h4' align='center' color='textSecondary'>
              Here's what we planned for our roadmap
            </Typography>
            <Box marginTop={5} />
          </Grid>
        </Grid>
        {matches ? <DesktopRoadMap /> : <MobileRoadMap />}
      </Container>
    </Box>
  );
};

export default BannerSection;
