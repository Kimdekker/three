import { Canvas  } from "@react-three/fiber"
import SphereMesh from "../components/SphereMesh"
import TorusKnotMesh from "../components/TorusKnotMesh"
import CubeMesh from "../components/CubeMesh"
import { OrbitControls, useHelper } from "@react-three/drei"
import { useRef } from "react"
import { DirectionalLightHelper } from "three"
import { useControls } from "leva"


const Scene = () => {

     const directionalLightRef = useRef();

     const {lightColor, lightIntensity} = useControls({
        lightColor: "white",
        lightIntensity: {
            value: 0.5,
            min: 0,
            max: 5,
            step: 0.1
        }
     })

     useHelper(directionalLightRef, DirectionalLightHelper, 0.5, 'white');

    return (
        <>
            <directionalLight 
                position={[0, 3, 2]} 
                intensity={lightIntensity}
                ref={directionalLightRef}
            />
            <ambientLight intensity={0.1}/>
            
            <SphereMesh position={[0, 0, 0]} color={'white'} size={[1, 30, 30]}/>

            <TorusKnotMesh position={[0, 0, 0]} color={lightColor} size={[0.2, 1000, 50]}/>
            <OrbitControls enableZoom={false} />

        </>
    )

}

const HomePage = () => {
  return (
      <Canvas>
        <Scene />
      </Canvas>
  )
}

export default HomePage
