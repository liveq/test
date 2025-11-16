import { useState, useRef, useEffect } from 'react'
import './Roulette.css'

function Roulette({ prizes, onSpin, onSpinEnd, isSpinning }) {
  const [rotation, setRotation] = useState(0)
  const [winner, setWinner] = useState(null)
  const wheelRef = useRef(null)

  const getRandomPrize = () => {
    const random = Math.random() * 100
    let cumulative = 0

    for (const prize of prizes) {
      cumulative += prize.percentage
      if (random <= cumulative) {
        return prize
      }
    }

    return prizes[prizes.length - 1]
  }

  const handleSpinClick = () => {
    if (isSpinning) return

    const winningPrize = getRandomPrize()
    setWinner(null)
    onSpin()

    // 당첨 각도 계산
    const prizeIndex = prizes.findIndex(p => p.id === winningPrize.id)
    let targetAngle = 0

    for (let i = 0; i < prizeIndex; i++) {
      targetAngle += (prizes[i].percentage / 100) * 360
    }

    // 해당 구간 중간 지점을 목표로
    targetAngle += ((winningPrize.percentage / 100) * 360) / 2

    // 여러 바퀴 회전 + 목표 각도
    const spins = 5 + Math.random() * 3 // 5-8바퀴
    const totalRotation = 360 * spins + (360 - targetAngle)

    setRotation(prev => prev + totalRotation)

    // 애니메이션 완료 후
    setTimeout(() => {
      setWinner(winningPrize)
      onSpinEnd(winningPrize)
    }, 5000) // 5초 회전
  }

  // 모달 닫기
  const handleCloseModal = () => {
    setWinner(null)
  }

  // 룰렛 휠 세그먼트 그리기
  const renderWheel = () => {
    const segments = []
    let currentAngle = 0

    prizes.forEach((prize, index) => {
      const angle = (prize.percentage / 100) * 360
      segments.push(
        <div
          key={prize.id}
          className="wheel-segment"
          style={{
            '--angle': `${angle}deg`,
            '--start-angle': `${currentAngle}deg`,
            '--color': prize.color
          }}
        >
          <div className="segment-content">
            <span className="segment-text">{prize.name}</span>
            <span className="segment-percentage">{prize.percentage}%</span>
          </div>
        </div>
      )
      currentAngle += angle
    })

    return segments
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
            {prizes.map((prize, index) => {
              let startAngle = 0
              for (let i = 0; i < index; i++) {
                startAngle += (prizes[i].percentage / 100) * 360
              }
              const angle = (prize.percentage / 100) * 360
              const endAngle = startAngle + angle

              // SVG path 계산
              const startRad = (startAngle - 90) * Math.PI / 180
              const endRad = (endAngle - 90) * Math.PI / 180

              const x1 = 200 + 180 * Math.cos(startRad)
              const y1 = 200 + 180 * Math.sin(startRad)
              const x2 = 200 + 180 * Math.cos(endRad)
              const y2 = 200 + 180 * Math.sin(endRad)

              const largeArcFlag = angle > 180 ? 1 : 0

              const pathData = [
                `M 200 200`,
                `L ${x1} ${y1}`,
                `A 180 180 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                `Z`
              ].join(' ')

              // 텍스트 위치 계산 (중간 각도)
              const midAngle = (startAngle + endAngle) / 2
              const midRad = (midAngle - 90) * Math.PI / 180
              const textX = 200 + 120 * Math.cos(midRad)
              const textY = 200 + 120 * Math.sin(midRad)

              return (
                <g key={prize.id}>
                  <path
                    d={pathData}
                    fill={prize.color}
                    stroke="#fff"
                    strokeWidth="3"
                  />
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
                    {prize.name}
                  </text>
                  <text
                    x={textX}
                    y={textY + 18}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#fff"
                    fontSize="14"
                  >
                    {prize.percentage}%
                  </text>
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
        className={`spin-button ${isSpinning ? 'disabled' : ''}`}
        onClick={handleSpinClick}
        disabled={isSpinning}
      >
        {isSpinning ? '회전 중...' : '룰렛 돌리기'}
      </button>

      {/* 결과 표시 */}
      {winner && (
        <div className="result-overlay" onClick={handleCloseModal}>
          <div className="result-card" onClick={(e) => e.stopPropagation()}>
            <h2>축하합니다!</h2>
            <div className="winner-badge" style={{ background: winner.color }}>
              {winner.name}
            </div>
            <p>당첨되었습니다!</p>
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
