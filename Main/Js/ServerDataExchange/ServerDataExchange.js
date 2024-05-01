import {trendSetpoints} from "../GlobalConst.js";
import {locStorName} from "../Functions.js";

//класс обмена данными с сервером
export let ServerDataExchange=class{
    static DataExchangeSimulation= true;
    static NO_CHANGES='nc';
    static ERR_NAMEALREADYEXIST='err: name already exist in folder';
    
    static Aux={   
        treeDataLocStorageName:'treeDataLocStorageName',

        //структура симулированного обмена данными
        SimDataFromServer:{
            XPoints: [],
            Trends:[
                {Name: trendSetpoints[0].name,
                Label: trendSetpoints[0].label,
                Points:[]},
                {Name: trendSetpoints[1].name,
                Label: trendSetpoints[1].label,
                Points:[]},
                {Name: trendSetpoints[2].name,
                Label: trendSetpoints[2].label,
                Points:[]},
                {Name: trendSetpoints[3].name,
                Label: trendSetpoints[3].label,
                Points:[]},
                {Name: trendSetpoints[4].name,
                Label: trendSetpoints[4].label,
                Points:[]},
                {Name: trendSetpoints[5].name,
                Label: trendSetpoints[5].label,
                Points:[]},
                {Name: trendSetpoints[6].name,
                Label: trendSetpoints[6].label,
                Points:[]},
                {Name: trendSetpoints[7].name,
                Label: trendSetpoints[7].label,
                Points:[]},
                {Name: trendSetpoints[8].name,
                Label: trendSetpoints[8].label,
                Points:[]},
                {Name: trendSetpoints[9].name,
                Label: trendSetpoints[9].label,
                Points:[]},
                {Name: trendSetpoints[10].name,
                Label: trendSetpoints[10].label,
                Points:[]},
                {Name: trendSetpoints[11].name,
                Label: trendSetpoints[11].label,
                Points:[]},
                {Name: trendSetpoints[12].name,
                Label: trendSetpoints[12].label,
                Points:[]},
                {Name: trendSetpoints[13].name,
                Label: trendSetpoints[13].label,
                Points:[]},
                {Name: trendSetpoints[14].name,
                Label: trendSetpoints[14].label,
                Points:[]},
                {Name: trendSetpoints[15].name,
                Label: trendSetpoints[15].label,
                Points:[]},
                {Name: trendSetpoints[16].name,
                Label: trendSetpoints[16].label,
                Points:[]},
                {Name: trendSetpoints[17].name,
                Label: trendSetpoints[17].label,
                Points:[]},
                {Name: trendSetpoints[18].name,
                Label: trendSetpoints[18].label,
                Points:[]},
                {Name: trendSetpoints[19].name,
                Label: trendSetpoints[19].label,
                Points:[]},
                {Name: trendSetpoints[20].name,
                Label: trendSetpoints[20].label,
                Points:[]},
                {Name: trendSetpoints[21].name,
                Label: trendSetpoints[21].label,
                Points:[]},
                {Name: trendSetpoints[22].name,
                Label: trendSetpoints[22].label,
                Points:[]},
                {Name: trendSetpoints[23].name,
                Label: trendSetpoints[23].label,
                Points:[]},
                {Name: trendSetpoints[24].name,
                Label: trendSetpoints[24].label,
                Points:[]},
                {Name: trendSetpoints[25].name,
                Label: trendSetpoints[25].label,
                Points:[]},
             ]
        },

        //данные по предыдущему симулированному обменну данных
        simPrevExchangeTimeStamps:[

        ],

        //уровень генерации случайных чисел в симулированных данных
        SimTrendRndLevles:[80, 82, 78, //ток
            400, 380, 420, //фазное напряжение
            405, 385, 425, //линейное
            1079, 1024, 978, 1236, //активная мощность
            1579, 1524, 1478,1736, //полная мощность
            500, 500,500,500, //реактивная мощность
            50, //частота
            0.5,0.5, 0.5, 0.5 //cos фи
        ],

        //уровень отклонения случайных чисел в сим. даных
        simTrendRndDisturbance:[
            21, 21, 21, //ток
            21, 21, 21, //фазное напряжение
            21,21,21, //линейное
            21, 21, 21,21, //активная мощность
            21,21,21,21, // полная мощность
            21,21,21,21, //реактивная мощность
            1, //частота
            0.2, 0.2, 0.2, 0.2 //cos фи
        ],

        GetSimChartData:function(idPath,timeRange){
            
            let result;

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
            let meterSettingsData=ServerDataExchange.getMeterSettings(idPath);

            //------предыдущая временная метка
            //ищем или создаем временную метку предыдущих данных
            let timeStampFound=false;
            for(let simPrevExchangeTimeStamp of this.simPrevExchangeTimeStamps){
                if(simPrevExchangeTimeStamp.idPath==idPath){
                    prevTimeStamp=simPrevExchangeTimeStamp;
                    timeStampFound=true;
                }
            }

            if(!timeStampFound){
                this.simPrevExchangeTimeStamps.push(prevTimeStamp);
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
                if(this.SimDataFromServer.XPoints[this.SimDataFromServer.XPoints.length - 1]!=endTime){
                    //обнуляем массив временных меток
                    this.SimDataFromServer.XPoints=[];
                    //обнуляем массив значений по каждому тренду
                    for(let i=0; i< this.SimDataFromServer.Trends.length; i++){
                        this.SimDataFromServer.Trends[i].Points=[];
                    }

                    //добавляем значения
                    for (let i = 0; i < LenghtRange; i++) {

                        //добавляем временнные метки
                        currentTime.setTime(startTimeUnix+i*1000);
                        this.SimDataFromServer.XPoints[i]=currentTime.getTime();

                        //добавляем значения
                        for(let trendSetpoint of trendSetpoints){
                            for(let sti=0; sti<this.SimDataFromServer.Trends.length; sti++){
                                if(this.SimDataFromServer.Trends[sti].Name==trendSetpoint.name){
                                    //если опрос счетчика активирован
                                    if(meterSettingsData.dataExchange[sti].active){
                                        this.SimDataFromServer.Trends[sti].Points[i]=
                                        Math.random() * this.simTrendRndDisturbance[sti] + this.SimTrendRndLevles[sti];
                                    //если опрос счетчика не активирован
                                    }else{
                                        this.SimDataFromServer.Trends[sti].Points[i]=0;
                                    }
                                    
                                }
                            }
                        }
                    }
                    
                }
            
                result=this.SimDataFromServer;
            }
            //цикл опроса счетчика не завершен
            else{
                result=ServerDataExchange.NO_CHANGES; 
            }
            
            return  result;
        },

        //найти требуемый элемент
        findItem:function(idPath, treeData){
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
                    if(targetFolder.Id==id){
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
        
    };

    //получить данные по графику счетчика
    static GetChartData=function(idPath,timeRange){
        // timeRange:{
        //     type: 2,
        //     firstValue: '23.02.2024 10:00 AM',
        //     secondValue: '23.02.2024 10:00 AM'
        // }
        let result;

        if(this.DataExchangeSimulation){
           result= this.Aux.GetSimChartData(idPath,timeRange);
        }

        return result;
    };

    //получить данные по структуре дерева
    static getTreeStructureData=function(){
        let result;
        //симуляция обмена данными с сервером
        if(this.DataExchangeSimulation){
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
            result=JSON.parse(sessionStorage.getItem(locStorName(this.Aux.treeDataLocStorageName)));
            //если данных в сессии нет
            if(!(result instanceof Object)){
                result= getFileSity('../Main/Data/TreeData.json');
                //добавляем стандартные настройки счетчика
                addMeterSettingsF(result);
                //сохраняем данные в локальной сессии
                sessionStorage.setItem(locStorName(this.Aux.treeDataLocStorageName),JSON.stringify(result) );
            }
              
         }
 
         return result;
    };

    //добавить в струкутуру дерева данные счетчика
    static addItem=function(data){
        let response={done:false, err:false, errDescription:''};
        //симуляция обмена данными с сервером
        if(this.DataExchangeSimulation){
            let newItem={};

            //делаем запрос из локальной сессии
            let treeData=JSON.parse(sessionStorage.getItem(locStorName(this.Aux.treeDataLocStorageName)));
            //поиск папки
            let foundResult=this.Aux.findItem(data.idPath,treeData);
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
                    response.errDescription=this.ERR_NAMEALREADYEXIST;
                    break;
                }
            }

            if(!nameExist){
                //определение Id
                let idArr=[];
                for(let item of foundItem){
                    idArr.push(Number(item.Id));
                }

                newItem.Id=Math.max(...idArr)+1;
                newItem.Id=newItem.Id.toString();

                //определение текста
                newItem.text=data.text;

                //определение типа
                newItem.type=data.type;

                //добавляем данные настройки счетчика
                newItem.meterSettings=data.meterSettings;

                //интегрируем в данные дерева и сохраняем локальной сессии
                foundItem.push(newItem);
                sessionStorage.setItem(locStorName(this.Aux.treeDataLocStorageName),JSON.stringify(treeData) );
                
                //статус выполнения 
                response.done=true

            }
            

        }
        return response;
    }

    //удалить из струкутуры дерева данные счетчика
    static deleteItem=function(idPath){
        //симуляция обмена данными с сервером
        if(this.DataExchangeSimulation){
            //делаем запрос из локальной сессии
            let treeData=JSON.parse(sessionStorage.getItem(locStorName(this.Aux.treeDataLocStorageName)));

            //поиск элементов
            let foundResult=this.Aux.findItem(idPath,treeData);

            //поиск счетчика и его удаление
            let i=0;
            for(let folderItem of foundResult.targetFolder){
                if(folderItem.Id==foundResult.item.Id){
                    //удаляем
                    foundResult.targetFolder.splice(i, 1)
                    //сохраняем локальной сессии
                    sessionStorage.setItem(locStorName(this.Aux.treeDataLocStorageName),JSON.stringify(treeData) );
                    break;
                    
                }
                i++;
            }
        }
    }

    //переименовать папку или счетчик
    static renameItem=function(data){
        let response={done:false, err:false, errDescription:''};
        //симуляция обмена данными с сервером
        if(this.DataExchangeSimulation){
            //делаем запрос из локальной сессии
            let treeData=JSON.parse(sessionStorage.getItem(locStorName(this.Aux.treeDataLocStorageName)));
            //поиск объекта
            let foundResult=this.Aux.findItem(data.idPath,treeData);

            //проверяем ошибки такого же имени
            let nameExist=false;
            for(let item of foundResult.targetFolder){
                if(item.text==data.text  && item.Id!=foundResult.item.Id){
                    nameExist=true;
                    response.err=true;
                    response.errDescription=this.ERR_NAMEALREADYEXIST;
                    break;
                }
            }

            if(!nameExist){
                //устанавливаем новое имя объекта
                foundResult.item.text=data.text;

                //записываем данные обратно в сессию
                sessionStorage.setItem(locStorName(this.Aux.treeDataLocStorageName),JSON.stringify(treeData) );
            
                //статус выполнения 
                response.done=true;
            }
            
        }
        return response;
    }

    //получить настройки счетчика
    static getMeterSettings=function(idPath){
        let result;
        //симуляция обмена данными с сервером
        if(this.DataExchangeSimulation){
            //делаем запрос из локальной сессии
            let treeData=JSON.parse(sessionStorage.getItem(locStorName(this.Aux.treeDataLocStorageName)));
            //поиск объекта
            let foundResult=this.Aux.findItem(idPath,treeData);
            //поиск настроек в объекте
            if('meterSettings' in foundResult.item){
                result=foundResult.item.meterSettings;
            }else{
                result=meterSetting;
            }
            //дополнительные даннные
            result.name=foundResult.item.text;
            result.path
        }
        return result;
    }

    //изменить настройки счетчика
    static setMeterSettings=function(data){
        let response={done:false, err:false, errDescription:''};

        //симуляция обмена данными с сервером
        if(this.DataExchangeSimulation){
            //делаем запрос из локальной сессии
            let treeData=JSON.parse(sessionStorage.getItem(locStorName(this.Aux.treeDataLocStorageName)));
            //поиск объекта
            let foundResult=this.Aux.findItem(data.idPath,treeData);

            //проверяем ошибки такого же имени
            let nameExist=false;
            for(let item of foundResult.targetFolder){
                if(item.text==data.text && item.Id!=foundResult.item.Id){
                    nameExist=true;
                    response.err=true;
                    response.errDescription=this.ERR_NAMEALREADYEXIST;
                    break;
                }
            }

            if(!nameExist){
                //изменение имени
                foundResult.item.text=data.text;
                //изменение настроек
                foundResult.item.meterSettings=data.meterSettings;
                //сохраняем локальной сессии
                 sessionStorage.setItem(locStorName(this.Aux.treeDataLocStorageName),JSON.stringify(treeData) );
            
                //статус выполнения 
                response.done=true;
            }
            
            
           
        }
        return response;
    }
    
}