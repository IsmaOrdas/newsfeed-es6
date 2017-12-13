import { Nav } from "./nav";
import { getIds } from "../core/fetch";
import { urls } from "../urls";

export class App {

    constructor(el) {
        this.app = el;

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
        this.app.addEventListener("route", (ev) => {
            console.log(ev);
        });
    }

    _getData () {
        getIds(urls.topStories())
    }

}