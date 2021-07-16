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
import Carousel from 'react-material-ui-carousel'
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
  href: {
    fontWeight: 700,
    color: '#0074FF',
  },
}));

const PARTNERS = ["Alameda", "Bitscale", "BRCAPITAL", "CMS", "Coin98_Ventures", "d1", "Daedalus", "divergence", "GBV", "Hashed", "Incuba_Alpha", "IOSG", "LAO", "lego", "lemniscap", 
  "LongHashVentures", "Maple Leaf", "mgnr", "Primitive", "SANCTOR", "Sino", "Ternary", "true",
]

const PartnersInvestorsSection: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  let CAROUSEL_PAGES = []
  let tempPage = []
  for (let i = 0; i < PARTNERS.length; i++) {
    tempPage.push(PARTNERS[i]) 
    if (tempPage.length == 12) {
      CAROUSEL_PAGES.push(tempPage)
      tempPage = []
    }
  }
  if (tempPage.length > 0) {
    CAROUSEL_PAGES.push(tempPage)
  }

  return (
    <Box className={classes.contentContainer} paddingY={8}>
      <Container maxWidth='lg'>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='h1' align='center' className={classes.title}>
              Investors
            </Typography>
            <Typography variant='h4' align='center' color='textSecondary'>
              Here's a few partners that are contributing to the Impossible Ecosystem
            </Typography>
            <Carousel
              animation="slide"
              autoPlay={false}
            >
              {CAROUSEL_PAGES.map(item => {
                return <Box
                display='grid'
                gridTemplateColumns={`repeat(${matches ? 4 : 2}, 1fr)`}
                gridGap='40px'
                gridRowGap='50px'
                marginTop={8}
              >
                {item
                  .map(src => (
                    <Box
                      display='flex'
                      alignItems='center'
                      justifyContent='center'
                    >
                      <img
                        src={`/images/investors/${src}.png`}
                        alt=''
                        width='60%'
                      />
                    </Box>
                  ))}
              </Box>
              })}

            </Carousel>
            

            <Box marginTop={5} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PartnersInvestorsSection;
