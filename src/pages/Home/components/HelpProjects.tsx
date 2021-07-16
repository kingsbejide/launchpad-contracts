import {
  Box,
  Grid,
  makeStyles,
  Container,
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
  container: {
    padding: 0,
  },
  title: {
    fontWeight: 800,
  },
}));

const HowItWorksSection: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('xs'));
  return (
    <Box
      className={classes.contentContainer}
      paddingY={8}
      paddingX={matches ? 2 : 8}
    >
      <Container maxWidth='lg' className={classes.container}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='h1' align='center' className={classes.title}>
              Projects are our users too
            </Typography>
            <Typography variant='h4' align='center' color='textSecondary'>
              Here’s how we want to help projects
            </Typography>
            <Box marginTop={5} />
            <Box display='flex' flexWrap='wrap'>
              <InfoCard
                title='Incubate'
                description='With our B2D (business to developers) model, we incubate projects at any stage of development by offering value add not limited to: tokenomics advisory, marketing, auditing '
                icon='/images/icon_incubate.svg'
                withShadow={false}
                iconWidth={120}
              />
              <InfoCard
                title='Raise smarter'
                description='Launch to engaged, targeted audiences via our whitelisting and launchpad staking mechanisms.'
                icon='/images/icon_smart.svg'
                withShadow={false}
                iconWidth={120}
              />
              <InfoCard
                title='Scale'
                description='We help projects expand their user bases and widen their product offerings to the multichain world.'
                icon='/images/icon_scale.svg'
                withShadow={false}
                iconWidth={120}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWorksSection;
