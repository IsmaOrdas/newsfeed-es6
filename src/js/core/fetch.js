import { urls } from "./urls.js";
import { list, clearMainView, div, boton, createEl } from "./dom-api.js";
import { articleElement } from "../components/article";
import { commentElement, commentsPage } from "../components/comment";


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

export const getData = (url, clearView = false) => {
    let listEl = div({"class": "c-list"});
    let request = createRequest(url);
    
    fetch(request)
    .then((response) => {

        if (response.status !== 200) {
            console.log("There was an error: " + response.status)
            return;
        }

        response.json()
        .then((data) => {

            console.log(data);
            let appContentWrap = document.querySelector(".app-content");

            let button = createEl("button")({"class": "load-more"});
            button.textContent = "Load more";

            clearView && clearMainView();

            data.map(id => {
                listEl.appendChild(articleElement(id));
            });

            if (appContentWrap.querySelector(".load-more")) {
                appContentWrap.insertBefore(listEl, appContentWrap.querySelector(".load-more"));
            } else {
                appContentWrap.appendChild(listEl);
                appContentWrap.appendChild(button)
            }
            
        })

    })
    .catch(function (err) {
        console.log("error", err);
    });

}


export const getComments = (url) => {
    let listComments = list({ "class": "c-list" });
    let request = createRequest(url);

    fetch(request)
    .then((response) => {

        if (response.status !== 200) {
            console.log("There was an error fetching comments: " + response.status)
            return;
        }

        response.json()
        .then((data) => {
           
            clearMainView();
            let wrap = commentsPage();
            wrap.appendChild(articleElement(data));
            // document.querySelector(".app-content").appendChild(articleElement(data));

            data.comments.map((el) => {
                listComments.appendChild(commentElement(el));
            });
            wrap.appendChild(listComments);

            document.querySelector(".app-content").appendChild(wrap);

        })

    })
    .catch(function (err) {
        console.log("error", err);
    });

}

