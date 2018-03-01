import { createHeader } from "./components/header";
import { getComments, getData } from "./core/fetch";
import { urls, getParamFromUrl, } from "./core/urls";
import { createEl } from "./core/dom-api";
import { router } from "./core/router";

export class App {

    constructor(container) {
        this.app = container;
        this.contentArea = this.app.querySelector(".app-content");
        this.pageNum = 1;
        this.init();
    }

    init() {
        this.app.insertBefore(createHeader(), this.contentArea);
        
        router();
           
        this.events();  
    }

    events() {

        this.contentArea.addEventListener("click", (ev) => {
            let element = ev.target;

            if (element.classList.contains("c-story__comments-link")) {
                let itemId = element.dataset.item;
                history.pushState({}, "storyId", "?id=" + itemId);
                getComments(urls.item(itemId))
            
            } else if (element.classList.contains("load-more")) {
                this.pageNum += 1;
                getData(urls.topStories(this.pageNum), false);
            }

        });
       
        window.addEventListener("popstate", router, false);

    }

}

document.addEventListener("DOMContentLoaded", () => {

    new App(document.getElementById("app"));

});