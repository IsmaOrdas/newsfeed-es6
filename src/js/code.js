import {createEl, article} from "./core/dom-api.js";
import {urls} from "./urls.js";
import * as fetchUtils from "./fetch.js";


let initApp = () => {
    console.log(window.location.pathname)
    
}


document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded");
    initApp();

    fetchUtils.getIds(urls.topStories());
});