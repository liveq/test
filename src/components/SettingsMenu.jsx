import { useState, useEffect } from 'react'
import './SettingsMenu.css'

function SettingsMenu({ isOpen, onClose, prizes, setPrizes }) {
  const [tempPrizes, setTempPrizes] = useState(prizes)

  useEffect(() => {
    setTempPrizes(prizes)
  }, [prizes])

  const handleNameChange = (id, newName) => {
    setTempPrizes(prev =>
      prev.map(prize =>
        prize.id === id ? { ...prize, name: newName } : prize
      )
    )
  }

  const handlePercentageChange = (id, newPercentage) => {
    const value = Math.max(0, Math.min(100, Number(newPercentage)))
    setTempPrizes(prev =>
      prev.map(prize =>
        prize.id === id ? { ...prize, percentage: value } : prize
      )
    )
  }

  const handleColorChange = (id, newColor) => {
    setTempPrizes(prev =>
      prev.map(prize =>
        prize.id === id ? { ...prize, color: newColor } : prize
      )
    )
  }

  const addPrize = () => {
    const newId = Math.max(...tempPrizes.map(p => p.id)) + 1
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F']
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    setTempPrizes([
      ...tempPrizes,
      { id: newId, name: `${newId}등`, percentage: 0, color: randomColor }
    ])
  }

  const removePrize = (id) => {
    if (tempPrizes.length <= 1) {
      alert('최소 1개의 상품이 필요합니다.')
      return
    }
    setTempPrizes(prev => prev.filter(prize => prize.id !== id))
  }

  const getTotalPercentage = () => {
    return tempPrizes.reduce((sum, prize) => sum + prize.percentage, 0)
  }

  const normalizePercentages = () => {
    const total = getTotalPercentage()
    if (total === 0) {
      alert('총 비율이 0입니다. 최소한 하나의 비율을 설정해주세요.')
      return
    }

    setTempPrizes(prev =>
      prev.map(prize => ({
        ...prize,
        percentage: Math.round((prize.percentage / total) * 100)
      }))
    )
  }

  const handleSave = () => {
    const total = getTotalPercentage()

    if (Math.abs(total - 100) > 0.1) {
      const confirm = window.confirm(
        `총 비율이 ${total}%입니다. 자동으로 100%로 조정하시겠습니까?`
      )
      if (confirm) {
        normalizePercentages()
        return
      } else {
        return
      }
    }

    setPrizes(tempPrizes)
    onClose()
  }

  const handleReset = () => {
    if (window.confirm('설정을 초기화하시겠습니까?')) {
      const defaultPrizes = [
        { id: 1, name: '1등', percentage: 10, color: '#FFD700' },
        { id: 2, name: '2등', percentage: 40, color: '#C0C0C0' },
        { id: 3, name: '3등', percentage: 50, color: '#CD7F32' }
      ]
      setTempPrizes(defaultPrizes)
    }
  }

  if (!isOpen) return null

  const total = getTotalPercentage()
  const isValidTotal = Math.abs(total - 100) < 0.1

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>룰렛 설정</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="settings-content">
          <div className="total-indicator">
            <span>총 비율:</span>
            <span className={isValidTotal ? 'valid' : 'invalid'}>
              {total.toFixed(1)}%
            </span>
            {!isValidTotal && (
              <button className="normalize-button" onClick={normalizePercentages}>
                100%로 조정
              </button>
            )}
          </div>

          <div className="prizes-list">
            {tempPrizes.map((prize) => (
              <div key={prize.id} className="prize-item">
                <div className="prize-header">
                  <input
                    type="text"
                    value={prize.name}
                    onChange={(e) => handleNameChange(prize.id, e.target.value)}
                    className="prize-name-input"
                    placeholder="이름"
                  />
                  <button
                    className="remove-button"
                    onClick={() => removePrize(prize.id)}
                    disabled={tempPrizes.length <= 1}
                  >
                    🗑️
                  </button>
                </div>

                <div className="prize-controls">
                  <div className="control-group">
                    <label>비율 (%)</label>
                    <input
                      type="number"
                      value={prize.percentage}
                      onChange={(e) => handlePercentageChange(prize.id, e.target.value)}
                      min="0"
                      max="100"
                      step="1"
                      className="percentage-input"
                    />
                  </div>

                  <div className="control-group">
                    <label>색상</label>
                    <input
                      type="color"
                      value={prize.color}
                      onChange={(e) => handleColorChange(prize.id, e.target.value)}
                      className="color-input"
                    />
                  </div>
                </div>

                <div className="percentage-bar">
                  <div
                    className="percentage-fill"
                    style={{
                      width: `${prize.percentage}%`,
                      background: prize.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <button className="add-prize-button" onClick={addPrize}>
            + 항목 추가
          </button>
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
