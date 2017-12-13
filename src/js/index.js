import { App } from "./components/app";


document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded");

    let appEl = document.getElementById("app");
    let app = new App(appEl);

});