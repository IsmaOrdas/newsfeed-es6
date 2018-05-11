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
        let homePageObj = false;

        if (!this._url) {
            let homePageObj = new HomePage();
            homePageObj.update();

        } else if (this._url.includes("id")) {
            let id = getParamFromUrl(this._url, "id");
            getComments(urls.item(id));
            
        } else if (this._url.includes("page")) {
            if (homePageObj instanceof HomePage === false) {
                homePageObj = new HomePage();
            }

            let page = getParamFromUrl(this._url, "page");
            homePageObj.clearView();
            for (let i = 1; i <= page; i++) {
                homePageObj.update(urls.topStories(i))     
            }
            
        }

    }

}