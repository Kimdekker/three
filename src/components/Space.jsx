import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { PerspectiveCamera, PointerLockControls, useScroll } from '@react-three/drei';
import Office from './Office';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

const Space = ({view}) => {

  const cameraRef = useRef();
  const trailRef = useRef();
  const tl = useRef(gsap.timeline({ paused: true }));
  const [isUpdating, setIsUpdating] = useState(true);
  const scroll = useScroll();

  const FrameUpdate = ({ tl }) => { // timing bug fixed, skipt de laatste frame alleen, maar ik hebhet laatste frame gewoon gecopy paste, dan werkt het wel :)
    const scroll = useScroll();
    useFrame(() => {
      if (isUpdating) {
        const position = scroll.el.scrollTop / scroll.el.scrollHeight;
        tl.current.seek(position * tl.current.duration());
      }
    });
  };


  const SeekSmooth = (label) => { // to seek a certain point inside the timeline, in a smooth way
    setIsUpdating(false);
    gsap.to(tl.current, {
      duration: 2.5,
      progress: tl.current.labels[label] / tl.current.duration(),
      ease: "power4.inOut",
      onComplete: () => {
        const position = tl.current.progress() * scroll.el.scrollHeight;
        scroll.el.scrollTo(0, position);
        
        setTimeout(() => {
          setIsUpdating(true)
        }, 1000);        
      }
    });
  };

  useEffect(() => {
    if (view) {
      SeekSmooth(view);
    }
  } , [view]);


  useEffect(() => { //timeline frames
    tl.current
      .addLabel('office')
      .to(trailRef.current.position, { // position
        motionPath: {
          path: [{y: 1.5, x: 0, z: 0}, {y: 2, x: -2, z: 0}, {y: 4, x: -4, z: 0}, {y: 5, x: -6, z: -2}],
          curviness: 1,
          autoRotate: true
        },
        duration: 5,
        ease: "none",
      })
      .addLabel('library')
  
      .to(trailRef.current.rotation, { // rotation
        motionPath: {
          path: [{y: -Math.PI / 2}, {y: -Math.PI / 1.5}, {y: -Math.PI / 1.5}],
        },
        duration: 6,
        ease: "none",
      }, 
      "<")
      .addLabel('attic')
  }, []);



  return (
      <>
        <ambientLight position={[-2, -2, 2]} />
        <directionalLight position={[2, 2, 2]} intensity={0.7} />


        
          <FrameUpdate tl={tl} />

          <Office />

          <group dispose={null} ref={trailRef} >
              <PerspectiveCamera ref={cameraRef} makeDefault position={[2.3, 1.5, 2.3]}/>
              <PointerLockControls />
          </group>

      </>
  )
}

export default Space