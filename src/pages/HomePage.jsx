import { Canvas  } from "@react-three/fiber"
import { CameraAnimation } from "../components/CameraAnimation"
import { Office } from "../components/Office"
import { ScrollControls } from "@react-three/drei"


const HomePage = () => {
  return (
      <Canvas camera={{fov: 64, position: [2.3, 1.5, 2.3], }}>

        <ambientLight intensity={0.3} />
        <directionalLight position={[1, 2, 3]} intensity={1} />
        {/* <OrbitControls enableZoom={true} /> */}
        
        <ScrollControls damping={0.25} pages={3}>
          <Office />
          <CameraAnimation />
        </ScrollControls>

      </Canvas>
  )
}

export default HomePage
