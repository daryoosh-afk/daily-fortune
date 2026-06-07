(() => {
  if (document.querySelector("#dailyFortuneMotionStyles")) return;

  const style = document.createElement("style");
  style.id = "dailyFortuneMotionStyles";
  style.textContent = `
    @keyframes softFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
    @keyframes cardOpen{0%{transform:translateY(10px) scale(.985);filter:brightness(.98)}55%{transform:translateY(-6px) scale(1.012);filter:brightness(1.03)}100%{transform:translateY(0) scale(1);filter:brightness(1)}}
    @keyframes scorePop{0%{transform:scale(.82) rotate(-5deg);opacity:.36}64%{transform:scale(1.08) rotate(2deg);opacity:1}100%{transform:scale(1) rotate(0);opacity:1}}
    @keyframes starPulse{0%{transform:scale(1)}48%{transform:scale(1.14) rotate(4deg)}100%{transform:scale(1)}}
    @keyframes riseIn{0%{transform:translateY(12px);opacity:0}100%{transform:translateY(0);opacity:1}}
    @keyframes sparkleDrift{0%{transform:translate3d(0,12px,0) scale(.65);opacity:0}18%{opacity:1}100%{transform:translate3d(var(--spark-x),var(--spark-y),0) scale(1);opacity:0}}
    @keyframes tarotDeal{0%{transform:translateY(18px) rotateY(72deg) scale(.92);opacity:0}62%{transform:translateY(-3px) rotateY(-8deg) scale(1.02);opacity:1}100%{transform:translateY(0) rotateY(0) scale(1);opacity:1}}
    @keyframes navTap{0%{transform:translateY(0) scale(1)}50%{transform:translateY(1px) scale(.96)}100%{transform:translateY(0) scale(1)}}
    .fortune-card[data-card-state="empty"] .score-ring{animation:softFloat 4.8s ease-in-out infinite}.fortune-card.is-opening{animation:cardOpen 760ms cubic-bezier(.2,.8,.2,1)}.fortune-card.is-opening .score-ring{animation:scorePop 720ms cubic-bezier(.2,.9,.2,1)}.fortune-card.is-opening .star-streak{animation:starPulse 820ms ease}.fortune-card.is-opening .result-card,.fortune-card.is-opening .detail-grid div{animation:riseIn 520ms ease both}.fortune-card.is-opening .result-card:nth-child(1){animation-delay:80ms}.fortune-card.is-opening .result-card:nth-child(2){animation-delay:140ms}.fortune-card.is-opening .result-card:nth-child(3){animation-delay:200ms}.fortune-card.is-opening .result-card:nth-child(4){animation-delay:260ms}.fortune-card.is-opening .detail-grid div:nth-child(1){animation-delay:120ms}.fortune-card.is-opening .detail-grid div:nth-child(2){animation-delay:180ms}.fortune-card.is-opening .detail-grid div:nth-child(3){animation-delay:240ms}
    .fortune-sparkle{position:absolute;z-index:3;left:var(--spark-left);top:var(--spark-top);width:7px;height:7px;border-radius:999px;background:radial-gradient(circle,#fff7d6 0 24%,var(--gold) 25% 58%,transparent 62%);box-shadow:0 0 14px rgba(217,164,65,.58);pointer-events:none;animation:sparkleDrift 900ms ease-out forwards}
    .tarot-stage.is-dealing .tarot-card-preview{transform-origin:center;animation:tarotDeal 620ms cubic-bezier(.2,.8,.2,1) both}.tarot-stage.is-dealing .tarot-card-preview:nth-child(1){animation-delay:0ms}.tarot-stage.is-dealing .tarot-card-preview:nth-child(2){animation-delay:90ms}.tarot-stage.is-dealing .tarot-card-preview:nth-child(3){animation-delay:180ms}.tarot-stage.is-dealing .tarot-card-preview:nth-child(4){animation-delay:270ms}.tarot-stage.is-dealing .tarot-card-preview:nth-child(5){animation-delay:360ms}.tarot-stage.is-dealing .tarot-card-preview:nth-child(6){animation-delay:450ms}.tarot-reading-list.is-revealing .tarot-reading-card{animation:riseIn 560ms ease both}.tarot-reading-list.is-revealing .tarot-reading-card:nth-child(1){animation-delay:120ms}.tarot-reading-list.is-revealing .tarot-reading-card:nth-child(2){animation-delay:180ms}.tarot-reading-list.is-revealing .tarot-reading-card:nth-child(3){animation-delay:240ms}.tarot-reading-list.is-revealing .tarot-reading-card:nth-child(4){animation-delay:300ms}.tarot-reading-list.is-revealing .tarot-reading-card:nth-child(5){animation-delay:360ms}.tarot-reading-list.is-revealing .tarot-reading-card:nth-child(6){animation-delay:420ms}.nav-button.is-tapping{animation:navTap 220ms ease}
    @media (prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:1ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important;transition-duration:1ms!important}}
  `;
  document.head.appendChild(style);

  function restartAnimation(element, className, duration = 900) {
    if (!element) return;
    element.classList.remove(className);
    void element.offsetWidth;
    element.classList.add(className);
    window.setTimeout(() => element.classList.remove(className), duration);
  }

  function createFortuneSparkles() {
    const fortuneCard = document.querySelector(".fortune-card");
    if (!fortuneCard) return;
    [[18,24,-24,-38],[76,18,28,-42],[88,52,34,-18],[24,72,-30,22],[58,78,18,28],[42,36,-12,-34],[68,42,24,-26],[34,58,-24,18]].forEach(([left, top, x, y], index) => {
      const sparkle = document.createElement("span");
      sparkle.className = "fortune-sparkle";
      sparkle.style.setProperty("--spark-left", `${left}%`);
      sparkle.style.setProperty("--spark-top", `${top}%`);
      sparkle.style.setProperty("--spark-x", `${x}px`);
      sparkle.style.setProperty("--spark-y", `${y}px`);
      sparkle.style.animationDelay = `${index * 45}ms`;
      fortuneCard.appendChild(sparkle);
      window.setTimeout(() => sparkle.remove(), 1200 + index * 45);
    });
  }

  function playDailyDrawAnimation() {
    const fortuneCard = document.querySelector(".fortune-card");
    restartAnimation(fortuneCard, "is-opening", 950);
    createFortuneSparkles();
  }

  function playTarotDrawAnimation() {
    const tarotSpread = document.querySelector("#tarotSpread");
    const tarotReadingList = document.querySelector("#tarotReadingList");
    restartAnimation(tarotSpread?.closest(".tarot-stage"), "is-dealing", 1150);
    restartAnimation(tarotReadingList, "is-revealing", 1100);
  }

  document.querySelector("#fortuneForm")?.addEventListener("submit", () => {
    window.setTimeout(playDailyDrawAnimation, 0);
  });

  document.querySelector("#tarotDrawButton")?.addEventListener("click", () => {
    window.setTimeout(playTarotDrawAnimation, 0);
  });

  document.querySelectorAll(".nav-button").forEach((button) => {
    button.addEventListener("click", () => restartAnimation(button, "is-tapping", 260));
  });
})();