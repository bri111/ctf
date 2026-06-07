import { CATEGORIES, POINT_VALUES } from '../data/challenges'
import type { SolvedMap } from '../App'

type Props = {
  solved: SolvedMap
  score: number
}

export default function ProgressView({ solved, score }: Props) {
  return (
    <div className="progress-view">
      <div className="total-points-display">
        <div className="total-pts-label">Total Points Earned</div>
        <div className="total-pts-value">{score}</div>
      </div>

      <div className="progress-section">
        <div className="progress-title">Category Progress</div>
        {CATEGORIES.map(cat => {
          const done = POINT_VALUES.filter((_, i) => solved[`${cat.name}::${i}`]).length
          const pct = Math.round((done / 5) * 100)
          return (
            <div key={cat.name} className="cat-progress-row">
              <div className="cat-prog-label">{cat.icon} {cat.name}</div>
              <div className="cat-prog-bar-wrap">
                <div className="cat-prog-bar" style={{ width: `${pct}%` }} />
              </div>
              <div className="cat-prog-frac">{done}/5</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
