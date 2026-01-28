import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>sudoflux</h1>
        <p className={styles.subtitle}>Homelab · DevOps · VR · Documenting the journey</p>
        <div className={styles.heroLinks}>
          <a href="https://github.com/sudoflux" target="_blank" rel="noopener noreferrer" className={styles.heroLink}>
            GitHub
          </a>
          <span className={styles.linkSep}>·</span>
          <a href="https://www.youtube.com/@Josh-Fletcher" target="_blank" rel="noopener noreferrer" className={styles.heroLink}>
            YouTube
          </a>
        </div>
      </div>
    </header>
  );
}

function Introduction() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.intro}>
          Documenting what actually works — so I don't forget and maybe you 
          don't have to figure it out from scratch either.
        </p>
      </div>
    </section>
  );
}

function EntryPoints() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.cardGrid}>
          <Link to="/docs/vr-lab" className={styles.card}>
            <div className={styles.cardContent}>
              <h2>🥽 VR Lab</h2>
              <p>
                Pimax Crystal Super, Quest 3, sim racing settings. 
                Baselines, per-game configs, and troubleshooting.
              </p>
            </div>
          </Link>
          <Link to="/docs/homelab" className={styles.card}>
            <div className={styles.cardContent}>
              <h2>🖥️ Homelab</h2>
              <p>
                ZFS storage, networking, media stack, local AI, 
                and infrastructure documentation.
              </p>
            </div>
          </Link>
        </div>
        <div className={styles.cardGrid}>
          <Link to="/field-notes" className={styles.card}>
            <div className={styles.cardContent}>
              <h2>📝 Field Notes</h2>
              <p>
                Short-form learnings, gotchas, and experiments. 
                The lab notebook.
              </p>
            </div>
          </Link>
          <Link to="/docs/start-here" className={styles.card}>
            <div className={styles.cardContent}>
              <h2>🚀 Start Here</h2>
              <p>
                New? Start with the baselines and philosophy 
                behind how this site is organized.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

function CurrentSetup() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h3 className={styles.sectionTitle}>Current Setup</h3>
        <div className={styles.setupGrid}>
          <div className={styles.setupItem}>
            <strong>VR Rig (powerflux)</strong>
            <span>Ryzen 9950X3D · RTX 5090 · Pimax Crystal Super</span>
          </div>
          <div className={styles.setupItem}>
            <strong>Server (sudoflux)</strong>
            <span>Ryzen 9950X · RTX 4090 · 96GB · ~60TB ZFS</span>
          </div>
          <div className={styles.setupItem}>
            <strong>Network</strong>
            <span>UniFi Dream Machine SE · 10GbE backbone</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatusFooter() {
  return (
    <footer className={styles.statusFooter}>
      <div className={styles.container}>
        <div className={styles.statusLine}>
          <span>Last updated: January 2026</span>
          <span className={styles.separator}>·</span>
          <span>Built with Docusaurus</span>
        </div>
      </div>
    </footer>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Home"
      description="Homelab and VR documentation by sudoflux">
      <HomepageHeader />
      <main>
        <Introduction />
        <EntryPoints />
        <CurrentSetup />
      </main>
      <StatusFooter />
    </Layout>
  );
}
