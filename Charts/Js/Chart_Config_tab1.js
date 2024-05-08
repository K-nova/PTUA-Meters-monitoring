import {Chart} from "./Chart-1.js";

import {PageElements} from "../../Main/Js/sys/PageElements/PageElements.js";

//Singleton класс
export class Chart_Config_tab1{
    #valScales;
    
    checkBoxArr;
    valueAxisList;
    select_TrendType;
    borderColor_trends;
    checkbox_Filled;
    dotSelector;
    lineWidthInput;
    range_TrendTension;

    //конструктор
    constructor(){
        if(typeof Chart_Config_tab1.instance==='object'){ return Chart_Config_tab1.instance;}
        Chart_Config_tab1.instance=this;
        this.#mainConstruct();
        return this;
    }
    
    //
    #mainConstruct=()=>{
        //---------Список трендов
        let TrendListArea=document.querySelector("#tab1_checkboxArea");

        let trendList=PageElements.CreateCheckBoxList(TrendListArea,'trendlistCBs',Chart.cData.datasets.length, 'тренды отсутсвуют');


        //добавляем данные в чек-бокс лист
        for(let i=0; i<Chart.cData.datasets.length; i++){
            trendList.checkBoxes[i].value=Chart.cData.datasets[i].Name;
            trendList.cbLabels[i].innerText=Chart.cData.datasets[i].label;
        }

        //экспортируем элемент
        this.checkBoxArr=trendList.checkBoxes;

        //проверка, какой тренд выбран
        let Name="";
        let defParNam=0;
        let getTrendListName=()=>{
            for(let i=0; i< this.checkBoxArr.length; i++){
                if(this.checkBoxArr[i].checked){
                    Name=this.checkBoxArr[i].value;
                    defParNam=i;
                    break;
                }
            }
        }

        getTrendListName();
        
        TrendListArea.addEventListener('click',()=>{
            getTrendListName();
        });

        //---------Список шкал значений
        this.#valScales=Chart.getYscales();
        this.valueAxisList=document.querySelector("#ValueAxisList");

        //добавляем  опций
        this.valueAxisListBuild();

        this.valueAxisList.value=Chart.getDatasetProp(Name,"yAxisID");

        //изменен тренд
        TrendListArea.addEventListener('click',()=>{
            this.valueAxisList.value=Chart.getDatasetProp(Name,"yAxisID");
        });

        //---------элемент типа тренда
        this.select_TrendType=document.querySelector("#select_TrendType");
        this.select_TrendType.value =`stepped=${Chart.getDatasetProp(Name,"stepped")}`;

        //изменен тренд
        TrendListArea.addEventListener('click',()=>{
            this.select_TrendType.value =`stepped=${Chart.getDatasetProp(Name,"stepped")}`;
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
        this.borderColor_trends=Chart.getDatasetProp(Name,"borderColor",defParNam);

        //изменен тренд
        TrendListArea.addEventListener('click',()=>{
            pickr_trends.setColor(Chart.getDatasetProp(Name,"borderColor",defParNam));
        });

        //пикер инициирован
        pickr_trends.on('init', instance => {
            pickr_trends.setColor(this.borderColor_trends);

        })

        pickr_trends.on('save', (color) => {
            this.borderColor_trends= color.toHEXA().toString();
        })

        //---------чекбокс заполнить
        this.checkbox_Filled=document.querySelector("#CB_Filled");
        if(Chart.getDatasetProp(Name,"fill")==true && !this.checkbox_Filled.checked){this.checkbox_Filled.click();}
        if(Chart.getDatasetProp(Name,"fill")==false && this.checkbox_Filled.checked){this.checkbox_Filled.click();};
        //изменен тренд
        TrendListArea.addEventListener('click',()=>{
            if(Chart.getDatasetProp(Name,"fill")==true && !this.checkbox_Filled.checked){this.checkbox_Filled.click();}
            if(Chart.getDatasetProp(Name,"fill")==false && this.checkbox_Filled.checked){this.checkbox_Filled.click();};
        })

        //---------элемент стилей точек графика
        this.dotSelector=document.querySelector("#select_TrendDots");
        this.dotSelector.value =`pointStyle=${Chart.getDatasetProp(Name,"pointStyle")}`;
        //изменен тренд
        TrendListArea.addEventListener('click',()=>{
            this.dotSelector.value =`pointStyle=${Chart.getDatasetProp(Name,"pointStyle")}`;
        })

        //---------элемент толщины линии графика
        this.lineWidthInput=document.querySelector("#input_line_width");
        this.lineWidthInput.value=Chart.getDatasetProp(Name,"borderWidth");
        const LINE_WIDTH_MIN_VAL=0.5;
        PageElements.setInputMinMax(this.lineWidthInput, LINE_WIDTH_MIN_VAL, 30);

        //изменен тренд
        TrendListArea.addEventListener('click',()=>{
            this.lineWidthInput.value=Chart.getDatasetProp(Name,"borderWidth");
        })

        //---------элемент натяжения линии графика
        this.range_TrendTension=document.querySelector("#range_TrendTension");
        this.range_TrendTension.value=Chart.getDatasetProp(Name,"tension")*100;
        //изменен тренд
        TrendListArea.addEventListener('click',()=>{
            this.range_TrendTension.value=Chart.getDatasetProp(Name,"tension")*100;
        })
    }

    valueAxisListBuild=()=>{
        let valueAxisListOptions=[];

        for(let i=0; i<this.#valScales.length; i++){
            valueAxisListOptions[i]=document.createElement('option');

            if(i==0){valueAxisListOptions[i].value='y';}
            else{valueAxisListOptions[i].value=`y${i}`;}  
        
            valueAxisListOptions[i].innerText=Chart.getOptionsProp(`scales=${valueAxisListOptions[i].value}=name`)+
            ': '+Chart.getOptionsProp(`scales=${valueAxisListOptions[i].value}=title=text`);

            this.valueAxisList.appendChild(valueAxisListOptions[i]);
        }

    }
}


