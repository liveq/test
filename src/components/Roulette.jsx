import { useState, useRef, useEffect } from 'react'
import './Roulette.css'

function Roulette({ prizes, slotCount, slotConfig, onSpin, onSpinEnd, isSpinning }) {
  const [rotation, setRotation] = useState(0)
  const [winner, setWinner] = useState(null)
  const wheelRef = useRef(null)
  const spinTimeoutRef = useRef(null)
  const currentWinnerRef = useRef(null)

  // slotConfig 기반 룰렛 칸 생성
  const getWheelSlots = () => {
    return slotConfig.map((rank, index) => {
      const prize = prizes.find(p => p.id === rank)
      return {
        slotIndex: index,
        rank: rank,
        prize: prize || prizes[0] // 혹시 없으면 첫 번째 상품
      }
    })
  }

  // 랜덤 칸 선택
  const getRandomPrize = () => {
    const randomSlotIndex = Math.floor(Math.random() * slotCount)
    const rank = slotConfig[randomSlotIndex]
    const prize = prizes.find(p => p.id === rank)

    console.log('🎲 랜덤 칸 선택:', randomSlotIndex + 1, '/', slotCount)
    console.log('🏆 당첨 등수:', rank + '등')

    return { ...prize, slotIndex: randomSlotIndex }
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
    console.log('🎰 당첨 상품:', winningPrize.name)
    console.log('📍 당첨 칸:', winningPrize.slotIndex + 1)
    setWinner(null)
    onSpin()

    // 동적 칸 수에 따른 각도 계산
    const slotAngle = 360 / slotCount
    const slotIndex = winningPrize.slotIndex

    // 해당 칸의 중앙 각도 (칸 1의 중앙이 0도가 되도록)
    const targetAngle = slotIndex * slotAngle

    console.log('🎯 목표 각도:', targetAngle.toFixed(1), '도 (칸', slotIndex + 1, '의 중앙)')

    // 여러 바퀴 회전 + 목표 각도 계산
    // 화살표는 12시에 고정, slot 중앙을 12시로 이동시키기
    const spins = 5 + Math.random() * 3 // 5-8바퀴
    const totalRotation = 360 * spins + (360 - targetAngle)

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
              const slotAngle = 360 / slotCount
              // 칸 1의 중앙이 0도(12시)가 되도록 오프셋
              const startAngle = slot.slotIndex * slotAngle - slotAngle / 2
              const endAngle = startAngle + slotAngle

              // SVG path 계산
              const startRad = (startAngle - 90) * Math.PI / 180
              const endRad = (endAngle - 90) * Math.PI / 180

              const x1 = 200 + 180 * Math.cos(startRad)
              const y1 = 200 + 180 * Math.sin(startRad)
              const x2 = 200 + 180 * Math.cos(endRad)
              const y2 = 200 + 180 * Math.sin(endRad)

              // 호가 180도 이상인지 확인
              const largeArcFlag = slotAngle > 180 ? 1 : 0

              const pathData = [
                `M 200 200`,
                `L ${x1} ${y1}`,
                `A 180 180 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                `Z`
              ].join(' ')

              // 텍스트는 각 등수의 대표 칸(중간 칸)에만 표시
              const allSlots = getWheelSlots()
              const sameRankSlots = allSlots.filter(s => s.rank === slot.rank)
              const middleIndex = Math.floor(sameRankSlots.length / 2)
              const isMiddleSlot = sameRankSlots[middleIndex].slotIndex === slot.slotIndex

              // 칸의 중앙 (오프셋 적용된 각도)
              const midAngle = slot.slotIndex * slotAngle
              const midRad = (midAngle - 90) * Math.PI / 180
              const textX = 200 + 110 * Math.cos(midRad)
              const textY = 200 + 110 * Math.sin(midRad)

              // 텍스트 크기를 칸 수에 따라 조정
              const fontSize = Math.max(8, Math.min(18, 360 / slotCount))

              return (
                <g key={`slot-${slot.slotIndex}`}>
                  <path
                    d={pathData}
                    fill={slot.prize.color}
                    stroke="#fff"
                    strokeWidth="2"
                  />
                  {isMiddleSlot && slotCount <= 50 && (
                    <text
                      x={textX}
                      y={textY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#fff"
                      fontSize={fontSize}
                      fontWeight="bold"
                      style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
                    >
                      {slot.rank}등
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
          <div className="result-card">
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
