import { article } from "../core/dom-api.js";

export const articleElement = (data) => {
    console.log("data", data)
    return article({ "class": "c-list__item" }, `<a href="${data.url}">${data.title}</a><div class="c-item-info"><span>points</span><span>by author</span><span>hour ago</span></div>`);
}