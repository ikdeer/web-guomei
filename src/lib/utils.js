
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