(() => {
  const profileKey = 'dailyFortuneProfile';
  const storageKey = 'dailyFortuneDraw';
  const settingsPanel = document.querySelector('.settings-panel');
  const form = document.querySelector('#fortuneForm');
  const nameInput = document.querySelector('#nameInput');
  const drawButton = document.querySelector('#drawButton');
  const formNote = document.querySelector('#formNote');
  if (!settingsPanel || !form || !nameInput || !drawButton) return;

  if (!document.querySelector('#profileNameInput')) {
    settingsPanel.insertAdjacentHTML('afterbegin', `
      <div class="setting-row profile-setting">
        <div>
          <span>プロフィール</span>
          <strong>いつもの名前</strong>
        </div>
        <div class="setting-control">
          <input id="profileNameInput" type="text" maxlength="32" placeholder="例: だり" autocomplete="name" />
          <button id="profileSaveButton" type="button">保存</button>
        </div>
        <small id="profileSaveStatus">この端末だけに保存されます。</small>
      </div>
    `);
  }

  if (!document.querySelector('#profileSettingsPatchStyles')) {
    const style = document.createElement('style');
    style.id = 'profileSettingsPatchStyles';
    style.textContent = `
      .profile-setting{grid-template-columns:minmax(0,.9fr) minmax(220px,1.2fr)}.profile-setting small{grid-column:1/-1;color:var(--muted);font-size:.82rem;font-weight:800}.setting-control{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;align-items:center}.setting-control input{width:100%;min-height:42px;border:1px solid var(--line);border-radius:8px;background:rgba(255,255,255,.86);color:var(--ink);font:inherit;padding:10px 12px}.setting-control input:focus{outline:3px solid rgba(169,139,216,.22);border-color:rgba(124,83,164,.72)}.setting-control button{min-height:42px;padding-inline:16px}.draw-ready-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:12px;align-items:center}.draw-ready-row>div{min-height:54px;border:1px solid rgba(225,216,236,.84);border-radius:8px;background:linear-gradient(180deg,rgba(255,249,253,.92) 0%,rgba(255,255,255,.94) 100%),radial-gradient(circle at 88% 12%,rgba(217,164,65,.22),transparent 24%);padding:10px 12px}.draw-ready-row span{display:block;color:var(--muted);font-size:.78rem;font-weight:900}.draw-ready-row strong{display:block;margin-top:4px;color:var(--accent-dark);font-size:1rem;line-height:1.25;overflow-wrap:anywhere}@media(max-width:420px){.setting-control,.draw-ready-row{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  const profileInput = document.querySelector('#profileNameInput');
  const saveButton = document.querySelector('#profileSaveButton');
  const status = document.querySelector('#profileSaveStatus');
  let drawProfileText = document.querySelector('#drawProfileText');

  function loadProfileName() {
    try {
      const profile = JSON.parse(localStorage.getItem(profileKey));
      return profile && typeof profile.name === 'string' ? profile.name.trim().slice(0, 32) : '';
    } catch (error) {
      localStorage.removeItem(profileKey);
      return '';
    }
  }

  function currentReading() {
    try {
      return JSON.parse(localStorage.getItem(storageKey));
    } catch (error) {
      return null;
    }
  }

  function flashButton(text) {
    const original = saveButton.dataset.label || saveButton.textContent;
    saveButton.dataset.label = original;
    saveButton.textContent = text;
    window.setTimeout(() => { saveButton.textContent = original; }, 1400);
  }

  function buildDailyNameUi() {
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

  function applyProfileName() {
    const saved = loadProfileName();
    const reading = currentReading();
    profileInput.value = saved;
    nameInput.value = saved;

    if (drawProfileText) {
      drawProfileText.textContent = reading && reading.name ? `${reading.name}さんの今日の星` : saved ? `${saved}さんで占います` : 'ゲストで占います';
    }

    if (formNote && !reading) {
      formNote.textContent = saved ? '占えるのは1日1回。結果は明日まで保存されます。' : '名前を使いたい場合は設定で保存できます。';
    }
  }

  function saveProfileName() {
    const name = profileInput.value.trim().slice(0, 32);
    if (name) {
      localStorage.setItem(profileKey, JSON.stringify({ name }));
      status.textContent = '次回からこの名前で占います。';
      applyProfileName();
      flashButton('保存済み');
      return;
    }

    localStorage.removeItem(profileKey);
    status.textContent = '保存名を削除しました。';
    applyProfileName();
    flashButton('削除済み');
  }

  buildDailyNameUi();
  applyProfileName();

  saveButton.addEventListener('click', saveProfileName);
  profileInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      saveProfileName();
    }
  });
  form.addEventListener('submit', () => {
    nameInput.value = loadProfileName();
    window.setTimeout(applyProfileName, 0);
  });
  window.addEventListener('storage', applyProfileName);
})();
