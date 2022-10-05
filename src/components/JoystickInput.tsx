import { useCallback, useEffect, useRef, useState } from 'react';
import { Input } from '../models/input.model';
import { useInputStore } from '../store/input.store';

const JoystickInput: React.FunctionComponent = () => {
  const setInput = useInputStore((s) => s.setInput);

  return (
    <div className='absolute bottom-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-slate-500 opacity-50 flex items-center justify-center'>
      <div className='bg-black w-16 h-16 rounded-full'></div>
    </div>
  );
};

export default JoystickInput;
