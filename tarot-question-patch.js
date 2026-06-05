(() => {
  const root = document.querySelector('[data-view="tarot"]');
  if (!root) return;

  const menu = root.querySelector('#tarotMenu');
  const spread = root.querySelector('#tarotSpread');
  const planLabel = root.querySelector('#tarotPlanLabel');
  const resultTitle = root.querySelector('#tarotResultTitle');
  const resultCopy = root.querySelector('#tarotResultCopy');
  const readingList = root.querySelector('#tarotReadingList');
  if (!menu || !spread || !planLabel || !resultTitle || !resultCopy || !readingList) return;

  if (!root.querySelector('#tarotQuestionInput')) {
    menu.insertAdjacentHTML('afterend', `
      <label class="tarot-question" for="tarotQuestionInput">
        <span>聞きたいこと</span>
        <textarea id="tarotQuestionInput" rows="3" maxlength="120" placeholder="例: 今の恋愛を進めるべきか、仕事で何を優先すべきか"></textarea>
        <small>未入力でも鑑定できます。具体的に書くほど、カードの受け取り方を絞れます。</small>
      </label>
    `);
  }

  if (!document.querySelector('#tarotQuestionPatchStyles')) {
    const style = document.createElement('style');
    style.id = 'tarotQuestionPatchStyles';
    style.textContent = `
      .tarot-question{display:grid;gap:8px;margin-top:16px;border:1px solid rgba(169,139,216,.34);border-radius:8px;background:radial-gradient(circle at 96% 12%,rgba(217,164,65,.16),transparent 24%),linear-gradient(180deg,#fff 0%,#fff9fd 100%);padding:14px}.tarot-question span{color:var(--accent-dark);font-size:.9rem;font-weight:900}.tarot-question textarea{width:100%;min-height:88px;resize:vertical;border:1px solid var(--line);border-radius:8px;background:rgba(255,255,255,.82);color:var(--ink);font:inherit;line-height:1.5;padding:12px}.tarot-question textarea:focus{outline:3px solid rgba(169,139,216,.22);border-color:rgba(124,83,164,.72)}.tarot-question small{color:var(--muted);font-size:.82rem;font-weight:800;line-height:1.45}.tarot-card-preview span{font-size:clamp(1.45rem,5vw,2.15rem)}.tarot-card-preview strong{max-width:100%;color:#fff8de;font-size:clamp(.68rem,2.2vw,.88rem);font-weight:900;line-height:1.2;overflow-wrap:anywhere;text-align:center}
    `;
    document.head.appendChild(style);
  }

  const major = [
    ['愚者','始'],['魔術師','術'],['女教皇','静'],['女帝','育'],['皇帝','軸'],['教皇','信'],['恋人','縁'],['戦車','進'],['力','力'],['隠者','灯'],['運命の輪','輪'],['正義','衡'],['吊るされた男','待'],['死神','終'],['節制','整'],['悪魔','鎖'],['塔','雷'],['星','星'],['月','月'],['太陽','陽'],['審判','呼'],['世界','完']
  ];
  const suitData = {
    ワンド: { symbol: '杖', theme: '情熱、行動、挑戦', advice: '考えすぎる前に、動ける範囲で試すことが流れを作ります。' },
    カップ: { symbol: '杯', theme: '感情、関係、心の満足', advice: '正解よりも、自分と相手の気持ちを丁寧に扱うことが大切です。' },
    ソード: { symbol: '剣', theme: '思考、判断、言葉', advice: '感情と事実を切り分けると、次に言うべきことが見えます。' },
    ペンタクル: { symbol: '金', theme: '現実、仕事、お金、積み重ね', advice: '大きな変化より、今ある土台を整えることが結果につながります。' }
  };
  const rankData = {
    エース: '始まり、可能性、最初の芽', '2': '選択、バランス、向き合うもの', '3': '成長、協力、形になり始める流れ', '4': '安定、休息、守るべき土台', '5': '葛藤、変化、見直しのきっかけ', '6': '調和、回復、過去からの助け', '7': '見極め、努力、待つ力', '8': '継続、集中、積み重ね', '9': '達成前、満ちていく力、ひと区切り', '10': '完成、負担、次へ移る合図', ペイジ: '知らせ、学び、未熟だけど新しい力', ナイト: '行動、勢い、進み方の癖', クイーン: '受け止める力、成熟、内側の豊かさ', キング: '責任、判断、外へ示す力'
  };
  const majorAdvice = {
    愚者: '完璧な準備より、今できる小さな一歩を選ぶと流れが動きます。', 魔術師: 'すでに持っている材料を組み合わせると、次の打ち手が見えてきます。', 女教皇: '周りの声より、自分の中で引っかかっている感覚を丁寧に見てください。', 女帝: '急がずに育てる姿勢が、関係や状況をやわらかく進めます。', 皇帝: '感情だけで決めず、守るべき線を一つ決めると迷いが減ります。', 教皇: '一人で抱えず、信頼できる人や基本に立ち返ることが助けになります。', 恋人: '正しさだけで選ばず、心が軽くなる選択肢にも目を向けてください。', 戦車: '方向を一つ決めて動くことで景色が変わります。', 力: '強く押すより、落ち着いて向き合うことで状況を動かせます。', 隠者: '少し距離を置いて考えると、本当に大事にしたいことが見えてきます。', 運命の輪: '今来ている流れに合わせて小さく動くのが合っています。', 正義: '気持ちと事実を分けて見ると、納得できる答えに近づきます。', 吊るされた男: '別の角度から意味を見直してみてください。', 死神: '終わらせるものを決めることで、新しい流れが入りやすくなります。', 節制: '無理のない量に整えることが長く続く答えになります。', 悪魔: '苦しくなっている習慣や関係を、少しだけ緩める意識が必要です。', 塔: '予定外の変化は、古い前提を見直すきっかけとして扱うと前に進めます。', 星: '今信じたい方向を一つ選ぶと流れが整います。', 月: '何が不安なのかを言葉にしてみましょう。', 太陽: '今日できる前向きな行動を一つ選ぶと結果につながりやすいです。', 審判: '保留にしたことを、今の自分で見直す時です。', 世界: 'ここまで進めたことを認めると、次に向かう準備が自然に整います。'
  };
  const tarotCards = [
    ...major.map(([name, symbol]) => ({ name, symbol, meaning: '大アルカナ。流れの大きなテーマや転機を示します。', advice: majorAdvice[name] || 'カードの意味を今の状況に置き換えてください。' })),
    ...Object.entries(suitData).flatMap(([suit, data]) => Object.entries(rankData).map(([rank, meaning]) => ({ name: `${suit}の${rank}`, symbol: data.symbol, meaning: `${data.theme}。${meaning}`, advice: data.advice })))
  ];
  const planNames = { one: '1枚カード', three: '3枚スプレッド', six: '6枚詳細鑑定' };
  const positionsByPlan = { one: ['今日の答え'], three: ['過去', '現在', '近い未来'], six: ['状況', '本音', '障害', '助け', '行動', '結果'] };
  let selectedPlan = root.querySelector('.tarot-option.is-selected')?.dataset.plan || 'one';

  function todayKey() {
    return new Intl.DateTimeFormat('en-CA', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  }
  function hashText(text) {
    let hash = 2166136261;
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }
  function currentQuestion() {
    return root.querySelector('#tarotQuestionInput')?.value.trim().replace(/\s+/g, ' ') || '';
  }
  function focusFor(text) {
    if (!text) return { label: '今日のテーマ', action: 'まずは一番気になっていることを一つだけ選び、今日できる小さな確認から始めてください。' };
    if (/恋|好き|復縁|片思い|結婚|相手|彼|彼女|愛/.test(text)) return { label: '恋愛の相談', action: '相手の反応を急いで決めつけず、自分が安心して伝えられる一言を選んでください。' };
    if (/仕事|転職|会社|職場|副業|お金|収入|キャリア|上司|同僚/.test(text)) return { label: '仕事とお金の相談', action: '感情で決める前に、今日動かせる作業、確認、相談先を一つに絞ってください。' };
    if (/友|家族|人間関係|親|子|学校|仲|距離|会話/.test(text)) return { label: '人間関係の相談', action: '相手を変えようとする前に、自分が守りたい距離感と言葉を整理してください。' };
    if (/不安|迷|悩|怖|決め|選|どう|将来|これから/.test(text)) return { label: '迷いの相談', action: '全部を一度に解こうとせず、今いちばん不安を減らせる一歩だけを選んでください。' };
    return { label: '個別の相談', action: 'カードの意味をそのまま結論にせず、今の状況で一番現実的な行動に置き換えてください。' };
  }
  function drawUnique(seed, positions) {
    const deck = [...tarotCards];
    return positions.map((position, index) => {
      const cardIndex = hashText(`${seed}|${position}|${index}|deck`) % deck.length;
      const [card] = deck.splice(cardIndex, 1);
      return { position, ...card };
    });
  }
  function renderPlaceholder(plan) {
    spread.innerHTML = (positionsByPlan[plan] || positionsByPlan.one).map((position) => `<div class="tarot-card-preview is-empty"><span>?</span><small>${position}</small></div>`).join('');
    readingList.innerHTML = '';
  }
  function renderReading(cards, focus) {
    spread.innerHTML = cards.map((card) => `<div class="tarot-card-preview"><span>${card.symbol}</span><strong>${card.name}</strong><small>${card.position}</small></div>`).join('');
    readingList.innerHTML = cards.map((card) => `<section class="tarot-reading-card"><span>${card.position}</span><h3>${card.name}</h3><p><strong>意味:</strong> ${card.meaning}</p><p><strong>助言:</strong> ${card.advice}</p><p><strong>解決案:</strong> ${focus.action}</p></section>`).join('');
  }
  function selectPlan(plan) {
    selectedPlan = plan;
    planLabel.textContent = planNames[plan] || planNames.one;
    resultTitle.textContent = '聞きたいテーマを心に浮かべてください。';
    resultCopy.textContent = 'リリース前テスト中のため、今は無料で体験できます。';
    root.querySelectorAll('.tarot-option').forEach((option) => option.classList.toggle('is-selected', option.dataset.plan === plan));
    renderPlaceholder(plan);
  }
  function draw() {
    const text = currentQuestion();
    const focus = focusFor(text);
    const name = document.querySelector('#nameInput')?.value.trim() || 'ゲスト';
    const positions = positionsByPlan[selectedPlan] || positionsByPlan.one;
    const cards = drawUnique(hashText(`${todayKey()}|${name}|${selectedPlan}|${text}|tarot`), positions);
    resultTitle.textContent = text ? `${focus.label}に${cards.length}枚のカードが出ました。` : `${cards.length}枚のカードが出ました。`;
    resultCopy.textContent = text ? `「${text}」について、カードの流れから今できる解決案を整理します。${focus.action}` : 'カードの意味を今日の行動に一つだけ反映してみてください。';
    renderReading(cards, focus);
  }

  root.querySelectorAll('.tarot-option').forEach((button) => {
    const clone = button.cloneNode(true);
    button.replaceWith(clone);
    clone.addEventListener('click', () => selectPlan(clone.dataset.plan));
  });
  const oldDraw = root.querySelector('#tarotDrawButton');
  if (oldDraw) {
    const drawButton = oldDraw.cloneNode(true);
    oldDraw.replaceWith(drawButton);
    drawButton.addEventListener('click', draw);
  }
  selectPlan(selectedPlan);
})();
