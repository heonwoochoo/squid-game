import { Image } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import * as THREE from "three";
import { respawnCountState } from "../atoms";

function LifeIcons() {
  const group = useRef<THREE.Group | any>(null);
  const respawnCount = useRecoilValue(respawnCountState);
  useEffect(() => {
    console.log(group.current?.children[respawnCount - 1].material.opacity);
  }, [respawnCount]);
  useFrame(() => {
    const target = group.current?.children[respawnCount - 1];
    if (respawnCount > 0 && target.material.opacity > 0) {
      target?.position.setY(target.position.y + 0.01);
      target.material.opacity -= 0.01;
    }
  });

  return (
    <group ref={group} position={[0, 15, 0]}>
      <Image
        position={[-2, 0, 12]}
        url="assets/img/life1.png"
        transparent={true}
      />
      <Image
        position={[-1, 0, 12]}
        url="assets/img/life2.png"
        transparent={true}
      />
      <Image
        position={[0, 0, 12]}
        url="assets/img/life3.png"
        transparent={true}
      />
      <Image
        position={[1, 0, 12]}
        url="assets/img/life4.png"
        transparent={true}
      />
      <Image
        position={[2, 0, 12]}
        url="assets/img/life5.png"
        transparent={true}
      />
    </group>
  );
}

export default LifeIcons;
