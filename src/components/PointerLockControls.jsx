import { useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PointerLockControls as PointerLockControlsImpl } from '@react-three/drei';

const SPEED = 0.1;
const SMOOTH_FACTOR = 0.1; // Adjust this value to make the movement smoother

export function PointerLockControls() {
  const controls = useRef();
  const { camera, gl } = useThree();
  const { domElement } = gl;

  useFrame(({ mouse }) => {
    if (controls.current) {
      const targetRotationY = mouse.x * SPEED;
      const targetRotationX = mouse.y * SPEED;
  
      // Smoothly interpolate towards the target rotation
      controls.current.getObject().rotation.y +=
        (targetRotationY - controls.current.getObject().rotation.y) * SMOOTH_FACTOR;
      controls.current.getObject().rotation.x +=
        (targetRotationX - controls.current.getObject().rotation.x) * SMOOTH_FACTOR;
    }
  });
  

  return <PointerLockControlsImpl ref={controls} camera={camera} domElement={domElement} />;
}
