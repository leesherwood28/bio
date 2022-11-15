import { isMobile } from 'react-device-detect';

const JOYSTICK_CONTROL =
  'Use the joystick at the bottom of the screen to move.';
const KEYBOARD_CONTROL = 'Use the wasd or arrow keys to move.';

const JOYSTICK_OBELISK_MESSAGE =
  'You can use touch to interact with the obelisks to find out more about me.';
const KEYBOARD_OBELISK_MESSAGE =
  'You can use the mouse to interact with the obelisks to find out more about me.';

const MOVEMENT_MESSAGE = isMobile ? JOYSTICK_CONTROL : KEYBOARD_CONTROL;
const OBELISK_MESSAGE = isMobile
  ? JOYSTICK_OBELISK_MESSAGE
  : KEYBOARD_OBELISK_MESSAGE;

const WelcomeInfo: React.FunctionComponent = () => {
  return (
    <>
      <div
        className='absolute bg-black bg-opacity-80 text-white 
                        p-4 rounded-md 
                        left-1/2 top-1/4 -translate-x-1/2 
                        flex flex-col gap-4 max-w-sm'
      >
        <h2>Welcome to My World!</h2>

        <p>
          {MOVEMENT_MESSAGE}
          <br />
          {OBELISK_MESSAGE}
        </p>
      </div>
    </>
  );
};

export default WelcomeInfo;
