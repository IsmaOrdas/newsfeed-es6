let apiHost = "http://node-hnapi.herokuapp.com";

export const urls = {
    "bestStories": () => `${apiHost}/best`,
    "topStories": (page) => `${apiHost}/news?page=${page}`,
    "newStories": () => `${apiHost}/newest`,
    "item": (id) => `${apiHost}/item/${id}`
}

