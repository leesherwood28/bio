const Ground: React.FunctionComponent = () => {
  return (
    <mesh rotation={[0, 0, 0]}>
      <planeBufferGeometry args={[50, 50]} />
      <meshStandardMaterial color='red' />
    </mesh>
  );
};

export default Ground;
