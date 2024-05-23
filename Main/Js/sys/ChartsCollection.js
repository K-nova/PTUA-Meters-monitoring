import {PageElements} from "./PageElements/PageElements.js";
import {ServerDataExchange} from "./ServerDataExchange/ServerDataExchange.js";
import {locStorName, getFileSity} from "./Functions.js";
import {TrainingMessages} from "./TrainingMessages.js";

//общее управление всеми графиками
export class ChartsCollection{

    container;

    tree;
    treeLoader;
    treePlaceholder;
    treeData;
    treeTrainingMsg;

    mouseTTreeMenuWrapper;
    mouseTTreeMenuContent;

    mouseFTreeMenuWrapper;
    mouseFTreeMenuContent;
    mouseFTreeMenuEventPath={textPath:'',idPath:'',target:{},targetParent:{}, treeDataItem:{}};

    mouseMTreeMenuWrapper;
    mouseMTreeMenuContent;
    mouseMTreeMenuEventPath={textPath:'',idPath:'',target:{},targetParent:{}, treeDataItem:{}};

    addFolderPopUp;
    addFolder2PopUp;
    addMeterPopUp;

    workspace_wrapper;
    workspace_cover={};
    workspace={element:{}, contentData:{}};
    workspaceContent={};
    overviewTrainingMsg;

    wsSubheader;
    wsSubheaderText;
    wsUpButton;

    idPath=''; //путь выведеного контента рабочей области
    static FOR_CHART_PAGE_STORAGENAME='forChartPage';

    constructor(){
        //----определяем ключевые элементы экрана
        this.container=document.querySelector('.container');

        this.tree=document.querySelector('#tree');

        this.workspace_wrapper=document.querySelector('#workspace_wrapper');
        this.workspace.element=document.querySelector('#Workspace');
        this.workspace_cover=new PageElements.Cover(this.workspace_wrapper);
        this.wsSubheader=document.querySelector('#ws_subheader');
        this.wsSubheaderText=document.querySelector('.subheader_h1');
        this.wsUpButton=document.querySelector('#Subheader-button-up');

        //----определяем меню мыши
        //***общее
        this.mouseTTreeMenuWrapper=document.querySelector('#tree-mouseMenuWrapper-tree');
        this.mouseTTreeMenuContent=document.querySelectorAll('#tree-mouseMenuWrapper-tree li');
        this.treePlaceholder=document.querySelector('#tree-placeholder');
        this.treePlaceholder.addEventListener('contextmenu', ()=>{
            this.mouseFTreeMenuEventPath.target=this.treePlaceholder;
            this.mouseFTreeMenuEventPath.idPath='/';
            PageElements.createMouseContextMenu(event, this.mouseTTreeMenuWrapper);
        })
        //добавить папку
        this.addFolderPopUp=new PageElements.PopUp(this.container,this.mouseTTreeMenuContent[0]);
        //далее смотри скрипт страницы

        //***для папки
        this.mouseFTreeMenuWrapper=document.querySelector('#tree-mouseMenuWrapper-folder');
        this.mouseFTreeMenuContent=document.querySelectorAll('#tree-mouseMenuWrapper-folder li');
        //добавить счетчик 
        this.addMeterPopUp=new PageElements.PopUp(this.container,this.mouseFTreeMenuContent[0]);
        //далее смотри скрипт страницы
        //добавить папку
        this.addFolder2PopUp=new PageElements.PopUp(this.container,this.mouseFTreeMenuContent[1]);
        //далее смотри скрипт страницы
        //переименовать
        this.mouseFTreeMenuContent[2].addEventListener('click', ()=>{
            let target=this.mouseFTreeMenuEventPath.target;
            target.removeAttribute("readonly");
            target.className='tree-title-rename';
            target.onEdit=true;
            // Выделяем текст в поле ввода
            target.focus();
            target.setSelectionRange(0, target.value.length);
        })
        //удалить
        this.mouseFTreeMenuContent[3].addEventListener('click', ()=>{
            if(confirm('удалить')){
                //запрос серверу на удаление данных
                ServerDataExchange.deleteItem(this.mouseFTreeMenuEventPath.idPath);

                //cоздаем дерево и заполняем воркспейс
                this.construct();

            }
                 
        })


        //***для счетчика
        this.mouseMTreeMenuWrapper=document.querySelector('#tree-mouseMenuWrapper-meter');
        this.mouseMTreeMenuContent=document.querySelectorAll('#tree-mouseMenuWrapper-meter li');
        //*переименовать
        this.mouseMTreeMenuContent[0].addEventListener('click', ()=>{
            let target=this.mouseMTreeMenuEventPath.target;
            target.removeAttribute("readonly");
            target.className='tree-title-rename';
            target.onEdit=true;
            // Выделяем текст в поле ввода
            target.focus();
            target.setSelectionRange(0, target.value.length);
        })
        //*удалить
        this.mouseMTreeMenuContent[1].addEventListener('click', ()=>{
            if(confirm('удалить')){
                //запрос серверу на удаление данных
                ServerDataExchange.deleteItem(this.mouseMTreeMenuEventPath.idPath);

                //cоздаем дерево и заполняем воркспейс
                this.construct();

            }
                 
        })

        //----создаем дерево и заполняем воркспейс
        this.construct(true);
   
    };

    //cоздаем дерево и заполняем воркспейс
    async construct(trainingMsg=false){
        //запрос данных с сервера
        this.treeLoader=new PageElements.Loader(this.tree);
        this.treeData=await ServerDataExchange.getTreeStructureData();
        this.treeLoader.hide();
        this.#createParentData(this.treeData, this.tree, true);

        //постройка данных дерева
        this.#createTree(this.tree, this.treeData, '', 20, true);

        //ставим плейсхолдер в конце дерева
        this.tree.appendChild(this.treePlaceholder);

        //открыть экран воркспейса
        this.openByPath(this.#getPrevPath()); 

        //установить функционал кнопки "вверх"
        this.#setWsUpButtonFunc();

        //тренировочные сообщения
        if(trainingMsg){
            this.#treeTrainingMsgs();
        }

    }
    
    //функция добавления родительских данных в данные по графикам
    #createParentData=(treeData,parent, root=false)=>{
        for(let item of treeData){
            item.parent=parent;
            item.root=root;
            if('children' in item){this.#createParentData(item.children, item)};
        }
    };

    //создание структуры дерева на странице
    #createTree=(tree,data,treeInputIdSuf='', paddingLeft=20, root=false)=> {
        //удаляем предыдущие элементы если они есть
        if(root){
            let oldTreeElements=document.querySelectorAll('#tree-item-root');
            for(let oldtreeElements of oldTreeElements) {
                this.tree.removeChild(oldtreeElements);
            }
        }
    
        //---создаем элементы аккордеона
        for(let dataItem of data){

            let treeItem=document.createElement('div');
            treeItem.className='tree-item';
            if(root){treeItem.id='tree-item-root';}
            tree.appendChild(treeItem);


            //---есть вложенные элементы
            if(dataItem.type=='folder'){

                //---
                let treeInput=document.createElement('input');
                treeInput.className='tree-input';
                treeInput.type='checkbox';
                treeInput.id=`tree-input${treeInputIdSuf+'-'+dataItem.id}`;
                treeItem.appendChild(treeInput);
                treeInput.addEventListener('change',(event)=>{
                    if(event.target.checked){
                        treeExpandIcon.classList.add('opened');
                    }else{
                        treeExpandIcon.classList.remove('opened');
                    }
                    
                })

                //---
                let treeLabel=document.createElement('input');
                treeLabel.type='text';
                treeLabel.className='tree-title';
                treeLabel.setAttribute('readonly', 'true');
                treeLabel.value=dataItem.text;
                treeLabel.style.paddingLeft=`${paddingLeft}px`;
                treeItem.appendChild(treeLabel);
                treeLabel.onEdit=false;
                treeLabel.addEventListener('contextmenu', (event)=>{
                    this.mouseFTreeMenuEventPath=this.#createPath(dataItem, false);
                    this.mouseFTreeMenuEventPath.target=treeLabel;
                    this.mouseFTreeMenuEventPath.targetParent=treeItem;
                    this.mouseFTreeMenuEventPath.treeDataItem=dataItem;
                    PageElements.createMouseContextMenu(event, this.mouseFTreeMenuWrapper);
                })

                treeLabel.addEventListener('click',(event)=>{
                    if(!treeLabel.onEdit){
                        treeInput.click();
                        this.#setContent(dataItem);
                    }             
                })
                treeLabel.addEventListener('blur',(event)=>{
                    if(treeLabel.onEdit){
                        treeLabel.className='tree-title';
                        treeLabel.setAttribute('readonly', 'true');
                        treeLabel.onEdit=false;
                        let renameItemResponse=ServerDataExchange.renameItem({
                            idPath:this.mouseFTreeMenuEventPath.idPath,
                            text: treeLabel.value
                        });

                        if(renameItemResponse.err){
                            if(renameItemResponse.errDescription==ServerDataExchange.ERR_NAMEALREADYEXIST){
                                treeLabel.value=dataItem.text;
                                alert('Такое имя уже существует в данной папке!');
                            }
                        }else{
                            dataItem.text=treeLabel.value;
                        }
                        
                    }
                })

                //---
                let treeExpandIcon=document.createElement('div');
                treeExpandIcon.className='tree-expandIcon'
                treeExpandIcon.style.left=`${paddingLeft-15}px`;
                treeItem.appendChild(treeExpandIcon);
                treeExpandIcon.addEventListener('click',(event)=>{
                    treeInput.click();
                })
                
                //---
                let treeItemContent=document.createElement('div');
                treeItemContent.className='tree-content';
                treeItem.appendChild(treeItemContent);                              

                //создаем вложенный контент
                    let nextLevPaddingLeft=paddingLeft+10;
                    let nextTreeInputIdSuf =treeInputIdSuf+'-'+dataItem.id;
                    if('children' in dataItem){
                         this.#createTree(treeItemContent,dataItem.children,nextTreeInputIdSuf, nextLevPaddingLeft);
                    }
                   
            }
            //нет вложенных элементов
            else{

                let  treeButton=document.createElement('input');
                treeButton.className='tree-title';
                treeButton.setAttribute('readonly', 'true');
                treeButton.value=dataItem.text;
                treeButton.style.paddingLeft=`${paddingLeft}px`;
                treeItem.appendChild(treeButton);
                treeButton.onEdit=false;
                treeButton.addEventListener('contextmenu', (event)=>{
                    this.mouseMTreeMenuEventPath=this.#createPath(dataItem, false);
                    this.mouseMTreeMenuEventPath.target=treeButton;
                    this.mouseMTreeMenuEventPath.targetParent=treeItem;
                    this.mouseMTreeMenuEventPath.treeDataItem=dataItem;
                    PageElements.createMouseContextMenu(event, this.mouseMTreeMenuWrapper);

                })
                treeButton.addEventListener('click',(event)=>{
                    if(!treeButton.onEdit){
                        this.#setContent(dataItem);  
                    }
                })

                treeButton.addEventListener('blur',(event)=>{
                    if(treeButton.onEdit){
                        treeButton.className='tree-title';
                        treeButton.setAttribute('readonly', 'true');
                        treeButton.onEdit=false;
                        let renameItemResponse=ServerDataExchange.renameItem({
                            idPath:this.mouseMTreeMenuEventPath.idPath,
                            text: treeButton.value
                        });

                        if(renameItemResponse.err){
                            if(renameItemResponse.errDescription==ServerDataExchange.ERR_NAMEALREADYEXIST){
                                treeButton.value=dataItem.text;
                                alert('Такое имя уже существует в данной папке!');
                            }
                        }else{
                            dataItem.text=treeButton.value;
                        }
                        
                       
                    }
                })
            }
        }


    }

    //установить контент в рабочей области
    #setContent=(contentData)=>{
        //сохраняем данные содержания
        this.workspace.contentData=contentData;
        //определяем, что данные для обзора
         try{   
            let isOverview=(contentData.type=='folder');

            //загружаем обзор графиков
            if(isOverview){
                this.#setOverviewInWorkspace(contentData);
            }
            //загружаем график
            else{
                if(contentData.chartType=='line' || contentData.chartType==undefined){
                    this.#setChartInWorkspace(); 
                }else{
                    this.#setDemoChartInWorkspace(contentData.chartType);  
                }
                                      
            }

            //формируем путь в заголовке
            this.#createPath(contentData);
        }catch(err){
            this.#setErrInWorkspace(err, contentData);
            console.log(err, 'content data: ', contentData)
        }
        
 
    }

    //очистить контент
    #clearContent=()=>{
        //удаляем элементы графика со страницы
        if(this.workspaceContent.chartPage!=undefined){
            this.workspace.element.removeChild(this.workspaceContent.chartPage);
            delete this.workspaceContent.chartPage;
        }
        
        //удаляем предыдущие созданные элементы обзора
        if(this.workspaceContent.overview!=undefined){
            this.workspace.element.removeChild(this.workspaceContent.overview);
            delete this.workspaceContent.overview;
            delete this.workspaceContent.overviewButtons;
        }

        //удаляем предыдущую страницу ошибки
        if(this.workspaceContent.errScr!=undefined){
            this.workspace.element.removeChild(this.workspaceContent.errScr);
            delete this.workspaceContent.errScr;
        }

        //удаляем демонстарционные график
        if(this.workspaceContent.demoChartArea!=undefined){
            this.workspace.element.removeChild(this.workspaceContent.demoChartArea);
            delete this.workspaceContent.demoChartArea;
        }
    }

    //установить обзор графиков в рабочей области
    #setOverviewInWorkspace=(contentData)=>{
        //функция создания кнопки обзора
        let createOverviewButton=function(dataItem, img){
            //создаем кнопку
            let button=document.createElement("button");
            button.className="Overview";
            this.workspaceContent.overview.appendChild(button);
            this.workspaceContent.overviewButtons.push(button);
            button.addEventListener("click", ()=> {
                this.#setContent(dataItem) ; 
        
            });
    
            //создаем фигуру 
            let figure= document.createElement("figure");
            figure.className="Overview-figure";
            button.appendChild(figure);
    
            //подключаем рисунок
            figure.appendChild(img);
    
            //создаем текст
            let buttonText=document.createElement("figcaption");
            buttonText.className="Overview-text";
            buttonText.textContent = dataItem.text;
            figure.appendChild(buttonText);
    
        };

        //удаляем предыдущие элементы
        this.#clearContent();

        //создаем область страницы
        this.workspaceContent.overview = document.createElement("div");
        this.workspaceContent.overview.className="OverviewContainer";
        this.workspace.element.appendChild(this.workspaceContent.overview);

        //создаем внутрение объекты
        this.workspaceContent.overviewButtons=[];
        //отрисовка кнопок обзора графиков
        if('children' in contentData){
            for(let dataItem of contentData.children){
            
                //создаем рисунок
                let img=document.createElement("img");
                img.className="Overview-picture";

                //рисунок кнопки обзора -папка
                if(dataItem.type=='folder'){
                    img.src="../Main/Data/Folder.png";
                }
                //рисунок кнопки обзора -график
                else{
                    switch (dataItem.chartType) {
                        case 'line':
                            img.src="Data/line-chart-icon.png";
                            break;
                        case 'bar':
                            img.src="Data/bar-chart-icon.png";
                            break;    
                        case "pie":
                            img.src="Data/pie-chart-icon.png";
                            break;
                        case "doughnut":
                            img.src="Data/doughnut-chart-icon.png";
                            break;    
                        default:
                            img.src="Data/line-chart-icon.png";
                            break;
                    }
                    
                }

                //создаем кнопку обзора
                createOverviewButton.call(this,dataItem,img);

            }
            //------------training messages
            this.overviewTrainingMsg=new TrainingMessages('overview',[
                {target:this.workspaceContent.overviewButtons[0], text:'нажмите на одну из кнопок, чтоб перейти на страницу счетчика или в подпапку'}
                ]);

            let OTMShowCtrl=()=>{
                if(this.treeTrainingMsg!=undefined){
                    if(this.workspaceContent.overview==undefined || !this.treeTrainingMsg.trainingFinished){
                        this.overviewTrainingMsg.hide();
                    }else{
                        this.overviewTrainingMsg.show();
                    }
                }
                
            }
            
            this.overviewTrainingMsg.hide();
    
            let OTMtimeInterval=setInterval(()=>{OTMShowCtrl()},1000); 

        //если папка пуста
        }else{
            let noContentLine=document.createElement('div');
            noContentLine.className="Overview-noContentContainer";
            this.workspaceContent.overview.appendChild(noContentLine);
            
            let noContentColumn=document.createElement('div');
            noContentLine.appendChild(noContentColumn); 

            let noContentImg=document.createElement("img");
            noContentImg.className="Overview-noContentImg";
            noContentImg.src="../Main/Data/NoContent.png";
            noContentColumn.appendChild(noContentImg);   
            
            let noContentText=document.createElement('h1');
            noContentText.innerText='Папка пуста';
            noContentColumn.appendChild(noContentText);
        }

        

       
    };

    //установить график в рабочей области
    #setChartInWorkspace=function(){
        //удаляем предыдущие элементы
        this.#clearContent();
          
        //создаем область для контента
        
        this.workspaceContent.chartPage = document.createElement("object");
        this.workspaceContent.chartPage.type='text/html';
        this.workspaceContent.chartPage.data='Chart.html';
        this.workspaceContent.chartPage.className='workspace-iframe';
        this.workspace.element.appendChild(this.workspaceContent.chartPage);


        this.workspaceContent.win=this.workspaceContent.chartPage.contentWindow;
        this.workspaceContent.win.addEventListener('load', ()=> {
            this.workspaceContent.doc=this.workspaceContent.win.document;
            this.workspaceContent.bodyWrapper=this.workspaceContent.doc.querySelector('#bodyWrapper');
            this.workspaceContent.chartPage.style.height=this.workspaceContent.bodyWrapper.offsetHeight+10+'px';
        })
        
        
    };

    //установить демонстрационный график
    #setDemoChartInWorkspace=function(chartType){
        //удаляем предыдущие элементы
        this.#clearContent();

        //создаем область страницы
        this.workspaceContent.demoChartArea = document.createElement("div");
        this.workspaceContent.demoChartArea.className="OverviewContainer";
        this.workspace.element.appendChild(this.workspaceContent.demoChartArea);

        //создаем канвас для графика
        this.workspaceContent.demoChartArea.demoChartCanvas = document.createElement("canvas");
        this.workspaceContent.demoChartArea.demoChartCanvas.className="demoChartCanvas";
        this.workspaceContent.demoChartArea.appendChild(this.workspaceContent.demoChartArea.demoChartCanvas);

        //загружаем демонстрационные данные
        let basicDemoChartData=getFileSity('../Charts/Data/ChartData1.json');

        //пересобирем демонстрационные данные
        let demoChartData={
            labels:basicDemoChartData.XPoints,
            datasets:[{
                label:basicDemoChartData.Trends[0].Label,
                data:[],
                backgroundColor:[]
            }]
        }
        let i=0;
        for(let point of basicDemoChartData.Trends[0].Points){
            demoChartData.datasets[0].data[i]=point[0];
            demoChartData.datasets[0].backgroundColor[i]=point[1]
            i++;
        }
        
        //Создание и отображение диаграммы
        this.workspaceContent.demoChartArea.demoChart=
        new Chart(this.workspaceContent.demoChartArea.demoChartCanvas,{
            type: chartType, // Выбор типа графика
            data: demoChartData,
            options:{
                plugins:{
                    title:{
                        display:true,
                        text: `демонстрационный пример графика типа ${chartType}`
                    }
                }
                
            }
        });
        
    }
  
    //установить страницу ошибки в рабочей области
    #setErrInWorkspace=function(err, contentData){
        //удаляем предыдущие элементы
        this.#clearContent();

        //создаем область страницы
        this.workspaceContent.errScr = document.createElement("div");
        this.workspaceContent.errScr.className="errorScr";
        this.workspace.element.appendChild(this.workspaceContent.errScr);

        //создаем внутрение объекты
        let errTopic=document.createElement('h1');
        errTopic.textContent= 'Упс. Не получилось загрузить контент :(';
        this.workspaceContent.errScr.appendChild(errTopic);

        let errMsgDescription=document.createElement('h3');
        errMsgDescription.textContent='ошибка: ';
        this.workspaceContent.errScr.appendChild(errMsgDescription);

        let errMsg=document.createElement('div');
        errMsg.textContent=err;
        this.workspaceContent.errScr.appendChild(errMsg);

        let cdMsgDescription=document.createElement('h3');
        cdMsgDescription.textContent='content data функции setContent: ';
        this.workspaceContent.errScr.appendChild(cdMsgDescription);

        let cdMsg=document.createElement('div');
        cdMsg.textContent=contentData;
        this.workspaceContent.errScr.appendChild(cdMsg);


    }

    //сформировать путь выведеного контента рабочей области
    #createPath=function(contentData, forHeader=true){
        let result;

        //--устанавливаем начальные значения
        let wsSubheaderText=contentData.text;
        let idPath=contentData.id;
        let name=contentData.text;
        let path='';
        

        //--формируем путь
        let treeDataIteration=function(contentData){
            let parent=contentData.parent;
            if(!contentData.root){
                wsSubheaderText=parent.text+'/'+wsSubheaderText;
                idPath=parent.id+'/'+idPath;
                path=parent.text+'/'+path;
                treeDataIteration.call(this,parent);
            }
            else{
                wsSubheaderText='/'+wsSubheaderText;
                idPath='/'+idPath;
                path='/'+path;
            }
        }
  
        treeDataIteration.call(this,contentData);

        //--если функция вызывается для заголовка воркспейса
        if(forHeader){
            let forChartPageData={};

            //выводим на экрна
            this.wsSubheaderText.textContent=wsSubheaderText;

            //сохраняем в параметре класса
            this.idPath=idPath;
            forChartPageData.idPath=idPath;
            forChartPageData.name=name;
            forChartPageData.path=path;

            //сохраняем путь в локальной сессии
            sessionStorage.setItem(locStorName(ChartsCollection.FOR_CHART_PAGE_STORAGENAME),JSON.stringify(forChartPageData));
        }
        //--если нужно просто передать данные
        else{
            result={textPath:wsSubheaderText,idPath:idPath};
        }

        return result;    
    };

    //считать путь ранее открытого контента
    #getPrevPath=function(){
        //считываем путь из сессии
        let forChartPageData=JSON.parse(sessionStorage.getItem(locStorName(ChartsCollection.FOR_CHART_PAGE_STORAGENAME)));
        if(forChartPageData==undefined){
            forChartPageData={idPath:'/'+this.treeData[0].Id};
        }
        let path=forChartPageData.idPath;
        let pathIds=path.split("/");

        //убираем первую пустую запись
        pathIds.shift();
        return pathIds;
    }

    //установить контент рабочей области по пути
    openByPath=function(pathIds){
        let contentData;
        
        //функция итерации id
        let idIteration=(pathIds, treeData)=>{
            let result;

            //находим соответствующий id в 
            for(let treeDataItem of treeData){
                if(pathIds[0]==treeDataItem.id){
                    
                    //переход на один уровень вниз
                    if(pathIds.length>1){
                        pathIds.shift();
                        result=idIteration(pathIds, treeDataItem.children);
                    }
                    //возврат текущего уровня
                    else{
                        result=treeDataItem;
                    }

                    break;
                }
            }

            return result; 
        }
        
        if(Array.isArray(pathIds) && pathIds.length>0){
            //вызыываем функцию итерации
            contentData=idIteration(pathIds, this.treeData);
            
            //открываем соответсвующий экран в воркспейсе
            this.#setContent(contentData); 
        }
        
    }

    //установить функционал кнопки "вверх"
    #setWsUpButtonFunc=function(){
        this.wsUpButton.addEventListener('click',()=>{
            let pathIds=this.#getPrevPath();
            pathIds.pop();
            this.openByPath(pathIds);
        })
    }

    //тренировочные сообщения дерева
    #treeTrainingMsgs=()=>{
        this.treeTrainingMsg=new TrainingMessages('tree',[
            {target:this.tree.querySelector('.tree-item'), text:'нажмите на корневой элемент в навигационной панеле,<br>'+
            'чтобы отобразить содержание папки или перейти к данными выбранного счетчика'},
            {target:this.tree.querySelector('.tree-item'), text:'нажмите правой кнопкой мыши по элементу в навигационой панели,<br>'+
            'чтобы открыть контекстное меню где можно удалить/добавить папку или счетчик и пр.'},
            {target:this.tree.querySelector('.tree-placeholder'), text:'нажмите правой кнопкой мыши по пустому полю в навигационой панели,<br>'+
            'чтобы открыть контекстное меню где можно удалить/добавить папку'}
        ]);

        let coverShowCtrl=()=>{
            if(!this.treeTrainingMsg.trainingFinished){
                this.workspace_cover.show();
            }else{
                this.workspace_cover.hide();
            }
        }
        
        coverShowCtrl();

        let TTMtimeInterval=setInterval(()=>{coverShowCtrl()},1000); 
    
    }
        

    
}