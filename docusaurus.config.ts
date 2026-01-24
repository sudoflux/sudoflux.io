import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'sudoflux',
  tagline: 'Optimization at the Edge of Immersion',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://sudoflux.io',
  baseUrl: '/',

  organizationName: 'sudoflux',
  projectName: 'sudoflux.io',

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownImages: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/sudoflux/sudoflux.io/tree/main/',
        },
        blog: {
          path: 'blog',
          routeBasePath: 'field-notes',
          blogTitle: 'Field Notes',
          blogDescription: 'Lab notebook: experiments, observations, and work-in-progress findings',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/sudoflux/sudoflux.io/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'ignore',
          blogSidebarTitle: 'Recent Notes',
          blogSidebarCount: 10,
          tags: 'tags.yml',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'sudoflux',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'startHereSidebar',
          position: 'left',
          label: 'Start Here',
        },
        {
          type: 'docSidebar',
          sidebarId: 'vrLabSidebar',
          position: 'left',
          label: 'VR Lab',
        },
        {
          type: 'docSidebar',
          sidebarId: 'homelabSidebar',
          position: 'left',
          label: 'Homelab',
        },
        {
          to: '/field-notes',
          label: 'Field Notes',
          position: 'left',
        },
        {
          to: '/about',
          label: 'About',
          position: 'right',
        },
        {
          href: 'https://github.com/sudoflux',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Start Here', to: '/docs/start-here'},
            {label: 'VR Lab', to: '/docs/vr-lab'},
            {label: 'Homelab', to: '/docs/homelab'},
          ],
        },
        {
          title: 'Field Notes',
          items: [
            {label: 'All Notes', to: '/field-notes'},
            {label: 'Tags', to: '/field-notes/tags'},
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'About', to: '/about'},
            {label: 'GitHub', href: 'https://github.com/sudoflux'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} sudoflux. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'yaml', 'toml', 'ini'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
