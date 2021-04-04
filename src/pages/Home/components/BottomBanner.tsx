import {
  Box,
  makeStyles,
  Typography,
  Theme,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import LinksJson from '../../../common/components/LinksJson';

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

  return matches ? (
    <Box className={classes.contentContainer}>
      <Box display='flex' justifyContent='center' paddingY={6}>
        {LinksJson.map((value) => (
          <Box
            key={value.title}
            display='flex'
            flexDirection='column'
            paddingX={10}
          >
            <Box marginBottom={1.5}>
              <Typography variant='subtitle2'>{value.title}</Typography>
            </Box>
            {value.items.map((elem) => (
              <Box key={elem.title} marginBottom={1.5}>
                <a href={elem.url}>
                  <Typography variant='body1'>{elem.title}</Typography>
                </a>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      <Box display='flex' justifyContent='center' paddingY={10}>
        <Typography variant='body2'>
          {' '}
          @ {new Date().getFullYear()} Impossible. Finance{' '}
        </Typography>
      </Box>
    </Box>
  ) : (
    <Box display='flex' justifyContent='center' paddingY={10}>
      <Typography variant='body2'>
        {' '}
        @ {new Date().getFullYear()} Impossible. Finance{' '}
      </Typography>
    </Box>
  );
};

export default BottomBanner;
