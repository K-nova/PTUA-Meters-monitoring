//параметры по умолчанию
export let DefaultPar= {
    trend:{
        yAxisID: 'y',
        hidden:false,
        stepped:false,
        pointStyle: 'circle',
        borderWidth: 2,
        borderColor: [
            'red',
            'blue',
            'green',
            'Maroon',
            'Lime',
            'Navy',
            'Purple',
            'Olive',
            'Teal',
            'Fuchsia',
            'Yellow',
            'Aqua',
            'Gray',
            'Black',
            'White'
        ],
        backgroundColor: [
            'rgba(255, 0, 0, 0.5)',
            'rgba(0, 0, 255, 0.5)',
            'rgba(0, 128, 0, 0.5)',
            'rgba(128, 0, 0, .5)',
            'rgba(0, 255, 0, .5)',
            'rgba(0, 0, 128, .5)',
            'rgba(128, 0, 128, .5)',
            'rgba(128, 128, 0, .5)',
            'rgba(0, 128, 128, .5)',
            'rgba(255, 0, 255, .5)',
            'rgba(255, 255, 0, .5)',
            'rgba(0, 255, 255, .5)',
            'rgba(128, 128, 128, .5)',
            'rgba(0, 0, 0, .5)',
            'rgba(255, 255, 255, .5)'
        ],
        fill: false,
        tension: 0.2
    },
    options:{
        background:[
            'Ivory',
            'Honeydew',
            'Azure',
            'GhostWhite',
            'Seashell',
            'Beige',
            'AntiqueWhite',
            'LavenderBlush',
            'MistyRose',
            'White'
        ],
        scales:{
            x:{
                timeRangeSelector: 1,//дополнительно
                timeRangeItemSelect: 60000,//дополнительно
                timeRangeInput: 2,//дополнительно
                type: 'time',
                time: {
                    tooltipFormat: 'dd.MM.yyyy HH:mm:ss',
                    displayFormats: {
                        second: 'dd.MM.yyyy \nHH:mm:ss',
                        minute: 'dd.MM.yyyy \nHH:mm:ss',
                        hour:'dd.MM.yyyy \nHH:mm:ss',
                        day:'dd.MM.yyyy'
                    }
                  },
                min:'2024-01-01T00:00:00', 
                max:'2024-02-01T00:00:00',
                ticks:{
                    autoSkip: true,                       
                    autoSkipPadding: 50,
                    maxRotation: 0,
                    minRotation:0,
                    color: [
                        '#0c2340',
                        'Black',
                        'DarkRed',
                        'Indigo',
                        'DarkGreen',
                        'MidnightBlue',
                        'DarkSlateGrey',
                        '#d0d0ce',
                        '#b1b3b3',
                        '#97999B',
                        'Gray'
                    ]
                },
                border:{
                    color: [
                        '#0c2340',
                        'Black',
                        'DarkRed',
                        'Indigo',
                        'DarkGreen',
                        'MidnightBlue',
                        'DarkSlateGrey',
                        '#d0d0ce',
                        '#b1b3b3',
                        '#97999B',
                        'Gray'
                    ],
                    width: 1
                },
                grid:{
                    color: [
                        '#d0d0ce',
                        '#b1b3b3',
                        '#97999B',
                        'Gray',
                        '#0c2340',
                        'Black',
                        'DarkRed',
                        'Indigo',
                        'DarkGreen',
                        'MidnightBlue',
                        'DarkSlateGrey'
                    ],
                    lineWidth: 1
                }
            },
            y:{name:'y',
                min:0, 
                max:110,
                position: 'left',
                title:{
                    display:true,
                    text:'',
                },
                ticks:{
                    autoSkip: true,
                    maxRotation: 0,
                    minRotation:0,
                    color: [
                        '#0c2340',
                        'Black',
                        'DarkRed',
                        'Indigo',
                        'DarkGreen',
                        'MidnightBlue',
                        'DarkSlateGrey',
                        '#d0d0ce',
                        '#b1b3b3',
                        '#97999B',
                        'Gray'
                    ]
                },
                border:{
                    color: [
                        '#0c2340',
                        'Black',
                        'DarkRed',
                        'Indigo',
                        'DarkGreen',
                        'MidnightBlue',
                        'DarkSlateGrey',
                        '#d0d0ce',
                        '#b1b3b3',
                        '#97999B',
                        'Gray'
                    ],
                    width: 1
                },
                grid:{
                    color: [
                        '#d0d0ce',
                        '#b1b3b3',
                        '#97999B',
                        'Gray',
                        '#0c2340',
                        'Black',
                        'DarkRed',
                        'Indigo',
                        'DarkGreen',
                        'MidnightBlue',
                        'DarkSlateGrey'
                    ],
                    lineWidth: 1
                }
            },
            y1:{name:'y1'},
            y2:{name:'y2'}
        },
        animation:{
            duration:500,
            easing: 'linear'
        },
        plugins:{
            legend:{
                display: false,
                position:'top',
                labels:{
                    usePointStyle: true,
                }
            },
            zoom:{
                pan:{
                    enabled:true,
                    mode: 'xy'
                },
                zoom:{
                    mode: 'x',
                    wheel:{
                        enabled:true,
                    }

                }
                
            },

        }   
    }
}