import { saveToLocalStorageByName, getLocalStorage, removeFromLocalStorage } from "./localStorage.js";

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
let UserInput = document.getElementById('nameInput')
let NameBtn = document.getElementById('nameBtn')
let NameList = document.getElementById('nameList')
let TeamBtn = document.getElementById('teamBtn')
let TeamList = document.getElementById('teamList')
let GroupGenerator = document.getElementById('groupGenerator')
let Back = document.getElementById('back')

NameBtn.addEventListener('click', function() {
    let nameInput = UserInput.value;
    UserInput.value = '';
    saveToLocalStorageByName(nameInput); 
    createElements();
});

output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}

function createElements() {
    let listNames = getLocalStorage();
	NameList.innerHTML= "";

    listNames.map(names => {
        let newDiv = document.createElement('div')
        newDiv.className = 'nameGrid fadeIn'
        let p = document.createElement('p');
        p.className = "Name";
        p.textContent = names;

        let deletebtn = document.createElement('button');
        deletebtn.type = 'button';
        deletebtn.className = "delete";
        deletebtn.textContent = "Delete";

        deletebtn.addEventListener('click', function () {
            removeFromLocalStorage(names);
            newDiv.remove();
        });

        newDiv.appendChild(p)
        newDiv.appendChild(deletebtn)
        NameList.appendChild(newDiv);
    });
};

createElements();

function shuffleElements(){
    TeamList.innerHTML=''
    let newArr = getLocalStorage();
    for (let i = newArr.length - 1; i > 0; i--) { 
        
        const j = Math.floor(Math.random() * (i + 1));
        
        const temp = newArr[i];
        newArr[i] = newArr[j];
        newArr[j] = temp;
    }
    console.log(newArr)
    let division = (newArr.length/slider.value)
    let groupNum = Math.ceil(division)
    console.log(groupNum)

    let chunkSize = groupNum;

let chunks = [];

for (let i = 0; i < newArr.length; i += chunkSize) {
    let chunk = [];
    for (let j = i; j < i + chunkSize && j < newArr.length; j++) {
        chunk.push(newArr[j]);
    }
    chunks.push(chunk);
}
console.log(chunks)

let counter = 1
for (let i=0; i<chunks.length; i++){
    console.log(chunks[i])
    let group = document.createElement('p');
    group.innerHTML = `Group ${counter} - ${chunks[i].join(" - ")}`
    TeamList.appendChild(group)
    counter++
}
}

TeamBtn.addEventListener('click', function() {
    GroupGenerator.className = 'groupGenerator fadeIn'
    shuffleElements()
});
Back.addEventListener('click', function() {
    GroupGenerator.className = 'hidden'
});