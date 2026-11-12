import { useRef, useState } from 'react'
import EnvelopeIntro from './components/EnvelopeIntro'
import BackgroundMusic from './components/BackgroundMusic'
import ParticleField from './components/ParticleField'
import { Footer } from './components/Navigation'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import Program from './components/Program'
import Scripture from './components/Scripture'

export default function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [musicOff, setMusicOff] = useState(false)
  const musicRef = useRef(null)

  const handleLetterOpen = () => {
    musicRef.current?.play()
  }

  const handleToggleMusic = () => {
    const muted = musicRef.current?.toggleMute()
    setMusicOff(muted ?? false)
  }

  return (
    <div className="app">
      <BackgroundMusic ref={musicRef} />

      {showIntro && (
        <EnvelopeIntro
          onOpen={() => setIntroComplete(true)}
          onClosed={() => setShowIntro(false)}
          onLetterOpen={handleLetterOpen}
        />
      )}

      <ParticleField count={35} />

      {introComplete && (
        <button
          type="button"
          className="music-toggle"
          onClick={handleToggleMusic}
          aria-label={musicOff ? 'Turn music on' : 'Turn music off'}
          aria-pressed={!musicOff}
        >
          {musicOff ? '♪ Off' : '♪ On'}
        </button>
      )}

      <main className={introComplete ? 'main main--visible' : 'main'}>
        <Hero />
        <Countdown />
        <Program />
        <Scripture />
        <Footer />
      </main>
    </div>
  )
}
