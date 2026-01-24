# sudoflux.io

Nerd wiki for VR tuning (Pimax Super 50PPD) and homelab infrastructure.

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm start

# Build for production
npm run build

# Serve production build locally
npm run serve
```

Dev server runs at `http://localhost:3000`.

## Structure

```
sudoflux.io/
├── docs/
│   ├── start-here/      # Orientation, philosophy
│   ├── vr-lab/          # VR tuning docs
│   │   ├── troubleshooting/
│   │   └── games/
│   └── homelab/         # Infrastructure docs
│       ├── storage/
│       ├── media/
│       ├── services/
│       └── troubleshooting/
├── blog/                # Field Notes (lab notebook)
├── src/
│   └── pages/           # Standalone pages (about, etc.)
└── static/
    └── img/
        ├── vr/          # VR screenshots
        └── homelab/     # Diagrams, screenshots
```

## Content Philosophy

### Docs vs Field Notes

| Type | Location | Purpose | Quality Bar |
|------|----------|---------|-------------|
| **Docs** | `docs/` | Reproducible procedures | High - verified, versioned |
| **Field Notes** | `blog/` | Experiments, observations | Lower - may be rough |

**Docs** are claims: "Do X and Y happens."  
**Field Notes** are observations: "I tried X and saw Y."

### Version Sensitivity

VR and homelab configs break with updates. Every doc page includes:

- `last_verified` frontmatter
- Versions tested section
- Update history

When something breaks, mark it stale and investigate in Field Notes.

## Adding Content

### New Doc Page

1. Create `.md` file in appropriate `docs/` subfolder
2. Add frontmatter:
   ```yaml
   ---
   title: Page Title
   description: Brief description
   last_verified: YYYY-MM-DD
   ---
   ```
3. Add to `sidebars.ts` if not auto-generated

Use templates in:
- `docs/vr-lab/games/template.md`
- `docs/homelab/services/template.md`
- `docs/homelab/troubleshooting/template.md`

### New Field Note

1. Copy `blog/TEMPLATE.md`
2. Rename to `YYYY-MM-DD-slug.md`
3. Fill in frontmatter and content
4. Use tags from `blog/tags.yml`

### Images

- VR screenshots: `static/img/vr/`
- Homelab diagrams: `static/img/homelab/`
- Reference as `/img/vr/filename.png`

## Deployment

### Build

```bash
npm run build
# Output in build/
```

### Deploy to Self-Hosted Nginx

```bash
# Copy build to web root
rsync -av build/ /var/www/sudoflux.io/
```

### GitHub Pages (Alternative)

```bash
npm run deploy
```

Configure in `docusaurus.config.ts`:
- `organizationName`
- `projectName`
- `deploymentBranch`

## Customization

### Styling

Edit `src/css/custom.css` for color scheme and typography.

### Navigation

Edit `docusaurus.config.ts` navbar items and `sidebars.ts` for sidebar structure.

### Blog Settings

In `docusaurus.config.ts` under `blog`:
- `routeBasePath: 'field-notes'` (URL path)
- `blogSidebarCount: 10` (recent posts shown)

## Contributing

1. Fork the repo
2. Create a branch
3. Make changes
4. Submit PR

For content corrections, open an issue first.

## License

Content: CC BY-SA 4.0  
Code: MIT
