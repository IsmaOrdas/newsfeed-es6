import { urls } from "./urls.js";
import * as dom  from "./dom-api.js";
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
    let listEl = dom.div({"class": "c-list"});
    let request = createRequest(url);
    
    fetch(request)
    .then((response) => {

        if (response.status !== 200) {
            console.log("There was an error: " + response.status)
            return;
        }

        response.json()
        .then((data) => {

            let appContentWrap = document.querySelector(".app-content");

            let loadMoreBtn = dom.createEl("button")({"class": "load-more"});
            loadMoreBtn.textContent = "Load more";

            clearView && dom.clearMainView();

            data.map(obj => {
                listEl.appendChild(articleElement(obj));
            });

            if (appContentWrap.querySelector(".load-more")) {
                appContentWrap.insertBefore(listEl, appContentWrap.querySelector(".load-more"));
            } else {
                appContentWrap.appendChild(listEl);
                appContentWrap.appendChild(loadMoreBtn)
            }
            
        })

    })
    .catch(function (err) {
        console.log("error", err);
    });

}


export const getComments = (url) => {
    let listComments = dom.list({ "class": "c-list" });
    let request = createRequest(url);

    fetch(request)
    .then((response) => {

        if (response.status !== 200) {
            console.log("There was an error fetching comments: " + response.status)
            return;
        }

        response.json()
        .then((data) => {
           
            dom.clearMainView();
            
            let commentsPageEl = commentsPage();
            
            data.comments.map((el) => {
                listComments.appendChild(commentElement(el));
            });

            dom.appendChildren(commentsPageEl, [articleElement(data), listComments]);

            document.querySelector(".app-content").appendChild(commentsPageEl);

        })

    })
    .catch(function (err) {
        console.log("error", err);
    });

}

