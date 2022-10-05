import { useCallback, useEffect, useRef, useState } from 'react';
import { Input } from '../models/input.model';
import { useInputStore } from '../store/input.store';

const JoystickInput: React.FunctionComponent = () => {
  const setInput = useInputStore((s) => s.setInput);

  return (
    <div className='absolute bottom-8 left-1/2 w-8 h-8 rounded-full bg-black'></div>
  );
};

export default JoystickInput;
