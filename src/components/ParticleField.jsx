import { useEffect, useRef } from 'react'

export default function ParticleField({ count = 60 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const init = () => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2 + 0.2,
        opacity: Math.random() * 0.25 + 0.05,
        speedX: (Math.random() - 0.5) * 0.08,
        speedY: (Math.random() - 0.5) * 0.08,
        twinkle: Math.random() * Math.PI * 2,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.twinkle += 0.008
        const flicker = 0.5 + Math.sin(p.twinkle) * 0.5
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(210, 175, 165, ${p.opacity * flicker})`
        ctx.fill()

        p.x += p.speedX
        p.y += p.speedY

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
      })

      animationId = requestAnimationFrame(draw)
    }

    const onResize = () => {
      resize()
      init()
    }

    resize()
    init()
    draw()

    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', onResize)
    }
  }, [count])

  return <canvas ref={canvasRef} className="particles" aria-hidden="true" />
}
