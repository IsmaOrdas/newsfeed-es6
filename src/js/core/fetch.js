import { urls } from "../urls.js";
import { list } from "./dom-api.js";
import { articleElement } from "../components/article";

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

    let listEl = list({"class": "c-list"});

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
                listEl.appendChild(articleElement(id));
            });

            document.querySelector(".app-content").appendChild(listEl)

        })

    })
    .catch(function (err) {
        console.log("error", err);
    });

}


export const getComments = (url) => {
    console.log(url);

    let request = createRequest(url);

    fetch(request)
    .then((response) => {

        if (response.status !== 200) {
            console.log("There was an error: " + response.status)
            return;
        }

        response.json()
        .then((data) => {
           
            console.log(data.comments);
            data.comments.map((el) => {
                console.log(el)
            })

        })

    })
    .catch(function (err) {
        console.log("error", err);
    });

}
 