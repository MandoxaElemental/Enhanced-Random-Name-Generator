import { saveToLocalStorageByName, getLocalStorage, removeFromLocalStorage } from "./localStorage.js";

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
let UserInput = document.getElementById('nameInput')
let NameBtn = document.getElementById('nameBtn')
let NameList = document.getElementById('nameList')
let TeamBtn = document.getElementById('teamBtn')
let TeamList = document.getElementById('teamList')
let RandomBtn = document.getElementById('randomBtn')
let RandomName = document.getElementById('randomName')
let GroupGenerator = document.getElementById('groupGenerator')
let Back = document.getElementById('back')
let Summon = document.getElementById('summonAudio')
let Remove = document.getElementById('removeAudio')
let Group = document.getElementById('groupAudio')
let Random = document.getElementById('randomAudio')
let SwitchInput = document.getElementById('switchInput')
let MyBool = false

SwitchInput.addEventListener('click', function() {
    if(document.getElementById("switchInput").checked === true){
        MyBool = true
    } else {
        MyBool = false
    }
});

NameBtn.addEventListener('click', function() {
    let nameInput = UserInput.value;
    UserInput.value = '';
    saveToLocalStorageByName(nameInput); 
    createElements();
    Summon.play();
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
        let div1 = document.createElement('div')
        let div2 = document.createElement('div')
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
            Remove.play();
        });

        div1.appendChild(p)
        div2.appendChild(deletebtn)
        newDiv.appendChild(div1)
        newDiv.appendChild(div2)
        NameList.appendChild(newDiv);
    });
};

createElements();

function shuffleElements(){
    let groupNum = 0;
    TeamList.innerHTML=''
    let newArr = getLocalStorage();
    for (let i = newArr.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1));
        const temp = newArr[i];
        newArr[i] = newArr[j];
        newArr[j] = temp;
    }

    if(MyBool === true){
        let division = (newArr.length/slider.value)
        groupNum = Math.ceil(division)
    } else {
        groupNum = Math.ceil(slider.value)
    }

    let chunkSize = groupNum;
    let chunks = [];

    for (let k = 0; k < newArr.length; k += chunkSize) {
    let chunk = [];
    for (let l = k; l < k + chunkSize && l < newArr.length; l++) {
        chunk.push(newArr[l]);
    }
        chunks.push(chunk);
    }

let counter = 1
for (let i=0; i<chunks.length; i++){
    let group = document.createElement('p');
    group.innerHTML = `Group ${counter}: ${chunks[i].join(" - ")}`
    TeamList.appendChild(group)
    counter++
}
}

TeamBtn.addEventListener('click', function() {
    GroupGenerator.className = 'groupGenerator fadeIn'
    shuffleElements()
    Group.play();
});
Back.addEventListener('click', function() {
    GroupGenerator.className = 'hidden'
});

function getRandomName(){
    let randomArr = getLocalStorage();
    let randomIndex = Math.floor(Math.random() * randomArr.length);
    RandomName.innerText = randomArr[randomIndex];
}
RandomBtn.addEventListener('click', function() {
    getRandomName()
    Random.play()
});
getRandomName()