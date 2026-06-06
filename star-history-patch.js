(() => {
  const historyKey = 'dailyFortuneHistory';
  const storageKey = 'dailyFortuneDraw';
  const starPanel = document.querySelector('.star-record-panel');
  const starPageHint = document.querySelector('#starPageHint');
  if (!starPanel) return;

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

  if (!document.querySelector('#starHistoryPatchStyles')) {
    const style = document.createElement('style');
    style.id = 'starHistoryPatchStyles';
    style.textContent = `
      .star-history-summary{margin-top:18px;color:var(--muted);font-size:.92rem;font-weight:900}.star-history-list{display:grid;gap:10px;margin-top:10px}.star-history-card{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:12px;align-items:center;border:1px solid var(--line);border-radius:8px;background:linear-gradient(180deg,#fff 0%,#fff9fd 100%);padding:14px}.star-history-card span{display:block;color:var(--muted);font-size:.78rem;font-weight:900}.star-history-card strong{display:block;margin-top:5px;color:var(--accent-dark);font-size:1rem;line-height:1.35}.star-history-card p{margin-top:7px;margin-bottom:0;color:#344054;font-size:.9rem;line-height:1.45}.history-score{width:48px;height:48px;display:grid;place-items:center;border-radius:50%;background:linear-gradient(160deg,var(--gold),#fff4cf);color:var(--accent-dark);font-weight:1000;box-shadow:0 12px 24px rgba(217,164,65,.22)}.star-history-empty{border:1px dashed rgba(169,139,216,.45);border-radius:8px;color:var(--muted);font-size:.92rem;font-weight:800;padding:16px}.tarot-question{display:flex!important;flex-direction:column!important;gap:8px!important;align-items:stretch!important}.tarot-question textarea{box-sizing:border-box!important;width:100%!important;min-height:96px!important}.tarot-stage{grid-template-columns:minmax(300px,.78fr) minmax(0,1fr)!important}.tarot-spread{grid-template-columns:repeat(auto-fit,minmax(86px,96px))!important;justify-content:start!important;align-items:start!important}.tarot-card-preview{width:100%;min-height:132px}.tarot-card-preview span{line-height:1}.tarot-card-preview strong{font-size:.76rem!important;line-height:1.2!important}.tarot-card-preview em{display:block;margin-top:2px;color:#fff4cf;font-style:normal;font-size:.7rem;font-weight:1000;letter-spacing:0;line-height:1}.tarot-card-preview.is-reversed{background:linear-gradient(180deg,#4c2577 0%,#7a3db8 100%);border-color:rgba(255,244,207,.76)}.tarot-card-preview.is-reversed span{transform:rotate(180deg);opacity:.88}.tarot-reading-card span{overflow-wrap:anywhere}@media(max-width:760px){.tarot-stage{grid-template-columns:1fr!important}.tarot-spread{grid-template-columns:repeat(3,minmax(72px,1fr))!important;justify-content:stretch!important}.tarot-card-preview{min-height:118px}.tarot-card-preview strong{font-size:.7rem!important}}@media(max-width:420px){.star-history-card{grid-template-columns:1fr}.history-score{width:44px;height:44px}}
    `;
    document.head.appendChild(style);
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
    form.addEventListener('submit', () => {
      window.setTimeout(syncTodayReading, 0);
    });
  }

  syncTodayReading();
})();
