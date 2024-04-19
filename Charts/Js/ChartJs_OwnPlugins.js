var yScaleLegendsPlugin={
    id:'yScaleLegendsPlugin',
    beforeDraw: (chart, args, options) => {
        //инициализирующие действия
        let {canvas, ctx, scales} = chart;
        let {legendItems}=chart.legend;
        let {trends}=options;
        const LABEL_WIDGTH=30;
        const LABEL_HEIGHT=20;
        ctx.save();

        //формируем объекты 
        //определяем все оси значений
        for(let [scaleName,scale] of Object.entries(scales)){
            if(scaleName!='x'){
                
                let hOffset=0
                let i=0;

                //определяем все легенды
                for(let [legendIName,legendI] of Object.entries(legendItems)){

                    //перераспределяем легенды по осям
                    if(trends[i].yAxisID==scaleName){

                        //определяем отрисовывается ли тренд, а следовательно и легенда
                        if(!trends[i].hidden){
                            //----строим описание легенды
                            //определяем координаты прямогульника
                            let rectX =scale.right-LABEL_WIDGTH-20;
                            let rectY =scale.top+scale.height-hOffset;

                            //создаем границы прямоугольника
                            ctx.strokeStyle = legendI.strokeStyle;
                            ctx.lineWidth = legendI.lineWidth;
                            ctx.strokeRect(rectX, rectY, LABEL_WIDGTH, LABEL_HEIGHT);

                            //заливаем прямоугольник
                            ctx.fillStyle = legendI.fillStyle;
                            ctx.fillRect(rectX, rectY, LABEL_WIDGTH, LABEL_HEIGHT);
                            hOffset+=LABEL_HEIGHT+5;

                            //----добавляем всплывающую метку
                            let tooltip;
                            tooltip=document.getElementById(`chartYscaleTooltip_${trends[i].name}`);
                            if(tooltip==null){
                                tooltip=document.createElement("div");
                                tooltip.id=`chartYscaleTooltip_${trends[i].name}`;
                                tooltip.style.position = 'absolute';
                                tooltip.style.display = 'none';
                                tooltip.style.backgroundColor = 'white';
                                tooltip.style.border = '1px solid #ccc';
                                tooltip.textContent = legendI.text;
                                canvas.parentNode.appendChild(tooltip);
                            }

                            canvas.addEventListener('mousemove', function(event) {
                                // Проверяем, находится ли курсор мыши над прямоугольником
                                let rect = canvas.getBoundingClientRect();
                                let x = event.clientX - rect.left;
                                let y = event.clientY - rect.top;
                                if (x >= rectX && x <= rectX + LABEL_WIDGTH && y >= rectY && y <= rectY + LABEL_HEIGHT) {
                                    // Показываем подсказку рядом с курсором мыши
                                    tooltip.style.display = 'block';
                                    tooltip.style.left = (event.clientX + 10) + 'px';
                                    tooltip.style.top = (event.clientY + 10) + 'px';
                                } else {
                                    // Скрываем подсказку, если курсор мыши не над объектом
                                    tooltip.style.display = 'none';
                                }

                            });
                        }
                        
                             
                    }
                    i++;
                    
                }
                
            }
            
        }

        
        
        //
        ctx.restore();
    },

}