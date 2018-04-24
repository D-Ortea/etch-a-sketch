const select = (str) => document.querySelector(str);
const create = (str) => document.createElement(str);
const style = document.documentElement.style;

const sketchBook = select('#sketchbook');
let color = 'black';
let intensity = 100;

function createGrid(side = 16) {
  style.setProperty('--rowNum', side);
  style.setProperty('--colNum', side);
  deleteCells();
  for (let i = 0; i < side * side; i++) {
    const div = create('div');
    div.classList.add('cell');
    addCellListener(div);
    sketchBook.appendChild(div);
  }
}

function deleteCells() {
  const cells = sketchBook.childNodes;
  while (cells.length > 0) {
    sketchBook.removeChild(cells[0]);
  }
}

function addCellListener(div) {
  div.addEventListener('pointerenter', () => {
    const bgColor = div.style.background;
    if (bgColor) {
      if (intensity < 100) {
        darkenColor(div, bgColor);
      } else if(color === 'black') {
        div.style.background = createRGBColor();
      }
    } else {
      div.style.background = createRGBColor();
    }
  });
}

function createRGBColor(rgb = null) {
  const randRGB = () => Math.floor(Math.random() * 255);

  return (rgb)                                    ? `rgb(${rgb.toString()})`
       : (color === 'black' && intensity === 100) ? 'rgb(0,0,0)'
       : (color === 'black' && intensity < 100)   ? 'rgb(200,200,200)'
       :                                            `rgb(${randRGB()}, ${randRGB()}, ${randRGB()})`;
}

function darkenColor(div, bgColor) {
  const rgb = div.style.background.slice(4, -1).split(',');
  div.style.background = createRGBColor(rgb.map(color => (+color === 0) ? color : color - 26));
}

function addBrushListener() {
  const brushInputs = document.querySelectorAll('input[name="brush"]');
  for (let i = 0; i < brushInputs.length; i++) {
    brushInputs[i].addEventListener('click', () => {
      color = brushInputs[i].value;
    });
  }
}

function addIntensityListener() {
  const intensityInputs = document.querySelectorAll('input[name="intensity"]');
  for (let i = 0; i < intensityInputs.length; i++) {
    intensityInputs[i].addEventListener('click', () => {
      intensity = +intensityInputs[i].value;
    });
  }
}

function addClearBtnListerner() {
  const button = select('#clear-btn');
  button.addEventListener('click', () => {
    clearSketchBook();
  });
}

function addResizeButtonListener() {
  const button = select('#resize-btn');
  button.addEventListener('click', () => {
    let newSide = prompt('Type sketchbook side dimensions', 16);
    newSide = (isNaN(newSide) || newSide === null) ? 16 : newSide;
    createGrid(newSide);
  });
}

function clearSketchBook() {
  const cells = sketchBook.childNodes;
  for (let i = 0; i < cells.length; i++) {
    cells[i].style.background = "";
  }
}

addBrushListener();
addIntensityListener();
addResizeButtonListener();
addClearBtnListerner();
createGrid();