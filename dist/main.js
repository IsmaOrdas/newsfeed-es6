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

var article = exports.article = createEl("li");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var apiHost = "https://hacker-news.firebaseio.com/v0";

var urls = exports.urls = {
    "topStories": function topStories() {
        return apiHost + "/topstories.json";
    },
    "item": function item(id) {
        return apiHost + "/item/" + id + ".json";
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
module.exports = __webpack_require__(6);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _domApi = __webpack_require__(0);

var _urls = __webpack_require__(1);

var _fetch = __webpack_require__(4);

var fetchUtils = _interopRequireWildcard(_fetch);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initApp = function initApp() {
    console.log(window.location.pathname);
};

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded");
    initApp();

    fetchUtils.getIds(_urls.urls.topStories());
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getItems = exports.getIds = exports.createRequest = undefined;

var _urls = __webpack_require__(1);

var _domApi = __webpack_require__(0);

var _article = __webpack_require__(5);

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

var getIds = exports.getIds = function getIds(url) {

    var request = createRequest(url);

    fetch(request).then(function (resp) {
        return resp.json();
    }).then(function (data) {
        return data.slice(0, 10);
    }).then(function (ids) {
        // let 
        for (var i = 0; i < ids.length; i++) {

            getItems(_urls.urls.item(ids[i]));
        }
    }).catch(function (err) {
        console.log("error");
    });
};

var getItems = exports.getItems = function getItems(url) {

    var request = createRequest(url);

    fetch(request).then(function (resp) {
        return resp.json();
    }).then(function (data) {
        console.log(data);
        console.log((0, _article.articleElement)(data));
    }).catch(function (err) {
        console.log("error");
    });
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.articleElement = undefined;

var _domApi = __webpack_require__(0);

var articleElement = exports.articleElement = function articleElement(data) {
    var ar = (0, _domApi.article)({ "class": "c-list__item" }, "<a href=\"" + data.url + "\">" + data.title + "</a><div class=\"c-item-info\"><span>points</span><span>by author</span><span>hour ago</span></div>");
    // console.log(ar);
    return ar;
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);