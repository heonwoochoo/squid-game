function Bar(props: JSX.IntrinsicElements["mesh"]) {
  return (
    <mesh {...props}>
      <boxGeometry args={[0.1, 0.3, 1.2 * 21]} />
      <meshPhongMaterial color="#441c1d" />
    </mesh>
  );
}

export default Bar;
