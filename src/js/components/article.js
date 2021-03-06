import { article } from "../core/dom-api.js";
import { urls } from "../core/urls";

export const articleElement = (data) => {
    return article(
        {"class": "c-story", "data-item": data.id}, 
        `<div class="c-story__title">
            <a class="c-story__link" href="${data.url}" target="_blank" rel="noopener">${data.title}</a>
            ${typeof data.domain !== "undefined" ? buildExternalLink(data.domain) : ""}
        </div>
        <div class="c-story__meta">
            <span class="c-story__points">${data.points} points</span>
            <span class="c-story__user">by ${data.user}</span><span class="c-story__time">${data.time_ago}</span>
            <span>| <a class="c-story__comments-link" data-item="${data.id}" href="?id=${data.id}">${data.comments_count} comments</a></span>
        </div>`
    );
}

const buildExternalLink = (domain) => `<a href="https://www.${domain}" class="c-story__source" target="_blank" rel="noopener"> (${domain})</a>`