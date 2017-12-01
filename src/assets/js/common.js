/**
 * Created by Administrator on 2017/6/12 0012.
 */

var api = {
    cookie: {
        set: function (objName, objValue, objHours) {
            var str = objName + "=" + escape(objValue);
            if (objHours > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失
                var date = new Date();
                var ms = objHours * 3600 * 1000;
                date.setTime(date.getTime() + ms);
                str += "; expires=" + date.toGMTString() + "; path=/";
            }
            document.cookie = str;
        },
        get: function (objName) {
            var arrStr = document.cookie.split("; ");
            for (var i = 0; i < arrStr.length; i++) {
                var temp = arrStr[i].split("=");
                if (temp[0] == objName)
                    return unescape(temp[1]);
            }
        },
        // cookie 删除失效
        del: function (name) {
            var date = new Date();
            date.setTime(date.getTime() - 10000);
            document.cookie = name + "=a; expires=" + date.toGMTString() + "; path=/";
        },
        getItem: function (name, item) {
            var json = eval("(" + this.get(name) + ")");
            return json[item];
        }
    },
    copyObj: (obj) => {
        var result = {};
        for (var i in obj) {
            result[i] = obj[i];
        }
        ;

        return result
    },
    delay: (func, second) => {
        setTimeout(func, second * 1000)
    },
    strAdd: (ostr, str) => {
        return ostr ? ostr + str : '';

    },
    addParameter: (obj,addObj) =>{
        for(var i in addObj){
            obj[i] = addObj[i];
        };
        return obj;
    }
};

export default api;
