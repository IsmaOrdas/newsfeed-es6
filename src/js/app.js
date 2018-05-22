import { createHeader } from "./components/header";
import { Router } from "./core/router";

export class App {

    constructor(container) {
        this.app = container;
        this.contentArea = this.app.querySelector(".app-content");
        this.router = new Router();
        this.init();
    }

    init() {
        this.app.insertBefore(createHeader(), this.contentArea);        
        this.events();  
    }

    events() {
        window.addEventListener("popstate", this.router.update, false);
    }

}

document.addEventListener("DOMContentLoaded", () => {
    new App(document.getElementById("app"));
});
