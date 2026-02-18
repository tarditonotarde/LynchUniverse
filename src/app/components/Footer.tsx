import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface FooterProps {
  profile?: 'conspiranoia' | 'morpheo' | 'paw';
}

export function Footer({ profile = 'conspiranoia' }: FooterProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 660);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const footerLinks = {
    'Created by Claudia Tardito': [
      { name: 'Portfolio', url: 'https://tarditonotarde.github.io/mystuffs/' },
      { name: 'GitHub', url: 'https://github.com/tarditonotarde' }
    ],
    'Connect': [
      { name: 'Contact', url: 'mailto:tarditox@gmail.com' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/claudiatardito/' }
    ],
  };

  const profileConfig = {
    conspiranoia: {
      name: 'LynchUniverse',
      color: '#E50914',
      description: 'is a fictional streaming platform dreamed up by Claudia Tardito as a love letter — or maybe a mildly disturbing homage — to the inimitable David Lynch. This "platform" doesn\'t just host films and shows; it invites you to wander through dark forests of narrative logic, sip too much coffee in eerie diners, and question your own identity while the credits roll.\n\nFeaturing surreal classics like Twin Peaks, Mulholland Drive, Blue Velvet, and Eraserhead, LynchUniverse curates content that bends reality, folds time like origami, and leaves you wondering if the smoke in the background is part of the interface… or just your imagination.\n\nIt\'s also a neat idea for Netflix or other streaming services to create curated experiences honoring their visionary directors — a place where fans can explore their unique worlds, cinematic obsessions, and creative quirks, all in one immersive space.\n\nAll content is embedded from YouTube and provided exclusively for educational, artistic appreciation, and entertainment purposes. This is a non-commercial fan project, designed to honor Lynch\'s extraordinary contributions to cinema while experimenting with how a streaming experience could actually feel like stepping into one of his worlds.\n\nWarning: prolonged use may result in dreams you can\'t explain, an inexplicable craving for cherry pie, or sudden curiosity about the furniture in your living room.',
    },
    morpheo: {
      name: 'MORPHEO+',
      color: '#3B82F6',
      description: 'is a streaming platform for relaxation, sleep music, and meditation content. All videos are embedded from YouTube. Content is provided for relaxation and wellness purposes only.',
    },
    paw: {
      name: 'PAW+',
      color: '#16A34A',
      description: 'is a streaming platform for animal videos and wildlife documentaries. All videos are embedded from YouTube. Content is provided for entertainment and educational purposes only.',
    },
  };

  const config = profileConfig[profile];

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{
        paddingTop: 'var(--space-10)',
        paddingBottom: 'var(--space-6)',
        paddingLeft: 'var(--horizontal-padding)',
        paddingRight: 'var(--horizontal-padding)',
        backgroundColor: '#000000',
        background: isMobile 
          ? 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.95) 15%, #000000 30%)'
          : 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 20%, #000000 40%)',
        borderTop: 'none',
      }}
    >
      <div 
        style={{
          maxWidth: 'var(--max-content-width)',
          margin: '0 auto',
        }}
      >
        {/* Links grid */}
        <div 
          className="grid gap-8 mb-8"
          style={{
            marginBottom: 'var(--space-6)',
            gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
          }}
        >
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
            >
              <h4 
                className="mb-4"
                style={{
                  fontSize: 'var(--text-metadata)',
                  fontWeight: 600,
                  color: 'var(--text-tertiary)',
                }}
              >
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <motion.a 
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      className="transition-all block"
                      style={{
                        fontSize: '13px',
                        color: 'var(--text-tertiary)',
                        textDecoration: 'none',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--text-tertiary)';
                      }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="pt-6"
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <p 
            className="mb-4"
            style={{
              fontSize: '14px',
              color: 'var(--text-tertiary)',
              lineHeight: '150%',
              maxWidth: '800px',
            }}
          >
            <strong style={{ color: config.color }}>{config.name}</strong> {config.description}
          </p>
          
          <p 
            style={{
              fontSize: '12px',
              color: 'var(--text-tertiary)',
            }}
          >
            © 2026 {config.name}. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}