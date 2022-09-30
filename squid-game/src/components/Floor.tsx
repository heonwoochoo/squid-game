import { useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";
import { TextureLoader, Vector2 } from "three";
function Floor() {
  const texture = useLoader(TextureLoader, "img/floor3.jpg");
  texture.repeat = new THREE.Vector2(4, 4);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  console.log("Floor");
  return (
    <mesh receiveShadow>
      <boxGeometry args={[200, 1, 200]} />
      <meshPhongMaterial map={texture} shininess={1} />
    </mesh>
  );
}

export default Floor;
