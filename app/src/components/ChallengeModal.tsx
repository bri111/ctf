import { useState, useEffect } from 'react'
import { CHALLENGES, POINT_VALUES } from '../data/challenges'
import type { ActiveChallenge, SolvedMap, HintsRevealedMap } from '../App'

type Props = {
  challenge: NonNullable<ActiveChallenge>
  solved: SolvedMap
  hintsRevealed: HintsRevealedMap
  hintsUsed: number
  maxHints: number
  onClose: () => void
  onSubmit: (flag: string) => 'correct' | 'wrong' | 'already'
  onUseHint: (challengeKey: string) => 'revealed' | 'denied' | 'cancelled'
  points: number
}

export default function ChallengeModal({
                                         challenge, solved, hintsRevealed, hintsUsed, maxHints,
                                         onClose, onSubmit, onUseHint, points,
                                       }: Props) {
  const { cat, idx, key } = challenge
  const ch       = CHALLENGES[cat][idx]
  const isSolved = !!solved[key]

  // Hint is shown if it was previously revealed for this specific challenge
  const [hintShown, setHintShown] = useState(!!hintsRevealed[key])
  const [input, setInput]         = useState('')
  const [feedback, setFeedback]   = useState<{ msg: string; type: string } | null>(null)

  // When switching between challenges, sync hint visibility from persisted state
  useEffect(() => {
    setInput('')
    setFeedback(null)
    setHintShown(!!hintsRevealed[key])
  }, [key, hintsRevealed])

  const handleSubmit = () => {
    const result = onSubmit(input)
    if (result === 'correct') {
      setFeedback({ msg: `✔ Correct! +${POINT_VALUES[idx]} points`, type: 'correct' })
    } else if (result === 'already') {
      setFeedback({ msg: 'Already solved!', type: 'already' })
    } else {
      setFeedback({ msg: '✘ Incorrect flag. Try again.', type: 'wrong' })
    }
  }

  const handleHintClick = () => {
    if (hintShown) return

    if (hintsUsed >= maxHints) {
      alert(`🚫 You've used all ${maxHints} hints! No more hints are available.`)
      return
    }

    const result = onUseHint(key)
    if (result === 'revealed') {
      setHintShown(true)
    }
    // 'cancelled' → user pressed Cancel on confirm, do nothing
    // 'denied'    → no hints left, already handled above
  }

  const hintsLeft = maxHints - hintsUsed

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-cat-badge">{cat}</div>
        <h2 className="modal-title">{ch.title}</h2>
        <div className="modal-pts">{points} pts</div>
        <p className="modal-desc">{ch.desc}</p>

        {/* Live challenge website link */}
        {ch.url && (
          <a
            className="challenge-link-btn"
            href={ch.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>🌐</span>
            Open Challenge Website
            <span className="link-arrow">↗</span>
          </a>
        )}

        {/* Hint section */}
        <div className="hint-section">
          {hintShown ? (
            <div className="modal-hint">
              <strong>Hint:</strong> {ch.hint}
            </div>
          ) : (
            <button
              className={`hint-reveal-btn ${hintsUsed >= maxHints ? 'hint-exhausted' : ''}`}
              onClick={handleHintClick}
              disabled={isSolved && !hintShown}
            >
              {hintsUsed >= maxHints
                ? '🚫 No hints remaining'
                : `💡 Reveal Hint (${hintsLeft} of ${maxHints} left)`}
            </button>
          )}
        </div>

        <div className="flag-input-row">
          <input
            className="flag-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="CTF{...}"
            disabled={isSolved || feedback?.type === 'correct'}
            autoComplete="off"
            autoFocus
          />
          <button
            className="btn-submit"
            onClick={handleSubmit}
            disabled={isSolved || feedback?.type === 'correct'}
          >
            Submit
          </button>
        </div>

        {feedback && (
          <div className={`flag-feedback ${feedback.type}`}>{feedback.msg}</div>
        )}
      </div>
    </div>
  )
}