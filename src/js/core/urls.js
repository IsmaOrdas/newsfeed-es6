let apiHost = "http://node-hnapi.herokuapp.com";

export const urls = {
    "bestStories": () => `${apiHost}/best`,
    "topStories": (page) => `${apiHost}/news?page=${page}`,
    "newStories": () => `${apiHost}/newest`,
    "item": (id) => `${apiHost}/item/${id}`
}

export const getParamFromUrl = (url, param) => {
    url = url.replace(/%5B%5D/g, "");
    url = url.replace(/[\[\]']+/g, "");
    var request = {};
    var pairs = url.substring(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < pairs.length; i++) {
        if(!pairs[i])
            continue;
        var pair = pairs[i].split('=');
        if(request[decodeURIComponent(pair[0])] === undefined){
        	request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        } else {
        	request[decodeURIComponent(pair[0])]+= ","+decodeURIComponent(pair[1]);
        }
        
     }
     if(param){
        return request[param];
     } else {
        return request;
     }
}