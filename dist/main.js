/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.appendChildren = appendChildren;
exports.createEl = createEl;
exports.clearMainView = clearMainView;
exports.classContains = classContains;
function setAttrs(attrs, el) {
    Object.keys(attrs).forEach(function (key) {
        return el.setAttribute(key, attrs[key]);
    });
}

function appendChildren(parent, children) {
    children.forEach(function (el) {
        parent.appendChild(el);
    });
}

function createEl(tagName) {

    return function (attrs, template) {

        var element = document.createElement(tagName);

        if (attrs) {
            setAttrs(attrs, element);
        }

        if (template && template.length) {
            template = document.createRange().createContextualFragment(template);
            element.appendChild(template);
        }

        return element;
    };
}

function clearMainView() {
    document.querySelector(".app-content").innerHTML = "";
}

function classContains(node, className) {
    return node.classList.contains(className);
}

var header = exports.header = createEl("header");
var list = exports.list = createEl("ul");
var article = exports.article = createEl("article");
var div = exports.div = createEl("div");
var button = exports.button = createEl("button");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var apiHost = "http://node-hnapi.herokuapp.com";

var urls = exports.urls = {
    "bestStories": function bestStories() {
        return apiHost + "/best";
    },
    "topStories": function topStories(page) {
        return apiHost + "/news?page=" + page;
    },
    "newStories": function newStories() {
        return apiHost + "/newest";
    },
    "item": function item(id) {
        return apiHost + "/item/" + id;
    }
};

var getParamFromUrl = exports.getParamFromUrl = function getParamFromUrl(url, param) {
    url = url.replace(/%5B%5D/g, "");
    url = url.replace(/[\[\]']+/g, "");
    var request = {};
    var pairs = url.substring(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < pairs.length; i++) {
        if (!pairs[i]) continue;
        var pair = pairs[i].split('=');
        if (request[decodeURIComponent(pair[0])] === undefined) {
            request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        } else {
            request[decodeURIComponent(pair[0])] += "," + decodeURIComponent(pair[1]);
        }
    }
    if (param) {
        return request[param];
    } else {
        return request;
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getComments = exports.getData = exports.createRequest = undefined;

var _urls = __webpack_require__(1);

var _domApi = __webpack_require__(0);

var dom = _interopRequireWildcard(_domApi);

var _article = __webpack_require__(6);

var _comment = __webpack_require__(7);

var comments = _interopRequireWildcard(_comment);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var createRequest = exports.createRequest = function createRequest(url) {

    return new Request(url, {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });
};

var getData = exports.getData = function getData(url) {
    var clearView = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var listEl = dom.div({ "class": "c-list" });
    var request = createRequest(url);

    fetch(request).then(function (response) {

        if (response.status !== 200) {
            console.log("There was an error: " + response.status);
            return;
        }

        response.json().then(function (data) {
            console.log(data);
            var appContentWrap = document.querySelector(".app-content");

            var loadMoreBtn = dom.button({ "class": "load-more" });
            loadMoreBtn.textContent = "Load more";

            clearView && dom.clearMainView();

            data.map(function (obj) {
                listEl.appendChild((0, _article.articleElement)(obj));
            });

            if (appContentWrap.querySelector(".load-more")) {
                appContentWrap.insertBefore(listEl, appContentWrap.querySelector(".load-more"));
            } else {
                dom.appendChildren(appContentWrap, [listEl, loadMoreBtn]);
            }
        });
    }).catch(function (err) {
        console.log("error", err);
    });
};

var getComments = exports.getComments = function getComments(url) {
    var listComments = dom.list({ "class": "c-list c-comments__list" });
    var request = createRequest(url);

    fetch(request).then(function (response) {

        if (response.status !== 200) {
            console.log("There was an error fetching comments: " + response.status);
            return;
        }

        response.json().then(function (data) {

            dom.clearMainView();

            var commentsPageEl = comments.commentsPage();

            data.comments.map(function (el) {
                listComments.appendChild(comments.commentElement(el));
            });

            dom.appendChildren(commentsPageEl, [(0, _article.articleElement)(data), listComments]);

            document.querySelector(".app-content").appendChild(commentsPageEl);
        });
    }).catch(function (err) {
        console.log("error", err);
    });
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);
module.exports = __webpack_require__(9);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.App = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _header = __webpack_require__(5);

var _fetch = __webpack_require__(2);

var _urls = __webpack_require__(1);

var _domApi = __webpack_require__(0);

var _router = __webpack_require__(8);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = exports.App = function () {
    function App(container) {
        _classCallCheck(this, App);

        this.app = container;
        this.contentArea = this.app.querySelector(".app-content");
        this.pageNum = 1;
        this.init();
    }

    _createClass(App, [{
        key: "init",
        value: function init() {
            this.app.insertBefore((0, _header.createHeader)(), this.contentArea);

            (0, _router.router)();

            this.events();
        }
    }, {
        key: "events",
        value: function events() {
            var _this = this;

            this.contentArea.addEventListener("click", function (ev) {
                var element = ev.target;

                if (element.classList.contains("c-story__comments-link")) {
                    var itemId = element.dataset.item;
                    history.pushState({}, "storyId", "?id=" + itemId);
                    (0, _fetch.getComments)(_urls.urls.item(itemId));
                } else if (element.classList.contains("load-more")) {
                    _this.pageNum += 1;
                    (0, _fetch.getData)(_urls.urls.topStories(_this.pageNum), false);
                }
            });

            window.addEventListener("popstate", _router.router, false);
        }
    }]);

    return App;
}();

document.addEventListener("DOMContentLoaded", function () {

    new App(document.getElementById("app"));
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createHeader = createHeader;

var _domApi = __webpack_require__(0);

function createHeader() {
    return (0, _domApi.header)({ "class": "app-header" }, headerTemplate());
}

var headerTemplate = function headerTemplate() {
    return "<nav id=\"main-nav\" class=\"main-nav\">\n                <h1><a href=\"/\">HN</a></h1>\n                <div class=\"wrap-nav-links\">\n                    <ul >\n                        <li><a class=\"nav-link\" href=\"#new\">new</a></li>\n                        <li><a class=\"nav-link\" href=\"#top\">top</a></li>\n                        <li><a class=\"nav-link\" href=\"#best\">best</a></li>\n                    </ul>\n                </div>\n            </nav>";
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.articleElement = undefined;

var _domApi = __webpack_require__(0);

var _urls = __webpack_require__(1);

var articleElement = exports.articleElement = function articleElement(data) {
    return (0, _domApi.article)({ "class": "c-story", "data-item": data.id }, "<div class=\"c-story__title\">\n            <a class=\"c-story__link\" href=\"" + data.url + "\" target=\"_blank\" rel=\"noopener\">" + data.title + "</a>\n            <a href=\"https://www." + data.domain + "\" class=\"c-story__source\" target=\"_blank\" rel=\"noopener\"> (" + data.domain + ")</a>\n        </div>\n        <div class=\"c-story__meta\">\n            <span class=\"c-story__points\">" + data.points + " points</span>\n            <span class=\"c-story__user\">by " + data.user + "</span><span class=\"c-story__time\">" + data.time_ago + "</span>\n            <span>| <a class=\"c-story__comments-link\" data-item=\"" + data.id + "\" href=\"?id=" + data.id + "\">" + data.comments_count + " comments</a></span>\n        </div>");
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.commentElement = exports.commentsPage = undefined;

var _domApi = __webpack_require__(0);

var commentsPage = exports.commentsPage = function commentsPage() {
    return (0, _domApi.div)({ "class": "comments-page" }, null);
};

var commentElement = exports.commentElement = function commentElement(data) {
    return (0, _domApi.div)({ "class": "c-comment" }, "<div class=\"c-comment__info\">\n            <span class=\"c-comment__author\">" + data.user + "</span>\n            <span class=\"c-comment__time\">" + data.time_ago + "</span>\n        </div>\n        <div class=\"c-comment__content\">" + data.content + "</div>");
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.router = undefined;

var _fetch = __webpack_require__(2);

var _urls = __webpack_require__(1);

var router = exports.router = function router() {
    var searchUrl = window.location.search;

    if (!searchUrl) {
        (0, _fetch.getData)(_urls.urls.topStories(1), true);
    } else if (searchUrl.includes("id")) {
        var id = (0, _urls.getParamFromUrl)(window.location.search, "id");
        (0, _fetch.getComments)(_urls.urls.item(id));
    }
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);