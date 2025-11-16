import { useState, useEffect } from 'react'
import './SettingsMenu.css'

function SettingsMenu({
  isOpen,
  onClose,
  prizes,
  setPrizes,
  slotCount,
  setSlotCount,
  slotConfig,
  setSlotConfig
}) {
  const [tempPrizes, setTempPrizes] = useState(prizes)
  const [tempSlotCount, setTempSlotCount] = useState(slotCount)
  const [tempSlotConfig, setTempSlotConfig] = useState(slotConfig)

  useEffect(() => {
    setTempPrizes(prizes)
    setTempSlotCount(slotCount)
    setTempSlotConfig(slotConfig)
  }, [prizes, slotCount, slotConfig])

  // 총 칸 수 변경
  const handleSlotCountChange = (newCount) => {
    const count = Math.max(1, Math.min(360, Number(newCount)))
    setTempSlotCount(count)

    // slotConfig 크기 조정
    const newConfig = [...tempSlotConfig]
    if (count > newConfig.length) {
      // 칸이 늘어나면 마지막 등수로 채움
      const lastRank = newConfig[newConfig.length - 1] || 1
      while (newConfig.length < count) {
        newConfig.push(lastRank)
      }
    } else {
      // 칸이 줄어들면 자름
      newConfig.length = count
    }
    setTempSlotConfig(newConfig)
  }

  // 특정 칸의 등수 변경
  const handleSlotRankChange = (slotIndex, rank) => {
    const newConfig = [...tempSlotConfig]
    newConfig[slotIndex] = Number(rank)
    setTempSlotConfig(newConfig)
  }

  // 상품명 변경
  const handleNameChange = (id, newName) => {
    setTempPrizes(prev =>
      prev.map(prize =>
        prize.id === id ? { ...prize, name: newName } : prize
      )
    )
  }

  // 색상 변경
  const handleColorChange = (id, newColor) => {
    setTempPrizes(prev =>
      prev.map(prize =>
        prize.id === id ? { ...prize, color: newColor } : prize
      )
    )
  }

  // 상품(등수) 추가
  const addPrize = () => {
    const newId = Math.max(...tempPrizes.map(p => p.id)) + 1
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F']
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    setTempPrizes([
      ...tempPrizes,
      { id: newId, name: `${newId}등`, color: randomColor }
    ])
  }

  // 상품(등수) 삭제
  const removePrize = (id) => {
    if (tempPrizes.length <= 1) {
      alert('최소 1개의 상품이 필요합니다.')
      return
    }

    // 삭제하려는 등수가 slotConfig에 사용 중인지 확인
    const isUsed = tempSlotConfig.some(rank => rank === id)
    if (isUsed) {
      alert(`${id}등은 현재 룰렛 칸에 사용 중입니다. 먼저 칸 설정을 변경해주세요.`)
      return
    }

    setTempPrizes(prev => prev.filter(prize => prize.id !== id))
  }

  // 저장
  const handleSave = () => {
    // 모든 칸이 유효한 등수인지 확인
    const prizeIds = tempPrizes.map(p => p.id)
    const invalidSlots = tempSlotConfig.filter(rank => !prizeIds.includes(rank))

    if (invalidSlots.length > 0) {
      alert('일부 칸에 존재하지 않는 등수가 설정되어 있습니다. 모든 칸을 확인해주세요.')
      return
    }

    setPrizes(tempPrizes)
    setSlotCount(tempSlotCount)
    setSlotConfig(tempSlotConfig)
    onClose()
  }

  // 초기화
  const handleReset = () => {
    if (window.confirm('설정을 초기화하시겠습니까?')) {
      const defaultPrizes = [
        { id: 1, name: '치약,칫솔,구강스프레이(2+1)세트', color: '#FF69B4' },
        { id: 2, name: '구강스프레이 단품', color: '#7FFFD4' },
        { id: 3, name: '마우스워시 단품', color: '#FFB6C1' }
      ]
      setTempPrizes(defaultPrizes)
      setTempSlotCount(10)
      setTempSlotConfig([1, 2, 2, 2, 2, 3, 3, 3, 3, 3])
    }
  }

  if (!isOpen) return null

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>룰렛 설정</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="settings-content">
          {/* 총 칸 수 설정 */}
          <div className="slot-count-section">
            <label>총 칸 수 (1-360)</label>
            <input
              type="number"
              value={tempSlotCount}
              onChange={(e) => handleSlotCountChange(e.target.value)}
              min="1"
              max="360"
              className="slot-count-input"
            />
          </div>

          {/* 상품(등수) 관리 */}
          <div className="prizes-section">
            <h3>상품 관리</h3>
            <div className="prizes-list">
              {tempPrizes.map((prize) => (
                <div key={prize.id} className="prize-item">
                  <div className="prize-header">
                    <span className="prize-rank">{prize.id}등</span>
                    <input
                      type="text"
                      value={prize.name}
                      onChange={(e) => handleNameChange(prize.id, e.target.value)}
                      className="prize-name-input"
                      placeholder="상품명"
                    />
                    <input
                      type="color"
                      value={prize.color}
                      onChange={(e) => handleColorChange(prize.id, e.target.value)}
                      className="color-input"
                    />
                    <button
                      className="remove-button"
                      onClick={() => removePrize(prize.id)}
                      disabled={tempPrizes.length <= 1}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="add-prize-button" onClick={addPrize}>
              + 상품 추가
            </button>
          </div>

          {/* 칸별 등수 설정 */}
          <div className="slot-config-section">
            <h3>칸별 등수 설정</h3>
            <div className="slot-config-grid">
              {tempSlotConfig.map((rank, index) => (
                <div key={index} className="slot-config-item">
                  <label>칸 {index + 1}</label>
                  <select
                    value={rank}
                    onChange={(e) => handleSlotRankChange(index, e.target.value)}
                    className="slot-rank-select"
                  >
                    {tempPrizes.map(prize => (
                      <option key={prize.id} value={prize.id}>
                        {prize.id}등
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="settings-footer">
          <button className="reset-button" onClick={handleReset}>
            초기화
          </button>
          <button className="save-button" onClick={handleSave}>
            저장
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsMenu
