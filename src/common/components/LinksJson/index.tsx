const LinksJson = [
  {
    title: 'Products',
    items: [
      { title: 'Swap', url: `${process.env.NEXT_PUBLIC_SWAP_DOMAIN}/#/swap`},
      {
        title: 'Liquidity',
        url: `${process.env.NEXT_PUBLIC_SWAP_DOMAIN}/#/pool`,
      },
      {
        title: 'Staking',
        url: `${process.env.NEXT_PUBLIC_FARMS_DOMAIN}/#/farms`,
      },
      {
        title: 'Migration',
        url: `${process.env.NEXT_PUBLIC_MIGRATE_DOMAIN}/#/migrate`,
      },
    ],
  },
  {
    title: 'Developers',
    items: [{ title: 'Github', url: 'https://github.com/ImpossibleFinance' }],
  },
  {
    title: 'Community',
    items: [
      { title: 'Twitter', url: 'https://twitter.com/ImpossibleFi' },
      { title: 'Telegram', url: 'https://t.me/ImpossibleFinance' },
    ],
  },
  {
    title: 'About',
    items: [
      { title: 'Blog', url: 'https://medium.com/ImpossibleFinance' },
      { title: 'Privacy Policies', url: '/privacy', isClientSide: true },
      { title: 'Cookie Policy', url: '/cookie', isClientSide: true }
    ],
  },
];

export default LinksJson;
