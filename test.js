import Decimal from 'break_infinity.js';

const shit = new Decimal("9.654e789");

console.log(shit);

const stringified = JSON.stringify(shit);

console.log(stringified);

console.log(JSON.parse(stringified));

const n = new Decimal(JSON.parse(stringified));

console.log(n)

const test = {
    n: new Decimal(123),
    b: new Decimal("9.654e789")
}

console.log(test)

console.log(JSON.stringify(test))

console.log(JSON.parse(JSON.stringify(test)))
