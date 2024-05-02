export let Cover=class{
    parent={};
    body={};

    showed=false;

    constructor(parent){
        this.parent=parent;

        this.body=document.createElement('div');
        this.body.className='cover';
        this.parent.appendChild(this.body);
    }
    
    show=()=>{
        let paretnRect= this.parent.getBoundingClientRect();
        this.body.style.top=`${paretnRect.top}px`;
        this.body.style.display='block';
        this.showed=true;
    };

    hide=()=>{
        this.body.style.display='none';
        this.showed=false;
    }
}