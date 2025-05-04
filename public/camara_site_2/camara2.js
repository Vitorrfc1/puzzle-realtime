const sequence = ["Estrela", "Sol", "Relógio", "Lua"];
const selected = [];
const board = document.getElementById("board");
const message = document.getElementById("message");
const checkBtn = document.getElementById("checkBtn");

// Carrega o som de impacto
const errorSound = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_f019f57b99.mp3");

const symbols = ["Lua", "Sol", "Relógio", "Espiral", "Pedra", "Nuvem", "Raiz", "Estrela"];

symbols.forEach(symbol => {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.textContent = symbol;
  tile.onclick = () => {
    if (tile.classList.contains("selected")) {
      tile.classList.remove("selected");
      selected.splice(selected.indexOf(symbol), 1);
    } else if (selected.length < 4) {
      tile.classList.add("selected");
      selected.push(symbol);
    }
  };
  board.appendChild(tile);
});

checkBtn.onclick = () => {
  if (selected.length !== 4) {
    message.textContent = "Selecione 4 pedras antes de verificar.";
    return;
  }

  const isCorrect = selected.every((sym, idx) => sym === sequence[idx]);

  if (isCorrect) {
    message.textContent = "Você chegou à alavanca! Um brilho azul ilumina a sala.";
  } else {
    // Toca o som de erro
    errorSound.play();

    // Mensagem e tremor
    message.textContent = "Você pisa na pedra errada, cai junto com as runas e se machuca na queda.";
    board.classList.add("shake");

    setTimeout(() => {
      message.textContent = "Caminhe pisando nas pedras em ordem lógica.";
      board.classList.remove("shake");
    }, 4000);
  }

  selected.length = 0;
  document.querySelectorAll(".tile").forEach(t => t.classList.remove("selected"));
};
