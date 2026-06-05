(() => {
  const profileKey = 'dailyFortuneProfile';
  const settingsPanel = document.querySelector('.settings-panel');
  const nameInput = document.querySelector('#nameInput');
  if (!settingsPanel || !nameInput) return;

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
      .profile-setting{grid-template-columns:minmax(0,.9fr) minmax(220px,1.2fr)}.profile-setting small{grid-column:1/-1;color:var(--muted);font-size:.82rem;font-weight:800}.setting-control{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;align-items:center}.setting-control input{width:100%;min-height:42px;border:1px solid var(--line);border-radius:8px;background:rgba(255,255,255,.86);color:var(--ink);font:inherit;padding:10px 12px}.setting-control input:focus{outline:3px solid rgba(169,139,216,.22);border-color:rgba(124,83,164,.72)}.setting-control button{min-height:42px;padding-inline:16px}@media(max-width:420px){.setting-control{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  const profileInput = document.querySelector('#profileNameInput');
  const saveButton = document.querySelector('#profileSaveButton');
  const status = document.querySelector('#profileSaveStatus');

  function loadProfileName() {
    try {
      const profile = JSON.parse(localStorage.getItem(profileKey));
      return profile && typeof profile.name === 'string' ? profile.name.trim().slice(0, 32) : '';
    } catch (error) {
      localStorage.removeItem(profileKey);
      return '';
    }
  }

  function flashButton(text) {
    const original = saveButton.dataset.label || saveButton.textContent;
    saveButton.dataset.label = original;
    saveButton.textContent = text;
    window.setTimeout(() => { saveButton.textContent = original; }, 1400);
  }

  function applyProfileName() {
    const saved = loadProfileName();
    profileInput.value = saved;
    if (saved && !nameInput.value.trim() && !nameInput.disabled) {
      nameInput.value = saved;
    }
  }

  function saveProfileName() {
    const name = profileInput.value.trim().slice(0, 32);
    if (name) {
      localStorage.setItem(profileKey, JSON.stringify({ name }));
      if (!nameInput.disabled) nameInput.value = name;
      status.textContent = '次回から名前欄に自動で入ります。';
      flashButton('保存済み');
      return;
    }

    localStorage.removeItem(profileKey);
    if (!nameInput.disabled) nameInput.value = '';
    status.textContent = '保存名を削除しました。';
    flashButton('削除済み');
  }

  saveButton.addEventListener('click', saveProfileName);
  profileInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      saveProfileName();
    }
  });

  applyProfileName();
})();
