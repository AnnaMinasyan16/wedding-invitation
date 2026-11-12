import { useEffect, useImperativeHandle, useRef, forwardRef } from 'react'
import { invitation } from '../data/invitation'

const { src, volume } = invitation.music

const BackgroundMusic = forwardRef(function BackgroundMusic({ onPlayingChange }, ref) {
  const audioRef = useRef(null)
  const fadeRef = useRef(null)
  const mutedRef = useRef(false)

  useEffect(() => {
    return () => {
      if (fadeRef.current) clearInterval(fadeRef.current)
    }
  }, [])

  const fadeTo = (target) => {
    const audio = audioRef.current
    if (!audio) return
    if (fadeRef.current) clearInterval(fadeRef.current)

    fadeRef.current = setInterval(() => {
      const next = audio.volume + (target > audio.volume ? 0.04 : -0.04)
      if ((target > audio.volume && next >= target) || (target < audio.volume && next <= target)) {
        audio.volume = Math.max(0, Math.min(1, target))
        clearInterval(fadeRef.current)
        fadeRef.current = null
        return
      }
      audio.volume = Math.max(0, Math.min(1, next))
    }, 40)
  }

  useImperativeHandle(ref, () => ({
    play: () => {
      const audio = audioRef.current
      if (!audio || (!audio.paused && audio.currentTime > 0)) return

      audio.volume = 0
      audio
        .play()
        .then(() => {
          onPlayingChange?.(true)
          fadeTo(mutedRef.current ? 0 : volume)
        })
        .catch(() => {
          onPlayingChange?.(false)
        })
    },
    toggleMute: () => {
      const audio = audioRef.current
      mutedRef.current = !mutedRef.current
      if (audio) fadeTo(mutedRef.current ? 0 : volume)
      return mutedRef.current
    },
  }))

  return <audio ref={audioRef} src={src} loop preload="auto" />
})

export default BackgroundMusic
