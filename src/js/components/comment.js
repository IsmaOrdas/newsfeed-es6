import { div } from "../core/dom-api.js";

export const commentsPage = () => {
    return div({"class": "comments-page"}, null);
}

export const commentElement = (data) => {
    return div(
        {"class": "c-comment"},
        `<div class="prueba">
            <div class="autor-time"><span class="author">${data.user}</span><span class="time">${data.time_ago}</span></div>
            <div>${data.content}</div>
        </div>`
    );
}