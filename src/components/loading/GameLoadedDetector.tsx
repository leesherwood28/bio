import { useFrame } from '@react-three/fiber';
import { useInitialisationStore } from '../../store/initialisation.store';

const GameLoadedDetector: React.FunctionComponent = () => {
  const { loadingDone, confirmLoadingDone } = useInitialisationStore();
  useFrame(() => {
    if (!loadingDone) {
      confirmLoadingDone();
    }
  });
  return null;
};

export default GameLoadedDetector;
