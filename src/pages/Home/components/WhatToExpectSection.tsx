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
    background: '#F2F4F5',
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
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h1' align='center' className={classes.title}>
            We understand what it takes
          </Typography>
          <Typography variant='h4' align='center' color='textSecondary'>
            Here’s what you can expect from Impossible
          </Typography>
          <Box marginTop={5} />
          <Box display='flex' flexWrap='wrap'>
            <InfoCard
              title='Secure'
              description='We understand that safety is paramount. From layered security systems to multiple audits, we take all possible steps to earn your trust.'
              icon='/images/secure.png'
              withShadow={false}
            />
            <InfoCard
              title='Liquid'
              description='We want you to be able to execute orders anytime effortlessly with minimum slippage. This means us building out the deepest liquidity pools.'
              icon='/images/liquidity2.png'
              withShadow={false}
            />
            <InfoCard
              title='Fast'
              description='Impossible employs best-in-class tech stacks and smart routing to ensure that you spend the least amount of waiting time.'
              icon='/images/fast.png'
              withShadow={false}
            />
            <InfoCard
              title='Low Fees'
              description='Inclusivity means accessibility, and that means low economic barriers aka low fees. By using efficient smart contracts, we make this happen!'
              icon='/images/lowfees.png'
              withShadow={false}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HowItWorksSection;
