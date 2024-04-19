import {PageElements, ChartCtrl, TrainingMessages, locStorName,
     ServerDataExchange, DateTime, ChartsCollection} from "../../Main/Js/Functions.js";
 
//import {forChartPage} from  "../Js/Charts_main.js";
//console.log(forChartPage)

//------диаграмма
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
//масштабирование
let meterSettings_pageItem=document.querySelector('#meterSettings');
meterSettings_pageItem.addEventListener('click', ()=>{
    let parentDocument = window.parent.document;
    let workspace_iframe= parentDocument.querySelector('.workspace-iframe');
    workspace_iframe.style.height=`${document.body.offsetHeight+50}px`;

})

let meterSettingsWrap=document.querySelector('#meterSettingsWrap');
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

//кнопка применить
MeterSetting.applyButton.addEventListener('click',()=>{
    //формируем данные настройки счетчика
    let meterSettings={};
    meterSettings.ip=[];
    for(let i=0; i<4; i++){
        meterSettings.ip[i]=MeterSetting.mSArea2.input_ip[i].value;
    }
    meterSettings.rs_type=MeterSetting.mSArea2.select_rs_type.value;
    meterSettings.rs_port=MeterSetting.mSArea2.input_rs_port.value;
    meterSettings.rs485_adress=MeterSetting.mSArea2.input_rs485_adress.value;

    
    meterSettings.dataExchange=[]
    let i=0;
    for (let checkBoxLine of MeterSetting.mSArea3.subArea1.column1.cbLinesContent){
        let dataExchangeItem={
            name: `de${i}`,
            active:MeterSetting.mSArea3.subArea1.column1.cbList.checkBoxes[i].checked,
            label: checkBoxLine.parNameInput.value || checkBoxLine.parNameInput.placeholder,
            obisCode:checkBoxLine.parObisCodeInput.value || checkBoxLine.parObisCodeInput.placeholder
        }
        meterSettings.dataExchange.push(dataExchangeItem);
        i++;
    }
    for (let checkBoxLine of MeterSetting.mSArea3.subArea1.column2.cbLinesContent){
        let dataExchangeItem={
            name: `de${i}`,
            active:MeterSetting.mSArea3.subArea1.column2.cbList.checkBoxes[i-13].checked,
            label: checkBoxLine.parNameInput.value || checkBoxLine.parNameInput.placeholder,
            obisCode:checkBoxLine.parObisCodeInput.value || checkBoxLine.parObisCodeInput.placeholder
        }
        meterSettings.dataExchange.push(dataExchangeItem);
        i++;
    }

    meterSettings.exchangeTimeValue=MeterSetting.mSArea3.subArea2.column1.input_metter_timeValue.value;
    meterSettings.exchangeTimeType=MeterSetting.mSArea3.subArea2.column3.select.value;


    //команда изменения данных счетчика на сервере
    
    ServerDataExchange.setMeterSettings({
        idPath:forChartPageData.idPath,
        meterSettings:meterSettings

    })
})

//training messages
let meterSettings_checkbox=document.querySelector('#meterSettings_checkbox');
let meterSettingsHidden=true;

let TrainingMessagesMS=new TrainingMessages('meterSettings',[
    {target:MeterSetting.mSArea3.subArea1.column1.cbList.checkBoxes[0], text:'установите, или отмените опрос счетчика. При выключенном опросе значения будут равнятся нулю'},
    {target:MeterSetting.mSArea3.subArea2.column1.input_metter_timeValue, text:'данные настройки позволяют изменить период опроса счетчика'},
    {target:MeterSetting.applyButton, text:'чтобы изменения вступили в силу нажмите "Применить"'},
    ]);


TrainingMessagesMS.hide();
    
meterSettings_checkbox.addEventListener('click',()=>{
    meterSettingsHidden=!meterSettingsHidden;
    if(!meterSettingsHidden){TrainingMessagesMS.show();}
    else{TrainingMessagesMS.hide();}
})    

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


//------------Pop-up настроек
let OpenSettingsPopUp=document.querySelector("#CTBB_Settings");
//создаем Pop-up
let ChartSettingsPopUp=new PageElements.PopUp(document.body, OpenSettingsPopUp);


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

//присоединяем кнопку применить
export let PopUpApply=document.querySelector(".pop_up_apply");
ChartSettingsPopUp.body.appendChild(PopUpApply);

//активируем первую вкладку
tabs[0].click();

//training messages
let TrainingMessagesTS=new TrainingMessages('trendSettings',[
    {target:tabs[0], text:'Чтобы переключатся между группами настройки нажимайте соответствующие вкладки'},
    {target:PopUpApply, text:'Чтобы изменения вступили в силу нажмите данную кнопку. <br>Важно! Изменения применятся со всех вкладок'},
    ]);

TrainingMessagesTS.hide();

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

PopUpApply.addEventListener('click',()=>{
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

//присоединяем кнопку применить
let TimeRangeApply=document.querySelector("#TimeRangeApply");
ChartTimeRangePopUp.body.appendChild(TimeRangeApply);

//кнопка применить
TimeRangeApply.addEventListener('click',()=>{
    let DFSsecondValue;
    let DFSFirstVal=TimeRangeArea.startTimeInput.value;
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

})

//------------training messages
let TrainingMessagesC=new TrainingMessages('chart',[
    {target:document.querySelector('#meterSettings'), text:'нажмите, чтоб раскрыть меню настройки текущего счетчика'},
    {target:CTBB_Online, text:'нажмите, чтоб включить/выключить автопрокрутку графика при появлении новых данных'},
    {target:document.getElementById('Chart'), text: 'колесом мыши возможно изменение масштаба'},
    {target:document.getElementById('Chart'), text: 'движение мыши с ее зажатой кнопкой позволяет перемещатся вдоль осей'},
    {target:OpenSettingsPopUp, text: 'нажмите, чтобы настроить общий вид графика<br>фон, цвета трендов, оси и пр.'},
    ]);




