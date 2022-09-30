import { useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";
function Floor() {
  const texture = useLoader(TextureLoader, "img/floor2.jpg");
  console.log(texture);
  return (
    <mesh>
      <boxGeometry args={[200, 1, 200]} />
      <meshPhongMaterial map={texture} />
    </mesh>
  );
}

export default Floor;
