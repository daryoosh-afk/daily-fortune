(() => {
  if (document.querySelector("#dailyFortuneMotionStyles")) return;

  const style = document.createElement("style");
  style.id = "dailyFortuneMotionStyles";
  style.textContent = `
    @keyframes softFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
    @keyframes cardOpen{0%{transform:translateY(12px) scale(.98);filter:brightness(.96)}52%{transform:translateY(-8px) scale(1.018);filter:brightness(1.06)}100%{transform:translateY(0) scale(1);filter:brightness(1)}}
    @keyframes scorePop{0%{transform:scale(.78) rotate(-6deg);opacity:.34}64%{transform:scale(1.12) rotate(2deg);opacity:1}100%{transform:scale(1) rotate(0);opacity:1}}
    @keyframes starPulse{0%{transform:scale(1)}48%{transform:scale(1.18) rotate(5deg)}100%{transform:scale(1)}}
    @keyframes starBreath{0%,100%{transform:scale(1) rotate(0deg);filter:drop-shadow(0 12px 18px rgba(217,164,65,.28))}50%{transform:scale(1.07) rotate(2deg);filter:drop-shadow(0 0 18px rgba(217,164,65,.56)) drop-shadow(0 12px 18px rgba(122,61,184,.16))}}
    @keyframes riseIn{0%{transform:translateY(12px);opacity:0}100%{transform:translateY(0);opacity:1}}
    @keyframes viewRise{0%{transform:translateY(16px);opacity:0}100%{transform:translateY(0);opacity:1}}
    @keyframes auraSweep{0%{transform:translateX(-120%) rotate(10deg);opacity:0}18%{opacity:.58}64%{opacity:.32}100%{transform:translateX(150%) rotate(10deg);opacity:0}}
    @keyframes sparkleDrift{0%{transform:translate3d(0,12px,0) scale(.65);opacity:0}18%{opacity:1}100%{transform:translate3d(var(--spark-x),var(--spark-y),0) scale(1);opacity:0}}
    @keyframes tarotDeal{0%{transform:translateY(18px) rotateY(72deg) scale(.92);opacity:0}62%{transform:translateY(-3px) rotateY(-8deg) scale(1.02);opacity:1}100%{transform:translateY(0) rotateY(0) scale(1);opacity:1}}
    @keyframes navTap{0%{transform:translateY(0) scale(1)}50%{transform:translateY(1px) scale(.96)}100%{transform:translateY(0) scale(1)}}
    @keyframes navGlow{0%,100%{box-shadow:0 10px 22px rgba(217,164,65,.18),inset 0 0 0 1px rgba(255,255,255,.66)}50%{box-shadow:0 14px 28px rgba(217,164,65,.30),0 0 18px rgba(122,61,184,.16),inset 0 0 0 1px rgba(255,255,255,.76)}}
    @keyframes choiceGlow{0%,100%{box-shadow:inset 0 1px 0 rgba(255,255,255,.78)}50%{box-shadow:0 12px 26px rgba(217,164,65,.18),inset 0 1px 0 rgba(255,255,255,.86)}}
    .app-view:not([hidden]) .topbar,.app-view:not([hidden]) .control-panel,.app-view:not([hidden]) .fortune-card,.app-view:not([hidden]) .feature-panel{animation:viewRise 520ms ease both}.app-view:not([hidden]) .control-panel,.app-view:not([hidden]) .feature-panel{animation-delay:80ms}.app-view:not([hidden]) .fortune-card{animation-delay:130ms}
    .fortune-card{position:relative}.fortune-card::before{animation:auraSweep 5.8s ease-in-out infinite}.fortune-card[data-card-state="empty"] .score-ring{animation:softFloat 4.8s ease-in-out infinite}.star-streak{animation:starBreath 4.4s ease-in-out infinite}.tarot-option.is-selected{animation:choiceGlow 3.2s ease-in-out infinite}
    .fortune-card.is-opening{animation:cardOpen 820ms cubic-bezier(.2,.8,.2,1)}.fortune-card.is-opening .score-ring{animation:scorePop 760ms cubic-bezier(.2,.9,.2,1)}.fortune-card.is-opening .star-streak{animation:starPulse 860ms ease}.fortune-card.is-opening .result-card,.fortune-card.is-opening .detail-grid div{animation:riseIn 560ms ease both}.fortune-card.is-opening .result-card:nth-child(1){animation-delay:80ms}.fortune-card.is-opening .result-card:nth-child(2){animation-delay:140ms}.fortune-card.is-opening .result-card:nth-child(3){animation-delay:200ms}.fortune-card.is-opening .result-card:nth-child(4){animation-delay:260ms}.fortune-card.is-opening .detail-grid div:nth-child(1){animation-delay:120ms}.fortune-card.is-opening .detail-grid div:nth-child(2){animation-delay:180ms}.fortune-card.is-opening .detail-grid div:nth-child(3){animation-delay:240ms}
    .fortune-sparkle{position:absolute;z-index:3;left:var(--spark-left);top:var(--spark-top);width:8px;height:8px;border-radius:999px;background:radial-gradient(circle,#fff7d6 0 24%,var(--gold) 25% 58%,transparent 62%);box-shadow:0 0 16px rgba(217,164,65,.66);pointer-events:none;animation:sparkleDrift 1050ms ease-out forwards}
    .tarot-stage.is-dealing .tarot-card-preview{transform-origin:center;animation:tarotDeal 680ms cubic-bezier(.2,.8,.2,1) both}.tarot-stage.is-dealing .tarot-card-preview:nth-child(1){animation-delay:0ms}.tarot-stage.is-dealing .tarot-card-preview:nth-child(2){animation-delay:90ms}.tarot-stage.is-dealing .tarot-card-preview:nth-child(3){animation-delay:180ms}.tarot-stage.is-dealing .tarot-card-preview:nth-child(4){animation-delay:270ms}.tarot-stage.is-dealing .tarot-card-preview:nth-child(5){animation-delay:360ms}.tarot-stage.is-dealing .tarot-card-preview:nth-child(6){animation-delay:450ms}.tarot-reading-list.is-revealing .tarot-reading-card{animation:riseIn 560ms ease both}.tarot-reading-list.is-revealing .tarot-reading-card:nth-child(1){animation-delay:120ms}.tarot-reading-list.is-revealing .tarot-reading-card:nth-child(2){animation-delay:180ms}.tarot-reading-list.is-revealing .tarot-reading-card:nth-child(3){animation-delay:240ms}.tarot-reading-list.is-revealing .tarot-reading-card:nth-child(4){animation-delay:300ms}.tarot-reading-list.is-revealing .tarot-reading-card:nth-child(5){animation-delay:360ms}.tarot-reading-list.is-revealing .tarot-reading-card:nth-child(6){animation-delay:420ms}.nav-button.is-tapping{animation:navTap 220ms ease}.nav-button.is-active{animation:navGlow 2.8s ease-in-out infinite}
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
    [[18,24,-30,-42],[76,18,34,-46],[88,52,40,-20],[24,72,-34,24],[58,78,22,32],[42,36,-16,-38],[68,42,30,-30],[34,58,-28,22],[52,18,6,-48],[82,78,24,22]].forEach(([left, top, x, y], index) => {
      const sparkle = document.createElement("span");
      sparkle.className = "fortune-sparkle";
      sparkle.style.setProperty("--spark-left", `${left}%`);
      sparkle.style.setProperty("--spark-top", `${top}%`);
      sparkle.style.setProperty("--spark-x", `${x}px`);
      sparkle.style.setProperty("--spark-y", `${y}px`);
      sparkle.style.animationDelay = `${index * 42}ms`;
      fortuneCard.appendChild(sparkle);
      window.setTimeout(() => sparkle.remove(), 1300 + index * 42);
    });
  }

  function playDailyDrawAnimation() {
    const fortuneCard = document.querySelector(".fortune-card");
    restartAnimation(fortuneCard, "is-opening", 1000);
    createFortuneSparkles();
  }

  function playTarotDrawAnimation() {
    const tarotSpread = document.querySelector("#tarotSpread");
    const tarotReadingList = document.querySelector("#tarotReadingList");
    restartAnimation(tarotSpread?.closest(".tarot-stage"), "is-dealing", 1250);
    restartAnimation(tarotReadingList, "is-revealing", 1200);
  }

  document.querySelector("#fortuneForm")?.addEventListener("submit", () => window.setTimeout(playDailyDrawAnimation, 0));
  document.querySelector("#tarotDrawButton")?.addEventListener("click", () => window.setTimeout(playTarotDrawAnimation, 0));
  document.querySelectorAll(".nav-button").forEach((button) => button.addEventListener("click", () => restartAnimation(button, "is-tapping", 260)));
})();