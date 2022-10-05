import { useCallback, useEffect, useRef, useState } from 'react';
import { Input } from '../models/input.model';
import { useInputStore } from '../store/input.store';

function inputByKey(key: string, isKeyUp: boolean): Partial<Input> {
  const value = isKeyUp ? 0 : 1;
  const keyActionMap: { [key in string]: Partial<Input> } = {
    w: { forward: value },
    W: { forward: value },
    ArrowUp: { forward: value },
    a: { sideways: -value },
    A: { sideways: -value },
    ArrowLeft: { sideways: -value },
    s: { forward: -value },
    S: { forward: -value },
    ArrowDown: { forward: -value },
    d: { sideways: value },
    D: { sideways: value },
    ArrowRight: { sideways: value },
  };
  return keyActionMap[key];
}

export const KeyboardInput: React.FunctionComponent = () => {
  const setInput = useInputStore((s) => s.setInput);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const input = inputByKey(e.key, false);
    if (input) {
      setInput(input);
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const input = inputByKey(e.key, true);
    if (input) {
      setInput(input);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return null;
};
