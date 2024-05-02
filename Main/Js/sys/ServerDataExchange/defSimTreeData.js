export let defSimTreeData=[
    {    
        Id: "1",
        text: "Участок 1 - Подстанция 1",
        type: "folder",
        children: [
            {
            Id: '4',
            text: "Счетчик 1.1",
            ChartType: "line",
            ChartData: "../Charts/Data/ChartData1.json"
        },
        {
            Id: "5",
            text: "Счетчик 1.2",
            ChartType: "line",
            ChartData: "../Charts/Data/ChartData2.json"
        },
        {
            Id: "1",
            text: "Пример диаграммы Bar",
            ChartType: "bar",
            ChartData: "../Charts/Data/ChartData1.json"
            
        },
        {
            Id: "2",
            text: "Пример диаграммы doughnut",
            ChartType: "doughnut",
            ChartData: "../Charts/Data/ChartData1.json"
        },
        {
            Id: "3",
            text: "Пример диаграммы pie",
            ChartType: "pie",
            ChartData: "../Charts/Data/ChartData1.json"
        }
        ]
    },
    {
        Id: "2",
        text: "Участок 2",
        type: "folder",
        children: [
        {
            Id: "1",
            text: "Счетчик 1",
            IconPath: "../Main/Data/3132693.png",
            ChartType: "line",
            ChartData: "../Charts/Data/ChartData1.json"
        },
        {
            Id: "2",
            text: "Подстанция 2",
            type: "folder",
            IconPath: "../Main/Data/3132693.png",
            children: [
                {
                    Id: "1",
                    text: "Счетчик 2.1"
                },
                {
                    Id: "2",
                    text: "Счетчик 2.2"
                }
                ]
        },
        {
            Id: "3",
            text: "Дополнительно",
            type: "folder",
            children: [
                {
                    Id: "1",
                    text: "Другой потомок 3.1"
                },
                {
                    Id: "2",
                    text: "Другой потомок 3.2"
                }
                ]
        }
        ]
    }
]
