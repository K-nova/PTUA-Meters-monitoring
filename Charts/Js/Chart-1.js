import {locStorName} from "/Main/Js/sys/Functions.js";

import {ChartsCollection} from "/Main/Js/sys/ChartsCollection.js";
import {ChartCtrl} from "/Main/Js/sys/ChartCtrl/ChartCtrl.js";
import {DateTime} from "/Main/Js/sys/DateTime.js";
import {PageElements} from "/Main/Js/sys/PageElements/PageElements.js";
import {ServerDataExchange} from "/Main/Js/sys/ServerDataExchange/ServerDataExchange.js";
import {TrainingMessages} from "/Main/Js/sys/TrainingMessages.js";

 //import{ChartColl} from '/Charts/Js/Charts_main.js';    
 
//-----инициируем элементы страницы для разных функций
let workspace_iframe=window.parent.document.querySelector('.workspace-iframe');

//------диаграмма
//блокирующий фон для тренировочных сообщений
let chartCover=new PageElements.Cover(document.querySelector('#chart_wrapper'));
let chartCover_zIndex=window.getComputedStyle(chartCover.body).zIndex;

//общие данные для страницы диаграммы
let forChartPageData=JSON.parse(sessionStorage.getItem(locStorName(ChartsCollection.FOR_CHART_PAGE_STORAGENAME)));
//Определяем тип диаграммы
let ChartType= 'line';

//для создания графиков используется библиотека Chart.js, скачанная через npm
//npm install chart.js
//***Получение контекста canvas
let chartCanvas = document.getElementById('Chart').getContext('2d');

//***Создание и отображение диаграммы
export let Chart=new ChartCtrl(chartCanvas,ChartType,forChartPageData.idPath);

//фон графика
export let chartContainer=document.querySelector('#ChartContainer');
chartContainer.style.backgroundColor=Chart.getOptionsProp('background');


//--------загружаем данные графика из сервера
//функция запроса данных, которая применяется несколько раз далее
let loadDataToChart=function(type,firstVal, secondVal){

    let loader=document.querySelector('.loader');
    loader.classList.add('visible');

    let DataFromServer=
    ServerDataExchange.GetChartData(forChartPageData.idPath,
    {
        type:type,
        firstValue:firstVal,
        secondValue:secondVal
    });

    Chart.rebuildTrends(DataFromServer);

    loader.classList.remove('visible');
}

//запрашиваем данные из сервера
let DFSstartVal=Chart.getMinTime();
let DFSecondVal=Chart.getMaxTime(); 
let DFSType=2//мин макс время;
loadDataToChart(DFSType,DFSstartVal,DFSecondVal);

//------------настройки счетчика
//изменение родительского экрана
let meterSettings_checkbox=document.querySelector('#meterSettings_checkbox');
let meterSettingsWrap=document.querySelector('#meterSettingsWrap');

let ws_iframe_heightInit;
meterSettings_checkbox.addEventListener('click',()=>{
    if(meterSettings_checkbox.checked){
        ws_iframe_heightInit=workspace_iframe.offsetHeight;
        workspace_iframe.style.height=workspace_iframe.offsetHeight+meterSettingsWrap.offsetHeight+100+'px';
    }else{
        workspace_iframe.style.height=ws_iframe_heightInit+'px';
    }
})

//
let MeterSetting=new PageElements.MeterSettingsContent(meterSettingsWrap);
let meterSettingsData=ServerDataExchange.getMeterSettings(forChartPageData.idPath);

//область Общее
MeterSetting.mSArea1.input_meter_path.value=forChartPageData.path;
MeterSetting.mSArea1.input_meter_name.value=forChartPageData.name;

//область Подключение
for(let i=0; i<4; i++){
    MeterSetting.mSArea2.input_ip[i].value=meterSettingsData.ip[i];
}
MeterSetting.mSArea2.select_rs_type.value=meterSettingsData.rs_type;
MeterSetting.mSArea2.input_rs_port.value=meterSettingsData.rs_port;
MeterSetting.mSArea2.input_rs485_adress.value=meterSettingsData.rs485_adress;

//область Параметры
MeterSetting.mSArea3.subArea1.column1.cbList.setUnchecked(0);

let i=0;
for(let checkBoxLine of MeterSetting.mSArea3.subArea1.column1.cbLinesContent){
    checkBoxLine.parNameInput.value=meterSettingsData.dataExchange[i].label;
    checkBoxLine.parObisCodeInput.value=meterSettingsData.dataExchange[i].obisCode;
    MeterSetting.mSArea3.subArea1.column1.cbList.checkBoxes[i].checked=meterSettingsData.dataExchange[i].active;
    i++;
}

for(let checkBoxLine of MeterSetting.mSArea3.subArea1.column2.cbLinesContent){
    checkBoxLine.parNameInput.value=meterSettingsData.dataExchange[i].label;
    checkBoxLine.parObisCodeInput.value=meterSettingsData.dataExchange[i].obisCode;
    MeterSetting.mSArea3.subArea1.column2.cbList.checkBoxes[i-13].checked=meterSettingsData.dataExchange[i].active;
    i++;
}
MeterSetting.mSArea3.subArea2.column1.input_metter_timeValue.value=meterSettingsData.exchangeTimeValue;
MeterSetting.mSArea3.subArea2.column3.select.value=meterSettingsData.exchangeTimeType;

//функция применить
let meterSettingApply=()=>{
    //формируем данные настройки счетчика
    let setMeterData={text:{}, meterSettings:{}};
    //общее
    setMeterData.text=MeterSetting.mSArea1.input_meter_name.value;
    //подключение
    setMeterData.meterSettings.ip=[];
    for(let i=0; i<4; i++){
        setMeterData.meterSettings.ip[i]=MeterSetting.mSArea2.input_ip[i].value;
    }
    setMeterData.meterSettings.rs_type=MeterSetting.mSArea2.select_rs_type.value;
    setMeterData.meterSettings.rs_port=MeterSetting.mSArea2.input_rs_port.value;
    setMeterData.meterSettings.rs485_adress=MeterSetting.mSArea2.input_rs485_adress.value;

    //параметры
    setMeterData.meterSettings.dataExchange=[]
    let i=0;
    for (let checkBoxLine of MeterSetting.mSArea3.subArea1.column1.cbLinesContent){
        let dataExchangeItem={
            name: `de${i}`,
            active:MeterSetting.mSArea3.subArea1.column1.cbList.checkBoxes[i].checked,
            label: checkBoxLine.parNameInput.value || checkBoxLine.parNameInput.placeholder,
            obisCode:checkBoxLine.parObisCodeInput.value || checkBoxLine.parObisCodeInput.placeholder
        }
        setMeterData.meterSettings.dataExchange.push(dataExchangeItem);
        i++;
    }
    for (let checkBoxLine of MeterSetting.mSArea3.subArea1.column2.cbLinesContent){
        let dataExchangeItem={
            name: `de${i}`,
            active:MeterSetting.mSArea3.subArea1.column2.cbList.checkBoxes[i-13].checked,
            label: checkBoxLine.parNameInput.value || checkBoxLine.parNameInput.placeholder,
            obisCode:checkBoxLine.parObisCodeInput.value || checkBoxLine.parObisCodeInput.placeholder
        }
        setMeterData.meterSettings.dataExchange.push(dataExchangeItem);
        i++;
    }

    setMeterData.meterSettings.exchangeTimeValue=MeterSetting.mSArea3.subArea2.column1.input_metter_timeValue.value;
    setMeterData.meterSettings.exchangeTimeType=MeterSetting.mSArea3.subArea2.column3.select.value;

    //команда изменения данных счетчика на сервере
    
    let setMeterResponse=ServerDataExchange.setMeterSettings({
        idPath:forChartPageData.idPath,
        text:setMeterData.text,
        meterSettings:setMeterData.meterSettings

    })
    if(setMeterResponse.err){
        if(setMeterResponse.errDescription==ServerDataExchange.ERR_NAMEALREADYEXIST){
            MeterSetting.addNameErr('Такое имя уже существует в данной папке!');          

        }
    }
}

//кнопки ок/отмена/применить
MeterSetting.okCancelAccept.accept.addEventListener('click',()=>{
    meterSettingApply();
});
MeterSetting.okCancelAccept.hide('ok');
MeterSetting.okCancelAccept.hide('cancel');

//training messages
let meterSettingsALabel=document.querySelector('#meterSettingsALabel');

let TrainingMessagesMS=new TrainingMessages('meterSettings',[
    {target:MeterSetting.mSArea3.subArea1.column1.cbList.checkBoxes[0], text:'установите, или отмените опрос счетчика. При выключенном опросе значения будут равнятся нулю'},
    {target:MeterSetting.mSArea3.subArea2.column1.input_metter_timeValue, text:'данные настройки позволяют изменить период опроса счетчика'},
    {target:MeterSetting.okCancelAccept.accept, text:'чтобы изменения вступили в силу нажмите "Применить"', left:true},
    {target:document.querySelector('#meterSettings .accordion_label'), text:'нажмите, чтоб скрыть меню настройки текущего счетчика',disableCloseButton:true},
    ]);

TrainingMessagesMS.setZIndex(chartCover_zIndex+1);

TrainingMessagesMS.hide();

let cover=window.parent.document.querySelector('.cover');
let TMMSinterval=setInterval(()=>{

    //показывать или скрывать тренировочные сообщения
    if(cover.style.display=='block'){TrainingMessagesMS.hide();}
    else{
        if(TrainingMessagesC!=undefined && TrainingMessagesC.optionsNum>=1 && meterSettings_checkbox.checked){
            TrainingMessagesMS.show();
        }else{
            TrainingMessagesMS.hide();
        }
        
    }

    //подсвечивать кнопку раскрытия настроек счетчика, если тренировка не пройдена
    if(!meterSettings_checkbox.checked && !TrainingMessagesMS.trainingFinished){
        meterSettingsALabel.classList.add('blinking');
    }else{meterSettingsALabel.classList.remove('blinking');}

    //отключение периодического опроса, если тренировка пройдена
    if(TrainingMessagesMS.trainingFinished){
        clearInterval(TMMSinterval);
    }

},1000);
    
   

//------------Pop-up Списка трендов счетчика
let CTBB_SelectTrend=document.querySelector("#CTBB_SelectTrend");
//создаем Pop-up
let SelectTrendPopUp=new PageElements.PopUp(document.body, CTBB_SelectTrend);

//создаем список
let parameterCBList=PageElements.CreateCheckBoxList(SelectTrendPopUp.body, 'parameterCBList',Chart.cData.datasets.length);
i=0;
for(let dataset of Chart.cData.datasets){
    //создаем текст
    parameterCBList.cbLabels[i].innerText=dataset.label;
    //ставим/снимаем галочку
    if(!dataset.hidden){parameterCBList.setChecked(i);}
    else{parameterCBList.setUnchecked(i);}
    //добавляем реакцию на изменения параметра
    parameterCBList.checkBoxes[i].addEventListener("click",()=>{
        let i2=0;
        for(let dataset of Chart.cData.datasets){
            let checkbox=document.querySelector(`#parameterCBList_item_${i2}`);
            Chart.setDatasetProp(dataset.Name,`hidden=${!checkbox.checked}`);
            i2++;
        }
       
    })

    i++;
}


//------------Pop-up настроек графика
let OpenSettingsPopUp=document.querySelector("#CTBB_Settings");
//создаем Pop-up
export let ChartSettingsPopUp=new PageElements.PopUp(document.body, OpenSettingsPopUp);

//---------Pop-up tabs
//присоединяем табы
ChartSettingsPopUp.body.appendChild(document.querySelector(".pop_up_body_tabs"));

let tabs=document.querySelectorAll(".tab");

let CStabItems=document.querySelectorAll(".tab_item.cs");

tabs.forEach((tab)=>{
    tab.addEventListener("click",()=>{
        let currentTab=tab;
        let tabId=currentTab.getAttribute("tab-data");
        let currentTabItem=document.querySelector(tabId);

        if(!currentTab.classList.contains('active')){
            tabs.forEach((otherTab)=>{
                otherTab.classList.remove('active');
            })
            CStabItems.forEach((tabItem)=>{
                tabItem.classList.remove('active');
            })
    
            currentTab.classList.add('active');
            currentTabItem.classList.add('active');
        }
 
    })
})

//присоединяем вкладки
for(let TabItem of CStabItems){
    ChartSettingsPopUp.body.appendChild(TabItem);
}

//активируем первую вкладку
tabs[0].click();

//--------кнопки ок/отмена/применить
export let chartSetOCA=new PageElements.OkCancelAccept(ChartSettingsPopUp.body);
//изменение родительского экрана

let ws_iframe_heightInit2;
ChartSettingsPopUp.calllButton.addEventListener('click',()=>{
    if(ChartSettingsPopUp.displayed){
        ws_iframe_heightInit2=workspace_iframe.offsetHeight;
        if(workspace_iframe.offsetHeight<ChartSettingsPopUp.body.offsetHeight){
            workspace_iframe.style.height=ChartSettingsPopUp.body.offsetHeight+20+'px';
        }
    }else{
        workspace_iframe.style.height=ws_iframe_heightInit2;
    }
})

let ws_iframe_backToInitHeight=()=>{
    workspace_iframe.style.height=ws_iframe_heightInit2+'px';
}

ChartSettingsPopUp.closeButton.addEventListener('click',()=>{
    ws_iframe_backToInitHeight();
})

chartSetOCA.ok.addEventListener("click", ()=>{
    ws_iframe_backToInitHeight();
})

chartSetOCA.cancel.addEventListener("click", ()=>{
    ws_iframe_backToInitHeight();
})


//------training messages Pop-up tabs
let TrainingMessagesTS=new TrainingMessages('trendSettings',[
    {target:tabs[0], text:'Чтобы переключатся между группами настройки нажимайте соответствующие вкладки'},
    {target:chartSetOCA.ok, text:'Чтобы изменения вступили в силу нажмите данную кнопку. <br>Важно! Изменения применятся со всех вкладок', top:true},
    ]);

TrainingMessagesTS.hide();

let TMTSinterval=setInterval(()=>{
    
    if(cover.style.display=='block'){TrainingMessagesTS.hide();}
    else{
        if(ChartSettingsPopUp.displayed){
            TrainingMessagesTS.show();
        }
        
    }

    //отключение периодического опроса, если тренировка пройдена
    if(TrainingMessagesTS.trainingFinished){
        clearInterval(TMTSinterval);
    }

},1000);

let CSPopUpCtrlVisibility=()=>{
    ChartSettingsPopUp.main.addEventListener('transitionend', ()=>{
        if(ChartSettingsPopUp.displayed){TrainingMessagesTS.show();  }
        else{TrainingMessagesTS.hide();}
    })
    
}
ChartSettingsPopUp.calllButton.addEventListener('click',()=>{
    CSPopUpCtrlVisibility();
})

ChartSettingsPopUp.closeButton.addEventListener('click',()=>{
    CSPopUpCtrlVisibility();
})

chartSetOCA.ok.addEventListener('click',()=>{
    CSPopUpCtrlVisibility();
})
chartSetOCA.accept.addEventListener('click',()=>{
    CSPopUpCtrlVisibility();
})
chartSetOCA.cancel.addEventListener('click',()=>{
    CSPopUpCtrlVisibility();
})


//----------онлайн/офлайн контроль
let CTBB_Online=document.querySelector('#CTBB_Online');


CTBB_Online.addEventListener('click',()=>{
    if(!CTBB_Online.classList.contains('active')){
        CTBB_Online.classList.add('active');
    }else{
        CTBB_Online.classList.remove('active');
    }
    Chart.pauseMode=!Chart.pauseMode;
    
})


let serverReqInterval=setInterval(()=>{

    //запрос данных на сервер
    let curDate=new Date();
    let oneSecAgo=curDate.setSeconds(curDate.getSeconds() - 2);
    let firstVal=DateTime.DateToDCS(new Date(oneSecAgo));
    let secondVal=[2,1000]; //2 секунды
    let dataFromServerForUpdate=
    ServerDataExchange.GetChartData(forChartPageData.idPath,
    {
        type:'1',
        firstValue:firstVal,
        secondValue:secondVal
    });

    //добавление данных в график
    
    Chart.updateTrends(dataFromServerForUpdate);

},2000);





//------------Pop-up диапазона времени
let OpenTimeRangePopUp=document.querySelector("#CTBB_TimeRange");
//создаем Pop-up
let ChartTimeRangePopUp=new PageElements.PopUp(document.body, OpenTimeRangePopUp);

//создаем область выбора времени
let TimeRangeArea=PageElements.CreateTimeRangeSettings(ChartTimeRangePopUp.body, 'timeRangeArea');

//блокируем функционал
TimeRangeArea.TimeRangeSelectorOptions[2].disabled=true;

//присоединяем кнопки ок/отмена/применить
let tRangeSetOCA=new PageElements.OkCancelAccept(ChartTimeRangePopUp.body);

//функция применить
let timeRangeAccept=()=>{
    let DFSsecondValue;
    let DFSFirstVal=DateTime.StringToDCS(TimeRangeArea.startTimeInput.value);
    let DFSType=TimeRangeArea.timeRangeSelector.value;

    switch(DFSType){
        case '1':
            DFSsecondValue=[TimeRangeArea.timeRangeInput.value,TimeRangeArea.timeRangeItemSelect.value];
            break;
        case '2':
            DFSsecondValue=TimeRangeArea.endTimeInput.value;
            break;
    }

    loadDataToChart(DFSType,DFSFirstVal,DFSsecondValue);
}
//кнопки ок/отмена/применить
tRangeSetOCA.accept.addEventListener('click',()=>{
    timeRangeAccept();
});
tRangeSetOCA.ok.addEventListener('click',()=>{
    timeRangeAccept();
    ChartTimeRangePopUp.close();
});
tRangeSetOCA.cancel.addEventListener('click',()=>{
    ChartTimeRangePopUp.close();
});

//------------training messages
let TrainingMessagesC=new TrainingMessages('chart',[
    {target:document.querySelector('#meterSettings'), text:'нажмите, чтоб раскрыть меню настройки текущего счетчика',disableCloseButton:true},
    {target:CTBB_Online, text:'нажмите, чтоб включить/выключить автопрокрутку графика при появлении новых данных'},
    {target:document.getElementById('Chart'), text: 'колесом мыши возможно изменение масштаба'},
    {target:document.getElementById('Chart'), text: 'движение мыши с ее зажатой кнопкой позволяет перемещатся вдоль осей'},
    {target:OpenSettingsPopUp, text: 'нажмите, чтобы настроить общий вид графика<br>фон, цвета трендов, оси и пр.'},
    ]);

    TrainingMessagesC.hide();

    if(!TrainingMessagesC.trainingFinished){chartCover.show();}
    else{chartCover.hide()}
    
    

    let TMCinterval=setInterval(()=>{
    
        //контроль показывания тренировочных сообщений и блокирующего фона
        if(cover.style.display=='block'){TrainingMessagesC.hide();}
        else{
            if(TrainingMessagesC.optionsNum==0 || 
                (TrainingMessagesC.optionsNum>=1 &&  TrainingMessagesMS.trainingFinished)){
                    
                TrainingMessagesC.show();
                if(TrainingMessagesC.optionsNum>=1){chartCover.hide();}            
            }else{
                TrainingMessagesC.hide();
                chartCover.show();
            }
            
        }

        //контроль z положения тренировочных сообщений
        if(TrainingMessagesC.optionsNum==0){TrainingMessagesC.setZIndex(chartCover_zIndex+1);}
        else{TrainingMessagesC.setZIndex(1);}
        
        //отключение периодического опроса, если тренировка пройдена
        if(TrainingMessagesC.trainingFinished && !chartCover.showed){
            clearInterval(TMCinterval);
        }
    },1000);




