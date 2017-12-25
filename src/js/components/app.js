import { Nav } from "./nav";
import { getIds, getData } from "../core/fetch";
import { urls } from "../urls";

export class App {

    constructor(el) {
        this.app = el;

        this.init();
    }

    init() {
        this._initNav();
        this._getData();
            

        // this.events();
    }

    _initNav() {
        let navEl = this.app.querySelector("#main-nav");
        let nav = new Nav(navEl);
    }

    events() {

        window.addEventListener('load', this.router);

        window.addEventListener("popstate", function () {
            console.log("popstate")
        }, false);

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