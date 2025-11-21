// pages/certificate.tsx
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
  Button,
  Collapse,
  Link as ChakraLink,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { FaCertificate } from 'react-icons/fa';

import {
  PageSlideFade,
  StaggerChildren,
  CardTransition
} from 'components/shared/animations/page-transitions';
import { MotionBox } from 'components/shared/animations/motion';
import PageLayout from 'components/layouts/pageLayout';
import Header from 'components/shared/header';
import { useLinkColor } from 'components/theme';

import type { CardData } from 'data/certificateData';
import { certifications } from 'data/certificateData';

const MAX_CONTENT_WIDTH = '960px';
const CARD_SPACING = 6;

const Card: React.FC<CardData> = ({
  title,
  role,
  skills = [],
  period,
  logo,
  alt,
  points = [],
  link
}) => {
  const bgGradient = useColorModeValue(
    'linear(to-br, white, gray.50)',
    'linear(to-br, gray.800, gray.900)'
  );
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const headingColor = useColorModeValue('gray.900', 'white');
  const textColor = useColorModeValue('gray.600', 'gray.100');
  const skillBg = useColorModeValue('gray.100', 'gray.700');
  const buttonBg = useColorModeValue('cyan.100', 'gray.700');
  const buttonBgHover = useColorModeValue('cyan.200', 'gray.600');
  const buttonColor = useColorModeValue('cyan.700', 'cyan.300');

  const [expanded, setExpanded] = useState(false);

  const firstThree = useMemo(() => points.slice(0, 3), [points]);
  const remaining = useMemo(() => points.slice(3), [points]);

  return (
    <CardTransition>
      <MotionBox>
        <Box
          position="relative"
          px={{ base: 4, sm: 5, md: 6 }}
          py={{ base: 5, sm: 5, md: 6 }}
          borderWidth="1px"
          borderColor={borderColor}
          bgGradient={bgGradient}
          rounded="2xl"
          shadow="md"
          transition="all 0.2s ease"
          overflow="hidden"
          _hover={{
            shadow: 'lg',
            transform: 'translateY(-2px)'
          }}
        >
          {/* Top Gradient Bar */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            h={{ base: '2px', md: '3px' }}
            bgGradient="linear(to-r, cyan.400, blue.500, purple.500)"
          />

          {/* Main Content */}
          <Flex
            justifyContent="space-between"
            gap={{ base: 4, md: 6 }}
            flexDir={{ base: 'column', md: 'row' }}
          >
            <Flex
              flex={1}
              gap={{ base: 3, sm: 4 }}
              flexDir={{ base: 'column', sm: 'row' }}
              align={{ base: 'flex-start', sm: 'center' }}
            >
              {/* Logo */}
              <Image
                rounded="full"
                boxSize={{ base: 14, md: 20 }}
                src={logo}
                alt={alt || title}
                objectFit="cover"
                fallbackSrc="/assets/images/placeholder.png"
              />

              {/* Text Content */}
              <Stack spacing={{ base: 2, md: 3 }}>
                <Heading
                  fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
                  color={headingColor}
                >
                  {title}
                </Heading>
                {role && (
                  <Text
                    fontSize={{ base: 'sm', md: 'md' }}
                    color={textColor}
                    textAlign="left"
                  >
                    {role}
                  </Text>
                )}
              </Stack>
            </Flex>

            {/* Period */}
            {period && (
              <Flex
                align="center"
                justify={{ base: 'flex-start', md: 'flex-end' }}
              >
                <Badge
                  colorScheme="cyan"
                  px={4}
                  py={2}
                  rounded="full"
                  fontWeight="600"
                  fontSize={{ base: 'xs', md: 'sm' }}
                  whiteSpace="nowrap"
                >
                  {period}
                </Badge>
              </Flex>
            )}
          </Flex>

          {/* Points */}
          <Box mt={4}>
            {firstThree.map((p, i) => (
              <Text
                key={i}
                fontSize="sm"
                color={textColor}
                mb={1}
                textAlign="left"
              >
                • {p}
              </Text>
            ))}

            {remaining.length > 0 && (
              <>
                <Collapse in={expanded}>
                  <Box mt={2}>
                    {remaining.map((p, i) => (
                      <Text
                        key={i}
                        fontSize="sm"
                        color={textColor}
                        mb={1}
                        textAlign="left"
                      >
                        • {p}
                      </Text>
                    ))}
                  </Box>
                </Collapse>

                <Button
                  variant="link"
                  colorScheme="cyan"
                  size="sm"
                  mt={2}
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? 'See less' : `See more (${remaining.length})`}
                </Button>
              </>
            )}
          </Box>

          {/* Skills and Visit button on same row */}
          {(skills.length > 0 || link) && (
            <Flex
              mt={4}
              justify="space-between"
              align="center"
              flexDir={{ base: 'column', sm: 'row' }}
              gap={4}
            >
              {skills.length > 0 && (
                <Wrap spacing={2}>
                  {skills.map((skill) => (
                    <WrapItem key={skill}>
                      <Box
                        px={2}
                        py={1}
                        rounded="full"
                        bg={skillBg}
                        fontSize="xs"
                        fontWeight="500"
                      >
                        {skill}
                      </Box>
                    </WrapItem>
                  ))}
                </Wrap>
              )}

              {link && (
                <ChakraLink
                  href={link}
                  isExternal
                  px={4}
                  py={2}
                  rounded="md"
                  fontSize="sm"
                  fontWeight="600"
                  bg={buttonBg}
                  color={buttonColor}
                  _hover={{
                    bg: buttonBgHover,
                    textDecoration: 'none'
                  }}
                >
                  Visit Certificate
                </ChakraLink>
              )}
            </Flex>
          )}
        </Box>
      </MotionBox>
    </CardTransition>
  );
};

const Certificate: React.FC = () => {
  const linkColor = useLinkColor();

  return (
    <PageLayout title="Certificate" description="My technical certifications">
      <PageSlideFade>
        <StaggerChildren>
          <MotionBox>
            <Box as="section" aria-labelledby="certification-heading">
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
                  bgGradient="linear(to-br, teal.400, blue.500)"
                  shadow="lg"
                  flexShrink={0}
                >
                  <Box
                    as={FaCertificate}
                    boxSize={{ base: '20px', md: '24px' }}
                    color="white"
                  />
                </Flex>

                <Header
                  id="certification-heading"
                  color={linkColor}
                  mt={0}
                  mb={0}
                >
                  Certifications
                </Header>
              </Flex>
            </Box>
          </MotionBox>

          <VStack
            spacing={CARD_SPACING}
            marginBottom={{ base: 10, md: 14 }}
            align="stretch"
            mt={{ base: 4, md: 6 }}
            maxW={MAX_CONTENT_WIDTH}
            mx="auto"
            w="full"
            px={{ base: 4, sm: 6, md: 0 }}
          >
            {certifications.map((cert, index) => (
              <MotionBox key={cert.title || index}>
                <Card {...cert} />
              </MotionBox>
            ))}
          </VStack>
        </StaggerChildren>
      </PageSlideFade>
    </PageLayout>
  );
};

export default Certificate;
