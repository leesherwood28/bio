import {
  MouseEvent,
  TouchEvent,
  useCallback,
  useEffect,
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
      updateJoystickPosition({ x: 0, y: 0 });
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
      updateJoystickPosition({ x: 0, y: 0 });
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
      updateJoystickPosition(joystickMovement);
    },
    [joystickRef, stateRef]
  );

  const updateJoystickPosition = useCallback(
    (input: JoystickMovement) => {
      if (isNil(joystickRef.current)) {
        return;
      }
      joystickRef.current.style.transform = `translate(${input.x}px, ${input.y}px)`;
    },
    [joystickRef]
  );

  useEffect(() => {}, [joystickRef]);

  return (
    <div className='absolute bottom-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-slate-500 opacity-50 flex items-center justify-center'>
      <button
        ref={joystickRef}
        // onTouchStart={handleTouchStart}
        onMouseDown={handleJoystickStart}
        onMouseMove={handleJoystickMove}
        // onTouchMove={handleTouchMove}
        onMouseUp={handleJoystickEnd}
        className='bg-black w-16 h-16 rounded-full cursor-move '
      ></button>
    </div>
  );
};

export default JoystickInput;
