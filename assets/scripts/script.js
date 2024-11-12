// ===========================================================
//        exercise-js-calculator
// ===========================================================

// ----- 1. Setup DOM connections -----
const form = document.getElementById("calc_form");
// reference to form.
const output = document.getElementById("output");
// reference to output window.
const operand_btns = document.querySelectorAll("button[data-type=operand]");
//add references for the putput, main form and operand buttons.
const operator_btns = document.querySelectorAll("button[data-type=operator]");
// reference for operator buttons.

let is_operator = false; // variable to determine if button is operator.
let equation = []; // array to store the equation.

const remove_active = () => {
  operator_btns.forEach((btn) => {
    btn.classList.remove("active");
  }); // function to remove active class from buttons after clicking them.
};

// ----- 2. Submit listener -----
form.addEventListener("submit", (e) => {
  e.preventDefault();
}); // add event listener to listen for form submit.

// ----- 3. Operand logic -----
operand_btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // adds event listener for event "click" on buttons.
    remove_active(); // remove_active function.
    if (output.value == "0") {
      // if number in output is 0.
      output.value = e.target.value;
    } else if (is_operator) {
      // checks to see if an operator button has
      // previously been clicked.
      is_operator = false;
      output.value = e.target.value;
    } else if (output.value.includes(".")) {
      // check value for decimals.
      output.value = output.value + "" + e.target.value.replace(".", "");
    } else {
      output.value = output.value + "" + e.target.value;
    }
  });
});

// ----- 4. Operator logic -----
operator_btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    remove_active(); // reset active again.
    e.currentTarget.classList.add("active");
    // add event listener for  operator buttons.

    switch (e.target.value) {
      case "%":
        output.value = parseFloat(output.value) / 100;
        break;
      // % converts the output number to a percentage value,
      // by dividing by 100, just like % on a real calculator.

      case "invert":
        output.value = parseFloat(output.value) * -1;
        break;
      // "invert" invets the output by multiplying it by -1.

      case "=":
        equation.push(output.value);
        output.value = eval(equation.join(""));
        equation = [];
        break;
      // adds the last value from the output value to equation array,
      // use eval() to evaluate equations, and finally clear the equation array.

      default:
        let last_item = equation[equation.length - 1];
        if (["/", "*", "+", "-"].includes(last_item) && is_operator) {
          equation.pop();
          equation.push(e.target.value);
          // if the previous button we clicked was an operator (/, *, +, or -)
          // delete it from the equation using equation.pop()
          // and add the last clicked one with equation.push().
        } else {
          equation.push(output.value);
          equation.push(e.target.value);
          // otherwise add value to equation array.
        }
        is_operator = true; // set is_operator to true after we use an operator.
        break;
    }
  });
});
