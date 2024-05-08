import {PageElements} from "../../Main/Js/sys/PageElements/PageElements.js";
import {Chart} from "./Chart-1.js";

//Singleton класс
export class Chart_Config_tab3{
    confTimeRangeArea; 
    borderColor_XScaleline;
    xScalelineWidth;
    borderColor_XScaleGrid;
    xScaleGridWidth;
    borderColor_Xscales;
    
    //конструктор
    constructor(){
        if(typeof Chart_Config_tab3.instance==='object'){return Chart_Config_tab3.instance;}
        Chart_Config_tab3.instance=this;
        this.#mainConstruct();
        return this;
    }

    //
    #mainConstruct=()=>{
        //---------диапазон времени
        //создаем область выбора времени
        this.confTimeRangeArea=PageElements.CreateTimeRangeSettings(document.querySelector("#tab_first"), 'confTimeRangeArea');

        //блокируем функционал
        this.confTimeRangeArea.TimeRangeSelectorOptions[2].disabled=true;

        //текущий режим выбора времени
        this.confTimeRangeArea.timeRangeSelector.value=Chart.getOptionsProp("scales=x=timeRangeSelector");

        //текущие пределы
        this.confTimeRangeArea.timeRangeInput.value= Chart.getOptionsProp("scales=x=timeRangeInput"); 
        this.confTimeRangeArea.timeRangeItemSelect.value= Chart.getOptionsProp("scales=x=timeRangeItemSelect"); 

        //---------элемент цвета оси

        const pickr_XScaleline = Pickr.create({
            el: '#color-picker_XScaleline',
            theme: 'classic', // or 'monolith', or 'nano'

            swatches: Chart.defaultPar.options.scales.x.ticks.color,

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
        this.borderColor_XScaleline =Chart.getOptionsProp("scales=x=border=color");

        pickr_XScaleline.on('init', instance => {
            pickr_XScaleline.setColor(this.borderColor_XScaleline);

        })

        pickr_XScaleline.on('save', (color) => {
            this.borderColor_XScaleline= color.toHEXA().toString();
        })

        //---------элемент толщины линии оси
        this.xScalelineWidth=document.querySelector("#XScalelineWidth");
        this.xScalelineWidth.value=Chart.getOptionsProp("scales=x=border=width");
        PageElements.setInputMinMax(this.xScalelineWidth, 0.5, 30);

        //---------элемент цвета сетки
        const pickr_XScaleGrid = Pickr.create({
            el: '#color-picker_XScaleGrid',
            theme: 'classic', // or 'monolith', or 'nano'

            swatches: Chart.defaultPar.options.scales.x.ticks.color,

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
        this.borderColor_XScaleGrid=Chart.getOptionsProp("scales=x=grid=color");

        pickr_XScaleGrid.on('init', instance => {
            pickr_XScaleGrid.setColor(this.borderColor_XScaleGrid);

        })

        pickr_XScaleGrid.on('save', (color) => {
            this.borderColor_XScaleGrid= color.toHEXA().toString();
        })

        //---------элемент толщины линии сетки
        this.xScaleGridWidth=document.querySelector("#XScalelineGrid");
        this.xScaleGridWidth.value=Chart.getOptionsProp("scales=x=grid=lineWidth");
        PageElements.setInputMinMax(this.xScaleGridWidth, 0.5, 30);

        //---------элемент цвета меток

        const pickr_Xaxis = Pickr.create({
            el: '#color-picker_Xscale',
            theme: 'classic', // or 'monolith', or 'nano'

            swatches: Chart.defaultPar.options.scales.x.ticks.color,

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
        this.borderColor_Xscales=Chart.getOptionsProp("scales=x=ticks=color");

        pickr_Xaxis.on('init', instance => {
            pickr_Xaxis.setColor(this.borderColor_Xscales);

        })

        pickr_Xaxis.on('save', (color) => {
            this.borderColor_Xscales= color.toHEXA().toString();
        })
    }
}

