import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { OrbitControls, PerspectiveCamera, useScroll } from '@react-three/drei';
import Office from '../components/Office';
import gsap from 'gsap';

const HomePage = () => {

  const cameraRef = useRef();
  const trailRef = useRef();
  const tl = useRef();
  const scroll = useScroll();


  const FrameUpdate = () => {
    useFrame(() => {
      if (tl.current) {
        tl.current.seek(scroll.offset * tl.current.duration());
      }
    });
  
    useLayoutEffect(() => {
      if (trailRef.current) {
        tl.current = gsap.timeline();
    
      // Camera movement
      tl.current.from(
        trailRef.current.position,
        {
          duration: 0.5,
          x: -2,
        },
        0.5
      );
      tl.current.from(
        trailRef.current.rotation,
        {
          duration: 0.5,
          y: Math.PI / 2,
        },
        0
      );


      }
    }, []);
  
    return null;
  };



  return (
      <Canvas camera={{fov: 64, position: [2.3, 1.5, 2.3], }}>

      <ambientLight intensity={0.3} />
      <directionalLight position={[1, 2, 3]} intensity={1} />

      <Office />

      <FrameUpdate />

      <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />

      <group position={[0, 0, 0]}>
        <group ref={trailRef}>
          <PerspectiveCamera ref={cameraRef} makeDefault position={[2.3, 1.5, 2.3]}/>
          <OrbitControls camera={cameraRef.current} enableZoom={false} />
        </group>
      </group>

      </Canvas>


  )
}

export default HomePage
