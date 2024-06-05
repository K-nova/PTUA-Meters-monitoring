export class StorageCtrl{
    static #SESSION=false;//режим хранения данных в сессии
    static #PROJECT_ID='PTUA_MeterMon';
    static #DEFAULT_PARAMETERS={
        isJSON:true, 
        versionCtrl: false,
        version: '1'
    };

    //получить данные из хранилища
    static getItem=(locStorName='', parameters=this.#DEFAULT_PARAMETERS )=>{
        let result={version:'', versionIsActual:false, content:undefined};
        let fullLocStorName=this.#locStorName(locStorName);

        //чтение из хранилищ
        if(this.#SESSION){result.content=sessionStorage.getItem(fullLocStorName);}
        else{result.content=localStorage.getItem(fullLocStorName);}

        //обработка данных, если активен контроль версий
        if(parameters.versionCtrl){
            let resultWithVersion=JSON.parse(result.content);
            if(!(('version' in resultWithVersion) && ('content' in resultWithVersion))){
                result.content=resultWithVersion;
                result.version=false;
                result.versionIsActual=false;
            }else{
                result=resultWithVersion;
                result.versionIsActual=(result.version===parameters.version);
            }
        }

        //обработка JSON
        if(parameters.isJSON && !parameters.versionCtrl){
            result.content=JSON.parse(result.content);
        }

        if(parameters.versionCtrl){return result;}
        else{return result.content;}
    }

    //изменить данные в хранилище
    static setItem=(locStorName='', data, parameters=this.#DEFAULT_PARAMETERS )=>{
        let dataToStorage={version:'', content:undefined};
        let fullLocStorName=this.#locStorName(locStorName);

        //обработка JSON
        if(parameters.isJSON && !parameters.versionCtrl){dataToStorage.content=JSON.stringify(data);}
        else{dataToStorage.content=data;}

        //обработка данных, если активен контроль версий
        if(parameters.versionCtrl){
            dataToStorage.version=parameters.version;
            dataToStorage=JSON.stringify(dataToStorage);
        }else{
            dataToStorage=dataToStorage.content;
        }
        //запись в хранилище
        if(this.#SESSION){sessionStorage.setItem(fullLocStorName,dataToStorage);}
        else{localStorage.setItem(fullLocStorName,dataToStorage);}

    }

    static #locStorName(propertyName){
        let result=this.#PROJECT_ID+'_'+propertyName;
        return result;
    }

}
