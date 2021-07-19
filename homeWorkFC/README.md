import \* as R from "ramda";
import { tree, countries } from "./constants";
console.clear();
//набор для 1 или 2 части
const numberHomeWork = 2;
if (numberHomeWork === 1) {
console.log("Дано: ", countries);
const hasCapitalCity = R.propEq("isCapital", true);
const countriesWithoutCapitalCity = R.filter(
(item) => !R.find(hasCapitalCity, item.cities),
countries
);
const maxPeople = R.reduce(
(acc, item) =>
acc + R.reduce((acc, city) => acc + city.population, 0, item.cities),
0,
countries
);
const findNeighbor = R.filter(
(item) => R.find((neibor) => neibor === "Ukraine", item.neighbors),
countries
);
const findSpecialCapital = R.pipe(
R.filter((item) => R.find((city) => city.isCapital === true, item.cities)),
R.find((item) =>
R.find(
(city) => city.isCapital === true && city.population < 80,
item.cities
)
)
)(countries);
console.log("countriesWithoutCapitalCity", countriesWithoutCapitalCity);
console.log("maxPeople", maxPeople);
console.log("findNeighbor", findNeighbor);
console.log("findSpecialCapital", findSpecialCapital);
}
if (numberHomeWork === 2) {
console.log("Дано: ", tree);
function getFileName(item) {
if (item.type === "file") {
return R.toUpper(item.name);
} else if (item.children.length > 0) {
return R.map((elem) => getFileName(elem), item.children);
}
return;
}
const fileNamesUppercase = (tree) => {
return R.filter((item) => item, getFileName(tree));
};
function checkTypes(item) {
if (item.type === "file") {
return 1;
}
return R.reduce((acc, elem) => acc + checkTypes(elem), 0, item.children);
}
const countFiles = (tree) => {
return R.reduce(
(acc, item) => {
return acc + checkTypes(item);
},
0,
tree.children
);
};
function getFileNameWithSize(item, size) {
if (item.type === "file" && item.size >= size) {
return item.name;
}
if (!item.children) return;
else if (item.children.length > 0) {
return R.map((elem) => getFileNameWithSize(elem, size), item.children);
}
return;
}
const findFilesBySize = (tree, size) => {
return R.filter(
(item) => item,
R.flatten(R.filter((item) => item, getFileNameWithSize(tree, size)))
);
};
console.log("fileNamesUppercase", fileNamesUppercase(tree));
console.log("countFiles", countFiles(tree));
console.log("findFilesBySize", findFilesBySize(tree, 500));
}
