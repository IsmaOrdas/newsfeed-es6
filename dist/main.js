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
var apiHost = "http://node-hnapi.herokuapp.com";

var urls = exports.urls = {
    "bestStories": function bestStories() {
        return apiHost + "/best";
    },
    "topStories": function topStories() {
        return apiHost + "/news";
    },
    "newStories": function newStories() {
        return apiHost + "/newest";
    },
    "item": function item(id) {
        return apiHost + "/item/" + id;
    }
};

/***/ }),
/* 1 */
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
        setAttrs(attrs, element);

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

var list = exports.list = createEl("ul");
var article = exports.article = createEl("li");
var div = exports.div = createEl("div");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
module.exports = __webpack_require__(7);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.App = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nav = __webpack_require__(4);

var _fetch = __webpack_require__(5);

var _urls = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = exports.App = function () {
    function App(el) {
        _classCallCheck(this, App);

        this.app = el;
        this.contentArea = this.app.querySelector(".app-content");

        this.init();
    }

    _createClass(App, [{
        key: "init",
        value: function init() {
            this._initNav();
            this._getData();

            this.events();
        }
    }, {
        key: "_initNav",
        value: function _initNav() {
            var navEl = this.app.querySelector("#main-nav");
            var nav = new _nav.Nav(navEl);
        }
    }, {
        key: "events",
        value: function events() {

            this.contentArea.addEventListener("click", function (ev) {
                var element = ev.target;

                if (element.classList.contains("comments-link")) {
                    ev.preventDefault();
                    (0, _fetch.getComments)(element.href);
                }
            });

            // window.addEventListener('load', this.router);

            // window.addEventListener("popstate", function () {
            //     console.log("popstate")
            // }, false);
        }
    }, {
        key: "_getData",
        value: function _getData() {
            (0, _fetch.getData)(_urls.urls.topStories());
        }
    }, {
        key: "router",
        value: function router() {

            var url = window.location;
        }
    }]);

    return App;
}();

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded");

    var appEl = document.getElementById("app");
    new App(appEl);
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Nav = exports.Nav = function () {
    function Nav(el) {
        _classCallCheck(this, Nav);

        this.nav = el;
        this.links = this.nav.querySelectorAll(".nav-link");

        this.init();
    }

    _createClass(Nav, [{
        key: "init",
        value: function init() {
            this._events();
        }
    }, {
        key: "_events",
        value: function _events() {

            this.links.forEach(function (link) {

                link.addEventListener("click", function (ev) {

                    ev.preventDefault();
                    var href = ev.target.getAttribute("href");

                    history.pushState({}, "prueba", href);

                    // let event = new CustomEvent("route", { bubbles: true, cancelable: true, detail: href})
                    // this.nav.dispatchEvent(event);
                });
            });
        }
    }]);

    return Nav;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getComments = exports.getData = exports.createRequest = undefined;

var _urls = __webpack_require__(0);

var _domApi = __webpack_require__(1);

var _article = __webpack_require__(6);

var _comment = __webpack_require__(8);

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
    var listEl = (0, _domApi.list)({ "class": "c-list" });

    var request = createRequest(url);

    fetch(request).then(function (response) {

        if (response.status !== 200) {
            console.log("There was an error: " + response.status);
            return;
        }

        response.json().then(function (data) {
            var ids = data.slice(0, 10);

            ids.map(function (id) {
                listEl.appendChild((0, _article.articleElement)(id));
            });

            document.querySelector(".app-content").appendChild(listEl);
        });
    }).catch(function (err) {
        console.log("error", err);
    });
};

var getComments = exports.getComments = function getComments(url) {
    console.log("getComments");
    console.log(url);

    var listComments = (0, _domApi.list)({ "class": "c-list" });
    var request = createRequest(url);

    fetch(request).then(function (response) {

        if (response.status !== 200) {
            console.log("There was an error: " + response.status);
            return;
        }

        response.json().then(function (data) {

            // console.log(commentElement());
            (0, _domApi.clearMainView)();

            data.comments.map(function (el) {
                // console.log(el.content)
                (0, _comment.commentElement)(el);
                listComments.appendChild((0, _comment.commentElement)(el));
            });

            document.querySelector(".app-content").appendChild(listComments);
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

var _domApi = __webpack_require__(1);

var _urls = __webpack_require__(0);

var articleElement = exports.articleElement = function articleElement(data) {
    return (0, _domApi.article)({ "class": "c-list__item" }, "<a class=\"title-link\" href=\"" + data.url + "\" target=\"_blank\" rel=\"noopener\">" + data.title + "</a><div class=\"c-item-info\"><span>" + data.points + " points</span><span>by " + data.user + "</span><span>" + data.time_ago + "</span><span>| <a class=\"comments-link\" href=\"" + _urls.urls.item(data.id) + "\">" + data.comments_count + " comments</a></span></div>");
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.commentElement = undefined;

var _domApi = __webpack_require__(1);

var commentElement = exports.commentElement = function commentElement(data) {
    console.log("data", data);
    return (0, _domApi.div)({ "class": "c-comment" }, "<div class=\"prueba\">\n            <div class=\"autor-time\"><span class=\"author\">" + data.user + "</span><span class=\"time\">" + data.time_ago + "</span></div>\n            <div>" + data.content + "</div>\n        </div>");
};

/***/ })
/******/ ]);