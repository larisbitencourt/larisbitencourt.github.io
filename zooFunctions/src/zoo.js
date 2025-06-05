/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const data = require("./data");

function animalsByIds(...ids) {
  if (!ids.length) return [];
  const getAnimals = data.animals.filter((animal) => ids.includes(animal.id));
  return getAnimals;
}

function animalsOlderThan(animal, age) {
  const animalSpecie = data.animals.find((specie) => specie.name === animal);

  return animalSpecie.residents.every((resident) => resident.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  const employeeFind = data.employees.find((employee) => {
    return (
      employee.firstName === employeeName || employee.lastName === employeeName
    );
  });
  return employeeFind;
}

function createEmployee(personalInfo, associatedWith) {
  const object = { ...personalInfo, ...associatedWith };

  return object;
}

function isManager(id) {
  const managers = data.employees.some((employee) =>
    employee.managers.some((manager) => manager === id)
  );
  return managers;
} ///// dou


function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {

  const newObject = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(newObject);
}


const data = require("./data");
function animalCount(species) {
  // if (!species) return {};
 
 const quantidadeAnimais = {...data.animals.residents}
 console.log(quantidadeAnimais)
 
  
}

function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
