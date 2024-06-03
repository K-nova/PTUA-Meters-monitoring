export class StorageCtrl{
    static #SESSION=true;//режим хранения данных в сессии
    static #PROJECT_ID='PTUA_MeterMon';

    static getItem=(locStorName='', isJSON=true)=>{
        let result;
        let fullLocStorName=this.#locStorName(locStorName);

        //чтение из хранилищ
        if(this.#SESSION){result=sessionStorage.getItem(fullLocStorName);}
        else{result=localStorage.getItem(fullLocStorName);}

        //обработка JSON
        if(isJSON){
            result=JSON.parse(result);
        }

        return result;
    }

    static setItem=(locStorName='', data, isJSON=true)=>{
        let dataToStorage;
        let fullLocStorName=this.#locStorName(locStorName);

        //обработка JSON
        if(isJSON){dataToStorage=JSON.stringify(data);}
        else{dataToStorage=data;}

        //запись в хранилище
        if(this.#SESSION){sessionStorage.setItem(fullLocStorName,dataToStorage);}
        else{localStorage.setItem(fullLocStorName,dataToStorage);}

    }

    static #locStorName(propertyName){
        let result=this.#PROJECT_ID+'_'+propertyName;
        return result;
    }
}

