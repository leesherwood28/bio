import {
  MouseEvent,
  TouchEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Input } from '../models/input.model';
import { useInputStore } from '../store/input.store';

interface State {
  isDragging: boolean;
  position: { x: number; y: number } | null;
}

type JoystickEvent = TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>;

const JoystickInput: React.FunctionComponent = () => {
  const setInput = useInputStore((s) => s.setInput);

  const joystickRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<State>({ isDragging: false, position: null });

  const handleTouchStart = useCallback((event: JoystickEvent) => {}, []);
  const handleTouchMove = useCallback((event: JoystickEvent) => {
    console.log('hello');
  }, []);

  useEffect(() => {}, [joystickRef]);

  return (
    <div className='absolute bottom-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-slate-500 opacity-50 flex items-center justify-center'>
      <div
        ref={joystickRef}
        onTouchStart={handleTouchStart}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onTouchMove={handleTouchMove}
        className='bg-black w-16 h-16 rounded-full cursor-move '
      ></div>
    </div>
  );
};

export default JoystickInput;
