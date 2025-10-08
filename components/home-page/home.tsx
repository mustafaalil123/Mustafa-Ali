import { Button, chakra, useColorModeValue } from '@chakra-ui/react';
import { useLinkColor } from 'components/theme';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// ===== Hydration-safe deterministic PRNG helpers =====
function makePRNG(seed = 123456789) {
  let s = seed >>> 0;
  return () => {
    s = (1664525 * s + 1013904223) >>> 0;
    return (s & 0xffffffff) / 0x100000000;
  };
}

type Dot = { topPct: number; leftPct: number; duration: number; delay: number };

function useStableDots(count = 50, seed = 20241008) {
  // Use state initializer so the array is created exactly once per mount,
  // and deterministically on both SSR and CSR.
  return useState<Dot[]>(() => {
    const rnd = makePRNG(seed);
    const arr: Dot[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        topPct: rnd() * 100,
        leftPct: rnd() * 100,
        duration: 2 + rnd() * 3, // 2..5s
        delay: rnd() * 3,        // 0..3s
      });
    }
    return arr;
  })[0];
}
// =====================================================

const emojis = ['👋', '✨', '🚀', '💫'];

const Home = () => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [emojiCounter, setEmojiCounter] = useState(-1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredHeading, setHoveredHeading] = useState(false);
  const [hoveredAvatar, setHoveredAvatar] = useState(false);
  const router = useRouter();

  // Color mode values
  const textColor = useColorModeValue('#2D3748', '#FFFFFF');
  const cardTextColor = useColorModeValue('#000', '#FFFFFF');

  // Keep emoji index in range if you keep clicking
  useEffect(() => {
    const interval = setInterval(() => {
      if (emojiCounter >= 3) setEmojiCounter(0);
    }, 500);
    return () => clearInterval(interval);
  }, [emojiCounter]);

  // Mouse-follow blobs (only attaches on client)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const skills = [
    'MERN', 'TypeScript', 'Python', 'AWS', 'Tailwind', 'Material UI', 'My SQL', 'Docker', 'Redis'
  ];

  const linkColor = useLinkColor();

  // NEW: deterministic dots (no Math.random() in render)
  const dots = useStableDots(50, 987654321);

  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute',
          width: '384px',
          height: '384px',
          background: 'rgba(168, 85, 247, 0.1)',
          borderRadius: '50%',
          filter: 'blur(96px)',
          top: '-192px',
          left: '-192px',
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: 'transform 0.3s ease-out'
        }} />
        <div style={{
          position: 'absolute',
          width: '384px',
          height: '384px',
          background: 'rgba(249, 115, 22, 0.1)',
          borderRadius: '50%',
          filter: 'blur(96px)',
          bottom: '-192px',
          right: '-192px',
          transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
          transition: 'transform 0.3s ease-out'
        }} />
        <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
          {dots.map((d, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                top: `${d.topPct}%`,
                left: `${d.leftPct}%`,
                animation: `pulse ${d.duration}s ease-in-out infinite`,
                animationDelay: `${d.delay}s`
              }}
            />
          ))}
        </div>
      </div>

      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '80px 16px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1152px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '32px',
            marginBottom: '48px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {/* Greeting and Name */}
            <div style={{ textAlign: 'left' }}>
              <div style={{ position: 'relative', marginBottom: '16px' }}>
                <div style={{
                  position: 'absolute',
                  left: '-64px',
                  top: 0,
                  fontSize: '36px'
                }}>
                  {emojis.map((emoji, index) => (
                    <div
                      key={index}
                      style={{
                        position: 'absolute',
                        opacity: showEmoji && emojiCounter === index ? 1 : 0,
                        transform: showEmoji && emojiCounter === index ? 'translateY(-48px)' : 'translateY(0)',
                        transition: 'all 0.5s'
                      }}
                    >
                      {emoji}
                    </div>
                  ))}
                </div>

                {/* Greeting */}
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <h1
                    style={{
                      fontSize: '72px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'inline-block',
                      background: 'linear-gradient(to right, #fb923c, #c084fc, #60a5fa)',
                      backgroundSize: '200% auto',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      animation: 'gradient 3s ease infinite',
                      margin: 0
                    }}
                    onClick={() => {
                      setEmojiCounter((prev) => prev + 1);
                      setShowEmoji(true);
                    }}
                    onMouseEnter={() => setHoveredHeading(true)}
                    onMouseLeave={() => setHoveredHeading(false)}
                  >
                    <span>Hey!</span>
                    <span style={{
                      display: 'inline-block',
                      marginLeft: '8px',
                      animation: hoveredHeading ? 'spin 1s linear infinite' : 'none'
                    }}>👋</span>
                  </h1>
                  <div style={{
                    position: 'absolute',
                    bottom: '-8px',
                    left: 0,
                    width: '100%',
                    height: '4px',
                    background: 'linear-gradient(to right, #f97316, #a855f7)',
                    transform: hoveredHeading ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 0.3s',
                    transformOrigin: 'left'
                  }} />
                </div>
              </div>

              <h2 style={{
                fontSize: '40px',
                fontWeight: 300,
                color: textColor,
                margin: 0
              }}>
                I am{' '}
                <chakra.span
                  color={linkColor}
                  style={{ fontWeight: 'bold' }}
                >
                  M Mustafa Ali
                </chakra.span>
              </h2>
            </div>

            {/* Avatar */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setHoveredAvatar(true)}
              onMouseLeave={() => setHoveredAvatar(false)}
            >
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, #f97316, #a855f7)',
                borderRadius: '50%',
                filter: 'blur(48px)',
                opacity: hoveredAvatar ? 1 : 0.75,
                transition: 'opacity 0.5s',
                animation: 'pulse 2s ease-in-out infinite'
              }} />
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '4px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  transform: hoveredAvatar ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform 0.5s'
                }}>
                  <img
                    src="https://avatars2.githubusercontent.com/u/37842853?v=4"
                    alt="M Mustafa Ali"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                {/* Floating icons */}
                <div style={{
                  position: 'absolute',
                  top: '-16px',
                  right: '-16px',
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(to bottom right, #f97316, #ea580c)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  animation: 'bounce 1s infinite',
                  fontSize: '24px'
                }}>
                  💻
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '-16px',
                  left: '-16px',
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(to bottom right, #a855f7, #9333ea)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  animation: 'bounce 1s infinite 0.2s',
                  fontSize: '24px'
                }}>
                  🚀
                </div>
              </div>
            </div>
          </div>

          {/* Center Content Section */}
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              color: '#d1d5db',
              fontSize: '18px',
              lineHeight: '1.75',
              marginBottom: '32px'
            }}>
              <p
                style={{
                  backdropFilter: 'blur(12px)',
                  background: hoveredCard === 1 ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                  padding: '24px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s',
                  margin: 0,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  color: cardTextColor
                }}
                onMouseEnter={() => setHoveredCard(1)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                A <chakra.span color={linkColor} style={{ fontWeight: 600 }}>Full Stack Engineer</chakra.span> with
                a passion for developing efficient, user-centric web solutions. Throughout my career,
                I've consistently demonstrated a strong ability to take initiative and lead diverse
                teams towards successful project outcomes.
              </p>

              <p
                style={{
                  backdropFilter: 'blur(12px)',
                  padding: '24px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s',
                  margin: 0,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  color: cardTextColor
                }}
                onMouseEnter={() => setHoveredCard(2)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                I excel in collaborative environments but also enjoy independently diving deep into
                complex problems. My approach combines <span style={{ color: '#c084fc', fontWeight: 600 }}>analytical thinking</span> with{' '}
                <span style={{ color: '#60a5fa', fontWeight: 600 }}>creativity</span>, allowing me to tackle
                issues from multiple angles.
              </p>
            </div>

            {/* Action buttons */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '32px',
              justifyContent: 'center'
            }}>
              <Button
                bg={linkColor}
                onClick={() => router.push('/projects')}
                _hover={{ bg: "#E0E0E0", opacity: 0.9, transform: 'translateY(-2px)' }}
                style={{
                  padding: '16px 32px',
                  borderRadius: '9999px',
                  fontWeight: 600,
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  color: "white",
                }}
              >
                <span>View Projects</span>
                <span style={{ fontSize: '20px' }}>⚡</span>
              </Button>

              <Button
                bg={linkColor}
                _hover={{ bg: "#E0E0E0", opacity: 0.9, transform: 'translateY(-2px)' }}
                style={{
                  padding: '16px 32px',
                  borderRadius: '9999px',
                  fontWeight: 600,
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  color: "white"
                }}
              >
                <a
                  style={{ color: "white" }}
                  href="/assets/cv/Mustafa_Ali_SE.pdf"
                  download="Mustafa_Ali_SE.pdf"
                >
                  Download Resume
                </a>
              </Button>
            </div>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'center'
            }}>
              {skills.map((tech) => (
                <Button
                  key={tech}
                  _hover={{ bg: "#E0E0E0", opacity: 0.9, transform: 'translateY(-2px)' }}
                  bg={linkColor}
                  style={{
                    padding: '8px 16px',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '9999px',
                    fontSize: '14px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s',
                    cursor: 'default',
                    color: 'white'
                  }}
                >
                  {tech}
                </Button>
              ))}

              <Button
                onClick={() => router.push('/tech-stack')}
                variant="link"
                color={linkColor}
                size="sm"
                mt={2}
                alignSelf={{ base: 'center', sm: 'flex-start' }}
                px={0}
                fontSize={{ base: 'xs', sm: 'sm' }}
              >
                see more
              </Button>
            </div>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'bounce 1s infinite'
        }}>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.5; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-25%); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Home;
