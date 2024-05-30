import {ServDataExchangeSim} from "./ServDataExchangeSim.js";

//класс обмена данными с сервером
export let ServerDataExchange=class{
    static #dataExchangeSimulation=[
        true, //GetChartData
        true, //getTreeStructureData
        true, //addItem
        true, //deleteItem
        true, //renameItem
        true, //getMeterSettings
        true, //setMeterSettings
    ];
    static #showInfo=[
        false, //GetChartData
        true, //getTreeStructureData
        true, //addItem
        true, //deleteItem
        true, //renameItem
        true, //getMeterSettings
        true, //setMeterSettings
    ];
    static NO_CHANGES='nc';
    static ERR_NAMEALREADYEXIST='err: name already exist in folder';

    //получить данные по графику счетчика
    static async getChartData(idPath,timeRange){
        let result;

        //симуляция обмена данными с сервером
        if(this.#dataExchangeSimulation[0]){
          result =await new ServDataExchangeSim().getChartData(idPath,timeRange);
        }
        
        //инфо по данным в консоле
        if(this.#showInfo[0]){
            console.log('GetChartData', `sim=${this.#dataExchangeSimulation[0]}`, idPath, timeRange, result);
        }
        

        return result;
    };

    //получить данные по структуре дерева
    static async getTreeStructureData(){
        let result;
        let error=false;
        //симуляция обмена данными с сервером
        if(this.#dataExchangeSimulation[1]){
            result=await new ServDataExchangeSim().getTreeStructureData();
         }

         //обмен данными с сервером
         else{
            try{
                let response=await fetch('http://172.17.1.36/api/tree',{
                    method: "GET"
                })
                result=await response.json();
            }
            catch(err){
                console.error('getTreeStructureData', 'sim=false', 'Ошибка запроса', err);
                error=true;
            }
        }
 
        //инфо по данным в консоле
        if(this.#showInfo[1] && !error){
            console.log('getTreeStructureData', `sim=${this.#dataExchangeSimulation[1]}`, result);
        }

         return result;
    };

    //добавить в струкутуру дерева данные элемента
    static async addItem (data){
        let response={done:false, err:false, errDescription:''};
        //симуляция обмена данными с сервером
        if(this.#dataExchangeSimulation[2]){
            response=await new ServDataExchangeSim().addItem(data);
        }

        //инфо по данным в консоле
        if(this.#showInfo[2]){
            console.log('addItem', `sim=${this.#dataExchangeSimulation[2]}`, data, response);
        }

        return response;
    }

    //удалить из струкутуры дерева данные элемента
    static async deleteItem(idPath){
        //симуляция обмена данными с сервером
        if(this.#dataExchangeSimulation[3]){
            await new ServDataExchangeSim().deleteItem(idPath);
        }

        //инфо по данным в консоле
        if(this.#showInfo[3]){
            console.log('deleteItem', `sim=${this.#dataExchangeSimulation[3]}`, idPath);
        }
    }

    //переименовать папку или счетчик
    static async renameItem(data){
        let response={done:false, err:false, errDescription:''};
        //симуляция обмена данными с сервером
        if(this.#dataExchangeSimulation[4]){
            response=await new ServDataExchangeSim().renameItem(data);  
        }

        //инфо по данным в консоле
        if(this.#showInfo[4]){
            console.log('renameItem', `sim=${this.#dataExchangeSimulation[4]}`, data, response);
        }
        return response;
    }

    //получить настройки счетчика
    static async getMeterSettings (idPath){
        let result;
        //симуляция обмена данными с сервером
        if(this.#dataExchangeSimulation[5]){
            result=await new ServDataExchangeSim().getMeterSettings(idPath);
        }

        //инфо по данным в консоле
        if(this.#showInfo[5]){
            console.log('getMeterSettings', `sim=${this.#dataExchangeSimulation[5]}`, idPath, result);
        }

        return result;
    }

    //изменить настройки счетчика
    static async setMeterSettings(data){
        let response={done:false, err:false, errDescription:''};

        //симуляция обмена данными с сервером
        if(this.#dataExchangeSimulation[6]){            
            response=await new ServDataExchangeSim().setMeterSettings(data);
           
        }

        //инфо по данным в консоле
        if(this.#showInfo[6]){
            console.log('setMeterSettings', `sim=${this.#dataExchangeSimulation[6]}`, data, response);
        }
        return response;
    }
    
}