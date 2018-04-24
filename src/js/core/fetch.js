import { urls } from "./urls.js";
import * as DOM  from "./dom-api.js";
import { articleElement } from "../components/article";
import * as comments from "../components/comment";
import {commentsPage} from "../views/commentsPage";

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

export async function pruebaData (url) {
    try {
        let request = createRequest(url);
        
        let response = await fetch(request);
        return await response.json();
        
    } catch (error) {
        console.log("fetch error", error)
    }
}

export const getData = (url, clearView = false) => {
    let request = createRequest(url);
    
    fetch(request)
    .then((response) => {

        if (response.status !== 200) {
            console.log("There was an error: " + response.status)
            return;
        }

        response.json()
        .then((data) => {
            console.log(data)

            return data;
            
        })

    })
    .catch(function (err) {
        console.log("error", err);
    });

}

export const getComments = (url) => {
    let request = createRequest(url);

    fetch(request)
    .then((response) => {

        if (response.status !== 200) {
            console.log("There was an error fetching comments: " + response.status)
            return;
        }

        response.json()
        .then((data) => {

            commentsPage(data)

        })

    })
    .catch(function (err) {
        console.log("error", err);
    });

}

