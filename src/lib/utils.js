
export const formatTimes = (param, noNeedTime) => {
    if (!param) {
        return '';
    }
    let date = new Date(param),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;

    const _dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    const _date = year + '-' + month + '-' + day;

    return noNeedTime ? _date : _dateTime;
};
export const textLen = (params, len) => {
    if ((params?params.length:0) > len) {
        return params.substr(0, len) + '...'
    }
    return params
};

export const strlength = (str) => {
    var len = 0;
    for (var i=0; i<str.length; i++) {
        var c = str.charCodeAt(i);
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
            len++;
        }else {
            len+=2;
        }
    }
    return len;
};

export  const handleBrowsingItemLink = (href) => {
  if(!href) return;
  let flag = false;
  let browsingItemLinkHttp = href.substr(0, 7).toLowerCase();
  let browsingItemLinkHttps = href.substr(0, 8).toLowerCase();
  if(browsingItemLinkHttp === "http://" || browsingItemLinkHttps === "https://"){
    flag = true;
  }
  if(!flag){
    return `http://${href}`;
  }else{
    return href;
  }
}
