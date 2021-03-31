import { Box, makeStyles, Typography, Theme, useTheme, useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    justifyItems: 'center',
    background: '#F2F4F5',
  },
}));

const BottomBanner: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  let menuList = [
    {
      title: 'Products',
      items: [
        { title: 'Swap', url: '#' },
        { title: 'Liquidity', url: '#' },
        { title: 'Staking', url: '#' },
      ],
    },
    {
      title: 'Developers',
      items: [
        { title: 'Documentation', url: '#' },
        { title: 'Github', url: '#' },
      ],
    },
    {
      title: 'Community',
      items: [
        { title: 'Twitter', url: '#' },
        { title: 'Telegram', url: '#' },
      ],
    },
    {
      title: 'About',
      items: [
        { title: 'Blog', url: '#' },
        { title: 'Guide', url: '#' },
        { title: 'Info', url: '#' },
        { title: 'Risk and Terms', url: '#' },
      ],
    },
  ];

  return (
    <Box className={classes.contentContainer}>
      {matches ?
        <>
          <Box display="flex" justifyContent="center" paddingY={6}>
            {menuList.map((value) =>
              <Box key={value.title} display="flex" flexDirection="column" paddingX={10}>
                <Box marginBottom={1.5}>
                  <Typography variant='subtitle2'>{value.title}</Typography>
                </Box>
                {value.items.map((elem) =>
                  <Box key={elem.title} marginBottom={1.5}>
                    <Typography variant='body1'>{elem.title}</Typography>
                  </Box>
                )}
              </Box>
            )}
          </Box>
          <Box display="flex" justifyContent="center" paddingY={10}>
            <Typography variant='body2'> @ 2021 Impossible. Finance </Typography>
          </Box>
        </> : <></>}
    </Box>
  );
};

export default BottomBanner;
