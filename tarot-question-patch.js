(() => {
  const tarotOptions = document.querySelectorAll(".tarot-option");
  const tarotDrawButton = document.querySelector("#tarotDrawButton");
  const tarotSpread = document.querySelector("#tarotSpread");
  const tarotPlanLabel = document.querySelector("#tarotPlanLabel");
  const tarotResultTitle = document.querySelector("#tarotResultTitle");
  const tarotResultCopy = document.querySelector("#tarotResultCopy");
  const tarotReadingList = document.querySelector("#tarotReadingList");
  const tarotQuestionInput = document.querySelector("#tarotQuestionInput");
  const nameInput = document.querySelector("#nameInput");

  if (!tarotDrawButton || !tarotSpread || !tarotReadingList) return;

  const profileKey = "dailyFortuneProfile";
  let selectedPlan = document.querySelector(".tarot-option.is-selected")?.dataset.plan || "one";

  const majorDeck = [
    ["愚者", "旅", ["自由、始まり、未知への一歩", "完璧な準備を待つより、今できる小さな一歩を選ぶと流れが動きます。"], ["無計画、不安定、勢いだけの判断", "急いで飛び込む前に、失いたくないものと最低限の準備を確認してください。"]],
    ["魔術師", "術", ["意志、行動、使える力", "すでに持っている材料を組み合わせると、次の打ち手が見えてきます。"], ["空回り、言葉だけ、力の使い忘れ", "大きく見せるより、今日実際に動かせる一つへ力を集めてください。"]],
    ["女教皇", "静", ["直感、静かな判断、内側の答え", "周りの声より、自分の中で引っかかっている感覚を丁寧に見てください。"], ["迷い込み、考えすぎ、本音を隠す", "答えを外に探しすぎず、まず何が不安なのかを言葉にしてください。"]],
    ["女帝", "育", ["豊かさ、愛情、育つもの", "急がずに育てる姿勢が、関係や状況をやわらかく進めます。"], ["甘やかし、停滞、与えすぎ", "相手や状況に尽くしすぎていないか、自分の余白も守ってください。"]],
    ["皇帝", "軸", ["安定、責任、土台作り", "感情だけで決めず、守るべき線を一つ決めると迷いが減ります。"], ["頑固、支配、無理な管理", "正しさを押し通すより、相手や現実に合わせる余地を残してください。"]],
    ["教皇", "信", ["信頼、学び、助言", "一人で抱えず、信頼できる人や基本に立ち返ることが助けになります。"], ["思い込み、古いルール、周囲への遠慮", "常識だからと飲み込まず、今の自分に本当に合う形を選んでください。"]],
    ["恋人", "結", ["選択、関係、心が動くもの", "正しさだけで選ばず、心が軽くなる選択にも目を向けてください。"], ["迷い、すれ違い、選びきれなさ", "相手に合わせすぎず、自分がどうしたいかを短く整理してください。"]],
    ["戦車", "進", ["前進、勢い、意志の強さ", "迷いを残したままでも、方向を一つ決めて動くことで景色が変わります。"], ["暴走、焦り、方向のズレ", "勢いだけで進めず、目的地を確認してから動き直してください。"]],
    ["力", "力", ["忍耐、優しさ、内側の強さ", "強く押すより、落ち着いて向き合うことで状況を動かせます。"], ["自信の揺れ、我慢の限界、感情の波", "無理に強がらず、疲れている部分を先に整えてください。"]],
    ["隠者", "灯", ["内省、距離、静かな答え", "少し距離を置いて考えると、本当に大事にしたいことが見えてきます。"], ["孤立、考え込み、閉じすぎ", "一人で抱えすぎず、短い相談や確認で視界を開いてください。"]],
    ["運命の輪", "輪", ["転機、タイミング、流れの変化", "変化を止めようとするより、今来ている流れに小さく乗ってください。"], ["停滞、タイミング待ち、同じ流れ", "無理に結果を急がず、準備を整えながら次の合図を待ってください。"]],
    ["正義", "衡", ["公平、判断、釣り合い", "気持ちと事実を分けて見ると、納得できる答えに近づきます。"], ["偏り、不公平、決めつけ", "片側の見方だけで決めず、相手側や別の事実も確認してください。"]],
    ["吊るされた男", "待", ["見方の転換、受け入れ、待つ力", "今すぐ動かせないことは、別の角度から意味を見直してみてください。"], ["報われない我慢、停滞、視野の狭さ", "ただ耐えるだけになっているなら、やめる選択肢も含めて見直してください。"]],
    ["死神", "終", ["終わり、手放し、再生", "終わらせるものを決めることで、新しい流れが入りやすくなります。"], ["終われない、執着、変化への抵抗", "無理に忘れようとせず、もう役目を終えたものを一つだけ手放してください。"]],
    ["節制", "整", ["調整、バランス、少しずつ進む", "一気に変えるより、無理のない形に整えることが長く続く答えになります。"], ["乱れ、無理、ペースの崩れ", "頑張りすぎている部分を減らし、今日の負担を少し軽くしてください。"]],
    ["悪魔", "縛", ["執着、誘惑、抜け出したい癖", "本当は苦しくなっている習慣や関係を、少しだけ緩める意識が必要です。"], ["解放、気づき、悪循環から抜ける兆し", "小さな距離を置くことで、自分を縛っていたものが見えやすくなります。"]],
    ["塔", "雷", ["突然の変化、気づき、壊れる前提", "予定外の変化は、古い前提を見直すきっかけとして扱うと前に進めます。"], ["変化の先送り、不安、崩れる前の違和感", "見ないふりしている問題を、小さいうちに一つだけ直してください。"]],
    ["星", "星", ["希望、回復、未来への光", "すぐに答えを出すより、今信じたい方向を一つ選ぶと流れが整います。"], ["自信の低下、期待しすぎ、希望の見失い", "遠い理想より、今日少し安心できる行動を選んでください。"]],
    ["月", "月", ["迷い、不安、見えない本音", "はっきりしない気持ちを無理に消さず、何が不安なのかを言葉にしてください。"], ["霧が晴れる、誤解が解ける、現実を見る", "不安の正体が少し見えてきます。確認できる事実から整えてください。"]],
    ["太陽", "陽", ["明るさ、成功、素直な喜び", "難しく考えすぎず、今日できる前向きな行動を一つ選んでください。"], ["元気不足、素直になれない、小さな遅れ", "結果を急がず、まず気分が少し明るくなる選択をしてください。"]],
    ["審判", "呼", ["目覚め、再開、過去からの答え", "前に止めたことや保留にしたことを、今の自分で見直す時です。"], ["決断の先送り、過去へのこだわり、聞こえない合図", "後悔を責めるより、今なら選び直せることを一つ見つけてください。"]],
    ["世界", "完", ["完成、一段落、次の段階", "ここまで進めたことを認めると、次に向かう準備が自然に整います。"], ["未完成、区切り不足、あと一歩", "終わらせるために必要な小さな仕上げを一つだけ進めてください。"]]
  ].map(([name, symbol, upright, reversed]) => ({
    name,
    symbol,
    upright: { meaning: upright[0], advice: upright[1] },
    reversed: { meaning: reversed[0], advice: reversed[1] }
  }));

  const planNames = {
    one: "1枚カード",
    three: "3枚スプレッド",
    six: "6枚詳細鑑定"
  };

  const planPositions = {
    one: ["今の答え"],
    three: ["過去", "現在", "近い未来"],
    six: ["状況", "本音", "障害", "助け", "行動", "結果"]
  };

  const planCopies = {
    one: "今のテーマに対する短い答えです。カードの向きと意味を、今日の行動に一つだけ反映してみてください。",
    three: "過去、現在、近い未来の流れで見ます。状況の流れを整理して、次に取る行動を見つけます。",
    six: "状況、本音、障害、助け、行動、結果を分けて整理します。悩みを複数の角度から見たいときの詳細鑑定です。"
  };

  const cardNumbers = {
    "愚者": "0",
    "魔術師": "I",
    "女教皇": "II",
    "女帝": "III",
    "皇帝": "IV",
    "教皇": "V",
    "恋人": "VI",
    "戦車": "VII",
    "力": "VIII",
    "隠者": "IX",
    "運命の輪": "X",
    "正義": "XI",
    "吊るされた男": "XII",
    "死神": "XIII",
    "節制": "XIV",
    "悪魔": "XV",
    "塔": "XVI",
    "星": "XVII",
    "月": "XVIII",
    "太陽": "XIX",
    "審判": "XX",
    "世界": "XXI"
  };

  const cardArt = {
    "愚者": { main: "♙", left: "☼", right: "☾", ground: "✦", tone: "dawn" },
    "魔術師": { main: "∞", left: "✶", right: "✧", ground: "◆", tone: "arcane" },
    "女教皇": { main: "☾", left: "柱", right: "書", ground: "✦", tone: "moon" },
    "女帝": { main: "✿", left: "☼", right: "葉", ground: "✦", tone: "earth" },
    "皇帝": { main: "♔", left: "山", right: "盾", ground: "◆", tone: "gold" },
    "教皇": { main: "鍵", left: "✦", right: "柱", ground: "◆", tone: "arcane" },
    "恋人": { main: "♢", left: "☼", right: "☾", ground: "✦", tone: "dawn" },
    "戦車": { main: "車", left: "星", right: "月", ground: "◆", tone: "gold" },
    "力": { main: "獅", left: "✿", right: "∞", ground: "✦", tone: "earth" },
    "隠者": { main: "灯", left: "山", right: "✦", ground: "◆", tone: "moon" },
    "運命の輪": { main: "輪", left: "☼", right: "☾", ground: "✦", tone: "arcane" },
    "正義": { main: "衡", left: "剣", right: "柱", ground: "◆", tone: "gold" },
    "吊るされた男": { main: "逆", left: "枝", right: "光", ground: "✦", tone: "moon" },
    "死神": { main: "蝶", left: "☾", right: "芽", ground: "✿", tone: "rebirth" },
    "節制": { main: "杯", left: "水", right: "星", ground: "✦", tone: "dawn" },
    "悪魔": { main: "鎖", left: "角", right: "火", ground: "◆", tone: "shadow" },
    "塔": { main: "塔", left: "雷", right: "星", ground: "◆", tone: "shadow" },
    "星": { main: "✶", left: "水", right: "花", ground: "✦", tone: "moon" },
    "月": { main: "☾", left: "犬", right: "道", ground: "✦", tone: "moon" },
    "太陽": { main: "☼", left: "花", right: "旗", ground: "✦", tone: "dawn" },
    "審判": { main: "呼", left: "翼", right: "光", ground: "✦", tone: "gold" },
    "世界": { main: "環", left: "星", right: "葉", ground: "✦", tone: "earth" }
  };

  function artForCard(card) {
    return {
      number: cardNumbers[card.name] || "",
      ...(cardArt[card.name] || { main: card.symbol, left: "☾", right: "✦", ground: "◆", tone: "arcane" })
    };
  }

  function hashText(text) {
    let hash = 2166136261;
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function todayKey() {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(new Date());
  }

  function savedProfileName() {
    try {
      const profile = JSON.parse(localStorage.getItem(profileKey));
      return profile && typeof profile.name === "string" ? profile.name.trim().slice(0, 32) : "";
    } catch (error) {
      return "";
    }
  }

  function normalizedQuestion() {
    return (tarotQuestionInput?.value || "").trim().replace(/\s+/g, " ");
  }

  function questionFocus(question) {
    if (!question) {
      return {
        label: "今日のテーマ",
        action: "まず一番気になっていることを一つだけ選び、今日できる小さな確認から始めてください。"
      };
    }

    if (/恋|好き|復縁|片思い|結婚|相手|彼|彼女|愛/.test(question)) {
      return {
        label: "恋愛の相談",
        action: "相手の反応を急いで決めつけず、自分が安心して伝えられる一言を選んでください。"
      };
    }

    if (/仕事|転職|会社|職場|副業|お金|収入|キャリア|上司|同僚/.test(question)) {
      return {
        label: "仕事とお金の相談",
        action: "感情で決める前に、今日動かせる作業、確認、相談を一つに絞ってください。"
      };
    }

    if (/友|家族|人間関係|親|子|学校|仲|距離|会話/.test(question)) {
      return {
        label: "人間関係の相談",
        action: "相手を変えようとする前に、自分が守りたい距離感と言葉を整理してください。"
      };
    }

    if (/不安|迷|悩|決め|選|どう|将来|これから/.test(question)) {
      return {
        label: "迷いの相談",
        action: "全部を一度に解こうとせず、今いちばん不安を減らせる一歩だけを選んでください。"
      };
    }

    return {
      label: "個別の相談",
      action: "カードの意味をそのまま結論にせず、今の状況で一番現実的な行動に置き換えてください。"
    };
  }

  const positionSolutions = {
    "今の答え": [
      "まず今日だけは答えを急がず、いちばん引っかかる一点を紙に出してください。",
      "迷いを増やす情報集めは控えなさい。今ある材料で小さく決める時です。"
    ],
    "過去": [
      "前に流した違和感を見直してください。そこに今回の迷いの種があります。",
      "過去の失敗を責めるのはやめなさい。同じ型だけを避ければ十分です。"
    ],
    "現在": [
      "今は相手や状況を動かすより、自分の態度を一つ整える方が早いです。",
      "言い訳を増やすほど運は散ります。今日やることを一つに絞ってください。"
    ],
    "近い未来": [
      "近いうちに小さな返事が来ます。先回りして騒がず、受け取る準備をしてください。",
      "良い流れは急かすと逃げます。焦りを見せず、自然に続く形を選びなさい。"
    ],
    "状況": [
      "状況を複雑にしているのは、答えではなく優先順位です。先に順番を決めてください。",
      "全部を守ろうとすると身動きが取れません。今守るものを一つ選びなさい。"
    ],
    "本音": [
      "本音を隠したまま良い答えは出ません。言わないとしても、自分には正直でいてください。",
      "心にもない返事は後で重くなります。小さくても本音に近い言葉を選びなさい。"
    ],
    "障害": [
      "邪魔しているのは相手だけではありません。自分の思い込みも一度疑ってください。",
      "見栄を張ると小さな縁を逃します。できないことはできないと言う方が運は残ります。"
    ],
    "助け": [
      "助けは近くにあります。ひとりで格好をつけるのは今日だけやめなさい。",
      "頼る相手を間違えなければ流れは軽くなります。静かに相談してください。"
    ],
    "行動": [
      "浮気心は捨てなさい。あれもこれもではなく、今の本命を一つ選んでください。",
      "今日の行動は大きくなくてかまいません。返事、確認、整理のどれか一つです。"
    ],
    "結果": [
      "結果は急に完成しません。けれど、今日の小さな選択が後で効いてきます。",
      "最後に残るのは勢いではなく、丁寧に選んだ一手です。雑に終わらせないでください。"
    ]
  };

  const cardOracles = {
    "愚者": ["怖くても一歩は吉。ただし勢いだけの約束は控えなさい。", "自由を言い訳にしないこと。身軽さと無責任は別物です。"],
    "魔術師": ["道具はもう手元にあります。足りないふりは今日で終わりです。", "言葉だけ立派にしないこと。小さな実行が信用を作ります。"],
    "女教皇": ["答えは急に外から来ません。静かな違和感を信じなさい。", "考えすぎは霧を濃くします。本音を一つだけ認めてください。"],
    "女帝": ["育つものに水をやる日です。雑に扱った縁は弱ります。", "優しさの出しすぎに注意。尽くすほど良いとは限りません。"],
    "皇帝": ["線引きが運を守ります。曖昧な優しさは後で揉めます。", "正しさで押し切らないこと。守るべきは支配ではなく土台です。"],
    "教皇": ["ひとりで抱えるより、基本に戻ると道が開きます。", "古い決まりに縛られすぎです。今の自分に合う形を選びなさい。"],
    "恋人": ["迷うなら心が軽くなる方を見なさい。損得だけでは鈍ります。", "試すような言葉は控えなさい。本音は遠回しにすると濁ります。"],
    "戦車": ["進むなら方向を決めなさい。勢いは散らすと弱くなります。", "焦りは敵です。勝ちたいなら一度ハンドルを握り直してください。"],
    "力": ["強く出るより、折れないことが勝ちです。静かな粘りが効きます。", "我慢のしすぎは美徳ではありません。弱音を小さく出してください。"],
    "隠者": ["離れて見ると答えが見えます。騒がしい場所で決めないこと。", "ひとりで結論を閉じないでください。短い確認が灯りになります。"],
    "運命の輪": ["流れが変わる時です。来た波に小さく乗りなさい。", "今は押しても回りません。準備しながらタイミングを待ってください。"],
    "正義": ["事実を見なさい。気分だけで裁くと答えを誤ります。", "決めつけは運を曇らせます。片側だけの話で動かないこと。"],
    "吊るされた男": ["待つことにも意味があります。今は見方を変える時です。", "報われない我慢は切り替えなさい。ただ耐えるだけは凶です。"],
    "死神": ["終わらせる勇気が次を呼びます。古い執着は置いていきなさい。", "終わりを先延ばしにしないこと。手放すほど軽くなります。"],
    "節制": ["少しずつ整えるのが吉。一気に変えようとしないこと。", "生活と心の乱れが答えを鈍らせます。まずペースを戻してください。"],
    "悪魔": ["欲に引っ張られています。甘い誘いほど一度止まりなさい。", "離れれば見えます。依存していたものを少し薄めてください。"],
    "塔": ["壊れるものは合図です。古い前提にしがみつかないこと。", "見ないふりは長引きます。小さいうちに直すのが吉です。"],
    "星": ["希望はあります。ただし願うだけでなく整えること。", "理想を遠くに置きすぎです。今日安心できる一歩を選んでください。"],
    "月": ["不安を敵にしないこと。正体を書けば半分は薄れます。", "霧は晴れ始めています。想像ではなく事実を確認してください。"],
    "太陽": ["素直さが吉。難しく考えるほど光を逃します。", "元気なふりは控えなさい。小さく明るくなる選択で十分です。"],
    "審判": ["やり直しの合図です。過去の保留を一つ起こしてください。", "返事を先延ばしにしないこと。呼ばれている課題があります。"],
    "世界": ["一段落の時です。終えたものを認めて次へ進みなさい。", "あと一歩を雑にしないこと。仕上げが運を決めます。"]
  };

  function cardOracle(card, orientation) {
    const lines = cardOracles[card.name] || ["今の流れをよく見なさい。答えは小さな行動に出ます。", "焦りは禁物です。まず足元を整えてください。"];
    return orientation === "逆位置" ? lines[1] : lines[0];
  }

  function cardSolution(card, position, orientation, focus, index) {
    const choices = positionSolutions[position] || positionSolutions["今の答え"];
    const base = choices[index % choices.length];
    const tail = orientation === "逆位置"
      ? "無理に進めず、引っかかりを一つ外してから動いてください。"
      : "流れはあります。今日できる形に小さく落とし込んでください。";
    return `${base}${focus.label !== "今日のテーマ" ? ` ${focus.label}では、` : " "}${tail}`;
  }

  function drawCards(seed, positions, focus) {
    const deck = [...majorDeck];
    return positions.map((position, index) => {
      const cardIndex = hashText(`${seed}|${position}|${index}|major`) % deck.length;
      const [card] = deck.splice(cardIndex, 1);
      const orientation = hashText(`${seed}|${position}|${card.name}|orientation`) % 100 < 42 ? "逆位置" : "正位置";
      const reading = orientation === "逆位置" ? card.reversed : card.upright;
      return {
        ...card,
        position,
        orientation,
        meaning: reading.meaning,
        advice: reading.advice,
        oracle: cardOracle(card, orientation),
        solution: cardSolution(card, position, orientation, focus, index),
        art: artForCard(card)
      };
    });
  }

  function buildReading(plan) {
    const question = normalizedQuestion();
    const focus = questionFocus(question);
    const name = nameInput?.value.trim() || savedProfileName() || "ゲスト";
    const positions = planPositions[plan] || planPositions.one;
    const seed = hashText(`${todayKey()}|${name}|${plan}|${question}|major-tarot`);
    const cards = drawCards(seed, positions, focus);
    return {
      plan,
      question,
      focus,
      cards,
      title: question ? `${focus.label}に${cards.length}枚のカードが出ました。` : `${cards.length}枚のカードが出ました。`,
      copy: question ? `「${question}」について、カードごとに今できる解決案を整理します。${focus.action}` : planCopies[plan]
    };
  }

  function renderPlaceholder(plan) {
    const positions = planPositions[plan] || planPositions.one;
    tarotSpread.innerHTML = positions.map((position) => `
      <div class="tarot-card-preview tarot-print-card is-empty">
        <div class="tarot-card-number">?</div>
        <div class="tarot-engraving" aria-hidden="true">
          <span class="tarot-ornament top">☾</span>
          <span class="tarot-main-glyph">✦</span>
          <span class="tarot-ornament left">✧</span>
          <span class="tarot-ornament right">✧</span>
          <span class="tarot-ground">◆</span>
        </div>
        <small>${position}</small>
      </div>
    `).join("");
    tarotReadingList.innerHTML = "";
  }

  function renderReading(reading) {
    tarotSpread.innerHTML = reading.cards.map((card) => `
      <div class="tarot-card-preview tarot-print-card is-${card.art.tone} ${card.orientation === "逆位置" ? "is-reversed" : ""}">
        <div class="tarot-card-number">${card.art.number}</div>
        <div class="tarot-engraving" aria-hidden="true">
          <span class="tarot-ornament top">${card.art.left}</span>
          <span class="tarot-main-glyph">${card.art.main}</span>
          <span class="tarot-ornament left">${card.art.left}</span>
          <span class="tarot-ornament right">${card.art.right}</span>
          <span class="tarot-ground">${card.art.ground}</span>
        </div>
        <strong>${card.name}</strong>
        <em>${card.orientation}</em>
        <small>${card.position}</small>
      </div>
    `).join("");

    tarotReadingList.innerHTML = reading.cards.map((card) => `
      <section class="tarot-reading-card">
        <div class="tarot-reading-head">
          <div class="tarot-reading-seal is-${card.art.tone}" aria-hidden="true">
            <span>${card.art.main}</span>
          </div>
          <div>
            <span>${card.position} / ${card.orientation}</span>
            <h3>${card.name}</h3>
          </div>
        </div>
        <p><strong>お告げ:</strong> ${card.oracle}</p>
        <p><strong>意味:</strong> ${card.meaning}</p>
        <p><strong>助言:</strong> ${card.advice}</p>
        <p><strong>解決案:</strong> ${card.solution}</p>
      </section>
    `).join("");
  }

  function selectPlan(plan) {
    selectedPlan = plan;
    if (tarotPlanLabel) tarotPlanLabel.textContent = planNames[plan] || planNames.one;
    if (tarotResultTitle) tarotResultTitle.textContent = "聞きたいテーマを心に浮かべてください。";
    if (tarotResultCopy) tarotResultCopy.textContent = "大アルカナと正位置・逆位置で、今の流れを読みます。";
    renderPlaceholder(plan);
    tarotOptions.forEach((option) => {
      const isSelected = option.dataset.plan === plan;
      option.classList.toggle("is-selected", isSelected);
      if (isSelected) option.setAttribute("aria-current", "true");
      else option.removeAttribute("aria-current");
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

  if (!document.querySelector("#majorTarotPatchStyles")) {
    const style = document.createElement("style");
    style.id = "majorTarotPatchStyles";
    style.textContent = `
      .tarot-question{display:flex!important;flex-direction:column!important;gap:8px!important}.tarot-question textarea{box-sizing:border-box!important;width:100%!important;min-height:96px!important}.tarot-stage{grid-template-columns:minmax(320px,.86fr) minmax(0,1fr)!important;align-items:center!important;background:linear-gradient(135deg,rgba(255,253,247,.92),rgba(248,242,255,.7))!important;border-color:rgba(127,93,146,.24)!important}.tarot-spread{grid-template-columns:repeat(auto-fit,minmax(104px,124px))!important;justify-content:start!important;align-items:start!important;gap:12px!important}.tarot-card-preview{box-sizing:border-box;width:100%;min-height:168px}.tarot-print-card{position:relative;overflow:hidden;display:grid!important;grid-template-rows:auto 1fr auto auto auto;align-items:center;justify-items:center;gap:5px;aspect-ratio:2/3;border:1px solid rgba(68,52,45,.72)!important;border-radius:8px!important;background:linear-gradient(180deg,#fffaf0 0%,#eee1c7 100%)!important;box-shadow:0 16px 32px rgba(61,42,86,.16), inset 0 0 0 4px rgba(151,111,39,.18), inset 0 0 0 7px rgba(255,252,241,.72)!important;color:#372922!important;padding:8px 8px 9px!important}.tarot-print-card::before{content:"";position:absolute;inset:9px;border:1px solid rgba(151,111,39,.5);border-radius:5px;pointer-events:none}.tarot-print-card::after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 68% 26%,rgba(124,83,164,.14),transparent 24%),repeating-linear-gradient(90deg,rgba(62,43,31,.04) 0 1px,transparent 1px 5px);mix-blend-mode:multiply;pointer-events:none}.tarot-card-number{z-index:1;display:grid;place-items:center;min-width:30px;height:22px;padding:0 8px;border:1px solid rgba(151,111,39,.58);border-radius:999px;background:#fff7e5;color:#3b2a22;font-family:Georgia,'Times New Roman',serif;font-size:.72rem;font-weight:800;line-height:1}.tarot-engraving{z-index:1;position:relative;width:100%;min-height:82px;display:grid;place-items:center;border-block:1px solid rgba(151,111,39,.2);margin:1px 0 2px}.tarot-engraving::before{content:"";position:absolute;width:58px;height:58px;border:1px solid rgba(55,41,34,.32);border-radius:50%;background:radial-gradient(circle,rgba(217,164,65,.22),transparent 58%)}.tarot-engraving::after{content:"";position:absolute;bottom:8px;width:74%;height:1px;background:linear-gradient(90deg,transparent,rgba(55,41,34,.48),transparent)}.tarot-main-glyph{z-index:2;color:#2f261f!important;font-family:Georgia,'Yu Mincho','Hiragino Mincho ProN',serif;font-size:clamp(1.8rem,4.9vw,2.42rem)!important;font-weight:900!important;line-height:1!important;text-shadow:0 1px 0 rgba(255,255,255,.65)}.tarot-ornament,.tarot-ground{z-index:2;position:absolute;color:#8f6629!important;font-family:Georgia,'Yu Mincho','Hiragino Mincho ProN',serif;font-size:.72rem!important;font-weight:800!important;line-height:1!important}.tarot-ornament.top{top:2px;left:50%;transform:translateX(-50%);color:#6b4a89!important}.tarot-ornament.left{left:8px;bottom:16px}.tarot-ornament.right{right:8px;bottom:16px}.tarot-ground{bottom:2px;left:50%;transform:translateX(-50%);font-size:.64rem!important}.tarot-print-card strong{z-index:1;max-width:100%;color:#372922!important;font-family:Georgia,'Yu Mincho','Hiragino Mincho ProN',serif;font-size:.78rem!important;font-weight:900!important;line-height:1.12!important;overflow-wrap:anywhere;text-align:center;letter-spacing:0}.tarot-print-card em{z-index:1;display:block;color:#6b4a89!important;font-style:normal;font-size:.64rem!important;font-weight:900;letter-spacing:0;line-height:1}.tarot-print-card small{z-index:1;color:#6f5a4d!important;font-size:.66rem!important;font-weight:900;line-height:1.1;text-align:center}.tarot-print-card.is-reversed .tarot-engraving{transform:rotate(180deg)}.tarot-print-card.is-reversed{background:linear-gradient(180deg,#f4ecff 0%,#e6d5f4 100%)!important;border-color:rgba(94,58,129,.55)!important}.tarot-print-card.is-rebirth .tarot-ornament.top,.tarot-print-card.is-rebirth .tarot-ornament.right{color:#74538f!important}.tarot-print-card.is-shadow{background:linear-gradient(180deg,#f5efe3 0%,#dfd0bd 100%)!important}.tarot-print-card.is-dawn .tarot-main-glyph,.tarot-print-card.is-gold .tarot-main-glyph{color:#4a3218!important}.tarot-print-card.is-empty{opacity:.86;background:linear-gradient(180deg,#fffaf0 0%,#eadcc8 100%)!important}.tarot-reading-head{display:grid;grid-template-columns:auto minmax(0,1fr);gap:10px;align-items:center;margin-bottom:8px}.tarot-reading-seal{width:42px;height:42px;display:grid;place-items:center;border:1px solid rgba(151,111,39,.5);border-radius:50%;background:radial-gradient(circle,rgba(217,164,65,.2),rgba(255,250,240,.94));box-shadow:inset 0 0 0 4px rgba(151,111,39,.1)}.tarot-reading-seal span{color:#372922!important;font-family:Georgia,'Yu Mincho','Hiragino Mincho ProN',serif;font-size:1rem!important;font-weight:900!important;line-height:1}.tarot-reading-card span{overflow-wrap:anywhere}.tarot-reading-card h3{margin:2px 0 0!important}@media(max-width:760px){.tarot-stage{grid-template-columns:1fr!important}.tarot-spread{grid-template-columns:repeat(3,minmax(88px,1fr))!important;justify-content:stretch!important}.tarot-card-preview{min-height:150px}.tarot-print-card strong{font-size:.72rem!important}}@media(max-width:420px){.tarot-spread{grid-template-columns:repeat(2,minmax(0,1fr))!important}.tarot-card-preview{min-height:164px}.tarot-stage{padding:12px!important}.tarot-main-glyph{font-size:2.14rem!important}}
    `;
    document.head.appendChild(style);
  }

  tarotOptions.forEach((option) => {
    option.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      selectPlan(option.dataset.plan);
    }, true);
  });
  tarotDrawButton.addEventListener("click", drawTarot, true);
  selectPlan(selectedPlan);
})();
