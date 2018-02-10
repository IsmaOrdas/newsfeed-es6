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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createEl = createEl;
exports.clearMainView = clearMainView;
function setAttrs(attrs, el) {
    Object.keys(attrs).forEach(function (key) {
        return el.setAttribute(key, attrs[key]);
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

var header = exports.header = createEl("header");
var list = exports.list = createEl("ul");
var article = exports.article = createEl("article");
var div = exports.div = createEl("div");
var boton = exports.boton = createEl("button");

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
module.exports = __webpack_require__(8);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.App = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _header = __webpack_require__(4);

var _fetch = __webpack_require__(5);

var _urls = __webpack_require__(1);

var _domApi = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = exports.App = function () {
    function App(container) {
        _classCallCheck(this, App);

        this.app = container;
        this.contentArea = this.app.querySelector(".app-content");
        this.init();
    }

    _createClass(App, [{
        key: "init",
        value: function init() {

            this.app.insertBefore((0, _header.createHeader)(), this.app.querySelector(".app-content"));

            this._getData(1, false);

            // this._initNav();

            this.events();
        }
    }, {
        key: "_initNav",
        value: function _initNav() {
            var navEl = this.app.querySelector("#main-nav");
            var nav = new Nav(navEl);
        }
    }, {
        key: "events",
        value: function events() {
            var _this = this;

            this.contentArea.addEventListener("click", function (ev) {
                var element = ev.target;

                if (element.classList.contains("comments-link")) {
                    ev.preventDefault();
                    history.pushState({}, "prueba", "/item/" + element.getAttribute("data-item"));
                    (0, _fetch.getComments)(_urls.urls.item(element.getAttribute("data-item")));
                }

                if (element.classList.contains("load-more")) {
                    _this._getData(2, false);
                }
            });

            // window.addEventListener('load', this.router);


            window.addEventListener("popstate", this.router, false);
        }
    }, {
        key: "_getData",
        value: function _getData(page, clearView) {
            (0, _fetch.getData)(_urls.urls.topStories(page), clearView);
        }
    }, {
        key: "router",
        value: function router() {
            var url = window.location.pathname;

            if (url === "/") {
                this._getData(1);
            } else if (url.includes("item")) {
                var position = url.substr(url.lastIndexOf("/") + 1);
            }
        }
    }]);

    return App;
}();

document.addEventListener("DOMContentLoaded", function () {

    new App(document.getElementById("app"));
});

/***/ }),
/* 4 */
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
    return "<nav id=\"main-nav\" class=\"main-nav\">\n                <h1>HN</h1>\n                <div class=\"wrap-nav-links\">\n                    <ul >\n                        <li><a class=\"nav-link\" href=\"#new\">new</a></li>\n                        <li><a class=\"nav-link\" href=\"#top\">top</a></li>\n                        <li><a class=\"nav-link\" href=\"#best\">best</a></li>\n                    </ul>\n                </div>\n            </nav>";
};

/***/ }),
/* 5 */
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

            var button = dom.createEl("button")({ "class": "load-more" });
            button.textContent = "Load more";

            clearView && dom.clearMainView();

            data.map(function (obj) {
                listEl.appendChild((0, _article.articleElement)(obj));
            });

            if (appContentWrap.querySelector(".load-more")) {
                appContentWrap.insertBefore(listEl, appContentWrap.querySelector(".load-more"));
            } else {
                appContentWrap.appendChild(listEl);
                appContentWrap.appendChild(button);
            }
        });
    }).catch(function (err) {
        console.log("error", err);
    });
};

var getComments = exports.getComments = function getComments(url) {
    var listComments = dom.list({ "class": "c-list" });
    var request = createRequest(url);

    fetch(request).then(function (response) {

        if (response.status !== 200) {
            console.log("There was an error fetching comments: " + response.status);
            return;
        }

        response.json().then(function (data) {

            dom.clearMainView();
            var wrap = (0, _comment.commentsPage)();
            wrap.appendChild((0, _article.articleElement)(data));
            // document.querySelector(".app-content").appendChild(articleElement(data));

            data.comments.map(function (el) {
                listComments.appendChild((0, _comment.commentElement)(el));
            });
            wrap.appendChild(listComments);

            document.querySelector(".app-content").appendChild(wrap);
        });
    }).catch(function (err) {
        console.log("error", err);
    });
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
    return (0, _domApi.article)({ "class": "c-list__story", "data-item": data.id }, "<div class=\"domain-info\">\n            <a class=\"title-link\" href=\"" + data.url + "\" target=\"_blank\" rel=\"noopener\">" + data.title + "</a>\n            <a href=\"www." + data.domain + "\" class=\"domain\"> (" + data.domain + ")</a>\n        </div>\n        <div class=\"c-item-info\">\n            <span>" + data.points + " points</span>\n            <span>by " + data.user + "</span><span>" + data.time_ago + "</span>\n            <span>| <a class=\"comments-link\" data-item=\"" + data.id + "\" href=\"/item/" + data.id + "\">" + data.comments_count + " comments</a></span>\n        </div>");
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
    return (0, _domApi.div)({ "class": "c-comment" }, "<div class=\"prueba\">\n            <div class=\"autor-time\"><span class=\"author\">" + data.user + "</span><span class=\"time\">" + data.time_ago + "</span></div>\n            <div>" + data.content + "</div>\n        </div>");
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);