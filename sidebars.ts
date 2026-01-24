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
      label: 'VR Lab Overview',
    },
    {
      type: 'category',
      label: 'Baselines',
      collapsed: false,
      items: [
        'vr-lab/baseline-checklist',
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
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'Game Settings',
        description: 'Per-game VR settings and configurations',
      },
      items: [],
    },
  ],

  homelabSidebar: [
    {
      type: 'doc',
      id: 'homelab/index',
      label: 'Homelab Overview',
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
      label: 'Media Stack',
      collapsed: false,
      items: [
        'homelab/media/jellyfin-transcode',
      ],
    },
    {
      type: 'category',
      label: 'Services',
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'Services',
        description: 'Individual service documentation',
      },
      items: [],
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
