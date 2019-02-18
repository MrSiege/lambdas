import _ from "./gracefully";
const generateValue = function generateValue(index) {
    const decimalism = 10;
    return {number:parseInt(Math.random() * 10e1, decimalism)};
};
const array = _.initialArray(generateValue, 10e1);
const result = _.sortBy(array, function (item) {
    return item.number;
});
console.log(result);