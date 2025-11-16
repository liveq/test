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
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)

  const bgmAudioRef = useRef(null)
  const bgmPlaylistRef = useRef([])
  const currentBgmIndexRef = useRef(0)
  const spinningAudioRef = useRef(null)
  const prize1AudioRef = useRef(null)
  const prize2AudioRef = useRef(null)
  const prize3AudioRef = useRef(null)

  useEffect(() => {
    // BGM 파일 6개 랜덤 순서로 재생목록 생성
    const bgmFiles = [
      `${import.meta.env.BASE_URL}audio/bgm1.mp3`,
      `${import.meta.env.BASE_URL}audio/bgm2.mp3`,
      `${import.meta.env.BASE_URL}audio/bgm3.mp3`,
      `${import.meta.env.BASE_URL}audio/bgm4.mp3`,
      `${import.meta.env.BASE_URL}audio/bgm5.mp3`,
      `${import.meta.env.BASE_URL}audio/bgm6.mp3`
    ]

    // 랜덤 셔플
    bgmPlaylistRef.current = bgmFiles.sort(() => Math.random() - 0.5)

    // 첫 번째 BGM 설정
    bgmAudioRef.current = new Audio(bgmPlaylistRef.current[0])
    bgmAudioRef.current.volume = 0.5

    // 곡이 끝나면 다음 곡 재생 (연속재생)
    bgmAudioRef.current.addEventListener('ended', () => {
      currentBgmIndexRef.current = (currentBgmIndexRef.current + 1) % bgmPlaylistRef.current.length
      bgmAudioRef.current.src = bgmPlaylistRef.current[currentBgmIndexRef.current]
      bgmAudioRef.current.play().catch(() => {})
    })

    spinningAudioRef.current = new Audio(`${import.meta.env.BASE_URL}audio/spinning.mp3`)
    prize1AudioRef.current = new Audio(`${import.meta.env.BASE_URL}audio/prize1.mp3`)
    prize2AudioRef.current = new Audio(`${import.meta.env.BASE_URL}audio/prize2.mp3`)
    prize3AudioRef.current = new Audio(`${import.meta.env.BASE_URL}audio/prize3.mp3`)

    return () => {
      bgmAudioRef.current?.pause()
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

  const toggleMusic = () => {
    if (isMusicPlaying) {
      bgmAudioRef.current?.pause()
      setIsMusicPlaying(false)
    } else {
      bgmAudioRef.current?.play().catch(() => {
        console.log('BGM 재생 실패')
      })
      setIsMusicPlaying(true)
    }
  }

  const handleSpin = () => {
    if (isSpinning) return

    setIsSpinning(true)

    // BGM 중지, 회전 음악 재생
    bgmAudioRef.current?.pause()
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

    // 3초 후 BGM 재개 (재생 중이었다면)
    setTimeout(() => {
      if (isMusicPlaying) {
        bgmAudioRef.current?.play().catch(() => {})
      }
    }, 3000)
  }

  return (
    <div className="app">
      {/* 상단 코랄리에 로고 */}
      <header className="brand-header">
        <img
          src={`${import.meta.env.BASE_URL}images/logo-banner.jpg`}
          alt="CORALIER"
          className="brand-logo"
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />

        {/* 플로팅 버튼 그룹 */}
        <div className="floating-buttons">
          {/* 설정 버튼 */}
          <button
            className="floating-button settings-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="설정"
          >
            ⚙️
          </button>

          {/* 음악 재생/정지 버튼 */}
          <button
            className="floating-button music-button"
            onClick={toggleMusic}
            aria-label={isMusicPlaying ? '음악 정지' : '음악 재생'}
          >
            {isMusicPlaying ? '⏸️' : '▶️'}
          </button>
        </div>
      </header>

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
