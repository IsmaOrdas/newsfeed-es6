import { Nav } from "./components/nav";
import { getComments, getData } from "./core/fetch";
import { urls } from "./core/urls";

export class App {

    constructor(el) {
        this.app = el;
        this.contentArea = this.app.querySelector(".app-content");

        this.init();
    }

    init() {
        this._initNav();
        this._getData();
            
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
                console.log(element.href)
                getComments(urls.item(element.getAttribute("data-item")))
            }

        });

        // window.addEventListener('load', this.router);

        

        window.addEventListener("popstate", this.router, false);

    }

    _getData () {
        getData(urls.topStories());
    }

    router () {
        let url = window.location.pathname;

        if (url === "/") {
            console.log("si");
            getData(urls.topStories());
        } else if (url.includes("item")) {
            let position = url.substr(url.lastIndexOf("/") + 1);


        }

    }

}




document.addEventListener("DOMContentLoaded", () => {

    let appEl = document.getElementById("app");
    new App(appEl);

});