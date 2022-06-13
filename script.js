const root = document.querySelector(":root");
const grid = document.querySelector(".grid");
const cell = document.querySelectorAll(".cell");

function createGrid(size = 8) {
  root.style.setProperty("--gridRows", size);
  root.style.setProperty("--gridColumns", size);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const div = document.createElement("div");
      div.classList.add("cell");
      div.dataset.status = "empty";
      grid.appendChild(div);
    }
  }
}
