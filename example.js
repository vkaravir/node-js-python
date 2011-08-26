var py = require('./jspython');
var code = ["b = 4",
            "def add(nbr1, nbr2):",
            "  return nbr1 + nbr2",
            "print 'Hello World'",
            "a = add(10, 11)"].join('\n');


console.log("Execution result: ", py.exec(code, ['a', 'b', 'c']));

var expected = {'a': 21, 'b': '4', 'c': 2, 'd': 'kissa'};

console.log("Comparing to: ", expected)

console.log("Assertion result (strict comparison): ", py.check(code, expected));
console.log("Assertion result (loose comparison): ", py.check(code, expected, true));



console.log(py.exec(["print 'eka'", "a = 2", "import urllib", "print 'py'"].join('\n'), ['a']));