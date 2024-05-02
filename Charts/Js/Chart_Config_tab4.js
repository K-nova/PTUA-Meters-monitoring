import {Chart} from "./Chart-1.js";
import {PageElements} from "../../Main/Js/sys/PageElements/PageElements.js";

//---------Список шкал значений

let Yscales=Chart.getYscales();

let YscaleListArea=document.querySelector("#YscaleListCBArea");

export let YscaleList=PageElements.CreateCheckBoxList(YscaleListArea,'YscaleListCBs',Yscales.length);

//добавляем данные в чек-бокс лист

export let YscaleNameListBuild=function(){
    for(let i=0; i<Yscales.length; i++){

        if(i==0){YscaleList.checkBoxes[i].value='y';}
        else{YscaleList.checkBoxes[i].value=`y${i}`;}  
    
        YscaleList.cbLabels[i].innerText=Chart.getOptionsProp(`scales=${YscaleList.checkBoxes[i].value}=name`)+
        ': '+Chart.getOptionsProp(`scales=${YscaleList.checkBoxes[i].value}=title=text`);
    }
}

YscaleNameListBuild();

//

let YscaleName=YscaleList.checkBoxes[0].value;

//экспортируем элемент
export let YscaleCBArr=YscaleList.checkBoxes;

//проверка, какая шкала выбрана
YscaleListArea.addEventListener('click',()=>{
    for(let checkbox of YscaleCBArr){
        if(checkbox.checked){
            YscaleName=checkbox.value;
            break;
        }
    }
    YscaleNameListBuild();
});
//---------кнопка удалить шкалу--------
let button_deleteYScale=document.querySelector('#button_deleteYScale');
button_deleteYScale.addEventListener('click',()=>{
    
});

//---------имя шкалы--------
export let YscaleNameInput=document.querySelector('#YscaleNameInput');
YscaleNameInput.value=Chart.getOptionsProp(`scales=${YscaleName}=name`);

YscaleListArea.addEventListener('click',()=>{
    YscaleNameInput.value=Chart.getOptionsProp(`scales=${YscaleName}=name`);
})

//---------подпись шкалы--------
export let YscaleTitleInput=document.querySelector('#YscaleTitleInput');
YscaleTitleInput.value=Chart.getOptionsProp(`scales=${YscaleName}=title=text`);

YscaleListArea.addEventListener('click',()=>{
    YscaleTitleInput.value=Chart.getOptionsProp(`scales=${YscaleName}=title=text`);
})

//---------селектор позиции шкалы--------
export let YscalePosSelector=document.querySelector('#YscalePosSelector');

YscalePosSelector.value=Chart.getOptionsProp(`scales=${YscaleName}=position`);

YscaleListArea.addEventListener('click',()=>{
    YscalePosSelector.value=Chart.getOptionsProp(`scales=${YscaleName}=position`);
})


//---------диапазон значений--------
export let YscaleFrom_input=document.querySelector('#YscaleFrom_input');
export let YscaleTo_input=document.querySelector('#YscaleTo_input');

YscaleFrom_input.value=Chart.getOptionsProp(`scales=${YscaleName}=min`);
YscaleTo_input.value=Chart.getOptionsProp(`scales=${YscaleName}=max`);

YscaleListArea.addEventListener('click',()=>{
    YscaleFrom_input.value=Chart.getOptionsProp(`scales=${YscaleName}=min`);
    YscaleTo_input.value=Chart.getOptionsProp(`scales=${YscaleName}=max`);
})

YscaleFrom_input.addEventListener('input',()=>{
    if(parseFloat(YscaleFrom_input.value)>parseFloat(YscaleTo_input.value)){
        YscaleFrom_input.value=YscaleTo_input.value
    };
})

YscaleTo_input.addEventListener('input',()=>{
    if(parseFloat(YscaleTo_input.value)<parseFloat(YscaleFrom_input.value)){
        YscaleTo_input.value=YscaleFrom_input.value
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
export let borderColor_YScaleline=Chart.getOptionsProp(`scales=${YscaleName}=border=color`);

pickr_YScaleline.on('init', (color) => {
    pickr_YScaleline.setColor(borderColor_YScaleline);

})

YscaleListArea.addEventListener('click',()=>{
    borderColor_YScaleline=Chart.getOptionsProp(`scales=${YscaleName}=border=color`);
    pickr_YScaleline.setColor(borderColor_YScaleline);

})

pickr_YScaleline.on('save', (color) => {
    borderColor_YScaleline= color.toHEXA().toString();
})

//---------элемент толщины линии оси
export let YScalelineWidth=document.querySelector("#YScalelineWidth");

YScalelineWidth.value=Chart.getOptionsProp(`scales=${YscaleName}=border=width`);

PageElements.setInputMinMax(YScalelineWidth, 0.5, 30);

YscaleListArea.addEventListener('click',()=>{
    YScalelineWidth.value=Chart.getOptionsProp(`scales=${YscaleName}=border=width`);
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
export let borderColor_YScaleGrid=Chart.getOptionsProp(`scales=${YscaleName}=grid=color`);

pickr_YScaleGrid.on('init', (color) => {
    pickr_YScaleGrid.setColor(borderColor_YScaleGrid);

})

YscaleListArea.addEventListener('click',()=>{
    borderColor_YScaleGrid=Chart.getOptionsProp(`scales=${YscaleName}=grid=color`);
    pickr_YScaleGrid.setColor(borderColor_YScaleGrid);

})

pickr_YScaleGrid.on('save', (color) => {
    borderColor_YScaleGrid= color.toHEXA().toString();
})

//---------элемент толщины линии сетки
export let YScaleGridWidth=document.querySelector("#YScalelineGrid");

YScaleGridWidth.value=Chart.getOptionsProp(`scales=${YscaleName}=grid=lineWidth`);

PageElements.setInputMinMax(YScaleGridWidth, 0.5, 30);

YscaleListArea.addEventListener('click',()=>{
    YScaleGridWidth.value=Chart.getOptionsProp(`scales=${YscaleName}=grid=lineWidth`);
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
export let borderColor_Yscales=Chart.getOptionsProp(`scales=${YscaleName}=ticks=color`);

pickr_Yaxis.on('init', (color) => {
    pickr_Yaxis.setColor(borderColor_Yscales);

})

YscaleListArea.addEventListener('click',()=>{
    borderColor_Yscales=Chart.getOptionsProp(`scales=${YscaleName}=ticks=color`);
    pickr_Yaxis.setColor(borderColor_Yscales);

})

pickr_Yaxis.on('save', (color) => {
    borderColor_Yscales= color.toHEXA().toString();
})