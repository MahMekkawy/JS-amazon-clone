import { formatCurrency } from "../scripts/utils/money.js";

console.log('Test Suite: formatCuurency');

// Normal test case
console.log('Convert cents into dollars')

if (formatCurrency(2095) === '20.95') {
    console.log('Passed');
} else {
    console.log('Failed');
}

// Edge test case
console.log('Works with 0')

if (formatCurrency(0) === '0.00') {
    console.log('Passed');
} else {
    console.log('Failed');
}

// Edge test case
console.log('Rounds uo to the nearest cent')

if (formatCurrency(2000.5) === '20.01') {
    console.log('Passed');
} else {
    console.log('Failed');
}