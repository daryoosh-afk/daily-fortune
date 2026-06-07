(() => {
  const assetVersion = "20260607-crop3";
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
      :root{--cream:#fff7e7;--surface-warm:rgba(255,253,248,.94);--line-strong:rgba(122,61,184,.22);--shadow:0 22px 58px rgba(76,37,119,.14);--shadow-tight:0 12px 28px rgba(76,37,119,.12)}
      body{background:linear-gradient(145deg,rgba(122,61,184,.12) 0%,rgba(255,247,231,.72) 34%,rgba(255,249,253,.82) 66%,rgba(169,139,216,.18) 100%),linear-gradient(180deg,#fffafd 0%,#f7efff 52%,#fff8ec 100%)!important}
      body::before{content:"";position:fixed;inset:0;z-index:-1;pointer-events:none;background-image:linear-gradient(90deg,rgba(122,61,184,.045) 1px,transparent 1px),linear-gradient(180deg,rgba(122,61,184,.035) 1px,transparent 1px);background-size:44px 44px;mask-image:linear-gradient(180deg,rgba(0,0,0,.48),transparent 74%)}
      .app-shell{padding:34px 18px 120px!important}.workspace{gap:20px!important}
      .topbar,.control-panel,.fortune-card,.feature-panel{border-color:var(--line-strong)!important;background:linear-gradient(180deg,var(--surface-warm) 0%,rgba(255,249,253,.9) 100%)!important;box-shadow:var(--shadow),inset 0 1px 0 rgba(255,255,255,.78)!important;backdrop-filter:blur(16px)}
      .topbar{position:relative;overflow:hidden;padding:20px!important}.topbar::before{content:"";position:absolute;left:18px;right:18px;bottom:0;height:3px;border-radius:999px 999px 0 0;background:linear-gradient(90deg,transparent,var(--gold),var(--pink),var(--accent),transparent);opacity:.76}
      .eyebrow{letter-spacing:0!important}h1{font-size:3rem!important;line-height:.98!important;letter-spacing:0!important}h2{font-size:2.35rem!important;line-height:1.08!important;letter-spacing:0!important}
      .countdown-pill{border-color:rgba(217,164,65,.3)!important;background:linear-gradient(180deg,rgba(255,251,241,.96),rgba(255,249,253,.92))!important;box-shadow:var(--shadow-tight),inset 0 0 0 1px rgba(255,255,255,.7)!important}
      input[type="text"],.setting-control input,.tarot-question textarea{border-color:rgba(122,61,184,.2)!important;background:rgba(255,253,248,.94)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.86)!important}
      button,.actions a{box-shadow:0 12px 24px rgba(122,61,184,.18);transition:transform 160ms ease,box-shadow 160ms ease,background 160ms ease,border-color 160ms ease}button:hover,.actions a:hover{box-shadow:0 16px 28px rgba(122,61,184,.22);transform:translateY(-1px)}button:active,.actions a:active{transform:translateY(0);box-shadow:0 8px 18px rgba(122,61,184,.16)}
      .draw-ready-row>div,.detail-grid div,.result-card,.tarot-option,.tarot-question,.tarot-stage,.tarot-reading-card,.star-history-card,.star-history-empty,.milestone-list div,.setting-row{border-color:rgba(122,61,184,.18)!important;background:linear-gradient(180deg,rgba(255,253,248,.98) 0%,rgba(255,249,253,.94) 100%)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.78)!important}
      .fortune-card{background:linear-gradient(180deg,rgba(255,253,248,.97) 0%,rgba(255,249,253,.96) 100%),linear-gradient(135deg,rgba(122,61,184,.11),rgba(228,90,154,.1))!important}.fortune-card[data-card-state="empty"]{background:linear-gradient(180deg,rgba(255,253,248,.98) 0%,rgba(255,249,253,.96) 100%),linear-gradient(135deg,rgba(217,164,65,.16),rgba(122,61,184,.12))!important}
      .score-ring{background:linear-gradient(180deg,rgba(255,253,248,.96),rgba(255,244,207,.48));box-shadow:inset 0 0 0 1px rgba(255,255,255,.82),0 16px 34px rgba(217,164,65,.18)}.upgrade-hint,.return-nudge{border-color:rgba(217,164,65,.36)!important;background:linear-gradient(180deg,rgba(255,249,229,.76),rgba(255,249,253,.88))!important}.result-card,.tarot-reading-card,.star-history-card,.setting-row{box-shadow:0 10px 26px rgba(76,37,119,.07),inset 0 1px 0 rgba(255,255,255,.82)!important}.result-card h3,.tarot-reading-card h3,.star-history-card strong,.setting-row strong{color:#4a2475!important}
      .bottom-nav{border-color:rgba(122,61,184,.2)!important;background:linear-gradient(180deg,rgba(255,253,248,.94),rgba(255,246,232,.92))!important;box-shadow:0 18px 46px rgba(76,37,119,.2),inset 0 1px 0 rgba(255,255,255,.84)!important}.nav-button{border-color:rgba(217,164,65,.26)!important;background:rgba(255,248,226,.78)!important;box-shadow:none}.nav-button:hover,.nav-button.is-active{background:linear-gradient(180deg,rgba(255,240,189,.98),rgba(255,249,253,.94))!important;border-color:rgba(217,164,65,.72)!important;box-shadow:0 10px 22px rgba(217,164,65,.18),inset 0 0 0 1px rgba(255,255,255,.66)!important}
      .tarot-option{position:relative;overflow:hidden}.tarot-option::before{content:"";position:absolute;inset:0;border-left:4px solid transparent;pointer-events:none}.tarot-option.is-selected::before{border-left-color:var(--gold)}.tarot-stage{background:linear-gradient(135deg,rgba(255,253,248,.96),rgba(248,242,255,.76))!important}.tarot-card-preview span{font-size:1.95rem!important}.record-star,.history-score{box-shadow:0 14px 30px rgba(217,164,65,.2)!important}
      .tarot-image-card{position:relative!important;padding:0!important;background:linear-gradient(180deg,#fff8e7 0%,#eadbc1 100%)!important;grid-template-rows:1fr!important;overflow:hidden!important;border-color:rgba(126,86,41,.78)!important;box-shadow:0 18px 34px rgba(61,42,86,.18),inset 0 0 0 4px rgba(255,248,221,.68),inset 0 0 0 9px rgba(126,86,41,.14)!important;color:#35261f!important}
      .tarot-image-card::before{content:""!important;display:block!important;position:absolute!important;inset:10px!important;border:1px solid rgba(126,86,41,.42)!important;border-radius:7px!important;z-index:2!important;pointer-events:none!important}
      .tarot-image-card::after{content:""!important;display:block!important;position:absolute!important;left:14px!important;right:14px!important;top:11px!important;height:54%!important;border-radius:6px 6px 2px 2px!important;background:linear-gradient(180deg,rgba(255,255,255,.03),rgba(46,33,57,.14))!important;z-index:2!important;pointer-events:none!important}
      .tarot-card-art{position:absolute!important;left:14px!important;right:14px!important;top:11px!important;display:block!important;width:calc(100% - 28px)!important;height:54%!important;object-fit:cover!important;object-position:top center!important;border-radius:6px 6px 2px 2px!important;background:#261b34!important;box-shadow:0 8px 18px rgba(45,31,54,.18)!important;z-index:1!important}
      .tarot-image-nameplate{position:absolute!important;left:14px!important;right:14px!important;top:calc(54% + 18px)!important;bottom:12px!important;z-index:3!important;display:grid!important;grid-template-rows:minmax(0,1fr) auto!important;align-items:center!important;padding:8px 8px 7px!important;border:1px solid rgba(151,111,39,.46)!important;border-radius:7px!important;background:linear-gradient(180deg,rgba(255,249,229,.98),rgba(236,220,188,.98))!important;box-shadow:0 -10px 18px rgba(31,21,48,.12),inset 0 0 0 1px rgba(255,255,255,.62)!important;color:#3b2a20!important;text-align:center!important;pointer-events:none!important}
      .tarot-image-nameplate strong{display:block!important;width:100%!important;min-height:auto!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;color:#33261f!important;font-family:Georgia,'Yu Mincho','Hiragino Mincho ProN',serif!important;font-size:.92rem!important;font-weight:900!important;line-height:1.05!important;letter-spacing:0!important;overflow-wrap:anywhere!important;text-shadow:0 1px 0 rgba(255,255,255,.6)!important}
      .tarot-card-overlay{position:static!important;z-index:4!important;display:flex!important;justify-content:center!important;align-items:center!important;gap:5px!important;margin-top:5px!important;pointer-events:none!important}.tarot-image-card .tarot-card-overlay em,.tarot-image-card .tarot-card-overlay small{width:auto!important;min-width:auto!important;margin:0!important;padding:3px 7px!important;border:1px solid rgba(151,111,39,.32)!important;border-radius:999px!important;background:rgba(255,250,240,.92)!important;box-shadow:none!important;color:#5a2f7a!important;font-size:.62rem!important;font-style:normal!important;font-weight:900!important;line-height:1!important;text-align:center!important;white-space:nowrap!important}.tarot-image-card.is-reversed .tarot-card-art{filter:saturate(.9) brightness(.96)!important}
      @media(max-width:760px){.app-shell{padding:18px 12px 112px!important}h1{font-size:2.35rem!important}h2{font-size:1.95rem!important}.topbar{gap:14px!important}}
      @media(max-width:420px){.app-shell{padding:10px 10px 104px!important}h1{font-size:2rem!important}h2{font-size:1.62rem!important;line-height:1.15!important}.topbar,.control-panel,.fortune-card,.feature-panel{box-shadow:0 12px 34px rgba(76,37,119,.12),inset 0 1px 0 rgba(255,255,255,.76)!important}.countdown-pill{box-shadow:inset 0 1px 0 rgba(255,255,255,.76)!important}.bottom-nav{min-height:64px!important}.tarot-card-art{left:10px!important;right:10px!important;top:10px!important;width:calc(100% - 20px)!important;height:52%!important}.tarot-image-card::after{left:10px!important;right:10px!important;top:10px!important;height:52%!important}.tarot-image-nameplate{left:10px!important;right:10px!important;top:calc(52% + 16px)!important;bottom:10px!important;padding:7px 6px 6px!important}.tarot-image-nameplate strong{font-size:.82rem!important}.tarot-image-card .tarot-card-overlay em,.tarot-image-card .tarot-card-overlay small{font-size:.58rem!important;padding:3px 6px!important}}
    `;
    document.head.appendChild(style);
  }

  function loadMotionPatch() {
    if (document.querySelector("script[data-motion-patch]")) return;
    const script = document.createElement("script");
    script.src = "./motion-patch.js?v=20260607-motion1";
    script.dataset.motionPatch = "true";
    document.body.appendChild(script);
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
  loadMotionPatch();
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