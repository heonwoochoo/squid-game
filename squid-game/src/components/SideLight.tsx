import { Vector3 } from "@react-three/fiber";
import * as THREE from "three";

function SideLight(props: JSX.IntrinsicElements["mesh"]) {
  const sideLights = [];
  const size = props.userData?.size;
  const geometry = new THREE.SphereGeometry(0, 1, 6, 6);
  const material = new THREE.MeshPhongMaterial({ color: "#ffe9ac" });
  for (let i = 0; i < 40; i++) {
    sideLights.push([0, 0, i * 1.5 - size * 9]);
  }
  console.log("전구 생성");
  return (
    <>
      {sideLights.map((pos, i) => (
        <mesh
          key={i}
          geometry={geometry}
          material={material}
          position={[0, 10, pos[2]]}
        />
      ))}
    </>
  );
}

export default SideLight;
