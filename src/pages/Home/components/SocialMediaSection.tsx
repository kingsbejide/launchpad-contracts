import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Theme,
  Typography,
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
  href: {
    fontWeight: 700,
    color: '#0074FF',
  },
}));

const SocialMediaSection: React.FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.contentContainer} paddingY={8}>
      <Container maxWidth='lg'>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='h1' align='center' className={classes.title}>
              Stay connected
            </Typography>
            <Typography variant='h4' align='center' color='textSecondary'>
              Get in touch with us and keep updated
            </Typography>
            <Box marginTop={5} />
            <Box display='flex' flexWrap='wrap'>
              <InfoCard
                title='Twitter'
                description='The best place to get direct updates and announcements from the Impossible team '
                icon='/images/Twitter.png'
                iconWidth={75}
              />
              <InfoCard
                title='Telegram'
                description='Chat with our team and discuss the impossible with other community members'
                icon='/images/Telegram.png'
                iconWidth={75}
              />
              <InfoCard
                title='Github'
                description='Everything on Impossible is open-sourced and open to public audits'
                icon='/images/Github.png'
                iconWidth={75}
              />
              <InfoCard
                title='Medium'
                description='Here’s where we pen our thoughts on our product roadmap, strategy and the industry'
                icon='/images/Medium.png'
                iconWidth={75}
              />
            </Box>
            <Box marginTop={5} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SocialMediaSection;
