import { Canvas, useFrame } from '@react-three/fiber';
import { useLayoutEffect, useRef } from 'react';
import { OrbitControls, PerspectiveCamera, ScrollControls, useScroll } from '@react-three/drei';
import Office from '../components/Office';
import { gsap } from 'gsap';


export const FLOOR_HEIGHT = 2.3;
export const NB_FLOORS = 3;

const HomePage = () => {

  const cameraRef = useRef();
  const trailRef = useRef();
  const tl = useRef();
  console.log('timeline: ' + tl); 
  const scroll = useScroll();


  const FrameUpdate = () => {
    useFrame(() => {
      console.log('useFrame is running');
      if (tl.current) {
        console.log('tl.current exists'); 
        tl.current.seek(scroll.offset * tl.current.duration());
        console.log(scroll.offset); 
      }
    });
  
    useLayoutEffect(() => {
      console.log('useLayoutEffect is running');
      if (trailRef.current) {
        console.log('trailRef.current exists');
        tl.current = gsap.timeline();

        console.log(gsap.timeline());
        // VERTICAL ANIMATION
        tl.current.to(
          trailRef.current.position,
          {
            duration: 2,
            y: -FLOOR_HEIGHT * (NB_FLOORS - 1),
          },
          0
        );
      }
    }, []);
  
    return null;
  };


  return (
      <Canvas>

      <FrameUpdate />

      <ambientLight intensity={0.3} />
      <directionalLight position={[1, 2, 3]} intensity={1} />

      <OrbitControls enableZoom={false} />


      <ScrollControls damping={0.25} pages={9}>

      <Office />

        <group ref={trailRef} position={[1, 1, 1]}>
            <PerspectiveCamera ref={cameraRef} makeDefault position={[2.3, 1.5, 2.3]}/>
            <OrbitControls camera={cameraRef.current} enableZoom={false} />
        </group>

      </ScrollControls>

      </Canvas>
  )
}

export default HomePage
