export const CATEGORIES = [
  { name: 'Web',       icon: '🌐' },
  { name: 'Crypto',    icon: '🔑' },
  { name: 'Forensics', icon: '🔬' },
  { name: 'Pwn',       icon: '💥' },
  { name: 'Misc',      icon: '🎲' },
]

export const POINT_VALUES = [100, 200, 300, 400, 500]

export type Challenge = {
  title: string
  desc: string
  hint: string
  flag: string
  url?: string  // optional link to the live challenge website
}

export const CHALLENGES: Record<string, Challenge[]> = {
  Web: [
    {
      title: 'Source Secrets',
      desc: "A corporate login page was deployed in a hurry. The developer left some things behind they really shouldn't have. Dig through everything the browser can show you.",
      hint: 'Ctrl+U to view source. Check HTML comments AND the JavaScript.',
      flag: 'CTF{h1dd3n_1n_pl41n_s1ght}',
      url: './web/challenge1-source-secrets.html',
    },
    {
      title: 'Cookie Monster',
      desc: "ShopEasy trusts your browser cookies to decide if you're an admin. Can you convince it you are?",
      hint: 'DevTools → Application → Cookies. Change the "role" value and reload.',
      flag: 'CTF{c00k13_m4n1pul4t10n}',
      url: './web/challenge2-cookie-monster.html',
    },
    {
      title: 'Robots Recon',
      desc: "NovaBlog uses robots.txt to tell search engines what NOT to index. But that file is public too. What directories are they hiding?",
      hint: 'Try navigating to the disallowed paths. One directory has a flag.txt file.',
      flag: 'CTF{r0b0ts_d0nt_h1d3_s3cr3ts}',
      url: './web/challenge3-robots-recon.html',
    },
    {
      title: 'JS Bypass',
      desc: "VaultApp locks your files behind a 4-digit PIN. But the entire authentication logic lives in the browser. Can you get in without knowing the PIN?",
      hint: 'DevTools → Sources. Read the JavaScript. Or open the console and call the unlock function directly.',
      flag: 'CTF{cl13nt_s1d3_auth_byp4ss}',
      url: './web/challenge4-js-bypass.html',
    },
    {
      title: 'IDOR Vault',
      desc: "ProfileHub lets you view any user profile by changing the ID in the URL. The server never checks if you're allowed. One user hid something interesting in their private note...",
      hint: 'Change the ?id= parameter. Try values between 1 and 99. One of them has the flag.',
      flag: 'CTF{1d0r_b4by_st3ps}',
      url: './web/challenge5-idor.html',
    },
  ],
  Crypto: [
    { title: 'Caesar Salad',  desc: 'Znk xkgiutotm gx ktizout oy: "Znoy oy g ykixkz"', hint: "It's a classical shift cipher.", flag: 'CTF{r0t4t10n_15_34sy}' },
    { title: 'Base Jumper',   desc: 'Q1RGe2Jhc2U2NF9kZWNvZGVkfQ==', hint: 'Standard encoding scheme, not encryption.', flag: 'CTF{base64_decoded}' },
    { title: 'Hash Cracker',  desc: 'md5: 5f4dcc3b5aa765d61d8327deb882cf99', hint: 'Common password. Use a wordlist.', flag: 'CTF{p4ssw0rd_cr4ck3d}' },
    { title: 'RSA Weak Keys', desc: "We've encrypted a flag with RSA. The public key has a very small exponent (e=3) and small modulus.", hint: 'Small exponent attack. Cube root of ciphertext.', flag: 'CTF{rsa_3_1s_w34k}' },
    { title: 'OTP Reuse',     desc: 'Two messages were encrypted with the same one-time pad. XOR them to reveal both plaintexts!', hint: 'Crib dragging or ciphertext XOR.', flag: 'CTF{0tp_r3us3_vuln}' },
  ],
  Forensics: [
    { title: 'Metadata Hunt',    desc: 'This innocent-looking JPEG was sent to us by an unknown source. What secrets hide in its metadata?', hint: 'exiftool is your friend.', flag: 'CTF{3x1f_d4t4_l34k}' },
    { title: 'Stego 101',        desc: 'The flag is hidden inside this image. It looks normal, but something is off about its LSBs.', hint: 'Try steghide or zsteg.', flag: 'CTF{ls8_st3g4n0gr4phy}' },
    { title: 'Pcap Secrets',     desc: 'A network capture was taken during a breach. Find the flag being transmitted over the network.', hint: 'Filter by protocol. Follow the TCP stream.', flag: 'CTF{p4ck3t_sn1ff3d}' },
    { title: 'Memory Forensics', desc: 'We have a memory dump from a compromised machine. The attacker left a flag in a running process.', hint: 'Use volatility. Check process cmdlines.', flag: 'CTF{v0l4t1l1ty_ftw}' },
    { title: 'Disk Recovery',    desc: 'A file was "deleted" from this disk image. Nothing is ever truly gone...', hint: 'Carve the image with foremost or scalpel.', flag: 'CTF{d3l3t3d_but_n0t_g0n3}' },
  ],
  Pwn: [
    { title: 'Stack Smash',    desc: 'Classic buffer overflow. No stack canary, no ASLR. Overflow the buffer to call win().', hint: 'Find the offset with cyclic. Redirect EIP.', flag: 'CTF{buff3r_0v3rfl0w_1}' },
    { title: 'Format String',  desc: 'The server echoes your input directly into printf(). Leak the stack and find the flag.', hint: '%x.%x.%x — read the stack.', flag: 'CTF{f0rm4t_str1ng_l34k}' },
    { title: 'ROP Chain',      desc: 'NX is enabled. Build a ROP chain to call system("/bin/sh") and read the flag.', hint: 'Use ROPgadget. Find a gadget to pop rdi.', flag: 'CTF{r0p_g4d93ts_r0ck}' },
    { title: 'Heap Overflow',  desc: 'Overwrite adjacent heap metadata to hijack control flow.', hint: 'Use-after-free or heap overflow. Corrupt fd pointer.', flag: 'CTF{h34p_h4x0r}' },
    { title: 'Kernel Pwn',     desc: 'A vulnerable kernel module is loaded. Exploit it to get root and read /flag.', hint: 'Race condition or UAF in the module. Try ret2usr.', flag: 'CTF{k3rn3l_pwn3d}' },
  ],
  Misc: [
    { title: 'OSINT Starter',  desc: "Find the CTF organizer's first GitHub repository creation date. The flag is CTF{YYYY-MM-DD}.", hint: 'Check GitHub profile → Repositories → sort by oldest.', flag: 'CTF{2023-04-01}' },
    { title: 'Morse Madness',  desc: '-- --- .-. ... . / .---- ----- .---- / ..-. .-.. .- --. / .. ... / .... . .-. .', hint: 'Decode each word separately.', flag: 'CTF{m0rs3_c0d3_34sy}' },
    { title: 'QR Code Quest',  desc: 'A damaged QR code was recovered. Repair the finder patterns and scan it.', hint: 'QR codes have error correction. Try zbar or online tools.', flag: 'CTF{qr_c0d3_r3p41r3d}' },
    { title: 'Scripting 101',  desc: 'The server sends a random math challenge every second and disconnects if you are slow. Write a script to solve 1000 challenges.', hint: 'Python socket + eval(). Be fast!', flag: 'CTF{sc1pt_0r_d13}' },
    { title: 'Grand Finale',   desc: 'Combine techniques from all categories: decode, crack, capture, overflow, and inject. The ultimate challenge.', hint: 'This is a pipeline. Output of each step feeds the next.', flag: 'CTF{gr4nd_m4st3r_h4ck3r}' },
  ],
}
