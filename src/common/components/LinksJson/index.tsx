type NavigationListChild = {
  title: string;
  url: string;
  isClientSide?: boolean;
  isDisabled?: boolean;
};

type NavigationList = {
  title: string;
  url?: string;
  items: NavigationListChild[];
};

const LinksJson: NavigationList[] = [
  {
    title: 'Invest',
    items: [
      {
        title: 'Coming Soon',
        url: `#`,
        isDisabled: true,
      },
    ],
  },
  {
    title: 'Trade',
    items: [
      {
        title: 'Swap',
        url: `${process.env.NEXT_PUBLIC_SWAP_DOMAIN}/#/swap`,
      },
    ],
  },
  {
    title: 'Earn',
    items: [
      {
        title: 'Liquidity',
        url: `${process.env.NEXT_PUBLIC_SWAP_DOMAIN}/#/pool`,
      },
    ],
  },
  {
    title: 'Developers',
    items: [
      {
        title: 'Github',
        url: `https://github.com/ImpossibleFinance`,
      },
      {
        title: 'GitBook',
        url: `https://abcstablexyz.gitbook.io/impossiblefinance/launchpad/launchpad-smart-contracts`,
      },
      {
        title: 'Bug Bounty',
        url: `https://immunefi.com/bounty/impossiblefinance/`,
      },
    ],
  },
  {
    title: 'Community',
    items: [
      { title: 'Twitter', url: 'https://twitter.com/ImpossibleFi' },
      { title: 'Telegram', url: 'https://t.me/ImpossibleFinance' },
      { title: 'Discord', url: 'https://discord.com/invite/SyF3RzxQCZ' },
      { title: 'Medium', url: 'https://medium.com/ImpossibleFinance' },
    ],
  },
  {
    title: 'About',
    items: [
      { title: 'Analytics', url: 'https://info.impossible.finance' },
      { title: 'Support', url: 'https://impossible.freshdesk.com/support/home' },
    ],
  },
];

export default LinksJson;
