const root = document.querySelector(":root");
const grid = document.querySelector(".grid");
const cell = document.querySelectorAll(".cell");
const penColor = document.querySelector(".penColor");
const bgColor = document.querySelector(".bgColor");
const colorGrabber = document.querySelector(".colorGrabber");

let color = "#000000";
let grabberActive = false;
let eraserActive = false;
let rainbowActive = false;

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

function toggleState(ele) {
  if (ele.dataset.state === "inactive") {
    ele.style.background = "#008cff";
    ele.style.color = "black";
    ele.dataset.state = "active";
  } else if (ele.dataset.state === "active") {
    ele.style.background = "#181a1b";
    ele.style.color = "#43b1fd";
    ele.dataset.state = "inactive";
  }
}

function reset(evt) {
  if (evt !== "colorGrabber") {
    if (grabberActive) {
      grabberActive = false;
      toggleState(colorGrabber);
    }
  }

  if (evt !== "eraser") {
    if (eraserActive) {
      eraserActive = false;
      toggleState(eraser);
    }
  }

  if (evt !== "rainbow") {
    if (rainbowActive) {
      rainbowActive = false;
      toggleState(rainbow);
    }
  }
}

penColor.addEventListener("input", () => {
  color = penColor.value;
});

bgColor.addEventListener("input", () => {
  const cell = document.querySelectorAll(".cell");
  cell.forEach((cell) => {
    if (cell.dataset.status === "empty") cell.style.background = bgColor.value;
  });
});

colorGrabber.addEventListener("click", () => {
  reset("colorGrabber");
  toggleState(colorGrabber);
  if (colorGrabber.dataset.state === "active") grabberActive = true;
  else grabberActive = false;
});

eraser.addEventListener("click", () => {
  reset("eraser");
  toggleState(eraser);
  if (eraser.dataset.state === "active") eraserActive = true;
  else eraserActive = false;
});

rainbow.addEventListener("click", () => {
  reset("rainbow");
  toggleState(rainbow);
  if (rainbow.dataset.state === "active") rainbowActive = true;
  else rainbowActive = false;
});
