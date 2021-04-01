import { Box, makeStyles, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  itemTitle: {
    background: 'linear-gradient(to bottom, transparent 50%, #00FFB9 50%)',
    width: 'fit-content',
  },
  line: {
    background: '#E5E5E5',
    width: '100vw',
    margin: 'auto',
    top: 0,
    bottom: 0,
    marginLeft: '-30px',
  },
  circle: {
    background: '#FFE000',
    width: '34px',
    height: '34px',
    borderRadius: '50%',
  },
  verticalLine: {
    background: '#FFE000',
    width: '2px',
    height: '60px',
    marginBottom: '6px',
  },
}));

const DesktopRoadMap: React.FC = () => {
  const classes = useStyles();
  return (
    <Box marginY={5} position='relative'>
      <Box display='flex'>
        <Box
          display='flex'
          flex={1}
          flexDirection='column'
          justifyContent='flex-end'
          marginBottom='-43px'
        >
          <Box
            position='absolute'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <Box className={classes.verticalLine}></Box>
            <Box className={classes.circle}></Box>
            <Typography variant='subtitle2' color='textPrimary'>
              April 2021
            </Typography>
          </Box>
          <Box paddingX={8} marginBottom={13}>
            <Typography
              variant='subtitle2'
              color='textPrimary'
              className={classes.itemTitle}
            >
              DeFi Swap Stack
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              The foundation from which all other Impossible products and
              liquidity will be built upon. The swap, liquidity and staking
              modules are industry-proven products that align with what we want
              to do. Users can expect a variety of staking pools and rewards as
              we continue to improve liquidity.
            </Typography>
          </Box>
        </Box>
        <Box display='flex' flex={1} />
        <Box
          display='flex'
          flex={1}
          flexDirection='column'
          marginBottom='-43px'
          position='relative'
        >
          <Box
            position='absolute'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            bottom='0'
          >
            <Box className={classes.verticalLine}></Box>
            <Box className={classes.circle}></Box>
            <Typography variant='subtitle2' color='textPrimary'>
              2021 to 2022
            </Typography>
          </Box>
          <Box paddingX={8} marginBottom={13}>
            <Typography
              variant='subtitle2'
              color='textPrimary'
              className={classes.itemTitle}
            >
              True Interoperability
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              This is the stuff of dreams that skeptics would call impossible.
              We realize that interoperability has remained largely a buzzword
              due to the constantly evolving landscape, community consensus and
              tech stack maturity. However, we believe the time is ripe. This is
              something close to our hearts, as the only way to build a more
              accessible future is to be all inclusive. We look forward to
              bringing to our users cross-asset/chain/wallet swaps, liquidity
              and staking.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box width='100%' height='8px' className={classes.line}></Box>
      <Box display='flex'>
        <Box display='flex' flex={1} />
        <Box display='flex' flex={1} flexDirection='column' marginTop='-43px'>
          <Box
            position='absolute'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <Typography variant='subtitle2' color='textPrimary'>
              Q2 2021
            </Typography>
            <Box className={classes.circle}></Box>
            <Box className={classes.verticalLine}></Box>
          </Box>
          <Box paddingX={8} paddingTop={13}>
            <Typography
              variant='subtitle2'
              color='textPrimary'
              className={classes.itemTitle}
            >
              Self-Sustaining Initial DeFi
            </Typography>
            <Typography
              variant='subtitle2'
              color='textPrimary'
              className={classes.itemTitle}
            >
              Offering (ssIDO)
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              This is where our ideas branch off from most DeFi projects. By
              having sale conditions, token distribution and funds raised
              governed by smart contracts, we will be bringing unprecedented
              levels of transparency, immutability and trust to project
              fundraising. Also by inviting projects to perform treasury
              management by staking with us, they will be operating on a "raise
              once, build forever" model. This allows them to plug into our
              retail liquidity ecosystem, providing bilateral synergies to users
              and projects.
            </Typography>
          </Box>
        </Box>
        <Box display='flex' flex={1} />
      </Box>
    </Box>
  );
};

export default DesktopRoadMap;
