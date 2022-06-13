const root = document.querySelector(":root");
const grid = document.querySelector(".grid");
const cell = document.querySelectorAll(".cell");
const penColor = document.querySelector(".penColor");
const bgColor = document.querySelector(".bgColor");
const colorGrabber = document.querySelector(".colorGrabber");
const eraser = document.querySelector(".eraser");
const rainbow = document.querySelector(".rainbow");
const gridLines = document.querySelector(".gridLines");

let color = "#000000";
let grabberActive = false;
let eraserActive = false;
let rainbowActive = false;
let gridActive = true;

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
  listenEvent();
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

function generateRandomColor() {
  let randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
  return randomColor;
}

function RGBToHex(rgb) {
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  rgb = rgb.substr(4).split(")")[0].split(sep);

  let r = (+rgb[0]).toString(16),
    g = (+rgb[1]).toString(16),
    b = (+rgb[2]).toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;
  b = (+rgb[2]).toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;
  return "#" + r + g + b;
}

function handleEvent(e) {
  if (e.buttons > 0) {
    if (!eraserActive && !grabberActive) {
      if (rainbowActive === true)
        e.target.style.background = generateRandomColor();
      else e.target.style.background = color;
      e.target.dataset.status = "colored";
    }

    if (eraserActive && !grabberActive) {
      e.target.style.background = bgColor.value;
      e.target.dataset.status = "empty";
    }

    if (grabberActive && !eraserActive) {
      penColor.value = RGBToHex(e.target.style.background);
      color = e.target.style.background;
      grabberActive = false;
      toggleState(colorGrabber);
    }
  }
}

function listenEvent() {
  const cell = document.querySelectorAll(".cell");
  cell.forEach((cell) => {
    cell.addEventListener("mousedown", (e) => handleEvent(e));
    cell.addEventListener("mouseenter", (e) => handleEvent(e));
    cell.addEventListener("click", (e) => {
      if (eraserActive || grabberActive) handleEvent(e);
    });
  });
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

gridLines.addEventListener("click", () => {
  toggleState(gridLines);
  if (gridLines.dataset.state === "active") gridActive = true;
  else gridActive = false;
  const cell = document.querySelectorAll(".cell");
  cell.forEach((cell) => {
    if (gridActive) cell.style.borderColor = "black";
    else cell.style.borderColor = "transparent";
  });
});
