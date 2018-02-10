import { div } from "../core/dom-api.js";

export const commentsPage = () => {
    return div({"class": "comments-page"}, null);
}

export const commentElement = (data) => {
    return div(
        {"class": "c-comment"},
        `<div class="c-comment__info"><span class="c-comment__author">${data.user}</span><span class="c-comment__time">${data.time_ago}</span></div>
        <div class="c-comment__content">${data.content}</div>`
    );
}