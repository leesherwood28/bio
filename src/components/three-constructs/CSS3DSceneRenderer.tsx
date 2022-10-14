import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo } from 'react';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';

const CSS3DSceneRenderer: React.FunctionComponent = () => {
  const { scene, camera } = useThree();

  const css3dRenderer = useMemo(() => {
    const renderer = new CSS3DRenderer();
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    return renderer;
  }, []);

  useFrame(() => {
    css3dRenderer.render(scene, camera);
  });

  useEffect(() => {
    document
      .querySelector('#game-container')
      ?.appendChild(css3dRenderer.domElement);
  }, [css3dRenderer]);
  return null;
};

export default CSS3DSceneRenderer;
