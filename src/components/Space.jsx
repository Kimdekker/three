import { useFrame } from '@react-three/fiber';
import { useLayoutEffect, useRef } from 'react';
import { PerspectiveCamera, PointerLockControls, ScrollControls, useScroll } from '@react-three/drei';
import Office from './Office';
// import { PointerLockControls } from '../components/PointerLockControls';
import { gsap } from 'gsap';


export const FLOOR_HEIGHT = 1.1;
export const NB_FLOORS = 3;

const Space = () => {

  const cameraRef = useRef();
  const trailRef = useRef();
  
  const tl = gsap.timeline();

  const FrameUpdate = ({ tl }) => {
    const scroll = useScroll();

    useFrame(() => {
        tl.seek(scroll.offset * tl.duration());
    });

  };
  
  useLayoutEffect(() => {
      // 0
      tl.to( // position
        trailRef.current.position,
        {
          duration: 1,
          y: 1.5,
          x: 0,
          z: 0,
          ease: "power1.inOut" // Add easing here
        },
        0
      );


      // 1
      tl.to( // position
        trailRef.current.position,
        {
          duration: 1,
          y: 2,
          x: -2,
          z: 0,
          ease: "power1.inOut" // Add easing here
        },
        1
      );
      tl.to( // rotation
        trailRef.current.rotation,
        {
          duration: 3,
          y: -Math.PI / 2,
        },
        1
      );


      // 2
      tl.to( // position
        trailRef.current.position,
        {
          duration: 1,
          y: 4,
          x: -4,
          z: 0,
          ease: "power1.inOut" // Add easing here
        },
        2
      );


      // 3
      tl.to( // position
        trailRef.current.position,
        {
          duration: 1,
          y: 5,
          x: -6,
          z: -2,
          ease: "power1.inOut" // Add easing here
        },
        3
      );

      // 4
      tl.to( // position
        trailRef.current.position,
        {
          duration: 1,
          y: 6,
          x: -7,
          z: -4,
          ease: "power1.inOut" // Add easing here
        },
        4
      );

      tl.to( // rotation
      trailRef.current.rotation,
      {
        duration: 2,
        y: -Math.PI,
      },
      4
    );


      // 5
      tl.to( // position
        trailRef.current.position,
        {
          duration: 1,
          y: 7,
          x: -5,
          z: -6,
          ease: "power1.inOut" // Add easing here
        },
        5
      );
  }, []);



  return (
      <>
        <ambientLight position={[-2, -2, 2]} />
        <directionalLight position={[2, 2, 2]} intensity={0.7} />


        <ScrollControls damping={0.25} pages={3}>
          <FrameUpdate tl={tl} />

          <Office />

          <group dispose={null} ref={trailRef} position={[1, 1, 1]}>
              <PerspectiveCamera ref={cameraRef} makeDefault position={[2.3, 1.5, 2.3]}/>
              {/* <PointerLockControls /> */}
          </group>

        </ScrollControls>

      </>
  )
}

export default Space