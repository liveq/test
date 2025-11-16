import { useState, useRef, useEffect } from 'react'
import Roulette from './components/Roulette'
import SettingsMenu from './components/SettingsMenu'
import './App.css'

const DEFAULT_PRIZES = [
  { id: 1, name: '치약,칫솔,구강스프레이(2+1)세트', percentage: 10, color: '#FF69B4' }, // 연핑크
  { id: 2, name: '구강스프레이 단품', percentage: 40, color: '#7FFFD4' }, // 민트
  { id: 3, name: '마우스워시 단품', percentage: 50, color: '#FFB6C1' } // 연한 핑크
]

function App() {
  const [prizes, setPrizes] = useState(DEFAULT_PRIZES)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [currentAudio, setCurrentAudio] = useState(null)

  const waitingAudioRef = useRef(null)
  const spinningAudioRef = useRef(null)
  const prize1AudioRef = useRef(null)
  const prize2AudioRef = useRef(null)
  const prize3AudioRef = useRef(null)

  useEffect(() => {
    // 대기 음악 자동 재생 (루프)
    waitingAudioRef.current = new Audio('/audio/waiting.mp3')
    waitingAudioRef.current.loop = true
    waitingAudioRef.current.volume = 0.5

    // 음악 파일이 있으면 재생 시도
    waitingAudioRef.current.play().catch(() => {
      // 자동재생 차단된 경우 무시
      console.log('대기 음악 자동재생이 차단되었습니다.')
    })

    spinningAudioRef.current = new Audio('/audio/spinning.mp3')
    prize1AudioRef.current = new Audio('/audio/prize1.mp3')
    prize2AudioRef.current = new Audio('/audio/prize2.mp3')
    prize3AudioRef.current = new Audio('/audio/prize3.mp3')

    return () => {
      waitingAudioRef.current?.pause()
    }
  }, [])

  const playAudio = (audioRef) => {
    if (currentAudio) {
      currentAudio.pause()
      currentAudio.currentTime = 0
    }

    audioRef.current.currentTime = 0
    audioRef.current.play().catch(() => {
      console.log('오디오 재생 실패')
    })
    setCurrentAudio(audioRef.current)
  }

  const handleSpin = () => {
    if (isSpinning) return

    setIsSpinning(true)

    // 대기 음악 중지, 회전 음악 재생
    waitingAudioRef.current?.pause()
    playAudio(spinningAudioRef)
  }

  const handleSpinEnd = (winningPrize) => {
    setIsSpinning(false)

    // 회전 음악 중지
    spinningAudioRef.current?.pause()

    // 당첨 등수에 따른 효과음 재생
    if (winningPrize.id === 1) {
      playAudio(prize1AudioRef)
    } else if (winningPrize.id === 2) {
      playAudio(prize2AudioRef)
    } else if (winningPrize.id === 3) {
      playAudio(prize3AudioRef)
    }

    // 3초 후 대기 음악 재개
    setTimeout(() => {
      waitingAudioRef.current?.play().catch(() => {})
    }, 3000)
  }

  return (
    <div className="app">
      {/* 상단 코랄리에 로고 배너 */}
      <header className="brand-header">
        <img
          src={`${import.meta.env.BASE_URL}images/logo-banner.png`}
          alt="CORALIER"
          className="brand-logo"
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
      </header>

      <button
        className="menu-button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="설정 메뉴"
      >
        <div className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <SettingsMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        prizes={prizes}
        setPrizes={setPrizes}
      />

      <Roulette
        prizes={prizes}
        onSpin={handleSpin}
        onSpinEnd={handleSpinEnd}
        isSpinning={isSpinning}
      />
    </div>
  )
}

export default App
