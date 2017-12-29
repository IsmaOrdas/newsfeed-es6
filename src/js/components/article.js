import { article } from "../core/dom-api.js";

export const articleElement = (data) => {
    return article({ "class": "c-list__item" }, `<a href="${data.url}" target="_blank" rel="noopener">${data.title}</a><div class="c-item-info"><span>${data.points} points</span><span>by ${data.user}</span><span>${data.time_ago}</span></div>`);
}