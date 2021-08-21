import { Box, makeStyles, Theme, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  type: string;
  withShadow?: boolean;
  iconWidth?: number;
  href?: string;
  action?: React.ReactElement
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
  root: {
    width: 345,
    margin: 16,
    border: "1px solid #F2F4F5",
    boxShadow: "0px 4px 50px rgba(0, 0, 0, 0.09)",
    borderRadius: 12,
    display: "table-cell",
    position: "relative",
    cursor: 'default',
    '&:hover': {
    },
  },
  action: {
    position: "absolute",
    bottom: 24,
    height: 48,
    textAlign: "center",
    width: "100%",
  },
  media: {
    height: 166,
    '&:hover': {
    },
  },
  content: {
    marginBottom: 64,
  },
  actionContainer: {
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
    '& a': {
      textDecoration: "none",
    }
  },
  button: {
    background: '#0AC6E5',
    borderRadius: 18,
    fontSize: 18,
    boxShadow: "0px 4px 50px rgba(0, 0, 0, 0.09)",
    color: "#FFFFFF",
    padding: "4px 12px",
    '&:hover': {
      background: '#0AC6E5',
    },
  },
}));

export enum ProjectCardType {
  'BASIC' = 'BASIC',
  'COMINGSOON' = 'COMINGSOON',
  'JOINCOMMUNITY' = 'JOINCOMMUNITY',
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  type,
  href,
}) => {
  const getAction = (type: string) => {
    if (type === ProjectCardType.COMINGSOON) {
      return <Typography>
        Coming Soon!
      </Typography>
    }
    if (type === ProjectCardType.JOINCOMMUNITY) {
      return <a href="https://t.me/ImpossibleFinance" target="_blank" rel="noopener noreferrer">
        <Button className={classes.button}>
          Join Our Community <ArrowForwardIcon />
        </Button>
      </a>
    }
    return null;
  }

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea disableRipple>
        <CardMedia
          className={classes.media}
          image={image}
          title="projectBanner"
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.action}>
        <Box className={classes.actionContainer}>
          {getAction(type)}
        </Box>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
