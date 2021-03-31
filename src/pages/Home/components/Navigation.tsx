import {
  Box,
  Button,
  makeStyles,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import MenuClose from '@material-ui/icons/Close';

import GradientButton from '../../../common/components/GradientButton';
import LinksJson from '../../../common/components/LinksJson';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '100%',
    padding: '32px 8.3vw',
  },
  dropDownText: {
    color: 'white',
    cursor: 'pointer',
  },
  dropdownContent: {
    position: 'absolute',
    borderRadius: '8px',
    backgroundColor: 'white',
    zIndex: 1,
    display: 'none',
    flexDirection: 'column',
    minWidth: '200px',
    padding: '24px 16px',
    marginTop: '8px',
    '& a:not(:last-child)': {
      marginBottom: '16px',
    },
  },
  appButton: {
    padding: '10px 13px',
  },
  dropDown: {
    '&:hover': {
      '& div': {
        display: 'flex !important',
      },
    },
  },
  dropDownItem: {
    textDecoration: 'none',
    color: theme.palette.text.secondary,
    fontSize: theme.typography.body2.fontSize,
    '&:visited': {
      textDecoration: 'none',
    },
    '&:hover': {
      textDecoration: 'underline',
      fontWeight: 700,
    },
  },
  navigationPage: {
    background: 'white',
    width: '100%',
  },
  navigationCloseIcon: {
    fontSize: 24,
    color: theme.palette.text.primary,
  },
}));

const Navigation: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const [isOpen, setOpen] = useState(false);
  const openNavigationPage = () => {
    setOpen(true);
  };
  const closeNavigation = () => {
    setOpen(false);
  };

  return (
    <>
      <NavigationPage
        isOpen={isOpen}
        menuList={LinksJson}
        closeNavigation={closeNavigation}
      />
      <Box
        className={classes.container}
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        position='absolute'
      >
        <Box display='flex' flex={2}>
          <img src='/images/logo.svg' alt='logo' width='120px' height='30px' />
        </Box>
        {matches ? (
          <Box
            display='flex'
            flex={3}
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
          >
            {LinksJson.map((value) => (
              <DropDownMenu
                key={value.title}
                title={value.title}
                items={value.items}
              />
            ))}

            <GradientButton className={classes.appButton}>
              <Typography variant='subtitle2'>Launch App</Typography>
            </GradientButton>
          </Box>
        ) : (
          <Button onClick={openNavigationPage}>
            <MenuIcon style={{ fontSize: 24, color: 'white' }} />
          </Button>
        )}
      </Box>
    </>
  );
};

type NavigationPageProps = {
  isOpen: boolean;
  menuList: DropDownMenuProps[];
  closeNavigation: React.MouseEventHandler<HTMLButtonElement>;
};

const NavigationPage: React.FC<NavigationPageProps> = ({
  isOpen,
  closeNavigation,
  menuList,
}) => {
  const classes = useStyles();
  return (
    <Box
      position='absolute'
      zIndex={100}
      className={classes.navigationPage}
      style={{ display: isOpen ? 'flex' : 'none' }}
      flexDirection='column'
    >
      <Box
        paddingX={4}
        paddingTop={4}
        display='flex'
        alignItems='flex-end'
        flexDirection='column'
      >
        <Button onClick={closeNavigation}>
          <MenuClose className={classes.navigationCloseIcon} />
        </Button>
      </Box>
      <Box paddingX={4} paddingBottom={4}>
        {menuList.map((value) => (
          <Box marginBottom={3} key={value.title}>
            <Box marginBottom={3}>
              <Typography variant='subtitle2'>{value.title}</Typography>
            </Box>
            {value.items.map((item) => (
              <Box key={item.title} marginBottom={3}>
                <Typography variant='body1'>{item.title}</Typography>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

type DropDownMenuItem = {
  url: string;
  title: string;
};

type DropDownMenuProps = {
  title: string;
  items: DropDownMenuItem[];
};

const DropDownMenu: React.FC<DropDownMenuProps> = ({ title, items }) => {
  const classes = useStyles();
  return (
    <Box position='relative' className={classes.dropDown}>
      <Typography variant='subtitle2' className={classes.dropDownText}>
        {title}
      </Typography>
      <Box className={classes.dropdownContent}>
        {items.map((value) => (
          <a
            key={value.title}
            href={value.url}
            className={classes.dropDownItem}
          >
            {value.title}
          </a>
        ))}
      </Box>
    </Box>
  );
};

export default Navigation;
