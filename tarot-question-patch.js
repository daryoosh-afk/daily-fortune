(() => {
  const root = document.querySelector('[data-view="tarot"]');
  const tarotOptions = document.querySelectorAll('.tarot-option');
  const tarotDrawButton = document.querySelector('#tarotDrawButton');
  const tarotSpread = document.querySelector('#tarotSpread');
  const tarotPlanLabel = document.querySelector('#tarotPlanLabel');
  const tarotResultTitle = document.querySelector('#tarotResultTitle');
  const tarotResultCopy = document.querySelector('#tarotResultCopy');
  const tarotReadingList = document.querySelector('#tarotReadingList');
  const nameInput = document.querySelector('#nameInput');
  if (!root || !tarotDrawButton || !tarotSpread || !tarotReadingList) return;

  let tarotQuestionInput = document.querySelector('#tarotQuestionInput');
  const profileKey = 'dailyFortuneProfile';
  let selectedPlan = document.querySelector('.tarot-option.is-selected')?.dataset.plan || 'one';

  if (!tarotQuestionInput) {
    const stage = root.querySelector('.tarot-stage');
    const questionBlock = document.createElement('label');
    questionBlock.className = 'tarot-question';
    questionBlock.setAttribute('for', 'tarotQuestionInput');
    questionBlock.innerHTML = `
      <span>聞きたいこと</span>
      <textarea id="tarotQuestionInput" rows="3" maxlength="120" placeholder="例: 今の恋愛を進めるべきか、仕事で何を優先すべきか"></textarea>
      <small>未入力でも鑑定できます。具体的に書くほど、カードの受け取り方を絞れます。</small>
    `;
    root.querySelector('.tarot-panel')?.insertBefore(questionBlock, stage || tarotDrawButton);
    tarotQuestionInput = document.querySelector('#tarotQuestionInput');
  }

  const majorDeck = [
    ['愚者','旅',['自由、始まり、未知への一歩','完璧な準備を待つより、今できる小さな一歩を選ぶと流れが動きます。'],['無計画、不安定、勢いだけの判断','急いで飛び込む前に、失いたくないものと最低限の準備を確認してください。']],
    ['魔術師','術',['意志、行動、使える力','すでに持っている材料を組み合わせると、次の打ち手が見えてきます。'],['空回り、言葉だけ、力の使い忘れ','大きく見せるより、今日実際に動かせる一つへ力を集めてください。']],
    ['女教皇','静',['直感、静かな判断、内側の答え','周りの声より、自分の中で引っかかっている感覚を丁寧に見てください。'],['迷い込み、考えすぎ、本音を隠す','答えを外に探しすぎず、まず何が不安なのかを言葉にしてください。']],
    ['女帝','育',['豊かさ、愛情、育つもの','急がずに育てる姿勢が、関係や状況をやわらかく進めます。'],['甘やかし、停滞、与えすぎ','相手や状況に尽くしすぎていないか、自分の余白も守ってください。']],
    ['皇帝','軸',['安定、責任、土台作り','感情だけで決めず、守るべき線を一つ決めると迷いが減ります。'],['頑固、支配、無理な管理','正しさを押し通すより、相手や現実に合わせる余地を残してください。']],
    ['教皇','信',['信頼、学び、助言','一人で抱えず、信頼できる人や基本に立ち返ることが助けになります。'],['思い込み、古いルール、周囲への遠慮','常識だからと飲み込まず、今の自分に本当に合う形を選んでください。']],
    ['恋人','結',['選択、関係、心が動くもの','正しさだけで選ばず、心が軽くなる選択にも目を向けてください。'],['迷い、すれ違い、選びきれなさ','相手に合わせすぎず、自分がどうしたいかを短く整理してください。']],
    ['戦車','進',['前進、勢い、意志の強さ','迷いを残したままでも、方向を一つ決めて動くことで景色が変わります。'],['暴走、焦り、方向のズレ','勢いだけで進めず、目的地を確認してから動き直してください。']],
    ['力','力',['忍耐、優しさ、内側の強さ','強く押すより、落ち着いて向き合うことで状況を動かせます。'],['自信の揺れ、我慢の限界、感情の波','無理に強がらず、疲れている部分を先に整えてください。']],
    ['隠者','灯',['内省、距離、静かな答え','少し距離を置いて考えると、本当に大事にしたいことが見えてきます。'],['孤立、考え込み、閉じすぎ','一人で抱えすぎず、短い相談や確認で視界を開いてください。']],
    ['運命の輪','輪',['転機、タイミング、流れの変化','変化を止めようとするより、今来ている流れに小さく乗ってください。'],['停滞、タイミング待ち、同じ流れ','無理に結果を急がず、準備を整えながら次の合図を待ってください。']],
    ['正義','衡',['公平、判断、釣り合い','気持ちと事実を分けて見ると、納得できる答えに近づきます。'],['偏り、不公平、決めつけ','片側の見方だけで決めず、相手側や別の事実も確認してください。']],
    ['吊るされた男','待',['見方の転換、受け入れ、待つ力','今すぐ動かせないことは、別の角度から意味を見直してみてください。'],['報われない我慢、停滞、視野の狭さ','ただ耐えるだけになっているなら、やめる選択肢も含めて見直してください。']],
    ['死神','終',['終わり、手放し、再生','終わらせるものを決めることで、新しい流れが入りやすくなります。'],['終われない、執着、変化への抵抗','無理に忘れようとせず、もう役目を終えたものを一つだけ手放してください。']],
    ['節制','整',['調整、バランス、少しずつ進む','一気に変えるより、無理のない形に整えることが長く続く答えになります。'],['乱れ、無理、ペースの崩れ','頑張りすぎている部分を減らし、今日の負担を少し軽くしてください。']],
    ['悪魔','縛',['執着、誘惑、抜け出したい癖','本当は苦しくなっている習慣や関係を、少しだけ緩める意識が必要です。'],['解放、気づき、悪循環から抜ける兆し','小さな距離を置くことで、自分を縛っていたものが見えやすくなります。']],
    ['塔','雷',['突然の変化、気づき、壊れる前提','予定外の変化は、古い前提を見直すきっかけとして扱うと前に進めます。'],['変化の先送り、不安、崩れる前の違和感','見ないふりしている問題を、小さいうちに一つだけ直してください。']],
    ['星','星',['希望、回復、未来への光','すぐに答えを出すより、今信じたい方向を一つ選ぶと流れが整います。'],['自信の低下、期待しすぎ、希望の見失い','遠い理想より、今日少し安心できる行動を選んでください。']],
    ['月','月',['迷い、不安、見えない本音','はっきりしない気持ちを無理に消さず、何が不安なのかを言葉にしてください。'],['霧が晴れる、誤解が解ける、現実を見る','不安の正体が少し見えてきます。確認できる事実から整えてください。']],
    ['太陽','陽',['明るさ、成功、素直な喜び','難しく考えすぎず、今日できる前向きな行動を一つ選んでください。'],['元気不足、素直になれない、小さな遅れ','結果を急がず、まず気分が少し明るくなる選択をしてください。']],
    ['審判','呼',['目覚め、再開、過去からの答え','前に止めたことや保留にしたことを、今の自分で見直す時です。'],['決断の先送り、過去へのこだわり、聞こえない合図','後悔を責めるより、今なら選び直せることを一つ見つけてください。']],
    ['世界','完',['完成、一段落、次の段階','ここまで進めたことを認めると、次に向かう準備が自然に整います。'],['未完成、区切り不足、あと一歩','終わらせるために必要な小さな仕上げを一つだけ進めてください。']]
  ].map(([name, symbol, upright, reversed]) => ({ name, symbol, upright: { meaning: upright[0], advice: upright[1] }, reversed: { meaning: reversed[0], advice: reversed[1] } }));

  const planNames = { one: '1枚カード', three: '3枚スプレッド', six: '6枚詳細鑑定' };
  const planPositions = { one: ['今の答え'], three: ['過去','現在','近い未来'], six: ['状況','本音','障害','助け','行動','結果'] };
  const planCopies = {
    one: '今のテーマに対する短い答えです。カードの向きと意味を、今日の行動に一つだけ反映してみてください。',
    three: '過去、現在、近い未来の流れで見ます。状況の流れを整理して、次に取る行動を見つけます。',
    six: '状況、本音、障害、助け、行動、結果を分けて整理します。悩みを複数の角度から見たいときの詳細鑑定です。'
  };

  function hashText(text) { let hash = 2166136261; for (let i = 0; i < text.length; i += 1) { hash ^= text.charCodeAt(i); hash = Math.imul(hash, 16777619); } return hash >>> 0; }
  function todayKey() { return new Intl.DateTimeFormat('en-CA', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()); }
  function savedProfileName() { try { const p = JSON.parse(localStorage.getItem(profileKey)); return p && typeof p.name === 'string' ? p.name.trim().slice(0, 32) : ''; } catch (e) { return ''; } }
  function normalizedQuestion() { return (tarotQuestionInput?.value || '').trim().replace(/\s+/g, ' '); }
  function questionFocus(question) {
    if (!question) return { label: '今日のテーマ', action: 'まず一番気になっていることを一つだけ選び、今日できる小さな確認から始めてください。' };
    if (/恋|好き|復縁|片思い|結婚|相手|彼|彼女|愛/.test(question)) return { label: '恋愛の相談', action: '相手の反応を急いで決めつけず、自分が安心して伝えられる一言を選んでください。' };
    if (/仕事|転職|会社|職場|副業|お金|収入|キャリア|上司|同僚/.test(question)) return { label: '仕事とお金の相談', action: '感情で決める前に、今日動かせる作業、確認、相談を一つに絞ってください。' };
    if (/友|家族|人間関係|親|子|学校|仲|距離|会話/.test(question)) return { label: '人間関係の相談', action: '相手を変えようとする前に、自分が守りたい距離感と言葉を整理してください。' };
    if (/不安|迷|悩|決め|選|どう|将来|これから/.test(question)) return { label: '迷いの相談', action: '全部を一度に解こうとせず、今いちばん不安を減らせる一歩だけを選んでください。' };
    return { label: '個別の相談', action: 'カードの意味をそのまま結論にせず、今の状況で一番現実的な行動に置き換えてください。' };
  }

  function drawCards(seed, positions) {
    const deck = [...majorDeck];
    return positions.map((position, index) => {
      const cardIndex = hashText(`${seed}|${position}|${index}|major`) % deck.length;
      const [card] = deck.splice(cardIndex, 1);
      const orientation = hashText(`${seed}|${position}|${card.name}|orientation`) % 100 < 42 ? '逆位置' : '正位置';
      const reading = orientation === '逆位置' ? card.reversed : card.upright;
      return { ...card, position, orientation, meaning: reading.meaning, advice: reading.advice };
    });
  }

  function buildReading(plan) {
    const question = normalizedQuestion();
    const focus = questionFocus(question);
    const name = nameInput?.value.trim() || savedProfileName() || 'ゲスト';
    const positions = planPositions[plan] || planPositions.one;
    const seed = hashText(`${todayKey()}|${name}|${plan}|${question}|major-tarot`);
    const cards = drawCards(seed, positions);
    return { plan, question, focus, cards, title: question ? `${focus.label}に${cards.length}枚のカードが出ました。` : `${cards.length}枚のカードが出ました。`, copy: question ? `「${question}」について、カードの向きから今できる解決案を整理します。${focus.action}` : planCopies[plan] };
  }

  function renderPlaceholder(plan) {
    const positions = planPositions[plan] || planPositions.one;
    tarotSpread.innerHTML = positions.map((position) => `<div class="tarot-card-preview is-empty"><span>?</span><small>${position}</small></div>`).join('');
    tarotReadingList.innerHTML = '';
  }

  function renderReading(reading) {
    tarotSpread.innerHTML = reading.cards.map((card) => `<div class="tarot-card-preview ${card.orientation === '逆位置' ? 'is-reversed' : ''}"><span>${card.symbol}</span><strong>${card.name}</strong><em>${card.orientation}</em><small>${card.position}</small></div>`).join('');
    tarotReadingList.innerHTML = reading.cards.map((card) => `<section class="tarot-reading-card"><span>${card.position} / ${card.orientation}</span><h3>${card.name}</h3><p><strong>意味:</strong> ${card.meaning}</p><p><strong>助言:</strong> ${card.advice}</p><p><strong>解決案:</strong> ${reading.focus.action}</p></section>`).join('');
  }

  function selectPlan(plan) {
    selectedPlan = plan;
    if (tarotPlanLabel) tarotPlanLabel.textContent = planNames[plan] || planNames.one;
    if (tarotResultTitle) tarotResultTitle.textContent = '聞きたいテーマを心に浮かべてください。';
    if (tarotResultCopy) tarotResultCopy.textContent = '大アルカナと正位置・逆位置で、今の流れを読みます。';
    renderPlaceholder(plan);
    tarotOptions.forEach((option) => {
      const isSelected = option.dataset.plan === plan;
      option.classList.toggle('is-selected', isSelected);
      if (isSelected) option.setAttribute('aria-current', 'true'); else option.removeAttribute('aria-current');
    });
  }

  function drawTarot(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    const reading = buildReading(selectedPlan);
    if (tarotResultTitle) tarotResultTitle.textContent = reading.title;
    if (tarotResultCopy) tarotResultCopy.textContent = reading.copy;
    renderReading(reading);
  }

  if (!document.querySelector('#majorTarotPatchStyles')) {
    const style = document.createElement('style');
    style.id = 'majorTarotPatchStyles';
    style.textContent = '.tarot-card-preview em{display:block;margin-top:4px;color:#fff4cf;font-style:normal;font-size:.72rem;font-weight:1000;letter-spacing:0}.tarot-card-preview.is-reversed{background:linear-gradient(180deg,#4c2577 0%,#7a3db8 100%);border-color:rgba(255,244,207,.76)}.tarot-card-preview.is-reversed span{transform:rotate(180deg);opacity:.88}.tarot-reading-card span{overflow-wrap:anywhere}';
    document.head.appendChild(style);
  }

  tarotOptions.forEach((option) => option.addEventListener('click', (event) => { event.preventDefault(); event.stopImmediatePropagation(); selectPlan(option.dataset.plan); }, true));
  tarotDrawButton.addEventListener('click', drawTarot, true);
  selectPlan(selectedPlan);
})();
