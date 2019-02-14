import _ from "./gracefully";
const generateValue = function generateValue(index) {
    const decimalism = 10;
    return parseInt(Math.random() * 10e1, decimalism);
};
const array = _.initialArray(generateValue, 10e1);
const result = _.filter(array, _.complement(function (item) {
    return item < 80;
}));
_.each(result, function (item, index) {
    _.documentWrite(item, "，");
});