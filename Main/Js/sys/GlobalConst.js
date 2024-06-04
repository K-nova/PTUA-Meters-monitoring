//глобальные переменные
const projectId='PTUA_MeterMon';
export const LocSessionName2="ChartProperies";
export const LocSessionName3="LastChartDataPath";
export const LocSessionName4="ChartPageDataArr";
export const trendSetpoints=[
    {name:"I_L1", label:'Ток фазы L1', yAxisID:'y'},
    {name:"I_L2", label:'Ток фазы L2', yAxisID:'y'},
    {name:"I_L3", label:'Ток фазы L3', yAxisID:'y'},
    {name:"U_L1", label:'Напряжение фазы L1', yAxisID:'y1'},
    {name:"U_L2", label:'Напряжение фазы L2', yAxisID:'y1'},
    {name:"U_L3", label:'Напряжение фазы L3', yAxisID:'y1'},
    {name:"U_L1L2", label:'Линейное напряжение L1 L2', yAxisID:'y1'},
    {name:"U_L1L3", label:'Линейное напряжение L1 L3', yAxisID:'y1'},
    {name:"U_L2L3", label:'Линейное напряжение L2 L3', yAxisID:'y1'},
    {name:"P", label:'Активная мощность всех фаз', yAxisID:'y2'},
    {name:"P_L1", label:'Активная мощность фазы L1', yAxisID:'y2'},
    {name:"P_L2", label:'Активная мощность фазы L2', yAxisID:'y2'},
    {name:"P_L3", label:'Активная мощность фазы L3', yAxisID:'y2'},
    {name:"S", label:'Полная мощность всех фаз', yAxisID:'y3'},
    {name:"S_L1", label:'Полная мощность фазы L1', yAxisID:'y3'},
    {name:"S_L2", label:'Полная мощность фазы L2', yAxisID:'y3'},
    {name:"S_L3", label:'Полная мощность фазы L3', yAxisID:'y3'},
    {name:"Q", label:'Реактивная мощность всех фаз', yAxisID:'y4'},
    {name:"Q_L1", label:'Реактивная мощность фазы L1', yAxisID:'y4'},
    {name:"Q_L2", label:'Реактивная мощность фазы L2', yAxisID:'y4'},
    {name:"Q_L3", label:'Реактивная мощность фазы L3', yAxisID:'y4'},
    {name:"f", label:'Частота', yAxisID:'y5'},
    {name:"cosf", label:'Равнодействующий для всех фаз cos φ', yAxisID:'y6'},
    {name:"cosf_L1", label:'cos φ фазы L1', yAxisID:'y6'},
    {name:"cosf_L2", label:'cos φ фазы L2', yAxisID:'y6'},
    {name:"cosf_L3", label:'cos φ фазы L3', yAxisID:'y6'}
];
export const meterSetting={
    exchangeTimeType: "1000",
    exchangeTimeValue: '5',
    ip:'10.0.0.0',
    rs485_adress: "1",
    rs_port: "0",
    rs_type: "0",
    dataExchange:[
        {name: "de0", active: true, label: trendSetpoints[0].label, obisCode: "31.7.0"},
        {name: "de1", active: true, label: trendSetpoints[1].label, obisCode: "51.7.0"},
        {name: "de2", active: true, label: trendSetpoints[2].label, obisCode: "71.7.0"},
        {name: "de3", active: true, label: trendSetpoints[3].label, obisCode: "32.7.0"},
        {name: "de4", active: true, label: trendSetpoints[4].label, obisCode: "52.7.0"},
        {name: "de5", active: true, label: trendSetpoints[5].label, obisCode: "72.7.0"},
        {name: "de6", active: true, label: trendSetpoints[6].label, obisCode: "12.7.1"},
        {name: "de7", active: true, label: trendSetpoints[7].label, obisCode: "12.7.2"},
        {name: "de8", active: true, label: trendSetpoints[8].label, obisCode: "12.7.3"},
        {name: "de9", active: true, label: trendSetpoints[9].label, obisCode: "1.7.0"},
        {name: "de10", active: true, label: trendSetpoints[10].label, obisCode: "21.7.0"},
        {name: "de11", active: true, label: trendSetpoints[11].label, obisCode: "41.7.0"},
        {name: "de12", active: true, label: trendSetpoints[12].label, obisCode: "61.7.0"},
        {name: "de13", active: true, label: trendSetpoints[13].label, obisCode: "9.7.0"},
        {name: "de14", active: true, label: trendSetpoints[14].label, obisCode: "29.7.0"},
        {name: "de15", active: true, label: trendSetpoints[15].label, obisCode: "49.7.0"},
        {name: "de16", active: true, label: trendSetpoints[16].label, obisCode: "69.7.0"},
        {name: "de17", active: true, label: trendSetpoints[17].label, obisCode: "3.7.0"},
        {name: "de18", active: true, label: trendSetpoints[18].label, obisCode: "23.7.0"},
        {name: "de19", active: true, label: trendSetpoints[19].label, obisCode: "43.7.0"},
        {name: "de20", active: true, label: trendSetpoints[20].label, obisCode: "63.7.0"},
        {name: "de21", active: true, label: trendSetpoints[21].label, obisCode: "14.7.0"},
        {name: "de22", active: true, label: trendSetpoints[22].label, obisCode: "13.7.0"},
        {name: "de23", active: true, label: trendSetpoints[23].label, obisCode: "33.7.0"},
        {name: "de24", active: true, label: trendSetpoints[24].label, obisCode: "53.7.0"},
        {name: "de25", active: true, label: trendSetpoints[25].label, obisCode: "73.7.0"}
    ]
};