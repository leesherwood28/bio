import { Canvas } from '@react-three/fiber';

const Game: React.FunctionComponent = () => {
  return (
    <Canvas>
      <mesh>
        <boxGeometry />
        <meshStandardMaterial />
        <ambientLight intensity={0.1} />
        <directionalLight color='red' position={[0, 0, 5]} />
      </mesh>
    </Canvas>
  );
};

export default Game;
