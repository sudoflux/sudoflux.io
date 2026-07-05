import React, { useRef, useMemo } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, type Variants } from 'framer-motion';
import * as THREE from 'three';
import styles from './index.module.css';

function Grid() {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    const size = 40;
    const segments = 30;
    const color = new THREE.Color();

    for (let i = 0; i <= segments; i++) {
      for (let j = 0; j <= segments; j++) {
        const x = (i / segments - 0.5) * size;
        const z = (j / segments - 0.5) * size;
        positions.push(x, 0, z);

        const intensity = 0.15 + Math.random() * 0.1;
        color.setRGB(intensity * 0.5, intensity * 0.8, intensity);
        colors.push(color.r, color.g, color.b);
      }
    }

    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors),
    };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const z = positions[i + 2];
      positions[i + 1] = Math.sin(x * 0.3 + time * 0.5) * Math.cos(z * 0.3 + time * 0.3) * 0.5;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef} rotation={[-Math.PI / 4, 0, 0]} position={[0, -2, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.08} vertexColors transparent opacity={0.45} />
    </points>
  );
}

function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 5, 10], fov: 60 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <Grid />
    </Canvas>
  );
}

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

function HomepageHeader() {
  return (
    <header className={styles.hero}>
      <Scene />
      <div className={styles.heroContent}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={0}
          className={styles.terminalPrompt}
        >
          <span className={styles.promptSymbol}>❯</span>
          <span className={styles.promptPath}>tested-notes / not-slop</span>
        </motion.div>

        <motion.h1
          className={styles.title}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={1}
        >
          sudoflux
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={2}
        >
          Tested notes for local AI, homelab infrastructure, and high-end VR rigs.
        </motion.p>

        <motion.p
          className={styles.heroCopy}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={3}
        >
          Real configurations, parts lists, failure notes, and tuning guides from a messy working lab.
          No fake testimonials, no pretend benchmarks, and no “we tested 37 products” nonsense.
        </motion.p>

        <motion.div
          className={styles.heroLinks}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={4}
        >
          <Link to="/gear" className={styles.heroButton}>
            Recommended Gear
          </Link>
          <Link to="/docs/start-here" className={styles.heroButtonSecondary}>
            Start Here
          </Link>
          <Link to="/field-notes" className={styles.heroButtonSecondary}>
            Field Notes
          </Link>
        </motion.div>
      </div>
    </header>
  );
}

function EntryPoints() {
  const cards = [
    {
      to: '/docs/homelab/ai',
      icon: '⬡',
      title: 'Local AI',
      desc: 'Ollama, GPU sizing, memory systems, assistant operations',
    },
    {
      to: '/docs/homelab',
      icon: '◈',
      title: 'Homelab',
      desc: 'ZFS, 10GbE, containers, media, backups, gotchas',
    },
    {
      to: '/docs/vr-lab',
      icon: '◇',
      title: 'VR + Sim Rig',
      desc: 'Pimax, Quest, OpenXR, sim racing configs, frametime fixes',
    },
    {
      to: '/gear',
      icon: '▣',
      title: 'Gear Notes',
      desc: 'Owned, tested, rejected, and researched hardware lists',
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.kicker}>start with a problem</span>
          <h2>Expensive nerd infrastructure, documented by scar tissue.</h2>
          <p>
            Pages are written as field notes and build guides: what was tested, what broke,
            and what is still just a researched candidate.
          </p>
        </div>
        <div className={styles.cardGrid}>
          {cards.map((card) => (
            <Link key={card.to} to={card.to} className={styles.card}>
              <span className={styles.cardIcon}>{card.icon}</span>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDesc}>{card.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustModel() {
  const rules = [
    'Firsthand gear is labeled as owned/currently used or previously used.',
    'Researched picks are labeled separately until they are actually tested.',
    'Affiliate links, if added, will be disclosed and will not change the testing status.',
    'Stale pages should say they are stale instead of pretending to be current.',
  ];

  return (
    <section className={styles.trustSection}>
      <div className={styles.container}>
        <div className={styles.trustPanel}>
          <div>
            <span className={styles.kicker}>editorial rule</span>
            <h2>No slop testimonials.</h2>
            <p>
              sudoflux is allowed to be useful, opinionated, and monetized later. It is not allowed
              to pretend Josh tested things he did not test.
            </p>
          </div>
          <ul>
            {rules.map((rule) => <li key={rule}>{rule}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

function SystemStatus() {
  return (
    <section className={styles.statusSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.statusGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          custom={0}
        >
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>COMPUTE</span>
            <span className={styles.statusValue}>9950X3D · RTX 5090 + 4090 · 3-node Proxmox</span>
          </div>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>STORAGE</span>
            <span className={styles.statusValue}>ZFS media + backup notes</span>
          </div>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>VR</span>
            <span className={styles.statusValue}>Pimax · Quest · sim racing</span>
          </div>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>NETWORK</span>
            <span className={styles.statusValue}>10GbE · UniFi · service ops</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <span className={styles.footerText}>
          sudoflux · infrastructure notes, explicit caveats
        </span>
      </div>
    </footer>
  );
}

export default function Home(): React.ReactElement {
  return (
    <Layout
      title="Local AI, homelab, and VR rig notes"
      description="Tested notes for local AI, homelab infrastructure, and high-end VR rigs. Real configurations, gear notes, failures, and tuning guides."
    >
      <HomepageHeader />
      <main>
        <EntryPoints />
        <TrustModel />
        <SystemStatus />
      </main>
      <Footer />
    </Layout>
  );
}
