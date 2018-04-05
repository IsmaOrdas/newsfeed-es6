import { createHeader } from "./components/header";
import { getComments, getData } from "./core/fetch";
import { urls, getParamFromUrl, } from "./core/urls";
import { createEl } from "./core/dom-api";
import { Router } from "./core/router";

export class App {

    constructor(container) {
        this.app = container;
        this.contentArea = this.app.querySelector(".app-content");
        this.pageNum = 1;
        this.router = new Router();
        this.init();
    }

    init() {
        this.app.insertBefore(createHeader(), this.contentArea);        
        this.events();  
    }

    events() {

        window.addEventListener("popstate", this.router.update, false);
        
        this.contentArea.addEventListener("click", (ev) => {
            ev.preventDefault();
            let element = ev.target;
            
            if (element.matches(".c-story__comments-link")) {
                let itemId = element.dataset.item;
                history.pushState({}, "storyId", "?id=" + itemId);
                getComments(urls.item(itemId))
            
            } else if (element.matches(".load-more")) {
                this.pageNum += 1;
                history.pushState({}, "page", "?page=" + this.pageNum);
                getData(urls.topStories(this.pageNum), false);
            }

        });

    }

}

document.addEventListener("DOMContentLoaded", () => {

    new App(document.getElementById("app"));

});