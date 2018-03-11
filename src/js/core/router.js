import { getComments, getData } from "./fetch";
import { urls, getParamFromUrl } from "./urls";

export class Router {

    constructor() {
        this._url = window.location.search;
        this._page = 1;
        this.update();
    }

    update () {
        if (!this._url) {    
            getData(urls.topStories(this._page), true);
        } else if (this._url.includes("id")) {
            let id = getParamFromUrl(this._url, "id");
            getComments(urls.item(id));
        } else if (this._url.includes("page")) {
            let page = getParamFromUrl(this._url, "page");
            getData(urls.topStories(page), true);
        }

    }

}