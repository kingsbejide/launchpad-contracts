import {
  Box,
  Grid,
  makeStyles,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React from 'react';
import InfoCard from '../../../common/components/InfoCard';

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
}));

const BannerSection: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('xs'));
  return (
    <Box
      className={classes.contentContainer}
      paddingY={8}
      paddingX={matches ? 2 : 8}
    >
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
    </Box>
  );
};

export default BannerSection;
