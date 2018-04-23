const select = (str) => document.querySelector(str);
const create = (str) => document.createElement(str);
const style = document.documentElement.style;

const sketchBook = select('#sketchbook');

function createGrid(side = 16) {
  style.setProperty('--rowNum', side);
  style.setProperty('--colNum', side);
  clearSketchBook();
  for (let i = 0; i < side * side; i++) {
    const div = create('div');
    div.classList.add('cell');
    addCellListener(div);
    sketchBook.appendChild(div);
  }
}

function addCellListener(div) {
  div.addEventListener('pointerenter', () => {
    div.classList.add('cell-over');
  });
}

function addClearBtnListerner() {
  const button = select('#grid-btn');
  button.addEventListener('click', () => {
    createGrid(prompt('Type sketchbook side dimensions'));
  });
}

function clearSketchBook() {
  document.querySelector('#sketchbook').childNodes
  const cells = sketchBook.childNodes;
  while(cells.length > 0) {
    sketchBook.removeChild(cells[0]);
  }
}


addClearBtnListerner();
createGrid();