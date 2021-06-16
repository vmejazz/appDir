// import * as R from "ramda";

const tree = {
  name: "Program Files",
  type: "directory",
  size: undefined,
  children: [
    {
      name: "File2",
      type: "file",
      size: 400,
      children: null,
    },
    {
      name: "App2",
      type: "directory",
      size: 1200,
      children: [
        {
          name: "File3",
          type: "file",
          size: 700,
          children: null,
        },
        {
          name: "File4",
          type: "file",
          size: 500,
          children: null,
        },
      ],
    },
    {
      name: "App3",
      type: "directory",
      size: 300,
      children: [
        {
          name: "File5",
          type: "file",
          size: 300,
          children: null,
        },
        {
          name: "config",
          type: "directory",
          size: 900,
          children: [
            {
              name: "File6",
              type: "file",
              size: 900,
              children: null,
            },
          ],
        },
      ],
    },
    {
      name: "App3",
      type: "directory",
      size: 0,
      children: [],
    },
  ],
};

const countries = [
  {
    name: "Italy",
    population: 1320,
    neighbors: ["France"],
    cities: [
      {
        name: "Rome",
        isCapital: true,
        population: 150,
      },
      {
        name: "Milan",
        isCapital: false,
        population: 70,
      },
    ],
  },
  {
    name: "Russia",
    population: 950,
    neighbors: ["Belarus", "Ukraine", "Kazakhstan"],
    cities: [
      {
        name: "Moscow",
        isCapital: true,
        population: 190,
      },
      {
        name: "Rostov",
        isCapital: false,
        population: 70,
      },
    ],
  },
  {
    name: "France",
    population: 600,
    neighbors: ["Germany"],
    cities: [
      {
        name: "Nizza",
        isCapital: false,
        population: 20,
      },
      {
        name: "Paris",
        isCapital: true,
        population: 70,
      },
    ],
  },
  {
    name: "Poland",
    population: 600,
    neighbors: ["Belarus", "Ukraine", "Germany"],
    cities: [
      {
        name: "Nizza",
        isCapital: false,
        population: 20,
      },
      {
        name: "Paris",
        isCapital: true,
        population: 70,
      },
    ],
  },
  {
    name: "Germany",
    population: 950,
    neighbors: ["Poland", "France"],
    cities: [
      {
        name: "Bavaria",
        isCapital: false,
        population: 70,
      },
    ],
  },
  {
    name: "Columbia",
    population: 74,
    neighbors: [],
    cities: [],
  },
];

console.clear();
console.log("--------------------------------------------");
console.log("Первая часть");
console.log("Дано:", countries);

const hasCapitalCity = R.propEq("isCapital", true);
const countriesWithoutCapitalCity = R.pipe(
  R.filter((item) => !R.find(hasCapitalCity, item.cities)),
  R.map((item) => item.name)
)(countries);

const maxPeople = R.pipe(
  R.reduce(
    (acc, item) =>
      acc + R.reduce((acc, city) => acc + city.population, 0, item.cities),
    0
  )
)(countries);

const findNeighbor = R.pipe(
  R.filter((item) => R.find((neibor) => neibor === "Ukraine", item.neighbors)),
  R.map((item) => item.name)
)(countries);

const findSpecialCapital = R.pipe(
  R.filter((item) => R.find((city) => city.isCapital === true, item.cities)),
  R.find((item) =>
    R.find(
      (city) => city.isCapital === true && city.population < 80,
      item.cities
    )
  ),
  R.prop("name")
)(countries);

console.log(" Задача 1. Выбрать все страны в которых не приведена столица");
console.log("countriesWithoutCapitalCity:", countriesWithoutCapitalCity);
console.log("Задача 2. Получить сумму населения городов всех стран");
console.log("maxPeople:", maxPeople);
console.log(
  "Задача 3. Выбрать все страны соседствующие с Ukraine и вывести их имена"
);
console.log("findNeighbor:", findNeighbor);
console.log(
  "Задача 4. Найти в массиве первую страну с популяций столицы меньше 80 "
);
console.log("findSpecialCapital:", findSpecialCapital);

console.log("--------------------------------------------");
console.log("Вторая часть");
console.log("Дано:", tree);

const getFileName = (item) => {
  if (item.type === "file") {
    return R.toUpper(item.name);
  } else if (item.children.length > 0) {
    return R.map((elem) => getFileName(elem), item.children);
  }
  return;
};

const fileNamesUppercase = (tree) => {
  return R.filter((item) => item, getFileName(tree));
};

const checkTypes = (item) => {
  if (item.type === "file") {
    return 1;
  }
  return R.reduce((acc, elem) => acc + checkTypes(elem), 0, item.children);
};

const countFiles = (tree) => {
  return R.reduce(
    (acc, item) => {
      return acc + checkTypes(item);
    },
    0,
    tree.children
  );
};

const getFileNameWithSize = (item, size) => {
  if (item.type === "file" && item.size >= size) {
    return item.name;
  }
  if (!item.children) return;
  else if (item.children.length > 0) {
    return R.map((elem) => getFileNameWithSize(elem, size), item.children);
  }
  return;
};

const findFilesBySize = (tree, size) => {
  return R.filter(
    (item) => item,
    R.flatten(R.filter((item) => item, getFileNameWithSize(tree, size)))
  );
};

console.log(
  " Задача 1 - написать функцию fileNamesUppercase, которая принимает на вход дерево и выводит имена всех файлов заглавными буквами сохранив структуру вложенности, пустые папки должны быть проигнорированы"
);
console.log("fileNamesUppercase:", JSON.stringify(fileNamesUppercase(tree)));

console.log(
  "Задача 2 - написать функцию countFiles, которая принимает на вход дерево и считает количество файлов по всей глубине вложенности"
);
console.log("countFiles:", countFiles(tree));
console.log(`Задача 3 - Написать функцию findFilesBySize, которая принимает на вход дерево и число-размер и выводит в плоском списке имена всех файлов больше этого числа включительно
Входные данные: 500
`);
console.log("findFilesBySize:", findFilesBySize(tree, 500));
