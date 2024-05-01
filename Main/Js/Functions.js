
//глобальные переменные
const projectId='PTUA_MeterMon';
const LocSessionName2="ChartProperies";
export const LocSessionName3="LastChartDataPath";
export const LocSessionName4="ChartPageDataArr";
export const trendSetpoints=[
    {name:"I_L1", label:'Ток фазы L1', yAxisID:'y'},
    {name:"I_L2", label:'Ток фазы L2', yAxisID:'y'},
    {name:"I_L3", label:'Ток фазы L3', yAxisID:'y'},
    {name:"U_L1", label:'Напряжение фазы L1', yAxisID:'y1'},
    {name:"U_L2", label:'Напряжение фазы L2', yAxisID:'y1'},
    {name:"U_L3", label:'Напряжение фазы L3', yAxisID:'y1'},
    {name:"U_L1L2", label:'Линейное напряжение L1 L2', yAxisID:'y1'},
    {name:"U_L1L3", label:'Линейное напряжение L1 L3', yAxisID:'y1'},
    {name:"U_L2L3", label:'Линейное напряжение L2 L3', yAxisID:'y1'},
    {name:"P", label:'Активная мощность всех фаз', yAxisID:'y2'},
    {name:"P_L1", label:'Активная мощность фазы L1', yAxisID:'y2'},
    {name:"P_L2", label:'Активная мощность фазы L2', yAxisID:'y2'},
    {name:"P_L3", label:'Активная мощность фазы L3', yAxisID:'y2'},
    {name:"S", label:'Полная мощность всех фаз', yAxisID:'y3'},
    {name:"S_L1", label:'Полная мощность фазы L1', yAxisID:'y3'},
    {name:"S_L2", label:'Полная мощность фазы L2', yAxisID:'y3'},
    {name:"S_L3", label:'Полная мощность фазы L3', yAxisID:'y3'},
    {name:"Q", label:'Реактивная мощность всех фаз', yAxisID:'y4'},
    {name:"Q_L1", label:'Реактивная мощность фазы L1', yAxisID:'y4'},
    {name:"Q_L2", label:'Реактивная мощность фазы L2', yAxisID:'y4'},
    {name:"Q_L3", label:'Реактивная мощность фазы L3', yAxisID:'y4'},
    {name:"f", label:'Частота', yAxisID:'y5'},
    {name:"cosf", label:'Равнодействующий для всех фаз cos φ', yAxisID:'y6'},
    {name:"cosf_L1", label:'cos φ фазы L1', yAxisID:'y6'},
    {name:"cosf_L2", label:'cos φ фазы L2', yAxisID:'y6'},
    {name:"cosf_L3", label:'cos φ фазы L3', yAxisID:'y6'}
];
const meterSetting={
    exchangeTimeType: "1000",
    exchangeTimeValue: '5',
    ip:['10','0','0','0'],
    rs485_adress: "1",
    rs_port: "0",
    rs_type: "0",
    dataExchange:[
        {name: "de0", active: true, label: trendSetpoints[0].label, obisCode: "31.7.0"},
        {name: "de1", active: true, label: trendSetpoints[1].label, obisCode: "51.7.0"},
        {name: "de2", active: true, label: trendSetpoints[2].label, obisCode: "71.7.0"},
        {name: "de3", active: true, label: trendSetpoints[3].label, obisCode: "32.7.0"},
        {name: "de4", active: true, label: trendSetpoints[4].label, obisCode: "52.7.0"},
        {name: "de5", active: true, label: trendSetpoints[5].label, obisCode: "72.7.0"},
        {name: "de6", active: true, label: trendSetpoints[6].label, obisCode: "12.7.1"},
        {name: "de7", active: true, label: trendSetpoints[7].label, obisCode: "12.7.2"},
        {name: "de8", active: true, label: trendSetpoints[8].label, obisCode: "12.7.3"},
        {name: "de9", active: true, label: trendSetpoints[9].label, obisCode: "1.7.0"},
        {name: "de10", active: true, label: trendSetpoints[10].label, obisCode: "21.7.0"},
        {name: "de11", active: true, label: trendSetpoints[11].label, obisCode: "41.7.0"},
        {name: "de12", active: true, label: trendSetpoints[12].label, obisCode: "61.7.0"},
        {name: "de13", active: true, label: trendSetpoints[13].label, obisCode: "9.7.0"},
        {name: "de14", active: true, label: trendSetpoints[14].label, obisCode: "29.7.0"},
        {name: "de15", active: true, label: trendSetpoints[15].label, obisCode: "49.7.0"},
        {name: "de16", active: true, label: trendSetpoints[16].label, obisCode: "69.7.0"},
        {name: "de17", active: true, label: trendSetpoints[17].label, obisCode: "3.7.0"},
        {name: "de18", active: true, label: trendSetpoints[18].label, obisCode: "23.7.0"},
        {name: "de19", active: true, label: trendSetpoints[19].label, obisCode: "43.7.0"},
        {name: "de20", active: true, label: trendSetpoints[20].label, obisCode: "63.7.0"},
        {name: "de21", active: true, label: trendSetpoints[21].label, obisCode: "14.7.0"},
        {name: "de22", active: true, label: trendSetpoints[22].label, obisCode: "13.7.0"},
        {name: "de23", active: true, label: trendSetpoints[23].label, obisCode: "33.7.0"},
        {name: "de24", active: true, label: trendSetpoints[24].label, obisCode: "53.7.0"},
        {name: "de25", active: true, label: trendSetpoints[25].label, obisCode: "73.7.0"}
    ]
};

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
//модуль времени
export var DateTime={
    GetCurrentTimeString:function (){
        let now = new Date();
        let hours = now.getHours().toString().padStart(2, '0');
        let minutes = now.getMinutes().toString().padStart(2, '0');
        let seconds = now.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    },

    ToString:function(Date, ShowSeconds=true){
        let day=Date.getDate().toString().padStart(2, '0');
        let month=Date.getMonth().toString().padStart(2, '0');
        let year=Date.getFullYear().toString();

        let hours = Date.getHours().toString().padStart(2, '0');
        let minutes = Date.getMinutes().toString().padStart(2, '0');
        let seconds = Date.getSeconds().toString().padStart(2, '0');
        let result;
        if(!ShowSeconds){
            result=`${day}.${month}.${year} ${hours}:${minutes}`;
        }else{
            result=`${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
        }
        return result;
    },

    //переделываем строку времени в строку времени для конструкции типа данных Date (DCS-Date construct string)
    StringToDCS(StringDate){
        let DateTimeArr=StringDate.split(', ');
        let DateArr=DateTimeArr[0].split('.');
        let TimeArr=DateTimeArr[1].split(':');
        let result=`${DateArr[2]}-${DateArr[1]}-${DateArr[0]}T${TimeArr[0]}:${TimeArr[1]}:${TimeArr[2]}`;
        return result;
    },

    StringDate:function(StringDate){
        let result=new Date(this.StringToDCS(StringDate));
        return result;
    },

    DateToDCS:function(Date){
        let day=Date.getDate().toString().padStart(2, '0');

        let month=Date.getMonth(); //0-11
        month++;
        month=month.toString().padStart(2, '0');

        let year=Date.getFullYear().toString();

        let hours = Date.getHours().toString().padStart(2, '0');
        let minutes = Date.getMinutes().toString().padStart(2, '0');
        let seconds = Date.getSeconds().toString().padStart(2, '0');
        let result;
        
        result=`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        return result;
    },

}


//-------
//проверка, что данные являются JSON
function isJSON(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}

//-------
//модуль обмена данными с сервером
export class ServerDataExchange{
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

//---------
//установить экран в Main
export function SetMCPage(Page){
    let Main=document.getElementById("Main");
    Main.src=Page;
}

//----------
//общее управление всеми графиками
export class ChartsCollection{

    constructor(){
        //----определяем ключевые элементы экрана
        this.container=document.querySelector('.container');

        this.tree=document.querySelector('#tree');

        this.workspace_wrapper=document.querySelector('#workspace_wrapper');
        this.workspace.element=document.querySelector('#Workspace');
        this.workspace_cover=new PageElements.Cover(this.workspace_wrapper);
        this.wsSubheader=document.querySelector('#ws_subheader');
        this.wsSubheaderText=document.querySelector('.subheader_h1');
        this.wsUpButton=document.querySelector('#Subheader-button-up');

        //----определяем меню мыши
        //***общее
        this.mouseTTreeMenuWrapper=document.querySelector('#tree-mouseMenuWrapper-tree');
        this.mouseTTreeMenuContent=document.querySelectorAll('#tree-mouseMenuWrapper-tree li');
        this.treePlaceholder=document.querySelector('#tree-placeholder');
        this.treePlaceholder.addEventListener('contextmenu', ()=>{
            this.mouseFTreeMenuEventPath.target=this.treePlaceholder;
            this.mouseFTreeMenuEventPath.idPath='/';
            PageElements.createMouseContextMenu(event, this.mouseTTreeMenuWrapper);
        })
        //добавить папку
        this.addFolderPopUp=new PageElements.PopUp(this.container,this.mouseTTreeMenuContent[0]);
        //далее смотри скрипт страницы

        //***для папки
        this.mouseFTreeMenuWrapper=document.querySelector('#tree-mouseMenuWrapper-folder');
        this.mouseFTreeMenuContent=document.querySelectorAll('#tree-mouseMenuWrapper-folder li');
        //добавить счетчик 
        this.addMeterPopUp=new PageElements.PopUp(this.container,this.mouseFTreeMenuContent[0]);
        //далее смотри скрипт страницы
        //добавить папку
        this.addFolder2PopUp=new PageElements.PopUp(this.container,this.mouseFTreeMenuContent[1]);
        //далее смотри скрипт страницы
        //переименовать
        this.mouseFTreeMenuContent[2].addEventListener('click', ()=>{
            let target=this.mouseFTreeMenuEventPath.target;
            target.removeAttribute("readonly");
            target.className='tree-title-rename';
            target.onEdit=true;
            // Выделяем текст в поле ввода
            target.focus();
            target.setSelectionRange(0, target.value.length);
        })
        //удалить
        this.mouseFTreeMenuContent[3].addEventListener('click', ()=>{
            if(confirm('удалить')){
                //запрос серверу на удаление данных
                ServerDataExchange.deleteItem(this.mouseFTreeMenuEventPath.idPath);

                //cоздаем дерево и заполняем воркспейс
                this.construct();

            }
                 
        })


        //***для счетчика
        this.mouseMTreeMenuWrapper=document.querySelector('#tree-mouseMenuWrapper-meter');
        this.mouseMTreeMenuContent=document.querySelectorAll('#tree-mouseMenuWrapper-meter li');
        //*переименовать
        this.mouseMTreeMenuContent[0].addEventListener('click', ()=>{
            let target=this.mouseMTreeMenuEventPath.target;
            target.removeAttribute("readonly");
            target.className='tree-title-rename';
            target.onEdit=true;
            // Выделяем текст в поле ввода
            target.focus();
            target.setSelectionRange(0, target.value.length);
        })
        //*удалить
        this.mouseMTreeMenuContent[1].addEventListener('click', ()=>{
            if(confirm('удалить')){
                //запрос серверу на удаление данных
                ServerDataExchange.deleteItem(this.mouseMTreeMenuEventPath.idPath);

                //cоздаем дерево и заполняем воркспейс
                this.construct();

            }
                 
        })

        //----создаем дерево и заполняем воркспейс
        this.construct();

        //------------training messages
        this.#treeTrainingMsgs();
        
    };

    container;

    tree;
    treePlaceholder;
    treeData;
    treeTrainingMsg;

    mouseTTreeMenuWrapper;
    mouseTTreeMenuContent;

    mouseFTreeMenuWrapper;
    mouseFTreeMenuContent;
    mouseFTreeMenuEventPath={textPath:'',idPath:'',target:{},targetParent:{}, treeDataItem:{}};

    mouseMTreeMenuWrapper;
    mouseMTreeMenuContent;
    mouseMTreeMenuEventPath={textPath:'',idPath:'',target:{},targetParent:{}, treeDataItem:{}};

    addFolderPopUp;
    addFolder2PopUp;
    addMeterPopUp;

    workspace_wrapper;
    workspace_cover={};
    workspace={element:{}, contentData:{}};
    workspaceContent={};
    overviewTrainingMsg;

    wsSubheader;
    wsSubheaderText;
    wsUpButton;




    idPath=''; //путь выведеного контента рабочей области
    static FOR_CHART_PAGE_STORAGENAME='forChartPage';

    //cоздаем дерево и заполняем воркспейс
    construct=function(){
        //запрос данных с сервера
        this.treeData=ServerDataExchange.getTreeStructureData();
        this.#createParentData(this.treeData, this.treeData, true);

        //постройка данных дерева
        this.#createTree(this.tree, this.treeData, '', 20, true);

        //ставим плейсхолдер в конце дерева
        this.tree.appendChild(this.treePlaceholder);

        //открыть экран воркспейса
        this.openByPath(this.#getPrevPath()); 

        //установить функционал кнопки "вверх"
        this.#setWsUpButtonFunc();

    }

    //заполняем воркспейс
    constructWS=function(){
        //запрос данных с сервера
        this.treeData=ServerDataExchange.getTreeStructureData();
        this.#createParentData(this.treeData, this.treeData, true);

        //открыть экран воркспейса
        this.openByPath(this.#getPrevPath()); 

        //установить функционал кнопки "вверх"
        this.#setWsUpButtonFunc();
    }
    
    //функция добавления родительских данных в данные по графикам
    #createParentData=function(treeData,parent, root=false){
        for(let item of treeData){
            item.parent=parent;
            item.root=root;
            if('children' in item){this.#createParentData(item.children, item)};
        }
    };

    //создание структуры дерева на странице
    #createTree=function (tree,data,treeInputIdSuf='', paddingLeft=20, root=false) {
        //удаляем предыдущие элементы если они есть
        if(root){
            let oldTreeElements=document.querySelectorAll('#tree-item-root');
            for(let oldtreeElements of oldTreeElements) {
                this.tree.removeChild(oldtreeElements);
            }
        }
    
        //---создаем элементы аккордеона
        for(let dataItem of data){

            let treeItem=document.createElement('div');
            treeItem.className='tree-item';
            if(root){treeItem.id='tree-item-root';}
            tree.appendChild(treeItem);


            //---есть вложенные элементы
            if(dataItem.type=='folder'){

                //---
                let treeInput=document.createElement('input');
                treeInput.className='tree-input';
                treeInput.type='checkbox';
                treeInput.id=`tree-input${treeInputIdSuf+'-'+dataItem.Id}`;
                treeItem.appendChild(treeInput);
                treeInput.addEventListener('change',(event)=>{
                    if(event.target.checked){
                        treeExpandIcon.classList.add('opened');
                    }else{
                        treeExpandIcon.classList.remove('opened');
                    }
                    
                })

                //---
                let treeLabel=document.createElement('input');
                treeLabel.type='text';
                treeLabel.className='tree-title';
                treeLabel.setAttribute('readonly', 'true');
                treeLabel.value=dataItem.text;
                treeLabel.style.paddingLeft=`${paddingLeft}px`;
                treeItem.appendChild(treeLabel);
                treeLabel.onEdit=false;
                treeLabel.addEventListener('contextmenu', (event)=>{
                    this.mouseFTreeMenuEventPath=this.#createPath(dataItem, false);
                    this.mouseFTreeMenuEventPath.target=treeLabel;
                    this.mouseFTreeMenuEventPath.targetParent=treeItem;
                    this.mouseFTreeMenuEventPath.treeDataItem=dataItem;
                    PageElements.createMouseContextMenu(event, this.mouseFTreeMenuWrapper);
                })

                treeLabel.addEventListener('click',(event)=>{
                    if(!treeLabel.onEdit){
                        treeInput.click();
                        this.#setContent(dataItem);
                    }             
                })
                treeLabel.addEventListener('blur',(event)=>{
                    if(treeLabel.onEdit){
                        treeLabel.className='tree-title';
                        treeLabel.setAttribute('readonly', 'true');
                        treeLabel.onEdit=false;
                        let renameItemResponse=ServerDataExchange.renameItem({
                            idPath:this.mouseFTreeMenuEventPath.idPath,
                            text: treeLabel.value
                        });

                        if(renameItemResponse.err){
                            if(renameItemResponse.errDescription==ServerDataExchange.ERR_NAMEALREADYEXIST){
                                treeLabel.value=dataItem.text;
                                alert('Такое имя уже существует в данной папке!');
                            }
                        }else{
                            dataItem.text=treeLabel.value;
                        }
                        
                    }
                })

                //---
                let treeExpandIcon=document.createElement('div');
                treeExpandIcon.className='tree-expandIcon'
                treeExpandIcon.style.left=`${paddingLeft-15}px`;
                treeItem.appendChild(treeExpandIcon);
                treeExpandIcon.addEventListener('click',(event)=>{
                    treeInput.click();
                })
                
                //---
                let treeItemContent=document.createElement('div');
                treeItemContent.className='tree-content';
                treeItem.appendChild(treeItemContent);                              

                //создаем вложенный контент
                    let nextLevPaddingLeft=paddingLeft+10;
                    let nextTreeInputIdSuf =treeInputIdSuf+'-'+dataItem.Id;
                    if('children' in dataItem){
                         this.#createTree(treeItemContent,dataItem.children,nextTreeInputIdSuf, nextLevPaddingLeft);
                    }
                   
            }
            //нет вложенных элементов
            else{

                let  treeButton=document.createElement('input');
                treeButton.className='tree-title';
                treeButton.setAttribute('readonly', 'true');
                treeButton.value=dataItem.text;
                treeButton.style.paddingLeft=`${paddingLeft}px`;
                treeItem.appendChild(treeButton);
                treeButton.onEdit=false;
                treeButton.addEventListener('contextmenu', (event)=>{
                    this.mouseMTreeMenuEventPath=this.#createPath(dataItem, false);
                    this.mouseMTreeMenuEventPath.target=treeButton;
                    this.mouseMTreeMenuEventPath.targetParent=treeItem;
                    this.mouseMTreeMenuEventPath.treeDataItem=dataItem;
                    PageElements.createMouseContextMenu(event, this.mouseMTreeMenuWrapper);

                })
                treeButton.addEventListener('click',(event)=>{
                    if(!treeButton.onEdit){
                        this.#setContent(dataItem);  
                    }
                })
                treeButton.addEventListener('blur',(event)=>{
                    if(treeButton.onEdit){
                        treeButton.className='tree-title';
                        treeButton.setAttribute('readonly', 'true');
                        treeButton.onEdit=false;
                        ServerDataExchange.renameItem({
                            idPath:this.mouseMTreeMenuEventPath.idPath,
                            text: treeButton.value
                        });
                        this.constructWS();
                    }
                })
            }
        }


    }

    //установить контент в рабочей области
    #setContent=function(contentData){
        //сохраняем данные содержания
        this.workspace.contentData=contentData;
        //определяем, что данные для обзора
         try{   
            let isOverview=(contentData.type=='folder');

            //загружаем обзор графиков
            if(isOverview){
                this.#setOverviewInWorkspace(contentData);
            }
            //загружаем график
            else{
                if(contentData.ChartType=='line' || contentData.ChartType==undefined){
                    this.#setChartInWorkspace(); 
                }else{
                    this.#setDemoChartInWorkspace(contentData.ChartType);  
                }
                                      
            }

            //формируем путь в заголовке
            this.#createPath(contentData);
        }catch(err){
            this.#setErrInWorkspace(err, contentData);
            console.log(err, 'content data: ', contentData)
        }
        
 
    }

    //очистить контент
    #clearContent=function(){
        //удаляем элементы графика со страницы
        if(this.workspaceContent.chartPage!=undefined){
            this.workspace.element.removeChild(this.workspaceContent.chartPage);
            delete this.workspaceContent.chartPage;
        }
        
        //удаляем предыдущие созданные элементы обзора
        if(this.workspaceContent.overview!=undefined){
            this.workspace.element.removeChild(this.workspaceContent.overview);
            delete this.workspaceContent.overview;
            delete this.workspaceContent.overviewButtons;
        }

        //удаляем предыдущую страницу ошибки
        if(this.workspaceContent.errScr!=undefined){
            this.workspace.element.removeChild(this.workspaceContent.errScr);
            delete this.workspaceContent.errScr;
        }

        //удаляем демонстарционные график
        if(this.workspaceContent.demoChartArea!=undefined){
            this.workspace.element.removeChild(this.workspaceContent.demoChartArea);
            delete this.workspaceContent.demoChartArea;
        }
    }

    //установить обзор графиков в рабочей области
    #setOverviewInWorkspace=function(contentData){
        //функция создания кнопки обзора
        let createOverviewButton=function(dataItem, img){
            //создаем кнопку
            let button=document.createElement("button");
            button.className="Overview";
            this.workspaceContent.overview.appendChild(button);
            this.workspaceContent.overviewButtons.push(button);
            button.addEventListener("click", ()=> {
                this.#setContent(dataItem) ; 
        
            });
    
            //создаем фигуру 
            let figure= document.createElement("figure");
            figure.className="Overview-figure";
            button.appendChild(figure);
    
            //подключаем рисунок
            figure.appendChild(img);
    
            //создаем текст
            let buttonText=document.createElement("figcaption");
            buttonText.className="Overview-text";
            buttonText.textContent = dataItem.text;
            figure.appendChild(buttonText);
    
        };

        //удаляем предыдущие элементы
        this.#clearContent();

        //создаем область страницы
        this.workspaceContent.overview = document.createElement("div");
        this.workspaceContent.overview.className="OverviewContainer";
        this.workspace.element.appendChild(this.workspaceContent.overview);

        //создаем внутрение объекты
        this.workspaceContent.overviewButtons=[];
        //отрисовка кнопок обзора графиков
        if('children' in contentData){
            for(let dataItem of contentData.children){
            
                //создаем рисунок
                let img=document.createElement("img");
                img.className="Overview-picture";

                //рисунок кнопки обзора -папка
                if(dataItem.type=='folder'){
                    img.src="../Main/Data/Folder.png";
                }
                //рисунок кнопки обзора -график
                else{
                    switch (dataItem.ChartType) {
                        case 'line':
                            img.src="Data/line-chart-icon.png";
                            break;
                        case 'bar':
                            img.src="Data/bar-chart-icon.png";
                            break;    
                        case "pie":
                            img.src="Data/pie-chart-icon.png";
                            break;
                        case "doughnut":
                            img.src="Data/doughnut-chart-icon.png";
                            break;    
                        default:
                            img.src="Data/line-chart-icon.png";
                            break;
                    }
                    
                }

                //создаем кнопку обзора
                createOverviewButton.call(this,dataItem,img);

            }
            //------------training messages
            this.overviewTrainingMsg=new TrainingMessages('overview',[
                {target:this.workspaceContent.overviewButtons[0], text:'нажмите на одну из кнопок, чтоб перейти на страницу счетчика или в подпапку'}
                ]);

            let OTMShowCtrl=()=>{
                if(this.treeTrainingMsg!=undefined){
                    if(this.workspaceContent.overview==undefined || !this.treeTrainingMsg.trainingFinished){
                        this.overviewTrainingMsg.hide();
                    }else{
                        this.overviewTrainingMsg.show();
                    }
                }
                
            }
            
            this.overviewTrainingMsg.hide();
    
            let OTMtimeInterval=setInterval(()=>{OTMShowCtrl()},1000); 

        //если папка пуста
        }else{
            let noContentLine=document.createElement('div');
            noContentLine.className="Overview-noContentContainer";
            this.workspaceContent.overview.appendChild(noContentLine);
            
            let noContentColumn=document.createElement('div');
            noContentLine.appendChild(noContentColumn); 

            let noContentImg=document.createElement("img");
            noContentImg.className="Overview-noContentImg";
            noContentImg.src="../Main/Data/NoContent.png";
            noContentColumn.appendChild(noContentImg);   
            
            let noContentText=document.createElement('h1');
            noContentText.innerText='Папка пуста';
            noContentColumn.appendChild(noContentText);
        }

        

       
    };

    //установить график в рабочей области
    #setChartInWorkspace=function(){
        //удаляем предыдущие элементы
        this.#clearContent();
          
        //создаем область для контента
        
        this.workspaceContent.chartPage = document.createElement("object");
        this.workspaceContent.chartPage.type='text/html';
        this.workspaceContent.chartPage.data='Chart.html';
        this.workspaceContent.chartPage.className='workspace-iframe';
        this.workspace.element.appendChild(this.workspaceContent.chartPage);


        this.workspaceContent.win=this.workspaceContent.chartPage.contentWindow;
        this.workspaceContent.win.addEventListener('load', ()=> {
            this.workspaceContent.doc=this.workspaceContent.win.document;
            this.workspaceContent.bodyWrapper=this.workspaceContent.doc.querySelector('#bodyWrapper');
            this.workspaceContent.chartPage.style.height=this.workspaceContent.bodyWrapper.offsetHeight+10+'px';
        })
        
        
    };

    //установить демонстрационный график
    #setDemoChartInWorkspace=function(chartType){
        //удаляем предыдущие элементы
        this.#clearContent();

        //создаем область страницы
        this.workspaceContent.demoChartArea = document.createElement("div");
        this.workspaceContent.demoChartArea.className="OverviewContainer";
        this.workspace.element.appendChild(this.workspaceContent.demoChartArea);

        //создаем канвас для графика
        this.workspaceContent.demoChartArea.demoChartCanvas = document.createElement("canvas");
        this.workspaceContent.demoChartArea.demoChartCanvas.className="demoChartCanvas";
        this.workspaceContent.demoChartArea.appendChild(this.workspaceContent.demoChartArea.demoChartCanvas);

        //загружаем демонстрационные данные
        let basicDemoChartData=getFileSity('../Charts/Data/ChartData1.json');

        //пересобирем демонстрационные данные
        let demoChartData={
            labels:basicDemoChartData.XPoints,
            datasets:[{
                label:basicDemoChartData.Trends[0].Label,
                data:[],
                backgroundColor:[]
            }]
        }
        let i=0;
        for(let point of basicDemoChartData.Trends[0].Points){
            demoChartData.datasets[0].data[i]=point[0];
            demoChartData.datasets[0].backgroundColor[i]=point[1]
            i++;
        }
        
        //Создание и отображение диаграммы
        this.workspaceContent.demoChartArea.demoChart=
        new Chart(this.workspaceContent.demoChartArea.demoChartCanvas,{
            type: chartType, // Выбор типа графика
            data: demoChartData,
            options:{
                plugins:{
                    title:{
                        display:true,
                        text: `демонстрационный пример графика типа ${chartType}`
                    }
                }
                
            }
        });
        
    }
  
    //установить страницу ошибки в рабочей области
    #setErrInWorkspace=function(err, contentData){
        //удаляем предыдущие элементы
        this.#clearContent();

        //создаем область страницы
        this.workspaceContent.errScr = document.createElement("div");
        this.workspaceContent.errScr.className="errorScr";
        this.workspace.element.appendChild(this.workspaceContent.errScr);

        //создаем внутрение объекты
        let errTopic=document.createElement('h1');
        errTopic.textContent= 'Упс. Не получилось загрузить контент :(';
        this.workspaceContent.errScr.appendChild(errTopic);

        let errMsgDescription=document.createElement('h3');
        errMsgDescription.textContent='ошибка: ';
        this.workspaceContent.errScr.appendChild(errMsgDescription);

        let errMsg=document.createElement('div');
        errMsg.textContent=err;
        this.workspaceContent.errScr.appendChild(errMsg);

        let cdMsgDescription=document.createElement('h3');
        cdMsgDescription.textContent='content data функции setContent: ';
        this.workspaceContent.errScr.appendChild(cdMsgDescription);

        let cdMsg=document.createElement('div');
        cdMsg.textContent=contentData;
        this.workspaceContent.errScr.appendChild(cdMsg);


    }

    

    //сформировать путь выведеного контента рабочей области
    #createPath=function(contentData, forHeader=true){
        let result;

        //--устанавливаем начальные значения
        let wsSubheaderText=contentData.text;
        let idPath=contentData.Id;
        let name=contentData.text;
        let path='';
        

        //--формируем путь
        let treeDataIteration=function(contentData){
            let parent=contentData.parent;
            if(!contentData.root){
                wsSubheaderText=parent.text+'/'+wsSubheaderText;
                idPath=parent.Id+'/'+idPath;
                path=parent.text+'/'+path;
                treeDataIteration.call(this,parent);
            }
            else{
                wsSubheaderText='/'+wsSubheaderText;
                idPath='/'+idPath;
                path='/'+path;
            }
        }
  
        treeDataIteration.call(this,contentData);

        //--если функция вызывается для заголовка воркспейса
        if(forHeader){
            let forChartPageData={};

            //выводим на экрна
            this.wsSubheaderText.textContent=wsSubheaderText;

            //сохраняем в параметре класса
            this.idPath=idPath;
            forChartPageData.idPath=idPath;
            forChartPageData.name=name;
            forChartPageData.path=path;

            //сохраняем путь в локальной сессии
            sessionStorage.setItem(locStorName(ChartsCollection.FOR_CHART_PAGE_STORAGENAME),JSON.stringify(forChartPageData));
        }
        //--если нужно просто передать данные
        else{
            result={textPath:wsSubheaderText,idPath:idPath};
        }

        return result;    
    };

    //считать путь ранее открытого контента
    #getPrevPath=function(){
        //считываем путь из сессии
        let forChartPageData=JSON.parse(sessionStorage.getItem(locStorName(ChartsCollection.FOR_CHART_PAGE_STORAGENAME)));
        if(forChartPageData==undefined){
            forChartPageData={idPath:'/'+this.treeData[0].Id};
        }
        let path=forChartPageData.idPath;
        let pathIds=path.split("/");

        //убираем первую пустую запись
        pathIds.shift();
        return pathIds;
    }

    //установить контент рабочей области по пути
    openByPath=function(pathIds){
        let contentData;
        
        //функция итерации id
        let idIteration=function(pathIds, treeData){
            let result;

            //находим соответствующий id в 
            for(let treeDataItem of treeData){
                if(pathIds[0]==treeDataItem.Id){
                    
                    //переход на один уровень вниз
                    if(pathIds.length>1){
                        pathIds.shift();
                        result=idIteration.call(this, pathIds, treeDataItem.children);
                    }
                    //возврат текущего уровня
                    else{
                        result=treeDataItem;
                    }

                    break;
                }
            }

            return result; 
        }
        
        if(Array.isArray(pathIds) && pathIds.length>0){
            //вызыываем функцию итерации
            contentData=idIteration.call(this, pathIds, this.treeData);
            
            //открываем соответсвующий экран в воркспейсе
            this.#setContent(contentData); 
        }
        
    }

    //установить функционал кнопки "вверх"
    #setWsUpButtonFunc=function(){
        this.wsUpButton.addEventListener('click',()=>{
            let pathIds=this.#getPrevPath();
            pathIds.pop();
            this.openByPath(pathIds);
        })
    }

    //тренировочные сообщения дерева
    #treeTrainingMsgs=()=>{
        this.treeTrainingMsg=new TrainingMessages('tree',[
            {target:this.tree.querySelector('.tree-item'), text:'нажмите на корневой элемент в навигационной панеле,<br>'+
            'чтобы отобразить содержание папки или перейти к данными выбранного счетчика'},
            {target:this.tree.querySelector('.tree-item'), text:'нажмите правой кнопкой мыши по элементу в навигационой панели,<br>'+
            'чтобы открыть контекстное меню где можно удалить/добавить папку или счетчик и пр.'},
            {target:this.tree.querySelector('.tree-placeholder'), text:'нажмите правой кнопкой мыши по пустому полю в навигационой панели,<br>'+
            'чтобы открыть контекстное меню где можно удалить/добавить папку'}
        ]);

        let coverShowCtrl=()=>{
            if(!this.treeTrainingMsg.trainingFinished){
                this.workspace_cover.show();
            }else{
                this.workspace_cover.hide();
            }
        }
        
        coverShowCtrl();

        let TTMtimeInterval=setInterval(()=>{coverShowCtrl()},1000); 
    
    }
        

    
}

//----------
//управление графиком
export class ChartCtrl{
    chart;
    cData;
    cOptions;
    pauseMode=false;
    yScalesList=[
        {id:'y',name:'y',min:0, max:100, title:{text:'Ток'}},
        {id:'y1',name:'y1',min:0, max:400, title:{text:'Напряжение'}},
        {id:'y2',name:'y2',min:0, max:1300, title:{text:'Активная мощность'}},
        {id:'y3',name:'y3',min:0, max:1800, title:{text:'Полная мощность'}},
        {id:'y4',name:'y4',min:0, max:550, title:{text:'Реактивная мощность'}},
        {id:'y5',name:'y5',min:0, max:55, title:{text:'Частота'}},
        {id:'y6',name:'y6',min:0, max:1, title:{text:'cos φ'}},

    ];
    idPath='';

    //параметры по умолчанию
    defaultPar= {
        trend:{
            yAxisID: 'y',
            hidden:false,
            stepped:false,
            pointStyle: 'circle',
            borderWidth: 2,
            borderColor: [
                'red',
                'blue',
                'green',
                'Maroon',
                'Lime',
                'Navy',
                'Purple',
                'Olive',
                'Teal',
                'Fuchsia',
                'Yellow',
                'Aqua',
                'Gray',
                'Black',
                'White'
            ],
            backgroundColor: [
                'rgba(255, 0, 0, 0.5)',
                'rgba(0, 0, 255, 0.5)',
                'rgba(0, 128, 0, 0.5)',
                'rgba(128, 0, 0, .5)',
                'rgba(0, 255, 0, .5)',
                'rgba(0, 0, 128, .5)',
                'rgba(128, 0, 128, .5)',
                'rgba(128, 128, 0, .5)',
                'rgba(0, 128, 128, .5)',
                'rgba(255, 0, 255, .5)',
                'rgba(255, 255, 0, .5)',
                'rgba(0, 255, 255, .5)',
                'rgba(128, 128, 128, .5)',
                'rgba(0, 0, 0, .5)',
                'rgba(255, 255, 255, .5)'
            ],
            fill: false,
            tension: 0.2
        },
        options:{
            background:[
                'Ivory',
                'Honeydew',
                'Azure',
                'GhostWhite',
                'Seashell',
                'Beige',
                'AntiqueWhite',
                'LavenderBlush',
                'MistyRose',
                'White'
            ],
            scales:{
                x:{
                    timeRangeSelector: 1,//дополнительно
                    timeRangeItemSelect: 60000,//дополнительно
                    timeRangeInput: 2,//дополнительно
                    type: 'time',
                    time: {
                        tooltipFormat: 'dd.MM.yyyy HH:mm:ss',
                        displayFormats: {
                            second: 'dd.MM.yyyy \nHH:mm:ss',
                            minute: 'dd.MM.yyyy \nHH:mm:ss',
                            hour:'dd.MM.yyyy \nHH:mm:ss',
                            day:'dd.MM.yyyy'
                        }
                      },
                    min:'2024-01-01T00:00:00', 
                    max:'2024-02-01T00:00:00',
                    ticks:{
                        autoSkip: true,                       
                        autoSkipPadding: 50,
                        maxRotation: 0,
                        minRotation:0,
                        color: [
                            '#0c2340',
                            'Black',
                            'DarkRed',
                            'Indigo',
                            'DarkGreen',
                            'MidnightBlue',
                            'DarkSlateGrey',
                            '#d0d0ce',
                            '#b1b3b3',
                            '#97999B',
                            'Gray'
                        ]
                    },
                    border:{
                        color: [
                            '#0c2340',
                            'Black',
                            'DarkRed',
                            'Indigo',
                            'DarkGreen',
                            'MidnightBlue',
                            'DarkSlateGrey',
                            '#d0d0ce',
                            '#b1b3b3',
                            '#97999B',
                            'Gray'
                        ],
                        width: 1
                    },
                    grid:{
                        color: [
                            '#d0d0ce',
                            '#b1b3b3',
                            '#97999B',
                            'Gray',
                            '#0c2340',
                            'Black',
                            'DarkRed',
                            'Indigo',
                            'DarkGreen',
                            'MidnightBlue',
                            'DarkSlateGrey'
                        ],
                        lineWidth: 1
                    }
                },
                y:{name:'y',
                    min:0, 
                    max:110,
                    position: 'left',
                    title:{
                        display:true,
                        text:'',
                    },
                    ticks:{
                        autoSkip: true,
                        maxRotation: 0,
                        minRotation:0,
                        color: [
                            '#0c2340',
                            'Black',
                            'DarkRed',
                            'Indigo',
                            'DarkGreen',
                            'MidnightBlue',
                            'DarkSlateGrey',
                            '#d0d0ce',
                            '#b1b3b3',
                            '#97999B',
                            'Gray'
                        ]
                    },
                    border:{
                        color: [
                            '#0c2340',
                            'Black',
                            'DarkRed',
                            'Indigo',
                            'DarkGreen',
                            'MidnightBlue',
                            'DarkSlateGrey',
                            '#d0d0ce',
                            '#b1b3b3',
                            '#97999B',
                            'Gray'
                        ],
                        width: 1
                    },
                    grid:{
                        color: [
                            '#d0d0ce',
                            '#b1b3b3',
                            '#97999B',
                            'Gray',
                            '#0c2340',
                            'Black',
                            'DarkRed',
                            'Indigo',
                            'DarkGreen',
                            'MidnightBlue',
                            'DarkSlateGrey'
                        ],
                        lineWidth: 1
                    }
                },
                y1:{name:'y1'},
                y2:{name:'y2'}
            },
            animation:{
                duration:500,
                easing: 'linear'
            },
            plugins:{
                legend:{
                    display: false,
                    position:'top',
                    labels:{
                        usePointStyle: true,
                    }
                },
                zoom:{
                    pan:{
                        enabled:true,
                        mode: 'xy'
                    },
                    zoom:{
                        mode: 'x',
                        wheel:{
                            enabled:true,
                        }

                    }
                    
                },

            }   
        }
    }

    //конструктор
    constructor(chartCanvas, chartType, idPath='/1'){
        this.idPath=idPath;
        this.aux.idPath=idPath;

        //интеграция переменных в aux
        this.aux.yScalesList=this.yScalesList;

        //Определяем первоначальный вид графика
       this.assembleChartOptins();

       //создаем первоначальные данные для графика
       this.assembleChartData();

       //регистрируем свои плагины для графиков
       Chart.register(yScaleLegendsPlugin);

        //Создание и отображение диаграммы
        this.chart=new Chart(chartCanvas,{
            type: chartType, // Выбор типа графика
            data: this.cData,
            options: this.cOptions
        });

        //инициируем опции зума
        this.initZoomOptions.call(this);
    }

    //функции проверки и поискка
    aux={
        idPath:{},
        //Проверка существования данных свойств и создание пустых данных, если их нет
        checkCreateFullProp: function(FullProperties, Create=false){
        let exist=false;
        //данных нет    
        if(FullProperties==null){
            if(Create){
                FullProperties={Charts:[]};
                
                exist=true;
            }
            
        }else{exist=true;}

        return {FullProperties, exist};

        },

        //Поиск номера свойств графика или их создание, если нет
        findCreateChart: function(FullProperties, ChartPath,Create=false){
            let ChartNum,
            ChartExist=false;
            //есть хотя бы одна група настроек графика
            if(FullProperties.Charts.length>0){
                //находим номер необходимых настроек
                for(let i=0; i< FullProperties.Charts.length; i++){
                    if(FullProperties.Charts[i].Path==ChartPath){
                        ChartNum=i;
                        ChartExist=true;
                    }
                }
            }
            //если нет настроек для данного графика
            if (!ChartExist && Create){
                let tempChart={
                    Path:ChartPath,
                    Trends:[]
                }
                FullProperties.Charts.push(tempChart);   
                ChartNum=FullProperties.Charts.length-1;
                ChartExist=true;
            }
            return {FullProperties, ChartNum, ChartExist}
        },

        //Поиск номера тренда графика или их создание, если нет
        findCreateTrend: function(FullProperties, ChartNum, Name,Create=false){
            let TrendNum,
            TrendExist=false;
            //есть хотя бы одна группа данных
            if(FullProperties.Charts[ChartNum].Trends.length>0){
                //находим номер 
                for(let i=0; i< FullProperties.Charts[ChartNum].Trends.length; i++){
                    if(FullProperties.Charts[ChartNum].Trends[i].Name==Name){
                        TrendNum=i;
                        TrendExist=true;
                    }
                }
            }
            //если нет группы данных
            if (!TrendExist && Create){
                let tempTrend={
                    Name:Name,
                    DatasetProp:{}
                }
                FullProperties.Charts[ChartNum].Trends.push(tempTrend);   
                TrendNum=FullProperties.Charts[ChartNum].Trends.length-1;
                TrendExist=true;
            }
            return {FullProperties, TrendNum, TrendExist};
        },

        //Проверка наличия опций графика или их создание, если нет
        findCreateOptions: function(FullProperties, ChartNum, Create=false){

            let OptionsExist=FullProperties.Charts[ChartNum].hasOwnProperty("Options");
        
            //если нет 
            if (!OptionsExist && Create){
                FullProperties.Charts[ChartNum]["Options"]={};
                OptionsExist=true;
            }

            return {FullProperties, OptionsExist};
        },

        //Проверка наличия свойств опций графика или их создание, если нет
        findCreateOptionsProp: function(Parent, Key, Create=false, val){
            
            //проверяем на наличие дочерних ключей
            let CurKey;
            let KeyIsArr=Array.isArray(Key) && Key.length>1;
            if(KeyIsArr){CurKey=Key[0];}else{CurKey=Key;}   
            

            //проверка наличия свойства опций
            let OptionPropExist=CurKey in Parent;

            //значение, которое нужно присвоить
            let newVal, lastObj=false;
            if(!KeyIsArr && val!=undefined){
                newVal=val;
                lastObj=true;
            }else{
                newVal={};
            }

            //перезапись параметра или его создание
            if ((!OptionPropExist && Create)||(OptionPropExist && lastObj)){
                Parent[CurKey]=newVal;
                OptionPropExist=true;
            }


            //проверяем дочернее свойство
            if(KeyIsArr && OptionPropExist){
                OptionPropExist=this.findCreateOptionsProp(Parent[CurKey], Key.slice(1), Create, val)
            }
            return OptionPropExist;
        },

        //Функция определения стандартных параметров тренда в зависимости от его имени
        defParByTrendName:function(trendName, key){
            let result;
            for(let trendSetpoint of trendSetpoints){
                if(trendName==trendSetpoint.name){
                    try{result=trendSetpoint[key];}catch(e){};
                    break;
                } 
            }
            return result;
        },

        //Функция определения стандартных параметров оси значений по id оси
        defYScale:{},
        defParByYScaleId:function(scaleID, parameter){
            let result;

            for(let yScale of this.yScalesList){
                if(yScale.id==scaleID){
                    result=yScale[parameter];
                    break;
                }
            }

            return result;
        },


        //переменные для адаптации трендов к масшатбу
        XpointsFactor:1,
        WindowSize:500,
        
        //адаптация графика по зуму
        zoomTrendsAdaptation:function(){
            let CdataLenght=this.cData.labels.length;

            let CdataBaseLenght;
            CdataBaseLenght=this.cData.baseLabels.length;
            
            let XpointsAmount=this.chart.scales.x._valueRange;

            //сокращаем тренды, если их точек слишком много
            if(XpointsAmount>this.WindowSize*this.XpointsFactor){

                //изменяем коэф реального кол-ва точек
                this.XpointsFactor*=2;

                //сокращаем количество точек вдвое у трендов
                //обнуляем
                this.cData.labels.splice(0,CdataLenght);
                for(let dataset of this.cData.datasets){
                    dataset.data.splice(0,dataset.data.length);
                }

                //добавляем каждую i-тую
                for (let i = 0; i < CdataBaseLenght; i += this.XpointsFactor) {
                    this.cData.labels.push(this.cData.baseLabels[i]);

                    for(let dataset of this.cData.datasets){
                        dataset.data.push(dataset.baseData[i]);
                    }
                }

                //обновляем график
                this.chart.update();
            }

            //сокращаем тренды, если их точек слишком много
            if(XpointsAmount<this.WindowSize*(this.XpointsFactor/2) && CdataBaseLenght>CdataLenght){

                //изменяем коэф реального кол-ва точек
                this.XpointsFactor*=.5;

                //возвращаем из бэкапа
                //обнуляем
                this.cData.labels.splice(0,CdataLenght);
                for(let dataset of this.cData.datasets){
                    dataset.data.splice(0,dataset.data.length);
                }

                //добавляем каждую i-тую
                for (let i = 0; i < CdataBaseLenght; i += this.XpointsFactor) {
                    this.cData.labels.push(this.cData.baseLabels[i]);

                    for(let dataset of this.cData.datasets){
                        dataset.data.push(dataset.baseData[i]);
                    }
                }

                //обновляем график
                this.chart.update();
            }


        },

        //интегрирование данных трендов в плагин yScaleLegendsPlugin
        toYSLPlugin:function(cData,cOptions) {
            //интегрируем данные трендов в плагин yScaleLegendsPlugin
            let trends=[];
            try{
                for(let dataset of cData.datasets){
                    let tempTrends={};
                    tempTrends.yAxisID=dataset.yAxisID;
                    tempTrends.name=dataset.Name;
                    tempTrends.hidden=dataset.hidden;
                    trends.push(tempTrends);
                }
                cOptions.plugins.yScaleLegendsPlugin.trends=trends;

            }catch(err){}
            
        }
    };


    //получить параметр датасета из свойств графика
    getDatasetProp=function (name,key,defaultValNum=0){

        //Считываем путь экрана графика
        let ChartPath= this.idPath;

        //Считываем сохраненные параметры графика из сессии
        let FullProperties = JSON.parse(sessionStorage.getItem(locStorName(LocSessionName2)));

       let ChartExist=false; 
       let ChartNum;

       let TrendExist=false;
       let TrendNum;

        //проверка наличия данных настроек
       let CCFResult=this.aux.checkCreateFullProp(FullProperties, false);
        FullProperties=CCFResult.FullProperties;        

       //проверка наличия настроек графика и определения их номера
       if(CCFResult.exist){
          let  FCCResult=this.aux.findCreateChart(FullProperties, ChartPath, false);
          ChartNum=FCCResult.ChartNum;
          ChartExist=FCCResult.ChartExist
       }

       //проверка наличия тренда и определения его номера
       if(ChartExist){
           let  FCTResult=this.aux.findCreateTrend(FullProperties,ChartNum, name, false);
           TrendNum=FCTResult.TrendNum;
           TrendExist=FCTResult.TrendExist;
        }
       

       let result;
       //Берем параметр из настроек
       if(TrendExist){
           result=FullProperties.Charts[ChartNum].Trends[TrendNum].DatasetProp[key];
       }

       //берем параметр по умолчанию
       if(result==undefined){
            //считываем предварительные настроки
            result=this.aux.defParByTrendName(name,key);
            //если нет предварительных настроек, то берем по умолчанию
            if(result==undefined){
                result=this.defaultPar.trend[key];
                if(Array.isArray(result)){result=result[defaultValNum];}
            }
           
       }

       return result;
       
   };

   //Установить параметр датасета в свойствах графика
   setDatasetProp=function (name,key){

    //разделяем параметр и его значение
    let Parameter=key.split("=");

    //Считываем путь экрана графика
    let ChartPath= this.idPath;

    //Считываем сохраненные параметры графика из сессии
    let FullProperties = JSON.parse(sessionStorage.getItem(locStorName(LocSessionName2)));

    //проверка наличия записи в сессии
    let CCFResult=this.aux.checkCreateFullProp(FullProperties, true);
    FullProperties=CCFResult.FullProperties;
    
    //находим номер необходимых настроек для графика
    let FCCResult=this.aux.findCreateChart(FullProperties, ChartPath, true);

    FullProperties=FCCResult.FullProperties;
    let ChartNum=FCCResult.ChartNum;

    //находим номер данных графика
    let FCTResult=this.aux.findCreateTrend(FullProperties,ChartNum, name, true);
    FullProperties=FCTResult.FullProperties;
    let TrendNum=FCTResult.TrendNum;

    

    //применяем новые настройки
    for(let i=0; i< this.cData.datasets.length; i++){
        if(this.cData.datasets[i].Name==name){
            //преобразование типов
            let Value=Parameter[1];

            if(Value=="false"){Value=false;}
            else if(Value=="true"){Value=true;}
            else if(/^\d+$/.test(Value)) {Value=+Value;}

            this.cData.datasets[i][Parameter[0]]=Value;
            FullProperties.Charts[ChartNum].Trends[TrendNum].DatasetProp[Parameter[0]]=Value;
            
            break;
        }
       
    }
    
    //сохраняем данные в локальной сессии
    sessionStorage.setItem(locStorName(LocSessionName2), JSON.stringify(CCFResult.FullProperties));

}

   //получить параметр датасета из свойств графика
    getOptionsProp= function (key,defaultValNum){

    //Обробатываем ключ
    let Parameter=key.split("=");

    //Считываем путь экрана графика
    let ChartPath= this.idPath;

    //Считываем сохраненные параметры графика из сессии
    let FullProperties = JSON.parse(sessionStorage.getItem(locStorName(LocSessionName2)));

   let ChartExist=false; 
   let ChartNum;

   let OptionsExist=false;

   let OptionsPropExist=false;

    //проверка наличия данных настроек
   let CCFResult=this.aux.checkCreateFullProp(FullProperties, false);
   FullProperties=CCFResult.FullProperties;

   //проверка наличия настроек графика и определения их номера
   if(CCFResult.exist){
      let  FCCResult=this.aux.findCreateChart(FullProperties, ChartPath, false);
      ChartNum=FCCResult.ChartNum;
      ChartExist=FCCResult.ChartExist
   }

   //проверка наличия опций
   if(ChartExist){
    let FCOResult=this.aux.findCreateOptions(FullProperties,ChartNum, false);
       OptionsExist=FCOResult.OptionsExist;
    }

    //проверка наличия параметров опций
   if(OptionsExist){
    OptionsPropExist=this.aux.findCreateOptionsProp(FullProperties.Charts[ChartNum].Options, Parameter, false);
    }
   
   let result;
   //Берем параметр из настроек
   if(OptionsPropExist){
        let TempPar=FullProperties.Charts[ChartNum].Options;
        for(let ParName of Parameter){
            TempPar=TempPar[ParName];
        }
        result=TempPar;
   }

   //берем параметр по умолчанию
   if(result==undefined){
        let tempOption={
            param:this.defaultPar.options,
            parName:'options',
            parent:{}
        };


        for(let ParName of Parameter){

            try{
                tempOption.parent={...tempOption};
                tempOption.parName=ParName;

                //обработка шкал значений
                if(tempOption.parent.parent.parName=='scales' && tempOption.parent.parName.startsWith('y')){
                    let result=this.aux.defParByYScaleId(tempOption.parent.parName, tempOption.parName);
                    //нету настроек шкалы
                    if(result==undefined){
                        tempOption.param=tempOption.parent.parent.param['y'][ParName];                      
                    }
                    //есть настройки шкалы
                    else{
                        tempOption.param=result;
                    }
                }
                //обработка всего остального
                else{
                    tempOption.param=tempOption.param[ParName];
                }

                //если результат набор параметров по умолчанию
                if(Array.isArray(tempOption.param)){
                    if(defaultValNum==undefined){defaultValNum=0};
                    tempOption.param=tempOption.param[defaultValNum];
                }
                
            }catch(e){console.log(e, key);}  
            
        }
        if(tempOption.param==undefined){console.log(key, tempOption.param);}
        result=tempOption.param;
   }

   //console.log(Key, result);
   return result;
   
    }

     //Установить параметр опций в свойствах графика
     setOptionsProp=function (key){

        //Обробатываем ключ
        let noCoptionCmd=key.startsWith('!');
        if(noCoptionCmd){key=key.slice(1)};

        let Parameter=key.split("=");
        //Считываем путь экрана графика
        let ChartPath= this.idPath;

        //Считываем сохраненные параметры графика из сессии
        let FullProperties = JSON.parse(sessionStorage.getItem(locStorName(LocSessionName2)));

        //проверка наличия записи в сессии
        let CCFResult=this.aux.checkCreateFullProp(FullProperties, true);
        FullProperties=CCFResult.FullProperties;
        
        //находим номер необходимых настроек для графика
        let FCCResult=this.aux.findCreateChart(FullProperties, ChartPath, true);
        FullProperties=FCCResult.FullProperties;
        let ChartNum=FCCResult.ChartNum;  
        
        //находим опции графика
        let FCOResult=this.aux.findCreateOptions(FullProperties,ChartNum, true);
        FullProperties=FCOResult.FullProperties;

        //применяем новые настройки
       
        //  преобразование типов
        let Value=Parameter[Parameter.length-1];

        if(Value=="false"){Value=false;}
        else if(Value=="true"){Value=true;}
        else if(/^\d+$/.test(Value)) {Value=+Value;}
        else if(isJSON(Value)){Value=JSON.parse(Value)}

        //  проверка наличия параметров опций и присвоение им значения
        let FCOPKey=Parameter.slice(0, Parameter.length - 1);

        let FCOPResult1=this.aux.findCreateOptionsProp(FullProperties.Charts[ChartNum].Options, FCOPKey, true, Value);
       
        if(!noCoptionCmd){ 
            let FCOPResult2=this.aux.findCreateOptionsProp(this.cOptions, FCOPKey, true, Value);
        }
         
        //сохраняем данные в локальной сессии
        sessionStorage.setItem(locStorName(LocSessionName2), JSON.stringify(FullProperties));

    }

    //-------- 
    getYscales=function(){
        const Y_SCALES_MAX_AMOUNT=16;
        
        let indexText='';
        let Yscale;
        let YscalesArr=[];

        for(let i=0; i<Y_SCALES_MAX_AMOUNT; i++){
            if(i==0){indexText=''}else{indexText=i};
                Yscale=this.cOptions.scales['y'+indexText];
                if(Yscale!=undefined){YscalesArr.push(Yscale);}     
        }

        return YscalesArr
    }

    //определить x.min в опциях в зависимости от настроек шкалы времени
    getMinTime=function(){
        let result;
        //текущий режим выбора времени
        let timeRangeMode=this.getOptionsProp("scales=x=timeRangeSelector");
        //определение мин макс
        switch (timeRangeMode) {
            case 1:
                result=this.getOptionsProp("scales=x=min");
                break;
            case 2:
                result=his.getOptionsProp("scales=x=min");
                break;    
        }
        return result;
    }

    //определить x.max в опциях в зависимости от настроек шкалы времени
    getMaxTime=function(){
        let result;
        //текущий режим выбора времени
        let timeRangeMode=this.getOptionsProp("scales=x=timeRangeSelector");
        //определение мин макс
        switch (timeRangeMode) {
            case 1:
                let minTime=this.getOptionsProp("scales=x=min");
                let itemMode=this.getOptionsProp("scales=x=timeRangeItemSelect");
                let itemRange=this.getOptionsProp("scales=x=timeRangeInput");
                let minTimeUnix=new Date(minTime).getTime();
                let maxTime=new Date (minTimeUnix+itemRange*itemMode); 
                result=DateTime.DateToDCS(maxTime);
                break;
            case 2:
                result=this.getOptionsProp("scales=x=max");
                break;    
        }
        return result;
    }



   //--------   
   assembleChartOptins=function(idPath){
    //инициируем данные для графика
    this.cOptions={
       aspectRatio: 2.75/1,

        scales:{
            x:{
                timeRangeSelector: this.getOptionsProp("scales=x=timeRangeSelector"),//дополнительно
                type: this.defaultPar.options.scales.x.type,
                time: this.defaultPar.options.scales.x.time,
                min:this.getMinTime(),
                max:this.getMaxTime(),
                ticks:{
                    autoSkip: this.defaultPar.options.scales.x.ticks.autoSkip,                       
                    autoSkipPadding: this.defaultPar.options.scales.x.ticks.autoSkipPadding,
                    maxRotation: this.defaultPar.options.scales.x.ticks.maxRotation,
                    color: this.getOptionsProp("scales=x=ticks=color")
                },
                border:{
                    color: this.getOptionsProp("scales=x=border=color"),
                    width: this.getOptionsProp("scales=x=border=width")
                },
                grid:{
                    color: this.getOptionsProp("scales=x=grid=color"),
                    width: this.getOptionsProp("scales=x=grid=lineWidth")
                }
            }  
        },
        animation:{
            duration: this.defaultPar.options.animation.duration,
            easing: this.defaultPar.options.animation.easing,
            //интегрирование данных трендов в плагин yScaleLegendsPlugin
            onComplete: ()=>{this.aux.toYSLPlugin(this.cData, this.cOptions)}, 
        },
        plugins:{
            legend:this.defaultPar.options.plugins.legend,
            zoom:this.defaultPar.options.plugins.zoom,
            yScaleLegendsPlugin:{trendsYAxisId:[]}
        }
          
    }
    //заполняем осями значений
    for(let yScaleSetpoint of this.yScalesList){
        this.cOptions.scales[yScaleSetpoint.id]={
            name:this.getOptionsProp(`scales=${yScaleSetpoint.id}=id`), //дополнительно
            min:this.getOptionsProp(`scales=${yScaleSetpoint.id}=min`),
            max:this.getOptionsProp(`scales=${yScaleSetpoint.id}=max`),
            position: this.getOptionsProp(`scales=${yScaleSetpoint.id}=position`),
            title:{
                display: true,
                text:this.getOptionsProp(`scales=${yScaleSetpoint.id}=title=text`)
            },
            ticks:{
                autoSkip: this.defaultPar.options.scales.y.ticks.autoSkip,
                maxRotation: this.defaultPar.options.scales.y.ticks.maxRotation,
                color: this.getOptionsProp(`scales=${yScaleSetpoint.id}=ticks=color`)
            },
            border:{
                color: this.getOptionsProp(`scales=${yScaleSetpoint.id}=border=color`),
                width: this.getOptionsProp(`scales=${yScaleSetpoint.id}=border=width`)
            },
            grid:{
                color: this.getOptionsProp(`scales=${yScaleSetpoint.id}=grid=color`),
                width: this.getOptionsProp(`scales=${yScaleSetpoint.id}=grid=lineWidth`)
            }
        }
    }

}

    //--------
    assembleChartData=function(dataFromServer){
        
        if(this.cData==undefined){this.cData={};} 

        //----если есть данные с сервера
        if(dataFromServer!=undefined){

            //заполняем временную ось
            let labels=[];  
            for(let XPoint of dataFromServer.XPoints){
                labels.push(new Date(XPoint));
            }
            this.cData.baseLabels=Array.from(labels); //дополнительно
            this.cData.labels=Array.from(labels);

            this.cData.datasets=[];
            //перебор трендов
            for(let TrendNum=0; TrendNum<dataFromServer.Trends.length; TrendNum++){
                let Trend=dataFromServer.Trends[TrendNum];
                //временный датасет
                let TempDataset={
                    Name: Trend.Name, //дополнительно
                    label: Trend.Label,
                    baseData:[], //дополнительно
                    data:[],
                    yAxisID: this.getDatasetProp(Trend.Name,"yAxisID"),
                    hidden: this.getDatasetProp(Trend.Name,"hidden"),
                    stepped: this.getDatasetProp(Trend.Name,"stepped"),
                    fill: this.getDatasetProp(Trend.Name,"fill"),
                    pointStyle: this.getDatasetProp(Trend.Name,"pointStyle"),
                    borderWidth: this.getDatasetProp(Trend.Name,"borderWidth"),
                    borderColor: this.getDatasetProp(Trend.Name,"borderColor",TrendNum),
                    tension: this.getDatasetProp(Trend.Name,"tension"),
                }
                //заполняем перемены временного датасета массивами 
                for(let Point of Trend.Points){
                    //если к точке подвязан цвет
                    if(Array.isArray(Point)){
                        if (!Array.isArray(TempDataset.backgroundColor)){
                            TempDataset.backgroundColor=[];
                        }
                        
                        TempDataset.backgroundColor.push(Point[1]);
                        TempDataset.data.push(Point[0]);
                        TempDataset.baseData.push(Point[0]);
                        //если чистое значение точки
                    }else{

                        TempDataset.backgroundColor=this.getDatasetProp(Trend.Name,"backgroundColor",TrendNum);

                        TempDataset.data.push(Point);
                        TempDataset.baseData.push(Point);

                    }
                }
                
                this.cData.datasets.push(TempDataset);  
            }

            //интегрирование данных трендов в плагин yScaleLegendsPlugin
            this.aux.toYSLPlugin(this.cData, this.cOptions);
        }
        //----если нет данных с сервера
        else{
            this.cData.baseLabels=[]; //дополнительно
            this.cData.labels=[];
            this.cData.datasets=[];
        }


    };

    //----------
    rebuildTrends=function(dataFromServer){
        if(dataFromServer!=ServerDataExchange.NO_CHANGES){
            this.chart.stop();

            //-----если уже существуют
            if(this.cData.datasets.length>0){
                //заполняем временную ось
                let labels=[];  
                for(let XPoint of dataFromServer.XPoints){
                    labels.push(new Date(XPoint));
                }
                this.cData.baseLabels=Array.from(labels); //дополнительно
                this.cData.labels=Array.from(labels);
                // this.cData.baseLabels=Array.from(DataFromServer.XPoints);
                // this.cData.labels=Array.from(DataFromServer.XPoints);

                //тренды
                for(let dataset of this.cData.datasets){
                    for(let Trend of dataFromServer.Trends){
                        if(Trend.Name==dataset.Name){
        
                            dataset.label=Trend.Label;
        
                            //значения
                            dataset.baseData=Array.from(Trend.Points);
                            dataset.data=Array.from(Trend.Points);
                        }
                    }
                }
            }
            //-----если не существуют
            else{
                this.assembleChartData(dataFromServer);
            }
            
        this.chart.update();
        }

    }

    //----------
    updateTrends=function(dataFromServer){
        if(dataFromServer!=ServerDataExchange.NO_CHANGES){

            this.chart.stop();

            //заполняем временную ось по полученым данным
            for(let XPoint of dataFromServer.XPoints){
                this.cData.baseLabels.push(new Date(XPoint));
                this.cData.labels.push(new Date(XPoint));
            }
        

            //заполняем тренды по полученым данным
            for(let dataset of this.cData.datasets){
                for(let Trend of dataFromServer.Trends){
                    if(Trend.Name==dataset.Name){
                        //значения
                        for(let point of Trend.Points){
                            dataset.baseData.push(point);
                            dataset.data.push(point);
                        }
                    }
                }
            }
            
            
            this.chart.update();



            
            if(!this.pauseMode){
                //перемещаемся по графику
                //получаем время
                let minDate=new Date(this.cOptions.scales.x.min).getTime();
                let maxDate=new Date(this.cOptions.scales.x.max).getTime();
                let deltaTime=maxDate-minDate;
                //увеличиваем время на n с (сдвиг по времени)
                // minDate+=2000;
                // maxDate+=2000
                //переводим в строку и записываем данные параметры оси
                this.cOptions.scales.x.max=DateTime.DateToDCS(new Date());
                this.cOptions.scales.x.min=DateTime.DateToDCS(new Date(new Date().getTime()-deltaTime));

                //обновляем график
                this.chart.update();
                                
            }
 
        }
        
        
    }

    //----------
    initZoomOptions=function(){
        let onZoomStartF=function(){
            //блокируется метод Chart.update не инициированный плагином Zoom
            this.chart.stop();
        }

        let onZoomComF=function(){
            this.aux.zoomTrendsAdaptation.call(this);
        }

        this.cOptions.plugins.zoom.zoom.onZoomStart=onZoomStartF.call(this);

        this.cOptions.plugins.zoom.zoom.onZoomComplete=onZoomComF.call(this);
        
    };

}

//----------
//управление сообщениями обучения
export class TrainingMessages{
    constructor(id,targetOptions){
        let closedMem=true;

        //--создаем первое тренирочные сообщения
        let optionNum=sessionStorage.getItem(locStorName(this.#currMsgMem+id));
        if(optionNum!=undefined && optionNum>=0){
            this.optionsNum=optionNum;
        }

        this.trainingFinished=!(this.optionsNum<=targetOptions.length-1);
        
        if(!this.trainingFinished){
            let message=new PageElements.TrainingMessage(targetOptions[this.optionsNum].target,
                targetOptions[this.optionsNum].text, targetOptions[this.optionsNum].left, 
                targetOptions[this.optionsNum].top, 
                targetOptions[this.optionsNum].disableCloseButton);
            
            message.wraper.style.zIndex=this.#zIndex;

            this.messages.push(message);


            this.messages[this.msgNum].activate();
            closedMem=false;
        }
        

        //каждую секунду проверяем состояние сообщения и открываем новое, если предыдущее закрыто
        let timeInterval=setInterval(()=>{
            if(!this.trainingFinished){
                if(this.messages[this.msgNum].closed && this.messages[this.msgNum].closed!= closedMem && !this.#hidden){
                    this.optionsNum++;
                    this.msgNum++;
    
                    this.trainingFinished=!(this.optionsNum<=targetOptions.length-1);
    
                    if(!this.trainingFinished){
                        //создаем новое сообщение
                        let message=new PageElements.TrainingMessage(targetOptions[this.optionsNum].target,
                            targetOptions[this.optionsNum].text, targetOptions[this.optionsNum].left,
                            targetOptions[this.optionsNum].top, 
                            targetOptions[this.optionsNum].disableCloseButton);
                        
                        message.wraper.style.zIndex=this.#zIndex;

                        //добавляем в список
                        this.messages.push(message);
    
                        //активируем видимость
                        this.messages[this.msgNum].activate();

                    }
    
                    //записываем в локальную сессию уже пройденные сообщения
                    sessionStorage.setItem(locStorName(this.#currMsgMem+id), this.optionsNum);  
    
                    
    
                }

                if(!this.trainingFinished){
                    closedMem=this.messages[this.msgNum].closed;
                }
            }

            //отключение периодического опроса, если тренировка пройдена
            if(this.trainingFinished){
                clearInterval(timeInterval);
            }
           
        },1000);
        
      
    }
    messages=[];
    optionsNum=0;
    msgNum=0;

    trainingFinished=false;

    #hidden=false;

    #currMsgMem='trainingMsg-optionNum-';

    #zIndex=1;

    hide=()=>{
       this.#hidden=true;
       if(this.messages.length>0 && this.msgNum<this.messages.length){
            this.messages[this.msgNum].close();
       }
       
    }

    show=()=>{
        this.#hidden=false;
        if(this.messages.length>0 && this.msgNum<this.messages.length){
            for(let msg of this.messages){
                msg.setPositionByTarget();
            }
            this.messages[this.msgNum].activate();
        }
        
    }

    setZIndex=(value)=>{
        this.#zIndex=value;
        for(let msg of this.messages){
            msg.wraper.style.zIndex=this.#zIndex;
        }
    }
}

//----------
//функции создания элементов страницы
export var PageElements={
   
    PopUp: class{
        main;
        container;
        body;
        header;
        closeButton;
        calllButton;

        displayed=false;


        constructor(RootParent, calllButton){
            this.calllButton=calllButton;
            //-----создаем элементы
            this.main=document.createElement("div");
            this.main.className="pop_up";
            RootParent.appendChild(this.main);

            this.container=document.createElement('div');
            this.container.className='pop_up_container';
            this.main.appendChild(this.container);

            this.body=document.createElement('div');
            this.body.className='pop_up_body';
            this.container.appendChild(this.body);

            this.header=document.createElement("div");
            this.header.className="pop_up_header";
            this.body.appendChild(this.header);

            this.closeButton=document.createElement("button");
            this.closeButton.className="pop_up_close";
            this.closeButton.innerText="✖"; //&#10006
            this.header.appendChild(this.closeButton);

            //-----подключаем команды кнопкам управления
            //вызывающая кнопка
            if(this.calllButton!=undefined){
                this.calllButton.addEventListener("click", ()=>{
                    this.main.classList.toggle("active");   
                    this.displayed=!this.displayed; 
                })
            }
            
            //закрывающая кнопка
            this.closeButton.addEventListener("click", ()=>{
                this.close();
            });

        }

        open=()=>{
            this.main.classList.add("active");   
            this.displayed=true; 
        }

        close=()=>{
            this.main.classList.remove("active");
            this.displayed=false;
        }

    },

    CreateTimeRangeSettings: function(RootParent, id='TIA_TimeRange'){
         //-------создаем элементы
         let tab_item_area=document.createElement('div');
         tab_item_area.className="tab_item_area";
         RootParent.appendChild(tab_item_area);

         let h3_1=document.createElement('h3');
         h3_1.className="tab_item_area_topic";
         h3_1.innerText='Период времени';
         tab_item_area.appendChild(h3_1);

         //
         let h4_1=document.createElement('h4');
         h4_1.innerText='Настройки:';
         tab_item_area.appendChild(h4_1);

         let timeRangeSelector=document.createElement('select');
         timeRangeSelector.className="select";
         let TimeRangeSelectorOptions=[];
         TimeRangeSelectorOptions[0]=document.createElement('option');
         TimeRangeSelectorOptions[0].value='1';
         TimeRangeSelectorOptions[0].innerText='Период времени'
         timeRangeSelector.appendChild(TimeRangeSelectorOptions[0]);
         TimeRangeSelectorOptions[1]=document.createElement('option');
         TimeRangeSelectorOptions[1].value='2';
         TimeRangeSelectorOptions[1].innerText='Время от старта до конца'
         timeRangeSelector.appendChild(TimeRangeSelectorOptions[1]);
         TimeRangeSelectorOptions[2]=document.createElement('option');
         TimeRangeSelectorOptions[2].value='3';
         TimeRangeSelectorOptions[2].innerText='Количество точек'
         timeRangeSelector.appendChild(TimeRangeSelectorOptions[2]);
         tab_item_area.appendChild(timeRangeSelector);

         //Начальное время
         let h4_2=document.createElement('h4');
         h4_2.innerText='Начальное время:';
         tab_item_area.appendChild(h4_2);

         let startTimeInput=document.createElement('input');
         startTimeInput.className='input';
         startTimeInput.type="datetime";
         startTimeInput.setAttribute("readonly", "readonly");
         let startTimeID=id+'_StartTime';
         startTimeInput.id=startTimeID;
         tab_item_area.appendChild(startTimeInput);

         //Конечное время
         let h4_3=document.createElement('h4');
         h4_3.innerText='Конечное время:';
         tab_item_area.appendChild(h4_3);

         let endTimeInput=document.createElement('input');
         endTimeInput.className='input';
         if(timeRangeSelector.value!='2'){endTimeInput.classList.add('notAllowed');}
         endTimeInput.type="datetime";
         endTimeInput.setAttribute("readonly", "readonly");
         let endTimeID=id+'_EndTime';
         endTimeInput.id=endTimeID;
         tab_item_area.appendChild(endTimeInput);

         //датапикеры
         let startTime_ADP, endTime_ADP;

         startTime_ADP=new AirDatepicker(`#${startTimeID}`, {
                 selectedDates: [new Date()],
                 dateFormat(date) {
                    return date.toLocaleString(undefined, {
                        year: 'numeric',
                        day: 'numeric',
                        month: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric'
                    });
                },
                 timepicker: true,
                 timeFormat: 'H:mm AA',
                 buttons: ['today'],
                  //устанавливаем ограничения в датапикере
                 onSelect({date}){
                    if(date!=undefined && timeRangeSelector.value=='2'){
                        endTime_ADP.update({minDate:date});
                    }
                 }
             });  
         
         endTime_ADP=new AirDatepicker(`#${endTimeID}`, {
             selectedDates: [new Date()],
             dateFormat(date) {
                return date.toLocaleString(undefined, {
                    year: 'numeric',
                    day: 'numeric',
                    month: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                });
            },
             timepicker: true,
             timeFormat: 'H:mm AA',
             buttons: ['today'],
             //устанавливаем ограничения в датапикере
             onSelect({date}){
                if(date!=undefined  && timeRangeSelector.value=='2'){
                    startTime_ADP.update({maxDate:date});
                }
             }
         }); 
         

         //диапазон времени
         let h4_4=document.createElement('h4');
         h4_4.innerText='Диапазон времени:';
         tab_item_area.appendChild(h4_4);
        
         let tab_item_area_sub_1=document.createElement('div');
         tab_item_area_sub_1.className='tab_item_area_sub';
         tab_item_area.appendChild(tab_item_area_sub_1);

         let tab_item_area_sub_column_1=document.createElement('div');
         tab_item_area_sub_column_1.className='tab_item_area_sub_column';
         tab_item_area_sub_1.appendChild(tab_item_area_sub_column_1);

         let timeRangeInput=document.createElement('input');
         timeRangeInput.className='input';
         timeRangeInput.type="number";
         timeRangeInput.min='1';
         timeRangeInput.value='1';
         PageElements.onlyDigitsKey(timeRangeInput);
         tab_item_area_sub_column_1.appendChild(timeRangeInput);

         let tab_item_area_sub_column_2=document.createElement('div');
         tab_item_area_sub_column_2.className='tab_item_area_sub_column';
         tab_item_area_sub_column_2.innerText="✖"; //&#10006
         tab_item_area_sub_1.appendChild(tab_item_area_sub_column_2);

         let tab_item_area_sub_column_3=document.createElement('div');
         tab_item_area_sub_column_3.className='tab_item_area_sub_column';
         tab_item_area_sub_1.appendChild(tab_item_area_sub_column_3);

         let timeRangeItemSelect=document.createElement('select');
         timeRangeItemSelect.className="select";
         let timeRangeItemSelectOption=[];
         timeRangeItemSelectOption[0]=document.createElement('option');
         timeRangeItemSelectOption[0].value='1000';
         timeRangeItemSelectOption[0].innerText='1 секунда'
         timeRangeItemSelect.appendChild(timeRangeItemSelectOption[0]);
         timeRangeItemSelectOption[1]=document.createElement('option');
         timeRangeItemSelectOption[1].value='60000';
         timeRangeItemSelectOption[1].innerText='1 минута'
         timeRangeItemSelect.appendChild(timeRangeItemSelectOption[1]);
         timeRangeItemSelectOption[2]=document.createElement('option');
         timeRangeItemSelectOption[2].value='3600000';
         timeRangeItemSelectOption[2].innerText='1 час'
         timeRangeItemSelect.appendChild(timeRangeItemSelectOption[2]);
         timeRangeItemSelectOption[3]=document.createElement('option');
         timeRangeItemSelectOption[3].value='86400000';
         timeRangeItemSelectOption[3].innerText='1 сутки'
         timeRangeItemSelect.appendChild(timeRangeItemSelectOption[3]);
         tab_item_area_sub_column_3.appendChild(timeRangeItemSelect);

         //Количество точек
         let h4_5=document.createElement('h4');
         h4_5.innerText='Количество точек:';
         tab_item_area.appendChild(h4_5);

         let pointAmount=document.createElement('input');
         pointAmount.className='input';
         if(timeRangeSelector.value!='3'){pointAmount.classList.add('notAllowed');}
         pointAmount.type="number";
         pointAmount.min=1;
         pointAmount.value=1;
         tab_item_area.appendChild(pointAmount);

         //----логика
         let setStateF=function(value){
            switch(value){
                case '1':
                    endTimeInput.classList.add('notAllowed');
                    pointAmount.classList.add('notAllowed');
        
                    timeRangeInput.classList.remove('notAllowed');
                    timeRangeItemSelect.classList.remove('notAllowed');
                    break;
                case '2':
                    timeRangeInput.classList.add('notAllowed');
                    timeRangeItemSelect.classList.add('notAllowed');
                    pointAmount.classList.add('notAllowed');
        
                    endTimeInput.classList.remove('notAllowed');
                    break;
                case '3':
                    timeRangeInput.classList.add('notAllowed');
                    timeRangeItemSelect.classList.add('notAllowed');
                    endTimeInput.classList.add('notAllowed');
                         
                    pointAmount.classList.remove('notAllowed');
                    break;    
            }
            timeRangeSelector.value=value;
         }

         timeRangeSelector.addEventListener('click',()=>{
            setStateF(timeRangeSelector.value)
        });
         

        //возвращаем созданные элементы
        return {
            tab_item_area: tab_item_area,
            timeRangeSelector: timeRangeSelector,
            TimeRangeSelectorOptions:TimeRangeSelectorOptions,
            startTimeInput: startTimeInput,
            startTime_ADP:startTime_ADP,
            endTimeInput: endTimeInput,
            endTime_ADP:endTime_ADP,
            timeRangeInput: timeRangeInput,
            timeRangeItemSelect: timeRangeItemSelect,
            pointAmount:pointAmount,
            setStateF:setStateF
        }
    },

    CreateCheckBoxList:function(RootParent, id='CBlist', Amount=1, NoCBText='нет параметров'){
        let checkBoxLines=[]
        let checkBoxes=[];
        let cbLabels=[];
        let noConten=Amount<1;

        //-------создаем элементы
        if(!noConten){
            for(let i=0; i<Amount; i++){

                checkBoxLines[i]=document.createElement("div");
                checkBoxLines[i].className="checkbox_line";
                RootParent.appendChild(checkBoxLines[i]);
            
                checkBoxes[i]=document.createElement("input");
                checkBoxes[i].type="checkbox";
                checkBoxes[i].className="checkbox"
                checkBoxes[i].id=`${id}_item_${i}`;
                checkBoxLines[i].appendChild(checkBoxes[i]);
            
                cbLabels[i]=document.createElement("label");
                cbLabels[i].setAttribute('for', `${id}_item_${i}`);
                checkBoxLines[i].appendChild(cbLabels[i]);
            }
        }else{
                checkBoxLines[0]=document.createElement("div");
                checkBoxLines[0].className="checkbox_line";
                RootParent.appendChild(checkBoxLines[0]);

                let NoCBtext=document.createTextNode(NoCBText);
                checkBoxLines[0].appendChild(NoCBtext);
        }
        

        //----логика
        //инициализируем первый элемент
        if(!noConten){checkBoxes[0].click();}

        let setChecked=function(num){
            if(!checkBoxes[num].checked){checkBoxes[num].click();}
        }

        let setUnchecked=function(num){
            if(checkBoxes[num].checked){checkBoxes[num].click();}
        }
        

        //-----возвращаем созданные элементы
        return {
            checkBoxLines:checkBoxLines,
            checkBoxes:checkBoxes,
            cbLabels:cbLabels,
            setChecked:setChecked,
            setUnchecked:setUnchecked
        }
    },

    createTooltip:function(target, text){
        let tooltip;
        target.addEventListener('mouseenter', (event)=> {
            //создаем подсказку
            tooltip=document.createElement("div");
            tooltip.className='tooltip';
            tooltip.textContent = text;
            document.body.appendChild(tooltip);

            tooltip.style.left = (event.clientX + 10) + 'px';
            tooltip.style.top = (event.clientY + 10) + 'px';
        })

        // Скрываем подсказку рядом с курсором мыши
        target.addEventListener('mouseout', (event)=> {
            document.body.removeChild(tooltip);  
        })

    },

    createMouseContextMenu:function(event, content){
        //создаем область меню
        let mouseContextMenu=document.createElement('div');
        mouseContextMenu.className='mouseContextMenu';
        document.body.appendChild(mouseContextMenu);

        //добавляем в область содержаение
        mouseContextMenu.appendChild(content);
        content.style.display = 'block';

        // Показываем контекстное меню
        event.preventDefault(); // Предотвращаем стандартное контекстное меню браузера
        mouseContextMenu.style.display = 'block'; // Показываем наше контекстное меню
        mouseContextMenu.style.left = event.clientX + 'px'; // Устанавливаем позицию по горизонтали
        mouseContextMenu.style.top = event.clientY + 'px'; // Устанавливаем позицию по вертикали

        //получаем координаты целевого элемента
        let targetRect = event.target.getBoundingClientRect();
       

        // Удаляем контекстное меню
        let parent= event.target;
        document.addEventListener('click', function(event) {
            if ( event.target !== mouseContextMenu) {
                try{document.body.removeChild(mouseContextMenu);}catch{}        
            }
        });

        document.addEventListener('contextmenu', function(event) {
            if ( event.clientX<targetRect.left || event.clientX>targetRect.right ||
                event.clientY<targetRect.top || event.clientY>targetRect.bottom) {
                try{document.body.removeChild(mouseContextMenu);}catch{}        
            }
        });


    },

    setInputMinMax(input, min, max){
        input.min=`${min}`;
        input.max=`${max}`;
        input.addEventListener("input", ()=> {
            if (input.value > max) {
                input.value = max;
            }
        
            if (input.value < min) {
                input.value = min;
            }

            if(input.value==''){
                input.value = min;
            }

        })
    },

    onlyDigitsKey(target){
        target.addEventListener("keydown", function(event) {
            // Получаем код клавиши
            let key = event.keyCode || event.which;
        
            // Разрешаем ввод только цифр и клавиш Backspace, Delete, Tab и стрелок
            if ((key < 48 || key > 57) &&
             key !== 8 && key !== 46 && key !== 9 && 
             (key < 37 || key > 40) &&
            (key<96|| key>105)) {
                event.preventDefault();
            }
        });
        
    },
    

    AddFolderContent:class{
        addFolderPopUpWrapper;

        popUpArea;
        popUpAreaTopic;

        addFolderNameInput;
        okCancelAccept;

        constructor(parent){
            this.addFolderPopUpWrapper=document.createElement('div');
            parent.appendChild(this.addFolderPopUpWrapper);

            this.popUpArea=document.createElement('div');
            this.popUpArea.className='tab_item_area';
            this.addFolderPopUpWrapper.appendChild( this.popUpArea);

            this.popUpAreaTopic=document.createElement('h3');
            this.popUpAreaTopic.className='tab_item_area_topic';
            this.popUpAreaTopic.innerText='Имя новой папки';
            this.popUpArea.appendChild(this.popUpAreaTopic);

            this.addFolderNameInput=document.createElement('input');
            this.addFolderNameInput.type='text';
            this.addFolderNameInput.placeholder='Папка1';
            this.popUpArea.appendChild(this.addFolderNameInput);

            this.okCancelAccept=new PageElements.OkCancelAccept(this.addFolderPopUpWrapper);
            this.okCancelAccept.hide('accept');
        }
        
    },

    MeterSettingsContent:class{

        meterSettingsWrapper;

        mSArea1={
            body:{},
            topic:{},
            label_meter_path:{},
            input_meter_path:{},
            wraper_meter_name:{},
            label_meter_name:{},
            input_meter_name:{},
        };
        
        mSArea2={
            body:{},
            topic:{},
            label_ip:{},
            input_ip:[],
            label_rs_type:{},
            select_rs_type:{},
            select_rs_type_options:{},
            label_rs_port:{},
            input_rs_port:{},
            label_rs485_adress:{},
            input_rs485_adress:{}
        };
        
        mSArea3={
            body:{},
            topic:{},
            subArea1:{
                body:{},
                column1:{body:{}, cbArea:{}, cbList:{}, cbLinesContent:[]},
                column2:{body:{}, cbArea:{}, cbList:{}, cbLinesContent:[]},
            },
            subArea2Topic:{},
            subArea2:{
                body:{},
                column1:{body:{}, input_metter_timeValue:{}},
                column2:{body:{}},
                column3:{body:{}, select:{}, selectOptions:{}}
            }
        };

        okCancelAccept;
        

        #obisList=[
            '31.7.0',
            '51.7.0',
            '71.7.0',
            '32.7.0',
            '52.7.0',
            '72.7.0',
            '12.7.1',
            '12.7.2',
            '12.7.3',
            '1.7.0',
            '21.7.0',
            '41.7.0',
            '61.7.0',
            '9.7.0',
            '29.7.0',
            '49.7.0',
            '69.7.0',
            '3.7.0',
            '23.7.0',
            '43.7.0',
            '63.7.0',
            '14.7.0',
            '13.7.0',
            '33.7.0',
            '53.7.0',
            '73.7.0'
        ]

        constructor(parent){
            this.meterSettingsWrapper=document.createElement('div');
            parent.appendChild(this.meterSettingsWrapper);

            //----
            this.#createMSArea1();

            //----
            this.#createMSArea2();

            //----
            this.#createMSArea3();

            //----
            this.okCancelAccept=new PageElements.OkCancelAccept(this.meterSettingsWrapper);
            
        }

        #createMSArea1=function(){
            this.mSArea1.body=document.createElement('div');
            this.mSArea1.body.className='tab_item_area';
            this.meterSettingsWrapper.appendChild(this.mSArea1.body);

            this.mSArea1.topic=document.createElement('h3');
            this.mSArea1.topic.className='tab_item_area_topic';
            this.mSArea1.topic.innerText='Общее';
            this.mSArea1.body.appendChild(this.mSArea1.topic);

            this.mSArea1.label_meter_path=document.createElement('h4');
            this.mSArea1.label_meter_path.innerText='Путь:';
            this.mSArea1.body.appendChild(this.mSArea1.label_meter_path);

            this.mSArea1.input_meter_path=document.createElement('input');
            this.mSArea1.input_meter_path.type='text';
            this.mSArea1.input_meter_path.className='input notAllowed'
            this.mSArea1.body.appendChild(this.mSArea1.input_meter_path);

            this.mSArea1.wraper_meter_name=document.createElement('div');
            this.mSArea1.body.appendChild(this.mSArea1.wraper_meter_name);

            this.mSArea1.label_meter_name=document.createElement('h4');
            this.mSArea1.label_meter_name.innerText='Имя:';
            this.mSArea1.wraper_meter_name.appendChild(this.mSArea1.label_meter_name);

            this.mSArea1.input_meter_name=document.createElement('input');
            this.mSArea1.input_meter_name.type='text';
            this.mSArea1.input_meter_name.placeholder='Счетчик1'
            this.mSArea1.wraper_meter_name.appendChild(this.mSArea1.input_meter_name);
        }

        #createMSArea2=function(){
            this.mSArea2.body=document.createElement('div');
            this.mSArea2.body.className='tab_item_area';
            this.meterSettingsWrapper.appendChild(this.mSArea2.body);

            this.mSArea2.topic=document.createElement('h3');
            this.mSArea2.topic.className='tab_item_area_topic';
            this.mSArea2.topic.innerText='Подключение';
            this.mSArea2.body.appendChild(this.mSArea2.topic);

            this.mSArea2.label_ip=document.createElement('h4');
            this.mSArea2.label_ip.innerText='Ip адрес шлюза:';
            this.mSArea2.body.appendChild(this.mSArea2.label_ip)

            for (let i=0; i<4; i++){
                this.mSArea2.input_ip[i]=document.createElement('input');
                this.mSArea2.input_ip[i].type='number';
                this.mSArea2.body.appendChild(this.mSArea2.input_ip[i]);
                PageElements.setInputMinMax(this.mSArea2.input_ip[i],0,255);
                PageElements.onlyDigitsKey(this.mSArea2.input_ip[i]);
                this.mSArea2.input_ip[i].value='0';
            }


            this.mSArea2.label_rs_type=document.createElement('h4');
            this.mSArea2.label_rs_type.innerText='тип последовательного интерфейса';
            this.mSArea2.body.appendChild(this.mSArea2.label_rs_type);

            this.mSArea2.select_rs_type=document.createElement('select');
            this.mSArea2.select_rs_type.className="select";
            this.mSArea2.select_rs_type_options=[];
            this.mSArea2.select_rs_type_options[0]=document.createElement('option');
            this.mSArea2.select_rs_type_options[0].value='0';
            this.mSArea2.select_rs_type_options[0].innerText='rs-485'
            this.mSArea2.select_rs_type.appendChild(this.mSArea2.select_rs_type_options[0]);
            this.mSArea2.select_rs_type_options[1]=document.createElement('option');
            this.mSArea2.select_rs_type_options[1].value='1';
            this.mSArea2.select_rs_type_options[1].innerText='rs-232'
            this.mSArea2.select_rs_type.appendChild(this.mSArea2.select_rs_type_options[1]);
            this.mSArea2.body.appendChild(this.mSArea2.select_rs_type);

            this.mSArea2.label_rs_port=document.createElement('h4');
            this.mSArea2.label_rs_port.innerText='номер порта последовательного интерфейса';
            this.mSArea2.body.appendChild(this.mSArea2.label_rs_port);

            this.mSArea2.input_rs_port=document.createElement('input');
            this.mSArea2.input_rs_port.type='number';
            this.mSArea2.input_rs_port.value=0;
            this.mSArea2.body.appendChild(this.mSArea2.input_rs_port);
            PageElements.setInputMinMax(this.mSArea2.input_rs_port,0,255);
            PageElements.onlyDigitsKey(this.mSArea2.input_rs_port);

            this.mSArea2.label_rs485_adress=document.createElement('h4');
            this.mSArea2.label_rs485_adress.innerText='адрес счетчика в последовательном интерфейсе';
            this.mSArea2.body.appendChild(this.mSArea2.label_rs485_adress);

            this.mSArea2.input_rs485_adress=document.createElement('input');
            this.mSArea2.input_rs485_adress.type='number';
            this.mSArea2.input_rs485_adress.className='input';
            this.mSArea2.input_rs485_adress.value=1;
            this.mSArea2.body.appendChild(this.mSArea2.input_rs485_adress);
            PageElements.setInputMinMax(this.mSArea2.input_rs485_adress,0,128);
            PageElements.onlyDigitsKey(this.mSArea2.input_rs485_adress);

            //логика
            this.mSArea2.select_rs_type.addEventListener("change", ()=> {            
                if(this.mSArea2.select_rs_type.value=='1'){this.mSArea2.input_rs485_adress.classList.add('notAllowed');}
                else{this.mSArea2.input_rs485_adress.classList.remove('notAllowed');}
              });
        }

        #createMSArea3=function(){
            this.mSArea3.body=document.createElement('div');
            this.mSArea3.body.className='tab_item_area';
            this.meterSettingsWrapper.appendChild(this.mSArea3.body);

            this.mSArea3.topic=document.createElement('h3');
            this.mSArea3.topic.className='tab_item_area_topic';
            this.mSArea3.topic.innerText='Параметры';
            this.mSArea3.body.appendChild(this.mSArea3.topic);

            this.mSArea3.subArea1.body=document.createElement('div');
            this.mSArea3.subArea1.body.className='tab_item_area_sub';
            this.mSArea3.body.appendChild(this.mSArea3.subArea1.body);

            this.mSArea3.subArea1.column1.body=document.createElement('div');
            this.mSArea3.subArea1.column1.body.className='tab_item_area_sub_column';
            this.mSArea3.subArea1.body.appendChild(this.mSArea3.subArea1.column1.body);

            this.mSArea3.subArea1.column1.cbArea=document.createElement('div');
            this.mSArea3.subArea1.column1.cbArea.className='CheckBox_area';
            this.mSArea3.subArea1.column1.body.appendChild(this.mSArea3.subArea1.column1.cbArea);

            this.mSArea3.subArea1.column1.cbList=
            PageElements.CreateCheckBoxList(this.mSArea3.subArea1.column1.cbArea,
                 'cb_meter_parameter',trendSetpoints.length/2);

            let i=0;
            for(let checkBoxLine of this.mSArea3.subArea1.column1.cbList.checkBoxLines){
                let cbLineContent={};
                cbLineContent.body=checkBoxLine;
                cbLineContent.parNameInput=document.createElement('input');
                cbLineContent.parNameInput.className='checkbox_line_nameInput';
                cbLineContent.parNameInput.placeholder=trendSetpoints[i].label;
                cbLineContent.body.appendChild(cbLineContent.parNameInput);
                PageElements.createTooltip(cbLineContent.parNameInput,'Имя параметра');
                
                cbLineContent.parObisCodeInput=document.createElement('input');
                cbLineContent.parObisCodeInput.className='checkbox_line_obisInput';
                cbLineContent.parObisCodeInput.placeholder=this.#obisList[i];
                cbLineContent.body.appendChild(cbLineContent.parObisCodeInput);
                PageElements.createTooltip(cbLineContent.parObisCodeInput,'Код OBIS');

                this.mSArea3.subArea1.column1.cbLinesContent.push(cbLineContent);

                i++;
            }

            this.mSArea3.subArea1.column2.body=document.createElement('div');
            this.mSArea3.subArea1.column2.body.className='tab_item_area_sub_column';
            this.mSArea3.subArea1.body.appendChild(this.mSArea3.subArea1.column2.body);

            this.mSArea3.subArea1.column2.cbArea=document.createElement('div');
            this.mSArea3.subArea1.column2.cbArea.className='CheckBox_area';
            this.mSArea3.subArea1.column2.body.appendChild(this.mSArea3.subArea1.column2.cbArea);

            this.mSArea3.subArea1.column2.cbList=
            PageElements.CreateCheckBoxList(this.mSArea3.subArea1.column2.cbArea,
                 'cb_meter_parameter',trendSetpoints.length/2);
            this.mSArea3.subArea1.column2.cbList.setUnchecked(0);    

            i=13;
            for(let checkBoxLine of this.mSArea3.subArea1.column2.cbList.checkBoxLines){
                let cbLineContent={};
                cbLineContent.body=checkBoxLine;
                cbLineContent.parNameInput=document.createElement('input');
                cbLineContent.parNameInput.className='checkbox_line_nameInput';
                cbLineContent.parNameInput.placeholder=trendSetpoints[i].label;
                cbLineContent.body.appendChild(cbLineContent.parNameInput);
                PageElements.createTooltip(cbLineContent.parNameInput,'Имя параметра');
                
                cbLineContent.parObisCodeInput=document.createElement('input');
                cbLineContent.parObisCodeInput.className='checkbox_line_obisInput';
                cbLineContent.parObisCodeInput.placeholder=this.#obisList[i];
                cbLineContent.body.appendChild(cbLineContent.parObisCodeInput);
                PageElements.createTooltip(cbLineContent.parObisCodeInput,'Код OBIS');

                this.mSArea3.subArea1.column2.cbLinesContent.push(cbLineContent);

                i++;
            }

            this.mSArea3.subArea2Topic=document.createElement('h4');
            this.mSArea3.subArea2Topic.innerText='период опроса счетчика:';
            this.mSArea3.body.appendChild(this.mSArea3.subArea2Topic);

            this.mSArea3.subArea2.body=document.createElement('div');
            this.mSArea3.subArea2.body.className='tab_item_area_sub';
            this.mSArea3.body.appendChild(this.mSArea3.subArea2.body);

            this.mSArea3.subArea2.column1.body=document.createElement('div');
            this.mSArea3.subArea2.column1.body.className='tab_item_area_sub_column';
            this.mSArea3.subArea2.body.appendChild(this.mSArea3.subArea2.column1.body);

            this.mSArea3.subArea2.column1.input_metter_timeValue=document.createElement('input');
            this.mSArea3.subArea2.column1.input_metter_timeValue.type='number';
            this.mSArea3.subArea2.column1.input_metter_timeValue.min=0;
            this.mSArea3.subArea2.column1.input_metter_timeValue.value=1;
            this.mSArea3.subArea2.body.appendChild(this.mSArea3.subArea2.column1.input_metter_timeValue);
            PageElements.onlyDigitsKey(this.mSArea3.subArea2.column1.input_metter_timeValue);

            this.mSArea3.subArea2.column2.body=document.createElement('div');
            this.mSArea3.subArea2.column2.body.className='tab_item_area_sub_column';
            this.mSArea3.subArea2.column2.body.indexText='✖'; //&#10006
            this.mSArea3.subArea2.body.appendChild(this.mSArea3.subArea2.column2.body);

            this.mSArea3.subArea2.column3.body=document.createElement('div');
            this.mSArea3.subArea2.column3.body.className='tab_item_area_sub_column';
            this.mSArea3.subArea2.body.appendChild(this.mSArea3.subArea2.column3.body);

            this.mSArea3.subArea2.column3.select=document.createElement('select');
            this.mSArea3.subArea2.column3.select.className="select";
            this.mSArea3.subArea2.column3.selectOptions=[];
            this.mSArea3.subArea2.column3.selectOptions[0]=document.createElement('option');
            this.mSArea3.subArea2.column3.selectOptions[0].value='1000';
            this.mSArea3.subArea2.column3.selectOptions[0].innerText='1 секунда'
            this.mSArea3.subArea2.column3.select.appendChild(this.mSArea3.subArea2.column3.selectOptions[0]);
            this.mSArea3.subArea2.column3.selectOptions[1]=document.createElement('option');
            this.mSArea3.subArea2.column3.selectOptions[1].value='60000';
            this.mSArea3.subArea2.column3.selectOptions[1].innerText='1 минута'
            this.mSArea3.subArea2.column3.select.appendChild(this.mSArea3.subArea2.column3.selectOptions[1]);
            this.mSArea3.subArea2.column3.selectOptions[2]=document.createElement('option');
            this.mSArea3.subArea2.column3.selectOptions[2].value='3600000';
            this.mSArea3.subArea2.column3.selectOptions[2].innerText='1 час'
            this.mSArea3.subArea2.column3.select.appendChild(this.mSArea3.subArea2.column3.selectOptions[2]);
            this.mSArea3.subArea2.column3.selectOptions[3]=document.createElement('option');
            this.mSArea3.subArea2.column3.selectOptions[3].value='86400000';
            this.mSArea3.subArea2.column3.selectOptions[3].innerText='1 сутки'
            this.mSArea3.subArea2.column3.select.appendChild(this.mSArea3.subArea2.column3.selectOptions[3]);
            this.mSArea3.subArea2.column3.body.appendChild(this.mSArea3.subArea2.column3.select);
        }

        addNameErr=function(text){
            let errText_nameExist=document.createElement('div');
            errText_nameExist.classList.add('text');
            errText_nameExist.classList.add('err');
            errText_nameExist.innerText=text;
            this.mSArea1.wraper_meter_name.appendChild(errText_nameExist);

            this.mSArea1.input_meter_name.classList.add('input');
            this.mSArea1.input_meter_name.classList.add('err');

            this.mSArea1.input_meter_name.addEventListener('input',()=>{
                this.mSArea1.input_meter_name.classList.remove('err');
                errText_nameExist.remove();
            })
        }

        
    },

    TrainingMessage: class{
        target;
        wraper;
        window;
        arrowWrapper;
        arrow;
        header;
        closeButton;
        text;

        closed=true;
        left;
        top;

        constructor(target, text, left=false, top=false, disableCloseButton=false){
            this.target=target;
            this.left=left;
            this.top=top;

            this.wraper=document.createElement('div');
            this.wraper.className='trainingMessage';
            document.body.appendChild(this.wraper);

            this.setPositionByTarget();

            if(!this.top){this.#createArrow();}
            
            this.window=document.createElement('div');
            this.window.className='trainingMessageWindow';
            this.wraper.appendChild(this.window);

            this.header=document.createElement('div');
            this.header.className='trainingMessageHeader';
            this.window.appendChild(this.header);

            this.closeButton=document.createElement('button');
            //this.closeButton.className="trainingMessageHeader_close";
            this.closeButton.innerText="✖"; //&#10006
            if(disableCloseButton){this.closeButton.classList.add('notAllowed');}
            this.header.appendChild(this.closeButton);

            this.text=document.createElement('div');
            this.text.className='trainingMessageContent';
            this.text.innerHTML  = text;
            this.window.appendChild(this.text);

            if(this.top){this.#createArrow();}

             //-----подключаем команды кнопкам управления
             //закрывающая кнопка
            this.closeButton.addEventListener("click", ()=>{
                this.close();
            })

            //
            this.target.addEventListener("mouseup", ()=>{
                if(this.wraper.className=='trainingMessage active'){
                    this.close();
                }
                
            })

        }

        activate=()=>{
            this.wraper.classList.add("active");
            this.closed=false;
        }

        close=()=>{
            this.wraper.classList.remove("active");
            this.closed=true;
        }

        setPositionByTarget=()=>{
            let targetRect=this.target.getBoundingClientRect();//получаем координаты целевого элемента
            
            // Устанавливаем позицию по горизонтали
            if(!this.left){
                this.wraper.style.left = targetRect.left+this.target.offsetWidth*0.2+ 'px';     
            }else{
                this.wraper.style.left = targetRect.left-this.wraper.offsetWidth+this.target.offsetWidth*0.3+ 'px'; 
            }
            // Устанавливаем позицию по вертикали
            if(!this.top){
                this.wraper.style.top = targetRect.top+this.target.offsetHeight*0.5 + 'px'; 
            }else{
                this.wraper.style.top = targetRect.top-this.wraper.offsetHeight + 'px'; 
            }
            
            
        }

        #createArrow=()=>{
            this.arrowWrapper=document.createElement('div');
            this.arrowWrapper.className='trainingMessageArrowWrapper';
            this.wraper.appendChild(this.arrowWrapper);
            if(this.left){ this.arrowWrapper.classList.add('left');}

            this.arrow=document.createElement('div');
            if(!this.top){this.arrow.className='trainingMessageArrow';}
            else{this.arrow.className='trainingMessageArrowDown';}
            this.arrowWrapper.appendChild(this.arrow);
        }

    },

    Cover:class{
        constructor(parent){
            this.parent=parent;

            this.body=document.createElement('div');
            this.body.className='cover';
            this.parent.appendChild(this.body);
        }
        parent={};
        body={};

        showed=false;
        
        show=()=>{
            let paretnRect= this.parent.getBoundingClientRect();
            this.body.style.top=`${paretnRect.top}px`;
            this.body.style.display='block';
            this.showed=true;
        };

        hide=()=>{
            this.body.style.display='none';
            this.showed=false;
        }
    },

    OkCancelAccept:class{
        parent;
        wrapper;
        accept;
        ok;
        cancel

        constructor(parent){
            this.parent=parent

            this.wrapper=document.createElement('div');
            this.wrapper.className='okCancelAccept';
            this.parent.appendChild(this.wrapper);

            this.accept=document.createElement('button');
            this.accept.className='okCancelAccept_button';
            this.accept.innerText='Применить';
            this.wrapper.appendChild(this.accept);

            this.cancel=document.createElement('button');
            this.cancel.className='okCancelAccept_button';
            this.cancel.innerText='Отмена';
            this.wrapper.appendChild(this.cancel);

            this.ok=document.createElement('button');
            this.ok.className='okCancelAccept_button';
            this.ok.innerText='OK';
            this.wrapper.appendChild(this.ok);

        }

        hide=(buttonName='ok')=>{
            try{
                this[buttonName].style.display='none';
            }catch(err){console.log(err)}
        }

        show=(buttonName='ok')=>{
            try{
                this[buttonName].style.display='block';
            }catch(err){console.log(err)}
        }
    }

}
