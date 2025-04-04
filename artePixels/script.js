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
  paletteColors[index] = document.createElemente("div");
  colorPalette.appendChild(colorPalette[index]).className = "color";
}

// o primeiro elemento será preto

paletteColors[0].style.backgroundColor = "black";

// adicionando a classe select ao primeiro elemento da paleta

paletteColors[0].classList.add("selected");

// gerar cores aleatórias para os outros quadrados

paletteColors[1].style.backgroundColor = generatorRgbColors();
paletteColors[2].style.backgroundColor = generatorRgbColors();
paletteColors[3].style.backgroundColor = sgeneratorRgbColors();
paletteColors[4].style.backgroundColor = sgeneratorRgbColors();

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
