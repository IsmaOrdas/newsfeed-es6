import * as DOM  from "../core/dom-api.js";
import { articleElement } from "../components/article";
import {getData, pruebaData} from "../core/fetch";

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

export class MainPageClass {
    constructor() {
        this.appContentHook = document.getElementById("app-content");
        this.list = null;
        this.init();
    }

    init() {
        
        console.log("init page")
        this.createNewsList();
        // this.update()
    }

    async update(url) {
        let data = await pruebaData(url);
        console.log("datos", data)
        // return data;
        this.fillView(data);
    }

    fillView(data) {
        data.map(obj => {
            this.list.appendChild(articleElement(obj));
        });
        this.appContentHook.appendChild(this.list);
        console.log(this.list)
    }

    createNewsList() {
        this.list = DOM.div({"class": "c-list"});
    }

    createLoadButton() {
        let loadMoreBtn = DOM.button({"class": "load-more", "textContent": "Load more"});
        loadMoreBtn.textContent = "Load more";
        return loadMoreBtn;
    }

    clearView() {
        clearView && DOM.clearMainView();
    }
}