import React, { useEffect, useMemo, useCallback, useState } from 'react';
import {
  Button,
  chakra,
  useColorModeValue,
  Box,
  Flex,
  Text,
  Heading,
  Stack,
} from '@chakra-ui/react';
import { useLinkColor } from 'components/theme';
import { useRouter } from 'next/router';
import { skills, testimonials } from './data';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Hydration safe deterministic PRNG helpers
function makePRNG(seed = 123456789) {
  let s = seed >>> 0;
  return () => {
    s = (1664525 * s + 1013904223) >>> 0;
    return (s & 0xffffffff) / 0x100000000;
  };
}

type Dot = { topPct: number; leftPct: number; duration: number; delay: number };

function useStableDots(count = 50, seed = 20241008) {
  return useState<Dot[]>(() => {
    const rnd = makePRNG(seed);
    const arr: Dot[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        topPct: rnd() * 100,
        leftPct: rnd() * 100,
        duration: 2 + rnd() * 3,
        delay: rnd() * 3,
      });
    }
    return arr;
  })[0];
}

const emojis = ['👋', '✨', '🚀', '💫'];

const Home = () => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [emojiCounter, setEmojiCounter] = useState(-1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isQuoteExpanded, setIsQuoteExpanded] = useState(false);

  const router = useRouter();

  const textColor = useColorModeValue('#2D3748', '#FFFFFF');
  const cardTextColor = useColorModeValue('#000000', '#FFFFFF');
  const linkColor = useLinkColor();
  const activeDotColor = useColorModeValue('#a855f7', '#a855f7');
  const inactiveDotColor = useColorModeValue(
    'rgba(55,65,81,0.7)',
    'rgba(107,114,128,0.7)',
  );

  const dots = useStableDots(50, 987654321);


  // reset quote expansion when testimonial changes
  useEffect(() => {
    setIsQuoteExpanded(false);
  }, [activeIndex]);

  // emoji animation
  useEffect(() => {
    if (!showEmoji) return;
    const timer = setInterval(() => {
      setEmojiCounter((prev) => {
        const next = prev + 1;
        return next > emojis.length - 1 ? 0 : next;
      });
    }, 500);
    return () => clearInterval(timer);
  }, [showEmoji]);

  useEffect(() => {
    let raf = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        setMousePosition({
          x: (e.clientX - window.innerWidth / 2) / 50,
          y: (e.clientY - window.innerHeight / 2) / 50,
        });
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const activeTestimonial = useMemo(() => testimonials[activeIndex], [activeIndex]);

  const MAX_TESTIMONIAL_CHARS = 260;
  const quoteId = 'active-testimonial-quote';
  const fullQuote = activeTestimonial.quote;
  const isLongQuote = fullQuote.length > MAX_TESTIMONIAL_CHARS;
  const displayedQuote = useMemo(() => {
    if (isQuoteExpanded || !isLongQuote) return fullQuote;
    return fullQuote.slice(0, MAX_TESTIMONIAL_CHARS) + '...';
  }, [fullQuote, isQuoteExpanded, isLongQuote]);

  const onPrev = useCallback(() => {
    setActiveIndex((v) => (v - 1 + testimonials.length) % testimonials.length);
  }, []);

  const onNext = useCallback(() => {
    setActiveIndex((v) => (v + 1) % testimonials.length);
  }, []);

  const onDotClick = useCallback((idx: number) => {
    setActiveIndex(idx);
  }, []);

  // keep these stable to avoid recreating objects in the dots map
  const getDotStyle = useCallback(
    (index: number): React.CSSProperties => ({
      width: index === activeIndex ? 24 : 8,
      height: 8,
      borderRadius: 999,
      background: index === activeIndex ? activeDotColor : inactiveDotColor,
      opacity: 1,
      transition: 'all 0.25s',
      cursor: 'pointer',
    }),
    [activeIndex, activeDotColor, inactiveDotColor],
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '384px',
            height: '384px',
            background: 'rgba(168, 85, 247, 0.1)',
            borderRadius: '50%',
            filter: 'blur(96px)',
            top: '-192px',
            left: '-192px',
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out',
            willChange: 'transform',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '384px',
            height: '384px',
            background: 'rgba(249, 115, 22, 0.1)',
            borderRadius: '50%',
            filter: 'blur(96px)',
            bottom: '-192px',
            right: '-192px',
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out',
            willChange: 'transform',
          }}
        />

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
                animationDelay: `${d.delay}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '80px 16px',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '1152px',
            margin: '0 auto',
          }}
        >
          {/* Hero */}
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            gap="32px"
            mb="48px"
            justify="center"
            wrap="wrap"
          >
            {/* Greeting and Name */}
            <Box textAlign="left">
              <Box position="relative" mb="16px">
                <Box
                  position="absolute"
                  left="-64px"
                  top={0}
                  fontSize="36px"
                  display={{ base: 'none', md: 'block' }}
                >
                  {emojis.map((emoji, index) => (
                    <Box
                      key={index}
                      position="absolute"
                      opacity={showEmoji && emojiCounter === index ? 1 : 0}
                      transform={
                        showEmoji && emojiCounter === index
                          ? 'translateY(-48px)'
                          : 'translateY(0)'
                      }
                      transition="all 0.5s"
                    >
                      {emoji}
                    </Box>
                  ))}
                </Box>

                <Box position="relative" display="inline-block" className="heroHeadingWrap">
                  <h1
                    className="heroHeading"
                    onClick={() => {
                      setEmojiCounter((prev) => (prev + 1) % emojis.length);
                      setShowEmoji(true);
                    }}
                  >
                    <span>Hey!</span>
                    <span className="wavyHand">👋</span>
                  </h1>
                  <Box className="heroUnderline" />
                </Box>
              </Box>

              <Heading
                as="h2"
                fontSize={{ base: '2xl', md: '40px' }}
                fontWeight={300}
                color={textColor}
                m={0}
              >
                I am{' '}
                <chakra.span color={linkColor} fontWeight="bold">
                  M Mustafa Ali
                </chakra.span>
              </Heading>
            </Box>

            {/* Avatar */}
            <Box position="relative" className="avatarWrap">
              <Box
                position="absolute"
                inset={0}
                bgGradient="linear(to-r, orange.500, purple.500)"
                borderRadius="full"
                filter="blur(48px)"
                opacity={0.75}
                transition="opacity 0.5s"
                animation="pulse 2s ease-in-out infinite"
                className="avatarGlow"
              />
              <Box position="relative">
                <Box
                  w="200px"
                  h="200px"
                  borderRadius="full"
                  overflow="hidden"
                  border="4px solid rgba(255,255,255,0.1)"
                  boxShadow="0 25px 50px -12px rgba(0,0,0,0.25)"
                  transition="transform 0.5s"
                  className="avatarImgWrap"
                >
                  <img
                    src="/assets/images/Profiles/user.JPG"
                    alt="M Mustafa Ali"
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>

                <Box
                  position="absolute"
                  top="-16px"
                  right="-16px"
                  w="48px"
                  h="48px"
                  bgGradient="linear(to-br, #f97316, #ea580c)"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  boxShadow="0 10px 15px -3px rgba(0,0,0,0.1)"
                  animation="bounce 1s infinite"
                  fontSize="24px"
                >
                  💻
                </Box>
                <Box
                  position="absolute"
                  bottom="-16px"
                  left="-16px"
                  w="48px"
                  h="48px"
                  bgGradient="linear(to-br, #a855f7, #9333ea)"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  boxShadow="0 10px 15px -3px rgba(0,0,0,0.1)"
                  animation="bounce 1s infinite"
                  style={{ animationDelay: '0.2s' }}
                  fontSize="24px"
                >
                  🚀
                </Box>
              </Box>
            </Box>
          </Flex>

          {/* Center content */}
          <Box maxW="800px" mx="auto" textAlign="center">
            <Stack
              spacing="24px"
              color="#d1d5db"
              fontSize="18px"
              lineHeight="1.75"
              mb="32px"
            >
              {/* Replace hoveredCard state with pure CSS hover */}
              <Box
                className="hoverCard"
                backdropFilter="blur(12px)"
                bg="rgba(255,255,255,0.05)"
                p="24px"
                borderRadius="16px"
                border="1px solid rgba(255,255,255,0.1)"
                transition="all 0.3s"
                m={0}
                boxShadow="0 25px 50px -12px rgba(0,0,0,0.25)"
                color={cardTextColor}
              >
                A{' '}
                <chakra.span color={linkColor} fontWeight={600}>
                  Full Stack Engineer
                </chakra.span>{' '}
                with a passion for developing efficient, user centric web solutions.
                Throughout my career I have consistently demonstrated a strong ability
                to take initiative and lead diverse teams towards successful project
                outcomes.
              </Box>

              <Box
                className="hoverCard"
                backdropFilter="blur(12px)"
                bg="rgba(255,255,255,0.05)"
                p="24px"
                borderRadius="16px"
                border="1px solid rgba(255,255,255,0.1)"
                transition="all 0.3s"
                m={0}
                boxShadow="0 25px 50px -12px rgba(0,0,0,0.25)"
                color={cardTextColor}
              >
                I excel in collaborative environments but also enjoy independently
                diving deep into complex problems. My approach combines{' '}
                <chakra.span color="#c084fc" fontWeight={600}>
                  analytical thinking
                </chakra.span>{' '}
                with{' '}
                <chakra.span color="#60a5fa" fontWeight={600}>
                  creativity
                </chakra.span>
                , which allows me to tackle issues from multiple angles.
              </Box>
            </Stack>

            {/* Action buttons */}
            <Flex wrap="wrap" gap="16px" mb="32px" justify="center" align="center">
              <Button
                bg={linkColor}
                onClick={() => router.push('/projects')}
                _hover={{
                  bg: '#E0E0E0',
                  opacity: 0.9,
                  transform: 'translateY(-2px)',
                }}
                px="32px"
                py="16px"
                borderRadius="9999px"
                fontWeight={600}
                transition="all 0.3s"
                display="flex"
                alignItems="center"
                gap="8px"
                border="none"
                color="white"
              >
                <span>View Projects</span>
                <span style={{ fontSize: '20px' }}>⚡</span>
              </Button>

              <Button
                as="a"
                href="/assets/cv/Mustafa_Ali_SE.pdf"
                download="Mustafa_Ali_SE.pdf"
                bg={linkColor}
                _hover={{
                  bg: '#E0E0E0',
                  opacity: 0.9,
                  transform: 'translateY(-2px)',
                }}
                px="32px"
                py="16px"
                borderRadius="9999px"
                fontWeight={600}
                transition="all 0.3s"
                display="flex"
                alignItems="center"
                gap="8px"
                border="none"
                color="white"
              >
                Download Resume
              </Button>
            </Flex>

            {/* Skills */}
            <Flex wrap="wrap" gap="12px" justify="center" mb="40px" align="center">
              {skills.map((tech) => (
                <Button
                  key={tech}
                  _hover={{
                    bg: '#E0E0E0',
                    opacity: 0.9,
                    transform: 'translateY(-2px)',
                  }}
                  bg={linkColor}
                  px="16px"
                  py="8px"
                  backdropFilter="blur(12px)"
                  borderRadius="9999px"
                  fontSize="14px"
                  border="1px solid rgba(255,255,255,0.1)"
                  transition="all 0.3s"
                  cursor="default"
                  color="white"
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
                px={0}
                fontSize={{ base: 'xs', sm: 'sm' }}
              >
                see more
              </Button>
            </Flex>

            {/* GitHub contributions */}
            <Box maxW="800px" mx="auto" mb="40px" borderRadius="16px">
              <Flex justify="space-between" align="center" mb="16px" gap="8px" wrap="wrap">
                <chakra.h1 fontSize="22px" fontWeight="bold" color={linkColor}>
                  GitHub contributions
                </chakra.h1>

                <a
                  href="https://github.com/mustafaalil123"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontSize: '13px',
                    textDecoration: 'underline',
                  }}
                >
                  View on GitHub
                </a>
              </Flex>

              <Box
                maxW="900px"
                mx="auto"
                mt="32px"
                mb="32px"
                p="24px"
                borderRadius="12px"
                bg={useColorModeValue('#f6f8fa', 'rgba(255,255,255,0.05)')}
                border={useColorModeValue(
                  '1px solid #d0d7de',
                  '1px solid rgba(255,255,255,0.1)',
                )}
                boxShadow={useColorModeValue(
                  '0 1px 3px rgba(0,0,0,0.04)',
                  '0 20px 40px rgba(0,0,0,0.4)',
                )}
              >
                <Box
                  borderRadius="8px"
                  overflow="hidden"
                  border={useColorModeValue(
                    '1px solid #d8dee4',
                    '1px solid rgba(255,255,255,0.12)',
                  )}
                >
                  <img
                    src="/assets/images/Profiles/image.png"
                    alt="Contribution graph"
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      display: 'block',
                    }}
                  />
                </Box>
              </Box>
            </Box>

            {/* Testimonial section */}
            <Box
              w="100%"
              py="40px"
              borderRadius="24px"
              backdropFilter="blur(12px)"
              bg="rgba(255,255,255,0.05)"
              border="1px solid rgba(255,255,255,0.1)"
              boxShadow="0 25px 50px -12px rgba(0,0,0,0.6)"
              mt="12"
            >
              {/* Heading */}
              <Box textAlign="center" mb="32px">
                <Text
                  as="span"
                  display="inline-flex"
                  alignItems="center"
                  gap="8px"
                  px="16px"
                  py="8px"
                  borderRadius="999px"
                  bg={useColorModeValue('rgba(129,140,248,0.12)', 'rgba(168,85,247,0.15)')}
                  border="1px solid"
                  borderColor={useColorModeValue(
                    'rgba(129,140,248,0.4)',
                    'rgba(168,85,247,0.4)',
                  )}
                  mb="16px"
                >
                  <FiStar size={16} color={useColorModeValue('#6366f1', '#c4b5fd')} />
                  <Text
                    as="span"
                    fontSize="sm"
                    fontWeight={500}
                    color={useColorModeValue('#111827', '#e5e7eb')}
                  >
                    Client Testimonials
                  </Text>
                </Text>

                <Heading as="h3" fontSize={{ base: '2xl', md: '3xl' }} color={linkColor} mb="8px">
                  What People Say About <chakra.span color={linkColor}>Working With Me</chakra.span>
                </Heading>

                <Text
                  color={useColorModeValue('#111827', 'white')}
                  fontSize="lg"
                  maxW="640px"
                  mx="auto"
                >
                  Real feedback from real projects. Every testimonial represents a successful
                  collaboration.
                </Text>
              </Box>

              {/* Carousel */}
              <Box maxW="960px" mx="auto">
                <Box
                  borderRadius="16px"
                  border="1px solid rgba(255,255,255,0.18)"
                  p={{ base: '24px', md: '40px' }}
                  bg={linkColor}
                  boxShadow="0 25px 50px -12px rgba(0,0,0,0.8)"
                >
                  {/* Avatar + Name */}
                  <Flex align="center" gap="12px" flex="1" minW={0} mb="16px">
                    <Box
                      w="56px"
                      h="56px"
                      borderRadius="full"
                      overflow="hidden"
                      bgGradient="linear(to-br, #a855f7, #ec4899)"
                      flexShrink={0}
                      boxShadow="0 10px 25px rgba(168,85,247,0.7)"
                    >
                      <img
                        src={activeTestimonial.img}
                        alt={activeTestimonial.name}
                        loading="lazy"
                        decoding="async"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    </Box>

                    <Box textAlign="left" minW={0}>
                      <Text color="white" fontWeight="semibold" fontSize="md" mb="2px" noOfLines={1}>
                        {activeTestimonial.name}
                      </Text>

                      <Text
                        color="rgba(209,213,219,1)"
                        fontSize="sm"
                        whiteSpace="normal"
                        wordBreak="break-word"
                      >
                        {activeTestimonial.role}
                      </Text>
                    </Box>
                  </Flex>

                  {/* Quote */}
                  <Box display="flex" flexDirection="column" minHeight="150px" textAlign="left">
                    <Text id={quoteId} color="rgba(249,250,251,1)" fontSize={15} lineHeight="1.8">
                      {displayedQuote}
                    </Text>

                    {isLongQuote && (
                      <chakra.button
                        onClick={() => setIsQuoteExpanded((v) => !v)}
                        color="white"
                        fontSize="sm"
                        fontWeight="semibold"
                        mt="10px"
                        alignSelf="flex-start"
                        _hover={{ textDecoration: 'underline' }}
                      >
                        {isQuoteExpanded ? 'See less' : 'See more'}
                      </chakra.button>
                    )}
                  </Box>
                </Box>

                {/* Navigation */}
                <Flex justify="center" align="center" gap="24px" mt="24px" flexWrap="wrap">
                  <Button
                    onClick={onPrev}
                    borderRadius="full"
                    w="48px"
                    h="48px"
                    bg="rgba(15,23,42,0.9)"
                    border="1px solid rgba(255,255,255,0.18)"
                    color="white"
                    _hover={{ bg: 'rgba(15,23,42,0.8)', transform: 'scale(1.05)' }}
                  >
                    <FiChevronLeft />
                  </Button>

                  <Flex align="center" gap="8px">
                    {testimonials.map((_, index) => (
                      <Box key={index} style={getDotStyle(index)} onClick={() => onDotClick(index)} />
                    ))}
                  </Flex>

                  <Button
                    onClick={onNext}
                    borderRadius="full"
                    w="48px"
                    h="48px"
                    bg="rgba(15,23,42,0.9)"
                    border="1px solid rgba(255,255,255,0.18)"
                    color="white"
                    _hover={{ bg: 'rgba(15,23,42,0.8)', transform: 'scale(1.05)' }}
                  >
                    <FiChevronRight />
                  </Button>
                </Flex>
              </Box>
            </Box>
          </Box>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'bounce 1s infinite',
          }}
        />
      </div>

      <style>{`
        .heroHeadingWrap:hover .heroUnderline { transform: scaleX(1); }
        .heroHeadingWrap:hover .wavyHand { animation: spin 1s linear infinite; }

        .heroHeading {
          font-size: 72px;
          font-weight: bold;
          cursor: pointer;
          display: inline-block;
          background: linear-gradient(to right, #fb923c, #c084fc, #60a5fa);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient 3s ease infinite;
          margin: 0;
        }
        .wavyHand { display: inline-block; margin-left: 8px; }

        .heroUnderline {
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(to right, #f97316, #a855f7);
          transform: scaleX(0);
          transition: transform 0.3s;
          transform-origin: left;
        }

        .avatarWrap:hover .avatarImgWrap { transform: scale(1.1); }
        .avatarWrap:hover .avatarGlow { opacity: 1; }

        .hoverCard:hover { background: rgba(255,255,255,0.1); transform: translateY(-1px); }

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

        @media (prefers-reduced-motion: reduce) {
          .heroHeading, .wavyHand { animation: none; }
          .avatarGlow { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default Home;
