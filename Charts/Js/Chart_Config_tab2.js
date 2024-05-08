import {Chart} from "./Chart-1.js";

//Singleton класс
export class Chart_Config_tab2{
    borderColor_Background;
    
    //конструктор
    constructor(){
        if(typeof Chart_Config_tab2.instance==='object'){return Chart_Config_tab2.instance;}
        Chart_Config_tab2.instance=this;
        this.#mainConstruct();
        return this;
    }

    //
    #mainConstruct=()=>{
        //---------элемент цвета тренда
        const pickr_Background = Pickr.create({
            el: '#color-picker_Background',
            theme: 'classic', // or 'monolith', or 'nano'

            swatches: Chart.defaultPar.options.background,

            components: {

                // Main components
                preview: true,
                opacity: true,
                hue: true,

                // Input / output Options
                interaction: {
                    hex: true,
                    rgba: true,
                    hsla: false,
                    hsva: false,
                    cmyk: false,
                    input: true,
                    clear: true,
                    save: true
                }
            }
        });

        //добавляем логику выбора цвета
        this.borderColor_Background=Chart.getOptionsProp("background");

        pickr_Background.on('init', instance => {
            pickr_Background.setColor(this.borderColor_Background);

        })


        pickr_Background.on('save', (color) => {
            this.borderColor_Background= color.toHEXA().toString();
        })
    }
}


