let apiHost = "https://hacker-news.firebaseio.com/v0";

export const urls = {
    "topStories": () => `${apiHost}/topstories.json`,
    "item": (id) => `${apiHost}/item/${id}.json`
}

