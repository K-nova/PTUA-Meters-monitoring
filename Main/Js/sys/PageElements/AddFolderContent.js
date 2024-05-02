import {PageElements} from "./PageElements.js";

export let AddFolderContent=class{
    addFolderPopUpWrapper;

    popUpArea;
    popUpAreaTopic;

    addFolderNameInput;
    okCancelAccept;

    constructor(parent){
        this.addFolderPopUpWrapper=document.createElement('div');
        parent.appendChild(this.addFolderPopUpWrapper);

        this.popUpArea=document.createElement('div');
        this.popUpArea.className='tab_item_area';
        this.addFolderPopUpWrapper.appendChild( this.popUpArea);

        this.popUpAreaTopic=document.createElement('h3');
        this.popUpAreaTopic.className='tab_item_area_topic';
        this.popUpAreaTopic.innerText='Имя новой папки';
        this.popUpArea.appendChild(this.popUpAreaTopic);

        this.addFolderNameInput=document.createElement('input');
        this.addFolderNameInput.type='text';
        this.addFolderNameInput.placeholder='Папка1';
        this.popUpArea.appendChild(this.addFolderNameInput);

        this.okCancelAccept=new PageElements.OkCancelAccept(this.addFolderPopUpWrapper);
        this.okCancelAccept.hide('accept');
    }
    
}