const math = require('remark-math');
const katex = require('rehype-katex');

module.exports = {
  title: "PoolTogether",
  tagline: "Developer Documentation and Guides",
  url: "https://dev.pooltogether.com",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "ignore",
  favicon: "img/favicon.png",
  organizationName: "PoolTogether", // Usually your GitHub org/user name.
  projectName: "dev-docs", // Usually your repo name.
  plugins: [[require.resolve("docusaurus-lunr-search"), {
    enableHighlight: true
  }]],
  themeConfig: {
    image: "img/twitter_card_bg.jpg",
    prism: {
      additionalLanguages: ["solidity"],
      theme: require("prism-react-renderer/themes/dracula"),
    },
    navbar: {
      title: "PoolTogether",
      logo: {
        alt: "PoolTogether",
        src: "img/favicon.png",
      },
      items: [
        {
          href: "https://pooltogether.com/interfaces",
          label: "User Interfaces",
          position: "right",
          className: "persistent",
        },
        {
          type: "localeDropdown",

          //// Optional
          position: "right",
          // Add additional dropdown items at the beginning/end of the dropdown.
          dropdownItemsBefore: [],
          dropdownItemsAfter: [
            {
              to: "https://pooltogether.com/discord",
              label: "Help us translate",
            },
          ],
        },
      ],
    },
    footer: {
      // style: "dark",
      links: [
        {
          title: "Developers",
          items: [
            {
              label: "Bug Bounty",
              href: "https://immunefi.com/bug-bounty/pooltogether/",
            },
          ],
        },
        {
          title: "Github",
          items: [
            {
              label: "PoolTogether Code",
              href: "https://github.com/orgs/GenerationSoftware/repositories?q=pooltogether&type=all&language=&sort=stargazers",
            },
          ],
        },
        {
          title: "Ecosystem",
          items: [
            {
              label: "Home",
              href: "https://pooltogether.com/",
            },
            {
              label: "Apps",
              href: "https://pooltogether.com/interfaces",
            },
            {
              label: "Brand Assets",
              href: "https://github.com/pooltogether/pooltogether--brand-assets/blob/141936c859553a2a42ac96ed807551b85a4d56d9/pooltogether-brand-assets-v1.2.0.zip?raw=true",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Governance",
              href: "https://gov.pooltogether.com/",
            },
            {
              label: "Discord",
              href: "https://pooltogether.com/discord",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/PoolTogether_",
            },
          ],
        },
      ],
      // copyright: `unlicensed`,
    },
    colorMode: {
      // "light" | "dark"
      defaultMode: "dark",

      // Hides the switch in the navbar
      // Useful if you want to support a single color mode
      disableSwitch: false,

      // Should we use the prefers-color-scheme media-query,
      // using user system preferences, instead of the hardcoded defaultMode
      respectPrefersColorScheme: true
    },
  },
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          path: "docs",
          routeBasePath: "protocol/",
          editUrl: "https://github.com/pooltogether/v4-docs/tree/main/",
          lastVersion: "current",
          includeCurrentVersion: true,
          remarkPlugins: [math],
          rehypePlugins: [katex],

        },

        theme: {
          customCss: require.resolve("./src/css/custom.css")
        },
      },
    ],
  ],
};
