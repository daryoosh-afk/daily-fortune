(() => {
  const assetVersion = "20260607-file2";
  const tarotImageMap = {
    "愚者": `./assets/tarot/fool.jpg?v=${assetVersion}`,
    "死神": `./assets/tarot/death.jpg?v=${assetVersion}`,
    "女教皇": `./assets/tarot/high-priestess.jpg?v=${assetVersion}`,
    "正義": `./assets/tarot/justice.jpg?v=${assetVersion}`,
    "吊るされた男": `./assets/tarot/hanged-man.jpg?v=${assetVersion}`,
    "隠者": `./assets/tarot/hermit.jpg?v=${assetVersion}`
  };

  function ensureStyles() {
    if (document.querySelector("#tarotInlineImageStyles")) return;
    const style = document.createElement("style");
    style.id = "tarotInlineImageStyles";
    style.textContent = `
      .tarot-image-card{position:relative!important;padding:0!important;background:#201731!important;grid-template-rows:1fr!important;overflow:hidden!important}
      .tarot-image-card::before,.tarot-image-card::after{display:none!important}
      .tarot-card-art{display:block!important;width:100%!important;height:100%!important;object-fit:cover!important;border-radius:8px!important;background:#1f1530!important}
      .tarot-card-overlay{position:absolute!important;left:8px!important;right:8px!important;bottom:8px!important;z-index:3!important;display:flex!important;justify-content:space-between!important;align-items:center!important;gap:6px!important;pointer-events:none!important}
      .tarot-image-card .tarot-card-overlay em,.tarot-image-card .tarot-card-overlay small{width:auto!important;min-width:auto!important;margin:0!important;padding:4px 8px!important;border:1px solid rgba(151,111,39,.38)!important;border-radius:999px!important;background:rgba(255,250,240,.92)!important;box-shadow:0 8px 16px rgba(31,21,48,.18)!important;color:#4b2874!important;font-size:.7rem!important;font-style:normal!important;font-weight:900!important;line-height:1!important;text-align:center!important}
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
        <img class="tarot-card-art" src="${image}" alt="${name}のタロットカード" loading="lazy" decoding="async">
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