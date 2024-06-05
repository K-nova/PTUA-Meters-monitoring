import {StorageCtrl} from "./StorageCtrl.js";
import {PageElements} from "./PageElements/PageElements.js";

//управление сообщениями обучения
export let TrainingMessages=class{
    
    messages=[];
    optionsNum=0;
    msgNum=0;

    trainingFinished=false;

    #hidden=false;

    #currMsgMem='trainingMsg-optionNum-';

    #zIndex=1;

    constructor(id,targetOptions){
        let closedMem=true;

        //--создаем первое тренирочные сообщения
        let optionNum=StorageCtrl.getItem(this.#currMsgMem+id, {isJSON:false});
        if(optionNum!=undefined && optionNum>=0){
            this.optionsNum=optionNum;
        }

        this.trainingFinished=!(this.optionsNum<=targetOptions.length-1);
        
        if(!this.trainingFinished){
            let message=new PageElements.TrainingMessage(targetOptions[this.optionsNum].target,
                targetOptions[this.optionsNum].text, targetOptions[this.optionsNum].left, 
                targetOptions[this.optionsNum].top, 
                targetOptions[this.optionsNum].disableCloseButton);
            
            message.wraper.style.zIndex=this.#zIndex;

            this.messages.push(message);


            this.messages[this.msgNum].activate();
            closedMem=false;
        }
        

        //каждую секунду проверяем состояние сообщения и открываем новое, если предыдущее закрыто
        let timeInterval=setInterval(()=>{
            if(!this.trainingFinished){
                if(this.messages[this.msgNum].closed && this.messages[this.msgNum].closed!= closedMem && !this.#hidden){
                    this.optionsNum++;
                    this.msgNum++;
    
                    this.trainingFinished=!(this.optionsNum<=targetOptions.length-1);
    
                    if(!this.trainingFinished){
                        //создаем новое сообщение
                        let message=new PageElements.TrainingMessage(targetOptions[this.optionsNum].target,
                            targetOptions[this.optionsNum].text, targetOptions[this.optionsNum].left,
                            targetOptions[this.optionsNum].top, 
                            targetOptions[this.optionsNum].disableCloseButton);
                        
                        message.wraper.style.zIndex=this.#zIndex;

                        //добавляем в список
                        this.messages.push(message);
    
                        //активируем видимость
                        this.messages[this.msgNum].activate();

                    }
    
                    //записываем в локальную сессию уже пройденные сообщения
                    StorageCtrl.setItem(this.#currMsgMem+id, this.optionsNum,{isJSON:false});
                    
    
                }

                if(!this.trainingFinished){
                    closedMem=this.messages[this.msgNum].closed;
                }
            }

            //отключение периодического опроса, если тренировка пройдена
            if(this.trainingFinished){
                clearInterval(timeInterval);
            }
           
        },1000);
        
      
    }

    hide=()=>{
       this.#hidden=true;
       if(this.messages.length>0 && this.msgNum<this.messages.length){
            this.messages[this.msgNum].close();
       }
       
    }

    show=()=>{
        this.#hidden=false;
        if(this.messages.length>0 && this.msgNum<this.messages.length){
            for(let msg of this.messages){
                msg.setPositionByTarget();
            }
            this.messages[this.msgNum].activate();
        }
        
    }

    setZIndex=(value)=>{
        this.#zIndex=value;
        for(let msg of this.messages){
            msg.wraper.style.zIndex=this.#zIndex;
        }
    }
}