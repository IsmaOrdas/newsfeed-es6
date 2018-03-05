import { urls } from "./urls.js";
import * as DOM  from "./dom-api.js";
import { articleElement } from "../components/article";
import * as comments from "../components/comment";

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
    let listEl = DOM.div({"class": "c-list"});
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

            let loadMoreBtn = DOM.button({"class": "load-more", "textContent": "Load more"});
            loadMoreBtn.textContent = "Load more";

            clearView && DOM.clearMainView();

            data.map(obj => {
                listEl.appendChild(articleElement(obj));
            });

            if (appContentWrap.querySelector(".load-more")) {
                appContentWrap.insertBefore(listEl, appContentWrap.querySelector(".load-more"));
            } else {
                DOM.appendChildren(appContentWrap, [listEl, loadMoreBtn]);
            }
            
        })

    })
    .catch(function (err) {
        console.log("error", err);
    });

}

export const getComments = (url) => {
    let listComments = DOM.list({ "class": "c-list c-comments__list" });
    let request = createRequest(url);

    fetch(request)
    .then((response) => {

        if (response.status !== 200) {
            console.log("There was an error fetching comments: " + response.status)
            return;
        }

        response.json()
        .then((data) => {
           
            DOM.clearMainView();
                        
            data.comments.map((el) => {
                listComments.appendChild(comments.commentElement(el));
            });

            let commentsPageEl = comments.commentsPage([articleElement(data), listComments]);

            document.querySelector(".app-content").appendChild(commentsPageEl);

        })

    })
    .catch(function (err) {
        console.log("error", err);
    });

}

