import {Nav} from "./components/nav";


class App {

    constructor (el) {
        this.app = el;
        
        this.init();
    }

    init () {
        this.events();
    }

    events () {
        this.app.addEventListener("route", (ev) => {
            console.log(ev);
        });
    }

}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded");

    let appEl = document.getElementById("app");
    let app = new App(appEl);


    let navEl = document.getElementById("main-nav");
    let nav = new Nav(navEl);



});