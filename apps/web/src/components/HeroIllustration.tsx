/**
 * Maili Sita at dusk: Menengai's ridge, the Nakuru–Nyahururu Road, Kiamaina
 * Primary School on one side and Primegala opposite, with sun and moon for
 * "day and night". Pure SVG: no image download, crisp on any screen.
 */
export function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 520" className={className} role="img" aria-labelledby="hero-ill-title">
      <title id="hero-ill-title">
        Illustration of Primegala Medical Centre on the Nakuru–Nyahururu Road at Maili Sita, opposite Kiamaina
        Primary School, with Menengai ridge behind
      </title>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0b3f23" />
          <stop offset=".45" stopColor="#167a41" />
          <stop offset="1" stopColor="#fbd46e" />
        </linearGradient>
        <clipPath id="frame">
          <rect width="600" height="520" rx="36" />
        </clipPath>
      </defs>
      <g clipPath="url(#frame)">
        <rect width="600" height="520" fill="url(#sky)" />
        {/* moon & stars: night */}
        <path d="M104 92a34 34 0 1 0 30 50 28 28 0 1 1-30-50Z" fill="#fff3cf" opacity=".95" />
        <g fill="#fff3cf">
          <circle cx="190" cy="70" r="2" />
          <circle cx="232" cy="118" r="1.5" />
          <circle cx="60" cy="180" r="1.5" />
          <circle cx="160" cy="40" r="1.2" />
          <circle cx="290" cy="60" r="1.3" />
        </g>
        {/* sun: day */}
        <circle cx="470" cy="190" r="92" fill="#fff3cf" opacity=".25" />
        <circle cx="470" cy="190" r="58" fill="#fde49a" />
        {/* Menengai ridge */}
        <path
          d="M0 300c70-44 140-66 210-66 38 0 60 12 92 12 40 0 70-22 120-20 70 4 130 40 178 66v228H0Z"
          fill="#0e4f2b"
          opacity=".85"
        />
        {/* mid hills */}
        <path d="M0 350c110-40 220-22 320-12 110 11 190-30 280-16v198H0Z" fill="#1f9450" />
        {/* foreground */}
        <path d="M0 410c150-34 300-16 430-22 70-3 120-18 170-14v146H0Z" fill="#4cb373" />
        {/* road */}
        <path d="M40 520c120-70 230-104 380-122l40 2c-140 26-240 66-330 120Z" fill="#efe6d1" />
        <path
          d="M118 506c80-44 170-76 290-96"
          stroke="#c9b98f"
          strokeWidth="3"
          strokeDasharray="14 12"
          fill="none"
          strokeLinecap="round"
        />
        {/* Kiamaina Primary School (left of the road) */}
        <g>
          <rect x="70" y="372" width="96" height="40" rx="3" fill="#fbf8f1" />
          <path d="M62 374l56-26 56 26Z" fill="#7a2b1f" />
          <rect x="108" y="390" width="16" height="22" fill="#0e4f2b" />
          <rect x="80" y="384" width="16" height="12" fill="#b5e3c4" />
          <rect x="138" y="384" width="16" height="12" fill="#b5e3c4" />
          <line x1="186" y1="412" x2="186" y2="350" stroke="#fbf8f1" strokeWidth="2.5" />
          <path d="M188 352h22l-5 7 5 7h-22Z" fill="#c0261c" />
        </g>
        {/* acacia */}
        <g>
          <path d="M520 420c0-22 2-40 6-56" stroke="#0b3f23" strokeWidth="5" fill="none" strokeLinecap="round" />
          <ellipse cx="528" cy="360" rx="52" ry="14" fill="#0b3f23" />
          <ellipse cx="548" cy="350" rx="30" ry="9" fill="#0e4f2b" />
        </g>
        {/* Primegala (opposite the school) */}
        <g>
          <rect x="330" y="318" width="160" height="78" rx="6" fill="#ffffff" />
          <rect x="322" y="306" width="176" height="18" rx="5" fill="#0b3f23" />
          <rect x="350" y="340" width="26" height="20" rx="3" fill="#fde49a" />
          <rect x="444" y="340" width="26" height="20" rx="3" fill="#fde49a" />
          <rect x="396" y="350" width="28" height="46" rx="3" fill="#167a41" />
          {/* sign */}
          <rect x="390" y="270" width="40" height="40" rx="10" fill="#ffffff" />
          <rect x="405" y="276" width="10" height="28" rx="5" fill="#167a41" />
          <rect x="396" y="285" width="28" height="10" rx="5" fill="#1f9450" />
        </g>
        {/* map pin label */}
        <g>
          <rect x="300" y="208" width="220" height="44" rx="22" fill="#ffffff" />
          <circle cx="324" cy="230" r="11" fill="#167a41" />
          <circle cx="324" cy="227" r="4" fill="#ffffff" />
          <text x="344" y="226" fontSize="13" fontWeight="700" fill="#10221a" fontFamily="inherit">
            Primegala · Maili Sita
          </text>
          <text x="344" y="243" fontSize="11" fill="#4a5e54" fontFamily="inherit">
            Open 24 hours
          </text>
          <path d="M404 252l8 10 8-10Z" fill="#ffffff" />
        </g>
      </g>
    </svg>
  );
}
