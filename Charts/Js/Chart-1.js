import {locStorName} from "../../Main/Js/sys/Functions.js";

import {ChartsCollection} from "../../Main/Js/sys/ChartsCollection.js";
import {ChartCtrl} from "../../Main/Js/sys/ChartCtrl/ChartCtrl.js";
import {DateTime} from "../../Main/Js/sys/DateTime.js";
import {PageElements} from "../../Main/Js/sys/PageElements/PageElements.js";
import {ServerDataExchange} from "../../Main/Js/sys/ServerDataExchange/ServerDataExchange.js";
import {TrainingMessages} from "../../Main/Js/sys/TrainingMessages.js";

import {Chart_meterSetiings} from "./Chart_meterSettings.js";

import {Chart_Config_PopUp} from "./Chart_Config_PopUp.js";
import {Chart_Config_tab1} from "./Chart_Config_tab1.js";
import {Chart_Config_tab2} from "./Chart_Config_tab2.js";
import {Chart_Config_tab3} from "./Chart_Config_tab3.js";
import {Chart_Config_tab4} from "./Chart_Config_tab4.js";
import {Chart_Config_Buttons} from "./Chart_Config_Buttons.js"

  

export let Chart;
export let chartContainer;
export let Chart_Config_PopUp_inst;
export let forChartPageData;
export let chartCover_zIndex;
export let TrainingMessagesC;
export let cover;
export let workspace_iframe;

async function chartFunction(){
    //-----инициируем элементы страницы для разных функций
    workspace_iframe=window.parent.document.querySelector('.workspace-iframe');
    let chartWrapper=document.querySelector('#chart_wrapper');
    let chart_statusBar=document.querySelector('#chart_statusBar');
    cover=window.parent.document.querySelector('.cover');

    //блокирующий фон для тренировочных сообщений
    let chartCover=new PageElements.Cover(chartWrapper);
    chartCover_zIndex=window.getComputedStyle(chartCover.body).zIndex;

    //общие данные для страницы диаграммы
    forChartPageData=JSON.parse(sessionStorage.getItem(locStorName(ChartsCollection.FOR_CHART_PAGE_STORAGENAME)));

    //------------область настроек счетчика
    let Chart_meterSetiingsInst= new Chart_meterSetiings();

    //------диаграмма
    //Определяем тип диаграммы
    let ChartType= 'line';

    //для создания графиков используется библиотека Chart.js, скачанная через npm
    //npm install chart.js
    //***Получение контекста canvas
    let chartCanvas = document.getElementById('Chart').getContext('2d');

    //***Создание и отображение диаграммы
    Chart=new ChartCtrl(chartCanvas,ChartType,forChartPageData.idPath);

    //фон графика
    chartContainer=document.querySelector('#ChartContainer');
    chartContainer.style.backgroundColor=Chart.getOptionsProp('background');

    //------------Pop-up настроек графика
    Chart_Config_PopUp_inst=new Chart_Config_PopUp();


    //--------загружаем данные графика из сервера
    let chartLoader=new PageElements.LoaderType2(chart_statusBar);
    chartLoader.loader.style.float='right';
    //функция запроса данных, которая применяется несколько раз далее
    async function loadDataToChart(type,firstVal, secondVal){
        chartLoader.show();

        let DataFromServer=
        await ServerDataExchange.GetChartData(forChartPageData.idPath,
        {
            type:type,
            firstValue:firstVal,
            secondValue:secondVal
        });

        Chart.rebuildTrends(DataFromServer);
        chartLoader.hide();

    }

    //запрашиваем данные из сервера
    let DFSstartVal=Chart.getMinTime();
    let DFSecondVal=Chart.getMaxTime(); 
    let DFSType=2//мин макс время;
    await loadDataToChart(DFSType,DFSstartVal,DFSecondVal);
            
    

    //------------Pop-up Списка трендов счетчика
    let CTBB_SelectTrend=document.querySelector("#CTBB_SelectTrend");
    //создаем Pop-up
    let SelectTrendPopUp=new PageElements.PopUp(document.body, CTBB_SelectTrend);

    //создаем список
    let parameterCBList=PageElements.CreateCheckBoxList(SelectTrendPopUp.body, 'parameterCBList',Chart.cData.datasets.length);
    let i=0;
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
        async function getData(){
            chartLoader.show();
            //запрашиваем данные
            let dataFromServerForUpdate=
            await ServerDataExchange.GetChartData(forChartPageData.idPath,
            {
                type:'1',
                firstValue:firstVal,
                secondValue:secondVal
            });

            //добавление данных в график
            Chart.updateTrends(dataFromServerForUpdate);
            //
            chartLoader.hide();
        }
        getData();
        

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
    async function timeRangeAccept(){
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

        await loadDataToChart(DFSType,DFSFirstVal,DFSsecondValue);
    }
    //кнопки ок/отмена/применить
    tRangeSetOCA.accept.addEventListener('click',()=>{
        timeRangeAccept.call(this);
    });
    tRangeSetOCA.ok.addEventListener('click',()=>{
        timeRangeAccept.call(this);
        ChartTimeRangePopUp.close();
    });
    tRangeSetOCA.cancel.addEventListener('click',()=>{
        ChartTimeRangePopUp.close();
    });

    //------------training messages
    TrainingMessagesC=new TrainingMessages('chart',[
        {target:document.querySelector('#meterSettings'), text:'нажмите, чтоб раскрыть меню настройки текущего счетчика',disableCloseButton:true},
        {target:CTBB_Online, text:'нажмите, чтоб включить/выключить автопрокрутку графика при появлении новых данных'},
        {target:document.getElementById('Chart'), text: 'колесом мыши возможно изменение масштаба'},
        {target:document.getElementById('Chart'), text: 'движение мыши с ее зажатой кнопкой позволяет перемещатся вдоль осей'},
        {target:Chart_Config_PopUp_inst.OpenSettingsPopUp, text: 'нажмите, чтобы настроить общий вид графика<br>фон, цвета трендов, оси и пр.'},
        ]);

        TrainingMessagesC.hide();

        if(!TrainingMessagesC.trainingFinished){chartCover.show();}
        else{chartCover.hide()}
        
        

        let TMCinterval=setInterval(()=>{
        
            //контроль показывания тренировочных сообщений и блокирующего фона
            if(cover.style.display=='block'){TrainingMessagesC.hide();}
            else{
                if(TrainingMessagesC.optionsNum==0 || 
                    (TrainingMessagesC.optionsNum>=1 &&  Chart_meterSetiingsInst.TrainingMsg.trainingFinished)){
                        
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

    //--------
    //инициируем функционал вкладки 1
    let Tab1=new Chart_Config_tab1();

    //инициируем функционал вкладки 2
    let Tab2=new Chart_Config_tab2();

    //инициируем функционал вкладки 3
    let Tab3=new Chart_Config_tab3();

    //инициируем функционал вкладки 4
    let Tab4=new Chart_Config_tab4();

    //функционал кнопок применить/отмена/ок  
    let Chart_Config_Buttons_Inst=new Chart_Config_Buttons();

 }

 chartFunction();
 





