import { createHeader } from "./components/header";
import { getComments, getData } from "./core/fetch";
import { urls, getParamFromUrl } from "./core/urls";
import { createEl } from "./core/dom-api";

export class App {

    constructor(container) {
        this.app = container;
        this.contentArea = this.app.querySelector(".app-content");
        this.pageNum = 1;
        this.init();
    }

    init() {
        this.app.insertBefore(createHeader(), this.app.querySelector(".app-content"));
        
        this.router();
           
        this.events();  
    }

    events() {

        this.contentArea.addEventListener("click", (ev) => {
            let element = ev.target;

            if (element.classList.contains("comments-link")) {
                ev.preventDefault();
                history.pushState({}, "prueba", "?id=" + element.getAttribute("data-item"));
                getComments(urls.item(element.getAttribute("data-item")))
            
            } else if (element.classList.contains("load-more")) {
                this.pageNum += 1;
                getData(urls.topStories(this.pageNum), false);
            }

        });
       
        window.addEventListener("popstate", this.router, false);

    }

    router () {
        let searchUrl = window.location.search;

        if (!searchUrl) {    
            getData(urls.topStories(1), true);
        } else if (searchUrl.includes("id")) {
            let id = getParamFromUrl(window.location.search, "id");
            getComments(urls.item(id));
        }

    }

}

document.addEventListener("DOMContentLoaded", () => {

    new App(document.getElementById("app"));

});