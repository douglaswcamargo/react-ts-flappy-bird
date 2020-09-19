import React from 'react'
import Canvas from '../../components/Canvas'
import { getAssetImage } from '../../helpers'
import useFlappyAnimation from '../../hooks/useFlappyAnimation'
import * as S from './style'

const config = {
  assets: {
    bird: getAssetImage('bird.png'),
    background: getAssetImage('bg.png'),
    foreground: getAssetImage('fg.png'),
    pipeNorth: getAssetImage('pipeNorth.png'),
    pipeSouth: getAssetImage('pipeSouth.png')
  },
  options: {
    delayFrameCount: 5,
    birdX: 50,
    gap: 100,
    upMovement: 40,
    gravity: 1.5
  }
}

const Flappy: React.FC = () => {
  const [tap, draw] = useFlappyAnimation(config)

  return (
    <S.Screen>
      <Canvas onClick={tap} draw={draw} width="288" height="512"/>
    </S.Screen>
  )
}

export default Flappy
