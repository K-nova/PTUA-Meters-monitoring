import {PageElements} from "./PageElements.js";
import {trendSetpoints} from "../GlobalConst.js";

export let MeterSettingsContent=class{

    meterSettingsWrapper;

    mSArea1={
        body:{},
        topic:{},
        label_meter_path:{},
        input_meter_path:{},
        wraper_meter_name:{},
        label_meter_name:{},
        input_meter_name:{},

        nameErr:undefined
    };
    
    mSArea2={
        body:{},
        topic:{},
        label_ip:{},
        input_ip:[],
        label_rs_type:{},
        select_rs_type:{},
        select_rs_type_options:{},
        label_rs_port:{},
        input_rs_port:{},
        label_rs485_adress:{},
        input_rs485_adress:{}
    };
    
    mSArea3={
        body:{},
        topic:{},
        subArea1:{
            body:{},
            column1:{body:{}, cbArea:{}, cbList:{}, cbLinesContent:[]},
            column2:{body:{}, cbArea:{}, cbList:{}, cbLinesContent:[]},
        },
        subArea2Topic:{},
        subArea2:{
            body:{},
            column1:{body:{}, input_metter_timeValue:{}},
            column2:{body:{}},
            column3:{body:{}, select:{}, selectOptions:{}}
        }
    };

    okCancelAccept;
    

    #obisList=[
        '31.7.0',
        '51.7.0',
        '71.7.0',
        '32.7.0',
        '52.7.0',
        '72.7.0',
        '12.7.1',
        '12.7.2',
        '12.7.3',
        '1.7.0',
        '21.7.0',
        '41.7.0',
        '61.7.0',
        '9.7.0',
        '29.7.0',
        '49.7.0',
        '69.7.0',
        '3.7.0',
        '23.7.0',
        '43.7.0',
        '63.7.0',
        '14.7.0',
        '13.7.0',
        '33.7.0',
        '53.7.0',
        '73.7.0'
    ]

    constructor(parent){
        this.meterSettingsWrapper=document.createElement('div');
        parent.appendChild(this.meterSettingsWrapper);

        //----
        this.#createMSArea1();

        //----
        this.#createMSArea2();

        //----
        this.#createMSArea3();

        //----
        this.okCancelAccept=new PageElements.OkCancelAccept(this.meterSettingsWrapper);
        
    }

    setNameErr=(text)=>{
        if(this.nameErr==undefined){
            this.nameErr=document.createElement('div');
            this.nameErr.classList.add('text');
            this.nameErr.classList.add('err');
            this.nameErr.innerText=text;
            this.mSArea1.wraper_meter_name.appendChild(this.nameErr);
        }else{
            this.nameErr.innerText=text;
        }

        this.mSArea1.input_meter_name.classList.add('input');
        this.mSArea1.input_meter_name.classList.add('err');

        this.mSArea1.input_meter_name.addEventListener('input',()=>{
            this.mSArea1.input_meter_name.classList.remove('err');
            this.nameErr.remove();
            this.nameErr=undefined;
        })
    }

    deleteNameErr=()=>{
        this.mSArea1.input_meter_name.classList.remove('err');
        if(this.nameErr!=undefined){
            this.nameErr.remove();
            this.nameErr=undefined;
        }
    }

    #createMSArea1=()=>{
        this.mSArea1.body=document.createElement('div');
        this.mSArea1.body.className='tab_item_area';
        this.meterSettingsWrapper.appendChild(this.mSArea1.body);

        this.mSArea1.topic=document.createElement('h3');
        this.mSArea1.topic.className='tab_item_area_topic';
        this.mSArea1.topic.innerText='Общее';
        this.mSArea1.body.appendChild(this.mSArea1.topic);

        this.mSArea1.label_meter_path=document.createElement('h4');
        this.mSArea1.label_meter_path.innerText='Путь:';
        this.mSArea1.body.appendChild(this.mSArea1.label_meter_path);

        this.mSArea1.input_meter_path=document.createElement('input');
        this.mSArea1.input_meter_path.type='text';
        this.mSArea1.input_meter_path.className='input notAllowed'
        this.mSArea1.body.appendChild(this.mSArea1.input_meter_path);

        this.mSArea1.wraper_meter_name=document.createElement('div');
        this.mSArea1.body.appendChild(this.mSArea1.wraper_meter_name);

        this.mSArea1.label_meter_name=document.createElement('h4');
        this.mSArea1.label_meter_name.innerText='Имя:';
        this.mSArea1.wraper_meter_name.appendChild(this.mSArea1.label_meter_name);

        this.mSArea1.input_meter_name=document.createElement('input');
        this.mSArea1.input_meter_name.type='text';
        this.mSArea1.input_meter_name.placeholder='Счетчик1'
        this.mSArea1.wraper_meter_name.appendChild(this.mSArea1.input_meter_name);
    }

    #createMSArea2=()=>{
        this.mSArea2.body=document.createElement('div');
        this.mSArea2.body.className='tab_item_area';
        this.meterSettingsWrapper.appendChild(this.mSArea2.body);

        this.mSArea2.topic=document.createElement('h3');
        this.mSArea2.topic.className='tab_item_area_topic';
        this.mSArea2.topic.innerText='Подключение';
        this.mSArea2.body.appendChild(this.mSArea2.topic);

        this.mSArea2.label_ip=document.createElement('h4');
        this.mSArea2.label_ip.innerText='Ip адрес шлюза:';
        this.mSArea2.body.appendChild(this.mSArea2.label_ip)

        for (let i=0; i<4; i++){
            this.mSArea2.input_ip[i]=document.createElement('input');
            this.mSArea2.input_ip[i].type='number';
            this.mSArea2.body.appendChild(this.mSArea2.input_ip[i]);
            PageElements.setInputMinMax(this.mSArea2.input_ip[i],0,255);
            PageElements.onlyDigitsKey(this.mSArea2.input_ip[i]);
            this.mSArea2.input_ip[i].value='0';
        }


        this.mSArea2.label_rs_type=document.createElement('h4');
        this.mSArea2.label_rs_type.innerText='тип последовательного интерфейса';
        this.mSArea2.body.appendChild(this.mSArea2.label_rs_type);

        this.mSArea2.select_rs_type=document.createElement('select');
        this.mSArea2.select_rs_type.className="select";
        this.mSArea2.select_rs_type_options=[];
        this.mSArea2.select_rs_type_options[0]=document.createElement('option');
        this.mSArea2.select_rs_type_options[0].value='0';
        this.mSArea2.select_rs_type_options[0].innerText='rs-485'
        this.mSArea2.select_rs_type.appendChild(this.mSArea2.select_rs_type_options[0]);
        this.mSArea2.select_rs_type_options[1]=document.createElement('option');
        this.mSArea2.select_rs_type_options[1].value='1';
        this.mSArea2.select_rs_type_options[1].innerText='rs-232'
        this.mSArea2.select_rs_type.appendChild(this.mSArea2.select_rs_type_options[1]);
        this.mSArea2.body.appendChild(this.mSArea2.select_rs_type);

        this.mSArea2.label_rs_port=document.createElement('h4');
        this.mSArea2.label_rs_port.innerText='номер порта последовательного интерфейса';
        this.mSArea2.body.appendChild(this.mSArea2.label_rs_port);

        this.mSArea2.input_rs_port=document.createElement('input');
        this.mSArea2.input_rs_port.type='number';
        this.mSArea2.input_rs_port.value=0;
        this.mSArea2.body.appendChild(this.mSArea2.input_rs_port);
        PageElements.setInputMinMax(this.mSArea2.input_rs_port,0,255);
        PageElements.onlyDigitsKey(this.mSArea2.input_rs_port);

        this.mSArea2.label_rs485_adress=document.createElement('h4');
        this.mSArea2.label_rs485_adress.innerText='адрес счетчика в последовательном интерфейсе';
        this.mSArea2.body.appendChild(this.mSArea2.label_rs485_adress);

        this.mSArea2.input_rs485_adress=document.createElement('input');
        this.mSArea2.input_rs485_adress.type='number';
        this.mSArea2.input_rs485_adress.className='input';
        this.mSArea2.input_rs485_adress.value=1;
        this.mSArea2.body.appendChild(this.mSArea2.input_rs485_adress);
        PageElements.setInputMinMax(this.mSArea2.input_rs485_adress,0,128);
        PageElements.onlyDigitsKey(this.mSArea2.input_rs485_adress);

        //логика
        this.mSArea2.select_rs_type.addEventListener("change", ()=> {            
            if(this.mSArea2.select_rs_type.value=='1'){this.mSArea2.input_rs485_adress.classList.add('notAllowed');}
            else{this.mSArea2.input_rs485_adress.classList.remove('notAllowed');}
          });
    }

    #createMSArea3=()=>{
        this.mSArea3.body=document.createElement('div');
        this.mSArea3.body.className='tab_item_area';
        this.meterSettingsWrapper.appendChild(this.mSArea3.body);

        this.mSArea3.topic=document.createElement('h3');
        this.mSArea3.topic.className='tab_item_area_topic';
        this.mSArea3.topic.innerText='Параметры';
        this.mSArea3.body.appendChild(this.mSArea3.topic);

        this.mSArea3.subArea1.body=document.createElement('div');
        this.mSArea3.subArea1.body.className='tab_item_area_sub';
        this.mSArea3.body.appendChild(this.mSArea3.subArea1.body);

        this.mSArea3.subArea1.column1.body=document.createElement('div');
        this.mSArea3.subArea1.column1.body.className='tab_item_area_sub_column';
        this.mSArea3.subArea1.body.appendChild(this.mSArea3.subArea1.column1.body);

        this.mSArea3.subArea1.column1.cbArea=document.createElement('div');
        this.mSArea3.subArea1.column1.cbArea.className='CheckBox_area';
        this.mSArea3.subArea1.column1.body.appendChild(this.mSArea3.subArea1.column1.cbArea);

        this.mSArea3.subArea1.column1.cbList=
        PageElements.CreateCheckBoxList(this.mSArea3.subArea1.column1.cbArea,
             'cb_meter_parameter',trendSetpoints.length/2);

        let i=0;
        for(let checkBoxLine of this.mSArea3.subArea1.column1.cbList.checkBoxLines){
            let cbLineContent={};
            cbLineContent.body=checkBoxLine;
            cbLineContent.parNameInput=document.createElement('input');
            cbLineContent.parNameInput.className='checkbox_line_nameInput';
            cbLineContent.parNameInput.placeholder=trendSetpoints[i].label;
            cbLineContent.body.appendChild(cbLineContent.parNameInput);
            PageElements.createTooltip(cbLineContent.parNameInput,'Имя параметра');
            
            cbLineContent.parObisCodeInput=document.createElement('input');
            cbLineContent.parObisCodeInput.className='checkbox_line_obisInput';
            cbLineContent.parObisCodeInput.placeholder=this.#obisList[i];
            cbLineContent.body.appendChild(cbLineContent.parObisCodeInput);
            PageElements.createTooltip(cbLineContent.parObisCodeInput,'Код OBIS');

            this.mSArea3.subArea1.column1.cbLinesContent.push(cbLineContent);

            i++;
        }

        this.mSArea3.subArea1.column2.body=document.createElement('div');
        this.mSArea3.subArea1.column2.body.className='tab_item_area_sub_column';
        this.mSArea3.subArea1.body.appendChild(this.mSArea3.subArea1.column2.body);

        this.mSArea3.subArea1.column2.cbArea=document.createElement('div');
        this.mSArea3.subArea1.column2.cbArea.className='CheckBox_area';
        this.mSArea3.subArea1.column2.body.appendChild(this.mSArea3.subArea1.column2.cbArea);

        this.mSArea3.subArea1.column2.cbList=
        PageElements.CreateCheckBoxList(this.mSArea3.subArea1.column2.cbArea,
             'cb_meter_parameter',trendSetpoints.length/2);
        this.mSArea3.subArea1.column2.cbList.setUnchecked(0);    

        i=13;
        for(let checkBoxLine of this.mSArea3.subArea1.column2.cbList.checkBoxLines){
            let cbLineContent={};
            cbLineContent.body=checkBoxLine;
            cbLineContent.parNameInput=document.createElement('input');
            cbLineContent.parNameInput.className='checkbox_line_nameInput';
            cbLineContent.parNameInput.placeholder=trendSetpoints[i].label;
            cbLineContent.body.appendChild(cbLineContent.parNameInput);
            PageElements.createTooltip(cbLineContent.parNameInput,'Имя параметра');
            
            cbLineContent.parObisCodeInput=document.createElement('input');
            cbLineContent.parObisCodeInput.className='checkbox_line_obisInput';
            cbLineContent.parObisCodeInput.placeholder=this.#obisList[i];
            cbLineContent.body.appendChild(cbLineContent.parObisCodeInput);
            PageElements.createTooltip(cbLineContent.parObisCodeInput,'Код OBIS');

            this.mSArea3.subArea1.column2.cbLinesContent.push(cbLineContent);

            i++;
        }

        this.mSArea3.subArea2Topic=document.createElement('h4');
        this.mSArea3.subArea2Topic.innerText='период опроса счетчика:';
        this.mSArea3.body.appendChild(this.mSArea3.subArea2Topic);

        this.mSArea3.subArea2.body=document.createElement('div');
        this.mSArea3.subArea2.body.className='tab_item_area_sub';
        this.mSArea3.body.appendChild(this.mSArea3.subArea2.body);

        this.mSArea3.subArea2.column1.body=document.createElement('div');
        this.mSArea3.subArea2.column1.body.className='tab_item_area_sub_column';
        this.mSArea3.subArea2.body.appendChild(this.mSArea3.subArea2.column1.body);

        this.mSArea3.subArea2.column1.input_metter_timeValue=document.createElement('input');
        this.mSArea3.subArea2.column1.input_metter_timeValue.type='number';
        this.mSArea3.subArea2.column1.input_metter_timeValue.min=0;
        this.mSArea3.subArea2.column1.input_metter_timeValue.value=1;
        this.mSArea3.subArea2.body.appendChild(this.mSArea3.subArea2.column1.input_metter_timeValue);
        PageElements.onlyDigitsKey(this.mSArea3.subArea2.column1.input_metter_timeValue);

        this.mSArea3.subArea2.column2.body=document.createElement('div');
        this.mSArea3.subArea2.column2.body.className='tab_item_area_sub_column';
        this.mSArea3.subArea2.column2.body.indexText='✖'; //&#10006
        this.mSArea3.subArea2.body.appendChild(this.mSArea3.subArea2.column2.body);

        this.mSArea3.subArea2.column3.body=document.createElement('div');
        this.mSArea3.subArea2.column3.body.className='tab_item_area_sub_column';
        this.mSArea3.subArea2.body.appendChild(this.mSArea3.subArea2.column3.body);

        this.mSArea3.subArea2.column3.select=document.createElement('select');
        this.mSArea3.subArea2.column3.select.className="select";
        this.mSArea3.subArea2.column3.selectOptions=[];
        this.mSArea3.subArea2.column3.selectOptions[0]=document.createElement('option');
        this.mSArea3.subArea2.column3.selectOptions[0].value='1000';
        this.mSArea3.subArea2.column3.selectOptions[0].innerText='1 секунда'
        this.mSArea3.subArea2.column3.select.appendChild(this.mSArea3.subArea2.column3.selectOptions[0]);
        this.mSArea3.subArea2.column3.selectOptions[1]=document.createElement('option');
        this.mSArea3.subArea2.column3.selectOptions[1].value='60000';
        this.mSArea3.subArea2.column3.selectOptions[1].innerText='1 минута'
        this.mSArea3.subArea2.column3.select.appendChild(this.mSArea3.subArea2.column3.selectOptions[1]);
        this.mSArea3.subArea2.column3.selectOptions[2]=document.createElement('option');
        this.mSArea3.subArea2.column3.selectOptions[2].value='3600000';
        this.mSArea3.subArea2.column3.selectOptions[2].innerText='1 час'
        this.mSArea3.subArea2.column3.select.appendChild(this.mSArea3.subArea2.column3.selectOptions[2]);
        this.mSArea3.subArea2.column3.selectOptions[3]=document.createElement('option');
        this.mSArea3.subArea2.column3.selectOptions[3].value='86400000';
        this.mSArea3.subArea2.column3.selectOptions[3].innerText='1 сутки'
        this.mSArea3.subArea2.column3.select.appendChild(this.mSArea3.subArea2.column3.selectOptions[3]);
        this.mSArea3.subArea2.column3.body.appendChild(this.mSArea3.subArea2.column3.select);
    }   
    
}