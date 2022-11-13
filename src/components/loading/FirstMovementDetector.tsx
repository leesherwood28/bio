import { useEffect } from 'react';
import { useInitialisationStore } from '../../store/initialisation.store';
import { useInputStore } from '../../store/input.store';

const FirstMovementDetector: React.FunctionComponent = () => {
  const input = useInputStore((s) => s.input);
  const stopShowingWelcome = useInitialisationStore(
    (s) => s.stopShowingWelcome
  );
  useEffect(() => {
    if (input.forward !== 0 || input.sideways !== 0) {
      stopShowingWelcome();
    }
  }, [input, stopShowingWelcome]);

  return null;
};

export default FirstMovementDetector;
