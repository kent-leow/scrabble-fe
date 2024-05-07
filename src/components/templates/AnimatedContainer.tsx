import Box from '@mui/material/Box';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { AnimateCSS } from '~/utils/enums/animateCSS.enum';

interface AnimatedContainerProps {
  /**
   * Enable or disable animation.
   * @default true
   */
  animate?: boolean;
  /**
   * Animate forward or backward.
   * @default true
   */
  forward?: boolean;
  /**
   * Customise the forward animation.
   * @default AnimateCSS.BOUNCE_IN
   */
  forwardAnimation?: AnimateCSS;
  /**
   * Customise the backward animation.
   * @default AnimateCSS.BOUNCE_OUT
   */
  backwardAnimation?: AnimateCSS;
  /**
   * Duration of the animation.
   */
  duration?: number;
  /**
   * Trigger the animation by changing the trigger value.
   * @default false
   */
  trigger?: boolean;
  children: ReactNode;
}

const AnimatedContainer: FC<AnimatedContainerProps> = ({
  animate = true,
  forward = true,
  forwardAnimation = AnimateCSS.BOUNCE_IN,
  backwardAnimation = AnimateCSS.BOUNCE_OUT,
  duration,
  trigger = false,
  children,
}) => {
  const ref = useRef<HTMLDivElement>();
  const [action, _setAction] = useState<boolean>(animate);
  const [notifier, setNotifier] = useState<boolean>(trigger);

  useEffect(() => {
    setNotifier(trigger);
  }, [trigger]);

  useEffect(() => {
    if (duration) {
      ref.current?.style.setProperty('--animate-duration', `${duration}ms`);
    } else {
      ref.current?.style.removeProperty('--animate-duration');
    }
  }, [duration]);

  useEffect(() => {
    if (animate) {
      ref.current?.classList.remove(backwardAnimation, forwardAnimation);
      setTimeout(
        () =>
          ref.current?.classList.add(
            forward ? forwardAnimation : backwardAnimation,
          ),
        25,
      );
    }
  }, [action, forward, notifier, animate]);

  return (
    <Box ref={ref} className="animate__animated">
      {children}
    </Box>
  );
};

export default AnimatedContainer;
