import * as React from 'react';
import {
  IconButton,
  Box,
  Flex,
  HStack,
  useColorModeValue
} from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { AnimatePresence } from 'framer-motion';
import { MotionImage } from '../shared/animations/motion';

type CarouselProps = {
  images: string[];
  showDots?: boolean;
  initialIndex?: number;
};

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const SWIPE_CONFIDENCE = 10000;
const swipePower = (offset: number, velocity: number) =>
  Math.abs(offset) * velocity;

const Carousel: React.FC<CarouselProps> = ({
  images,
  showDots = true,
  initialIndex = 0
}) => {
  const [direction, setDirection] = React.useState(0);
  const [index, setIndex] = React.useState(
    Math.min(Math.max(initialIndex, 0), Math.max(images.length - 1, 0))
  );
  // we use page only to force re-mount on motion
  const [page, setPage] = React.useState(0);

  const dotBg = useColorModeValue('gray.300', 'gray.600');
  const activeDotBg = useColorModeValue('gray.700', 'gray.200');

  const paginate = React.useCallback(
    (newDirection: number) => {
      if (!images.length) return;
      setDirection(newDirection);
      setPage((p) => p + newDirection);
      setIndex((prev) => {
        const next = prev + newDirection;
        if (next < 0) return images.length - 1;
        if (next >= images.length) return 0;
        return next;
      });
    },
    [images.length]
  );

  const goTo = (toIndex: number) => {
    if (toIndex === index || !images.length) return;
    const newDirection = toIndex > index ? 1 : -1;
    setDirection(newDirection);
    setPage((p) => p + newDirection);
    setIndex(() => {
      if (toIndex < 0) return 0;
      if (toIndex >= images.length) return images.length - 1;
      return toIndex;
    });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') paginate(1);
    if (e.key === 'ArrowLeft') paginate(-1);
  };

  if (!images || images.length === 0) {
    return (
      <Flex
        w="100%"
        h="100%"
        align="center"
        justify="center"
        borderRadius="md"
        bg={useColorModeValue('gray.100', 'gray.700')}
      >
        No images
      </Flex>
    );
  }

  return (
    <Flex
      w="100%"
      h="100%"
      position="relative"
      justifyContent="center"
      alignItems="center"
      tabIndex={0}
      onKeyDown={onKeyDown}
      outline="none"
      borderRadius="md"
    >
      <AnimatePresence initial={false} custom={direction}>
        <MotionImage
          key={page}
          position="absolute"
          width="100%"
          height="100%"
          objectFit="cover"
          borderRadius="md"
          src={images[index]}
          alt={`Slide ${index + 1}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -SWIPE_CONFIDENCE) paginate(1);
            else if (swipe > SWIPE_CONFIDENCE) paginate(-1);
          }}
        />
      </AnimatePresence>

      {/* Right button */}
      <Box position="absolute" right="12px" top="50%" transform="translateY(-50%)" zIndex={2}>
        <IconButton
          aria-label="Next image"
          icon={<BiRightArrowAlt />}
          onClick={() => paginate(1)}
          size="md"
          colorScheme="teal"
          borderRadius="full"
        />
      </Box>

      {/* Left button */}
      <Box position="absolute" left="12px" top="50%" transform="translateY(-50%)" zIndex={2}>
        <IconButton
          aria-label="Previous image"
          icon={<BiLeftArrowAlt />}
          onClick={() => paginate(-1)}
          size="md"
          colorScheme="teal"
          borderRadius="full"
        />
      </Box>

      {/* Dots */}
      {showDots && images.length > 1 && (
        <HStack
          position="absolute"
          bottom="10px"
          spacing={2}
          zIndex={2}
          px={3}
          py={1}
          borderRadius="full"
          bg={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
        >
          {images.map((_, i) => (
            <Box
              key={i}
              w="8px"
              h="8px"
              borderRadius="full"
              bg={i === index ? activeDotBg : dotBg}
              cursor="pointer"
              onClick={() => goTo(i)}
            />
          ))}
        </HStack>
      )}
    </Flex>
  );
};

export default Carousel;
