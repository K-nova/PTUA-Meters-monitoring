import {PageElements} from "../../Main/Js/PageElements/PageElements.js";;
import {Chart} from "./Chart-1.js";

//---------диапазон времени
//создаем область выбора времени
let confTimeRangeArea=PageElements.CreateTimeRangeSettings(document.querySelector("#tab_first"), 'confTimeRangeArea');

//блокируем функционал
//confTimeRangeArea.setStateF('2');
//confTimeRangeArea.timeRangeSelector.classList.add('notAllowed');
confTimeRangeArea.TimeRangeSelectorOptions[2].disabled=true;

//текущий режим выбора времени
confTimeRangeArea.timeRangeSelector.value=Chart.getOptionsProp("scales=x=timeRangeSelector");

//текущие пределы
// confTimeRangeArea.startTime_ADP.selectDate(Chart.getMinTime());
// confTimeRangeArea.endTime_ADP.selectDate(Chart.getMaxTime());
confTimeRangeArea.timeRangeInput.value= Chart.getOptionsProp("scales=x=timeRangeInput"); 
confTimeRangeArea.timeRangeItemSelect.value= Chart.getOptionsProp("scales=x=timeRangeItemSelect"); 

//экспортируем элементы
export let XScaleTimeRangeSettings=confTimeRangeArea;

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
export let borderColor_XScaleline=Chart.getOptionsProp("scales=x=border=color");

pickr_XScaleline.on('init', instance => {
    pickr_XScaleline.setColor(borderColor_XScaleline);

})

pickr_XScaleline.on('save', (color) => {
    borderColor_XScaleline= color.toHEXA().toString();
})

//---------элемент толщины линии оси
export let XScalelineWidth=document.querySelector("#XScalelineWidth");
XScalelineWidth.value=Chart.getOptionsProp("scales=x=border=width");
PageElements.setInputMinMax(XScalelineWidth, 0.5, 30);

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
export let borderColor_XScaleGrid=Chart.getOptionsProp("scales=x=grid=color");

pickr_XScaleGrid.on('init', instance => {
    pickr_XScaleGrid.setColor(borderColor_XScaleGrid);

})

pickr_XScaleGrid.on('save', (color) => {
    borderColor_XScaleGrid= color.toHEXA().toString();
})

//---------элемент толщины линии сетки
export let XScaleGridWidth=document.querySelector("#XScalelineGrid");
XScaleGridWidth.value=Chart.getOptionsProp("scales=x=grid=lineWidth");
PageElements.setInputMinMax(XScaleGridWidth, 0.5, 30);

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
export let borderColor_Xscales=Chart.getOptionsProp("scales=x=ticks=color");

pickr_Xaxis.on('init', instance => {
    pickr_Xaxis.setColor(borderColor_Xscales);

})

pickr_Xaxis.on('save', (color) => {
    borderColor_Xscales= color.toHEXA().toString();
})