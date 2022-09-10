import React from 'react';
import { PerspectiveCamera } from 'three';

const CameraHelper: React.FunctionComponent = () => {
  const camera = new PerspectiveCamera(75, 1, 1, 3);
  return (
    <group position={[0, 4, 0]}>
      <cameraHelper args={[camera]}></cameraHelper>
    </group>
  );
};

export default CameraHelper;
