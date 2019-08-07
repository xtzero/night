import axios from 'axios'

const apiPre = 'http://nightapi.xtzero.me/index.php/'
// const apiPre = 'http://localhost:1187/index.php/'
export function ajax(url, params) {
    let _url = []
    for(const i in params) {
        _url.push(i + '=' + params[i])
    }
    const sendUrl = apiPre + url + '?' + _url.join('&')

    return axios.get(sendUrl)
}

export function rand(minNum, maxNum) {
    return parseInt(Math.random() * ( maxNum - minNum + 1 ) + minNum, 10);
}

export function formatTime(nums, full) {
    var time = (new Date(nums).getTime())/1000
    var unixTimestamp = new Date(time * 1000);
    //精确到秒的 时间戳时间获取
    var year = unixTimestamp.getFullYear();
    var mon = unixTimestamp.getMonth() + 1;
    var day = unixTimestamp.getDate();
    var hour = unixTimestamp.getHours();
    var mins = unixTimestamp.getMinutes();
    if(full == true) { //显示完全模式
        if(mins >= 0 && mins <= 9) {
            mins = "" + "0" + mins;
        }
        return year + '-' + mon + '-' + day + ' ' + hour + ':' + mins;
    }
    //系统时间匹配
    var curTime = new Date();
    //年份
    if(year == curTime.getFullYear()) {
        //今年
        year = "";
    } else if(year == curTime.getFullYear() - 1) {
        year = "去年 ";
    } else {
        year += '年';
    }
    //月份，当前月不显示 不是当前月显示1月 2月
    if(mon == curTime.getMonth() + 1) { //是这个月
        mon = "";
    } else {
        mon += "月";
    }
    //系统匹配几号	如果是今天则显示今天 不是显示 本月1号 本月2号 如果是昨天就显示昨天
    if(day == curTime.getDate()) { //是今天
        day = "今天 ";
    } else if(day == curTime.getDate() - 1) {
        day = "昨天";
    } else {
        if(mon == "") {
            mon = "本月 ";
        }
        day += "号 ";
    }
    //匹配小时
    if(hour < 10) {
        hour = "0" + hour;
    }
    //匹配分钟
    if(mins < 10) {
        mins = "0" + mins;
    }
    //系统显示时间
    return year + mon + day + hour + ":" + mins;
}