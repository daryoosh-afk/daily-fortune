(() => {
  const assetVersion = "20260607-crop1";
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
      .tarot-image-card{position:relative!important;padding:0!important;background:linear-gradient(180deg,#fff8e7 0%,#eadbc1 100%)!important;grid-template-rows:1fr!important;overflow:hidden!important;border-color:rgba(126,86,41,.78)!important;box-shadow:0 18px 34px rgba(61,42,86,.18),inset 0 0 0 4px rgba(255,248,221,.68),inset 0 0 0 9px rgba(126,86,41,.14)!important;color:#35261f!important}
      .tarot-image-card::before{content:""!important;display:block!important;position:absolute!important;inset:10px!important;border:1px solid rgba(126,86,41,.42)!important;border-radius:7px!important;z-index:2!important;pointer-events:none!important}
      .tarot-image-card::after{content:""!important;display:block!important;position:absolute!important;left:14px!important;right:14px!important;top:11px!important;height:54%!important;border-radius:6px 6px 2px 2px!important;background:linear-gradient(180deg,rgba(255,255,255,.03),rgba(46,33,57,.14))!important;z-index:2!important;pointer-events:none!important}
      .tarot-card-art{position:absolute!important;left:14px!important;right:14px!important;top:11px!important;display:block!important;width:calc(100% - 28px)!important;height:54%!important;object-fit:cover!important;object-position:top center!important;border-radius:6px 6px 2px 2px!important;background:#261b34!important;box-shadow:0 8px 18px rgba(45,31,54,.18)!important;z-index:1!important}
      .tarot-image-nameplate{position:absolute!important;left:14px!important;right:14px!important;top:calc(54% + 18px)!important;bottom:12px!important;z-index:3!important;display:grid!important;grid-template-rows:minmax(0,1fr) auto!important;align-items:center!important;padding:8px 8px 7px!important;border:1px solid rgba(151,111,39,.46)!important;border-radius:7px!important;background:linear-gradient(180deg,rgba(255,249,229,.98),rgba(236,220,188,.98))!important;box-shadow:0 -10px 18px rgba(31,21,48,.12),inset 0 0 0 1px rgba(255,255,255,.62)!important;color:#3b2a20!important;text-align:center!important;pointer-events:none!important}
      .tarot-image-nameplate strong{display:block!important;width:100%!important;min-height:auto!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;color:#33261f!important;font-family:Georgia,'Yu Mincho','Hiragino Mincho ProN',serif!important;font-size:.92rem!important;font-weight:900!important;line-height:1.05!important;letter-spacing:0!important;overflow-wrap:anywhere!important;text-shadow:0 1px 0 rgba(255,255,255,.6)!important}
      .tarot-card-overlay{position:static!important;z-index:4!important;display:flex!important;justify-content:center!important;align-items:center!important;gap:5px!important;margin-top:5px!important;pointer-events:none!important}
      .tarot-image-card .tarot-card-overlay em,.tarot-image-card .tarot-card-overlay small{width:auto!important;min-width:auto!important;margin:0!important;padding:3px 7px!important;border:1px solid rgba(151,111,39,.32)!important;border-radius:999px!important;background:rgba(255,250,240,.92)!important;box-shadow:none!important;color:#5a2f7a!important;font-size:.62rem!important;font-style:normal!important;font-weight:900!important;line-height:1!important;text-align:center!important;white-space:nowrap!important}
      .tarot-image-card.is-reversed .tarot-card-art{filter:saturate(.9) brightness(.96)!important}
      @media(max-width:420px){.tarot-card-art{left:10px!important;right:10px!important;top:10px!important;width:calc(100% - 20px)!important;height:52%!important}.tarot-image-card::after{left:10px!important;right:10px!important;top:10px!important;height:52%!important}.tarot-image-nameplate{left:10px!important;right:10px!important;top:calc(52% + 16px)!important;bottom:10px!important;padding:7px 6px 6px!important}.tarot-image-nameplate strong{font-size:.82rem!important}.tarot-image-card .tarot-card-overlay em,.tarot-image-card .tarot-card-overlay small{font-size:.58rem!important;padding:3px 6px!important}}
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
        <div class="tarot-image-nameplate">
          <strong>${name}</strong>
          <div class="tarot-card-overlay">
            <em>${orientation}</em>
            <small>${position}</small>
          </div>
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