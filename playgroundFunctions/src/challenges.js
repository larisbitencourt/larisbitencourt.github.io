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
return area = (base * height) / 2

}

console.log(calcArea(10,2))

// Desafio 3
function splitSentence(mySentence) {

  return mySentence.split(' ');
  
}
console.log(splitSentence('Eu amo estudar'))

// Desafio 4
function concatName() {
 lista = [ 'Phoebe', 'Joey', 'Ross', 'Rachel', 'Monica', 'Chandler'];
 
 const primeiro = lista[0];
 const ultimo = lista[lista.length -1];

return ` O primeiro item: ${primeiro}. O último item: ${ultimo}`;

}

console.log(concatName());

// Desafio 5
function footballPoints() {
  // seu código aqui
}

// Desafio 6
function highestCount() {
  // seu código aqui
}

// Desafio 7
function catAndMouse() {
  // seu código aqui
}

// Desafio 8
function fizzBuzz() {
  // seu código aqui
}

// Desafio 9
function encode() {
  // seu código aqui
}
function decode() {
  // seu código aqui
}

// Desafio 10
function techList() {
  // seu código aqui
}

// Desafio 11
function generatePhoneNumber() {
  // seu código aqui
}

// Desafio 12
function triangleCheck() {
  // seu código aqui
}

// Desafio 13
function hydrate() {
  // seu código aqui
}

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
