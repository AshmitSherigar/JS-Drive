const logo = document.querySelector('.logo h1');
// console.log(logo);
const words = logo.innerText.split('').map((letter, index) => `<span class="letter${index}">${letter}</span>`).join('');
// console.log(words); 
logo.innerHTML = words;


const spanLogo = document.querySelectorAll('.logo h1 span');
// console.log(spanLogo);
const colors = ['#E54336', '#F5B804', "#34A353", "#4280EF", "purple"];
spanLogo.forEach(function (e, index) {
    e.style.color = colors[index]
});

const ul = document.querySelector(".display-area ul")

const items = [
    { Name: "EvoFox Mouse", category: "Electronics", description: "Lorem ipsum dolor sit amet." },
    { Name: "Car Freshner", category: "Car & Bike", description: "Lorem ipsum dolor sit amet." },
    { Name: "Cosmic Byte Keyboard", category: "Electronics", description: "Lorem ipsum dolor sit amet." },
    { Name: "Fresh Tomato", category: "Healthy Produce", description: "Lorem ipsum dolor sit amet." },
    { Name: "Remote Control Toy", category: "Toy & Game", description: "Lorem ipsum dolor sit amet." },
    { Name: "Cleaning Slime", category: "Car & Bike", description: "Lorem ipsum dolor sit amet." },
    { Name: "Wireless Earbuds", category: "Electronics", description: "Lorem ipsum dolor sit amet." },
    { Name: "Organic Honey", category: "Healthy Produce", description: "Lorem ipsum dolor sit amet." },
    { Name: "Gaming Chair", category: "Furniture", description: "Lorem ipsum dolor sit amet." },
    { Name: "Running Shoes", category: "Sports & Fitness", description: "Lorem ipsum dolor sit amet." },
    { Name: "Camping Tent", category: "Outdoor & Adventure", description: "Lorem ipsum dolor sit amet." },
    { Name: "Board Game - Monopoly", category: "Toy & Game", description: "Lorem ipsum dolor sit amet." },
];

function filteredContent(items, text) {
    const filtered_array = items.filter((element) => {
        return element.Name.toLowerCase().includes(text.toLowerCase());
    });
    return filtered_array

}
function displayCard(required_list, text) {
    ul.innerHTML = "";

    if (required_list.length == 0) {
        const div = document.createElement("div")
        div.className = 'error'
        const h1 = document.createElement("h1")
        const p = document.createElement('p')
        h1.innerHTML = `No Product Found<span class="material-symbols-outlined">error</span > `
        p.innerText = "Contact the Team For Further Help"
        div.appendChild(h1)
        div.appendChild(p)
        ul.appendChild(div)

    }
    required_list.forEach(e => {
        const li = document.createElement("li");
        li.innerHTML = `
                    <div class="card">
                        <h1>${e.Name}</h1>
                        <h4>${e.category}</h4>
                        <p>${e.description}</p>
                    </div>`;
        ul.appendChild(li);
    });
    if (text == '') {
        ul.innerHTML = ''
    }
}

function updateText() {

    var text = document.getElementById("search").value.trim();
    let required_list = filteredContent(items, text)

    displayCard(required_list, text)

}

var colorState = true
function switchTheme() {
    colorState = !colorState
    document.querySelector("body").style.backgroundColor = colorState ? " #f7f7f7" : "rgb(48, 47, 47)";
    // document.querySelector(".error").style.backgroundColor = colorState ? " #f7f7f7" : "rgb(48, 47, 47)";

    document.body.classList.toggle("dark-mode")
}

const switchText = document.querySelector('.nav .nav-content1 #switch')
// console.log(switchText);
switchText.addEventListener("click", switchTheme)
