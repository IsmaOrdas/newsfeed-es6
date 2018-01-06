import { article } from "../core/dom-api.js";
import { urls } from "../core/urls";

export const articleElement = (data) => {
    return article(
        {"class": "c-list__story", "data-item": data.id}, 
        `<div class="domain-info">
            <a class="title-link" href="${data.url}" target="_blank" rel="noopener">${data.title}</a>
            <a href="www.${data.domain}" class="domain"> (${data.domain})</a>
        </div>
        <div class="c-item-info">
            <span>${data.points} points</span>
            <span>by ${data.user}</span><span>${data.time_ago}</span>
            <span>| <a class="comments-link" data-item="${data.id}" href="${urls.item(data.id)}">${data.comments_count} comments</a></span>
        </div>`
    );
}