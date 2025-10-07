import * as React from 'react';
import { HStack, VStack, Text, useColorModeValue, Link, Box } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import LazyImage from 'components/shared/lazy-image';
import { useLinkColor } from 'components/theme';
import { Tag } from 'components/shared/Tags';

// 👉 make a motion-enabled Chakra Box
const MotionBox = motion(Box);

interface ProjectCardProps {
  title: string;
  description: string;
  logo: string;
  blurHash: string;
  link: string;
  technologies: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  logo,
  blurHash,
  link,
  technologies
}) => {
  const linkColor = useLinkColor();
  const textColor = useColorModeValue('gray.500', 'gray.200');
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleOpen = () => setIsOpen((v) => !v);

  return (
    <MotionBox layout onClick={toggleOpen}>
      <HStack
        p={4}
        bg={useColorModeValue('white', 'gray.800')}
        rounded="xl"
        borderWidth="1px"
        borderColor={useColorModeValue('gray.100', 'gray.700')}
        w="100%"
        h="100%"
        textAlign="left"
        align="start"
        spacing={4}
        cursor="pointer"
        _hover={{ shadow: 'lg' }}
      >
       <LazyImage
  src={logo}
  blurHash={blurHash}
  width={33}
  height={33}
  rounded="md"
/>


        <VStack align="start" justify="flex-start" w="full">
          <VStack spacing={0} align="start" w="full">
            <MotionBox layout w="full">
              <HStack w="full" spacing={2} align="start">
                <Text
                  as={Link}
                  href={link}
                  fontWeight="bold"
                  fontSize="md"
                  noOfLines={1}
                  onClick={(e) => e.stopPropagation()}
                  color={linkColor}
                  isExternal
                >
                  {title}
                </Text>
                <HStack spacing="1" flexWrap="wrap">
                  {technologies.map((tech, index) => (
                    <Tag key={index} name={tech} mt="1px" interactive={false} />
                  ))}
                </HStack>
              </HStack>
            </MotionBox>

            <AnimatePresence initial={false} mode="wait">
              {!isOpen ? (
                <MotionBox
                  key="collapsed"
                  layout
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  w="full"
                >
                  <Text fontSize="sm" color={textColor} noOfLines={{ base: 2 }}>
                    {description}
                  </Text>
                </MotionBox>
              ) : (
                <MotionBox
                  key="expanded"
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  w="full"
                >
                  <Text fontSize="sm" color={textColor}>
                    {description}
                  </Text>
                </MotionBox>
              )}
            </AnimatePresence>
          </VStack>
        </VStack>
      </HStack>
    </MotionBox>
  );
};

export default ProjectCard;
