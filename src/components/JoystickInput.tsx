import {
  MouseEvent,
  TouchEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Vector2 } from 'three';
import { isNil } from '../functions/is-nil.fn';
import { Input } from '../models/input.model';
import { useInputStore } from '../store/input.store';

interface JoystickMovement {
  x: number;
  y: number;
}

interface State {
  isDragging: boolean;
  startPosition: JoystickMovement | null;
}

type JoystickEvent = MouseEvent<HTMLButtonElement>;
const MAX_JOYSTICK_MOVEMENT = 40;

function clampInput(input: number) {
  if (Math.abs(input) <= MAX_JOYSTICK_MOVEMENT) {
    return input;
  }
  return Math.sign(input) * MAX_JOYSTICK_MOVEMENT;
}

const JoystickInput: React.FunctionComponent = () => {
  const setInput = useInputStore((s) => s.setInput);

  const joystickRef = useRef<HTMLButtonElement>(null);
  const stateRef = useRef<State>({ isDragging: false, startPosition: null });

  const handleJoystickStart = useCallback(
    (event: JoystickEvent) => {
      if (isNil(stateRef.current)) {
        return;
      }
      stateRef.current = {
        isDragging: true,
        startPosition: { x: event.clientX, y: event.clientY },
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
        isDragging: false,
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
        !stateRef.current.isDragging ||
        isNil(stateRef.current.startPosition)
      ) {
        return;
      }
      const joystickMovement: JoystickMovement = {
        x: event.clientX - stateRef.current.startPosition.x,
        y: event.clientY - stateRef.current.startPosition.y,
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
        x: clampInput(input.x),
        y: clampInput(input.y),
      };
      joystickRef.current.style.transform = `translate(${input.x}px, ${input.y}px)`;
    },
    [joystickRef]
  );

  const updateJoystick = useCallback(
    (input: JoystickMovement) => {
      updateJoystickPosition(input);
      const inputVector = new Vector2(input.x, input.y).normalize();
      setInput({ forward: -inputVector.y, sideways: inputVector.x });
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
    <div className='absolute bottom-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-slate-500 opacity-50 flex items-center justify-center'>
      <button
        ref={joystickRef}
        // onTouchStart={handleTouchStart}
        onMouseDown={handleJoystickStart}
        // onTouchMove={handleTouchMove}
        onMouseUp={handleJoystickEnd}
        className='bg-black w-16 h-16 rounded-full cursor-move '
      ></button>
    </div>
  );
};

export default JoystickInput;
