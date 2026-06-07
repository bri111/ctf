import { useState, useEffect } from 'react'
import { CHALLENGES, POINT_VALUES } from '../data/challenges'
import type { ActiveChallenge, SolvedMap } from '../App'

type Props = {
  challenge: NonNullable<ActiveChallenge>
  solved: SolvedMap
  onClose: () => void
  onSubmit: (flag: string) => 'correct' | 'wrong' | 'already'
  points: number
}

export default function ChallengeModal({ challenge, solved, onClose, onSubmit, points }: Props) {
  const { cat, idx, key } = challenge
  const ch = CHALLENGES[cat][idx]
  const isSolved = !!solved[key]

  const [input, setInput] = useState('')
  const [feedback, setFeedback] = useState<{ msg: string; type: string } | null>(null)

  useEffect(() => {
    setInput('')
    setFeedback(null)
  }, [key])

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

        <div className="modal-hint">
          <strong>Hint:</strong> {ch.hint}
        </div>

        {isSolved && (
          <div className="solved-banner">✅ You already solved this challenge!</div>
        )}

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
