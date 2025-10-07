import React, { useState, useMemo } from 'react';
import {
  Box,
  Stack,
  VStack,
  Heading,
  Flex,
  Text,
  Image,
  useColorModeValue,
  Badge,
  Divider,
  Button,
  Collapse
} from '@chakra-ui/react';
import { FaGraduationCap } from 'react-icons/fa';
import { BsFillBriefcaseFill } from 'react-icons/bs';
import {
  PageSlideFade,
  StaggerChildren,
  CardTransition
} from 'components/shared/animations/page-transitions';
import { MotionBox } from 'components/shared/animations/motion';
import { companies as companiesData, institutes as institutesData } from 'data/data';
import PageLayout from 'components/layouts/pageLayout';
import Header from 'components/shared/header';
import { useLinkColor } from 'components/theme';

interface CardData {
  title: string;
  role: string;
  skills: string[];
  period: string;
  logo: string;
  alt?: string;
  points?: string[];
}

interface AboutProps {
  companies: CardData[];
  institutes: CardData[];
}

const MAX_CONTENT_WIDTH = '960px';
const CARD_SPACING = 6;
const LOGO_SIZE = { base: 14, md: 20 };
const INITIAL_POINTS_VISIBLE = 3;

const Card: React.FC<CardData> = ({ title, role, skills, period, logo, alt, points = [] }) => {
   const bgGradient = useColorModeValue(
     'linear(to-br, white, gray.50)',
     'linear(to-br, gray.800, gray.900)'
   );
   const borderColor = useColorModeValue('gray.200', 'gray.700');
   const turquoise = useColorModeValue('cyan.500', 'cyan.400');
   const headingColor = useColorModeValue('gray.900', 'white');
   const textColor = useColorModeValue('gray.600', 'gray.100');
   const skillBg = useColorModeValue('gray.100', 'gray.700');

  const [expanded, setExpanded] = useState(false);

  const firstThree = useMemo(() => points.slice(0, INITIAL_POINTS_VISIBLE), [points]);
  const remaining = useMemo(() => points.slice(INITIAL_POINTS_VISIBLE), [points]);
  const collapseId = useMemo(
    () => `${title.replace(/\s+/g, '-').toLowerCase()}-points`,
    [title]
  );

  return (
    <CardTransition>
      <MotionBox >
        <Box
          px={{ base: 4, sm: 5, md: 6 }}
          py={{ base: 5, sm: 5, md: 6 }}
          borderWidth="1px"
          borderColor={borderColor}
          bgGradient={bgGradient}
          position="relative"
          rounded="2xl"
          shadow="md"
          _hover={{ shadow: '2xl', borderColor: turquoise, transform: 'translateY(-8px)' }}
          transition="all 0.3s ease"
          overflow="hidden"
        >
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            h={{ base: '2px', md: '3px' }}
            bgGradient="linear(to-r, cyan.400, blue.500, purple.500)"
          />

          <Flex
            justifyContent="space-between"
            gap={{ base: 4, md: 6 }}
            flexDir={{ base: 'column', md: 'row' }}
          >
            <Flex
              flex={1}
              gap={{ base: 3, sm: 4 }}
              align={{ base: 'center', md: 'flex-start' }}
              flexDir={{ base: 'column', sm: 'row' }}
            >
              <Box position="relative" flexShrink={0}>
                <Box
                  position="absolute"
                  top="-2px"
                  left="-2px"
                  right="-2px"
                  bottom="-2px"
                  rounded="full"
                  bg="white"
                  opacity={1}
                />
                <Image
          
                  rounded="full"
                  boxSize={LOGO_SIZE}
                  objectFit="cover"
                  mx={{ base: 'auto', sm: '0' }}
                  fallbackSrc="/assets/images/placeholder.png"
                  src={logo}
                  alt={alt || `${title} logo`}
                  position="relative"
                  shadow="lg"
                />
              </Box>

              <Stack spacing={{ base: 2, md: 3 }} flex={1} w="full">
                <Box textAlign={{ base: 'center', sm: 'left' }}>
                  <Heading
                    fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
                    fontWeight="700"
                    color={headingColor}              
                    letterSpacing="-0.02em"
                    lineHeight="1.3"
                  >
                    {title}
                  </Heading>
                  <Text
                    fontSize={{ base: 'sm', md: 'md' }}
                    color={textColor}                 
                    fontWeight="500"
                    mt={1}
                  >
                    {role}
                  </Text>
                </Box>

                <Box display={{ base: 'block', md: 'none' }} textAlign={{ base: 'center', sm: 'left' }}>
                  <Badge
                    colorScheme="cyan"
                    fontSize={{ base: 'xs', sm: 'sm' }}
                    px={{ base: 2, sm: 3 }}
                    py={1}
                    rounded="full"
                    fontWeight="600"
                  >
                    {period}
                  </Badge>
                </Box>
              </Stack>
            </Flex>

            <Stack display={{ base: 'none', md: 'flex' }} align="flex-end" justify="flex-start" minW="140px">
              <Badge colorScheme="cyan" fontSize="sm" px={4} py={2} rounded="full" fontWeight="600">
                {period}
              </Badge>
            </Stack>
          </Flex>

          {points.length > 0 && (
            <Box mt={{ base: 3, md: 4 }} w="full">
              <VStack align="stretch" spacing={2}>
                {firstThree.map((point, idx) => (
                  <Flex key={idx} align="start" gap={2}>
                    <Box mt={2} w={1.5} h={1.5} rounded="full" bg={turquoise} flexShrink={0} />
                    <Text
                      fontSize={{ base: 'xs', sm: 'sm' }}
                      color={textColor}
                      lineHeight="1.6"
                      textAlign="start"
                    >
                      {point}
                    </Text>
                  </Flex>
                ))}
              </VStack>

              {remaining.length > 0 && (
                <>
                  <Collapse in={expanded} animateOpacity>
                    <VStack id={collapseId} align="stretch" spacing={2} mt={2}>
                      {remaining.map((point, idx) => (
                        <Flex key={`more-${idx}`} align="start" gap={2}>
                          <Box mt={2} w={1.5} h={1.5} rounded="full" bg={turquoise} flexShrink={0} />
                          <Text
                            fontSize={{ base: 'xs', sm: 'sm' }}
                            color={textColor}
                            lineHeight="1.6"
                            textAlign="start"
                          >
                            {point}
                          </Text>
                        </Flex>
                      ))}
                    </VStack>
                  </Collapse>

                  <Button
                    onClick={() => setExpanded(v => !v)}
                    variant="link"
                    colorScheme="cyan"
                    size="sm"
                    mt={2}
                    alignSelf={{ base: 'center', sm: 'flex-start' }}
                    px={0}
                    aria-expanded={expanded}
                    aria-controls={collapseId}
                    fontSize={{ base: 'xs', sm: 'sm' }}
                  >
                    {expanded ? 'See less' : `See more (${remaining.length})`}
                  </Button>
                </>
              )}
            </Box>
          )}

          <Box mt={{ base: 2, md: 3 }} w="full">
            <Flex flexWrap="wrap" gap={2} justify={{ base: 'center', sm: 'flex-start' }}>
              {skills.map((skill, idx) => (
                <Badge
                  key={idx}
                  colorScheme="gray"
                  variant="subtle"
                  px={{ base: 2, sm: 3 }}
                  py={1}
                  rounded="md"
                  fontSize={{ base: '2xs', sm: 'xs' }}
                  fontWeight="600"
                  bg={skillBg}
                >
                  {skill}
                </Badge>
              ))}
            </Flex>
          </Box>
        </Box>
      </MotionBox>
    </CardTransition>
  );
};

const About: React.FC<AboutProps> = ({ companies, institutes }) => {
  const sectionTitleColor = useColorModeValue('gray.900', 'white');
  const dividerColor = useColorModeValue('gray.500', 'gray.200');
  const linkColor = useLinkColor()

  return (
    <PageLayout title="About" description="My educational and professional journey so far">
      <PageSlideFade>
        <StaggerChildren>
          <MotionBox>
            <Box as="section" aria-labelledby="career-heading">
              <Flex
                alignItems="center"
                gap={{ base: 3, md: 4 }}
                mb={{ base: 8, md: 8 }}
                flexWrap="wrap"
              >
                <Flex
                  align="center"
                  justify="center"
                  w={{ base: 10, md: 12 }}
                  h={{ base: 10, md: 12 }}
                  rounded="xl"
                  bg="#2d3748"
                  shadow="lg"
                  flexShrink={0}
                >
                  <Box as={BsFillBriefcaseFill} boxSize={{ base: '20px', md: '24px' }} color="white" />
                </Flex>
                <Header
                  id="career-heading"
                  color={linkColor}    
                  mt={0} mb={2}
                >
                  Career
                </Header>
              </Flex>
            </Box>
          </MotionBox>

          <VStack
            spacing={CARD_SPACING}
            marginBottom={{ base: 12, md: 16 }}
            align="stretch"
            mt={{ base: 6, md: 8 }}
            maxW={MAX_CONTENT_WIDTH}
            mx="auto"
            w="full"
            px={{ base: 4, sm: 6, md: 0 }}
          >
            {companies.map((company, index) => (
              <MotionBox key={company.title || index}>
                <Card {...company} />
              </MotionBox>
            ))}
          </VStack>

          <Divider my={{ base: 8, md: 12 }} borderColor={dividerColor} opacity={0.6} />

          {/* Education Section */}
          <MotionBox>
            <Box as="section" aria-labelledby="education-heading">
              <Flex
                alignItems="center"
                gap={{ base: 3, md: 4 }}
                mb={{ base: 6, md: 8 }}
                flexWrap="wrap"
              >
                <Flex
                  align="center"
                  justify="center"
                  w={{ base: 10, md: 12 }}
                  h={{ base: 10, md: 12 }}
                  rounded="xl"
                  bgGradient="linear(to-br, purple.400, pink.500)"
                  shadow="lg"
                  flexShrink={0}
                >
                  <Box as={FaGraduationCap} boxSize={{ base: '20px', md: '24px' }} color="white" />
                </Flex>
                <Heading
                  id="education-heading"
                  fontSize={{ base: 'xl', sm: '2xl', md: '4xl' }}
                  fontWeight="800"
                  color={sectionTitleColor}    
                  letterSpacing="-0.02em"
                >
                  Education
                </Heading>
              </Flex>
            </Box>
          </MotionBox>

          <VStack
            spacing={CARD_SPACING}
            marginBottom={6}
            align="stretch"
            mt={{ base: 6, md: 8 }}
            maxW={MAX_CONTENT_WIDTH}
            mx="auto"
            w="full"
            px={{ base: 4, sm: 6, md: 0 }}
          >
            {institutes.map((institute, index) => (
              <MotionBox key={institute.title || index}>
                <Card {...institute} />
              </MotionBox>
            ))}
          </VStack>
        </StaggerChildren>
      </PageSlideFade>
    </PageLayout>
  );
};

export function getStaticProps() {
  return {
    props: {
      companies: companiesData,
      institutes: institutesData
    }
  };
}

export default About;