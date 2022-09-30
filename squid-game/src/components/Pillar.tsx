function Pillar(props: JSX.IntrinsicElements["mesh"]) {
  console.log("pillar");
  return (
    <mesh {...props} receiveShadow castShadow>
      <meshPhongMaterial color="#071d28" />
      <boxGeometry args={[5, 10, 5]} />
    </mesh>
  );
}

export default Pillar;
