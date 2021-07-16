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
  href: {
    fontWeight: 700,
    color: '#0074FF',
  },
  infoCardContainer: {
    float: 'left',
  },
}));

const HowItWorksSection: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('xs'));
  return (
    <Box className={classes.contentContainer} paddingY={8}>
      <Container maxWidth='lg' className={classes.container}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='h1' align='center' className={classes.title}>
              Impossible is redefining the Launchpad experience
            </Typography>
            <Typography variant='h4' align='center' color='textSecondary'>
              Here’s how we’re making it better
            </Typography>
            <Box marginTop={5} />
            <Box>
              <Box
                display='flex'
                flexWrap={'wrap'}
                className={classes.infoCardContainer}
                paddingLeft={3}
              >
                <InfoCard
                  title='Curated Projects'
                  description='Get access to top projects’ IDOs across many sectors such as DeFi, DEXes, NFTs, and infrastructure via our Impossible Launchpad.'
                  icon='/images/icon_curated.svg'
                  withShadow={false}
                  iconWidth={120}
                />
                <InfoCard
                  title='Fair'
                  description='No more jumping through endless hoops to get tiny allocations. We believe in a fair sale and equal rights for all users, big or small'
                  icon='/images/icon_faire.svg'
                  withShadow={false}
                  iconWidth={120}
                />
                <InfoCard
                  title='Seamless Decentralization'
                  description="Enjoy a fluid, hassle-free sale experience - we've taken the best user flows and built it on top of decentralized architecture (even identity verification)"
                  icon='/images/icon_seamless.svg'
                  withShadow={false}
                  iconWidth={120}
                />
                <Box marginRight={4} />
              </Box>
            </Box>

            <Box marginTop={5} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWorksSection;
