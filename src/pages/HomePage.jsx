import Space from '../components/Space'
import Button from '../components/Button'
import { Canvas } from '@react-three/fiber'


const HomePage = () => {

  return (
      <>
      <Canvas>
        <Space />
      </Canvas>

      <div className='btns'>
      <Button text={'Explore'}/>
      <Button text={'About'}/>
      </div>

      </>
  )
}

export default HomePage