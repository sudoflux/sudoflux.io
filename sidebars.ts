import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  startHereSidebar: [
    {
      type: 'doc',
      id: 'start-here/index',
      label: 'Welcome',
    },
    {
      type: 'doc',
      id: 'start-here/baselines',
      label: 'Known-Good Baselines',
    },
    {
      type: 'doc',
      id: 'start-here/philosophy',
      label: 'Docs vs Field Notes',
    },
  ],

  vrLabSidebar: [
    {
      type: 'doc',
      id: 'vr-lab/index',
      label: 'Overview',
    },
    {
      type: 'category',
      label: 'Baseline',
      collapsed: false,
      items: [
        'vr-lab/baseline/checklist',
        'vr-lab/baseline/powerflux-config',
      ],
    },
    {
      type: 'category',
      label: 'Tuning',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: 'Tuning Guides',
        description: 'Optimization and configuration guides',
      },
      items: [
        'vr-lab/uevr-guide',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      collapsed: false,
      items: [
        'vr-lab/troubleshooting/stutter-frametime',
      ],
    },
    {
      type: 'category',
      label: 'Games',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: 'Game Settings',
        description: 'Per-game configurations and settings',
      },
      items: [
        'vr-lab/games/automobilista2',
        'vr-lab/games/iracing',
      ],
    },
  ],

  homelabSidebar: [
    {
      type: 'doc',
      id: 'homelab/index',
      label: 'Overview',
    },
    {
      type: 'doc',
      id: 'homelab/architecture',
      label: 'Architecture',
    },
    {
      type: 'category',
      label: 'Storage',
      collapsed: false,
      items: [
        'homelab/storage/zfs-gotchas',
      ],
    },
    {
      type: 'category',
      label: 'Media',
      collapsed: false,
      items: [
        'homelab/media/jellyfin-transcode',
      ],
    },
    {
      type: 'category',
      label: 'Containers & Ops',
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'Containers & Operations',
        description: 'Docker, orchestration, and operational practices',
      },
      items: [],
    },
    {
      type: 'category',
      label: 'Networking',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: 'Networking',
        description: 'Network configuration and architecture',
      },
      items: [
        'homelab/network/udm-frr-bgp',
      ],
    },
    {
      type: 'category',
      label: 'AI Agents',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: 'AI Agents',
        description: 'AI assistant setup, security, and operations',
      },
      items: [
        'homelab/ai/assistant',
        'homelab/ai/mac-mini-hardening',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'Troubleshooting',
        description: 'Issue-driven troubleshooting guides',
      },
      items: [],
    },
  ],
};

export default sidebars;
