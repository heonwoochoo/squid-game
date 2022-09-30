function SideLight(props: JSX.IntrinsicElements["mesh"]) {
  return (
    <mesh {...props}>
      <sphereGeometry args={[0.1, 6, 6]} />
      <meshPhongMaterial color="#ffe9ac" />
    </mesh>
  );
}

export default SideLight;
