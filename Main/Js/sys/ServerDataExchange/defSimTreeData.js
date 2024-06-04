export let defSimTreeData=[
    {    
        id: "1",
        name: "Участок 1 - Подстанция 1",
        meters: [
            {
            id: '1',
            name: "Счетчик 1.1",
        },
        {
            id: "2",
            name: "Счетчик 1.2",
        },
        {
            id: "3",
            name: "Пример диаграммы Bar",
            chartType: "bar",
            chartData: "../Charts/Data/chartData1.json"
            
        },
        {
            id: "4",
            name: "Пример диаграммы doughnut",
            chartType: "doughnut",
            chartData: "../Charts/Data/chartData1.json"
        },
        {
            id: "5",
            name: "Пример диаграммы pie",
            chartType: "pie",
            chartData: "../Charts/Data/chartData1.json"
        }
        ],
        folders:[]
    },
    {
        id: "2",
        name: "Участок 2",
        meters: [
        {
            id: "6",
            name: "Счетчик 1",
            iconPath: "../Main/Data/3132693.png"
        }],
        folders:[
            {
                id: "3",
                name: "Подстанция 2",
                iconPath: "../Main/Data/3132693.png",
                folders:[],
                meters: [
                    {
                        id: "7",
                        name: "Счетчик 2.1"
                    },
                    {
                        id: "8",
                        name: "Счетчик 2.2"
                    }
                ]
            },
            {
                id: "4",
                name: "Дополнительно",
                folders:[],
                meters: [
                    {
                        id: "9",
                        name: "Другой потомок 3.1"
                    },
                    {
                        id: "10",
                        name: "Другой потомок 3.2"
                    }
                    ]
            }
        ]

    }
]
