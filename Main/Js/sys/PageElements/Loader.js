export let Loader=class{
    parent={};
    loader={};

    constructor(parent){
        this.parent=parent;

        this.loader=document.createElement('div');
        this.loader.className='loader';
        this.parent.appendChild(this.loader);
        this.show();
        this.setPosition();
    }

    show=()=>{
        this.loader.classList.add('visible');
    }

    hide=()=>{
        this.loader.classList.remove('visible');
    }

    delete=()=>{
        this.parent.removeChild(this.loader);
    }    

    setPosition=()=>{
        let parentRect=this.parent.getBoundingClientRect();//получаем координаты целевого элемента
        this.loader.style.left = parentRect.left+parentRect.width/2-this.loader.offsetWidth/2+'px';
        this.loader.style.top = parentRect.top+parentRect.height/2-this.loader.offsetHeight/2+'px';
    }

    resetInblock=()=>{
        this.loader.classList.remove('inBlock');
    }

    setInblock=()=>{
        this.loader.classList.add('inBlock');
    }

    setBorderWidth=(val)=>{
        this.loader.style.borderWidth=val+'px';
    }
}