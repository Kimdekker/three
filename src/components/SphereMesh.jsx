import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"

const SphereMesh = ({ position, size, color }) => {

    const ref = useRef()

    const [hovered, setHovered] = useState (false);
    const [clicked, setClicked] = useState (false);

    useFrame((state, delta) => {
        const speed = hovered ? 1 : 0.2
        ref.current.rotation.y += delta * speed
    })

    return (
        <mesh 
            position={position} 
            ref={ref} 
            onPointerEnter={(event) => (event.stopPropagation(), setHovered(true))}
            onPointerLeave={() => setHovered(false)}
            onClick={() => setClicked(!clicked)}
            scale={clicked ? 1.5 : 1 }
        >
            <sphereGeometry args={size}/>
            <meshStandardMaterial color={hovered ? 'orange' : 'white' } wireframe/>
        </mesh>
    )
}

export default SphereMesh
