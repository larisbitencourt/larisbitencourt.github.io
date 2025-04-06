const pixelBoard = document.getElementById("pixel-board");
const colorPalette = document.getElementById("color-palette");
const paletteColors = [];
const colorNumber = 5;
let quadroPixel = [];
let tamanhoPixel = 5;
let quadradoPixel = tamanhoPixel;

// gerar valor aleatório entre 0 e 255

function generatorColors() {
  return Math.ceil(Math.random() * 255);
}

// gerar cor RGB aleatória

function generatorRgbColors() {
  const red = randomColor();
  const green = randomColor();
  const blue = randomColor();

  const rgb = `rgb(${red}, ${green}, ${blue})`;
  return rgb;
}

for (let index = 0; index < colorNumber; index += 1) {
  paletteColors[index] = document.createElement("div");
  paletteColors.appendChild(paletteColors[index]).className = "color";
}

// o primeiro elemento será preto

paletteColors[0].style.backgroundColor = "black";

// adicionando a classe select ao primeiro elemento da paleta

paletteColors[0].classList.add("selected");

// gerar cores aleatórias para os outros quadrados

paletteColors[1].style.backgroundColor = generatorRgbColors();
paletteColors[2].style.backgroundColor = generatorRgbColors();
paletteColors[3].style.backgroundColor = generatorRgbColors();
paletteColors[4].style.backgroundColor = generatorRgbColors();

// latgura do quadro

pixelBoard.style.width = "40px";
pixelBoard.style.height = "40px";

let pixelSize = tamanhoPixel * tamanhoPixel;
for (let index = 0; index < pixelSize; index += 1) {
  quadroPixel[index] = document.createElement("div");
  pixelBoard.appendChild(quadroPixel[index]).className = "pixel";
}

// gerar o quadro de pixel

function pixelInit(pixelNumber) {
  quadradoPixel = pixelNumber;
  pixelBoard.style.width = "40px";
  pixelBoard.style.width = "40px";

  let pixelSize = pixelNumber * pixelNumber;
  for (let index = 0; index < pixelSize; index += 1) {
    quadroPixel[index] = document.createElement("div");
    pixelBoard.appendChild(quadroPixel[index]).className = "pixel";
  }
}

// remover a classe selected

function removeColorSelected() {
  paletteColors.forEach((color) => {
    if (color.className.includes('selected')) {
      color.classList.remove('selected');
    }
  });
}

// forEach itera sob os elementos da paletteColors.
// Ele executa a função fornecida para cada item da coleção.
// A função fornecida recebe o parâmetro color, que é cada elemento da paleta de cores.

function colorSelect(color) {
  if (!color.target.className.includes('selected')) {
    cleanColorSelected();
    color.target.classList.add('selected');
  }
}

paletteColors.forEach((color) => {
  color.addEventListener('click', colorSelect);
});

// mudança de cor nos pixels


function changeColor(valor) {
  const pixel = valor;
  const elementColor = document.querySelector('.selected').style.backgroundColor;
  pixel.target.style.backgroundColor = elementColor;
}

quadroṔixel.forEach((pixel) => {
  pixel.addEventListener('click', changeColor);
});

// alterar a cor ao clicar no pixel

function pixelInit() {
  quadroPixel.forEach((pixel) => {
    pixel.addEventListener('click', changeColor);
  });
}


// botão

function clearBoard() {
  quadroPixel.forEach((pixel) => {
    const whitePixel = pixel;
    whitePixel.style.backgroundColor = 'white';
  });
}

button.addEventListener('click', clearBoard);


function finalClean() {
  const finalPixel = lastLinePixel * lastLinePixel;
  for (let index = 0; index < finalPixel; index += 1) {
    pixelBoard.removeChild(quadroPixel[index]);
  }
  quadroPixel = [];   //ver se precisa alterar de lugar essa função
}

// alterar tamanhao quadro pixel

function changeBoardSize(lineNumber) {
  finalClean();
  pixelInit(lineNumber);
  pixelInit();
}

function inputSize() {
  tamanhoPixel = documentElementById('tamanho-borda');  // ???
  if (tamanhoPixel.length === 0) {
    alert('Board inválido!');
  } else if (tamanhoPixel < 5) {
    alert('Board inválido! Mínimo 5x5');
  } else if (tamanhoPixel > 20) {
    alert('Board inválido! Limite de 20x20');
  } else {
    inputBoardSize(tamanhoPixel);
  }
}

buttonInput.addEventListener('click', inputSize);


