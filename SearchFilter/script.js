const logo = document.querySelector('.logo h1');
// console.log(logo);
const words = logo.innerText.split('').map((letter,index) =>`<span class="letter${index}">${letter}</span>`).join('');
// console.log(words); 
logo.innerHTML = words;


const spanLogo = document.querySelectorAll('.logo h1 span');
// console.log(spanLogo);
const colors = ['#E54336','#F5B804',"#34A353","#4280EF","purple"];
spanLogo.forEach(function (e,index) {
    e.style.color = colors[index]
});
function updateText() {
    var text = document.getElementById("search").value;
    // console.log(text);
}