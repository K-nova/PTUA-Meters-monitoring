export let PopUp=class{
    main;
    container;
    body;
    header;
    closeButton;
    calllButton;

    displayed=false;


    constructor(RootParent, calllButton){
        this.calllButton=calllButton;
        //-----создаем элементы
        this.main=document.createElement("div");
        this.main.className="pop_up";
        RootParent.appendChild(this.main);

        this.container=document.createElement('div');
        this.container.className='pop_up_container';
        this.main.appendChild(this.container);

        this.body=document.createElement('div');
        this.body.className='pop_up_body';
        this.container.appendChild(this.body);

        this.header=document.createElement("div");
        this.header.className="pop_up_header";
        this.body.appendChild(this.header);

        this.closeButton=document.createElement("button");
        this.closeButton.className="pop_up_close";
        this.closeButton.innerText="✖"; //&#10006
        this.header.appendChild(this.closeButton);

        //-----подключаем команды кнопкам управления
        //вызывающая кнопка
        if(this.calllButton!=undefined){
            this.calllButton.addEventListener("click", ()=>{
                this.main.classList.toggle("active");   
                this.displayed=!this.displayed; 
            })
        }
        
        //закрывающая кнопка
        this.closeButton.addEventListener("click", ()=>{
            this.close();
        });

    }

    open=()=>{
        this.main.classList.add("active");   
        this.displayed=true; 
    }

    close=()=>{
        this.main.classList.remove("active");
        this.displayed=false;
    }

}