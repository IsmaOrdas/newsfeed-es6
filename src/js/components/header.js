import { header } from "../core/dom-api.js";

export class Header {

    constructor () {
        console.log("header");
    }

    createHeader () {
        let headerEl = header({"class": "app-header"}, this.getHeaderTemplate())
        return headerEl;
    }

    getHeaderTemplate () {
        return `<nav id="main-nav" class="main-nav">
            <h1>HN</h1>
            <div class="wrap-nav-links">
                <ul >
                    <li><a class="nav-link" href="#new">new</a></li>
                    <li><a class="nav-link" href="#top">top</a></li>
                    <li><a class="nav-link" href="#best">best</a></li>
                </ul>
            </div>
        </nav>`;
    }

}
