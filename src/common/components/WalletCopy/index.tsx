import React from 'react';
import { Box, makeStyles, Theme, Typography } from '@material-ui/core';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import Snackbar from '@material-ui/core/Snackbar';

interface WalletCopyProps {
  walletImage: string;
  walletAddress?: string;
  walletSymbol: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    justifyContent: "center",
    display: "flex",
    padding: 16,
  },
  btnBox: {
    background: "#FFFFFF",
    [theme.breakpoints.down('sm')]: {
      background: '#F2F4F5',
    },
    display: "flex",
    padding: "12px",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    cursor: "pointer",
    fontSize: 12,
  },
  mr: {
    marginRight: 12,
  }

}));

const WalletCopy: React.FC<WalletCopyProps> = ({
  walletImage,
  walletSymbol,
  walletAddress,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const clickIcon = () => {
    navigator.clipboard.writeText(walletAddress || '')
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box className={classes.root}>
      <Box className={classes.btnBox} onClick={clickIcon}>
        <img className={classes.mr} src={walletImage} width={24} />
        <span className={classes.mr}>{walletSymbol} address: {walletAddress} </span><img  src="/images/btn_copy.svg"/>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={handleClose}
        open={open}
        autoHideDuration={3000}
        message="Copied"
      />
    </Box>
  );
};

export default WalletCopy;
