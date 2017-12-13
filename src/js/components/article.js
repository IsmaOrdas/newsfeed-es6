import { article } from "../core/dom-api.js";

export const articleElement = (data) => {
    let ar = article({ "class": "c-list__item" }, `<a href="${data.url}">${data.title}</a><div class="c-item-info"><span>points</span><span>by author</span><span>hour ago</span></div>`);
    document.querySelector(".c-list").appendChild(ar);
}