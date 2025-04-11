const pixelBoard = document.getElementById("pixel-board");
const colorPalette = document.getElementById("color-palette");
const button = document.getElementById('clear-board');
const paletteColors = [];
const colorNumber = 4; 
let quadroPixel = [];
let tamanhoPixel = 5;

// Função para gerar valor aleatório entre 0 e 255
function generatorColors() {
  return Math.ceil(Math.random() * 255);
}

// Função para gerar cor RGB aleatória
function generatorRgbColors() {
  const red = generatorColors();
  const green = generatorColors();
  const blue = generatorColors();
  return `rgb(${red}, ${green}, ${blue})`;
}

// Criando a paleta de cores
for (let index = 0; index < colorNumber; index += 1) {
  paletteColors[index] = document.createElement("div");
  paletteColors[index].className = "color";
  colorPalette.appendChild(paletteColors[index]);
}

// Definindo as cores da paleta
paletteColors[0].style.backgroundColor = "black"; // Cor preta
paletteColors[0].classList.add("selected"); // Definindo a cor preta como selecionada

paletteColors[1].style.backgroundColor = generatorRgbColors();
paletteColors[2].style.backgroundColor = generatorRgbColors();
paletteColors[3].style.backgroundColor = generatorRgbColors();

// Função para inicializar os pixels do quadro
function pixelInit(pixelNumber) {
  quadroPixel = [];
  pixelBoard.innerHTML = ''; // Limpar o conteúdo anterior

  // Ajustando a largura e altura do pixelBoard
  pixelBoard.style.gridTemplateColumns = `repeat(${pixelNumber}, 40px)`;

  // Criando os pixels
  let pixelSize = pixelNumber * pixelNumber;
  for (let index = 0; index < pixelSize; index += 1) {
    const pixel = document.createElement("div");
    pixel.className = "pixel";
    pixelBoard.appendChild(pixel);
    quadroPixel.push(pixel);

    // Adicionando o evento de clique para mudar a cor do pixel
    pixel.addEventListener('click', changeColor);
  }
}

// Função para remover a classe 'selected' da paleta
function removeColorSelected() {
  paletteColors.forEach((color) => {
    if (color.className.includes('selected')) {
      color.classList.remove('selected');
    }
  });
}

// Função para selecionar a cor ao clicar na paleta
function colorSelect(color) {
  if (!color.target.className.includes('selected')) {
    removeColorSelected();
    color.target.classList.add('selected');
  }
}

paletteColors.forEach((color) => {
  color.addEventListener('click', colorSelect);
});

// Função para mudar a cor do pixel
function changeColor(event) {
  const pixel = event.target;
  const elementColor = document.querySelector('.selected').style.backgroundColor;
  pixel.style.backgroundColor = elementColor;
}

// Função para limpar o quadro de pixels
function clearBoard() {
  quadroPixel.forEach((pixel) => {
    pixel.style.backgroundColor = 'white';
  });
}

button.addEventListener('click', clearBoard);

// Função para alterar o tamanho do quadro
function changeBoardSize(lineNumber) {
  pixelInit(lineNumber);
}

// Função para pegar o tamanho do quadro a partir do input
function inputSize() {
  const inputElement = document.getElementById('board-size');
  let tamanhoPixel = parseInt(inputElement.value);

  if (isNaN(tamanhoPixel)) {
    alert('Board inválido!');
    return;
  }

  // Corrigindo o valor se estiver fora do intervalo
  if (tamanhoPixel < 5) {
    tamanhoPixel = 5;
  } else if (tamanhoPixel > 50) {
    tamanhoPixel = 50;
  }

  changeBoardSize(tamanhoPixel);
}


const buttonInput = document.getElementById('generate-board');
buttonInput.addEventListener('click', inputSize);

// Inicialização do quadro de pixels com o tamanho padrão
pixelInit(tamanhoPixel);
