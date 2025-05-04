const runes = [
  ["◎", "◉", "◯", "◍", "◐", "◒", "◕", "◓"], // voz (◉)
  ["⬘", "⬗", "➤", "➲", "◔", "◑", "◕", "◒"], // surge (⬗)
  ["∇", "▽", "▼", "▿", "◑", "◕", "◐", "◒"], // som (▽)
  ["◐", "◓", "◒", "◖", "◎", "◍", "◉", "◯"], // lembrança (◒)
  ["◒", "◐", "◑", "◕", "⬘", "➤", "◔", "⬗"]  // lembrada (◐)
];

const correctSymbols = ["◉", "⬗", "▽", "◒", "◐"];

function createRings() {
  const container = document.getElementById("rings-container");
  runes.forEach((symbols, index) => {
    const div = document.createElement("div");
    div.classList.add("ring");
    div.textContent = symbols[0];
    div.dataset.index = 0;
    div.dataset.ring = index;
    div.addEventListener("click", () => {
      let currentIndex = parseInt(div.dataset.index);
      currentIndex = (currentIndex + 1) % symbols.length;
      div.dataset.index = currentIndex;
      div.textContent = symbols[currentIndex];
    });
    container.appendChild(div);
  });
}

function checkSolution() {
  const rings = document.querySelectorAll(".ring");
  let correct = true;
  rings.forEach((ring, i) => {
    if (ring.textContent !== correctSymbols[i]) {
      correct = false;
    }
  });

  const message = document.getElementById("message");
  if (correct) {
    message.textContent = "A frase se completa com luz dourada...";
    message.classList.add("glow");
  } else {
    message.textContent = "Algo está errado.";
    message.classList.remove("glow");
  }
}

window.onload = createRings;
