import { createHeader } from "./components/header";
import { getComments, getData } from "./core/fetch";
import { urls } from "./core/urls";
import { createEl } from "./core/dom-api";

export class App {

    constructor(container) {
        this.app = container;
        this.contentArea = this.app.querySelector(".app-content");
        this.init();
    }

    init() {

        this.app.insertBefore(createHeader(), this.app.querySelector(".app-content"));
        
        this._getData(1, false);
        
        // this._initNav();
            
        this.events();

    }

    _initNav() {
        let navEl = this.app.querySelector("#main-nav");
        let nav = new Nav(navEl);
    }

    events() {

        this.contentArea.addEventListener("click", (ev) => {
            let element = ev.target;

            if (element.classList.contains("comments-link")) {
                ev.preventDefault();
                history.pushState({}, "prueba", "/item/" + element.getAttribute("data-item"));
                getComments(urls.item(element.getAttribute("data-item")))
            }

            if (element.classList.contains("load-more")) {
                this._getData(2, false)
            }

        });

        // window.addEventListener('load', this.router);

        

        window.addEventListener("popstate", this.router, false);

    }

    _getData (page, clearView) {
        getData(urls.topStories(page), clearView);
    }

    router () {
        let url = window.location.pathname;

        if (url === "/") {
            this._getData(1);
        } else if (url.includes("item")) {
            let position = url.substr(url.lastIndexOf("/") + 1);
        }

    }

}

document.addEventListener("DOMContentLoaded", () => {

    new App(document.getElementById("app"));

});