export let Accordion=class{
    parent={};
    item={};

    header={};
    ctrlElement={};
    label={};
    expandIcon={};
    labelAdditional={};

    content={};

    constructor(parent, id, text){
        this.parent=parent;

        //создание объектов
        this.item=document.createElement('div');
        this.item.className='accordion_item';
        this.item.id=id;
        this.parent.appendChild(this.item);

        this.header=document.createElement('div');
        this.header.className='accordion_header';
        this.item.appendChild(this.header);

        this.ctrlElement=document.createElement('input');
        this.ctrlElement.type='checkbox';
        this.ctrlElement.className='accordion_ctrlElement';
        let checkBoxId=id+'_ctrlElement';
        this.ctrlElement.id=checkBoxId;
        this.header.appendChild(this.ctrlElement);

        this.label=document.createElement('label');
        this.label.htmlFor=checkBoxId;
        this.label.className='accordion_label';
        this.label.innerText=text;
        this.header.appendChild(this.label);

        this.expandIcon=document.createElement('div');
        this.expandIcon.className='accordion_expandIcon';
        this.header.appendChild(this.expandIcon);

        this.labelAdditional=document.createElement('div');
        this.header.appendChild(this.labelAdditional);

        this.content=document.createElement('div');
        this.content.className='accordion_content';
        this.item.appendChild(this.content);

        //добавление логики
        this.label.addEventListener('click',()=>{
            if(!this.ctrlElement.checked){
                this.content.style.display='block';
            }else{
                this.content.style.display='none'
            }
        })
    }
}