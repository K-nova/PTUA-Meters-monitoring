//глобальные переменные
const projectId='PTUA_MeterMon';


//----------
//считывание данных из JSON
export function getFileSity(fileName){
    let  request = new XMLHttpRequest();
    request.open('GET', fileName, false);
    request.send(null);
    return  JSON.parse(request.responseText);
}

//функция добавления префикса id проекта в имя локальной переменной
export function locStorName(propertyName){
    let result=projectId+'_'+propertyName;
    return result;
}

//-------
//проверка, что данные являются JSON
export function isJSON(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}

//---------
//установить экран в Main
export function SetMCPage(Page){
    let Main=document.getElementById("Main");
    Main.src=Page;
}

