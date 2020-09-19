import { useRef } from 'react'

interface IConfig {
  assets: {
    bird: HTMLImageElement
    background: HTMLImageElement
    foreground: HTMLImageElement
    pipeNorth: HTMLImageElement
    pipeSouth: HTMLImageElement
  }
  options: {
    delayFrameCount: number
    birdX: number
    gap: number
    upMovement: number
    gravity: number
  }
}

const useFlappyAnimation = (config: IConfig) => {
  const { bird, foreground, background, pipeNorth, pipeSouth } = config.assets
  const { delayFrameCount, birdX, gap, upMovement, gravity } = config.options

  const score = useRef(0)
  const gameOver = useRef(false)
  const isOnTheFloor = useRef(false)
  const delay = useRef(0)
  const birdY = useRef(150)
  const pipesArray = useRef([{ x: 288, y: 0 }])
  const hitDistance = pipeNorth.height + gap + 5

  const tap = () => {
    if (!gameOver.current) {
      birdY.current = birdY.current - upMovement
    } else if (delay.current > delayFrameCount && isOnTheFloor.current) {
      reset()
    }
  }

  const reset = () => {
    score.current = 0
    gameOver.current = false
    birdY.current = 150
    pipesArray.current = [{ x: 288, y: 0 }]
  }

  const draw = (context: CanvasRenderingContext2D) => {
    const canvas = context.canvas
    const pipeMovement = gameOver.current ? 0 : 1
    const birdMovementY = (birdY.current + bird.height >= canvas.height - foreground.height + 20) ? 0 : gravity
    const scoreTextX = canvas.width * 0.45
    const scoreTextY = canvas.height - 430
    const gameOverX = canvas.width * 0.07
    const gameOverY = canvas.height - 300
    const pipes = pipesArray.current

    context.drawImage(background, 0, 0)

    for (let i = 0; i < pipes.length; i++) {
      if (pipes[i].x === -60) {
        pipes.shift()
      }

      context.drawImage(pipeNorth, pipes[i].x, pipes[i].y)
      context.drawImage(pipeSouth, pipes[i].x, pipes[i].y + hitDistance)

      pipes[i].x = pipes[i].x - pipeMovement

      if (pipes[i].x === 80 && !gameOver.current) {
        pipes.push({
          x: canvas.width,
          y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
        })
      }

      if (pipes[i].x === 0 && !gameOver.current) {
        score.current = score.current + 1
      }

      const hasHitFloor = birdY.current + bird.height >= canvas.height - foreground.height + 20
      const hasHitPipe = birdX + bird.width >= pipes[i].x && birdX <= pipes[i].x + pipeNorth.width &&
                (birdY.current <= pipes[i].y + pipeNorth.height || birdY.current + bird.height >= pipes[i].y + hitDistance)

      isOnTheFloor.current = hasHitFloor

      if (hasHitPipe || hasHitFloor) {
        gameOver.current = true
      }

      context.drawImage(foreground, 0, canvas.height - foreground.height + 20)
    }

    context.drawImage(bird, birdX, birdY.current)
    birdY.current = birdY.current + birdMovementY

    if (gameOver.current) {
      delay.current++
      context.font = '28px \'Press Start 2P\', cursive'
      context.fillStyle = '#fab900'
      context.fillText('Game Over', gameOverX, gameOverY)
      context.fillStyle = 'black'
      context.strokeText('Game Over', gameOverX, gameOverY)

      if (isOnTheFloor.current) {
        context.font = 'bold 8px \'Press Start 2P\', cursive'
        context.fillStyle = 'black'
        context.fillText('Click the screen to play again', gameOverX, gameOverY * 2.2)
      }
    }

    context.fillStyle = '#000'
    context.font = 'bold 32px \'Press Start 2P\', cursive'
    context.strokeText(`${score.current}`, scoreTextX, scoreTextY)
    context.fillStyle = '#fff'
    context.fillText(`${score.current}`, scoreTextX, scoreTextY)
  }

  return [tap, draw]
}

export default useFlappyAnimation
