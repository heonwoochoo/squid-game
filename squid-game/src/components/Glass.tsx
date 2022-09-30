import * as THREE from "three";
function Glass(props: JSX.IntrinsicElements["mesh"]) {
  const type = props.type;
  console.log("glass");
  return (
    <mesh {...props}>
      <boxGeometry args={[1.2, 0.05, 1.2]} />
      <meshPhongMaterial
        color="#9fdfff"
        transparent={true}
        opacity={type === "normal" ? 0.3 : 1}
      />
    </mesh>
  );
}
export default Glass;
