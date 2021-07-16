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
    marginBottom: 8,
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
              We’re constantly pushing the envelope for DeFi
            </Typography>
            <Typography variant='h4' align='center' color='textSecondary'>
              Here’s what you can expect from Impossible
            </Typography>
            <Box marginTop={5} />
            <Box display='flex' flexWrap='wrap'>
              <InfoCard
                title='Security'
                description='Safety is paramount in defi. From layered security checks, composable code, and multiple audits and bug bounty programs, we take all possible precautions to earn users’ trust.'
                icon='/images/secure.svg'
                withShadow={false}
                iconWidth={120}
              />
              <InfoCard
                title='Easy Execution'
                description='Enjoy high capital efficiency, minimal slippage and low fees with our xybk liquidity pool design to ensure best-in-class pricing to swap anything, anytime.'
                icon='/images/icon_easy.svg'
                withShadow={false}
                iconWidth={120}
              />
              <InfoCard
                title='Low Fees'
                description='We make DeFi more accessible and inclusive by prioritizing low fees and gas-efficient smart contracts in our technical architecture design.'
                icon='/images/icon_lowfees.svg'
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
