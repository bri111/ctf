import logoSrc from '../assets/logo.svg'

type Props = {
  score: number
  solved: number
  total: number
}

export default function Header({ score, solved, total }: Props) {
  return (
    <header className="ctf-header">
      <div className="ctf-logo">
        <img src={logoSrc} alt="logo" className="logo-svg" />
        <span className="logo-white"> Crack</span>The<span className="logo-white">Egg</span>
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
