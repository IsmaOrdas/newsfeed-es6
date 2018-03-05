import * as DOM  from "../core/dom-api.js";

export const commentsPage = (children) => {
    let page = DOM.div({"class": "comments-page"});

    if (children) {
        DOM.appendChildren(page, children);
    }
    
    return page;
}

export const commentElement = (data) => {
    return DOM.div(
        {"class": "c-comment"},
        `<div class="c-comment__info">
            <span class="c-comment__author">${data.user}</span>
            <span class="c-comment__time">${data.time_ago}</span>
        </div>
        <div class="c-comment__content">${data.content}</div>`
    );
}