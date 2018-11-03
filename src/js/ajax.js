function ajax(opt) {
    var json = opt;
    var url = json.url;
    if (!url) {
        return;
    }
    var type = json.type || 'get';
    var data = json.data || {};
    var async = json.async === false ? json.async : true;
    var arr = [];
    for (var i in data) {
        arr.push(i + '=' + encodeURIComponent(data[i]))
    }
    var params = arr.join("&"); //序列化的字符串
    var as = new XMLHttpRequest();
    as.onreadystatechange = function() {
        if (as.readyState === 4 && as.status === 200) {
            try {
                typeof json.success === 'function' && json.success(JSON.parse(as.responseText))
            } catch (e) {
                typeof json.success === 'function' && json.success(as.responseText);
            }
        }
    }
    switch (type.toUpperCase()) {
        case 'GET':
            url = json.data ? url + '?' + params : url;
            as.open(type, url, async);
            as.send();
            break;
        case 'POST':
            as.open(type, url, async);
            as.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            as.send(params);
            break;
    }
}