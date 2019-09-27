import EXIF from 'exif-js'
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
};

//base64方法
export const base64 = (file,callback) =>{
    EXIF.getData(file, function () {
        var Orientation = EXIF.getTag(this, "Orientation");
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
            if (Orientation == 1) {
                console.log("图片无需处理");
            } else {
                var uploadBase64 = new Image();
                uploadBase64.src = e.target.result;

                uploadBase64.onload = function() {
                    //修正旋转图片
                    var expectWidth = uploadBase64.width;
                    var expectHeight = uploadBase64.height;

                    var canvas = document.createElement("canvas"),
                        ctx = canvas.getContext("2d");
                    canvas.width = expectWidth;
                    canvas.height = expectHeight;

                    ctx.drawImage(uploadBase64, 0, 0, expectWidth, expectHeight);
                    var base64 = null;

                    if (Orientation !== "" && Orientation != 1) {
                        switch (Orientation) {
                            case 6:
                                console.log("顺时针旋转270度");
                                rotateImg(uploadBase64, "left", canvas);
                                break;
                            case 8:
                                console.log("顺时针旋转90度");
                                rotateImg(uploadBase64, "right", canvas);
                                break;
                            case 3:
                                console.log("顺时针旋转180度");
                                rotateImg(uploadBase64, "horizen", canvas);
                                break;
                        }
                        //输出转换后的base64图片
                        base64 = canvas.toDataURL(file.type, 1);
                        callback(base64);
                    }
                };
            }
        };
    });
    //对图片旋转处理
    const rotateImg = (img, direction, canvas) => {
        console.log("开始旋转图片");
        //图片旋转4次后回到原方向
        if (img != null){
            var height = img.height;
            var width = img.width;
            var step = 2;

            if (direction == "right") {
                step++;
            } else if (direction == "left") {
                step--;
            } else if (direction == "horizen") {
                step = 2; //不处理
            }
            //旋转角度以弧度值为参数
            var degree = step * 90 * Math.PI / 180;
            var ctx = canvas.getContext("2d");
            switch (step) {
                case 0:
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0);
                    break;
                case 1:
                    canvas.width = height;
                    canvas.height = width;
                    ctx.rotate(degree);
                    ctx.drawImage(img, 0, -height);
                    break;
                case 2:
                    canvas.width = width;
                    canvas.height = height;
                    ctx.rotate(degree);
                    ctx.drawImage(img, -width, -height);
                    break;
                case 3:
                    canvas.width = height;
                    canvas.height = width;
                    ctx.rotate(degree);
                    ctx.drawImage(img, -width, 0);
                    break;
            }
            console.log("结束旋转图片");
        }
    }
};

