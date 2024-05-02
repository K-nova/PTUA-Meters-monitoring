import {DateTime} from "../../Main/Js/sys/DateTime.js";

import {Chart,ChartSettingsPopUp,chartSetOCA,chartContainer} from "./Chart-1.js";

import {CheckBoxArr,DotSelector,LineWidthInput,borderColor_trends, valueAxisList,
     CB_Filled,range_TrendTension, select_TrendType} from "./Chart_Config_tab1.js";

import {borderColor_Background} from "./Chart_Config_tab2.js"; 

import {borderColor_Xscales,
    borderColor_XScaleline,XScalelineWidth,borderColor_XScaleGrid,
    XScaleGridWidth, XScaleTimeRangeSettings} from "./Chart_Config_tab3.js";

import {YscaleList, borderColor_Yscales,  YscalePosSelector, YscaleTitleInput, YscaleNameInput,
        borderColor_YScaleline,YScalelineWidth,borderColor_YScaleGrid,
        YScaleGridWidth, YscaleFrom_input, YscaleTo_input, YscaleNameListBuild} from "./Chart_Config_tab4.js";    

//функция применения настроек
let acceptSettings=()=>{
    //настройки трендов
    //проходим по выбраным трендам
    CheckBoxArr.forEach((checkbox)=>{
        if(checkbox.checked==true){

            Chart.setDatasetProp(checkbox.value,`yAxisID=${valueAxisList.value}`);

            Chart.setDatasetProp(checkbox.value,select_TrendType.value);

            Chart.setDatasetProp(checkbox.value,`borderColor=${borderColor_trends}`);
            Chart.setDatasetProp(checkbox.value,`backgroundColor=${borderColor_trends+'7F'}`);

            
            Chart.setDatasetProp(checkbox.value,`fill=${CB_Filled.checked}`);

            Chart.setDatasetProp(checkbox.value,DotSelector.value);

            Chart.setDatasetProp(checkbox.value,`borderWidth=${LineWidthInput.value}`);

            Chart.setDatasetProp(checkbox.value,`tension=${range_TrendTension.value/100}`);
        }
    })

    //общие настройки
    Chart.setOptionsProp('!background='+borderColor_Background);

    //настройки оси x
    Chart.setOptionsProp('scales=x=timeRangeSelector='+XScaleTimeRangeSettings.timeRangeSelector.value);

    switch (XScaleTimeRangeSettings.timeRangeSelector.value) {
        case '1':
            Chart.setOptionsProp('scales=x=min='+DateTime.StringToDCS(XScaleTimeRangeSettings.startTimeInput.value));
            Chart.setOptionsProp('scales=x=timeRangeItemSelect='+XScaleTimeRangeSettings.timeRangeItemSelect.value);
            Chart.setOptionsProp('scales=x=timeRangeInput='+XScaleTimeRangeSettings.timeRangeInput.value);
            break;
        case '2':
            Chart.setOptionsProp('scales=x=min='+DateTime.StringToDCS(XScaleTimeRangeSettings.startTimeInput.value));
            Chart.setOptionsProp('scales=x=max='+DateTime.StringToDCS(XScaleTimeRangeSettings.endTimeInput.value));
            break;
        case '3':
            Chart.setOptionsProp('scales=x=max='+XScaleTimeRangeSettings.pointAmount.value);
            break;
    }

    Chart.setOptionsProp('scales=x=ticks=color='+borderColor_Xscales);

    Chart.setOptionsProp('scales=x=border=color='+borderColor_XScaleline);
    Chart.setOptionsProp('scales=x=border=width='+XScalelineWidth.value);

    Chart.setOptionsProp('scales=x=grid=color='+borderColor_XScaleGrid);
    Chart.setOptionsProp('scales=x=grid=lineWidth='+XScaleGridWidth.value);

    //настройки осей y
    let yScaleName;
    for(let yScaleCBox of YscaleList.checkBoxes){
        if(yScaleCBox.checked){
            yScaleName=yScaleCBox.value;

            Chart.setOptionsProp(`scales=${yScaleName}=name=${YscaleNameInput.value}`);

            Chart.setOptionsProp(`scales=${yScaleName}=title=text=${YscaleTitleInput.value}`);

            Chart.setOptionsProp(`scales=${yScaleName}=max=${YscaleTo_input.value}`);
            Chart.setOptionsProp(`scales=${yScaleName}=min=${YscaleFrom_input.value}`);

            Chart.setOptionsProp(`scales=${yScaleName}=position=${YscalePosSelector.value}`);

            Chart.setOptionsProp(`scales=${yScaleName}=ticks=color=${borderColor_Yscales}`);

            Chart.setOptionsProp(`scales=${yScaleName}=border=color=${borderColor_YScaleline}`);
            Chart.setOptionsProp(`scales=${yScaleName}=border=width=${YScalelineWidth.value}`);

            Chart.setOptionsProp(`scales=${yScaleName}=grid=color=${borderColor_YScaleGrid}`);
            Chart.setOptionsProp(`scales=${yScaleName}=grid=lineWidth=${YScaleGridWidth.value}`);
        }
    }

    //
    YscaleNameListBuild();

    chartContainer.style.backgroundColor=Chart.getOptionsProp('background',0);
    Chart.chart.update(); 
}   


//----------кнопка применить
chartSetOCA.accept.addEventListener("click", ()=>{
    acceptSettings();
});

//----------кнопка ок
chartSetOCA.ok.addEventListener("click", ()=>{
    acceptSettings();
    ChartSettingsPopUp.close();
});

//----------кнопка отмена
chartSetOCA.cancel.addEventListener("click", ()=>{
    ChartSettingsPopUp.close();
});

