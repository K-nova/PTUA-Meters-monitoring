import {StorageCtrl} from "../Js/sys/StorageCtrl.js";

let i=0;
let slideshowItems=document.querySelectorAll('.slideshow-item');
slideshowItems[i].classList.add('active');

let passedSteps=StorageCtrl.getItem('slideShow_passedSteps',{isJSON:false});
if(passedSteps==undefined){passedSteps=false;}

//кнопка далее
let slideshowButtons=document.querySelectorAll('.slideshow-item-button');

let slideshowButtonELF=()=>{
        slideshowItems[i].classList.remove('active');
    i++;
    if(i<slideshowItems.length){
        slideshowItems[i].classList.add('active');
        slideshowButtons[i].addEventListener('click',()=>{slideshowButtonELF()});
    }else{
        StorageCtrl.setItem('slideShow_passedSteps', true, {isJSON:false});

        let Main=window.parent.document.querySelector('#Main');
        Main.data='Charts/Charts-main.html';
    }
}

slideshowButtons[i].addEventListener('click',()=>{slideshowButtonELF()});

//кнопка старт
let slideshowButtonFs=document.querySelectorAll('.slideshow-item-buttonF');

for(let slideshowButtonF of slideshowButtonFs){
    if(passedSteps){
        slideshowButtonF.classList.add('active');
    }
    slideshowButtonF.addEventListener('click',()=>{

        let Main=window.parent.document.querySelector('#Main');
        Main.data='Charts/Charts-main.html';
    
    });
}