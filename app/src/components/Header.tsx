type Props = {
  score: number
  solved: number
  total: number
}

export default function Header({ score, solved, total }: Props) {
  return (
    <header className="ctf-header">
      <div className="ctf-logo">
        🚩 <span className="logo-white">CTF</span>SEC<span className="logo-white">ARENA</span>
      </div>
      <div className="header-stats">
        <div className="stat-pill">
          <div className="stat-label">Your Score</div>
          <div className="stat-value">{score}</div>
        </div>
        <div className="stat-pill">
          <div className="stat-label">Solved</div>
          <div className="stat-value">{solved}/{total}</div>
        </div>
      </div>
    </header>
  )
}
