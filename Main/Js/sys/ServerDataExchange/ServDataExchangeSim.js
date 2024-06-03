import {trendSetpoints, meterSetting} from "../GlobalConst.js";
import {StorageCtrl} from "../StorageCtrl.js";
import {ServerDataExchange} from "./ServerDataExchange.js";
import {defSimTreeData} from "./defSimTreeData.js";

//Singleton класс
export class ServDataExchangeSim{
    #TREE_DATA_SORAGE_NAME='treeDataLocStorageName';
    #NO_CHANGES=ServerDataExchange.NO_CHANGES;
    #ERR_NAMEALREADYEXIST=ServerDataExchange.ERR_NAMEALREADYEXIST;
    #TIME_DELAY=500;

    //структура симулированного обмена данными
    #simDataFromServer={
        xPoints: [],
        trends:[
            {name: trendSetpoints[0].name,
            label: trendSetpoints[0].label,
            points:[]},
            {name: trendSetpoints[1].name,
            label: trendSetpoints[1].label,
            points:[]},
            {name: trendSetpoints[2].name,
            label: trendSetpoints[2].label,
            points:[]},
            {name: trendSetpoints[3].name,
            label: trendSetpoints[3].label,
            points:[]},
            {name: trendSetpoints[4].name,
            label: trendSetpoints[4].label,
            points:[]},
            {name: trendSetpoints[5].name,
            label: trendSetpoints[5].label,
            points:[]},
            {name: trendSetpoints[6].name,
            label: trendSetpoints[6].label,
            points:[]},
            {name: trendSetpoints[7].name,
            label: trendSetpoints[7].label,
            points:[]},
            {name: trendSetpoints[8].name,
            label: trendSetpoints[8].label,
            points:[]},
            {name: trendSetpoints[9].name,
            label: trendSetpoints[9].label,
            points:[]},
            {name: trendSetpoints[10].name,
            label: trendSetpoints[10].label,
            points:[]},
            {name: trendSetpoints[11].name,
            label: trendSetpoints[11].label,
            points:[]},
            {name: trendSetpoints[12].name,
            label: trendSetpoints[12].label,
            points:[]},
            {name: trendSetpoints[13].name,
            label: trendSetpoints[13].label,
            points:[]},
            {name: trendSetpoints[14].name,
            label: trendSetpoints[14].label,
            points:[]},
            {name: trendSetpoints[15].name,
            label: trendSetpoints[15].label,
            points:[]},
            {name: trendSetpoints[16].name,
            label: trendSetpoints[16].label,
            points:[]},
            {name: trendSetpoints[17].name,
            label: trendSetpoints[17].label,
            points:[]},
            {name: trendSetpoints[18].name,
            label: trendSetpoints[18].label,
            points:[]},
            {name: trendSetpoints[19].name,
            label: trendSetpoints[19].label,
            points:[]},
            {name: trendSetpoints[20].name,
            label: trendSetpoints[20].label,
            points:[]},
            {name: trendSetpoints[21].name,
            label: trendSetpoints[21].label,
            points:[]},
            {name: trendSetpoints[22].name,
            label: trendSetpoints[22].label,
            points:[]},
            {name: trendSetpoints[23].name,
            label: trendSetpoints[23].label,
            points:[]},
            {name: trendSetpoints[24].name,
            label: trendSetpoints[24].label,
            points:[]},
            {name: trendSetpoints[25].name,
            label: trendSetpoints[25].label,
            points:[]},
            ]
    }

    //данные по предыдущему симулированному обменну данных
    #simPrevExchangeTimeStamps=[];

    //уровень генерации случайных чисел в симулированных данных
    #simTrendRndLevles=[80, 82, 78, //ток
        400, 380, 420, //фазное напряжение
        405, 385, 425, //линейное
        1079, 1024, 978, 1236, //активная мощность
        1579, 1524, 1478,1736, //полная мощность
        500, 500,500,500, //реактивная мощность
        50, //частота
        0.5,0.5, 0.5, 0.5 //cos фи
    ]

    //уровень отклонения случайных чисел в сим. даных
    #simTrendRndDisturbance=[
        21, 21, 21, //ток
        21, 21, 21, //фазное напряжение
        21,21,21, //линейное
        21, 21, 21,21, //активная мощность
        21,21,21,21, // полная мощность
        21,21,21,21, //реактивная мощность
        1, //частота
        0.2, 0.2, 0.2, 0.2 //cos фи
    ]

    //конструктор
    constructor(){
        if(typeof ServDataExchangeSim.instance==='object'){return ServDataExchangeSim.instance;}
        ServDataExchangeSim.instance=this;
        return this;
    }

    //получить данные по структуре дерева
    getTreeStructureData=()=>{
        return new Promise((resolve, reject)=>{
            let result;
    
            //имитируем задержку, необходимую для загрузки данных
            setTimeout(()=>{
                //функция создания данных
    
                //функция добавления стандартныйх настроек счетчика во все объекты
                let addMeterSettingsF=function(items){
                    for(let item of items){
                        if('folders' in item && item.folders.length>0){
                            addMeterSettingsF(item.folders);
                        }

                        if('meters' in item){
                            for(let meter of item.meters){
                                if(!('meterSettings' in meter) ){meter.meterSettings=meterSetting;}
                            }
                        }
                            
                    }
                }
                //делаем запрос из локальной сессии
                result=StorageCtrl.getItem(this.#TREE_DATA_SORAGE_NAME);
                //если данных в сессии нет
                if(!(result instanceof Object)){
                    result= defSimTreeData;

                    //добавляем стандартные настройки счетчика. только для сохранения в локальной памяти
                    let resultWithMeterSettings=JSON.parse(JSON.stringify(result));
                    addMeterSettingsF(resultWithMeterSettings);

                    //сохраняем данные в локальной сессии
                    StorageCtrl.setItem(this.#TREE_DATA_SORAGE_NAME, resultWithMeterSettings);
                }
    
                resolve(result);
                
            }, this.#TIME_DELAY)
         
        })
    }
    

    //получить настройки счетчика
    #getMeterSettingsPure=(id)=>{
        let result;

        //делаем запрос из локальной сессии
        let treeData=StorageCtrl.getItem(this.#TREE_DATA_SORAGE_NAME);
        //поиск объекта
        let foundResult=this.#getItemOnServer(id,treeData, true);
        //поиск настроек в объекте
        if('meterSettings' in foundResult.item){
            result=foundResult.item.meterSettings;
        }else{
            result=meterSetting;
        }
        //дополнительные даннные
        result.name=foundResult.item.text;

        return result;

    }

    getMeterSettings=(id)=>{
        return new Promise((resolve, reject)=>{
            let result;

            //имитируем задержку, необходимую для загрузки данных
            setTimeout(()=>{

                result=this.#getMeterSettingsPure(id);

                resolve(result);
        
            }, this.#TIME_DELAY)
        }) 
    }

    //получить данные по графику
    getChartData=(meterId,timeRange)=>{
        return new Promise((resolve, reject)=>{
            let result;

            //имитируем задержку, необходимую для загрузки данных
            setTimeout(()=>{
                let LenghtRange=0;
                let startTime, startTimeUnix;
                let endTime;

                let currentTime=new Date()
                let prevTimeStamp={meterId:meterId, timeStamp: new Date(0)};
                let dataExchangePeriod=0;
                let timeDiff=0;
                let timeIntervalReached=false;
                    
                //------тип заданного диапазона
                switch (timeRange.type.toString()) {
                    case '1'://начальное+временный диапазон
                        startTime=timeRange.firstValue;
                        startTimeUnix=new Date(timeRange.firstValue).getTime();

                        LenghtRange=(timeRange.secondValue[0]*timeRange.secondValue[1])/1000; 
                        endTime=new Date(startTimeUnix+LenghtRange);

                        break;
                    case '2': //начальное/конечное время
                        startTime=timeRange.firstValue;
                        startTimeUnix=new Date(timeRange.firstValue).getTime();
                        

                        endTime=timeRange.secondValue;
                        LenghtRange=(new Date(timeRange.secondValue).getTime()-startTimeUnix)/1000; 
                        break;
                }

                //------получаем данные по счетчику
                let meterSettingsData=this.#getMeterSettingsPure(meterId);

                //------предыдущая временная метка
                //ищем или создаем временную метку предыдущих данных
                let timeStampFound=false;
                for(let simPrevExchangeTimeStamp of this.#simPrevExchangeTimeStamps){
                    if(simPrevExchangeTimeStamp.meterId==meterId){
                        prevTimeStamp=simPrevExchangeTimeStamp;
                        timeStampFound=true;
                    }
                }

                if(!timeStampFound){
                    this.#simPrevExchangeTimeStamps.push(prevTimeStamp);
                }
                
                //определяем прошло ли соответсвующее время
                timeDiff=currentTime.getTime()-prevTimeStamp.timeStamp.getTime();
                dataExchangePeriod=meterSettingsData.exchangeTimeValue*meterSettingsData.exchangeTimeType;
                timeIntervalReached=timeDiff>=dataExchangePeriod;
                
                //обновляем временную метку
                if(timeIntervalReached){
                    prevTimeStamp.timeStamp=currentTime;
                    
                }

                
                //-----формируем значения
                if(timeIntervalReached){
                    if(LenghtRange*1000<dataExchangePeriod){
                        LenghtRange=1;
                    }
                    //цикл опроса счетчика завершен
                    if(this.#simDataFromServer.xPoints[this.#simDataFromServer.xPoints.length - 1]!=endTime){
                        //обнуляем массив временных меток
                        this.#simDataFromServer.xPoints=[];
                        //обнуляем массив значений по каждому тренду
                        for(let i=0; i< this.#simDataFromServer.trends.length; i++){
                            this.#simDataFromServer.trends[i].points=[];
                        }

                        //добавляем значения
                        for (let i = 0; i < LenghtRange; i++) {

                            //добавляем временнные метки
                            currentTime.setTime(startTimeUnix+i*1000);
                            this.#simDataFromServer.xPoints[i]=currentTime.getTime();

                            //добавляем значения
                            for(let trendSetpoint of trendSetpoints){
                                for(let sti=0; sti<this.#simDataFromServer.trends.length; sti++){
                                    if(this.#simDataFromServer.trends[sti].name==trendSetpoint.name){
                                        //если опрос счетчика активирован
                                        if(meterSettingsData.dataExchange[sti].active){
                                            this.#simDataFromServer.trends[sti].points[i]=
                                            Math.random() * this.#simTrendRndDisturbance[sti] + this.#simTrendRndLevles[sti];
                                        //если опрос счетчика не активирован
                                        }else{
                                            this.#simDataFromServer.trends[sti].points[i]=0;
                                        }
                                        
                                    }
                                }
                            }
                        }
                        
                    }
                
                    result=this.#simDataFromServer;
                }
                //цикл опроса счетчика не завершен
                else{
                    result=this.#NO_CHANGES; 
                }

                //результат Promise
                resolve(result);

            }, this.#TIME_DELAY);       
        })
        
    }

    //добавить в струкутуру дерева данные элкемента
    addItem=(data)=>{
        return new Promise((resolve, reject)=>{
            let response={done:false, err:false, errDescription:''};

            //имитируем задержку, необходимую для загрузки данных
            setTimeout(()=>{
                let newItem={};
    
                //делаем запрос из локальной сессии
                let treeData=StorageCtrl.getItem(this.#TREE_DATA_SORAGE_NAME);
                //поиск папки
                let foundResult;
                let foundItem;
                if(data.id!='/'){
                    foundResult=this.#getItemOnServer(data.id,treeData, false);
                    if(data.meter){
                        foundItem=foundResult.item.meters;
                    }else{
                        foundItem=foundResult.item.folders;
                    }
                    
                }else{
                    foundItem=treeData;
                }
        
                //проверяем ошибки такого же имени
                let nameExist=false;
                for(let item of foundItem){
                    if(item.name==data.name){
                        nameExist=true;
                        response.err=true;
                        response.errDescription=this.#ERR_NAMEALREADYEXIST;
                        break;
                    }
                }
        
                if(!nameExist){
                    //определение Id
                            
                    newItem.id=this.#getFreeIdOnServer(treeData,data.meter);
                    newItem.id=newItem.id.toString();
        
                    //определение текста
                    newItem.name=data.name;
        
                    //добавление атрибутов папки
                    if(!data.meter){
                        newItem.folders=[];
                        newItem.meters=[];
                    }        
                    //добавляем данные настройки счетчика
                    else{
                        newItem.meterSettings=data.meterSettings;
                    }
        
                    //интегрируем в данные дерева и сохраняем локальной сессии
                    foundItem.push(newItem);
                    StorageCtrl.setItem(this.#TREE_DATA_SORAGE_NAME, treeData);
                    
                    //статус выполнения 
                    response.done=true
        
                }
                    
                resolve(response);

            }, this.#TIME_DELAY)
        
            
        })
       
    }

    //удалить из струкутуры дерева данные элемента
    deleteItem=(data)=>{
        return new Promise((resolve, reject)=>{
             //имитируем задержку, необходимую для загрузки данных
             setTimeout(()=>{
                //делаем запрос из локальной сессии
                let treeData=StorageCtrl.getItem(this.#TREE_DATA_SORAGE_NAME);

                //поиск элементов
                let foundResult=this.#getItemOnServer(data.id,treeData, data.meter);

                //
                let targetFolder;
                if(foundResult.targetFolder!=treeData){
                    if(data.meter){
                        targetFolder=foundResult.targetFolder.meters;
                    }else{
                        targetFolder=foundResult.targetFolder.folders;
                    }
                    
                }else{
                    targetFolder=foundResult.targetFolder;
                }

                //поиск элемента и его удаление
                let i=0;

                for(let folderItem of targetFolder){
                    if(folderItem.id==foundResult.item.id){
                        //удаляем
                        targetFolder.splice(i, 1)
                        //сохраняем локальной сессии
                        StorageCtrl.setItem(this.#TREE_DATA_SORAGE_NAME, treeData);
                        break;
                        
                    }
                    i++;
                }

                resolve();

             }, this.#TIME_DELAY)
        })
        
        
        
    }

    //переименовать папку или счетчик
    renameItem=(data)=>{
        return new Promise((resolve, reject)=>{
            //имитируем задержку, необходимую для загрузки данных
            setTimeout(()=>{
                let response={done:false, err:false, errDescription:''};
        
                //делаем запрос из локальной сессии
                let treeData=StorageCtrl.getItem(this.#TREE_DATA_SORAGE_NAME);
                //поиск объекта
                let foundResult=this.#getItemOnServer(data.id,treeData, data.meter);

                //
                let targetFolder;
                if(foundResult.targetFolder!=treeData){
                    if(data.meter){
                        targetFolder=foundResult.targetFolder.meters;
                    }else{
                        targetFolder=foundResult.targetFolder.folders;
                    }
                    
                }else{
                    targetFolder=foundResult.targetFolder;
                }

                //проверяем ошибки такого же имени
                let nameExist=false;
                for(let item of targetFolder){
                    if(item.name==data.name ){
                        nameExist=true;
                        response.err=true;
                        response.errDescription=this.#ERR_NAMEALREADYEXIST;
                        break;
                    }
                }

                if(!nameExist){
                    //устанавливаем новое имя объекта
                    foundResult.item.name=data.name;

                    //записываем данные обратно в сессию
                    StorageCtrl.setItem(this.#TREE_DATA_SORAGE_NAME, treeData);
                
                    //статус выполнения 
                    response.done=true;
                }
                    
                resolve( response);

            }, this.#TIME_DELAY)
        })
        
    }

    //изменить настройки счетчика
    setMeterSettings=(data)=>{
        return new Promise((resolve, reject)=>{
            //имитируем задержку, необходимую для загрузки данных
            setTimeout(()=>{
                let response={done:false, err:false, errDescription:''};

                //делаем запрос из локальной сессии
                let treeData=StorageCtrl.getItem(this.#TREE_DATA_SORAGE_NAME);
                //поиск объекта
                let foundResult=this.#getItemOnServer(data.id,treeData,true);

                //проверяем ошибки такого же имени
                let nameExist=false;
                for(let item of foundResult.targetFolder.meters){
                    if(item.name==data.name && item.id!=foundResult.item.id){
                        nameExist=true;
                        response.err=true;
                        response.errDescription=this.#ERR_NAMEALREADYEXIST;
                        break;
                    }
                }

                if(!nameExist){
                    //изменение имени
                    foundResult.item.name=data.name;
                    //изменение настроек
                    foundResult.item.meterSettings=data.meterSettings;
                    //сохраняем локальной сессии
                        StorageCtrl.setItem(this.#TREE_DATA_SORAGE_NAME, treeData);
                    //статус выполнения 
                    response.done=true;
                }
                    
                resolve(response);
                
            }, this.#TIME_DELAY)
        })
        
    }

    //найти требуемый элемент на сервере
    #getItemOnServer=function(id, treeData, meterTarget){

        let result;


        //функция поиск счетчиков
        let findItem_Internal=(meterTarget=true, startFolder, isRoot=false)=>{
            let result={itemFounded:false,item:undefined,targetFolder:undefined};
            
            //простой поиск счетчиков
            if(meterTarget && 'meters' in startFolder && startFolder.meters.length>0){
                for(let meter of startFolder.meters){
                    if(meter.id==id){
                        result.itemFounded=true;
                        result.item=meter;
                        result.targetFolder=startFolder;
                        break;
                    }
                }
            }

            //простой поиск папок
            if(!meterTarget){

                let startFolderAndRoot;
                if(isRoot){startFolderAndRoot=startFolder;}
                else{startFolderAndRoot=startFolder.folders;}

                for(let folder of startFolderAndRoot){
                    if(folder.id==id){
                        result.itemFounded=true;
                        result.item=folder;
                        result.targetFolder=startFolder;
                        break;
                    }
                }
            }

            //поиск счетчиков по папкам
            if(!result.itemFounded){
                let foundItemResult;
                let targetFolder;
                let searchingActive=false;

                //определяем поиск в корневой папке
                if (isRoot){
                    targetFolder=startFolder;
                    searchingActive=true;
                }
                    //определяем поиск во вложенной папке
                else{
                    targetFolder=startFolder.folders;
                    searchingActive=targetFolder.length>0;
                }

                if(searchingActive){
                    //поиск
                    for(let folder of targetFolder){
                        foundItemResult=findItem_Internal(meterTarget,folder, false);

                        if(foundItemResult.itemFounded){
                            result.itemFounded=true;
                            result.item=foundItemResult.item;
                            result.targetFolder=foundItemResult.targetFolder;
                            break;
                        }
                    }
                }
                
            }
            
            //
            return result;
        }

        result=findItem_Internal(meterTarget, treeData, true);        

        //возврат результатов
        return {item:result.item, targetFolder:result.targetFolder};
    }

    //найти свободный id на сервере
    #getFreeIdOnServer=(treeData, meterTarget)=>{
        let result;
        let getItemResult;
        for(let id=1; id<=10000; id++){
            getItemResult=this.#getItemOnServer(id,treeData,meterTarget);
            if(getItemResult.item==undefined){
                result=id;
                break;
            }
        }

        return result;
    }
    

}

