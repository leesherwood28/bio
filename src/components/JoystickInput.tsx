import { MouseEvent, TouchEvent, useCallback, useEffect, useRef } from 'react';
import { Vector2 } from 'three';
import { isNil } from '../functions/is-nil.fn';
import { Input } from '../models/input.model';
import { useInputStore } from '../store/input.store';

interface JoystickMovement {
  x: number;
  y: number;
}

interface State {
  isMoving: boolean;
  startPosition: JoystickMovement | null;
}

type JoystickEvent =
  | MouseEvent<HTMLButtonElement>
  | TouchEvent<HTMLButtonElement>;

const getJoystickPosition = (event: JoystickEvent): JoystickMovement => {
  if (isTouchEvent(event)) {
    const touch = event.touches.item(0);
    return { x: touch.clientX, y: touch.clientY };
  } else {
    return { x: event.clientX, y: event.clientY };
  }
};

const isTouchEvent = (
  event: JoystickEvent
): event is TouchEvent<HTMLButtonElement> => {
  return !!(event as TouchEvent<HTMLButtonElement>).touches;
};

const MAX_JOYSTICK_DISPLAY_MOVEMENT = 40;

function clampJoystickDisplayMovement(input: number) {
  if (Math.abs(input) <= MAX_JOYSTICK_DISPLAY_MOVEMENT) {
    return input;
  }
  return Math.sign(input) * MAX_JOYSTICK_DISPLAY_MOVEMENT;
}

const convertJoystickMovementIntoInput = (
  joystickMovement: JoystickMovement
): Input => {
  let vector = new Vector2(
    joystickMovement.x,
    joystickMovement.y
  ).multiplyScalar(2 / MAX_JOYSTICK_DISPLAY_MOVEMENT);

  if (vector.length() > 1) {
    vector = vector.normalize();
  }
  return {
    forward: -vector.y,
    sideways: reduceJoystickSidewaysMovement(vector.x),
  };
};

const MAX_JOYSTICK_SIDE_MOVEMENT = 0.8;

const reduceJoystickSidewaysMovement = (movement: number): number => {
  if (Math.abs(movement) < MAX_JOYSTICK_SIDE_MOVEMENT) {
    return movement;
  }
  return Math.sign(movement) * MAX_JOYSTICK_SIDE_MOVEMENT;
};

const JoystickInput: React.FunctionComponent = () => {
  const setInput = useInputStore((s) => s.setInput);

  const joystickRef = useRef<HTMLButtonElement>(null);
  const stateRef = useRef<State>({ isMoving: false, startPosition: null });

  const handleJoystickStart = useCallback(
    (event: JoystickEvent) => {
      if (isNil(stateRef.current) || stateRef.current.isMoving) {
        return;
      }
      const position = getJoystickPosition(event);
      stateRef.current = {
        isMoving: true,
        startPosition: position,
      };
      updateJoystick({ x: 0, y: 0 });
    },
    [joystickRef, stateRef]
  );
  const handleJoystickEnd = useCallback(
    (event: JoystickEvent) => {
      if (isNil(stateRef.current)) {
        return;
      }
      stateRef.current = {
        isMoving: false,
        startPosition: null,
      };
      updateJoystick({ x: 0, y: 0 });
    },
    [joystickRef, stateRef]
  );

  const handleJoystickMove = useCallback(
    (event: JoystickEvent) => {
      if (
        isNil(joystickRef.current) ||
        isNil(stateRef.current) ||
        !stateRef.current.isMoving ||
        isNil(stateRef.current.startPosition)
      ) {
        return;
      }
      const joystickPosition = getJoystickPosition(event);
      const joystickMovement: JoystickMovement = {
        x: joystickPosition.x - stateRef.current.startPosition.x,
        y: joystickPosition.y - stateRef.current.startPosition.y,
      };
      updateJoystick(joystickMovement);
    },
    [joystickRef, stateRef]
  );

  const updateJoystickPosition = useCallback(
    (input: JoystickMovement) => {
      if (isNil(joystickRef.current)) {
        return;
      }
      input = {
        x: clampJoystickDisplayMovement(input.x),
        y: clampJoystickDisplayMovement(input.y),
      };
      joystickRef.current.style.transform = `translate(${input.x}px, ${input.y}px)`;
    },
    [joystickRef]
  );

  const updateJoystick = useCallback(
    (input: JoystickMovement) => {
      updateJoystickPosition(input);

      setInput(convertJoystickMovementIntoInput(input));
    },
    [updateJoystickPosition, setInput]
  );

  useEffect(() => {
    document.addEventListener('mousemove', handleJoystickMove as any);
    document.addEventListener('touchmove', handleJoystickMove as any);
    return () => {
      document.removeEventListener('mousemove', handleJoystickMove as any);
      document.removeEventListener('touchend', handleJoystickMove as any);
    };
  }, [handleJoystickMove]);

  useEffect(() => {
    document.addEventListener('mouseup', handleJoystickEnd as any);
    document.addEventListener('touchend', handleJoystickEnd as any);
    return () => {
      document.removeEventListener('mouseup', handleJoystickEnd as any);
      document.removeEventListener('touchend', handleJoystickEnd as any);
    };
  }, [handleJoystickEnd]);

  return (
    <div className='absolute bottom-12 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-slate-500 opacity-50 flex items-center justify-center'>
      <button
        ref={joystickRef}
        onTouchStart={handleJoystickStart}
        onMouseDown={handleJoystickStart}
        className='bg-black w-16 h-16 rounded-full cursor-move focus:outline-none'
      ></button>
    </div>
  );
};

export default JoystickInput;
