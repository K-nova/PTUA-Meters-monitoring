export let defSimTreeData=[
    {    
        id: "1",
        text: "Участок 1 - Подстанция 1",
        type: "folder",
        children: [
            {
            id: '4',
            text: "Счетчик 1.1",
            chartType: "line",
            chartData: "../Charts/Data/chartData1.json"
        },
        {
            id: "5",
            text: "Счетчик 1.2",
            chartType: "line",
            chartData: "../Charts/Data/chartData2.json"
        },
        {
            id: "1",
            text: "Пример диаграммы Bar",
            chartType: "bar",
            chartData: "../Charts/Data/chartData1.json"
            
        },
        {
            id: "2",
            text: "Пример диаграммы doughnut",
            chartType: "doughnut",
            chartData: "../Charts/Data/chartData1.json"
        },
        {
            id: "3",
            text: "Пример диаграммы pie",
            chartType: "pie",
            chartData: "../Charts/Data/chartData1.json"
        }
        ]
    },
    {
        id: "2",
        text: "Участок 2",
        type: "folder",
        children: [
        {
            id: "1",
            text: "Счетчик 1",
            iconPath: "../Main/Data/3132693.png",
            chartType: "line",
            chartData: "../Charts/Data/chartData1.json"
        },
        {
            id: "2",
            text: "Подстанция 2",
            type: "folder",
            iconPath: "../Main/Data/3132693.png",
            children: [
                {
                    id: "1",
                    text: "Счетчик 2.1"
                },
                {
                    id: "2",
                    text: "Счетчик 2.2"
                }
                ]
        },
        {
            id: "3",
            text: "Дополнительно",
            type: "folder",
            children: [
                {
                    id: "1",
                    text: "Другой потомок 3.1"
                },
                {
                    id: "2",
                    text: "Другой потомок 3.2"
                }
                ]
        }
        ]
    }
]
