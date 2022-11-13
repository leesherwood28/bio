import { isMobile } from 'react-device-detect';

const JOYSTICK_CONTROL = 'Use the joystick at the bottom of the screen to move';
const KEYBOARD_CONTROL = 'Use the wasd or arrow keys to move';

const MOVEMENT_MESSAGE = isMobile ? JOYSTICK_CONTROL : KEYBOARD_CONTROL;

const WelcomeInfo: React.FunctionComponent = () => {
  return (
    <>
      <div
        className='absolute bg-black bg-opacity-60 text-white 
                        p-4 rounded-md 
                        left-1/2 top-1/2 -translate-x-1/2 
                        flex flex-col gap-4'
      >
        <h2>Welcome to My World!</h2>

        <p>{MOVEMENT_MESSAGE}</p>
      </div>
    </>
  );
};

export default WelcomeInfo;
