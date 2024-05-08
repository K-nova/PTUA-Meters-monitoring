import {PageElements} from "../../Main/Js/sys/PageElements/PageElements.js";
import {TrainingMessages} from "../../Main/Js/sys/TrainingMessages.js";

import {cover, workspace_iframe} from "./Chart-1.js";

export class Chart_Config_PopUp{
    OpenSettingsPopUp;
    window;
    chartSetOCA;

    //конструктор
    constructor(){
        this.#mainConstruct();
    }

    //
    #mainConstruct=()=>{
        this.OpenSettingsPopUp=document.querySelector("#CTBB_Settings");
        //создаем Pop-up
        this.window=new PageElements.PopUp(document.body, this.OpenSettingsPopUp);

        //---------Pop-up tabs
        //присоединяем табы
        this.window.body.appendChild(document.querySelector(".pop_up_body_tabs"));

        let tabs=document.querySelectorAll(".tab");

        let CStabItems=document.querySelectorAll(".tab_item.cs");

        tabs.forEach((tab)=>{
            tab.addEventListener("click",()=>{
                let currentTab=tab;
                let tabId=currentTab.getAttribute("tab-data");
                let currentTabItem=document.querySelector(tabId);

                if(!currentTab.classList.contains('active')){
                    tabs.forEach((otherTab)=>{
                        otherTab.classList.remove('active');
                    })
                    CStabItems.forEach((tabItem)=>{
                        tabItem.classList.remove('active');
                    })
            
                    currentTab.classList.add('active');
                    currentTabItem.classList.add('active');
                }
        
            })
        })

        //присоединяем вкладки
        for(let TabItem of CStabItems){
            this.window.body.appendChild(TabItem);
        }

        //активируем первую вкладку
        tabs[0].click();

        //--------кнопки ок/отмена/применить
        this.chartSetOCA=new PageElements.OkCancelAccept(this.window.body);
        //изменение родительского экрана

        let ws_iframe_heightInit2;
        this.window.calllButton.addEventListener('click',()=>{
            if(this.window.displayed){
                ws_iframe_heightInit2=workspace_iframe.offsetHeight;
                if(workspace_iframe.offsetHeight<this.window.body.offsetHeight){
                    workspace_iframe.style.height=this.window.body.offsetHeight+20+'px';
                }
            }else{
                workspace_iframe.style.height=ws_iframe_heightInit2;
            }
        })

        let ws_iframe_backToInitHeight=()=>{
            workspace_iframe.style.height=ws_iframe_heightInit2+'px';
        }

        this.window.closeButton.addEventListener('click',()=>{
            ws_iframe_backToInitHeight();
        })

        this.chartSetOCA.ok.addEventListener("click", ()=>{
            ws_iframe_backToInitHeight();
        })

        this.chartSetOCA.cancel.addEventListener("click", ()=>{
            ws_iframe_backToInitHeight();
        })


        //------training messages Pop-up tabs
        let TrainingMessagesTS=new TrainingMessages('trendSettings',[
            {target:tabs[0], text:'Чтобы переключатся между группами настройки нажимайте соответствующие вкладки'},
            {target:this.chartSetOCA.ok, text:'Чтобы изменения вступили в силу нажмите данную кнопку. <br>Важно! Изменения применятся со всех вкладок', top:true},
            ]);

        TrainingMessagesTS.hide();

        let TMTSinterval=setInterval(()=>{
            
            if(cover.style.display=='block'){TrainingMessagesTS.hide();}
            else{
                if(this.window.displayed){
                    TrainingMessagesTS.show();
                }
                
            }

            //отключение периодического опроса, если тренировка пройдена
            if(TrainingMessagesTS.trainingFinished){
                clearInterval(TMTSinterval);
            }

        },1000);

        let CSPopUpCtrlVisibility=()=>{
            this.window.main.addEventListener('transitionend', ()=>{
                if(this.window.displayed){TrainingMessagesTS.show();  }
                else{TrainingMessagesTS.hide();}
            })
            
        }
        this.window.calllButton.addEventListener('click',()=>{
            CSPopUpCtrlVisibility();
        })

        this.window.closeButton.addEventListener('click',()=>{
            CSPopUpCtrlVisibility();
        })

        this.chartSetOCA.ok.addEventListener('click',()=>{
            CSPopUpCtrlVisibility();
        })
        this.chartSetOCA.accept.addEventListener('click',()=>{
            CSPopUpCtrlVisibility();
        })
        this.chartSetOCA.cancel.addEventListener('click',()=>{
            CSPopUpCtrlVisibility();
        })
    }
}