
import {PageElements} from "../../Main/Js/sys/PageElements/PageElements.js";
import {ServerDataExchange} from "../../Main/Js/sys/ServerDataExchange/ServerDataExchange.js";
import {TrainingMessages} from "../../Main/Js/sys/TrainingMessages.js";

import {forChartPageData, chartCover_zIndex, TrainingMessagesC, cover, workspace_iframe} from "./Chart-1.js";


export class Chart_meterSettings{

    TrainingMsg;

    //конструктор
    constructor(){
        this.#mainConstruct();
    }

    //
    async #mainConstruct(){
        //изменение родительского экрана
        let MeterSettingsAccordion=new PageElements.Accordion(document.querySelector('#accordionWrapper'),'meterSettings', 'Настройки счетчика');
        let meterSettings_checkbox=MeterSettingsAccordion.ctrlElement;
        let meterSettingsWrap=MeterSettingsAccordion.content;

        let ws_iframe_heightInit;
        meterSettings_checkbox.addEventListener('click',()=>{
            if(meterSettings_checkbox.checked){
                ws_iframe_heightInit=workspace_iframe.offsetHeight;
                workspace_iframe.style.height=workspace_iframe.offsetHeight+meterSettingsWrap.offsetHeight+100+'px';
            }else{
                workspace_iframe.style.height=ws_iframe_heightInit+'px';
            }
        })

        //
        let MeterSetting=new PageElements.MeterSettingsContent(meterSettingsWrap);

        //загружаем данные
        let meterSettings_accItem=MeterSettingsAccordion.item;
        let meterSettingsLoader=new PageElements.LoaderType2(MeterSettingsAccordion.labelAdditional);
        meterSettingsLoader.invertColor();
        meterSettingsLoader.show();
        let meterSettingsData=await ServerDataExchange.getMeterSettings(forChartPageData.id);
        meterSettingsLoader.hide();

        //область Общее
        MeterSetting.mSArea1.input_meter_path.value=forChartPageData.path;
        MeterSetting.mSArea1.input_meter_name.value=forChartPageData.name;

        //область Подключение
        let meterSettingsIps=meterSettingsData.ip.split('.');
        for(let i=0; i<4; i++){
            MeterSetting.mSArea2.input_ip[i].value=meterSettingsIps[i];
        }
        MeterSetting.mSArea2.select_rs_type.value=meterSettingsData.rs_type;
        MeterSetting.mSArea2.input_rs_port.value=meterSettingsData.rs_port;
        MeterSetting.mSArea2.input_rs485_adress.value=meterSettingsData.rs485_adress;

        //область Параметры
        MeterSetting.mSArea3.subArea1.column1.cbList.setUnchecked(0);

        let i=0;
        for(let checkBoxLine of MeterSetting.mSArea3.subArea1.column1.cbLinesContent){
            checkBoxLine.parNameInput.value=meterSettingsData.dataExchange[i].label;
            checkBoxLine.parObisCodeInput.value=meterSettingsData.dataExchange[i].obisCode;
            MeterSetting.mSArea3.subArea1.column1.cbList.checkBoxes[i].checked=meterSettingsData.dataExchange[i].active;
            i++;
        }

        for(let checkBoxLine of MeterSetting.mSArea3.subArea1.column2.cbLinesContent){
            checkBoxLine.parNameInput.value=meterSettingsData.dataExchange[i].label;
            checkBoxLine.parObisCodeInput.value=meterSettingsData.dataExchange[i].obisCode;
            MeterSetting.mSArea3.subArea1.column2.cbList.checkBoxes[i-13].checked=meterSettingsData.dataExchange[i].active;
            i++;
        }
        MeterSetting.mSArea3.subArea2.column1.input_metter_timeValue.value=meterSettingsData.exchangeTimeValue;
        MeterSetting.mSArea3.subArea2.column3.select.value=meterSettingsData.exchangeTimeType;

        //функция применить
        async function meterSettingApply(){
            //формируем данные настройки счетчика
            let setMeterData={text:{}, meterSettings:{}};
            //общее
            setMeterData.text=MeterSetting.mSArea1.input_meter_name.value;
            //подключение
            let meterSettingsIpArr=[];
            for(let i=0; i<4; i++){
                meterSettingsIpArr[i]=MeterSetting.mSArea2.input_ip[i].value;
            }
            setMeterData.meterSettings.ip=meterSettingsIpArr.join('.');

            setMeterData.meterSettings.rs_type=MeterSetting.mSArea2.select_rs_type.value;
            setMeterData.meterSettings.rs_port=MeterSetting.mSArea2.input_rs_port.value;
            setMeterData.meterSettings.rs485_adress=MeterSetting.mSArea2.input_rs485_adress.value;

            //параметры
            setMeterData.meterSettings.dataExchange=[]
            let i=0;
            for (let checkBoxLine of MeterSetting.mSArea3.subArea1.column1.cbLinesContent){
                let dataExchangeItem={
                    name: `de${i}`,
                    active:MeterSetting.mSArea3.subArea1.column1.cbList.checkBoxes[i].checked,
                    label: checkBoxLine.parNameInput.value || checkBoxLine.parNameInput.placeholder,
                    obisCode:checkBoxLine.parObisCodeInput.value || checkBoxLine.parObisCodeInput.placeholder
                }
                setMeterData.meterSettings.dataExchange.push(dataExchangeItem);
                i++;
            }
            for (let checkBoxLine of MeterSetting.mSArea3.subArea1.column2.cbLinesContent){
                let dataExchangeItem={
                    name: `de${i}`,
                    active:MeterSetting.mSArea3.subArea1.column2.cbList.checkBoxes[i-13].checked,
                    label: checkBoxLine.parNameInput.value || checkBoxLine.parNameInput.placeholder,
                    obisCode:checkBoxLine.parObisCodeInput.value || checkBoxLine.parObisCodeInput.placeholder
                }
                setMeterData.meterSettings.dataExchange.push(dataExchangeItem);
                i++;
            }

            setMeterData.meterSettings.exchangeTimeValue=MeterSetting.mSArea3.subArea2.column1.input_metter_timeValue.value;
            setMeterData.meterSettings.exchangeTimeType=MeterSetting.mSArea3.subArea2.column3.select.value;

            //команда изменения данных счетчика на сервере
            meterSettingsLoader.show();
            let setMeterResponse=await ServerDataExchange.setMeterSettings({
                id:forChartPageData.id,
                name:setMeterData.text,
                meterSettings:setMeterData.meterSettings

            })
            meterSettingsLoader.hide();

            if(setMeterResponse.err){
                if(setMeterResponse.errDescription==ServerDataExchange.ERR_NAMEALREADYEXIST){
                    MeterSetting.addNameErr('Такое имя уже существует в данной папке!');          

                }
            }
        }

        //кнопки ок/отмена/применить
        MeterSetting.okCancelAccept.accept.addEventListener('click',()=>{
            meterSettingApply.call(this);
        });
        MeterSetting.okCancelAccept.hide('ok');
        MeterSetting.okCancelAccept.hide('cancel');

        //training messages
        let meterSettingsALabel=MeterSettingsAccordion.label;

        this.TrainingMsg=new TrainingMessages('meterSettings',[
            {target:MeterSetting.mSArea3.subArea1.column1.cbList.checkBoxes[0], text:'установите, или отмените опрос счетчика. При выключенном опросе значения будут равнятся нулю'},
            {target:MeterSetting.mSArea3.subArea2.column1.input_metter_timeValue, text:'данные настройки позволяют изменить период опроса счетчика'},
            {target:MeterSetting.okCancelAccept.accept, text:'чтобы изменения вступили в силу нажмите "Применить"', left:true},
            {target:document.querySelector('#meterSettings .accordion_label'), text:'нажмите, чтоб скрыть меню настройки текущего счетчика',disableCloseButton:true},
            ]);

        this.TrainingMsg.setZIndex(chartCover_zIndex+1);

        this.TrainingMsg.hide();

        
        let TMMSinterval=setInterval(()=>{

            //показывать или скрывать тренировочные сообщения
            if(cover.style.display=='block'){this.TrainingMsg.hide();}
            else{
                if(TrainingMessagesC!=undefined && TrainingMessagesC.optionsNum>=1 && meterSettings_checkbox.checked){
                    this.TrainingMsg.show();
                }else{
                    this.TrainingMsg.hide();
                }
                
            }

            //подсвечивать кнопку раскрытия настроек счетчика, если тренировка не пройдена
            if(!meterSettings_checkbox.checked && !this.TrainingMsg.trainingFinished){
                meterSettingsALabel.classList.add('blinking');
            }else{meterSettingsALabel.classList.remove('blinking');}

            //отключение периодического опроса, если тренировка пройдена
            if(this.TrainingMsg.trainingFinished){
                clearInterval(TMMSinterval);
            }

        },1000);
    }
}