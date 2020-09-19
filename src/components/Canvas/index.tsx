import React from 'react'
import useCanvas from '../../hooks/useCanvas'

interface ICanvas {
  draw: (() => void) | ((context: CanvasRenderingContext2D, frameCount: number) => void)
  onClick: (() => void) | ((context: CanvasRenderingContext2D) => void)
  width: string
  height: string
}

const Canvas: React.FC<ICanvas> = (props) => {
  const { draw, onClick, ...rest } = props
  const canvasRef = useCanvas(draw)

  const handleClick = () => {
    const canvas = canvasRef.current
    const ctx = canvas !== null ? canvas.getContext('2d') : null

    if (ctx !== null) {
      onClick(ctx)
    }
  }

  return <canvas onClick={handleClick} ref={canvasRef} {...rest} />
}

export default Canvas
