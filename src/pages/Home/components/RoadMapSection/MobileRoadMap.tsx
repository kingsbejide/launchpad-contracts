import { Box, makeStyles, Theme, Typography } from '@material-ui/core';

const userMobileStyles = makeStyles((theme: Theme) => ({
  itemTitle: {
    background: 'linear-gradient(to bottom, transparent 50%, #00FFB9 50%)',
    width: 'fit-content',
  },
  roadMapContainer: {
    borderLeft: 'solid 6px #E5E5E5',
  },
  circle: {
    background: '#FFE000',
    width: '34px',
    height: '34px',
    borderRadius: '50%',
  },
  horizontalLine: {
    background: '#FFE000',
    width: '60px',
    height: '3px',
    marginLeft: '5px',
  },
}));

type MobileRoadMapItemProps = {
  date: string;
  title: string[];
  detail: string;
};

const MobileRoadMapItem: React.FC<MobileRoadMapItemProps> = ({
  date,
  title,
  detail,
}) => {
  const classes = userMobileStyles();
  return (
    <Box position='relative' marginBottom={8}>
      <Box
        display='flex'
        flexDirection='row'
        alignItems='center'
        marginLeft='-35px'
      >
        <Box className={classes.circle} />
        <Box className={classes.horizontalLine} />
      </Box>
      <Box marginTop={-1}>
        <Typography variant='subtitle2' color='textPrimary'>
          {date}
        </Typography>
        <Box marginTop={2} />
        {title.map((value) => (
          <Typography
            key={value}
            variant='subtitle2'
            color='textPrimary'
            className={classes.itemTitle}
          >
            {value}
          </Typography>
        ))}
        <Typography variant='body2' color='textSecondary'>
          {detail}
        </Typography>
      </Box>
    </Box>
  );
};

const MobileRoadMap: React.FC = () => {
  const classes = userMobileStyles();
  return (
    <Box
      display='flex'
      flexDirection='column'
      className={classes.roadMapContainer}
      paddingLeft={2}
      paddingY={3}
    >
      <MobileRoadMapItem
        date='April 2021'
        title={['DeFi Swap Stack']}
        detail='The foundation from which all other Impossible products and
              liquidity will be built upon. The swap, liquidity and staking
              modules are industry-proven products that align with what we want
              to do. Users can expect a variety of staking pools and rewards as
              we continue to improve liquidity.'
      />
      <MobileRoadMapItem
        date='Q2 2021'
        title={['Self-Sustaining Initial DeFi', 'Offering (ssIDO)']}
        detail='This is where our ideas branch off from most DeFi projects. By
          having sale conditions, token distribution and funds raised
          governed by smart contracts, we will be bringing unprecedented
          levels of transparency, immutability and trust to project
          fundraising. Also by inviting projects to perform treasury
          management by staking with us, they will be operating on a "raise
          once, build forever" model. This allows them to plug into our
          retail liquidity ecosystem, providing bilateral synergies to users
          and projects.'
      />
      <MobileRoadMapItem
        date='2021 to 2022'
        title={['True Interoperability']}
        detail='This is the stuff of dreams that skeptics would call impossible.
          We realize that interoperability has remained largely a buzzword
          due to the constantly evolving landscape, community consensus and
          tech stack maturity. However, we believe the time is ripe. This is
          something close to our hearts, as the only way to build a more
          accessible future is to be all inclusive. We look forward to
          bringing to our users cross-asset/chain/wallet swaps, liquidity
          and staking.'
      />
    </Box>
  );
};

export default MobileRoadMap;
