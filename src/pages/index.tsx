import React, { useRef, useMemo } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import styles from './index.module.css';

// Animated grid background
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
        
        // Subtle color variation
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
      <pointsMaterial size={0.08} vertexColors transparent opacity={0.6} />
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

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
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
          <span className={styles.promptPath}>~/sudoflux</span>
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
          Infrastructure · AI · VR · Documentation
        </motion.p>
        
        <motion.div
          className={styles.heroLinks}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={3}
        >
          <a
            href="https://github.com/sudoflux"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.heroLink}
          >
            GitHub
          </a>
          <span className={styles.linkSep}>·</span>
          <a
            href="https://www.youtube.com/@Josh-Fletcher"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.heroLink}
          >
            YouTube
          </a>
          <span className={styles.linkSep}>·</span>
          <Link to="/docs/homelab" className={styles.heroLink}>
            Docs
          </Link>
        </motion.div>
      </div>
    </header>
  );
}

function EntryPoints() {
  const cards = [
    {
      to: '/docs/homelab',
      icon: '◈',
      title: 'Homelab',
      desc: 'ZFS, networking, containers, infrastructure',
    },
    {
      to: '/docs/homelab/ai',
      icon: '⬡',
      title: 'AI',
      desc: 'Local models, assistants, memory systems',
    },
    {
      to: '/docs/vr-lab',
      icon: '◇',
      title: 'VR Lab',
      desc: 'Pimax, Quest, sim racing configs',
    },
    {
      to: '/field-notes',
      icon: '▹',
      title: 'Field Notes',
      desc: 'Experiments, gotchas, quick references',
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.cardGrid}>
          {cards.map((card, i) => (
            <motion.div
              key={card.to}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeIn}
              custom={i}
            >
              <Link to={card.to} className={styles.card}>
                <span className={styles.cardIcon}>{card.icon}</span>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDesc}>{card.desc}</p>
              </Link>
            </motion.div>
          ))}
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
            <span className={styles.statusValue}>9950X · 4090</span>
          </div>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>STORAGE</span>
            <span className={styles.statusValue}>~60TB ZFS</span>
          </div>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>VR</span>
            <span className={styles.statusValue}>5090 · Pimax</span>
          </div>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>NETWORK</span>
            <span className={styles.statusValue}>10GbE · UniFi</span>
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
          Built with Molt 🦞
        </span>
      </div>
    </footer>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title=""
      description="Infrastructure, AI, and VR documentation"
    >
      <HomepageHeader />
      <main>
        <EntryPoints />
        <SystemStatus />
      </main>
      <Footer />
    </Layout>
  );
}
