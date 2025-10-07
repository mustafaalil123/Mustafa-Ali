import * as React from 'react';
import { Image, Box } from '@chakra-ui/react';
import { BlurhashCanvas } from 'react-blurhash';

type LazyImageProps = {
  src: string;
  blurHash?: string;           // make optional (fallback if missing)
  alt?: string;
  width?: number;              // pixels for both BlurhashCanvas and Image
  height?: number;             // pixels for both BlurhashCanvas and Image
  rounded?: string;            // e.g. 'md' | 'lg' | 'full' | '8px'
  fallbackSrc?: string;        // optional custom placeholder
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
};

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  blurHash,
  alt = 'image',
  width = 48,          // sensible defaults if not provided
  height = 48,
  rounded = 'md',
  fallbackSrc = '/assets/images/placeholder.png',
  objectFit = 'cover',
}) => {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <Box
      position="relative"
      width={`${width}px`}
      height={`${height}px`}
      overflow="hidden"
      borderRadius={rounded}
    >
      {/* Blurhash placeholder (only if we have a hash and not loaded yet) */}
      {!loaded && blurHash && (
        <BlurhashCanvas
          hash={blurHash}
          width={width}
          height={height}
          punch={1}
          style={{ display: 'block' }}
        />
      )}

      {/* Fallback static placeholder if no blurhash */}
      {!loaded && !blurHash && (
        <Image
          src={fallbackSrc}
          alt="placeholder"
          width={width}
          height={height}
          objectFit={objectFit}
          borderRadius={rounded}
        />
      )}

      {/* Actual image (will cover the blurhash once loaded) */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        objectFit={objectFit}
        borderRadius={rounded}
        loading="lazy"
        fallbackSrc={fallbackSrc}
        onLoad={() => setLoaded(true)}
        // keep it above the blurhash and fade-in nicely
        position="absolute"
        inset={0}
        opacity={loaded ? 1 : 0}
        transition="opacity 0.25s ease"
      />
    </Box>
  );
};

export default React.memo(LazyImage);
