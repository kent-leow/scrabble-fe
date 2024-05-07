import { FC, useCallback, useState } from 'react';
import AnimatedContainer, {
  AnimatedContainerProps,
} from '~/components/templates/AnimatedContainer';

const useAnimatedContainer = () => {
  const [trigger, setTrigger] = useState<boolean>(false);

  const AnimatedBox: FC<AnimatedContainerProps> = useCallback(
    ({ children, ...props }) => {
      return (
        <AnimatedContainer trigger={trigger} {...props}>
          {children}
        </AnimatedContainer>
      );
    },
    [trigger],
  );

  return [AnimatedBox, () => setTrigger((prev) => !prev)] as const;
};

export default useAnimatedContainer;
