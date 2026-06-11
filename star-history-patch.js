(() => {
  const historyKey = 'dailyFortuneHistory';
  const storageKey = 'dailyFortuneDraw';
  const starPanel = document.querySelector('.star-record-panel');

  function ensurePatchStyles() {
    if (document.querySelector('#starHistoryPatchStyles')) return;
    const style = document.createElement('style');
    style.id = 'starHistoryPatchStyles';
    style.textContent = `
      .star-history-summary{margin-top:18px;color:var(--muted);font-size:.92rem;font-weight:900}.star-history-list{display:grid;gap:10px;margin-top:10px}.star-history-card{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:12px;align-items:center;border:1px solid var(--line);border-radius:8px;background:linear-gradient(180deg,#fff 0%,#fff9fd 100%);padding:14px}.star-history-card span{display:block;color:var(--muted);font-size:.78rem;font-weight:900}.star-history-card strong{display:block;margin-top:5px;color:var(--accent-dark);font-size:1rem;line-height:1.35}.star-history-card p{margin-top:7px;margin-bottom:0;color:#344054;font-size:.9rem;line-height:1.45}.history-score{width:48px;height:48px;display:grid;place-items:center;border-radius:50%;background:linear-gradient(160deg,var(--gold),#fff4cf);color:var(--accent-dark);font-weight:1000;box-shadow:0 12px 24px rgba(217,164,65,.22)}.star-history-empty{border:1px dashed rgba(169,139,216,.45);border-radius:8px;color:var(--muted);font-size:.92rem;font-weight:800;padding:16px}.tarot-question{display:flex!important;flex-direction:column!important;gap:8px!important;align-items:stretch!important}.tarot-question textarea{box-sizing:border-box!important;width:100%!important;min-height:96px!important}.tarot-stage{grid-template-columns:minmax(440px,1fr) minmax(270px,.72fr)!important;align-items:center!important;background:linear-gradient(135deg,rgba(255,253,247,.96),rgba(248,242,255,.72))!important;border-color:rgba(127,93,146,.24)!important}.tarot-spread{grid-template-columns:repeat(3,minmax(126px,148px))!important;justify-content:start!important;align-items:start!important;gap:14px!important}.tarot-card-preview{box-sizing:border-box!important;width:100%!important;min-height:196px!important}.tarot-print-card{position:relative!important;overflow:hidden!important;display:grid!important;grid-template-rows:auto 1fr auto auto!important;align-items:center!important;justify-items:center!important;gap:9px!important;aspect-ratio:2/3!important;border:1px solid rgba(62,46,38,.66)!important;border-radius:10px!important;background:linear-gradient(180deg,#fffaf0 0%,#eadcc4 100%)!important;box-shadow:0 18px 34px rgba(61,42,86,.16),inset 0 0 0 5px rgba(151,111,39,.16),inset 0 0 0 9px rgba(255,252,241,.78)!important;color:#372922!important;padding:12px!important}.tarot-print-card::before{content:""!important;position:absolute!important;inset:11px!important;border:1px solid rgba(151,111,39,.5)!important;border-radius:6px!important;pointer-events:none!important}.tarot-print-card::after{content:""!important;position:absolute!important;inset:0!important;background:radial-gradient(circle at 72% 20%,rgba(124,83,164,.10),transparent 27%),linear-gradient(135deg,rgba(255,255,255,.35),transparent 55%)!important;mix-blend-mode:multiply!important;pointer-events:none!important}.tarot-card-number{z-index:1!important;display:grid!important;place-items:center!important;min-width:34px!important;height:24px!important;padding:0 9px!important;border:1px solid rgba(151,111,39,.56)!important;border-radius:999px!important;background:#fff7e5!important;color:#3b2a22!important;font-family:Georgia,'Times New Roman',serif!important;font-size:.75rem!important;font-weight:800!important;line-height:1!important}.tarot-engraving,.tarot-main-glyph,.tarot-ornament,.tarot-ground{display:none!important}.tarot-card-nameplate,.tarot-print-card strong{z-index:1!important;width:100%!important;min-height:92px!important;display:grid!important;place-items:center!important;padding:10px 6px!important;border-block:1px solid rgba(151,111,39,.24)!important;color:#2f261f!important;font-family:Georgia,'Yu Mincho','Hiragino Mincho ProN',serif!important;font-size:clamp(1.02rem,2.3vw,1.38rem)!important;font-weight:900!important;line-height:1.12!important;text-align:center!important;overflow-wrap:anywhere!important;letter-spacing:0!important}.tarot-card-nameplate span{max-width:100%;overflow-wrap:anywhere}.tarot-print-card em{z-index:1!important;display:block!important;min-width:58px!important;margin-top:0!important;padding:4px 8px!important;border-radius:999px!important;background:rgba(92,53,125,.10)!important;color:#5f2c83!important;font-style:normal!important;font-size:.70rem!important;font-weight:900!important;line-height:1!important;text-align:center!important;letter-spacing:0!important}.tarot-print-card small{z-index:1!important;color:#6f5a4d!important;font-size:.70rem!important;font-weight:900!important;line-height:1.1!important;text-align:center!important;letter-spacing:0!important}.tarot-print-card.is-reversed{background:linear-gradient(180deg,#f7f0ff 0%,#e7d8f0 100%)!important;border-color:rgba(94,58,129,.48)!important}.tarot-print-card.is-reversed span{transform:none!important;opacity:1!important}.tarot-reading-card span{overflow-wrap:anywhere}@media(max-width:900px){.tarot-stage{grid-template-columns:1fr!important}.tarot-spread{grid-template-columns:repeat(3,minmax(104px,1fr))!important;justify-content:stretch!important}.tarot-card-preview{min-height:174px!important}}@media(max-width:420px){.star-history-card{grid-template-columns:1fr}.history-score{width:44px;height:44px}.tarot-spread{grid-template-columns:repeat(2,minmax(0,1fr))!important}.tarot-card-preview{min-height:176px!important}.tarot-card-nameplate,.tarot-print-card strong{font-size:1.15rem!important}}
    `;
    document.head.appendChild(style);
  }

  function loadMotionPatch() {
    if (document.querySelector('script[data-motion-patch]')) return;
    const script = document.createElement('script');
    script.src = './motion-patch.js?v=20260611-motion2';
    script.dataset.motionPatch = 'true';
    document.body.appendChild(script);
  }

  function loadInlineTarotImages() {
    if (document.querySelector('script[data-tarot-inline-images]')) return;
    const script = document.createElement('script');
    script.src = './tarot-inline-images.js?v=20260611-motion2';
    script.dataset.tarotInlineImages = 'true';
    document.body.appendChild(script);
  }

  ensurePatchStyles();
  loadMotionPatch();
  loadInlineTarotImages();

  if (!starPanel) return;

  const starPageHint = document.querySelector('#starPageHint');
  const heroTitle = starPanel.querySelector('.star-record-hero h2');
  if (heroTitle) heroTitle.textContent = '占ってきた星を見返せます。';
  if (starPageHint) starPageHint.textContent = '今日の結果もここに残ります。';

  const milestones = starPanel.querySelector('.milestone-list');
  if (milestones && !document.querySelector('#starHistoryList')) {
    milestones.outerHTML = `
      <div class="star-history-summary" id="starHistorySummary">まだ記録はありません。</div>
      <div class="star-history-list" id="starHistoryList">
        <div class="star-history-empty">今日の運勢を占うと、ここに記録が残ります。</div>
      </div>
    `;
  }

  function loadHistory() {
    try {
      const history = JSON.parse(localStorage.getItem(historyKey));
      return Array.isArray(history) ? history.filter((item) => item && item.date).slice(0, 14) : [];
    } catch (error) {
      localStorage.removeItem(historyKey);
      return [];
    }
  }

  function saveHistoryFromReading(reading) {
    if (!reading || !reading.date || !reading.results || !reading.results.general) return;
    const historyItem = {
      date: reading.date,
      name: reading.name,
      score: reading.score,
      title: reading.results.general.title,
      action: reading.action,
      color: reading.color
    };
    const nextHistory = [historyItem, ...loadHistory().filter((item) => item.date !== reading.date)].slice(0, 14);
    localStorage.setItem(historyKey, JSON.stringify(nextHistory));
    renderHistory(nextHistory);
  }

  function formatDate(dateKey) {
    const [year, month, day] = dateKey.split('-').map(Number);
    return new Intl.DateTimeFormat('ja-JP', { month: 'long', day: 'numeric', weekday: 'short' }).format(new Date(year, month - 1, day));
  }

  function renderHistory(history = loadHistory()) {
    const summary = document.querySelector('#starHistorySummary');
    const list = document.querySelector('#starHistoryList');
    if (!summary || !list) return;
    summary.textContent = history.length ? `${history.length}件の星の記録があります。` : 'まだ記録はありません。';
    if (!history.length) {
      list.innerHTML = '<div class="star-history-empty">今日の運勢を占うと、ここに記録が残ります。</div>';
      return;
    }
    list.innerHTML = history.map((item) => `
      <article class="star-history-card">
        <div>
          <span>${formatDate(item.date)}</span>
          <strong>${item.title}</strong>
          <p>${item.action}</p>
        </div>
        <div class="history-score">${item.score}</div>
      </article>
    `).join('');
  }

  function syncTodayReading() {
    try {
      saveHistoryFromReading(JSON.parse(localStorage.getItem(storageKey)));
    } catch (error) {
      renderHistory();
    }
  }

  const form = document.querySelector('#fortuneForm');
  if (form) {
    form.addEventListener('submit', () => window.setTimeout(syncTodayReading, 0));
  }

  syncTodayReading();
})();
