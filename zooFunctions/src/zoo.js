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

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = []
) {
  const newObject = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(newObject);
}

function animalCount(species) {
  if (!species) {
    const animals = data.animals.reduce((acc, specie) => {
      acc[specie.name] = specie.residents.length; // acc é o objeto inteiro, [chave] = valor
      return acc;
    }, {});

    return animals;
  }

  const count = data.animals.find((specieCount) => {
    return specieCount.name === species;
  });

  return count.residents.length;
}

function entryCalculator(entrants) {
  if (!entrants) return 0;

  let total = 0;

  if (entrants.Adult) total += entrants.Adult * data.prices.Adult;
  if (entrants.Senior) total += entrants.Senior * data.prices.Senior;
  if (entrants.Child) total += entrants.Child * data.prices.Child;

  return total;
}

function animalMap(options) {
  //sem parametro retorna animais pela sua localização
}

function schedule(dayName) {
  const message = {
    Tuesday: "Open from 8am until 6pm",
    Wednesday: "Open from 8am until 6pm",
    Thursday: "Open from 10am until 8pm",
    Friday: "Open from 10am until 8pm",
    Saturday: "Open from 8am until 10pm",
    Sunday: "Open from 8am until 8pm",
    Monday: "CLOSED",
  };

  if (!dayName) {
    return message;
  } else if (dayName in message) {
    return { [dayName]: message[dayName] };
  }
}

function oldestFromFirstSpecies(id) {
  const animalEmployee = data.employees.find((employee) => employee.id === id);
  const firstAnimalId = animalEmployee.responsibleFor[0];
  const animals = data.animals.find((animal) => animal.id === firstAnimalId);

  const olderAge = animals.residents.reduce((acc, resident) => {
    return resident.age > acc.age ? resident : acc;
  });

  return [olderAge.name, olderAge.sex, olderAge.age];
}

function increasePrices(percentage) {}

const data = require("./data");

function employeeCoverage(idOrName) {
  //consulta a especie pela qual o colaborador é responsável, id, firstname ou lastname
  //sem parametros retorna uma lista array de todos funcionarios e os animais q eles saõ responsaveis
  // com o id,first ou lastname retorna animals pelo qual ele é responsável
  //
  //iterar employees e achar os ids das especies animais que ele é responsável
  // const animalSpecie = data.animals.find((specie) => specie.name === animal);

  const responsibleFor = data.employees.find((responsible) => {
    return (
      responsible.id === idOrName ||
      responsible.firstName === idOrName ||
      responsible.lastName === idOrName
    ); //guardando o funcionário

    return responsibleFor.responsibleFor.filter((idAnimals) => {
      return 
    })
    
    // const animalSpecie = data.animals.find((specie) => specie.name === animal);

    // return animalSpecie.residents.every((resident) => resident.age >= age);
 


  });
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
