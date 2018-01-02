import { article } from "../core/dom-api.js";
import { urls } from "../core/urls";

export const articleElement = (data) => {
    return article(
        {"class": "c-list__item"}, 
        `<a class="title-link" href="${data.url}" target="_blank" rel="noopener">${data.title}</a><div class="c-item-info"><span>${data.points} points</span><span>by ${data.user}</span><span>${data.time_ago}</span><span>| <a class="comments-link" href="${urls.item(data.id)}">${data.comments_count} comments</a></span></div>`);
}