// import React from 'react'
// import { motion } from 'framer-motion'
// import { useRouter, NextRouter } from 'next/router'
// import { stagger, fadeInUp } from '../shared/animations/framerAnimations'
// import {
//   useColorModeValue,
//   IconButton,
//   Flex,
//   Box,
//   ListItem,
//   AspectRatio,
//   Image,
//   Skeleton,
//   Link as ChakraLink,
// } from '@chakra-ui/react'
// import { HiOutlineExternalLink } from 'react-icons/hi'
// import { AiOutlineGithub } from 'react-icons/ai'
// import {
//   MotionBox,
//   MotionFlex,
//   MotionList,
//   MotionText,
// } from 'components/shared/animations/motion'

// const goToDetail = (router: NextRouter, id: number) => {
//   router.push({
//     pathname: '/ProjectDetail',
//     query: { id },
//   })
// }

// const ProjectLayoutMed = ({ project }) => {
//   const router = useRouter()
//   const bgOverlay = useColorModeValue('gray.100', 'gray.900')

//   return (
//     <Flex
//       display={['flex', 'flex', 'none']}
//       rounded="xl"
//       borderWidth="1px"
//       borderColor={useColorModeValue('gray.600', 'gray.700')}
//       w="full"
//       minH="20rem" // allow card to grow, but keep a minimum height
//       textAlign="left"
//       align="start"
//       shadow="md"
//       _hover={{ border: 'md', shadow: 'lg' }}
//       position="relative"
//     >
//       {/* left side image and overlay, whole side clickable */}
//       <Box
//         w="100%"
//         h="100%"
//         cursor="pointer"
//         onClick={() => goToDetail(router, project.id)}
//         position="relative"
//       >
//         <AspectRatio ratio={1.85 / 1} w="100%" rounded="xl">
//           <Image
//             src={project.imageLight}
//             fallback={<Skeleton />}
//             width="full"
//             height="full"
//             position="absolute"
//             rounded="xl"
//             objectFit="cover"
//             opacity={0.5}
//             _hover={{ opacity: 1 }}
//           />
//         </AspectRatio>
//         <Box
//           width="full"
//           height="full"
//           position="absolute"
//           top={0}
//           left={0}
//           bg={bgOverlay}
//           opacity={useColorModeValue('0.5', '1')}
//           rounded="xl"
//         />
//       </Box>

//       <MotionBox
//         initial="initial"
//         animate="animate"
//         width={['full', '70%']}
//         rounded="lg"
//         my="auto"
//         px="6"
//         py="3"
//         position="relative"
//         zIndex="10"
//       >
//         <MotionBox variants={stagger}>
//           {/* title and description clickable to detail */}
//           <Box
//             cursor="pointer"
//             onClick={() => goToDetail(router, project.id)}
//           >
//             <MotionText
//               variants={fadeInUp}
//               fontSize="2xl"
//               fontWeight="bold"
//               color={useColorModeValue('gray.900', 'gray.100')}
//             >
//               {project.title}
//             </MotionText>
//             <Box width="full">
//               <MotionText
//                 variants={fadeInUp}
//                 bg={useColorModeValue('gray.200', 'gray.700')}
//                 rounded="lg"
//                 align="left"
//                 p="4"
//                 fontSize="sm"
//                 noOfLines={[3, 4]} // clamp description so there is space for tech stack
//               >
//                 {project.description}
//               </MotionText>
//               {project.techStack && (
//                 <MotionList
//                   variants={fadeInUp}
//                   display="flex"
//                   fontSize="xs"
//                   justifyContent="start"
//                   mt="3"
//                   color={useColorModeValue('gray.900', 'gray.100')}
//                   fontWeight="bold"
//                 >
//                   {project.techStack.map((s, index) => (
//                     <ListItem key={index} mr="2">
//                       <i>{s}</i>
//                     </ListItem>
//                   ))}
//                 </MotionList>
//               )}
//             </Box>
//           </Box>

//           {/* buttons for external links */}
//           <MotionFlex variants={fadeInUp} pt={2} mt={1} justifyContent="start">
//             {project.gitHub && (
//               <ChakraLink mr={2} href={project.gitHub} isExternal>
//                 <IconButton
//                   colorScheme="gray"
//                   rounded="full"
//                   size="md"
//                   aria-label="github"
//                   icon={<AiOutlineGithub />}
//                 />
//               </ChakraLink>
//             )}
//             <ChakraLink href={project.site} isExternal>
//               <IconButton
//                 colorScheme="gray"
//                 rounded="full"
//                 size="md"
//                 aria-label="external link"
//                 icon={<HiOutlineExternalLink />}
//               />
//             </ChakraLink>
//           </MotionFlex>
//         </MotionBox>
//       </MotionBox>
//     </Flex>
//   )
// }

// const LeftProjectLayoutLarge = ({ project }) => {
//   const router = useRouter()

//   return (
//     <Flex width="full" display={['none', 'none', 'flex']}>
//       <MotionBox
//         whileHover={{ scale: 1.02 }}
//         whileTap={{ scale: 0.98 }}
//         initial={{ x: 500, opacity: 0 }}
//         animate={{
//           x: 0,
//           opacity: 1,
//           transition: {
//             duration: 0.5,
//             ease: 'easeInOut',
//           },
//         }}
//         rounded="xl"
//         borderWidth="1px"
//         borderColor={useColorModeValue('gray.600', 'gray.700')}
//         w="80%"
//         h="24rem"
//         textAlign="left"
//         align="start"
//         shadow="md"
//         _hover={{ border: 'md', shadow: 'lg' }}
//         overflow="hidden"
//         position="relative"
//         cursor="pointer"
//         onClick={() => goToDetail(router, project.id)}
//       >
//         <AspectRatio ratio={1.85 / 1} w="100%" h="100%" rounded="xl">
//           <Image
//             src={project.imageLight}
//             fallback={<Skeleton />}
//             width="full"
//             height="full"
//             position="absolute"
//             rounded="xl"
//             objectFit="cover"
//             opacity={0.5}
//             _hover={{ opacity: 1 }}
//           />
//         </AspectRatio>
//       </MotionBox>

//       <MotionBox
//         initial="initial"
//         animate="animate"
//         width="40%"
//         rounded="lg"
//         my="auto"
//         zIndex="10"
//         ml="-6rem"
//         align="right"
//       >
//         <motion.div variants={stagger}>
//           <Box
//             className="text-right"
//             cursor="pointer"
//             onClick={() => goToDetail(router, project.id)}
//           >
//             <MotionText
//               variants={fadeInUp}
//               fontSize="3xl"
//               fontWeight="bold"
//               color={useColorModeValue('gray.900', 'gray.100')}
//             >
//               {project.title}
//             </MotionText>
//           </Box>

//           <Box width="full">
//             <MotionText
//               variants={fadeInUp}
//               bg={useColorModeValue('gray.200', 'gray.700')}
//               rounded="lg"
//               align="right"
//               p="4"
//               fontSize="md"
//             >
//               {project.description}
//             </MotionText>
//             {project.techStack && (
//               <MotionList
//                 variants={fadeInUp}
//                 display="flex"
//                 fontSize="sm"
//                 justifyContent="end"
//                 mt="3"
//                 color={useColorModeValue('gray.900', 'gray.100')}
//                 fontWeight="bold"
//               >
//                 {project.techStack.map((s, index) => (
//                   <ListItem key={index} mr="3">
//                     <i>{s}</i>
//                   </ListItem>
//                 ))}
//               </MotionList>
//             )}
//           </Box>

//           <MotionFlex variants={fadeInUp} pt={2} mt={1} justifyContent="end">
//             {project.gitHub && (
//               <ChakraLink mr={2} href={project.gitHub} isExternal>
//                 <IconButton
//                   colorScheme="gray"
//                   rounded="full"
//                   size="md"
//                   aria-label="github"
//                   icon={<AiOutlineGithub />}
//                 />
//               </ChakraLink>
//             )}
//             <ChakraLink href={project.site} isExternal>
//               <IconButton
//                 colorScheme="gray"
//                 rounded="full"
//                 size="md"
//                 aria-label="external link"
//                 icon={<HiOutlineExternalLink />}
//               />
//             </ChakraLink>
//           </MotionFlex>
//         </motion.div>
//       </MotionBox>
//     </Flex>
//   )
// }

// const RightProjectLayoutLarge = ({ project }) => {
//   const router = useRouter()

//   return (
//     <Flex width="full" display={['none', 'none', 'flex']}>
//       <MotionBox
//         initial="initial"
//         animate="animate"
//         width="40%"
//         rounded="lg"
//         my="auto"
//         zIndex="10"
//         mr="-6rem"
//         align="left"
//       >
//         <motion.div variants={stagger}>
//           <Box
//             cursor="pointer"
//             onClick={() => goToDetail(router, project.id)}
//           >
//             <MotionText
//               variants={fadeInUp}
//               fontSize="3xl"
//               fontWeight="bold"
//               color={useColorModeValue('gray.900', 'gray.100')}
//             >
//               {project.title}
//             </MotionText>
//           </Box>

//           <Box width="full">
//             <MotionText
//               variants={fadeInUp}
//               bg={useColorModeValue('gray.200', 'gray.700')}
//               rounded="lg"
//               align="left"
//               p="4"
//               fontSize="md"
//             >
//               {project.description}
//             </MotionText>
//             {project.techStack && (
//               <MotionList
//                 variants={fadeInUp}
//                 display="flex"
//                 fontSize="sm"
//                 justifyContent="start"
//                 mt="3"
//                 color={useColorModeValue('gray.900', 'gray.100')}
//                 fontWeight="bold"
//               >
//                 {project.techStack.map((s, index) => (
//                   <ListItem key={index} mr="3">
//                     <i>{s}</i>
//                   </ListItem>
//                 ))}
//               </MotionList>
//             )}
//           </Box>

//           <MotionFlex variants={fadeInUp} pt={2} mt={1} justifyContent="start">
//             {project.gitHub && (
//               <ChakraLink mr={2} href={project.gitHub} isExternal>
//                 <IconButton
//                   colorScheme="gray"
//                   rounded="full"
//                   size="md"
//                   aria-label="github"
//                   icon={<AiOutlineGithub />}
//                 />
//               </ChakraLink>
//             )}
//             <ChakraLink href={project.site} isExternal>
//               <IconButton
//                 colorScheme="gray"
//                 rounded="full"
//                 size="md"
//                 aria-label="external link"
//                 icon={<HiOutlineExternalLink />}
//               />
//             </ChakraLink>
//           </MotionFlex>
//         </motion.div>
//       </MotionBox>

//       <MotionBox
//         whileHover={{ scale: 1.02 }}
//         whileTap={{ scale: 0.98 }}
//         initial={{ x: 500, opacity: 0 }}
//         animate={{
//           x: 0,
//           opacity: 1,
//           transition: {
//             duration: 0.5,
//             ease: 'easeInOut',
//           },
//         }}
//         rounded="xl"
//         borderWidth="1px"
//         borderColor={useColorModeValue('gray.600', 'gray.700')}
//         w="80%"
//         h="24rem"
//         textAlign="left"
//         align="start"
//         shadow="md"
//         _hover={{ border: 'md', shadow: 'lg' }}
//         overflow="hidden"
//         position="relative"
//         cursor="pointer"
//         onClick={() => goToDetail(router, project.id)}
//       >
//         <AspectRatio ratio={1.85 / 1} w="100%" h="100%" rounded="xl">
//           <Image
//             src={project.imageLight}
//             fallback={<Skeleton />}
//             width="full"
//             height="full"
//             position="absolute"
//             rounded="xl"
//             objectFit="cover"
//             opacity={0.5}
//             _hover={{ opacity: 1 }}
//           />
//         </AspectRatio>
//       </MotionBox>
//     </Flex>
//   )
// }

// export { LeftProjectLayoutLarge, RightProjectLayoutLarge, ProjectLayoutMed }


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