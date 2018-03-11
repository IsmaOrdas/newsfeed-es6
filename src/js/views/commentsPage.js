import * as DOM  from "../core/dom-api.js";
import * as comments from "../components/comment";
import { articleElement } from "../components/article";

export const commentsPage = (data, clearView) => {
    let page = DOM.div({"class": "comments-page"});
    let listComments = DOM.list({ "class": "c-list c-comments__list" });

    DOM.clearMainView();
                        
    data.comments.map((el) => {
        listComments.appendChild(comments.commentElement(el));
    });

    DOM.appendChildren(page, [articleElement(data), listComments]);

    document.querySelector(".app-content").appendChild(page);
}
