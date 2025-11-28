import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import {
  VStack,
  Text,
  Badge,
  HStack,
  Button,
  useColorModeValue,
  Image,
  Box,
  IconButton,
  Heading,
  Container,
  chakra,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { HiChevronLeft, HiChevronRight, HiExternalLink } from 'react-icons/hi';
import PageLayout from 'components/layouts/pageLayout';
import { projectsList } from '../data/projectData';
import { Project } from 'interfaces/interface';
import { useLinkColor } from 'components/theme';

interface ProjectDetailProps {
  project: Project;
}

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const ProjectDetail: NextPage<ProjectDetailProps> = ({ project }) => {
  const pageBg = useColorModeValue('#f9fafb', '#020617');
  const textColor = useColorModeValue('gray.700', 'gray.100');
  const cardBg = useColorModeValue('white', 'gray.900');
  const accentGradient = 'linear(to-r, #667eea, #764ba2, #f093fb)';
  const shadowColor = useColorModeValue(
    'rgba(102, 126, 234, 0.25)',
    'rgba(102, 126, 234, 0.6)'
  );
  const overlayBg = useColorModeValue(
    'rgba(55, 65, 81, 0.9)',
    'rgba(15, 23, 42, 0.9)'
  );
  const pillBg = useColorModeValue(
    'rgba(129,140,248,0.12)',
    'rgba(129,140,248,0.18)'
  );
  const pillBorder = useColorModeValue(
    '1px solid rgba(129,140,248,0.4)',
    '1px solid rgba(129,140,248,0.6)'
  );

  const linkColor = useLinkColor();

  const caseStudy = project.caseStudy!;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);

  const hasCarousel = caseStudy.images && caseStudy.images.length > 0;

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? caseStudy.images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === caseStudy.images.length - 1 ? 0 : prev + 1
    );
  };

  // normalise longDescription for bullets and meta description
  const longRaw = caseStudy.longDescription;
  const overviewItems = Array.isArray(longRaw) ? longRaw : [longRaw];
  const metaDescription = overviewItems[0] || project.description;

  return (
    <PageLayout title={project.title} description={metaDescription}>
      <Box position="relative" overflow="hidden" bg={pageBg}>
        {/* background blobs */}
        <Box
          position="absolute"
          top="-20%"
          right="-10%"
          w="600px"
          h="600px"
          borderRadius="full"
          bgGradient={accentGradient}
          filter="blur(120px)"
          opacity={0.25}
          animation={`${float} 6s ease-in-out infinite`}
          zIndex={0}
        />
        <Box
          position="absolute"
          bottom="-20%"
          left="-10%"
          w="500px"
          h="500px"
          borderRadius="full"
          bgGradient="linear(to-r, #f97316, #ec4899)"
          filter="blur(120px)"
          opacity={0.22}
          animation={`${float} 8s ease-in-out infinite`}
          zIndex={0}
        />

        <Container
          maxW="7xl"
          px={{ base: 4, md: 8 }}
          position="relative"
          zIndex={1}
        >
          <VStack align="stretch" spacing={12} py={12}>
            {/* hero card */}
            <Box
              position="relative"
              p={{ base: 8, md: 12 }}
              pb={{ base: 12, md: 16 }}
              borderRadius="3xl"
              overflow="hidden"
              bg={cardBg}
              backdropFilter="blur(20px)"
              boxShadow={`0 18px 40px ${shadowColor}`}
              border="1px solid"
              borderColor={useColorModeValue('purple.200', 'purple.500')}
            >
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                h="4px"
                bgGradient={accentGradient}
              />

              <VStack align="stretch" spacing={8} w="100%">
                <HStack justify="space-between" align="center" flexWrap="wrap" gap={4}>
                  <Box
                    px={4}
                    py={2}
                    borderRadius="full"
                    bg={pillBg}
                    border={pillBorder}
                  >
                    <Text
                      fontSize="xs"
                      textTransform="uppercase"
                      letterSpacing="wider"
                      fontWeight="semibold"
                      color={useColorModeValue('gray.700', 'gray.100')}
                    >
                      Featured project
                    </Text>
                  </Box>

                  {project.site && (
                    <Button
                      as="a"
                      href={project.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="lg"
                      h="56px"
                      px={8}
                      bgGradient={accentGradient}
                      color="white"
                      rightIcon={<HiExternalLink />}
                      _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: `0 18px 40px ${shadowColor}`,
                      }}
                      transition="all 0.3s"
                      fontWeight="bold"
                      fontSize="md"
                    >
                      Visit project
                    </Button>
                  )}
                </HStack>

                <Heading
                  as="h1"
                  size={{ base: '2xl', md: '3xl' }}
                  bgGradient={accentGradient}
                  bgClip="text"
                  fontWeight="black"
                  letterSpacing="tight"
                  lineHeight="1.1"
                  textAlign="center"
                  padding={4}
                  
                >
                  {project.title}
                </Heading>
              </VStack>
            </Box>

            {/* Description card */}
            <Box
              p={{ base: 6, md: 8 }}
              borderRadius="2xl"
              bg={cardBg}
              boxShadow={useColorModeValue(
                '0 10px 25px rgba(15,23,42,0.08)',
                '0 20px 40px rgba(0,0,0,0.65)'
              )}
              border="1px solid"
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <chakra.h2
                color={linkColor}
                fontWeight="bold"
                fontSize={{ base: 'xl', md: '22px' }}
                textAlign="center"
                mb={5}
              >
                Description
              </chakra.h2>

              <Box
                as="ul"
                pl={6}
                maxW="3xl"
                mx="auto"
                color={textColor}
                lineHeight="1.8"
              >
                {(isOverviewExpanded
                  ? overviewItems
                  : overviewItems.slice(0, 3)
                ).map((item, idx) => (
                  <chakra.li
                    fontSize={{ base: '15px', md: '16px' }}
                    textAlign="left"
                    key={idx}
                    mb={3}
                  >
                    {item}
                  </chakra.li>
                ))}
              </Box>

              {overviewItems.length > 3 && (
                <HStack justify="flex-end" maxW="3xl" mx="auto" mt={4}>
                  <chakra.button
                    color={linkColor}
                    fontSize="13px"
                    fontWeight="medium"
                    onClick={() => setIsOverviewExpanded((v) => !v)}
                    _hover={{ textDecoration: 'underline' }}
                  >
                    {isOverviewExpanded ? 'See less' : 'See more'}
                  </chakra.button>
                </HStack>
              )}
            </Box>

            {/* screenshots carousel */}
            {hasCarousel && (
              <Box>
                <Heading
                  size="md"
                  mb={6}
                  color={textColor}
                  textAlign="left"
                  fontWeight="bold"
                >
                  Visuals
                </Heading>
                <Box
                  position="relative"
                  borderRadius="2xl"
                  overflow="hidden"
                  boxShadow={useColorModeValue(
                    '0 20px 40px rgba(15,23,42,0.18)',
                    '0 25px 50px rgba(0,0,0,0.85)'
                  )}
                  bg={cardBg}
                  border="1px solid"
                  borderColor={useColorModeValue('gray.200', 'gray.700')}
                  _hover={{
                    boxShadow: useColorModeValue(
                      '0 25px 50px rgba(15,23,42,0.25)',
                      '0 30px 60px rgba(0,0,0,0.95)'
                    ),
                  }}
                  transition="box-shadow 0.3s ease"
                >
                  <Box
                    position="relative"
                    w="full"
                    aspectRatio={16 / 9}
                    bg={useColorModeValue('gray.50', 'gray.900')}
                    overflow="hidden"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box
                      key={currentIndex}
                      position="absolute"
                      top={0}
                      left={0}
                      w="100%"
                      h="100%"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      animation="fadeIn 0.5s ease-in-out"
                      sx={{
                        '@keyframes fadeIn': {
                          from: { opacity: 0 },
                          to: { opacity: 1 },
                        },
                      }}
                    >
                      <Image
                        src={caseStudy.images[currentIndex]}
                        alt={`${project.title} screenshot ${currentIndex + 1}`}
                        objectFit="contain"
                        w="100%"
                        h="100%"
                        maxH="100%"
                      />
                    </Box>

                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      h="30%"
                      bgGradient="linear(to-b, rgba(0,0,0,0.4), transparent)"
                      pointerEvents="none"
                      zIndex={1}
                    />
                    <Box
                      position="absolute"
                      bottom={0}
                      left={0}
                      right={0}
                      h="40%"
                      bgGradient="linear(to-t, rgba(0,0,0,0.6), transparent)"
                      pointerEvents="none"
                      zIndex={1}
                    />

                    <IconButton
                      aria-label="Previous"
                      icon={<HiChevronLeft size={28} />}
                      position="absolute"
                      top="50%"
                      left={{ base: '3', md: '6' }}
                      transform="translateY(-50%)"
                      onClick={handlePrev}
                      size="lg"
                      w={{ base: '12', md: '14' }}
                      h={{ base: '12', md: '14' }}
                      borderRadius="full"
                      bg={overlayBg}
                      color="white"
                      backdropFilter="blur(16px)"
                      border="2px solid"
                      borderColor="whiteAlpha.400"
                      opacity={0.9}
                      _hover={{
                        transform: 'translateY(-50%) scale(1.1)',
                        bg: useColorModeValue('purple.600', 'purple.500'),
                        borderColor: 'purple.300',
                        opacity: 1,
                        boxShadow: '0 12px 24px rgba(102, 126, 234, 0.5)',
                      }}
                      _active={{
                        transform: 'translateY(-50%) scale(0.95)',
                      }}
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                      zIndex={3}
                      boxShadow="0 8px 16px rgba(0,0,0,0.4)"
                    />

                    <IconButton
                      aria-label="Next"
                      icon={<HiChevronRight size={28} />}
                      position="absolute"
                      top="50%"
                      right={{ base: '3', md: '6' }}
                      transform="translateY(-50%)"
                      onClick={handleNext}
                      size="lg"
                      w={{ base: '12', md: '14' }}
                      h={{ base: '12', md: '14' }}
                      borderRadius="full"
                      bg={overlayBg}
                      color="white"
                      backdropFilter="blur(16px)"
                      border="2px solid"
                      borderColor="whiteAlpha.400"
                      opacity={0.9}
                      _hover={{
                        transform: 'translateY(-50%) scale(1.1)',
                        bg: useColorModeValue('purple.600', 'purple.500'),
                        borderColor: 'purple.300',
                        opacity: 1,
                        boxShadow: '0 12px 24px rgba(102, 126, 234, 0.5)',
                      }}
                      _active={{
                        transform: 'translateY(-50%) scale(0.95)',
                      }}
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                      zIndex={3}
                      boxShadow="0 8px 16px rgba(0,0,0,0.4)"
                    />

                    <Badge
                      position="absolute"
                      bottom={{ base: '4', md: '6' }}
                      right={{ base: '4', md: '6' }}
                      px={{ base: 3, md: 5 }}
                      py={{ base: 1.5, md: 2 }}
                      borderRadius="full"
                      bg={overlayBg}
                      color="white"
                      fontSize={{ base: 'sm', md: 'md' }}
                      fontWeight="bold"
                      backdropFilter="blur(16px)"
                      zIndex={2}
                      border="2px solid"
                      borderColor="whiteAlpha.400"
                      boxShadow="0 4px 12px rgba(0,0,0,0.4)"
                      letterSpacing="wide"
                    >
                      {currentIndex + 1} / {caseStudy.images.length}
                    </Badge>
                  </Box>

                  <HStack
                    justify="center"
                    py={{ base: 5, md: 6 }}
                    spacing={{ base: 2, md: 3 }}
                    bg={cardBg}
                    px={4}
                  >
                    {caseStudy.images.map((_, idx) => (
                      <Box
                        key={idx}
                        as="button"
                        onClick={() => setCurrentIndex(idx)}
                        w={
                          idx === currentIndex
                            ? { base: 10, md: 12 }
                            : { base: 2.5, md: 3 }
                        }
                        h={{ base: 2.5, md: 3 }}
                        borderRadius="full"
                        position="relative"
                        bg={
                          idx === currentIndex
                            ? 'transparent'
                            : useColorModeValue('gray.300', 'gray.600')
                        }
                        _before={
                          idx === currentIndex
                            ? {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                borderRadius: 'full',
                                bgGradient: accentGradient,
                              }
                            : undefined
                        }
                        transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                        _hover={{
                          transform: 'scale(1.15)',
                          bg:
                            idx === currentIndex
                              ? 'transparent'
                              : useColorModeValue('gray.400', 'gray.500'),
                          boxShadow:
                            idx === currentIndex
                              ? '0 4px 12px rgba(102, 126, 234, 0.4)'
                              : 'none',
                        }}
                        cursor="pointer"
                        boxShadow={
                          idx === currentIndex
                            ? '0 2px 8px rgba(102, 126, 234, 0.3)'
                            : 'none'
                        }
                      />
                    ))}
                  </HStack>
                </Box>
              </Box>
            )}

            {/* role card */}
            <Box
              position="relative"
              p={{ base: 6, md: 8 }}
              borderRadius="2xl"
              bg={useColorModeValue(
                'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
                'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)'
              )}
              backdropFilter="blur(10px)"
              boxShadow={useColorModeValue(
                '0 20px 60px rgba(99, 102, 241, 0.15)',
                '0 20px 60px rgba(0, 0, 0, 0.7)'
              )}
              border="1px solid"
              borderColor={useColorModeValue('purple.100', 'purple.900')}
              overflow="hidden"
              _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                bgGradient: 'linear(to-r, purple.400, pink.400, orange.400)',
              }}
            >
              <VStack spacing={5}>
                <Badge
                  colorScheme="purple"
                  px={4}
                  py={1}
                  borderRadius="full"
                  fontSize="xs"
                  fontWeight="semibold"
                  textTransform="uppercase"
                  letterSpacing="wide"
                >
                  My Role
                </Badge>

                <chakra.p
                  fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
                  bgGradient="linear(to-r, purple.400, pink.500)"
                  bgClip="text"
                  textAlign="center"
                  maxW="3xl"
                  fontWeight="extrabold"
                  mx="auto"
                  lineHeight="shorter"
                  px={4}
                >
                  {caseStudy.role}
                </chakra.p>
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps<ProjectDetailProps> = async (
  context
) => {
  const idParam = context.query.id;
  const id = Number(idParam);
  const project = projectsList.find((p) => p.id === id);

  if (!project || !project.caseStudy) {
    return { notFound: true };
  }

  return {
    props: {
      project,
    },
  };
};

export default ProjectDetail;