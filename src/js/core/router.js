import { getComments, getData } from "./fetch";
import { urls, getParamFromUrl } from "./urls";
import { HomePage } from "../views/mainPage";

export class Router {

    constructor() {
        this._url = window.location.search;
        this._page = 1;
        this.update();
    }

    update () {

        if (!this._url) {
            console.log("entra")
            new HomePage();
            // page.update(urls.topStories(this._page))

        } else if (this._url.includes("id")) {
            let id = getParamFromUrl(this._url, "id");
            getComments(urls.item(id));
            
        } else if (this._url.includes("page")) {
            let page = getParamFromUrl(this._url, "page");

            for (let i = 1; i <= page; i++) {
                getData(urls.topStories(i), false);        
            }
            
        }

    }

}