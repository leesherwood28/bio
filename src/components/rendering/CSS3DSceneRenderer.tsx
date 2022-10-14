import { useFrame, useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';

const CSS3DSceneRenderer: React.FunctionComponent = () => {
  const { scene, camera } = useThree();

  const css3dRenderer = useMemo(() => new CSS3DRenderer(), []);

  useFrame(() => {
    css3dRenderer.render(scene, camera);
  });
  return null;
};

export default CSS3DSceneRenderer;
