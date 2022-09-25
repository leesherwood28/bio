const Ground: React.FunctionComponent = () => {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeBufferGeometry args={[1000, 1000]} />
      <shadowMaterial color='#171717' />
      <meshStandardMaterial color='green' />
    </mesh>
  );
};

export default Ground;
