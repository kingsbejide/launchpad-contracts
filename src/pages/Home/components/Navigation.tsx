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
import Link from 'next/link'

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
    textDecoration: 'none',
  },
  dropdownContent: {
    position: 'absolute',
    borderRadius: '8px',
    backgroundColor: 'white',
    zIndex: 1,
    display: 'none',
    flexDirection: 'column',
    minWidth: '150px',
    padding: '24px 16px',
    '& a:not(:last-child)': {
      marginBottom: '16px',
    },
    filter: "drop-shadow(0px 0px 20px rgba(8, 12, 108, 0.19))",
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
      textDecoration: "underline",
      fontWeight: 700,
    },
  },
  noHover: {
    '&:hover': {
      textDecoration: "none",
      fontWeight: 400,
      pointer: 'default',
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

type NavigationProps = {
  showNavBackground?: boolean;
};

const Navigation: React.FC<NavigationProps> = ({ showNavBackground }) => {
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

  const navigateToSwap = () => {
    window.open(process.env.NEXT_PUBLIC_SWAP_DOMAIN);
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
        bgcolor={showNavBackground ? '#050A5A' : 'transparent'}
      >
        <Box display='flex' flex={2}>
          <Link href={'/'}>
            <a>
              <img src='/images/logo.svg' alt='logo' width='120px' height='30px' />
            </a>
          </Link>
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
                url={value.url}
              />
            ))}
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
              <Typography variant='subtitle2'>
              {value.url && value.url.length > 0 ? 
                  <a
                    key={value.title}
                    href={value.url}
                    className={classes.dropDownItem}
                  >
                    {value.title}
                  </a>
                :
                  value.title
                }  
              </Typography>
            </Box>
            {value.items.map((item) => (
              <Box key={item.title} marginBottom={3}>
                {item.isClientSide ? <Link href={item.url} key={item.title}>
                  <a className={classes.dropDownItem}>{item.title}</a>
                </Link> : <a href={item.url} className={`${classes.dropDownItem} ${item.isDisabled ? classes.noHover : ''}`}>
                  <Typography variant='body1'>{item.title}</Typography>
                </a>}

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
  isClientSide?: boolean;
  isDisabled?: boolean;
};

type DropDownMenuProps = {
  title: string;
  items: DropDownMenuItem[];
  url?: string;
};

const DropDownMenu: React.FC<DropDownMenuProps> = ({ title, items, url }) => {
  const classes = useStyles();
  return (
    <Box position='relative' className={classes.dropDown}>
      <Typography variant='subtitle2' className={classes.dropDownText}>
        {url && url.length > 0 ? 
          <a
            key={title}
            href={url}
            className={classes.dropDownText}
          >
            {title}
          </a>
        :
          title
        }
      </Typography>
      {items.length > 0 && (
        <Box className={classes.dropdownContent}>
          {items.map((value) => {
            if (value.isClientSide) {
              return <Link href={value.url} key={value.title}>
                <a className={classes.dropDownItem}>{value.title}</a>
              </Link>
            }
            return <a
              key={value.title}
              href={value.url}
              className={`${classes.dropDownItem} ${value.isDisabled ? classes.noHover : ''}`}
            >
              {value.title}
            </a>
          })}
        </Box>
        )
      }
    </Box>
  );
};

export default Navigation;
