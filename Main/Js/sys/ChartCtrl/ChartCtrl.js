import {trendSetpoints, LocSessionName2} from "../GlobalConst.js";
import {locStorName, isJSON} from "../Functions.js";
import {DateTime} from "../DateTime.js";
import {ServerDataExchange} from "../ServerDataExchange/ServerDataExchange.js";
import {DefaultPar} from "./ChartCtrl_defPar.js";

//управление графиком
export class ChartCtrl{
    chart;
    cData={
        labels:[],
        baseLabels:[], //допольнительно
        datasets:[],
    };
    cOptions={
        aspectRatio:1,
        scales:{},
        animation:{},
        plugins:{}
    };
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
    defaultPar= DefaultPar;

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
    getDatasetProp=(name,key,defaultValNum=0)=>{

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
   setDatasetProp=(name,key)=>{

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
    getOptionsProp= (key,defaultValNum)=>{

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
     setOptionsProp=(key)=>{

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
    getYscales=()=>{
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
    getMinTime=()=>{
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
    getMaxTime=()=>{
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
   assembleChartOptins=(idPath)=>{
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
    assembleChartData=(dataFromServer)=>{
        

        //----если есть данные с сервера
        if(dataFromServer!=undefined){

            //заполняем временную ось
            let labels=[];  
            for(let XPoint of dataFromServer.xPoints){
                labels.push(new Date(XPoint));
            }
            this.cData.baseLabels=Array.from(labels); //дополнительно
            this.cData.labels=Array.from(labels);

            this.cData.datasets=[];
            //перебор трендов
            for(let trendNum=0; trendNum<dataFromServer.trends.length; trendNum++){
                let trend=dataFromServer.trends[trendNum];
                //временный датасет
                let tempDataset={
                    Name: trend.name, //дополнительно
                    label: trend.label,
                    baseData:[], //дополнительно
                    data:[],
                    yAxisID: this.getDatasetProp(trend.name,"yAxisID"),
                    hidden: this.getDatasetProp(trend.name,"hidden"),
                    stepped: this.getDatasetProp(trend.name,"stepped"),
                    fill: this.getDatasetProp(trend.name,"fill"),
                    pointStyle: this.getDatasetProp(trend.name,"pointStyle"),
                    borderWidth: this.getDatasetProp(trend.name,"borderWidth"),
                    borderColor: this.getDatasetProp(trend.name,"borderColor",trendNum),
                    tension: this.getDatasetProp(trend.name,"tension"),
                }
                //заполняем перемены временного датасета массивами 
                for(let point of trend.points){
                    //если к точке подвязан цвет
                    if(Array.isArray(point)){
                        if (!Array.isArray(tempDataset.backgroundColor)){
                            tempDataset.backgroundColor=[];
                        }
                        
                        tempDataset.backgroundColor.push(point[1]);
                        tempDataset.data.push(point[0]);
                        tempDataset.baseData.push(point[0]);
                        //если чистое значение точки
                    }else{

                        tempDataset.backgroundColor=this.getDatasetProp(trend.name,"backgroundColor",trendNum);

                        tempDataset.data.push(point);
                        tempDataset.baseData.push(point);

                    }
                }
                
                this.cData.datasets.push(tempDataset);  
            }

            //интегрирование данных трендов в плагин yScaleLegendsPlugin
            this.aux.toYSLPlugin(this.cData, this.cOptions);
        }
        


    };

    //----------
    rebuildTrends=(dataFromServer)=>{
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
                        if(Trend.name==dataset.Name){
        
                            dataset.label=Trend.label;
        
                            //значения
                            dataset.baseData=Array.from(Trend.points);
                            dataset.data=Array.from(Trend.points);
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
    updateTrends=(dataFromServer)=>{
        if(dataFromServer!=ServerDataExchange.NO_CHANGES){

            this.chart.stop();

            //заполняем временную ось по полученым данным
            for(let xPoint of dataFromServer.xPoints){
                this.cData.baseLabels.push(new Date(xPoint));
                this.cData.labels.push(new Date(xPoint));
            }
        

            //заполняем тренды по полученым данным
            for(let dataset of this.cData.datasets){
                for(let trend of dataFromServer.trends){
                    if(trend.name==dataset.Name){
                        //значения
                        for(let point of trend.points){
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