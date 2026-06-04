const fortunes = {
  general: [
    ["心の向きが整う日です。", "今日は少しだけ余白を作ると、いつもの景色の中に小さな安心を見つけやすくなります。"],
    ["ゆっくり進むほど吉です。", "急いで答えを出すより、一つずつ確認することで気持ちが落ち着いていきます。"],
    ["身近なことに運があります。", "大きな変化より、今すぐできる小さな行動が今日の流れをやさしく変えてくれます。"],
    ["自分のペースを守る日です。", "周りと比べすぎず、今の自分にできる一歩を選ぶと運気が安定します。"],
    ["小さな整理が助けになります。", "持ち物、予定、気持ちのどれか一つを整えると、次の行動が見えやすくなります。"],
    ["やさしい選択が合う日です。", "無理を重ねるより、心が少し軽くなる方を選ぶと一日が過ごしやすくなります。"],
    ["見直しに向いています。", "一度立ち止まって確認すると、見落としていた良い点や改善点に気づけそうです。"],
    ["穏やかな変化の兆しです。", "いつも通りの中に少しだけ新しい工夫を入れると、気分が前向きになります。"]
  ],
  mood: [
    ["気持ちに余白が生まれます。", "少し深く息をするだけで、考えすぎていたことがほどけやすくなります。"],
    ["小さな安心を拾える日です。", "完璧な一日を目指すより、ほっとできる瞬間を一つ見つけると気分が整います。"],
    ["やさしい切り替えが合います。", "疲れを感じたら無理に押し切らず、場所や飲み物を変えるだけでも流れが変わります。"],
    ["自分を責めないほど吉です。", "できなかったことより、できたことを一つ数えると心が軽くなります。"],
    ["気分の整理に向いています。", "頭の中で抱えたままにせず、短い言葉にして出すと落ち着きやすくなります。"],
    ["静かな時間が味方です。", "数分だけでも一人で整える時間を作ると、その後の判断がやわらかくなります。"],
    ["前向きさが戻りやすい日です。", "小さな達成感を先に作ると、次の行動へ自然に進みやすくなります。"],
    ["心の温度を上げる日です。", "好きなものに少し触れるだけで、今日の気分がやさしく持ち上がります。"]
  ],
  work: [
    ["一つに絞ると進みます。", "あれもこれも抱えるより、今日いちばん大事な作業を一つ決めると集中しやすくなります。"],
    ["確認が味方になる日です。", "送る前、決める前、進める前に一度見直すことで、小さな不安を減らせます。"],
    ["短いアウトプットが吉です。", "完璧を待つより、メモや下書きでも形にすると次の判断がしやすくなります。"],
    ["頼ることも前進です。", "一人で抱え込まず、必要な確認や相談を短く出すと流れが軽くなります。"],
    ["順番を整える日です。", "作業そのものより、何から進めるかを決めることが今日の効率を上げてくれます。"],
    ["休む時間も仕事運の一部です。", "少し集中が切れたら、短い休憩を入れることで判断力が戻りやすくなります。"],
    ["見える形にすると強い日です。", "頭の中だけで考えず、リストや画面に出すことで進み具合がわかりやすくなります。"],
    ["小さな完了が流れを作ります。", "大きな成果を狙う前に、すぐ終わる一件を片付けると気持ちが乗ってきます。"]
  ],
  love: [
    ["やわらかい言葉が届く日です。", "特別なことを言わなくても、相手を気にかける一言が空気を温かくします。"],
    ["自然体が魅力になります。", "よく見せようと頑張りすぎるより、落ち着いた反応が安心感につながります。"],
    ["聞く姿勢に運があります。", "自分の話を急がず、相手の言葉を一つ受け止めると関係が整いやすくなります。"],
    ["距離感を大切にする日です。", "近づくことだけが正解ではなく、相手と自分のペースを守ることも優しさになります。"],
    ["小さな約束がうれしい流れを作ります。", "大きな予定でなくても、短い連絡や軽い約束が心を近づけてくれます。"],
    ["素直さが好印象です。", "強がるより、わかりやすく気持ちを伝えることで相手も反応しやすくなります。"],
    ["安心できる会話が鍵です。", "結論を急がず、話しやすい雰囲気を作ることが今日の恋愛運を上げてくれます。"],
    ["思いやりが巡る日です。", "自分にも相手にも少しやさしくすると、気持ちのすれ違いを減らせそうです。"]
  ],
  money: [
    ["使う前の一呼吸が吉です。", "欲しい気持ちを否定せず、今必要かだけ確認すると納得しやすい選択ができます。"],
    ["小さな見直しに運があります。", "大きな節約でなくても、ひとつの支出を確認するだけでお金の流れが見えやすくなります。"],
    ["数字を見ると安心できます。", "なんとなく不安な時ほど、金額や期限を一つ確認すると気持ちが落ち着きます。"],
    ["価値を考える日です。", "安いか高いかだけでなく、自分にとって本当に役に立つかを見ると判断しやすくなります。"],
    ["未来の自分にやさしい選択を。", "少し先の予定や出費を思い出しておくと、今日の使い方が整いやすくなります。"],
    ["無理のない管理が合っています。", "細かく完璧に管理するより、まず一つだけ把握することが金運を安定させます。"],
    ["比較すると見えてきます。", "一つだけで決めず、別の選択肢も並べると納得できる答えに近づきます。"],
    ["小さな準備が助けになります。", "必要なもの、欲しいもの、後で考えるものを分けるだけで無駄を減らせそうです。"]
  ]
};

const resultFields = {
  mood: {
    label: "気分運",
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

const colors = ["ラベンダー", "月白", "ローズピンク", "星の金色", "ミルキーパープル", "淡い水色", "すみれ色", "シャンパン", "クリーム", "夜空の紺"];
const actions = ["深呼吸してから始める", "一つだけ片付ける", "短いメモを書く", "好きな飲み物を選ぶ", "予定を一つ確認する", "早めに休む", "やさしい言葉を選ぶ", "小さなごほうびを用意する"];
const storageKey = "dailyFortuneDraw";
const streakKey = "dailyFortuneStreak";
const shareUrl = "https://daryoosh-afk.github.io/daily-fortune/";

const form = document.querySelector("#fortuneForm");
const nameInput = document.querySelector("#nameInput");
const drawButton = document.querySelector("#drawButton");
const formNote = document.querySelector("#formNote");
const shareButton = document.querySelector("#shareButton");
const countdownLabel = document.querySelector("#countdownLabel");
const countdownText = document.querySelector("#countdownText");
const fortuneCard = document.querySelector(".fortune-card");
const dateLine = document.querySelector("#dateLine");
const streakCount = document.querySelector("#streakCount");
const streakMessage = document.querySelector("#streakMessage");
const upgradeHint = document.querySelector("#upgradeHint");
const returnNudge = document.querySelector("#returnNudge");
const scoreValue = document.querySelector("#scoreValue");
const categoryText = document.querySelector("#categoryText");
const fortuneTitle = document.querySelector("#fortuneTitle");
const fortuneCopy = document.querySelector("#fortuneCopy");
const colorText = document.querySelector("#colorText");
const numberText = document.querySelector("#numberText");
const actionText = document.querySelector("#actionText");

let isLockedForToday = false;

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

function dateFromKey(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function daysBetween(previousDate, currentDate) {
  const dayLength = 86400000;
  return Math.round((dateFromKey(currentDate).getTime() - dateFromKey(previousDate).getTime()) / dayLength);
}

function updateCountdown() {
  if (!isLockedForToday) {
    return;
  }

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

function loadStreak() {
  try {
    const streak = JSON.parse(localStorage.getItem(streakKey));
    if (streak && Number.isInteger(streak.count) && streak.lastDate) {
      return streak;
    }
  } catch (error) {
    localStorage.removeItem(streakKey);
  }

  return { count: 0, lastDate: "" };
}

function updateStreakForDraw(date) {
  const streak = loadStreak();
  let count = 1;

  if (streak.lastDate === date) {
    count = streak.count;
  } else if (streak.lastDate && daysBetween(streak.lastDate, date) === 1) {
    count = streak.count + 1;
  }

  const nextStreak = { count, lastDate: date };
  localStorage.setItem(streakKey, JSON.stringify(nextStreak));
  return nextStreak;
}

function streakTier(count) {
  if (count >= 30) {
    return "legend";
  }

  if (count >= 14) {
    return "moon";
  }

  if (count >= 7) {
    return "gold";
  }

  if (count >= 3) {
    return "glow";
  }

  return "seed";
}

function streakCopy(count) {
  if (count >= 30) {
    return "30日連続。特別な星のカードが開きました。";
  }

  if (count >= 14) {
    return "14日連続。月明かりのカードに育っています。";
  }

  if (count >= 7) {
    return "7日連続。カードに金色の縁がつきました。";
  }

  if (count >= 3) {
    return "3日連続。星が少し強く輝き始めました。";
  }

  if (count >= 1) {
    return "明日の星も待っています。";
  }

  return "星を集めると、カードが少しずつ輝きます。";
}

function nextUpgradeInfo(count) {
  const milestones = [
    { count: 3, tier: "glow", label: "星が少し強く輝きます" },
    { count: 7, tier: "gold", label: "カードに金色の縁がつきます" },
    { count: 14, tier: "moon", label: "月明かりのカードに育ちます" },
    { count: 30, tier: "legend", label: "特別な星のカードが開きます" }
  ];
  const nextMilestone = milestones.find((milestone) => count < milestone.count);

  if (!nextMilestone) {
    return {
      copy: "最高ランクのカードです。明日の星も重ねましょう。",
      tier: "legend"
    };
  }

  const daysLeft = nextMilestone.count - count;
  return {
    copy: `あと${daysLeft}日で${nextMilestone.label}。`,
    tier: nextMilestone.tier
  };
}

function nextUpgradeCopy(count) {
  return nextUpgradeInfo(count).copy;
}

function renderStreak(count) {
  const tier = streakTier(count);
  const nextUpgrade = nextUpgradeInfo(count);
  streakCount.textContent = count;
  streakMessage.textContent = streakCopy(count);
  upgradeHint.textContent = nextUpgrade.copy;
  fortuneCard.dataset.streakTier = tier;
  fortuneCard.dataset.nextTier = nextUpgrade.tier;
}

function renderReturnNudge(count) {
  returnNudge.hidden = false;

  if (count >= 30) {
    returnNudge.textContent = "今日の星を重ねました。明日も開くと特別なカードが続きます。";
    return;
  }

  returnNudge.textContent = "今日の星を受け取りました。明日も開くとカードが育ちます。";
}

function renderEmptyState() {
  fortuneCard.dataset.cardState = "empty";
  scoreValue.textContent = "★";
  categoryText.textContent = "今日の星";
  fortuneTitle.textContent = "今日の星をひらきましょう。";
  fortuneCopy.textContent = "名前を入れて、今の気分に合う運勢を受け取りましょう。";
  returnNudge.hidden = true;
  returnNudge.textContent = "";
  colorText.textContent = "占うと表示";
  numberText.textContent = "占うと表示";
  actionText.textContent = "占うと表示";

  Object.values(resultFields).forEach((fields) => {
    fields.title.textContent = "未鑑定";
    fields.copy.textContent = "カードを開くと表示されます。";
  });
}

function createReading(name) {
  const date = todayKey();
  const normalizedName = name.trim() || "ゲスト";
  const baseSeed = hashText(`${date}|${normalizedName.toLowerCase()}`);
  const results = {};
  const streak = updateStreakForDraw(date);

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
    streak: streak.count,
    results
  };
}

function renderReading(reading) {
  renderStreak(reading.streak || loadStreak().count);
  renderReturnNudge(reading.streak || loadStreak().count);
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
  isLockedForToday = true;
  fortuneCard.dataset.cardState = "reading";
  countdownLabel.textContent = "次の占い";
  nameInput.disabled = true;
  drawButton.disabled = true;
  drawButton.textContent = "明日の星を待つ";
  formNote.textContent = "今日の星は受け取り済み。明日も開くとカードが育ちます。";
  shareButton.disabled = false;
  renderReading(reading);
  updateCountdown();
}

function unlockForNewDay() {
  isLockedForToday = false;
  countdownLabel.textContent = "今日の運勢";
  countdownText.textContent = "確かめましょう";
  nameInput.disabled = false;
  drawButton.disabled = false;
  drawButton.textContent = "今日の運勢を見る";
  formNote.textContent = "占えるのは1日1回。結果は明日まで保存されます。";
  shareButton.disabled = true;
  renderEmptyState();
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

    if (reading) {
      localStorage.removeItem(storageKey);
    }
  } catch (error) {
    localStorage.removeItem(storageKey);
  }

  return null;
}

function buildShareText() {
  return [
    "今日の運勢を占いました",
    `スコア: ${scoreValue.textContent}`,
    `連続占い: ${streakCount.textContent}日`,
    `今日のひとこと: ${fortuneTitle.textContent}`,
    `今日の行動: ${actionText.textContent}`,
    "",
    shareUrl
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

  setTemporaryButtonText(shareButton, "共有未対応");
});

displayDate();
renderStreak(loadStreak().count);
updateCountdown();
window.setInterval(updateCountdown, 1000);

const savedReading = loadReading();
if (savedReading) {
  lockForToday(savedReading);
} else {
  unlockForNewDay();
}
