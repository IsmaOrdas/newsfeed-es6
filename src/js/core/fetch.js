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

export const getData = (url) => {

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
            ids.map(id => {
                console.log(id)
                document.querySelector(".c-list").appendChild(articleElement(id));
            });
        })
        .then(document.querySelector(".c-list").classList.add("visible"))

    })
    .catch(function (err) {
        console.log("error", err);
    });

}
 