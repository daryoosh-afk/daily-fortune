(() => {
  const profileKey = 'dailyFortuneProfile';
  const storageKey = 'dailyFortuneDraw';
  const form = document.querySelector('#fortuneForm');
  const nameInput = document.querySelector('#nameInput');
  const drawButton = document.querySelector('#drawButton');
  const formNote = document.querySelector('#formNote');
  if (!form || !nameInput || !drawButton) return;

  function savedProfileName() {
    try {
      const profile = JSON.parse(localStorage.getItem(profileKey));
      return profile && typeof profile.name === 'string' ? profile.name.trim().slice(0, 32) : '';
    } catch (error) {
      return '';
    }
  }

  let drawProfileText = document.querySelector('#drawProfileText');

  function buildDrawReadyUi() {
    if (drawProfileText) return;

    const label = form.querySelector('label[for="nameInput"]');
    const inputRow = form.querySelector('.input-row');
    if (label) label.remove();

    nameInput.type = 'hidden';
    nameInput.placeholder = '';

    const readyRow = document.createElement('div');
    readyRow.className = 'draw-ready-row';
    readyRow.innerHTML = `
      <div>
        <span>今日の占い</span>
        <strong id="drawProfileText">ゲストで占います</strong>
      </div>
    `;
    readyRow.appendChild(drawButton);

    if (inputRow) {
      inputRow.replaceWith(readyRow);
    } else {
      form.insertBefore(readyRow, formNote || null);
    }

    drawProfileText = document.querySelector('#drawProfileText');
  }

  function applyDailyNameStatus() {
    const profileName = savedProfileName();
    nameInput.value = profileName;

    let existingReading = null;
    try {
      existingReading = JSON.parse(localStorage.getItem(storageKey));
    } catch (error) {
      existingReading = null;
    }

    if (existingReading && existingReading.name && drawProfileText) {
      drawProfileText.textContent = `${existingReading.name}さんの今日の星`;
    } else if (drawProfileText) {
      drawProfileText.textContent = profileName ? `${profileName}さんで占います` : 'ゲストで占います';
    }

    if (formNote && !existingReading) {
      formNote.textContent = profileName ? '占えるのは1日1回。結果は明日まで保存されます。' : '名前を使いたい場合は設定で保存できます。';
    }
  }

  if (!document.querySelector('#dailyNamePatchStyles')) {
    const style = document.createElement('style');
    style.id = 'dailyNamePatchStyles';
    style.textContent = `
      .draw-ready-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:12px;align-items:center}.draw-ready-row>div{min-height:54px;border:1px solid rgba(225,216,236,.84);border-radius:8px;background:linear-gradient(180deg,rgba(255,249,253,.92) 0%,rgba(255,255,255,.94) 100%),radial-gradient(circle at 88% 12%,rgba(217,164,65,.22),transparent 24%);padding:10px 12px}.draw-ready-row span{display:block;color:var(--muted);font-size:.78rem;font-weight:900}.draw-ready-row strong{display:block;margin-top:4px;color:var(--accent-dark);font-size:1rem;line-height:1.25;overflow-wrap:anywhere}@media(max-width:420px){.draw-ready-row{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  buildDrawReadyUi();
  applyDailyNameStatus();

  const profileSaveButton = document.querySelector('#profileSaveButton');
  if (profileSaveButton) {
    profileSaveButton.addEventListener('click', () => {
      window.setTimeout(applyDailyNameStatus, 0);
    });
  }

  form.addEventListener('submit', () => {
    nameInput.value = savedProfileName();
    window.setTimeout(applyDailyNameStatus, 0);
  });

  window.addEventListener('storage', applyDailyNameStatus);
})();