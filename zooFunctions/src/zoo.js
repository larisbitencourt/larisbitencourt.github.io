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

// 1-Sem parâmetros, retorna animais categorizados por localização
// 2-Com a opção `includeNames: true` especificada, retorna nomes de animais
// 3-Com a opção `sorted: true` especificada, retorna nomes de animais ordenados
// 4-Com a opção `sex: \'female\'` ou `sex: \'male\'` especificada, retorna somente nomes de animais macho/fêmea
// 5-Com a opção `sex: \'female\'` ou `sex: \'male\'` especificada e a opção `sort: true` especificada, retorna somente nomes de animais macho/fêmea com os nomes dos animais ordenados
// 6-Só retorna informações ordenadas e com sexo se a opção `includeNames: true` for especificada

const data = require("./data");
function animalMap(options) {
  console.log(options);

  if (options.includeNames === true) {
    // caso2
  }

  if ((options.includeNames === true) && (options.sorted === true)) {
    // caso3
  }

  if ((options.includeNames === true) && (options.sorted === true)) {
    // caso4
  }

  if ((options.includeNames === true) && (options.sorted === true)) {
    // caso5
  }


  if (!options) {
    const resultLocation = data.animals.reduce((acc, animal) => {
      if (!acc[animal.location]) {
        acc[animal.location] = [];
      }
      acc[animal.location].push(animal.name);
      return acc;
    }, {});

    return resultLocation;
  }
}

console.log(animalMap());

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

function increasePrices(percentage) {
  Object.entries(data.prices).forEach(([key, value]) => {
    data.prices[key] = Math.round(value * (1 + percentage / 100) * 100) / 100;
  });
}

function employeeCoverage(idOrName) {
  const getAnimalNames = (ids) => {
    return ids.reduce((names, id) => {
      const animal = data.animals.find((animal) => animal.id === id);
      if (animal) {
        names.push(animal.name);
      }
      return names;
    }, []);
  };

  if (!idOrName) {
    // Sem parâmetro: retorna todos os funcionários
    return data.employees.reduce((acc, employee) => {
      const fullName = `${employee.firstName} ${employee.lastName}`;
      acc[fullName] = getAnimalNames(employee.responsibleFor);
      return acc;
    }, {});
  }

  // Com id, nome ou sobrenome
  const employee = data.employees.find(
    (emp) =>
      emp.id === idOrName ||
      emp.firstName === idOrName ||
      emp.lastName === idOrName
  );

  if (!employee) return {}; // Se não encontrar o funcionário

  const fullName = `${employee.firstName} ${employee.lastName}`;
  return {
    [fullName]: getAnimalNames(employee.responsibleFor),
  };
}

console.log(employeeCoverage("Stephanie")); //os nomes dos animais vem trocados????

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
