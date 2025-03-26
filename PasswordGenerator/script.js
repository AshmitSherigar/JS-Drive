let lengthPassword = 8;
let optionValues = []; 

let alphabets = [];
let lower_alphabets = [];
let numbers = [];
let specialCharacters = [
  "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "=", "-", "[", "]", "{", "}", "\\", "|", ";", ":", "'", '"', ",", ".", "/", "<", ">", "?", "`", "~"
];


for (let i = 0; i <= 9; i++) numbers.push(i);
for (let i = 65; i <= 90; i++) alphabets.push(String.fromCharCode(i)); // uppercase
for (let i = 97; i <= 122; i++) alphabets.push(String.fromCharCode(i)); // lowercase
for (let i = 97; i <= 122; i++) lower_alphabets.push(String.fromCharCode(i)); // lowercase only


document.querySelector("#range").addEventListener("input", function (e) {
  lengthPassword = this.value;
  document.querySelector("#rangeValue").textContent = this.value;
});


document.querySelectorAll(".option").forEach((checkbox) => {
  checkbox.addEventListener("change", function (e) {
    if (e.target.checked) {
      optionValues.push(e.target.value); 
    } else {
      optionValues = optionValues.filter((value) => value !== e.target.value);
    }
  });
});


document.querySelector("body").addEventListener("change", generatePassword);


function generatePassword() {
  let characterSet = [];

  
  if (optionValues.includes("lowercase"))
    characterSet = characterSet.concat(lower_alphabets);
  if (optionValues.includes("uppercase"))
    characterSet = characterSet.concat(alphabets);
  if (optionValues.includes("number"))
    characterSet = characterSet.concat(numbers);
  if (optionValues.includes("special-character"))
    characterSet = characterSet.concat(specialCharacters);


  if (characterSet.length === 0) {
    alert("No options selected!");
    return;
  }

  let password = "";
  const display = document.querySelector(".display p");


  let index = 0;
  function displayCharacter() {
    if (index < lengthPassword) {
      let randomIndex = Math.floor(Math.random() * characterSet.length);
      password += characterSet[randomIndex];
      display.innerText = password; 
      index++;
      setTimeout(displayCharacter, 150); 
    }
  }


  displayCharacter();
}
