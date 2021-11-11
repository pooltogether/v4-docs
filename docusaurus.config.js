module.exports = {
  title: 'PoolTogether',
  tagline: 'Documentation and Guides',
  url: 'https://v4-docs.netlify.app',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'ignore',
  favicon: 'img/favicon.png',
  organizationName: 'PoolTogether', // Usually your GitHub org/user name.
  projectName: 'v4-docs', // Usually your repo name.
  themeConfig: {
    image: 'img/twitter_card_bg.jpg',
    prism: {
      additionalLanguages: ['solidity'],
      theme: require('prism-react-renderer/themes/dracula'),
    },
    /*
    algolia: {
      apiKey: "32465e2ab6f7554ff014e64c0d92171c",
      indexName: "v3-docs",
      appId: "S0IDD0YGLZ",
    },
    */
    navbar: {
      title: 'PoolTogether Docs',
      logo: {
        alt: 'PoolTogether',
        src: 'img/favicon.png',
      },
      items: [
        {
          to: '/protocol/reference/smart-contracts',
          label: 'Contracts',
          position: 'left',
          className: 'V3_active',
        },
        {
          href: 'https://poolgrants.org/',
          label: 'Grants',
          position: 'right',
          className: 'persistent',
        },
        {
          type: 'localeDropdown',

          //// Optional
          position: 'right',
          // Add additional dropdown items at the beginning/end of the dropdown.
          dropdownItemsBefore: [],
          dropdownItemsAfter: [
            {
              to: 'https://discord.gg/wVxaC4Gj',
              label: 'Help us translate',
            },
          ],
        },
      ],
    },
    footer: {
      // style: "dark",
      links: [
        {
          title: 'Developers',
          items: [
            {
              label: 'Bug Bounty',
              href: 'https://github.com/pooltogether/pooltogether-pool-contracts/issues/1',
            },
            {
              label: '#dev-chat',
              href: 'https://discord.gg/NVhqUj6v',
            },
          ],
        },
        {
          title: 'Github',
          items: [
            {
              label: 'pooltogether-v4',
              href: 'https://github.com/PoolTogether/pooltogether-contract-tsunami',
            },
          ],
        },
        {
          title: 'Ecosystem',
          items: [
            {
              label: 'Home',
              href: 'https://pooltogether.com/',
            },
            {
              label: 'App',
              href: 'https://app.pooltogether.com/',
            },
            {
              label: 'Brand Assets',
              href: 'https://github.com/pooltogether/pooltogether--brand-assets/blob/141936c859553a2a42ac96ed807551b85a4d56d9/pooltogether-brand-assets-v1.2.0.zip?raw=true',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Governance',
              href: 'https://gov.pooltogether.com/',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/JBzfTu63',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/PoolTogether_',
            },
          ],
        },
      ],
      // copyright: `unlicensed`,
    },
    colorMode: {
      // "light" | "dark"
      defaultMode: 'dark',

      // Hides the switch in the navbar
      // Useful if you want to support a single color mode
      disableSwitch: false,

      // Should we use the prefers-color-scheme media-query,
      // using user system preferences, instead of the hardcoded defaultMode
      respectPrefersColorScheme: true,

      // Dark/light switch icon options
      switchConfig: {
        // Icon for the switch while in dark mode
        darkIcon: '\u{263D}',

        // Unicode icons such as '\u2600' will work
        // Unicode with 5 chars require brackets: '\u{1F602}'
        lightIcon: '\u{263C}',
      },
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: 'protocol/',
          editUrl: 'https://github.com/pooltogether/v4-docs/tree/main/',
        },

        theme: {
          customCss: require.resolve('./src/css/custom.css'),
          customCss2: require.resolve('./src/css/colors.css'),
        },
      },
    ],
  ],
};
