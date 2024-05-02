export let TrainingMessage=class{
    target;
    wraper;
    window;
    arrowWrapper;
    arrow;
    header;
    closeButton;
    text;

    closed=true;
    left;
    top;

    constructor(target, text, left=false, top=false, disableCloseButton=false){
        this.target=target;
        this.left=left;
        this.top=top;

        this.wraper=document.createElement('div');
        this.wraper.className='trainingMessage';
        document.body.appendChild(this.wraper);

        this.setPositionByTarget();

        if(!this.top){this.#createArrow();}
        
        this.window=document.createElement('div');
        this.window.className='trainingMessageWindow';
        this.wraper.appendChild(this.window);

        this.header=document.createElement('div');
        this.header.className='trainingMessageHeader';
        this.window.appendChild(this.header);

        this.closeButton=document.createElement('button');
        //this.closeButton.className="trainingMessageHeader_close";
        this.closeButton.innerText="✖"; //&#10006
        if(disableCloseButton){this.closeButton.classList.add('notAllowed');}
        this.header.appendChild(this.closeButton);

        this.text=document.createElement('div');
        this.text.className='trainingMessageContent';
        this.text.innerHTML  = text;
        this.window.appendChild(this.text);

        if(this.top){this.#createArrow();}

         //-----подключаем команды кнопкам управления
         //закрывающая кнопка
        this.closeButton.addEventListener("click", ()=>{
            this.close();
        })

        //
        this.target.addEventListener("mouseup", ()=>{
            if(this.wraper.className=='trainingMessage active'){
                this.close();
            }
            
        })

    }

    activate=()=>{
        this.wraper.classList.add("active");
        this.closed=false;
    }

    close=()=>{
        this.wraper.classList.remove("active");
        this.closed=true;
    }

    setPositionByTarget=()=>{
        let targetRect=this.target.getBoundingClientRect();//получаем координаты целевого элемента
        
        // Устанавливаем позицию по горизонтали
        if(!this.left){
            this.wraper.style.left = targetRect.left+this.target.offsetWidth*0.2+ 'px';     
        }else{
            this.wraper.style.left = targetRect.left-this.wraper.offsetWidth+this.target.offsetWidth*0.3+ 'px'; 
        }
        // Устанавливаем позицию по вертикали
        if(!this.top){
            this.wraper.style.top = targetRect.top+this.target.offsetHeight*0.5 + 'px'; 
        }else{
            this.wraper.style.top = targetRect.top-this.wraper.offsetHeight + 'px'; 
        }
        
        
    }

    #createArrow=()=>{
        this.arrowWrapper=document.createElement('div');
        this.arrowWrapper.className='trainingMessageArrowWrapper';
        this.wraper.appendChild(this.arrowWrapper);
        if(this.left){ this.arrowWrapper.classList.add('left');}

        this.arrow=document.createElement('div');
        if(!this.top){this.arrow.className='trainingMessageArrow';}
        else{this.arrow.className='trainingMessageArrowDown';}
        this.arrowWrapper.appendChild(this.arrow);
    }

}