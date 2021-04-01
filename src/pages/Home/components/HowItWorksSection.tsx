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
              DeFi made impossibly easy
            </Typography>
            <Typography variant='h4' align='center' color='textSecondary'>
              Here’s how it works
            </Typography>
            <Box marginTop={5} />
            <Box overflow='auto'>
              <Box
                display='flex'
                flexWrap={matches ? 'nowrap' : 'wrap'}
                className={classes.infoCardContainer}
                paddingLeft={3}
              >
                <InfoCard
                  title='Swap'
                  description='Bye bye complicated interfaces. You have token A and want B? 
                  Select, click, confirm, that’s it.'
                  icon='/images/trade.png'
                />
                <InfoCard
                  title='Add Liquidity'
                  description='Earn fees by adding say tokens A and B. Anyone who swaps between them pays you a fee.*'
                  icon='/images/liquidity.png'
                />
                <InfoCard
                  title='Stake to get Rewards'
                  description='Show proof of liquidity (staking) to supercharge earnings in the form of IF token rewards.'
                  icon='/images/earn2.png'
                />
                <Box marginRight={4} />
              </Box>
            </Box>

            <Box marginTop={5} />
            <Box justifyContent='center' alignItems='center'>
              <Typography
                variant='body1'
                className={classes.href}
                align='center'
              >
                Make your first swap <img src='/images/Arrow.svg' />
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWorksSection;
