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

    let request = createRequest(url);
    
    fetch(request)
    .then((response) => {

        if (response.status !== 200) {
            console.log("There was an error: " + response.status)
            return; 
        } 

        response.json()
        .then((data) => {
            let ids = data.slice(0, 10);
            getItems(ids);
        })

    })
    .catch(function (err) {
        console.log("error", err);
    });
    
}


export const getItems = (ids) => {

    ids.map(id => {
        let request = createRequest(urls.item(id));

        fetch(request)
        .then((resp) => resp.json())
        .then((data) => {

            document.querySelector(".c-list").appendChild(articleElement(data));

        })
        .then(() => document.querySelector(".c-list").classList.add("visible"))
        .catch(function (err) {
            console.log("error");
        });
    })
    

}