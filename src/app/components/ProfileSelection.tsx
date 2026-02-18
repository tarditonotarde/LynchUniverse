import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PlusCircle } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';

interface Profile {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

interface ProfileSelectionProps {
  onSelectProfile: (profileId: string) => void;
}

export function ProfileSelection({ onSelectProfile }: ProfileSelectionProps) {
  const [hoveredProfile, setHoveredProfile] = useState<string | null>(null);
  const { stop, togglePlay } = useAudio();

  const handleProfileClick = (profileId: string) => {
    if (profileId === 'lynch') {
      stop();
      setTimeout(() => {
        togglePlay();
      }, 100);
      onSelectProfile(profileId);
    }
  };

  const profiles: Profile[] = [
    {
      id: 'lynch',
      name: 'Lynch Universe',
      avatar: 'https://images.mubicdn.net/images/cast_member/832/cache-8-1530086177/image-w856.jpg',
      color: '#E50914',
    },
    {
      id: 'kids',
      name: 'Kids',
      avatar: 'https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg',
      color: '#46d369',
    },
    {
      id: 'guest',
      name: 'Guest',
      avatar: 'https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg',
      color: '#0080ff',
    },
  ];

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#141414',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      {/* Main Content */}
      <div
        style={{
          maxWidth: '1000px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {/* Title */}
        <h2
          style={{
            fontSize: 'clamp(28px, 4vw, 36px)',
            fontWeight: 400,
            color: '#ffffff',
            marginBottom: '40px',
            letterSpacing: '0.5px',
          }}
        >
          Who's watching?
        </h2>

        {/* Profiles Grid */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 'clamp(20px, 3vw, 40px)',
            flexWrap: 'wrap',
            marginBottom: '60px',
          }}
        >
          {profiles.map((profile) => (
            <motion.div
              key={profile.id}
              whileHover={profile.id === 'lynch' ? { scale: 1.1 } : {}}
              whileTap={profile.id === 'lynch' ? { scale: 0.95 } : {}}
              onClick={() => handleProfileClick(profile.id)}
              onMouseEnter={() => profile.id === 'lynch' && setHoveredProfile(profile.id)}
              onMouseLeave={() => setHoveredProfile(null)}
              style={{
                cursor: profile.id === 'lynch' ? 'pointer' : 'not-allowed',
                textAlign: 'center',
                opacity: profile.id === 'lynch' ? 1 : 0.5,
              }}
            >
              {/* Avatar Container */}
              <div
                style={{
                  width: 'clamp(100px, 15vw, 200px)',
                  height: 'clamp(100px, 15vw, 200px)',
                  backgroundColor: profile.avatar.startsWith('http') ? 'transparent' : profile.color,
                  backgroundImage: profile.avatar.startsWith('http') ? `url(${profile.avatar})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px',
                  border: hoveredProfile === profile.id ? '4px solid #e5e5e5' : '4px solid transparent',
                  transition: 'border 0.2s ease',
                  fontSize: 'clamp(50px, 8vw, 100px)',
                  filter: profile.avatar.startsWith('http') ? 'grayscale(100%)' : 'none',
                }}
              >
                {!profile.avatar.startsWith('http') && profile.avatar}
              </div>

              {/* Profile Name */}
              <p
                style={{
                  fontSize: 'clamp(14px, 2vw, 20px)',
                  fontWeight: 400,
                  color: hoveredProfile === profile.id ? '#e5e5e5' : '#808080',
                  margin: 0,
                  transition: 'color 0.2s ease',
                }}
              >
                {profile.name}
              </p>
            </motion.div>
          ))}

          {/* Add Profile Button */}
          <motion.div
            style={{
              cursor: 'not-allowed',
              textAlign: 'center',
              opacity: 0.5,
            }}
          >
            <div
              style={{
                width: 'clamp(100px, 15vw, 200px)',
                height: 'clamp(100px, 15vw, 200px)',
                backgroundColor: 'transparent',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
                border: '4px solid transparent',
                transition: 'border 0.2s ease',
              }}
            >
              <PlusCircle
                size={60}
                color={'#808080'}
                strokeWidth={1.5}
              />
            </div>
            <p
              style={{
                fontSize: 'clamp(14px, 2vw, 20px)',
                fontWeight: 400,
                color: '#808080',
                margin: 0,
                transition: 'color 0.2s ease',
              }}
            >
              Add Profile
            </p>
          </motion.div>
        </div>

        {/* Manage Profiles Button */}
        <motion.button
          disabled
          style={{
            backgroundColor: 'transparent',
            border: '1px solid #808080',
            color: '#808080',
            fontSize: '14px',
            fontWeight: 400,
            padding: '8px 24px',
            cursor: 'not-allowed',
            letterSpacing: '2px',
            transition: 'all 0.2s ease',
            opacity: 0.5,
          }}
        >
          MANAGE PROFILES
        </motion.button>
      </div>
    </div>
  );
}