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
                getComments(element.href)
            }

        });

        // window.addEventListener('load', this.router);

        // window.addEventListener("popstate", function () {
        //     console.log("popstate")
        // }, false);

    }

    _getData () {
        // getIds(urls.topStories())
        getData(urls.topStories());
    }

    router () {

        let url = window.location;
        console.log(url);
    }

}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded");

    let appEl = document.getElementById("app");
    new App(appEl);

});