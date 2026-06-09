import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import BoardView from './components/BoardView'
import ProgressView from './components/ProgressView'
import RulesView from './components/RulesView'
import ChallengeModal from './components/ChallengeModal'
import { CHALLENGES, POINT_VALUES } from './data/challenges'
import './App.css'

export type SolvedMap   = Record<string, boolean>
export type HintsRevealedMap = Record<string, boolean>  // key = "cat::idx"
export type ActiveChallenge = {
  cat: string
  idx: number
  key: string
} | null

export type View = 'board' | 'progress' | 'rules'

const STORAGE_KEY      = 'ctf-arena-solved'
const HINTS_KEY        = 'ctf-arena-hints-used'
const HINTS_REVEAL_KEY = 'ctf-arena-hints-revealed'
const MAX_HINTS        = 10

function loadSaved(): SolvedMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

function loadHintsUsed(): number {
  try {
    const raw = localStorage.getItem(HINTS_KEY)
    return raw ? parseInt(raw) : 0
  } catch { return 0 }
}

function loadHintsRevealed(): HintsRevealedMap {
  try {
    const raw = localStorage.getItem(HINTS_REVEAL_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

function App() {
  const [view, setView]                       = useState<View>('board')
  const [solved, setSolved]                   = useState<SolvedMap>(loadSaved)
  const [activeChallenge, setActiveChallenge] = useState<ActiveChallenge>(null)
  const [hintsUsed, setHintsUsed]             = useState<number>(loadHintsUsed)
  const [hintsRevealed, setHintsRevealed]     = useState<HintsRevealedMap>(loadHintsRevealed)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(solved))
  }, [solved])

  useEffect(() => {
    localStorage.setItem(HINTS_KEY, String(hintsUsed))
  }, [hintsUsed])

  useEffect(() => {
    localStorage.setItem(HINTS_REVEAL_KEY, JSON.stringify(hintsRevealed))
  }, [hintsRevealed])

  const totalScore = () =>
    Object.keys(solved).reduce((sum, key) => {
      const idx = parseInt(key.split('::')[1])
      return sum + POINT_VALUES[idx]
    }, 0)

  const totalSolved = () => Object.keys(solved).length

  const openChallenge = (cat: string, idx: number) => {
    setActiveChallenge({ cat, idx, key: `${cat}::${idx}` })
  }

  const closeModal = () => setActiveChallenge(null)

  const submitFlag = (input: string): 'correct' | 'wrong' | 'already' => {
    if (!activeChallenge) return 'wrong'
    const { key, cat, idx } = activeChallenge
    if (solved[key]) return 'already'
    if (input.trim() === CHALLENGES[cat][idx].flag) {
      setSolved(prev => ({ ...prev, [key]: true }))
      return 'correct'
    }
    return 'wrong'
  }

  const useHint = (challengeKey: string): 'revealed' | 'denied' | 'cancelled' => {
    // Already revealed for this challenge — just show it, no cost
    if (hintsRevealed[challengeKey]) return 'revealed'

    if (hintsUsed >= MAX_HINTS) return 'denied'

    const confirmed = window.confirm(
      `Are you sure you want to use a hint?\n\nYou have ${MAX_HINTS - hintsUsed} hint${MAX_HINTS - hintsUsed === 1 ? '' : 's'} remaining (out of ${MAX_HINTS} total).`
    )
    if (!confirmed) return 'cancelled'

    setHintsUsed(prev => prev + 1)
    setHintsRevealed(prev => ({ ...prev, [challengeKey]: true }))
    return 'revealed'
  }

  const resetProgress = () => {
    if (confirm('Reset ALL progress? This cannot be undone.')) {
      setSolved({})
      setHintsUsed(0)
      setHintsRevealed({})
    }
  }

  return (
    <div className="app">
      <Header score={totalScore()} solved={totalSolved()} total={25} />

      <nav className="ctf-nav">
        {(['board', 'progress', 'rules'] as View[]).map(v => (
          <button
            key={v}
            className={`nav-tab ${view === v ? 'active' : ''}`}
            onClick={() => setView(v)}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
        <button className="nav-tab nav-tab-reset" onClick={resetProgress}>
          Reset
        </button>
      </nav>

      <main className="ctf-main">
        {view === 'board'    && <BoardView solved={solved} onOpen={openChallenge} />}
        {view === 'progress' && <ProgressView solved={solved} score={totalScore()} />}
        {view === 'rules'    && <RulesView />}
      </main>

      {activeChallenge && (
        <ChallengeModal
          challenge={activeChallenge}
          solved={solved}
          hintsRevealed={hintsRevealed}
          hintsUsed={hintsUsed}
          maxHints={MAX_HINTS}
          onClose={closeModal}
          onSubmit={submitFlag}
          onUseHint={useHint}
          points={POINT_VALUES[activeChallenge.idx]}
        />
      )}

      <Footer />
    </div>
  )
}

export default App