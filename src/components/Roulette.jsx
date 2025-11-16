import { useState, useRef, useEffect } from 'react'
import './Roulette.css'

function Roulette({ prizes, onSpin, onSpinEnd, isSpinning }) {
  const [rotation, setRotation] = useState(0)
  const [winner, setWinner] = useState(null)
  const wheelRef = useRef(null)
  const spinTimeoutRef = useRef(null)
  const currentWinnerRef = useRef(null)

  // 10칸 룰렛 구조: 각 칸(36도)에 상품 할당
  const getWheelSlots = () => {
    const slots = []

    // 1등 (10%): 1칸
    slots.push({ slotIndex: 0, prize: prizes.find(p => p.id === 1) })

    // 2등 (40%): 4칸
    for (let i = 1; i <= 4; i++) {
      slots.push({ slotIndex: i, prize: prizes.find(p => p.id === 2) })
    }

    // 3등 (50%): 5칸
    for (let i = 5; i <= 9; i++) {
      slots.push({ slotIndex: i, prize: prizes.find(p => p.id === 3) })
    }

    return slots
  }

  const getRandomPrize = () => {
    const slots = getWheelSlots()
    const randomSlotIndex = Math.floor(Math.random() * 10)
    const selectedSlot = slots.find(s => s.slotIndex === randomSlotIndex)

    console.log('🎲 랜덤 칸 선택:', randomSlotIndex, '/', 9)

    return { ...selectedSlot.prize, slotIndex: randomSlotIndex }
  }

  const handleSpinClick = () => {
    if (isSpinning) {
      // 회전 중이면 즉시 정지
      if (spinTimeoutRef.current) {
        clearTimeout(spinTimeoutRef.current)
        spinTimeoutRef.current = null
      }

      // 즉시 당첨 결과 표시
      if (currentWinnerRef.current) {
        setWinner(currentWinnerRef.current)
        onSpinEnd(currentWinnerRef.current)
      }
      return
    }

    const winningPrize = getRandomPrize()
    currentWinnerRef.current = winningPrize
    console.log('🎰 당첨 상품:', winningPrize)
    console.log('📍 당첨 칸:', winningPrize.slotIndex, '/ 9')
    console.log('📊 현재 prizes 순서:', prizes)
    setWinner(null)
    onSpin()

    // 10칸 룰렛 각도 계산
    const slotAngle = 36 // 360도 / 10칸
    const slotIndex = winningPrize.slotIndex

    // 해당 칸의 중앙 각도 (SVG는 -90도 보정되어 있음)
    const targetAngle = slotIndex * slotAngle + slotAngle / 2

    console.log('🎯 목표 각도:', targetAngle, '도 (칸', slotIndex, '의 중앙)')

    // 여러 바퀴 회전 + 목표 각도 (SVG -90도 보정 반영)
    const spins = 5 + Math.random() * 3 // 5-8바퀴
    const totalRotation = 360 * spins + (360 - targetAngle + 90)

    setRotation(prev => prev + totalRotation)

    // 애니메이션 완료 후
    spinTimeoutRef.current = setTimeout(() => {
      setWinner(winningPrize)
      onSpinEnd(winningPrize)
      spinTimeoutRef.current = null
      currentWinnerRef.current = null
    }, 5000) // 5초 회전
  }

  // 모달 닫기
  const handleCloseModal = () => {
    setWinner(null)
  }

  return (
    <div className="roulette-container">
      <div className="roulette-wheel-wrapper">
        {/* 고정 포인터 */}
        <div className="pointer"></div>

        {/* 회전하는 휠 */}
        <div
          ref={wheelRef}
          className={`roulette-wheel ${isSpinning ? 'spinning' : ''}`}
          style={{
            transform: `rotate(${rotation}deg)`
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 400 400">
            {getWheelSlots().map((slot) => {
              const slotAngle = 36 // 각 칸은 36도
              const startAngle = slot.slotIndex * slotAngle
              const endAngle = startAngle + slotAngle

              // SVG path 계산
              const startRad = (startAngle - 90) * Math.PI / 180
              const endRad = (endAngle - 90) * Math.PI / 180

              const x1 = 200 + 180 * Math.cos(startRad)
              const y1 = 200 + 180 * Math.sin(startRad)
              const x2 = 200 + 180 * Math.cos(endRad)
              const y2 = 200 + 180 * Math.sin(endRad)

              const pathData = [
                `M 200 200`,
                `L ${x1} ${y1}`,
                `A 180 180 0 0 1 ${x2} ${y2}`,
                `Z`
              ].join(' ')

              // 텍스트는 각 상품의 대표 칸에만 표시
              // 1등: 칸 0, 2등: 칸 2 (중간), 3등: 칸 7 (중간)
              const showText = (
                (slot.prize.id === 1 && slot.slotIndex === 0) ||
                (slot.prize.id === 2 && slot.slotIndex === 2) ||
                (slot.prize.id === 3 && slot.slotIndex === 7)
              )

              const midAngle = (startAngle + endAngle) / 2
              const midRad = (midAngle - 90) * Math.PI / 180
              const textX = 200 + 110 * Math.cos(midRad)
              const textY = 200 + 110 * Math.sin(midRad)

              return (
                <g key={`slot-${slot.slotIndex}`}>
                  <path
                    d={pathData}
                    fill={slot.prize.color}
                    stroke="#fff"
                    strokeWidth="3"
                  />
                  {showText && (
                    <text
                      x={textX}
                      y={textY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#fff"
                      fontSize="18"
                      fontWeight="bold"
                      style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
                    >
                      {slot.prize.name}
                    </text>
                  )}
                </g>
              )
            })}
            {/* 중앙 원 - 흰 배경 */}
            <circle cx="200" cy="200" r="50" fill="#fff" stroke="#FF69B4" strokeWidth="4" />

            {/* 중앙 로고 */}
            <image
              href={`${import.meta.env.BASE_URL}images/logo-symbol.png`}
              x="160"
              y="160"
              width="80"
              height="80"
              style={{ pointerEvents: 'none' }}
            />
          </svg>
        </div>
      </div>

      {/* 스핀 버튼 */}
      <button
        className={`spin-button ${isSpinning ? 'spinning' : ''}`}
        onClick={handleSpinClick}
      >
        {isSpinning ? '멈춤' : '룰렛 돌리기'}
      </button>

      {/* 결과 표시 */}
      {winner && (
        <div className="result-overlay" onClick={handleCloseModal}>
          <div className="result-card" onClick={(e) => e.stopPropagation()}>
            <h2>🎉 축하합니다! 🎉</h2>

            {/* 당첨 상품 이미지 */}
            <div className="prize-image-container">
              <img
                src={`${import.meta.env.BASE_URL}images/prizes/prize-${winner.id}.png`}
                alt={winner.name}
                className="prize-image"
                onError={(e) => {
                  console.error('❌ 이미지 로드 실패:', e.target.src)
                  e.target.style.display = 'none'
                }}
                onLoad={(e) => {
                  console.log('✅ 이미지 로드 성공:', e.target.src)
                }}
              />
            </div>

            {/* 상품명 */}
            <div className="winner-name">
              {winner.name}
            </div>
            
            <button className="close-modal-button" onClick={handleCloseModal}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Roulette
