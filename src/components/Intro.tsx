import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from '@react-spring/web';

const Intro: React.FunctionComponent = () => {
  return (
    <div
      className='
        w-full h-full absolute
        bg-black
        grid grid-cols-1 grid-rows-2
        md:grid-rows-3 md:grid-cols-3
        place-items-center
        text-white'
    >
      <div
        className='
            font-anton
            text-white-smoke text-8xl
            place-self-stretch
            flex
            items-center
            justify-center
            md:row-start-2 md:col-start-2'
      >
        <Arrow animateDirection='left'>&lt;</Arrow>
        <Slash />
        <Arrow animateDirection='right'>&gt;</Arrow>
      </div>

      <div
        className='
            text-white-smoke
            font-montserrat
            text-3xl
            self-start
            md:place-self-stretch md:row-start-3 md:col-start-3'
      >
        <FadeInText className='mb-4' delay={1500}>
          Lee Sherwood
        </FadeInText>

        <FadeInText className='italic text-yellow-600 text-2xl' delay={2500}>
          Web Developer
        </FadeInText>
      </div>
    </div>
  );
};

interface ArrowProps {
  children: React.ReactNode;
  animateDirection: 'left' | 'right';
}
const Arrow: React.FunctionComponent<ArrowProps> = ({
  children,
  animateDirection,
}) => {
  const animatedStyles = useSpring({
    from: {
      x: animateDirection === 'left' ? -2000 : 2000,
      scale: 0.7,
      opacity: 0.7,
    },
    to: [{ x: 0 }, { scale: 1, opacity: 1 }],
  });

  return (
    <animated.span style={animatedStyles} className='text-yellow-600'>
      {children}
    </animated.span>
  );
};

const Slash: React.FunctionComponent = () => {
  const animatedStyles = useSpring({
    from: {
      scale: 0.3,
      opacity: 0,
    },
    to: [{ scale: 1, opacity: 1 }],
    delay: 750,
    config: { tension: 1000, mass: 2 },
  });
  return (
    <animated.span style={animatedStyles} className='px-8'>
      /
    </animated.span>
  );
};

interface FadeInTextProps {
  className: string;
  children: React.ReactNode;
  delay: number;
}
const FadeInText: React.FunctionComponent<FadeInTextProps> = ({
  className,
  children,
  delay,
}) => {
  const animatedStyles = useSpring({
    from: {
      opacity: 0,
    },
    to: { opacity: 1 },
    delay,
  });

  return (
    <animated.div style={animatedStyles} className={className}>
      {children}
    </animated.div>
  );
};

export default Intro;
