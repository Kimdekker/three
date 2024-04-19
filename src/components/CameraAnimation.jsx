import { useLayoutEffect, useRef, useState } from 'react'
import { useScroll } from '@react-three/drei'
import { gsap } from 'gsap';
import { useFrame, useThree } from '@react-three/fiber';

export const FLOOR_HEIGHT = 2.3;
export const NB_FLOORS = 3;

export function CameraAnimation() {
  const { camera } = useThree();
  const tl = useRef();

  // Create a state for the camera properties
  const [cameraProps, setCameraProps] = useState({
    position: { ...camera.position },
    rotation: { ...camera.rotation }
  });

  const scroll = useScroll();

  useFrame(() => {
    // Apply the animated properties to the camera
    Object.assign(camera.position, cameraProps.position);
    Object.assign(camera.rotation, cameraProps.rotation);

    tl.current.seek(scroll.offset * tl.current.duration());
  })

  useLayoutEffect(() => {
    console.log('camera:', camera); // Log camera

    tl.current = gsap.timeline();

    console.log('timeline:', tl.current); // Log timeline

    // Animate cameraProps instead of camera
    tl.current.to(
      cameraProps.position,
      {
        duration: 2,
        y: -FLOOR_HEIGHT * (NB_FLOORS - 1),
      },
      0
    );

      tl.current.to(
        camera.position,
        {
          duration: 1,
          x: -1,
          z: 2,
        },
        0
      );
      tl.current.to(
        camera.position,
        {
          duration: 1,
          x: 1,
          z: 2,
        },
        1
      );

      tl.current.to(
        camera.rotation,
        {
          duration: 1,
          x: 0,
          y: Math.PI / 6, z: 0
        },
        0
      );
      tl.current.to(
        camera.rotation,
        {
          duration: 1,
          x: 0,
          y: -Math.PI / 6, z: 0
        },
        1
      );

      console.log('camera.position:', camera.position); // Log camera.position
      console.log('camera.rotation:', camera.rotation); // Log camera.rotation

    }, [camera]);

  return null
}

export default CameraAnimation



