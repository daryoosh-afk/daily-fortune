(() => {
  if (document.querySelector("#tarotVisualFixStyles")) return;

  const style = document.createElement("style");
  style.id = "tarotVisualFixStyles";
  style.textContent = `
    .tarot-stage {
      grid-template-columns: minmax(440px, 1fr) minmax(270px, .72fr) !important;
      align-items: center !important;
      background: linear-gradient(135deg, rgba(255, 253, 247, .96), rgba(248, 242, 255, .72)) !important;
      border-color: rgba(127, 93, 146, .24) !important;
    }

    .tarot-spread {
      grid-template-columns: repeat(3, minmax(126px, 148px)) !important;
      justify-content: start !important;
      align-items: start !important;
      gap: 14px !important;
    }

    .tarot-card-preview {
      box-sizing: border-box !important;
      width: 100% !important;
      min-height: 196px !important;
    }

    .tarot-print-card {
      gap: 7px !important;
      border-color: rgba(62, 46, 38, .66) !important;
      background: linear-gradient(180deg, #fffaf0 0%, #eadcc4 100%) !important;
      box-shadow:
        0 18px 34px rgba(61, 42, 86, .16),
        inset 0 0 0 5px rgba(151, 111, 39, .16),
        inset 0 0 0 9px rgba(255, 252, 241, .78) !important;
      padding: 10px !important;
    }

    .tarot-print-card::before {
      inset: 11px !important;
    }

    .tarot-ornament,
    .tarot-ground {
      display: none !important;
    }

    .tarot-engraving {
      min-height: 104px !important;
    }

    .tarot-engraving::before {
      width: 76px !important;
      height: 76px !important;
    }

    .tarot-main-glyph {
      font-size: clamp(2.25rem, 5vw, 3.05rem) !important;
    }

    .tarot-print-card strong {
      font-size: .84rem !important;
    }

    .tarot-print-card em,
    .tarot-print-card small {
      font-size: .68rem !important;
    }

    @media (max-width: 900px) {
      .tarot-stage {
        grid-template-columns: 1fr !important;
      }

      .tarot-spread {
        grid-template-columns: repeat(3, minmax(104px, 1fr)) !important;
        justify-content: stretch !important;
      }

      .tarot-card-preview {
        min-height: 174px !important;
      }
    }

    @media (max-width: 420px) {
      .tarot-spread {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      }

      .tarot-card-preview {
        min-height: 176px !important;
      }

      .tarot-main-glyph {
        font-size: 2.55rem !important;
      }
    }
  `;
  document.head.appendChild(style);
})();
