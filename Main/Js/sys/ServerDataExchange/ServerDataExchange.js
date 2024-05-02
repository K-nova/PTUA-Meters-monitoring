import {ServDataExchangeSim} from "./ServDataExchangeSim.js";

//класс обмена данными с сервером
export let ServerDataExchange=class{
    static DataExchangeSimulation= true;
    static NO_CHANGES='nc';
    static ERR_NAMEALREADYEXIST='err: name already exist in folder';

    //получить данные по графику счетчика
    static GetChartData=function(idPath,timeRange){
        let result;

        if(this.DataExchangeSimulation){
          result = new ServDataExchangeSim().getChartData(idPath,timeRange);
        }

        return result;
    };

    //получить данные по структуре дерева
    static getTreeStructureData=function(){
        let result;
        //симуляция обмена данными с сервером
        if(this.DataExchangeSimulation){
            result=new ServDataExchangeSim().getTreeStructureData();    
         }
 
         //console.log('getTreeStructureData', result)
         return result;
    };

    //добавить в струкутуру дерева данные элемента
    static addItem=function(data){
        let response={done:false, err:false, errDescription:''};
        //симуляция обмена данными с сервером
        if(this.DataExchangeSimulation){
            response=new ServDataExchangeSim().addItem(data);
        }
        //console.log('addItem', response)
        return response;
    }

    //удалить из струкутуры дерева данные элемента
    static deleteItem=function(idPath){
        //симуляция обмена данными с сервером
        if(this.DataExchangeSimulation){
            new ServDataExchangeSim().deleteItem(idPath);
        }
    }

    //переименовать папку или счетчик
    static renameItem=function(data){
        let response={done:false, err:false, errDescription:''};
        //симуляция обмена данными с сервером
        if(this.DataExchangeSimulation){
            response=new ServDataExchangeSim().renameItem(data);  
        }
        //console.log('renameItem', response)
        return response;
    }

    //получить настройки счетчика
    static getMeterSettings=function(idPath){
        let result;
        //симуляция обмена данными с сервером
        if(this.DataExchangeSimulation){
            result=new ServDataExchangeSim().getMeterSettings(idPath);
        }
        //console.log('getMeterSettings', result)
        return result;
    }

    //изменить настройки счетчика
    static setMeterSettings=function(data){
        let response={done:false, err:false, errDescription:''};

        //симуляция обмена данными с сервером
        if(this.DataExchangeSimulation){            
            response=new ServDataExchangeSim().setMeterSettings(data);
           
        }
        //console.log('setMeterSettings', response)
        return response;
    }
    
}