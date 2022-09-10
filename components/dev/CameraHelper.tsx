import React from 'react';
import { PerspectiveCamera } from 'three';

const CameraHelper: React.FunctionComponent = () => {
  const camera = new PerspectiveCamera(60, 1, 1, 3);
  return (
    <group position={[0, -1, 1]}>
      <cameraHelper args={[camera]}></cameraHelper>
    </group>
  );
};

export default CameraHelper;
