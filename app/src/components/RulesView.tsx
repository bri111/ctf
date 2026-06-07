export default function RulesView() {
  return (
    <div className="rules-view">
      <div className="rules-section">
        <div className="rules-title">📋 Competition Rules</div>
        <ul className="rules-list">
          <li>All flags follow the format: <strong>CTF&#123;...&#125;</strong></li>
          <li>No sharing flags or solutions with other teams.</li>
          <li>Attacking competition infrastructure or other teams is prohibited.</li>
          <li>Each challenge may only be submitted once per team.</li>
          <li>Hints are available but may cost points — ask an admin.</li>
          <li>In case of a tie, the team with the earliest last solve wins.</li>
          <li>Decisions by the organizers are final.</li>
        </ul>
      </div>

      <div className="rules-section">
        <div className="rules-title">🗂 Challenge Categories</div>
        <ul className="rules-list">
          <li><strong>Web</strong> — SQL injection, XSS, CSRF, IDOR, and web exploitation.</li>
          <li><strong>Crypto</strong> — Classical ciphers, RSA, hashing, and modern cryptography.</li>
          <li><strong>Forensics</strong> — File analysis, steganography, memory dumps, pcap analysis.</li>
          <li><strong>Pwn</strong> — Binary exploitation, buffer overflows, ROP chains.</li>
          <li><strong>Misc</strong> — OSINT, trivia, coding challenges, and creative puzzles.</li>
        </ul>
      </div>
    </div>
  )
}
