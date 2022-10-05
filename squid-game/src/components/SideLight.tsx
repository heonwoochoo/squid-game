import * as THREE from "three";

const geometry = new THREE.SphereGeometry(0.12, 1, 6, 6);
const material = new THREE.MeshPhongMaterial({ color: "#ffe9ac" });
function SideLight({ position }: JSX.IntrinsicElements["mesh"]) {
  return <mesh geometry={geometry} material={material} position={position} />;
}

export default SideLight;
