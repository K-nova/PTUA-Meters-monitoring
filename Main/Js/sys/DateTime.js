//модуль времени
export let DateTime={
    GetCurrentTimeString:function (){
        let now = new Date();
        let hours = now.getHours().toString().padStart(2, '0');
        let minutes = now.getMinutes().toString().padStart(2, '0');
        let seconds = now.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    },

    ToString:function(Date, ShowSeconds=true){
        let day=Date.getDate().toString().padStart(2, '0');
        let month=Date.getMonth().toString().padStart(2, '0');
        let year=Date.getFullYear().toString();

        let hours = Date.getHours().toString().padStart(2, '0');
        let minutes = Date.getMinutes().toString().padStart(2, '0');
        let seconds = Date.getSeconds().toString().padStart(2, '0');
        let result;
        if(!ShowSeconds){
            result=`${day}.${month}.${year} ${hours}:${minutes}`;
        }else{
            result=`${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
        }
        return result;
    },

    //переделываем строку времени в строку времени для конструкции типа данных Date (DCS-Date construct string)
    StringToDCS(StringDate){
        let DateTimeArr=StringDate.split(', ');
        let DateArr=DateTimeArr[0].split('.');
        let TimeArr=DateTimeArr[1].split(':');
        let result=`${DateArr[2]}-${DateArr[1]}-${DateArr[0]}T${TimeArr[0]}:${TimeArr[1]}:${TimeArr[2]}`;
        return result;
    },

    StringDate:function(StringDate){
        let result=new Date(this.StringToDCS(StringDate));
        return result;
    },

    DateToDCS:function(Date){
        let day=Date.getDate().toString().padStart(2, '0');

        let month=Date.getMonth(); //0-11
        month++;
        month=month.toString().padStart(2, '0');

        let year=Date.getFullYear().toString();

        let hours = Date.getHours().toString().padStart(2, '0');
        let minutes = Date.getMinutes().toString().padStart(2, '0');
        let seconds = Date.getSeconds().toString().padStart(2, '0');
        let result;
        
        result=`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        return result;
    },

}