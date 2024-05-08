import {DateTime} from "../../Main/Js/sys/DateTime.js";

import {Chart,Chart_Config_PopUp_inst,chartContainer} from "./Chart-1.js";

import {Chart_Config_tab1} from "./Chart_Config_tab1.js";

import {Chart_Config_tab2} from "./Chart_Config_tab2.js"; 

import {Chart_Config_tab3} from "./Chart_Config_tab3.js";

import {Chart_Config_tab4} from "./Chart_Config_tab4.js";    


//Singleton класс
export class Chart_Config_Buttons{

    //конструктор
    constructor(){
        if(typeof Chart_Config_Buttons.instance==='object'){return Chart_Config_Buttons.instance;}
        Chart_Config_Buttons.instance=this;

        //----------кнопка применить
        Chart_Config_PopUp_inst.chartSetOCA.accept.addEventListener("click", ()=>{
            this.acceptSettings();
        });

        //----------кнопка ок
        Chart_Config_PopUp_inst.chartSetOCA.ok.addEventListener("click", ()=>{
            this.acceptSettings();
            Chart_Config_PopUp_inst.window.close();
        });

        //----------кнопка отмена
        Chart_Config_PopUp_inst.chartSetOCA.cancel.addEventListener("click", ()=>{
            Chart_Config_PopUp_inst.window.close();
        });

        return this;
    }

    //функция применения настроек
    acceptSettings=()=>{
        //настройки трендов
        //проходим по выбраным трендам
        let Tab1=new Chart_Config_tab1();
        Tab1.checkBoxArr.forEach((checkbox)=>{
            if(checkbox.checked==true){

                Chart.setDatasetProp(checkbox.value,`yAxisID=${Tab1.valueAxisList.value}`);

                Chart.setDatasetProp(checkbox.value,Tab1.select_TrendType.value);

                Chart.setDatasetProp(checkbox.value,`borderColor=${Tab1.borderColor_trends}`);
                Chart.setDatasetProp(checkbox.value,`backgroundColor=${Tab1.borderColor_trends+'7F'}`);

                
                Chart.setDatasetProp(checkbox.value,`fill=${Tab1.checkbox_Filled.checked}`);

                Chart.setDatasetProp(checkbox.value,Tab1.dotSelector.value);

                Chart.setDatasetProp(checkbox.value,`borderWidth=${Tab1.lineWidthInput.value}`);

                Chart.setDatasetProp(checkbox.value,`tension=${Tab1.range_TrendTension.value/100}`);
            }
        })

        //общие настройки
        let Tab2=new Chart_Config_tab2();
        Chart.setOptionsProp('!background='+Tab2.borderColor_Background);

        //настройки оси x
        let Tab3=new Chart_Config_tab3();
        Chart.setOptionsProp('scales=x=timeRangeSelector='+Tab3.confTimeRangeArea.timeRangeSelector.value);

        switch (Tab3.confTimeRangeArea.timeRangeSelector.value) {
            case '1':
                Chart.setOptionsProp('scales=x=min='+DateTime.StringToDCS(Tab3.confTimeRangeArea.startTimeInput.value));
                Chart.setOptionsProp('scales=x=timeRangeItemSelect='+Tab3.confTimeRangeArea.timeRangeItemSelect.value);
                Chart.setOptionsProp('scales=x=timeRangeInput='+Tab3.confTimeRangeArea.timeRangeInput.value);
                break;
            case '2':
                Chart.setOptionsProp('scales=x=min='+DateTime.StringToDCS(Tab3.confTimeRangeArea.startTimeInput.value));
                Chart.setOptionsProp('scales=x=max='+DateTime.StringToDCS(Tab3.confTimeRangeArea.endTimeInput.value));
                break;
            case '3':
                Chart.setOptionsProp('scales=x=max='+Tab3.confTimeRangeArea.pointAmount.value);
                break;
        }

        Chart.setOptionsProp('scales=x=ticks=color='+Tab3.borderColor_Xscales);

        Chart.setOptionsProp('scales=x=border=color='+Tab3.borderColor_XScaleline);
        Chart.setOptionsProp('scales=x=border=width='+Tab3.xScalelineWidth.value);

        Chart.setOptionsProp('scales=x=grid=color='+Tab3.borderColor_XScaleGrid);
        Chart.setOptionsProp('scales=x=grid=lineWidth='+Tab3.xScaleGridWidth.value);

        //настройки осей y
        let Tab4=new Chart_Config_tab4();
        let yScaleName;
        for(let yScaleCBox of Tab4.yScaleList.checkBoxes){
            if(yScaleCBox.checked){
                yScaleName=yScaleCBox.value;

                Chart.setOptionsProp(`scales=${yScaleName}=name=${Tab4.yScaleNameInput.value}`);

                Chart.setOptionsProp(`scales=${yScaleName}=title=text=${Tab4.yScaleTitleInput.value}`);

                Chart.setOptionsProp(`scales=${yScaleName}=max=${Tab4.yScaleTo_input.value}`);
                Chart.setOptionsProp(`scales=${yScaleName}=min=${Tab4.yScaleFrom_input.value}`);

                Chart.setOptionsProp(`scales=${yScaleName}=position=${Tab4.yScalePosSelector.value}`);

                Chart.setOptionsProp(`scales=${yScaleName}=ticks=color=${Tab4.borderColor_Yscales}`);

                Chart.setOptionsProp(`scales=${yScaleName}=border=color=${Tab4.borderColor_YScaleline}`);
                Chart.setOptionsProp(`scales=${yScaleName}=border=width=${Tab4.yScalelineWidth.value}`);

                Chart.setOptionsProp(`scales=${yScaleName}=grid=color=${Tab4.borderColor_YScaleGrid}`);
                Chart.setOptionsProp(`scales=${yScaleName}=grid=lineWidth=${Tab4.yScaleGridWidth.value}`);
            }
        }

        //
        Tab4.YscaleNameListBuild();

        chartContainer.style.backgroundColor=Chart.getOptionsProp('background',0);
        Chart.chart.update(); 
    }   

}




