import {Chart} from "./Chart-1.js";


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
export let borderColor_Background=Chart.getOptionsProp("background");

pickr_Background.on('init', instance => {
    pickr_Background.setColor(borderColor_Background);

})


pickr_Background.on('save', (color) => {
    borderColor_Background= color.toHEXA().toString();
})
