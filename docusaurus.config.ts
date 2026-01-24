import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'sudoflux',
  tagline: 'Operational notes for VR and homelab systems',
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
          blogDescription: 'Lab notebook: experiments, observations, work-in-progress',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/sudoflux/sudoflux.io/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'ignore',
          blogSidebarTitle: 'Recent',
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
          type: 'docSidebar',
          sidebarId: 'startHereSidebar',
          position: 'right',
          label: 'Start Here',
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
          title: 'Documentation',
          items: [
            {label: 'VR Lab', to: '/docs/vr-lab'},
            {label: 'Homelab', to: '/docs/homelab'},
          ],
        },
        {
          title: 'Lab Notebook',
          items: [
            {label: 'Field Notes', to: '/field-notes'},
            {label: 'Tags', to: '/field-notes/tags'},
          ],
        },
        {
          title: 'Reference',
          items: [
            {label: 'Start Here', to: '/docs/start-here'},
            {label: 'GitHub', href: 'https://github.com/sudoflux'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} sudoflux`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'yaml', 'toml', 'ini', 'docker'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
