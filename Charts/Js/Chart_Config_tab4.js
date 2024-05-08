import {Chart} from "./Chart-1.js";
import {PageElements} from "../../Main/Js/sys/PageElements/PageElements.js";

//Singleton класс
export class Chart_Config_tab4{
    #yScales;
    
    yScaleList;
    yScaleCBArr;
    yScaleNameInput;
    yScaleTitleInput;
    yScalePosSelector;
    yScaleFrom_input;
    yScaleTo_input;
    borderColor_YScaleline;
    yScalelineWidth;
    borderColor_YScaleGrid;
    yScaleGridWidth;
    borderColor_Yscales;
    
    //конструктор
    constructor(){
        if(typeof Chart_Config_tab4.instance==='object'){return Chart_Config_tab4.instance;}
        Chart_Config_tab4.instance=this;
        this.#mainConstruct();
        return this;
    }

    //
    #mainConstruct=()=>{
        //---------Список шкал значений
        this.#yScales=Chart.getYscales();

        let YscaleListArea=document.querySelector("#YscaleListCBArea");

        this.yScaleList=PageElements.CreateCheckBoxList(YscaleListArea,'YscaleListCBs',this.#yScales.length);

        //добавляем данные в чек-бокс лист
        this.YscaleNameListBuild();

        //

        let YscaleName=this.yScaleList.checkBoxes[0].value;

        //экспортируем элемент
        this.yScaleCBArr=this.yScaleList.checkBoxes;

        //проверка, какая шкала выбрана
        YscaleListArea.addEventListener('click',()=>{
            for(let checkbox of this.yScaleCBArr){
                if(checkbox.checked){
                    YscaleName=checkbox.value;
                    break;
                }
            }
            this.YscaleNameListBuild();
        });
        //---------кнопка удалить шкалу--------
        let button_deleteYScale=document.querySelector('#button_deleteYScale');
        button_deleteYScale.addEventListener('click',()=>{
            
        });

        //---------имя шкалы--------
        this.yScaleNameInput=document.querySelector('#YscaleNameInput');
        this.yScaleNameInput.value=Chart.getOptionsProp(`scales=${YscaleName}=name`);

        YscaleListArea.addEventListener('click',()=>{
            this.yScaleNameInput.value=Chart.getOptionsProp(`scales=${YscaleName}=name`);
        })

        //---------подпись шкалы--------
        this.yScaleTitleInput=document.querySelector('#YscaleTitleInput');
        this.yScaleTitleInput.value=Chart.getOptionsProp(`scales=${YscaleName}=title=text`);

        YscaleListArea.addEventListener('click',()=>{
            this.yScaleTitleInput.value=Chart.getOptionsProp(`scales=${YscaleName}=title=text`);
        })

        //---------селектор позиции шкалы--------
        this.yScalePosSelector=document.querySelector('#YscalePosSelector');

        this.yScalePosSelector.value=Chart.getOptionsProp(`scales=${YscaleName}=position`);

        YscaleListArea.addEventListener('click',()=>{
            this.yScalePosSelector.value=Chart.getOptionsProp(`scales=${YscaleName}=position`);
        })


        //---------диапазон значений--------
        this.yScaleFrom_input=document.querySelector('#YscaleFrom_input');
        this.yScaleTo_input=document.querySelector('#YscaleTo_input');

        this.yScaleFrom_input.value=Chart.getOptionsProp(`scales=${YscaleName}=min`);
        this.yScaleTo_input.value=Chart.getOptionsProp(`scales=${YscaleName}=max`);

        YscaleListArea.addEventListener('click',()=>{
            this.yScaleFrom_input.value=Chart.getOptionsProp(`scales=${YscaleName}=min`);
            this.yScaleTo_input.value=Chart.getOptionsProp(`scales=${YscaleName}=max`);
        })

        this.yScaleFrom_input.addEventListener('input',()=>{
            if(parseFloat(this.yScaleFrom_input.value)>parseFloat(this.yScaleTo_input.value)){
                this.yScaleFrom_input.value=this.yScaleTo_input.value
            };
        })

        this.yScaleTo_input.addEventListener('input',()=>{
            if(parseFloat(this.yScaleTo_input.value)<parseFloat(this.yScaleFrom_input.value)){
                this.yScaleTo_input.value=this.yScaleFrom_input.value
            };
        })


        //---------элемент цвета оси

        const pickr_YScaleline = Pickr.create({
            el: '#color-picker_YScaleline',
            theme: 'classic', // or 'monolith', or 'nano'

            swatches: Chart.defaultPar.options.scales.y.ticks.color,

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
        this.borderColor_YScaleline=Chart.getOptionsProp(`scales=${YscaleName}=border=color`);

        pickr_YScaleline.on('init', (color) => {
            pickr_YScaleline.setColor(this.borderColor_YScaleline);

        })

        YscaleListArea.addEventListener('click',()=>{
            this.borderColor_YScaleline=Chart.getOptionsProp(`scales=${YscaleName}=border=color`);
            pickr_YScaleline.setColor(this.borderColor_YScaleline);

        })

        pickr_YScaleline.on('save', (color) => {
            this.borderColor_YScaleline= color.toHEXA().toString();
        })

        //---------элемент толщины линии оси
        this.yScalelineWidth=document.querySelector("#YScalelineWidth");

        this.yScalelineWidth.value=Chart.getOptionsProp(`scales=${YscaleName}=border=width`);

        PageElements.setInputMinMax(this.yScalelineWidth, 0.5, 30);

        YscaleListArea.addEventListener('click',()=>{
            this.yScalelineWidth.value=Chart.getOptionsProp(`scales=${YscaleName}=border=width`);
        })

        //---------элемент цвета сетки
        const pickr_YScaleGrid = Pickr.create({
            el: '#color-picker_YScaleGrid',
            theme: 'classic', // or 'monolith', or 'nano'

            swatches: Chart.defaultPar.options.scales.y.ticks.color,

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
        this.borderColor_YScaleGrid=Chart.getOptionsProp(`scales=${YscaleName}=grid=color`);

        pickr_YScaleGrid.on('init', (color) => {
            pickr_YScaleGrid.setColor(this.borderColor_YScaleGrid);

        })

        YscaleListArea.addEventListener('click',()=>{
            this.borderColor_YScaleGrid=Chart.getOptionsProp(`scales=${YscaleName}=grid=color`);
            pickr_YScaleGrid.setColor(this.borderColor_YScaleGrid);

        })

        pickr_YScaleGrid.on('save', (color) => {
            this.borderColor_YScaleGrid= color.toHEXA().toString();
        })

        //---------элемент толщины линии сетки
        this.yScaleGridWidth=document.querySelector("#YScalelineGrid");

        this.yScaleGridWidth.value=Chart.getOptionsProp(`scales=${YscaleName}=grid=lineWidth`);

        PageElements.setInputMinMax(this.yScaleGridWidth, 0.5, 30);

        YscaleListArea.addEventListener('click',()=>{
            this.yScaleGridWidth.value=Chart.getOptionsProp(`scales=${YscaleName}=grid=lineWidth`);
        })

        //---------элемент цвета меток

        const pickr_Yaxis = Pickr.create({
            el: '#color-picker_Yscale',
            theme: 'classic', // or 'monolith', or 'nano'

            swatches: Chart.defaultPar.options.scales.y.ticks.color,

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
        this.borderColor_Yscales=Chart.getOptionsProp(`scales=${YscaleName}=ticks=color`);

        pickr_Yaxis.on('init', (color) => {
            pickr_Yaxis.setColor(this.borderColor_Yscales);

        })

        YscaleListArea.addEventListener('click',()=>{
            this.borderColor_Yscales=Chart.getOptionsProp(`scales=${YscaleName}=ticks=color`);
            pickr_Yaxis.setColor(this.borderColor_Yscales);

        })

        pickr_Yaxis.on('save', (color) => {
            this.borderColor_Yscales= color.toHEXA().toString();
        })
    }

    YscaleNameListBuild=()=>{
        for(let i=0; i<this.#yScales.length; i++){

            if(i==0){this.yScaleList.checkBoxes[i].value='y';}
            else{this.yScaleList.checkBoxes[i].value=`y${i}`;}  
        
            this.yScaleList.cbLabels[i].innerText=Chart.getOptionsProp(`scales=${this.yScaleList.checkBoxes[i].value}=name`)+
            ': '+Chart.getOptionsProp(`scales=${this.yScaleList.checkBoxes[i].value}=title=text`);
        }
    }
}


