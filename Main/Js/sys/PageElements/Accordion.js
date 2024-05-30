export let Accordion=class{
    parent={};
    item={};

    header={};
    ctrlElement={};
    label={};

    expandIcon={};
    labelAdditional={};
    labelAsInput=false;
    content={};

    //если текст аккордиона - input
    onEdit=false;
    
    constructor(parent, id, text, labelAsInput=false){
        this.parent=parent;

        //создание объектов
        //----
        this.item=document.createElement('div');
        this.item.className='accordion_item';
        this.item.id=id;
        this.parent.appendChild(this.item);

        //----
        this.header=document.createElement('div');
        this.header.className='accordion_header';
        this.item.appendChild(this.header);

        //----
        this.ctrlElement=document.createElement('input');
        this.ctrlElement.type='checkbox';
        this.ctrlElement.className='accordion_ctrlElement';
        let checkBoxId=id+'_ctrlElement';
        this.ctrlElement.id=checkBoxId;
        this.header.appendChild(this.ctrlElement);

        //----
        if(!labelAsInput){
            this.label=document.createElement('label');
            this.label.htmlFor=checkBoxId;
            this.label.className='accordion_label';
            this.label.innerText=text;
        }else{
            this.labelAsInput=true;
            this.label=document.createElement('input');
            this.label.type='text';
            this.label.className='accordion_label';
            this.label.setAttribute('readonly', 'true');
            this.label.value=text;
        }
        this.header.appendChild(this.label);

        this.label.addEventListener('click',()=>{
            if(!this.labelAsInput ||(this.labelAsInput && !this.onEdit)){
                if(!this.ctrlElement.checked){
                    this.content.style.display='block';
                    if(this.labelAsInput){this.ctrlElement.checked=true;}
                }else{
                    this.content.style.display='none'
                    if(this.labelAsInput){this.ctrlElement.checked=false;}
                }
            }
            
        })
        
        //----
        this.expandIcon=document.createElement('div');
        this.expandIcon.className='accordion_expandIcon';
        this.header.appendChild(this.expandIcon);
        this.expandIcon.addEventListener('click',()=>{
            this.label.click();
        })

        //----
        this.labelAdditional=document.createElement('div');
        this.header.appendChild(this.labelAdditional);

        //----
        this.content=document.createElement('div');
        this.content.className='accordion_content';
        this.item.appendChild(this.content);


        
    }

    editingOn=()=>{
        if(this.labelAsInput){
            this.onEdit=true;
            this.label.classList.add('onEdit');
            this.label.removeAttribute("readonly");
            this.label.focus();
            this.label.setSelectionRange(0, this.label.value.length);
        }
    }

    editingOff=()=>{
        if(this.labelAsInput){
            this.onEdit=false;
            this.label.classList.remove('onEdit');
            this.label.setAttribute('readonly', 'true');
        }
    }

}