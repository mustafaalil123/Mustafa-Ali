import React from 'react';
import { motion } from 'framer-motion';
import { stagger, fadeInUp } from '../shared/animations/framerAnimations';
import {
  useColorModeValue,
  IconButton,
  Flex,
  Box,
  ListItem,
  AspectRatio,
  Image,
  Skeleton,
  Link
} from '@chakra-ui/react';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { AiOutlineGithub } from 'react-icons/ai';
import { MotionBox, MotionFlex, MotionList, MotionText } from 'components/shared/animations/motion';

const ProjectLayoutMed = ({ project }) => {
  return (
    <Flex
      display={['flex', 'flex', 'none']}
      flexDirection="column"
      rounded="xl"
      borderWidth="1px"
      borderColor={useColorModeValue('gray.600', 'gray.700')}
      w="full"
      minH="20rem"
      textAlign="left"
      align="start"
      shadow="md"
      _hover={{ border: 'md', shadow: 'lg' }}
      overflow="hidden"
      position="relative"
    >
      <Box position="relative" w="full" h="12rem">
        <a href={project.site} target="_blank" rel="noopener noreferrer">
          <AspectRatio ratio={1.85 / 1} w="100%" h="100%">
            <Image
              src={project.imageLight}
              fallback={<Skeleton />}
              width="full"
              height="full"
              objectFit="cover"
              opacity={0.7}
              _hover={{ opacity: 1 }}
              transition="opacity 0.3s"
            />
          </AspectRatio>
        </a>
      </Box>

      <MotionBox
        initial="initial"
        animate="animate"
        width="full"
        px="5"
        py="4"
        bg={useColorModeValue('white', 'gray.800')}
      >
        <MotionBox variants={stagger}>
          <a href={project.site} target="_blank" rel="noopener noreferrer">
            <MotionText
              variants={fadeInUp}
              fontSize="xl"
              fontWeight="bold"
              color={useColorModeValue('gray.900', 'gray.100')}
              mb="2"
            >
              {project.title}
            </MotionText>
          </a>
          
          <MotionText
            variants={fadeInUp}
            fontSize="sm"
            color={useColorModeValue('gray.700', 'gray.300')}
            mb="3"
          >
            {project.description}
          </MotionText>

          {project.techStack && (
            <MotionList
              variants={fadeInUp}
              display="flex"
              flexWrap="wrap"
              fontSize="xs"
              justifyContent="start"
              mb="3"
              color={useColorModeValue('gray.600', 'gray.400')}
              fontWeight="semibold"
            >
              {project.techStack.map((s, index) => (
                <ListItem key={index} mr="3" mb="1">
                  <i>{s}</i>
                </ListItem>
              ))}
            </MotionList>
          )}

          <MotionFlex variants={fadeInUp} justifyContent="start">
            {project.gitHub && (
              <Link mr={2} href={project.gitHub} isExternal>
                <IconButton
                  colorScheme="gray"
                  rounded="full"
                  size="sm"
                  aria-label="GitHub Repository"
                  icon={<AiOutlineGithub />}
                />
              </Link>
            )}
            <Link href={project.site} isExternal>
              <IconButton
                colorScheme="gray"
                rounded="full"
                size="sm"
                aria-label="Visit Site"
                icon={<HiOutlineExternalLink />}
              />
            </Link>
          </MotionFlex>
        </MotionBox>
      </MotionBox>
    </Flex>
  );
};

const LeftProjectLayoutLarge = ({ project }) => {
  return (
    <Flex width="full" display={['none', 'none', 'flex']} position="relative" minH="24rem">
      <MotionBox
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ x: 500, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          transition: {
            duration: 0.5,
            ease: 'easeInOut'
          }
        }}
        rounded="xl"
        borderWidth="1px"
        borderColor={useColorModeValue('gray.600', 'gray.700')}
        w="75%"
        h="24rem"
        shadow="md"
        _hover={{ border: 'md', shadow: 'lg' }}
        overflow="hidden"
        position="relative"
      >
        <a href={project.site} target="_blank" rel="noopener noreferrer">
          <AspectRatio ratio={1.85 / 1} w="100%" h="100%" rounded="xl">
            <Image
              src={project.imageLight}
              fallback={<Skeleton />}
              width="full"
              height="full"
              position="absolute"
              rounded="xl"
              objectFit="cover"
              opacity={0.5}
              _hover={{ opacity: 1 }}
              transition="opacity 0.3s"
            />
          </AspectRatio>
        </a>
      </MotionBox>
      
      <MotionBox
        initial="initial"
        animate="animate"
        width="45%"
        rounded="lg"
        my="auto"
        zIndex="10"
        ml="-8rem"
        textAlign="right"
      >
        <motion.div variants={stagger}>
          <a href={project.site} target="_blank" rel="noopener noreferrer">
            <MotionText
              variants={fadeInUp}
              fontSize="3xl"
              fontWeight="bold"
              color={useColorModeValue('gray.900', 'gray.100')}
              textAlign="right"
            >
              {project.title}
            </MotionText>
          </a>
          
          <Box width="full" mt="2">
            <MotionText
              variants={fadeInUp}
              bg={useColorModeValue('gray.200', 'gray.700')}
              rounded="lg"
              textAlign="right"
              p="4"
              fontSize="md"
              shadow="lg"
            >
              {project.description}
            </MotionText>
            
            {project.techStack && (
              <MotionList
                variants={fadeInUp}
                display="flex"
                flexWrap="wrap"
                fontSize="sm"
                justifyContent="flex-end"
                mt="3"
                color={useColorModeValue('gray.900', 'gray.100')}
                fontWeight="bold"
              >
                {project.techStack.map((s, index) => (
                  <ListItem key={index} ml="3" mb="1">
                    <i>{s}</i>
                  </ListItem>
                ))}
              </MotionList>
            )}
          </Box>

          <MotionFlex variants={fadeInUp} pt={2} mt={1} justifyContent="flex-end">
            {project.gitHub && (
              <Link mr={2} href={project.gitHub} isExternal>
                <IconButton
                  colorScheme="gray"
                  rounded="full"
                  size="md"
                  aria-label="GitHub Repository"
                  icon={<AiOutlineGithub />}
                />
              </Link>
            )}
            <Link href={project.site} isExternal>
              <IconButton
                colorScheme="gray"
                rounded="full"
                size="md"
                aria-label="Visit Site"
                icon={<HiOutlineExternalLink />}
              />
            </Link>
          </MotionFlex>
        </motion.div>
      </MotionBox>
    </Flex>
  );
};

const RightProjectLayoutLarge = ({ project }) => {
  return (
    <Flex width="full" display={['none', 'none', 'flex']} position="relative" minH="24rem">
      <MotionBox
        initial="initial"
        animate="animate"
        width="45%"
        rounded="lg"
        my="auto"
        zIndex="10"
        mr="-8rem"
        textAlign="left"
      >
        <motion.div variants={stagger}>
          <a href={project.site} target="_blank" rel="noopener noreferrer">
            <MotionText
              variants={fadeInUp}
              fontSize="3xl"
              fontWeight="bold"
              color={useColorModeValue('gray.900', 'gray.100')}
              textAlign="left"
            >
              {project.title}
            </MotionText>
          </a>
          
          <Box width="full" mt="2">
            <MotionText
              variants={fadeInUp}
              bg={useColorModeValue('gray.200', 'gray.700')}
              rounded="lg"
              textAlign="left"
              p="4"
              fontSize="md"
              shadow="lg"
            >
              {project.description}
            </MotionText>
            
            {project.techStack && (
              <MotionList
                variants={fadeInUp}
                display="flex"
                flexWrap="wrap"
                fontSize="sm"
                justifyContent="flex-start"
                mt="3"
                color={useColorModeValue('gray.900', 'gray.100')}
                fontWeight="bold"
              >
                {project.techStack.map((s, index) => (
                  <ListItem key={index} mr="3" mb="1">
                    <i>{s}</i>
                  </ListItem>
                ))}
              </MotionList>
            )}
          </Box>

          <MotionFlex variants={fadeInUp} pt={2} mt={1} justifyContent="flex-start">
            {project.gitHub && (
              <Link mr={2} href={project.gitHub} isExternal>
                <IconButton
                  colorScheme="gray"
                  rounded="full"
                  size="md"
                  aria-label="GitHub Repository"
                  icon={<AiOutlineGithub />}
                />
              </Link>
            )}
            <Link href={project.site} isExternal>
              <IconButton
                colorScheme="gray"
                rounded="full"
                size="md"
                aria-label="Visit Site"
                icon={<HiOutlineExternalLink />}
              />
            </Link>
          </MotionFlex>
        </motion.div>
      </MotionBox>
      
      <MotionBox
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ x: -500, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          transition: {
            duration: 0.5,
            ease: 'easeInOut'
          }
        }}
        rounded="xl"
        borderWidth="1px"
        borderColor={useColorModeValue('gray.600', 'gray.700')}
        w="75%"
        h="24rem"
        shadow="md"
        _hover={{ border: 'md', shadow: 'lg' }}
        overflow="hidden"
        position="relative"
      >
        <a href={project.site} target="_blank" rel="noopener noreferrer">
          <AspectRatio ratio={1.85 / 1} w="100%" h="100%" rounded="xl">
            <Image
              src={project.imageLight}
              fallback={<Skeleton />}
              width="full"
              height="full"
              position="absolute"
              rounded="xl"
              objectFit="cover"
              opacity={0.5}
              _hover={{ opacity: 1 }}
              transition="opacity 0.3s"
            />
          </AspectRatio>
        </a>
      </MotionBox>
    </Flex>
  );
};

export { LeftProjectLayoutLarge, RightProjectLayoutLarge, ProjectLayoutMed };
