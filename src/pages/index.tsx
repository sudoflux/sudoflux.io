import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>sudoflux</h1>
        <p className={styles.subtitle}>Operational notes for VR and homelab systems</p>
      </div>
    </header>
  );
}

function Introduction() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.intro}>
          This site documents real-world tuning of two complex systems: high-end VR
          (Pimax Super 50PPD focus) and production-style homelabs (storage, media,
          containers, networking). Content is versioned, reproducible, and tested.
          Docs are canonical. Field Notes are experiments.
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
              <h2>Enter the VR Lab</h2>
              <p>
                Baselines, tuning guides, troubleshooting, and per-game settings
                for Pimax Super 50PPD and high-end VR configurations.
              </p>
            </div>
          </Link>
          <Link to="/docs/homelab" className={styles.card}>
            <div className={styles.cardContent}>
              <h2>Enter the Homelab</h2>
              <p>
                Architecture, ZFS storage, media stack, container operations,
                networking, and infrastructure documentation.
              </p>
            </div>
          </Link>
        </div>
        <div className={styles.secondaryLink}>
          <Link to="/field-notes">Field Notes (lab notebook) →</Link>
        </div>
      </div>
    </section>
  );
}

function StartHere() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h3 className={styles.sectionTitle}>Start Here</h3>
        <ul className={styles.startList}>
          <li>
            <Link to="/docs/vr-lab/baseline/checklist">VR Baseline Checklist</Link>
            <span className={styles.dash}>—</span>
            <span className={styles.description}>Known-good starting configuration</span>
          </li>
          <li>
            <Link to="/docs/homelab/architecture">Homelab Architecture Overview</Link>
            <span className={styles.dash}>—</span>
            <span className={styles.description}>Infrastructure design and layout</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

function StatusFooter() {
  return (
    <footer className={styles.statusFooter}>
      <div className={styles.container}>
        <div className={styles.statusLine}>
          <span>Last site update: January 2026</span>
          <span className={styles.separator}>·</span>
          <span>Current focus: Pimax Super 50PPD + Linux homelab</span>
        </div>
      </div>
    </footer>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Operational Notes"
      description="Documentation for VR tuning and homelab infrastructure">
      <HomepageHeader />
      <main>
        <Introduction />
        <EntryPoints />
        <StartHere />
      </main>
      <StatusFooter />
    </Layout>
  );
}
