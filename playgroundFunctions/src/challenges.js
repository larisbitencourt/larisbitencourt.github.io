// Desafio 1
function compareTrue(a, b) {
  return a % 2 === 0 && b % 2 === 0;
}

console.log(compareTrue(4, 6));
console.log(compareTrue(2, 3));
console.log(compareTrue(7, 8));
console.log(compareTrue(6, 10));

// Desafio 2
function calcArea(base, height) {
  return (area = (base * height) / 2);
}

console.log(calcArea(10, 2));

// Desafio 3
function splitSentence(mySentence) {
  return mySentence.split(" ");
}
console.log(splitSentence("Eu amo estudar"));

// Desafio 4
function concatName() {
  lista = ["Phoebe", "Joey", "Ross", "Rachel", "Monica", "Chandler"];

  const primeiro = lista[0];
  const ultimo = lista[lista.length - 1];

  return ` O primeiro item: ${primeiro}. O último item: ${ultimo}`;
}

console.log(concatName());

// Desafio 5
function footballPoints(wins, ties) {
  wins = 3;
  ties = 1;

  return 3 * wins + 1 * ties;
}

console.log(footballPoints(2, 5));

// Desafio 6
function highestCount() {
  arrayDeNumeros = [9, 1, 2, 3, 9, 5, 7];

  let result = 0;

  for (let index = 0; index < arrayDeNumeros.length; index += 1) {
    if (arrayDeNumeros[index] === 9) result++;
  }

  console.log(result);
}

highestCount();

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  const distCat1 = Math.abs(mouse - cat1);
  const distCat2 = Math.abs(mouse - cat2);

  if (distCat1 < distCat2) {
    return "cat1";
  } else if (distCat2 < distCat1) {
    return "cat2";
  } else {
    return "os gatos trombam e o rato foge";
  }
}

console.log(catAndMouse(5, 3, 7));
console.log(catAndMouse(4, 3, 2));
console.log(catAndMouse(8, 3, 10));

// Desafio 8
function fizzBuzz() {
  const arrayNumerosDivisiveis = [2, 15, 7, 9, 45];

  let result1 = [];

  for (let index1 = 0; index1 < arrayNumerosDivisiveis.length; index1 += 1) {
    if (
      arrayNumerosDivisiveis[index1] % 3 === 0 &&
      arrayNumerosDivisiveis[index1] % 5 === 0
    ) {
      result1.push("fizzbuzz");
    } else if (arrayNumerosDivisiveis[index1] % 3 === 0) {
      result1.push("fizz");
    } else if (arrayNumerosDivisiveis[index1] % 5 === 0) {
      result1.push("buzz");
    } else {
      result1.push("bug!");
    }
  }
  return result1;
}

console.log(fizzBuzz());

// Desafio 9
function encode(string) {
  return string
    .replace(/a/g, "1")
    .replace(/e/g, "2")
    .replace(/i/g, "3")
    .replace(/o/g, "4")
    .replace(/u/g, "5");
}
console.log(encode("O cravo e a rosa"));

function decode(string2) {
  return string2
    .replace(/1/g, "a")
    .replace(/2/g, "e")
    .replace(/3/g, "i")
    .replace(/4/g, "o")
    .replace(/5/g, "u");
}

console.log(decode("O cr1v4 2 1 r4s1"));

// Desafio 10

const tech = ["React", "Jest", "HTML", "CSS", "JavaScript"];

const name1 = "Larissa";

function techList(tech, name1) {
  if (tech.length === 0) {
    return "Vazio!";
  }

  tech.sort();

  return tech.map((techItem) => {
    return { tech: techItem, name: name1 };
  });
}

console.log(techList(tech, name1));

// Desafio 11
function generatePhoneNumber(numeros) {
  numeros = [3, 1, 9, 9, 9, 9, 7, 0, 2, 2, 7];
  let telefone = [];

  if (numeros.length !== 11) {
    return "Array com número incorreto.";
  }

  for (let index3 = 0; index3 < numeros.length; index3 += 1) {
    if (numeros[index3] < 0 || numeros[index3] > 9) {
      return "não é possóvel gerar um número de telefonme com esses valores";
    }
  }

  telefone.unshift("(");
  telefone.push(numeros[0]);
  telefone.push(numeros[1]);
  telefone.push(")");
  telefone.push(numeros[2], numeros[3], numeros[4], numeros[5], numeros[6]);
  telefone.push("-");
  telefone.push(numeros[7], numeros[8], numeros[9], numeros[10]);

  return telefone.join("");
}

console.log(generatePhoneNumber());

// Desafio 12
function triangleCheck(lineA, lineB, lineC) {
  if (
    lineA < lineB + lineC &&
    lineA > Math.abs(lineB - lineC) &&
    lineB < lineA + lineC &&
    lineB > Math.abs(lineA - lineC) &&
    lineC < lineA + lineB &&
    lineC > Math.abs(lineA - lineB)
  ) {
    return true;
  } else {
    return false;
  }
}

console.log(triangleCheck(2, 3, 4));

// Desafio 13
function hydrate(stringBar) {
  const r = /\d+/g;

  const array = stringBar.match(r);
  // [ '1', '9', '4']

  let resultado = 0;

  for (let i = 0; i < array.length; i += 1) {
    resultado += parseInt(array[i]);
  }

  if (resultado === 1) {
    return resultado + " copo de água";
  }
   
  return resultado + " copos de água";


}

console.log(hydrate("1 cachaça, 4 cervejas e 7 copo de vinho"));

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  generatePhoneNumber,
  techList,
  highestCount,
  hydrate,
  splitSentence,
  triangleCheck,
};
