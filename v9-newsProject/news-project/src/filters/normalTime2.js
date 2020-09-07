export const  normalTime2=(time)=>{
    if(time){
        var oData=new Date();
        oData.setTime(time);
        var y=oData.getFullYear();
        var m=oData.getMonth()+1;
        var d=oData.getDay();
        var h=oData.getHours();
        var min=oData.getMinutes();
        var s=oData.getSeconds();
        return y+'-'+m+'-'+d+' '+0+':'+0+':'+61;
    }

}