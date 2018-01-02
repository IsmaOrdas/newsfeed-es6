let apiHost = "http://node-hnapi.herokuapp.com";

export const urls = {
    "bestStories": () => `${apiHost}/best`,
    "topStories": () => `${apiHost}/news`,
    "newStories": () => `${apiHost}/newest`,
    "item": (id) => `${apiHost}/item/${id}`
}

