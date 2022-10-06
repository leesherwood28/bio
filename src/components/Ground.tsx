const Ground: React.FunctionComponent = () => {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <circleGeometry args={[50, 50, 50]} />
      <shadowMaterial color='#171717' />
      <meshStandardMaterial color='#146600' />
    </mesh>
  );
};

export default Ground;
