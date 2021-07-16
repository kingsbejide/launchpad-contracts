import { Box, Button, makeStyles, Theme, Typography } from '@material-ui/core';

interface InfoCardProps {
  title: string;
  description: string;
  icon: string;
  withShadow?: boolean;
  iconWidth?: number;
  href?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  cardTitle: {
    fontWeight: 700,
  },
  cardContainer: {
    borderRadius: '4px',
    minWidth: '230px',
  },
  shadow: {
    boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.08)',
  },
  clickable: {
    cursor: 'pointer',
  },
}));

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  icon,
  iconWidth,
  withShadow = true,
  href,
}) => {
  const navigate = () => {
    if (href) {
      window.open(href);
    }
  };
  const classes = useStyles();
  return (
    <Box
      flex={1}
      p={4}
      className={`${classes.cardContainer} ${
        href && classes.clickable
      } ${withShadow && classes.shadow}`}
      m={2}
      onClick={navigate}
    >
      <Box
        marginTop={2}
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <img
          src={icon}
          alt='Swap'
          width={iconWidth || 150}
          height={iconWidth || 150}
        />
      </Box>
      <Box marginBottom={3} />
      <Typography
        variant='subtitle2'
        align='center'
        className={classes.cardTitle}
      >
        {title}
      </Typography>
      <Box marginBottom={1} />
      <Typography variant='body1' color='textSecondary'>
        {description}
      </Typography>
    </Box>
  );
};

export default InfoCard;
