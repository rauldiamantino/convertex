const $buttons = document.querySelectorAll("button");

$buttons.forEach(button => {
     button.addEventListener("click", () => {
          getText(button);
          clearConvert(button);
          getInputsBmi(button);
          clearBmiResult(button);
     });
});

/* Convert to UpperCase and LowerCase*/
const clearConvert = button => {
     const $text = document.querySelector("#input-text");
     const isClearConvert = button.classList.contains("clear");

     if (isClearConvert) ($text.value = ""), $text.focus();
};

const getText = button => {
     let $text = document.querySelector("#input-text");
     if ($text) $text = $text.value;

     const isUpper = button.classList.contains("upper");
     const isLower = button.classList.contains("lower");
     const isFirstUpper = button.classList.contains("first-upper");

     if (isUpper) toUpper($text);
     else if (isLower) toLower($text);
     else if (isFirstUpper) toFirstUpper($text);
};

const toUpper = $text => {
     const convertedText = $text.toUpperCase();
     printConvertedText(convertedText);
};

const toLower = $text => {
     const convertedText = $text.toLowerCase();
     printConvertedText(convertedText);
};

const toFirstUpper = $text => {
     const arrayText = $text.toLowerCase().split(" ");
     let convertedText = [];

     arrayText.forEach(text => {
          const conversion = text.charAt(0).toUpperCase() + text.slice(1);
          convertedText.push(conversion);
     });

     printConvertedText(convertedText.join(" "));
};

const printConvertedText = convertedText => {
     const $text = document.querySelector("#input-text");
     $text.value = convertedText;
};

/* Calculate BMI */
// document.addEventListener("keypress", e => (e.key === "Enter" ? getInputsBmi() : false));

/* get input values */
const getInputsBmi = button => {
     const $height = formatNumber(document.querySelector("#txtHeight"));
     const $weight = formatNumber(document.querySelector("#txtWeight"));
     const isCalculateBmi = button.classList.contains("calculateButton");

     if (isCalculateBmi) verifyIfEmpty($height, $weight);
};

/* format number captured in input */
const formatNumber = number => {
     if (number) {
          return number.value.replace(",", ".");
     }
};

/* checks if the number is valid and prints an error message*/
const verifyIfEmpty = ($height, $weight) =>
     $height == 0 || $weight == 0 ? printError() : calculateImc($height, $weight);

const printError = () => {
     const $height = document.querySelector("#txtHeight");
     const $weight = document.querySelector("#txtWeight");
     const $msgError = document.querySelector(".otherMsg");

     errorMsg($height, $weight, $msgError);
     clearErrorMsg($height, $weight, $msgError);
};

const errorMsg = ($height, $weight, $msgError) => {
     $height.focus();
     $height.classList.add("inputBackGround");
     $weight.classList.add("inputBackGround");
     $msgError.innerText = "Preencha os campos corretamente";
     $msgError.classList.remove("hidden");
};

const clearErrorMsg = ($height, $weight, $msgError) => {
     const $msgResult = document.querySelector(".resultImc");
     const $tableImc = document.querySelectorAll("tbody tr");

     $msgResult.innerText = "";
     $msgResult.classList.add("hidden");
     $tableImc.forEach(removeRating);

     setTimeout(function () {
          $height.classList.remove("inputBackGround");
          $weight.classList.remove("inputBackGround");
          $msgError.innerText = "";
          $msgError.classList.add("hidden");

          $height.focus();
     }, 2000);
};

/* calculate imc with input data  */
const calculateImc = (height, weight) => {
     const imcFactor = weight / (height * height);
     const alternativeImcFactor = weight / ((height / 100) * (height / 100));
     const ifHeightWithoutComma = height % 1 === 0;

     return ifHeightWithoutComma ? printImc(alternativeImcFactor) : printImc(imcFactor);
};

const printImc = fn => {
     const $msg = document.querySelector(".resultImc");

     $msg.classList.remove("hidden");
     $msg.innerText = fn.toFixed(2);

     /* access the table and set class */
     const getTable = () => {
          const $tableImc = document.querySelectorAll("tbody tr");
          return $tableImc.forEach(verify);
     };

     /* checks if tr element of the table is equal to imcRating, and paint the tr */
     const verify = (element, index) => {
          removeRating(element);
          if (index == imcRating(fn)) {
               return addRating(element);
          }
     };

     return getTable();
};

/* add and remove table paint class */
const addRating = element => element.classList.add("imcRating");
const removeRating = element => element.classList.remove("imcRating");

/* Imc rating */
const imcRating = fn => {
     if (fn >= 40.0) {
          return 5; // obesity3
     } else if (fn >= 35.0) {
          return 4; // obesity2
     } else if (fn >= 30.0) {
          return 3; // obesity1
     } else if (fn >= 25.0) {
          return 2; // overWeight
     } else if (fn >= 18.5) {
          return 1; // normal
     } else {
          return 0; // underWeight
     }
};

/* clear Button function */
const clearBmiResult = $button => {
     const $resultImc = document.querySelector(".resultImc");
     const $height = document.querySelector("#txtHeight");
     const $weight = document.querySelector("#txtWeight");
     const $tableImc = document.querySelectorAll("tbody tr");
     const isClearBmiButton = $button.classList.contains("clearButton");

     if (isClearBmiButton) {
          $height.value = "";
          $weight.value = "";
          $resultImc.classList.add("hidden");
          $tableImc.forEach(removeRating);
          $height.focus();
     }
};
