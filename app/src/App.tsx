import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import BoardView from './components/BoardView'
import ProgressView from './components/ProgressView'
import RulesView from './components/RulesView'
import ChallengeModal from './components/ChallengeModal'
import { CHALLENGES, POINT_VALUES } from './data/challenges'
import './App.css'

export type SolvedMap = Record<string, boolean>
export type ActiveChallenge = {
  cat: string
  idx: number
  key: string
} | null

export type View = 'board' | 'progress' | 'rules'

const STORAGE_KEY = 'ctf-arena-solved'

function loadSaved(): SolvedMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function App() {
  const [view, setView] = useState<View>('board')
  const [solved, setSolved] = useState<SolvedMap>(loadSaved)
  const [activeChallenge, setActiveChallenge] = useState<ActiveChallenge>(null)

  // Persist solved map to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(solved))
  }, [solved])

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

  const resetProgress = () => {
    if (confirm('Reset ALL progress? This cannot be undone.')) {
      setSolved({})
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
        {view === 'board' && (
          <BoardView solved={solved} onOpen={openChallenge} />
        )}
        {view === 'progress' && (
          <ProgressView solved={solved} score={totalScore()} />
        )}
        {view === 'rules' && <RulesView />}
      </main>

      {activeChallenge && (
        <ChallengeModal
          challenge={activeChallenge}
          solved={solved}
          onClose={closeModal}
          onSubmit={submitFlag}
          points={POINT_VALUES[activeChallenge.idx]}
        />
      )}

      <Footer />
    </div>
  )
}

export default App