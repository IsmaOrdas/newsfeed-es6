import { getComments, getData } from "./fetch";
import { urls, getParamFromUrl } from "./urls";

export const router = () => {
    let searchUrl = window.location.search;

    if (!searchUrl) {    
        getData(urls.topStories(1), true);
    } else if (searchUrl.includes("id")) {
        let id = getParamFromUrl(window.location.search, "id");
        getComments(urls.item(id));
    }
}

