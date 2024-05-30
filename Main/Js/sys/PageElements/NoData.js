export let NoData=class{
    parent={};
    body={};
    noContentImg={};
    noContentText={}

    constructor(parent, text='нет данных'){
        this.parent=parent;

        this.body=document.createElement('div');
        this.body.style.display='none';
        this.parent.appendChild(this.body);

        this.noContentImg=document.createElement("img");
        this.noContentImg.style.width='100%';
        this.noContentImg.src="../Main/Data/NoContent.png";
        this.body.appendChild(this.noContentImg); 

        this.noContentText=document.createElement('h1');
        this.noContentText.style.textAlign='center';
        this.noContentText.innerText=text;
        this.body.appendChild( this.noContentText);
    }

    show=()=>{
        this.body.style.display='block';
    }

    hide=()=>{
        this.body.style.display='none';
    }
}