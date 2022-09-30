import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

function Setting() {
  const { gl, camera, scene } = useThree();
  useEffect(() => {
    // WebGLRenderer
    gl.setSize(window.innerWidth, window.innerHeight);
    gl.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;

    // Scene
    scene.background = new THREE.Color("rgb(95, 32, 16)");
    //Camera
    camera.position.set(-4, 19, 14);
  }, []);
  return null;
}

export default Setting;
