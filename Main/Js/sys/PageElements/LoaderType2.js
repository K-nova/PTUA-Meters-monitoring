import {Loader} from "./Loader.js";

export let LoaderType2=class{
    parent={};
    loader={};
    letters=[];
    loaderT1={};

    constructor(parent){
        this.parent=parent;

        this.loader=document.createElement('div');
        this.loader.className='loaderType2';
        this.parent.appendChild(this.loader);

        this.letters[0]=document.createElement('span');
        this.letters[0].innerText='L';
        this.loader.appendChild(this.letters[0]);

        this.letters[1]=document.createElement('div');
        this.letters[1].className='loaderType2_loaderT1';
        this.loader.appendChild(this.letters[1]);
        this.loaderT1=new Loader(this.letters[1]);
        this.loaderT1.setInblock();
        this.loaderT1.setBorderWidth(4);
        this.loaderT1.show();

        this.letters[2]=document.createElement('span');
        this.letters[2].innerText='ADING';
        this.loader.appendChild(this.letters[2]);

        this.show();
        
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

    

}