import {Chart} from "./Chart-1.js";

import {PageElements} from "../../Main/Js/PageElements/PageElements.js";


//---------Список трендов
let TrendListArea=document.querySelector("#tab1_checkboxArea");

let trendList=PageElements.CreateCheckBoxList(TrendListArea,'trendlistCBs',Chart.cData.datasets.length, 'тренды отсутсвуют');


//добавляем данные в чек-бокс лист
for(let i=0; i<Chart.cData.datasets.length; i++){
    trendList.checkBoxes[i].value=Chart.cData.datasets[i].Name;
    trendList.cbLabels[i].innerText=Chart.cData.datasets[i].label;
}

let Name="";


//экспортируем элемент
export let CheckBoxArr=trendList.checkBoxes;

//проверка, какой тренд выбран
let defParNam=0;
TrendListArea.addEventListener('click',()=>{
    for(let i=0; i< CheckBoxArr.length; i++){
        if(CheckBoxArr[i].checked){
            Name=CheckBoxArr[i].value;
            defParNam=i;
            break;
        }
    }
});

//---------Список шкал значений
let valScales=Chart.getYscales();
export let valueAxisList=document.querySelector("#ValueAxisList");

//добавляем  опций
export let valueAxisListBuild=function(){
    let valueAxisListOptions=[];

    for(let i=0; i<valScales.length; i++){
        valueAxisListOptions[i]=document.createElement('option');

        if(i==0){valueAxisListOptions[i].value='y';}
        else{valueAxisListOptions[i].value=`y${i}`;}  
    
        valueAxisListOptions[i].innerText=Chart.getOptionsProp(`scales=${valueAxisListOptions[i].value}=name`)+
        ': '+Chart.getOptionsProp(`scales=${valueAxisListOptions[i].value}=title=text`);

        valueAxisList.appendChild(valueAxisListOptions[i]);
    }

}
valueAxisListBuild();

valueAxisList.value=Chart.getDatasetProp(Name,"yAxisID");

//изменен тренд
TrendListArea.addEventListener('click',()=>{
    valueAxisList.value=Chart.getDatasetProp(Name,"yAxisID");
});

//---------элемент типа тренда
export let select_TrendType=document.querySelector("#select_TrendType");
select_TrendType.value =`stepped=${Chart.getDatasetProp(Name,"stepped")}`;

//изменен тренд
TrendListArea.addEventListener('click',()=>{
    select_TrendType.value =`stepped=${Chart.getDatasetProp(Name,"stepped")}`;
})

//---------элемент цвета тренда
const pickr_trends = Pickr.create({
    el: '#color-picker_trends',
    theme: 'classic', // or 'monolith', or 'nano'

    swatches: Chart.defaultPar.trend.borderColor,

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            hsla: false,
            hsva: false,
            cmyk: false,
            input: true,
            clear: true,
            save: true
        }
    }
});

//добавляем логику выбора цвета
export let borderColor_trends=Chart.getDatasetProp(Name,"borderColor",defParNam);

//изменен тренд
TrendListArea.addEventListener('click',()=>{
    pickr_trends.setColor(Chart.getDatasetProp(Name,"borderColor",defParNam));
});

//пикер инициирован
pickr_trends.on('init', instance => {
    pickr_trends.setColor(borderColor_trends);

})

pickr_trends.on('save', (color) => {
    borderColor_trends= color.toHEXA().toString();
})
//---------чекбокс заполнить
export let CB_Filled=document.querySelector("#CB_Filled");
if(Chart.getDatasetProp(Name,"fill")==true && !CB_Filled.checked){CB_Filled.click();}
if(Chart.getDatasetProp(Name,"fill")==false && CB_Filled.checked){CB_Filled.click();};
//изменен тренд
TrendListArea.addEventListener('click',()=>{
    if(Chart.getDatasetProp(Name,"fill")==true && !CB_Filled.checked){CB_Filled.click();}
    if(Chart.getDatasetProp(Name,"fill")==false && CB_Filled.checked){CB_Filled.click();};
})

//---------элемент стилей точек графика
export let DotSelector=document.querySelector("#select_TrendDots");
DotSelector.value =`pointStyle=${Chart.getDatasetProp(Name,"pointStyle")}`;
//изменен тренд
TrendListArea.addEventListener('click',()=>{
    DotSelector.value =`pointStyle=${Chart.getDatasetProp(Name,"pointStyle")}`;
})

//---------элемент толщины линии графика
export let LineWidthInput=document.querySelector("#input_line_width");
LineWidthInput.value=Chart.getDatasetProp(Name,"borderWidth");
const LINE_WIDTH_MIN_VAL=0.5;
PageElements.setInputMinMax(LineWidthInput, LINE_WIDTH_MIN_VAL, 30);

//изменен тренд
TrendListArea.addEventListener('click',()=>{
    LineWidthInput.value=Chart.getDatasetProp(Name,"borderWidth");
})

//---------элемент натяжения линии графика
export let range_TrendTension=document.querySelector("#range_TrendTension");
range_TrendTension.value=Chart.getDatasetProp(Name,"tension")*100;
//изменен тренд
TrendListArea.addEventListener('click',()=>{
    range_TrendTension.value=Chart.getDatasetProp(Name,"tension")*100;
})