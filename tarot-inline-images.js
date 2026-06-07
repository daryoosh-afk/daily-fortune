(() => {
  function svgData(markup) {
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(markup)}`;
  }

  function foolCard() {
    return svgData(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 360">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#171120"/>
            <stop offset="0.55" stop-color="#231832"/>
            <stop offset="1" stop-color="#2d2140"/>
          </linearGradient>
          <radialGradient id="moon" cx="45%" cy="30%" r="45%">
            <stop offset="0" stop-color="#fff1be"/>
            <stop offset="1" stop-color="#8b6fbb" stop-opacity="0"/>
          </radialGradient>
          <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <rect width="240" height="360" rx="16" fill="url(#bg)"/>
        <rect x="13" y="13" width="214" height="334" rx="13" fill="none" stroke="#c59a4a" stroke-width="3"/>
        <rect x="24" y="25" width="192" height="310" rx="8" fill="none" stroke="#d7b665" stroke-width="1.2" opacity=".72"/>
        <circle cx="120" cy="50" r="20" fill="#fff4d8" stroke="#c59a4a" stroke-width="2"/>
        <text x="120" y="57" text-anchor="middle" font-family="Georgia,serif" font-size="18" font-weight="700" fill="#3c2a19">0</text>
        <circle cx="78" cy="112" r="58" fill="url(#moon)" opacity=".9"/>
        <path d="M43 260 C78 234, 112 228, 155 246 C139 254, 91 268, 43 260 Z" fill="#0f0b15" stroke="#d2ad63" stroke-width="1.2"/>
        <path d="M111 226 C112 178, 126 144, 149 112" fill="none" stroke="#f5df9b" stroke-width="5" stroke-linecap="round"/>
        <path d="M113 224 C122 199, 133 177, 155 158" fill="none" stroke="#73569a" stroke-width="3" stroke-linecap="round" opacity=".8"/>
        <circle cx="151" cy="109" r="11" fill="#d7b665" filter="url(#glow)"/>
        <path d="M150 120 L147 151 L162 151 L160 120 Z" fill="#d7b665" opacity=".75"/>
        <path d="M94 191 C83 188, 78 198, 84 208 C91 219, 107 212, 104 199 C103 195, 100 192, 94 191 Z" fill="#f6e9c6" stroke="#b78c48" stroke-width="2"/>
        <path d="M69 284 C76 274, 88 274, 96 284 C88 292, 77 292, 69 284 Z" fill="#f6e9c6" opacity=".95"/>
        <path d="M190 42 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4zM50 73 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3zM183 216 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3z" fill="#f5df9b" opacity=".9"/>
        <text x="120" y="305" text-anchor="middle" font-family="Georgia,'Yu Mincho',serif" font-size="26" font-weight="700" fill="#f8e8bd">愚者</text>
        <text x="120" y="327" text-anchor="middle" font-family="Georgia,serif" font-size="12" letter-spacing="2" fill="#d7b665">THE FOOL</text>
      </svg>
    `);
  }

  function deathCard() {
    return svgData(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 360">
        <defs>
          <linearGradient id="paper" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#fbf3df"/>
            <stop offset="0.7" stop-color="#efe2cc"/>
            <stop offset="1" stop-color="#e9d8ec"/>
          </linearGradient>
          <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.2"/>
          </filter>
        </defs>
        <rect width="240" height="360" rx="16" fill="url(#paper)"/>
        <rect x="13" y="13" width="214" height="334" rx="13" fill="none" stroke="#b98a38" stroke-width="3"/>
        <rect x="24" y="25" width="192" height="310" rx="8" fill="none" stroke="#c9a45c" stroke-width="1.2" opacity=".72"/>
        <circle cx="120" cy="50" r="20" fill="#fff8df" stroke="#b98a38" stroke-width="2"/>
        <text x="120" y="57" text-anchor="middle" font-family="Georgia,serif" font-size="17" font-weight="700" fill="#3c2a19">XIII</text>
        <path d="M156 82 A46 46 0 1 0 157 151 A35 35 0 1 1 156 82 Z" fill="#77569d" opacity=".42"/>
        <circle cx="171" cy="113" r="28" fill="#f7eecb" opacity=".88" filter="url(#soft)"/>
        <path d="M118 157 C98 119, 66 113, 55 145 C45 176, 76 202, 112 180 Z" fill="#efe7f5" stroke="#3b2e28" stroke-width="2"/>
        <path d="M122 157 C142 119, 174 113, 185 145 C195 176, 164 202, 128 180 Z" fill="#f1e4d2" stroke="#3b2e28" stroke-width="2"/>
        <path d="M119 181 C101 218, 71 223, 64 194 C59 173, 90 164, 115 178 Z" fill="#d9c3e8" stroke="#3b2e28" stroke-width="2"/>
        <path d="M123 181 C141 218, 171 223, 178 194 C183 173, 152 164, 127 178 Z" fill="#f5d9c3" stroke="#3b2e28" stroke-width="2"/>
        <path d="M116 151 C121 143, 126 143, 131 151 L126 198 C123 207, 119 207, 116 198 Z" fill="#3b2e28"/>
        <path d="M120 215 C121 235, 111 250, 96 260 M122 215 C124 237, 137 251, 153 260" fill="none" stroke="#7d5b35" stroke-width="2" stroke-linecap="round"/>
        <path d="M48 270 C74 246, 98 243, 121 261 C144 243, 169 246, 193 270" fill="none" stroke="#b98a38" stroke-width="1.5" opacity=".75"/>
        <path d="M50 92 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3zM190 225 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3z" fill="#7a579b" opacity=".55"/>
        <text x="120" y="305" text-anchor="middle" font-family="Georgia,'Yu Mincho',serif" font-size="26" font-weight="700" fill="#382719">死神</text>
        <text x="120" y="327" text-anchor="middle" font-family="Georgia,serif" font-size="12" letter-spacing="2" fill="#9b7435">DEATH</text>
      </svg>
    `);
  }

  const tarotImageMap = {
    "愚者": foolCard(),
    "死神": deathCard()
  };

  function ensureStyles() {
    if (document.querySelector("#tarotInlineImageStyles")) return;
    const style = document.createElement("style");
    style.id = "tarotInlineImageStyles";
    style.textContent = `
      .tarot-image-card{position:relative!important;padding:0!important;background:#201731!important;grid-template-rows:1fr!important;overflow:hidden!important}
      .tarot-image-card::before,.tarot-image-card::after{display:none!important}
      .tarot-card-art{display:block!important;width:100%!important;height:100%!important;object-fit:cover!important;border-radius:8px!important}
      .tarot-card-overlay{position:absolute!important;left:8px!important;right:8px!important;bottom:8px!important;z-index:3!important;display:flex!important;justify-content:space-between!important;align-items:center!important;gap:6px!important;pointer-events:none!important}
      .tarot-image-card .tarot-card-overlay em,.tarot-image-card .tarot-card-overlay small{width:auto!important;min-width:auto!important;margin:0!important;padding:4px 8px!important;border:1px solid rgba(151,111,39,.38)!important;border-radius:999px!important;background:rgba(255,250,240,.9)!important;box-shadow:0 8px 16px rgba(31,21,48,.18)!important;color:#4b2874!important;font-size:.7rem!important;font-style:normal!important;font-weight:900!important;line-height:1!important;text-align:center!important}
      .tarot-image-card.is-reversed .tarot-card-art{filter:saturate(.92) brightness(.96)!important}
    `;
    document.head.appendChild(style);
  }

  function readCardName(cardEl) {
    return (cardEl.querySelector("strong") || cardEl.querySelector(".tarot-card-nameplate span"))?.textContent?.trim();
  }

  function upgradeTarotImages() {
    document.querySelectorAll(".tarot-card-preview.tarot-print-card").forEach((cardEl) => {
      if (cardEl.classList.contains("tarot-image-card")) return;
      const name = readCardName(cardEl);
      const image = tarotImageMap[name];
      if (!image) return;
      const orientation = cardEl.querySelector("em")?.textContent?.trim() || "";
      const position = cardEl.querySelector("small")?.textContent?.trim() || "";
      const isReversed = cardEl.classList.contains("is-reversed");
      cardEl.className = `tarot-card-preview tarot-print-card tarot-image-card ${isReversed ? "is-reversed" : ""}`;
      cardEl.innerHTML = `
        <img class="tarot-card-art" src="${image}" alt="${name}のタロットカード" loading="lazy">
        <div class="tarot-card-overlay">
          <em>${orientation}</em>
          <small>${position}</small>
        </div>
      `;
    });
  }

  ensureStyles();
  upgradeTarotImages();

  const tarotSpread = document.querySelector("#tarotSpread");
  if (tarotSpread) {
    new MutationObserver(() => upgradeTarotImages()).observe(tarotSpread, { childList: true });
  }

  const tarotDrawButton = document.querySelector("#tarotDrawButton");
  if (tarotDrawButton) {
    tarotDrawButton.addEventListener("click", () => window.setTimeout(upgradeTarotImages, 0));
  }
})();