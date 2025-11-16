import { useState, useRef, useEffect } from 'react'
import Roulette from './components/Roulette'
import SettingsMenu from './components/SettingsMenu'
import './App.css'

const DEFAULT_PRIZES = [
  { id: 1, name: '치약,칫솔,구강스프레이(2+1)세트', color: '#FF69B4' }, // 1등
  { id: 2, name: '구강스프레이 단품', color: '#7FFFD4' }, // 2등
  { id: 3, name: '마우스워시 단품', color: '#FFB6C1' } // 3등
]

const DEFAULT_SLOT_COUNT = 10
const DEFAULT_SLOT_CONFIG = [1, 2, 2, 2, 2, 3, 3, 3, 3, 3] // 각 칸에 할당된 등수 (1등 1칸, 2등 4칸, 3등 5칸)

function App() {
  const [prizes, setPrizes] = useState(DEFAULT_PRIZES)
  const [slotCount, setSlotCount] = useState(DEFAULT_SLOT_COUNT)
  const [slotConfig, setSlotConfig] = useState(DEFAULT_SLOT_CONFIG)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [currentAudio, setCurrentAudio] = useState(null)
  const [isMusicPlaying, setIsMusicPlaying] = useState(true) // 자동재생
  const [volume, setVolume] = useState(50) // 초기 볼륨 50%

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

    // 자동재생 시도
    bgmAudioRef.current.play().catch(() => {
      console.log('자동재생이 차단되었습니다. 재생 버튼을 눌러주세요.')
      setIsMusicPlaying(false)
    })

    spinningAudioRef.current = new Audio(`${import.meta.env.BASE_URL}audio/spinning.mp3`)
    prize1AudioRef.current = new Audio(`${import.meta.env.BASE_URL}audio/prize1.mp3`)
    prize2AudioRef.current = new Audio(`${import.meta.env.BASE_URL}audio/prize2.mp3`)
    prize3AudioRef.current = new Audio(`${import.meta.env.BASE_URL}audio/prize3.mp3`)

    return () => {
      bgmAudioRef.current?.pause()
    }
  }, [])

  // 볼륨 변경 시 BGM 볼륨 적용
  useEffect(() => {
    if (bgmAudioRef.current) {
      bgmAudioRef.current.volume = volume / 100
    }
  }, [volume])

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

    // BGM은 계속 재생, 회전 음악만 추가 재생
    if (spinningAudioRef.current) {
      spinningAudioRef.current.currentTime = 0
      spinningAudioRef.current.play().catch(() => {})
    }
  }

  const handleSpinEnd = (winningPrize) => {
    setIsSpinning(false)

    // 회전 음악 중지
    spinningAudioRef.current?.pause()

    // BGM은 계속 재생, 효과음만 추가 재생
    let prizeAudio = null
    if (winningPrize.id === 1) {
      prizeAudio = prize1AudioRef.current
    } else if (winningPrize.id === 2) {
      prizeAudio = prize2AudioRef.current
    } else if (winningPrize.id === 3) {
      prizeAudio = prize3AudioRef.current
    }

    if (prizeAudio) {
      prizeAudio.currentTime = 0
      prizeAudio.play().catch(() => {})
    }
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

          {/* 볼륨 조절 */}
          <div className="volume-control">
            <div className="volume-label">🔊 {volume}%</div>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="volume-slider"
            />
          </div>
        </div>
      </header>

        <SettingsMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          prizes={prizes}
          setPrizes={setPrizes}
          slotCount={slotCount}
          setSlotCount={setSlotCount}
          slotConfig={slotConfig}
          setSlotConfig={setSlotConfig}
        />

        <Roulette
          prizes={prizes}
          slotCount={slotCount}
          slotConfig={slotConfig}
          onSpin={handleSpin}
          onSpinEnd={handleSpinEnd}
          isSpinning={isSpinning}
        />
    </div>
  )
}

export default App
