export default function Footer() {
  return (
    <footer className="ctf-footer">
      <span className="footer-mono">Crack the Egg</span>
      <span className="footer-sep">|</span>
      <span className="footer-mono">Girls In Cyber © {new Date().getFullYear()}</span>
      <span className="footer-sep">|</span>
      <span className="footer-mono">For Education Purposes</span>
    </footer>
  )
}
