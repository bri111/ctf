import { CATEGORIES, POINT_VALUES } from '../data/challenges'
import type { SolvedMap } from '../App'

type Props = {
  solved: SolvedMap
  onOpen: (cat: string, idx: number) => void
}

export default function BoardView({ solved, onOpen }: Props) {
  return (
    <div className="board-view">
      {/* Category headers */}
      <div className="board-header-row">
        {CATEGORIES.map(cat => (
          <div key={cat.name} className="cat-header">
            <span className="cat-icon">{cat.icon}</span>
            <span className="cat-name">{cat.name}</span>
          </div>
        ))}
      </div>

      {/* Challenge rows */}
      {POINT_VALUES.map((pts, rowIdx) => (
        <div key={pts} className="board-row">
          {CATEGORIES.map(cat => {
            const key = `${cat.name}::${rowIdx}`
            const isSolved = !!solved[key]
            return (
              <button
                key={cat.name}
                className={`challenge-cell ${isSolved ? 'solved' : ''}`}
                onClick={() => onOpen(cat.name, rowIdx)}
                disabled={isSolved}
              >
                {isSolved ? (
                  <span className="solved-check">✔</span>
                ) : (
                  <span className="cell-points">{pts}</span>
                )}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
