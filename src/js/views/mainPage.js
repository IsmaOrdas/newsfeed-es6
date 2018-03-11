import * as DOM  from "../core/dom-api.js";
import { articleElement } from "../components/article";

export const mainPage = (data, clearView) => {
    let listEl = DOM.div({"class": "c-list"});

    let appContentWrap = document.querySelector(".app-content");

    let loadMoreBtn = DOM.button({"class": "load-more", "textContent": "Load more"});
    loadMoreBtn.textContent = "Load more";

    clearView && DOM.clearMainView();

    data.map(obj => {
        listEl.appendChild(articleElement(obj));
    });

    if (appContentWrap.querySelector(".load-more")) {
        appContentWrap.insertBefore(listEl, appContentWrap.querySelector(".load-more"));
    } else {
        DOM.appendChildren(appContentWrap, [listEl, loadMoreBtn]);
    }

}

