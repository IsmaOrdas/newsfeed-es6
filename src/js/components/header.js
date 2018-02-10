import { header } from "../core/dom-api.js";

export function createHeader() {
    return header({"class": "app-header"}, headerTemplate());
}

const headerTemplate = () => {
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