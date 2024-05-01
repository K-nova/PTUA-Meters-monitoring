export let OkCancelAccept=class{
    parent;
    wrapper;
    accept;
    ok;
    cancel

    constructor(parent){
        this.parent=parent

        this.wrapper=document.createElement('div');
        this.wrapper.className='okCancelAccept';
        this.parent.appendChild(this.wrapper);

        this.accept=document.createElement('button');
        this.accept.className='okCancelAccept_button';
        this.accept.innerText='Применить';
        this.wrapper.appendChild(this.accept);

        this.cancel=document.createElement('button');
        this.cancel.className='okCancelAccept_button';
        this.cancel.innerText='Отмена';
        this.wrapper.appendChild(this.cancel);

        this.ok=document.createElement('button');
        this.ok.className='okCancelAccept_button';
        this.ok.innerText='OK';
        this.wrapper.appendChild(this.ok);

    }

    hide=(buttonName='ok')=>{
        try{
            this[buttonName].style.display='none';
        }catch(err){console.log(err)}
    }

    show=(buttonName='ok')=>{
        try{
            this[buttonName].style.display='block';
        }catch(err){console.log(err)}
    }
}