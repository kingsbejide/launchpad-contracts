import { Button, ButtonProps, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  gradientButton: {
    background: 'linear-gradient(90deg, #0063FF -2.21%, #9100FF 89.35%)',
    fontSize: '18px',
    color: 'white',
    textTransform: 'none',
    fontWeight: 700,
    borderRadius: '8px',
  },
}));

const GradientButton: React.FC<ButtonProps> = (props) => {
  const classes = useStyles();
  return (
    <Button
      {...props}
      className={`${classes.gradientButton} ${props.className}`}
    >
      {props.children}
    </Button>
  );
};

export default GradientButton;
