import * as DOM  from "../core/dom-api.js";
import { articleElement } from "../components/article";
import {getData, pruebaData, getComments} from "../core/fetch";
import { urls, getParamFromUrl } from "../core/urls";

export class HomePage {
    constructor() {
        this.pageNum = 1;
        this.appContentHook = document.getElementById("app-content");
        this.homePageEl = DOM.div({"id": "o-homepage"});
        this.list = DOM.div({"class": "c-list"});
        this.init();
    }

    init() {
        this.clearView()
        // this.update(urls.topStories(this.pageNum), false);
        this.events();
    }

    events() {
        this.homePageEl.addEventListener("click", (ev) => {
            const elTarget = ev.target;

            if (elTarget.matches(".load-more")) {
                this.pageNum += 1;
                history.pushState({}, "page", "?page=" + this.pageNum);
                this.update(urls.topStories(this.pageNum), false);
            } else if (elTarget.matches(".c-story__comments-link")) {
                const itemId = elTarget.dataset.item;
                history.pushState({}, "storyId", "?id=" + itemId);
                getComments(urls.item(itemId))
            } 
        });
    }

    async update(url = false) {
        let data = await pruebaData(url ? url : urls.topStories(this.pageNum));
        // console.log(data)
        this.fillView(data);
    }

    fillView(data) {
        let buttonExists = this.homePageEl.querySelector(".load-more");

        data.map(obj => {
            this.list.appendChild(articleElement(obj));
        });

        DOM.appendChildren(this.homePageEl, [this.list]);

        this.homePageEl.appendChild(buttonExists ? this.homePageEl.querySelector(".load-more") : this.createLoadButton());

        this.appContentHook.appendChild(this.homePageEl)
    }

    createLoadButton() {
        let loadMoreBtn = DOM.button({"class": "load-more"});
        loadMoreBtn.textContent = "Load more";
        return loadMoreBtn;
    }

    clearView() {
        DOM.clearMainView();
    }
    
}