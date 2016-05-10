// you can use console.log for debugging purposes, i.e.
// console.log('this is a debug message');


function solution(array_input) {
    var balance_point = [];

    for (var i in array_input) {
        var left = array_input.slice(0, i);
        var right = array_input.slice(parseInt(i) + 1);
        if (is_balance(left, right)) {
            balance_point.push(i);
        }
    }

    return balance_point;
}

function is_balance(left, right) {
    return (sum_array(left) === sum_array(right) ? true : false);
}

function sum_array(array_input) {
    var sum = 0;

    for (var j in array_input) {
        sum += array_input[j];
    }

    return sum;
}

var a1 = [-7, 1, 5, 2, -4, 3, 0];

solution(a1);

for (var i = 0; i < 100; i++) {
    console.log(100 - i);
}
