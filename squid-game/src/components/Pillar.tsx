function Pillar(props: JSX.IntrinsicElements["mesh"]) {
  return (
    <mesh {...props}>
      <meshPhongMaterial color="rgb(236, 240, 241)" />
      <boxGeometry args={[5, 10, 5]} />
    </mesh>
  );
}

export default Pillar;
