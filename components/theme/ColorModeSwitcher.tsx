import { useColorMode, useColorModeValue, IconButtonProps } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { MotionBox } from '../shared/animations/motion';
import { useRef, useEffect } from 'react';

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>;

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = () => {
  const { toggleColorMode } = useColorMode();
  const mode = useColorModeValue('dark', 'light');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Preload audio
    audioRef.current = new Audio('/assets/audios/lightswitch.mp3');
    audioRef.current.volume = 0.05;
    audioRef.current.preload = 'auto';
  }, []);

  const handleClick = () => {
    if (audioRef.current) {
      // Reset to start and play
      audioRef.current.currentTime = mode === 'dark' ? 0 : 0.5; // 0s for on, 0.5s for off
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
    toggleColorMode();
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <MotionBox
        onClick={handleClick}
        key={mode === 'dark' ? 'dark-icon' : 'light-icon'}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
        cursor="pointer"
        fontSize={['2xl', '3xl', '3xl']}
      >
        {mode === 'dark' ? '🌙' : '🌤'}
      </MotionBox>
    </AnimatePresence>
  );
};