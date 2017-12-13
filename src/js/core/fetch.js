import { urls } from "../urls.js";
import {createEl} from "./dom-api.js";
import { articleElement } from "../components/article";

let idsList = null;

export const createRequest = (url) => {
    
    return new Request(url, {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

}
 

export const getIds = (url) => {
    console.log("getIds");

    let request = createRequest(url);
    
    fetch(request)
    .then((resp) => resp.json())
    .then((data) => data.slice(0, 10))
    .then(function (ids) {
        idsList = ids;
        console.log(idsList)

        let lista = document.createElement("ul");
        for (let i = 0; i < ids.length; i++) {
            
            getItems(urls.item(ids[i]));
                        
        }
        
    })
    .catch(function (err) {
        console.log("error");
    });
    
}


export const getItems = (url) => {

    let request = createRequest(url);

    fetch(request)
    .then((resp) => resp.json())
    .then(function (data) {
        console.log(data)
        console.log(articleElement(data))
        
        
    })
    .catch(function (err) {
        console.log("error");
    });

}