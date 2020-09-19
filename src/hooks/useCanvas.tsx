import { useRef, useEffect } from 'react'

type DrawProps = (context: CanvasRenderingContext2D, frameCount: number) => void

const useCanvas = (draw: DrawProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameCount = useRef(0)
  const frameId = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current

    if (canvas !== null) {
      const context = canvas.getContext('2d')
      if (context !== null) {
        const render = () => {
          frameCount.current = frameCount.current + 1
          draw(context, frameCount.current)
          frameId.current = window.requestAnimationFrame(render)
        }
        render()
      }
    }

    return () => {
      window.cancelAnimationFrame(frameId.current)
    }
  }, [draw])

  return canvasRef
}

export default useCanvas
