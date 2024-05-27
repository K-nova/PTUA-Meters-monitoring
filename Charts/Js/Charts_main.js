
import {ChartsCollection} from "../../Main/Js/sys/ChartsCollection.js";
import {PageElements} from "../../Main/Js/sys/PageElements/PageElements.js";
import {ServerDataExchange} from "../../Main/Js/sys/ServerDataExchange/ServerDataExchange.js";

//создаем структуру
export let ChartColl=new ChartsCollection();

//
let resizer = document.getElementById('resizer');
let leftPanel = document.getElementById('tree');
//let rightPanel = document.getElementById('Workspace');

// let isResizing = false;
 resizer.style.left = `${leftPanel.offsetWidth}px`;

// resizer.addEventListener('mousedown', function(e) {
//     isResizing = true;

//     document.addEventListener('mousemove', resize);
//     document.addEventListener('mouseup', () => {
//         isResizing = false;
//         document.removeEventListener('mousemove', resize);
//     });



// });

// function resize(e) {
//     if (isResizing) {
//         const x = e.pageX;
//         const leftPanelWidth = x - leftPanel.offsetWidth / 2;
//         leftPanel.style.width = `${leftPanelWidth}px`;
//         resizer.style.left = `${x}px`;
//         console.log('mousmove', x, leftPanelWidth)
//         rightPanel.style.width = `calc(100% - ${leftPanelWidth}px)`;
//     }
// }


//------------Pop-up добавления папки
//создаем элементы страницы
let AddFolder1Content=new PageElements.AddFolderContent(ChartColl.addFolderPopUp.body);
let AddFolder2Content=new PageElements.AddFolderContent(ChartColl.addFolder2PopUp.body);

//присваиваем функционал
let addFolderPopUpLogic=function(content, popUp){
    let acceptDone=false;
    //функция применить
    async function meterSettingApply(){
        //команда добавляения данных счетчика на сервер
        ChartColl.treeLoader.show();
        let addFolderResponse=await ServerDataExchange.addItem({
            idPath:ChartColl.mouseFTreeMenuEventPath.idPath,
            text:content.addFolderNameInput.value || content.addFolderNameInput.placeholder,
            type: 'folder'
        });
        ChartColl.treeLoader.hide();

        //анализируем ответ сервера
        if(!addFolderResponse.err){
            //пересобираем дерево и воркспейс
            ChartColl.construct();

            acceptDone=true;
        }else{
            if(addFolderResponse.errDescription==ServerDataExchange.ERR_NAMEALREADYEXIST){
                alert('Такая папка уже существует!');          
    
            }
            acceptDone=false;
        }

    }

    //кнопки ок/отмена/применить
    content.okCancelAccept.ok.addEventListener('click',()=>{
        async function okClick(){
            acceptDone=false;
            await meterSettingApply.call(this);
            if(acceptDone){popUp.close();}
        }

        okClick();
        
    })

    content.okCancelAccept.cancel.addEventListener('click',()=>{
        popUp.close();
    })

}

addFolderPopUpLogic(AddFolder1Content, ChartColl.addFolderPopUp);
addFolderPopUpLogic(AddFolder2Content, ChartColl.addFolder2PopUp);


//------------Pop-up добавления счетчика
let MeterSettingsContent=new PageElements.MeterSettingsContent(ChartColl.addMeterPopUp.body)


//путь
MeterSettingsContent.mSArea1.input_meter_path.value=ChartColl.mouseFTreeMenuEventPath.textPath;

ChartColl.addMeterPopUp.calllButton.addEventListener("click", ()=>{
    MeterSettingsContent.mSArea1.input_meter_path.value=ChartColl.mouseFTreeMenuEventPath.textPath;
})

//функция применить
async function meterSettingApply(){
    //формируем данные настройки счетчика
    let meterSettings={};
    meterSettings.ip=[];
    for(let i=0; i<4; i++){
        meterSettings.ip[i]=MeterSettingsContent.mSArea2.input_ip[i].value;
    }
    meterSettings.rs_type=MeterSettingsContent.mSArea2.select_rs_type.value;
    meterSettings.rs_port=MeterSettingsContent.mSArea2.input_rs_port.value;
    meterSettings.rs485_adress=MeterSettingsContent.mSArea2.input_rs485_adress.value;

    
    meterSettings.dataExchange=[]
    let i=0;
    for (let checkBoxLine of MeterSettingsContent.mSArea3.subArea1.column1.cbLinesContent){
        let dataExchangeItem={
            name: `de${i}`,
            active:MeterSettingsContent.mSArea3.subArea1.column1.cbList.checkBoxes[i].checked,
            label: checkBoxLine.parNameInput.value || checkBoxLine.parNameInput.placeholder,
            obisCode:checkBoxLine.parObisCodeInput.value || checkBoxLine.parObisCodeInput.placeholder
        }
        meterSettings.dataExchange.push(dataExchangeItem);
        i++;
    }
    for (let checkBoxLine of MeterSettingsContent.mSArea3.subArea1.column2.cbLinesContent){
        let dataExchangeItem={
            name: `de${i}`,
            active:MeterSettingsContent.mSArea3.subArea1.column2.cbList.checkBoxes[i-13].checked,
            label: checkBoxLine.parNameInput.value || checkBoxLine.parNameInput.placeholder,
            obisCode:checkBoxLine.parObisCodeInput.value || checkBoxLine.parObisCodeInput.placeholder
        }
        meterSettings.dataExchange.push(dataExchangeItem);
        i++;
    }

    meterSettings.exchangeTimeValue=MeterSettingsContent.mSArea3.subArea2.column1.input_metter_timeValue.value;
    meterSettings.exchangeTimeType=MeterSettingsContent.mSArea3.subArea2.column3.select.value;

    //команда добавляения данных счетчика на сервер
    
    let addMeterResponse=await ServerDataExchange.addItem({
        idPath:ChartColl.mouseFTreeMenuEventPath.idPath,
        text:MeterSettingsContent.mSArea1.input_meter_name.value ||
        MeterSettingsContent.mSArea1.input_meter_name.placeholder,
        meterSettings:meterSettings

    })

    if(!addMeterResponse.err){
        //пересобираем дерево и воркспейс
        ChartColl.construct();
    }else{
        if(addMeterResponse.errDescription==ServerDataExchange.ERR_NAMEALREADYEXIST){
            MeterSettingsContent.addNameErr('Такое имя уже существует в данной папке!');          

        }
    }
}

//кнопки ок/отмена/применить
MeterSettingsContent.okCancelAccept.accept.addEventListener('click',()=>{
    meterSettingApply();
});
MeterSettingsContent.okCancelAccept.ok.addEventListener('click',()=>{
    meterSettingApply();
    ChartColl.addMeterPopUp.close();
});
MeterSettingsContent.okCancelAccept.cancel.addEventListener('click',()=>{
    ChartColl.addMeterPopUp.close();
});





