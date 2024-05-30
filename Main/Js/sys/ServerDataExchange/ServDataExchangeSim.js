import {trendSetpoints, meterSetting} from "../GlobalConst.js";
import {locStorName} from "../Functions.js";
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
                        if('children' in item){
                            addMeterSettingsF(item.children);
                        }else{
                            if(!('meterSettings' in item) && (item.type!='folder')){
                                item.meterSettings=meterSetting;
                            }
                        }
                    }
                }
                //делаем запрос из локальной сессии
                result=JSON.parse(sessionStorage.getItem(locStorName(this.#TREE_DATA_SORAGE_NAME)));
                //если данных в сессии нет
                if(!(result instanceof Object)){
                    result= defSimTreeData;
                    //добавляем стандартные настройки счетчика
                    addMeterSettingsF(result);
                    //сохраняем данные в локальной сессии
                    sessionStorage.setItem(locStorName(this.#TREE_DATA_SORAGE_NAME),JSON.stringify(result) );
                }
    
                resolve(result);
                
            }, this.#TIME_DELAY)
         
        })
    }
    

    //получить настройки счетчика
    #getMeterSettingsPure=(idPath)=>{
        let result;

        //делаем запрос из локальной сессии
        let treeData=JSON.parse(sessionStorage.getItem(locStorName(this.#TREE_DATA_SORAGE_NAME)));
        //поиск объекта
        let foundResult=this.#findItem(idPath,treeData);
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

    getMeterSettings=(idPath)=>{
        return new Promise((resolve, reject)=>{
            let result;

            //имитируем задержку, необходимую для загрузки данных
            setTimeout(()=>{

                result=this.#getMeterSettingsPure(idPath);

                resolve(result);
        
            }, this.#TIME_DELAY)
        }) 
    }

    

    //получить данные по графику
    getChartData=(idPath,timeRange)=>{
        return new Promise((resolve, reject)=>{
            let result;

            //имитируем задержку, необходимую для загрузки данных
            setTimeout(()=>{
                let LenghtRange=0;
                let startTime, startTimeUnix;
                let endTime;

                let currentTime=new Date()
                let prevTimeStamp={idPath:idPath, timeStamp: new Date(0)};
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
                let meterSettingsData=this.#getMeterSettingsPure(idPath);

                //------предыдущая временная метка
                //ищем или создаем временную метку предыдущих данных
                let timeStampFound=false;
                for(let simPrevExchangeTimeStamp of this.#simPrevExchangeTimeStamps){
                    if(simPrevExchangeTimeStamp.idPath==idPath){
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
                let treeData=JSON.parse(sessionStorage.getItem(locStorName(this.#TREE_DATA_SORAGE_NAME)));
                //поиск папки
                let foundResult=this.#findItem(data.idPath,treeData);
                let foundItem;
                if(foundResult.item!=undefined){
                    if('children' in foundResult.item){
                        foundItem=foundResult.item.children;
                    }else{
                        foundResult.item.children=[];
                        foundItem=foundResult.item.children;
                    }
                    
                }else{
                    foundItem=foundResult.targetFolder;
                }
                //проверяем ошибки такого же имени
                let nameExist=false;
                for(let item of foundItem){
                    if(item.text==data.text){
                        nameExist=true;
                        response.err=true;
                        response.errDescription=this.#ERR_NAMEALREADYEXIST;
                        break;
                    }
                }
        
                if(!nameExist){
                    //определение Id
                    let idArr=[];
                    for(let item of foundItem){
                        idArr.push(Number(item.id));
                    }
        
                    newItem.id=Math.max(...idArr)+1;
                    newItem.id=newItem.id.toString();
        
                    //определение текста
                    newItem.text=data.text;
        
                    //определение типа
                    newItem.type=data.type;
        
                    //добавляем данные настройки счетчика
                    newItem.meterSettings=data.meterSettings;
        
                    //интегрируем в данные дерева и сохраняем локальной сессии
                    foundItem.push(newItem);
                    sessionStorage.setItem(locStorName(this.#TREE_DATA_SORAGE_NAME),JSON.stringify(treeData) );
                    
                    //статус выполнения 
                    response.done=true
        
                }
                    
                resolve(response);

            }, this.#TIME_DELAY)
        
            
        })
       
    }

    //удалить из струкутуры дерева данные элемента
    deleteItem=(idPath)=>{
        return new Promise((resolve, reject)=>{
             //имитируем задержку, необходимую для загрузки данных
             setTimeout(()=>{
                //делаем запрос из локальной сессии
                let treeData=JSON.parse(sessionStorage.getItem(locStorName(this.#TREE_DATA_SORAGE_NAME)));

                //поиск элементов
                let foundResult=this.#findItem(idPath,treeData);

                //поиск счетчика и его удаление
                let i=0;
                for(let folderItem of foundResult.targetFolder){
                    if(folderItem.id==foundResult.item.id){
                        //удаляем
                        foundResult.targetFolder.splice(i, 1)
                        //сохраняем локальной сессии
                        sessionStorage.setItem(locStorName(this.#TREE_DATA_SORAGE_NAME),JSON.stringify(treeData) );
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
                let treeData=JSON.parse(sessionStorage.getItem(locStorName(this.#TREE_DATA_SORAGE_NAME)));
                //поиск объекта
                let foundResult=this.#findItem(data.idPath,treeData);

                //проверяем ошибки такого же имени
                let nameExist=false;
                for(let item of foundResult.targetFolder){
                    if(item.text==data.text  && item.id!=foundResult.item.id){
                        nameExist=true;
                        response.err=true;
                        response.errDescription=this.#ERR_NAMEALREADYEXIST;
                        break;
                    }
                }

                if(!nameExist){
                    //устанавливаем новое имя объекта
                    foundResult.item.text=data.text;

                    //записываем данные обратно в сессию
                    sessionStorage.setItem(locStorName(this.#TREE_DATA_SORAGE_NAME),JSON.stringify(treeData) );
                
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
                let treeData=JSON.parse(sessionStorage.getItem(locStorName(this.#TREE_DATA_SORAGE_NAME)));
                //поиск объекта
                let foundResult=this.#findItem(data.idPath,treeData);

                //проверяем ошибки такого же имени
                let nameExist=false;
                for(let item of foundResult.targetFolder){
                    if(item.text==data.text && item.id!=foundResult.item.id){
                        nameExist=true;
                        response.err=true;
                        response.errDescription=this.#ERR_NAMEALREADYEXIST;
                        break;
                    }
                }

                if(!nameExist){
                    //изменение имени
                    foundResult.item.text=data.text;
                    //изменение настроек
                    foundResult.item.meterSettings=data.meterSettings;
                    //сохраняем локальной сессии
                        sessionStorage.setItem(locStorName(this.#TREE_DATA_SORAGE_NAME),JSON.stringify(treeData) );
                
                    //статус выполнения 
                    response.done=true;
                }
                    
                resolve(response);
                
            }, this.#TIME_DELAY)
        })
        
    }

    //найти требуемый элемент
    #findItem=function(idPath, treeData){
        //обработка пути
        let ids=idPath.split("/");
        ids.shift();

        //предустановки поиска
        let targetFolders=treeData;
        let item;
        let i=0;

        //поиск
        for(let id of ids){
            i++;
            for(let targetFolder of targetFolders){
                if(targetFolder.id==id){
                    if(i<ids.length){
                        targetFolders=targetFolder.children; 
                    }else{
                        item=targetFolder; 
                    }
                    
                }
            }
            
        }
        let targetFolder=targetFolders;

        //возврат результатов
        return {item:item, targetFolder:targetFolder};
    }

    

}

