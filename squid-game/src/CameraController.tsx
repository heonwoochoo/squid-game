import React, { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const CameraController = () => {
  const { camera, gl } = useThree();
  useFrame((state, delta) => controls.update());
  const controls = new OrbitControls(camera, gl.domElement);
  controls.enableDamping = true;
  controls.rotateSpeed = 0.1;
  controls.zoomSpeed = 0.5;
  return null;
};

export default CameraController;
