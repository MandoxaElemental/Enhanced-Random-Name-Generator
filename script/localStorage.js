function saveToLocalStorageByName(name) {
    let namesArr = getLocalStorage();
        if (!namesArr.includes(name)) {
            namesArr.push(name);
        }
    localStorage.setItem('Names', JSON.stringify(namesArr));
}

function getLocalStorage(){
    let localStorageData = localStorage.getItem('Names');
        if (localStorageData == null) {
            return [];
        }
        return JSON.parse(localStorageData);
}

function removeFromLocalStorage(name){
    let namesArr = getLocalStorage();
    let nameindex = namesArr.indexOf(name);
    namesArr.splice(nameindex, 1);
    localStorage.setItem('Names', JSON.stringify(namesArr));
}

export{saveToLocalStorageByName, getLocalStorage, removeFromLocalStorage }