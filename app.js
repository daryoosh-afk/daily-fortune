const fortunes = {
  general: [
    ["流れが整う日です。", "今日は無理に大きく変えず、身の回りを一つ整えると運気が安定します。"],
    ["小さな決断が追い風になります。", "後回しにしていたことを一つ決めるだけで、気持ちが軽くなります。"],
    ["直感が冴えています。", "最初に浮かんだ選択肢を大切にしつつ、確認だけは丁寧に進めましょう。"],
    ["人とのやり取りに幸運があります。", "短い返信や一言の連絡が、思った以上に良い流れを作ります。"],
    ["今日はペース配分が鍵です。", "急ぎすぎるより、午前と午後で一つずつ終わらせる意識が合っています。"],
    ["一区切りをつける運気です。", "完璧でなくても、終わらせることで次のチャンスが入りやすくなります。"]
  ],
  work: [
    ["集中力が結果に直結します。", "一番大事な作業を先に片付けると、午後の判断がかなり楽になります。"],
    ["削るほど強くなる日です。", "機能や作業を足すより、今あるものを公開できる形に近づけましょう。"],
    ["確認作業に運があります。", "見落としや曖昧な条件を一つ潰すことで、あとから大きな手戻りを防げます。"],
    ["短いアウトプットが効きます。", "長く考えるより、見せられるメモ、画面、リストを一つ作るのが吉です。"],
    ["優先順位の整理が必要です。", "今日やらないことを決めるほど、やるべき作業に力が集まります。"],
    ["見える成果を作る日です。", "内部の作業より、画面・文章・URLなど確認できる成果を優先しましょう。"]
  ],
  love: [
    ["やさしい一言が届きます。", "長い説明より、相手を気にかける短い言葉が関係を温めます。"],
    ["自然体が魅力になる日です。", "背伸びした演出より、いつものあなたらしい反応が良い印象を残します。"],
    ["距離感を整える運気です。", "近づきすぎず離れすぎず、相手のペースを見ることが大切です。"],
    ["約束や予定にツキがあります。", "小さな予定を具体的にすると、関係が前に進みやすくなります。"],
    ["聞く力が好印象を作ります。", "自分の話を急がず、相手の言葉を一つ深く聞いてみましょう。"],
    ["焦らないほど進みます。", "答えを急ぐより、安心できる時間を一つ増やすことが今日の正解です。"]
  ],
  money: [
    ["見直しが金運を上げます。", "小さな支出や契約を一つ確認すると、無駄を減らすヒントが出ます。"],
    ["数字を見るほど強い日です。", "感覚ではなく金額、回数、期限を見て判断すると失敗しにくくなります。"],
    ["小さな収益テストに向いています。", "誰か一人に価格や購入意欲を聞くと、次の打ち手が見えます。"],
    ["守りの判断が吉です。", "今日は勢いで買うより、必要性を一晩置いて考える方が合っています。"],
    ["価値の伝え方が鍵です。", "何を売るかより、相手にどんな得があるかを一文で整理しましょう。"],
    ["比較が助けになります。", "一つの価格で決めず、二つ以上の選択肢を並べると判断が良くなります。"]
  ]
};

const resultFields = {
  general: {
    label: "総合運",
    title: document.querySelector("#generalTitle"),
    copy: document.querySelector("#generalCopy")
  },
  work: {
    label: "仕事運",
    title: document.querySelector("#workTitle"),
    copy: document.querySelector("#workCopy")
  },
  love: {
    label: "恋愛運",
    title: document.querySelector("#loveTitle"),
    copy: document.querySelector("#loveCopy")
  },
  money: {
    label: "金運",
    title: document.querySelector("#moneyTitle"),
    copy: document.querySelector("#moneyCopy")
  }
};

const colors = ["深緑", "金色", "桜色", "白", "藍色", "水色", "若草色", "珊瑚色", "銀色", "すみれ色"];
const actions = ["一件だけ連絡する", "机の上を整える", "10分だけ散歩する", "数字を一つ確認する", "短いメモを書く", "早めに休む", "予定を一つ決める", "不要なものを一つ消す"];
const storageKey = "dailyFortuneDraw";

const form = document.querySelector("#fortuneForm");
const nameInput = document.querySelector("#nameInput");
const drawButton = document.querySelector("#drawButton");
const formNote = document.querySelector("#formNote");
const copyButton = document.querySelector("#copyButton");
const shareButton = document.querySelector("#shareButton");
const countdownText = document.querySelector("#countdownText");
const dateLine = document.querySelector("#dateLine");
const scoreValue = document.querySelector("#scoreValue");
const categoryText = document.querySelector("#categoryText");
const fortuneTitle = document.querySelector("#fortuneTitle");
const fortuneCopy = document.querySelector("#fortuneCopy");
const colorText = document.querySelector("#colorText");
const numberText = document.querySelector("#numberText");
const actionText = document.querySelector("#actionText");

function todayKey() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
}

function displayDate() {
  dateLine.textContent = new Intl.DateTimeFormat("ja-JP", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(new Date());
}

function nextMidnight() {
  const next = new Date();
  next.setHours(24, 0, 0, 0);
  return next;
}

function updateCountdown() {
  const remaining = Math.max(0, nextMidnight().getTime() - Date.now());
  const hours = Math.floor(remaining / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  countdownText.textContent = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  if (remaining === 0) {
    unlockForNewDay();
  }
}

function hashText(text) {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function pick(seed, list, offset = 0) {
  return list[(seed >>> offset) % list.length];
}

function createReading(name) {
  const date = todayKey();
  const normalizedName = name.trim() || "ゲスト";
  const baseSeed = hashText(`${date}|${normalizedName.toLowerCase()}`);
  const results = {};

  Object.keys(fortunes).forEach((key, index) => {
    const seed = hashText(`${date}|${normalizedName.toLowerCase()}|${key}|${index}`);
    const [title, copy] = fortunes[key][seed % fortunes[key].length];
    results[key] = { title, copy };
  });

  return {
    date,
    name: normalizedName,
    score: 64 + (baseSeed % 33),
    color: pick(baseSeed, colors, 7),
    number: 1 + ((baseSeed >>> 4) % 99),
    action: pick(baseSeed, actions, 11),
    results
  };
}

function renderReading(reading) {
  scoreValue.textContent = reading.score;
  categoryText.textContent = `${reading.name}さんの今日の運勢`;
  fortuneTitle.textContent = reading.results.general.title;
  fortuneCopy.textContent = reading.results.general.copy;
  colorText.textContent = reading.color;
  numberText.textContent = reading.number;
  actionText.textContent = reading.action;

  Object.entries(resultFields).forEach(([key, fields]) => {
    fields.title.textContent = reading.results[key].title;
    fields.copy.textContent = reading.results[key].copy;
  });

  nameInput.value = reading.name === "ゲスト" ? "" : reading.name;
}

function lockForToday(reading) {
  nameInput.disabled = true;
  drawButton.disabled = true;
  drawButton.textContent = "今日は占い済み";
  formNote.textContent = "次に占える時間まで、今日の結果を見返せます。";
  copyButton.disabled = false;
  shareButton.disabled = false;
  renderReading(reading);
}

function unlockForNewDay() {
  nameInput.disabled = false;
  drawButton.disabled = false;
  drawButton.textContent = "今日の運勢を見る";
  formNote.textContent = "占えるのは1日1回。結果は明日まで保存されます。";
}

function saveReading(reading) {
  localStorage.setItem(storageKey, JSON.stringify(reading));
}

function loadReading() {
  try {
    const reading = JSON.parse(localStorage.getItem(storageKey));
    if (reading && reading.date === todayKey()) {
      return reading;
    }
  } catch (error) {
    localStorage.removeItem(storageKey);
  }

  return null;
}

function buildShareText() {
  return [
    `【今日の運勢】${categoryText.textContent}`,
    `スコア: ${scoreValue.textContent}`,
    `総合運: ${resultFields.general.title.textContent} ${resultFields.general.copy.textContent}`,
    `仕事運: ${resultFields.work.title.textContent} ${resultFields.work.copy.textContent}`,
    `恋愛運: ${resultFields.love.title.textContent} ${resultFields.love.copy.textContent}`,
    `金運: ${resultFields.money.title.textContent} ${resultFields.money.copy.textContent}`,
    `ラッキーカラー: ${colorText.textContent}`,
    `ラッキーナンバー: ${numberText.textContent}`,
    `今日の行動: ${actionText.textContent}`
  ].join("\n");
}

function setTemporaryButtonText(button, text) {
  const originalText = button.dataset.label || button.textContent;
  button.dataset.label = originalText;
  button.textContent = text;
  window.setTimeout(() => {
    button.textContent = originalText;
  }, 1400);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const existingReading = loadReading();
  if (existingReading) {
    lockForToday(existingReading);
    return;
  }

  const reading = createReading(nameInput.value);
  saveReading(reading);
  lockForToday(reading);
});

copyButton.addEventListener("click", async () => {
  if (!navigator.clipboard) {
    setTemporaryButtonText(copyButton, "コピー不可");
    return;
  }

  try {
    await navigator.clipboard.writeText(buildShareText());
    setTemporaryButtonText(copyButton, "コピー済み");
  } catch (error) {
    setTemporaryButtonText(copyButton, "失敗");
  }
});

shareButton.addEventListener("click", async () => {
  const text = buildShareText();

  if (navigator.share) {
    try {
      await navigator.share({ title: "今日の運勢", text });
      return;
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }
    }
  }

  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
    setTemporaryButtonText(shareButton, "コピー済み");
    return;
  }

  setTemporaryButtonText(shareButton, "未対応");
});

displayDate();
updateCountdown();
window.setInterval(updateCountdown, 1000);

const savedReading = loadReading();
if (savedReading) {
  lockForToday(savedReading);
} else {
  unlockForNewDay();
  copyButton.disabled = true;
  shareButton.disabled = true;
}
