import {PopUp} from "./PopUp.js";
import {AddFolderContent} from "./AddFolderContent.js";
import {MeterSettingsContent} from "./MeterSettingsContent.js";
import {TrainingMessage} from "./TrainingMessage.js";
import {Cover} from "./Cover.js";
import {OkCancelAccept} from "./OkCancelAccept.js";

export var PageElements={
   
    PopUp: PopUp,

    CreateTimeRangeSettings: function(RootParent, id='TIA_TimeRange'){
         //-------создаем элементы
         let tab_item_area=document.createElement('div');
         tab_item_area.className="tab_item_area";
         RootParent.appendChild(tab_item_area);

         let h3_1=document.createElement('h3');
         h3_1.className="tab_item_area_topic";
         h3_1.innerText='Период времени';
         tab_item_area.appendChild(h3_1);

         //
         let h4_1=document.createElement('h4');
         h4_1.innerText='Настройки:';
         tab_item_area.appendChild(h4_1);

         let timeRangeSelector=document.createElement('select');
         timeRangeSelector.className="select";
         let TimeRangeSelectorOptions=[];
         TimeRangeSelectorOptions[0]=document.createElement('option');
         TimeRangeSelectorOptions[0].value='1';
         TimeRangeSelectorOptions[0].innerText='Период времени'
         timeRangeSelector.appendChild(TimeRangeSelectorOptions[0]);
         TimeRangeSelectorOptions[1]=document.createElement('option');
         TimeRangeSelectorOptions[1].value='2';
         TimeRangeSelectorOptions[1].innerText='Время от старта до конца'
         timeRangeSelector.appendChild(TimeRangeSelectorOptions[1]);
         TimeRangeSelectorOptions[2]=document.createElement('option');
         TimeRangeSelectorOptions[2].value='3';
         TimeRangeSelectorOptions[2].innerText='Количество точек'
         timeRangeSelector.appendChild(TimeRangeSelectorOptions[2]);
         tab_item_area.appendChild(timeRangeSelector);

         //Начальное время
         let h4_2=document.createElement('h4');
         h4_2.innerText='Начальное время:';
         tab_item_area.appendChild(h4_2);

         let startTimeInput=document.createElement('input');
         startTimeInput.className='input';
         startTimeInput.type="datetime";
         startTimeInput.setAttribute("readonly", "readonly");
         let startTimeID=id+'_StartTime';
         startTimeInput.id=startTimeID;
         tab_item_area.appendChild(startTimeInput);

         //Конечное время
         let h4_3=document.createElement('h4');
         h4_3.innerText='Конечное время:';
         tab_item_area.appendChild(h4_3);

         let endTimeInput=document.createElement('input');
         endTimeInput.className='input';
         if(timeRangeSelector.value!='2'){endTimeInput.classList.add('notAllowed');}
         endTimeInput.type="datetime";
         endTimeInput.setAttribute("readonly", "readonly");
         let endTimeID=id+'_EndTime';
         endTimeInput.id=endTimeID;
         tab_item_area.appendChild(endTimeInput);

         //датапикеры
         let startTime_ADP, endTime_ADP;

         startTime_ADP=new AirDatepicker(`#${startTimeID}`, {
                 selectedDates: [new Date()],
                 dateFormat(date) {
                    return date.toLocaleString(undefined, {
                        year: 'numeric',
                        day: 'numeric',
                        month: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric'
                    });
                },
                 timepicker: true,
                 timeFormat: 'H:mm AA',
                 buttons: ['today'],
                  //устанавливаем ограничения в датапикере
                 onSelect({date}){
                    if(date!=undefined && timeRangeSelector.value=='2'){
                        endTime_ADP.update({minDate:date});
                    }
                 }
             });  
         
         endTime_ADP=new AirDatepicker(`#${endTimeID}`, {
             selectedDates: [new Date()],
             dateFormat(date) {
                return date.toLocaleString(undefined, {
                    year: 'numeric',
                    day: 'numeric',
                    month: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                });
            },
             timepicker: true,
             timeFormat: 'H:mm AA',
             buttons: ['today'],
             //устанавливаем ограничения в датапикере
             onSelect({date}){
                if(date!=undefined  && timeRangeSelector.value=='2'){
                    startTime_ADP.update({maxDate:date});
                }
             }
         }); 
         

         //диапазон времени
         let h4_4=document.createElement('h4');
         h4_4.innerText='Диапазон времени:';
         tab_item_area.appendChild(h4_4);
        
         let tab_item_area_sub_1=document.createElement('div');
         tab_item_area_sub_1.className='tab_item_area_sub';
         tab_item_area.appendChild(tab_item_area_sub_1);

         let tab_item_area_sub_column_1=document.createElement('div');
         tab_item_area_sub_column_1.className='tab_item_area_sub_column';
         tab_item_area_sub_1.appendChild(tab_item_area_sub_column_1);

         let timeRangeInput=document.createElement('input');
         timeRangeInput.className='input';
         timeRangeInput.type="number";
         timeRangeInput.min='1';
         timeRangeInput.value='1';
         PageElements.onlyDigitsKey(timeRangeInput);
         tab_item_area_sub_column_1.appendChild(timeRangeInput);

         let tab_item_area_sub_column_2=document.createElement('div');
         tab_item_area_sub_column_2.className='tab_item_area_sub_column';
         tab_item_area_sub_column_2.innerText="✖"; //&#10006
         tab_item_area_sub_1.appendChild(tab_item_area_sub_column_2);

         let tab_item_area_sub_column_3=document.createElement('div');
         tab_item_area_sub_column_3.className='tab_item_area_sub_column';
         tab_item_area_sub_1.appendChild(tab_item_area_sub_column_3);

         let timeRangeItemSelect=document.createElement('select');
         timeRangeItemSelect.className="select";
         let timeRangeItemSelectOption=[];
         timeRangeItemSelectOption[0]=document.createElement('option');
         timeRangeItemSelectOption[0].value='1000';
         timeRangeItemSelectOption[0].innerText='1 секунда'
         timeRangeItemSelect.appendChild(timeRangeItemSelectOption[0]);
         timeRangeItemSelectOption[1]=document.createElement('option');
         timeRangeItemSelectOption[1].value='60000';
         timeRangeItemSelectOption[1].innerText='1 минута'
         timeRangeItemSelect.appendChild(timeRangeItemSelectOption[1]);
         timeRangeItemSelectOption[2]=document.createElement('option');
         timeRangeItemSelectOption[2].value='3600000';
         timeRangeItemSelectOption[2].innerText='1 час'
         timeRangeItemSelect.appendChild(timeRangeItemSelectOption[2]);
         timeRangeItemSelectOption[3]=document.createElement('option');
         timeRangeItemSelectOption[3].value='86400000';
         timeRangeItemSelectOption[3].innerText='1 сутки'
         timeRangeItemSelect.appendChild(timeRangeItemSelectOption[3]);
         tab_item_area_sub_column_3.appendChild(timeRangeItemSelect);

         //Количество точек
         let h4_5=document.createElement('h4');
         h4_5.innerText='Количество точек:';
         tab_item_area.appendChild(h4_5);

         let pointAmount=document.createElement('input');
         pointAmount.className='input';
         if(timeRangeSelector.value!='3'){pointAmount.classList.add('notAllowed');}
         pointAmount.type="number";
         pointAmount.min=1;
         pointAmount.value=1;
         tab_item_area.appendChild(pointAmount);

         //----логика
         let setStateF=function(value){
            switch(value){
                case '1':
                    endTimeInput.classList.add('notAllowed');
                    pointAmount.classList.add('notAllowed');
        
                    timeRangeInput.classList.remove('notAllowed');
                    timeRangeItemSelect.classList.remove('notAllowed');
                    break;
                case '2':
                    timeRangeInput.classList.add('notAllowed');
                    timeRangeItemSelect.classList.add('notAllowed');
                    pointAmount.classList.add('notAllowed');
        
                    endTimeInput.classList.remove('notAllowed');
                    break;
                case '3':
                    timeRangeInput.classList.add('notAllowed');
                    timeRangeItemSelect.classList.add('notAllowed');
                    endTimeInput.classList.add('notAllowed');
                         
                    pointAmount.classList.remove('notAllowed');
                    break;    
            }
            timeRangeSelector.value=value;
         }

         timeRangeSelector.addEventListener('click',()=>{
            setStateF(timeRangeSelector.value)
        });
         

        //возвращаем созданные элементы
        return {
            tab_item_area: tab_item_area,
            timeRangeSelector: timeRangeSelector,
            TimeRangeSelectorOptions:TimeRangeSelectorOptions,
            startTimeInput: startTimeInput,
            startTime_ADP:startTime_ADP,
            endTimeInput: endTimeInput,
            endTime_ADP:endTime_ADP,
            timeRangeInput: timeRangeInput,
            timeRangeItemSelect: timeRangeItemSelect,
            pointAmount:pointAmount,
            setStateF:setStateF
        }
    },

    CreateCheckBoxList:function(RootParent, id='CBlist', Amount=1, NoCBText='нет параметров'){
        let checkBoxLines=[]
        let checkBoxes=[];
        let cbLabels=[];
        let noConten=Amount<1;

        //-------создаем элементы
        if(!noConten){
            for(let i=0; i<Amount; i++){

                checkBoxLines[i]=document.createElement("div");
                checkBoxLines[i].className="checkbox_line";
                RootParent.appendChild(checkBoxLines[i]);
            
                checkBoxes[i]=document.createElement("input");
                checkBoxes[i].type="checkbox";
                checkBoxes[i].className="checkbox"
                checkBoxes[i].id=`${id}_item_${i}`;
                checkBoxLines[i].appendChild(checkBoxes[i]);
            
                cbLabels[i]=document.createElement("label");
                cbLabels[i].setAttribute('for', `${id}_item_${i}`);
                checkBoxLines[i].appendChild(cbLabels[i]);
            }
        }else{
                checkBoxLines[0]=document.createElement("div");
                checkBoxLines[0].className="checkbox_line";
                RootParent.appendChild(checkBoxLines[0]);

                let NoCBtext=document.createTextNode(NoCBText);
                checkBoxLines[0].appendChild(NoCBtext);
        }
        

        //----логика
        //инициализируем первый элемент
        if(!noConten){checkBoxes[0].click();}

        let setChecked=function(num){
            if(!checkBoxes[num].checked){checkBoxes[num].click();}
        }

        let setUnchecked=function(num){
            if(checkBoxes[num].checked){checkBoxes[num].click();}
        }
        

        //-----возвращаем созданные элементы
        return {
            checkBoxLines:checkBoxLines,
            checkBoxes:checkBoxes,
            cbLabels:cbLabels,
            setChecked:setChecked,
            setUnchecked:setUnchecked
        }
    },

    createTooltip:function(target, text){
        let tooltip;
        target.addEventListener('mouseenter', (event)=> {
            //создаем подсказку
            tooltip=document.createElement("div");
            tooltip.className='tooltip';
            tooltip.textContent = text;
            document.body.appendChild(tooltip);

            tooltip.style.left = (event.clientX + 10) + 'px';
            tooltip.style.top = (event.clientY + 10) + 'px';
        })

        // Скрываем подсказку рядом с курсором мыши
        target.addEventListener('mouseout', (event)=> {
            document.body.removeChild(tooltip);  
        })

    },

    createMouseContextMenu:function(event, content){
        //создаем область меню
        let mouseContextMenu=document.createElement('div');
        mouseContextMenu.className='mouseContextMenu';
        document.body.appendChild(mouseContextMenu);

        //добавляем в область содержаение
        mouseContextMenu.appendChild(content);
        content.style.display = 'block';

        // Показываем контекстное меню
        event.preventDefault(); // Предотвращаем стандартное контекстное меню браузера
        mouseContextMenu.style.display = 'block'; // Показываем наше контекстное меню
        mouseContextMenu.style.left = event.clientX + 'px'; // Устанавливаем позицию по горизонтали
        mouseContextMenu.style.top = event.clientY + 'px'; // Устанавливаем позицию по вертикали

        //получаем координаты целевого элемента
        let targetRect = event.target.getBoundingClientRect();
       

        // Удаляем контекстное меню
        let parent= event.target;
        document.addEventListener('click', function(event) {
            if ( event.target !== mouseContextMenu) {
                try{document.body.removeChild(mouseContextMenu);}catch{}        
            }
        });

        document.addEventListener('contextmenu', function(event) {
            if ( event.clientX<targetRect.left || event.clientX>targetRect.right ||
                event.clientY<targetRect.top || event.clientY>targetRect.bottom) {
                try{document.body.removeChild(mouseContextMenu);}catch{}        
            }
        });


    },

    setInputMinMax(input, min, max){
        input.min=`${min}`;
        input.max=`${max}`;
        input.addEventListener("input", ()=> {
            if (input.value > max) {
                input.value = max;
            }
        
            if (input.value < min) {
                input.value = min;
            }

            if(input.value==''){
                input.value = min;
            }

        })
    },

    onlyDigitsKey(target){
        target.addEventListener("keydown", function(event) {
            // Получаем код клавиши
            let key = event.keyCode || event.which;
        
            // Разрешаем ввод только цифр и клавиш Backspace, Delete, Tab и стрелок
            if ((key < 48 || key > 57) &&
             key !== 8 && key !== 46 && key !== 9 && 
             (key < 37 || key > 40) &&
            (key<96|| key>105)) {
                event.preventDefault();
            }
        });
        
    },
    
    AddFolderContent: AddFolderContent,

    MeterSettingsContent:MeterSettingsContent,

    TrainingMessage: TrainingMessage,

    Cover:Cover,

    OkCancelAccept:OkCancelAccept
}