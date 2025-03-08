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

 ///REFAZER

}
 
catAndMouse(5, 5, 5);  

// Desafio 8
function fizzBuzz() {

  const arrayNumerosDivisiveis = [2, 15, 7, 9, 45];

  let result1 = [];

  for (let index1 = 0; index1 < arrayNumerosDivisiveis.length; index1 += 1) {

  if (arrayNumerosDivisiveis[index1] % 3 === 0 && arrayNumerosDivisiveis[index1] % 5 === 0) {
    result1.push("fizzbuzz"); 
  }
  
 else if (arrayNumerosDivisiveis [index1] %3 === 0) {
    result1.push('fizz');
  }

  else if (arrayNumerosDivisiveis [index1] %5 === 0) {
        result1.push('buzz');
      } 
      
else {  result1.push('bug!') 

}

      
  }
  return result1;

}

console.log (fizzBuzz());

// Desafio 9
function encode(string) {

 return string.replace(/a/g, "1") 
 .replace(/e/g, "2")
 .replace(/i/g, "3")
 .replace(/o/g, "4")
 .replace(/u/g, "5"); 
  
}
console.log(encode('O cravo e a rosa'));

function decode(string2) {

  return string2.replace (/1/g, "a")
  .replace(/2/g, "e")
  .replace(/3/g, "i")
  .replace(/4/g, "o")
  .replace(/5/g, "u"); 
  
}

console.log(decode('O cr1v4 2 1 r4s1'));


// Desafio 10
function techList(arrayTecnologia, name) {

 arrayTecnologia = ["React", "Jest", "HTML", "CSS", "JavaScript"];

 name = 'Larissa';
  




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
