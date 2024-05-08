import {ServDataExchangeSim} from "./ServDataExchangeSim.js";

//класс обмена данными с сервером
export let ServerDataExchange=class{
    static DataExchangeSimulation= true;
    static NO_CHANGES='nc';
    static ERR_NAMEALREADYEXIST='err: name already exist in folder';

    //получить данные по графику счетчика
    static async GetChartData(idPath,timeRange){
        let result;

        if(this.DataExchangeSimulation){
          result =await new ServDataExchangeSim().getChartData(idPath,timeRange);
        }

        return result;
    };

    //получить данные по структуре дерева
    static async getTreeStructureData(){
        let result;
        //симуляция обмена данными с сервером
        if(this.DataExchangeSimulation){
            result=await new ServDataExchangeSim().getTreeStructureData();
         }

         //обмен данными с сервером
         else{
            try{
                let response=await fetch('http://172.17.1.65/api/meters',{
                    method: "GET", 
                    //mode: 'no-cors',
                    //headers: {'Content-Type': 'application/json'}
                })
                result=await response.json();
            }
            catch(err){
                console.error('Произошла ошибка:', err);
            }
        }
 
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