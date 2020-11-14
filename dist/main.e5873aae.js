// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $lastLi = $(".lastLi");
/**
 * 每次加载网页时，从localstorage中加载用户之前保留的所有网址
 */

var userSite = localStorage.getItem("userSite");
var userSiteObject = JSON.parse(userSite);
/**
 * userSiteObject如果为空，初始化一下
 */

var hashMap = userSiteObject || [{
  logo: "A",
  logoType: "text",
  url: "https://www.acfun.cn",
  link: "acfun.cn"
}, {
  logo: "B",
  logoType: "text",
  url: "https://bilibili.com",
  link: "bilibili.com"
}];
render();
/**
 * 渲染 hashmap 功能
 */

function render() {
  //清空 ul下面的所有li，除了最后一个li，因为最后一个li是添加按钮
  $(".siteList").find("li:not(.lastLi)").remove();
  hashMap.forEach(function (node, index) {
    var $li = $("<li>\n            <div class=\"site\">\n                  <div class=\"close\">\n                  <svg class=\"icon delete\">\n                        <use xlink:href=\"#icon-delete\"></use>\n                  </svg>\n                  </div>\n                  <div class=\"logo\">".concat(node.logo[0].toUpperCase(), "</div>\n                  <div class=\"link\">").concat(node.link, "</div>\n              </div>\n    </li>")).insertBefore($lastLi);
    $li.on("click", function () {
      window.open(node.url);
    });
    $li.on("click", ".close", function (e) {
      //点击 close 的时候，阻止冒泡
      e.stopPropagation();
      removeSite(index);
      render();
    });
  });
}
/**
 *  简化URL功能
 */


function simplifyUrl(url) {
  return url.replace("https://", "").replace("http://", "").replace("www.", "").replace(/\/.*/, "");
}
/**
 * 添加网站功能
 */


$(".addButton").on("click", function () {
  var newUrl = window.prompt("请输入网址"); //如果不是以http开头，帮助用户添加前缀

  if (newUrl.indexOf("http") !== 0) {
    newUrl = "https://" + newUrl;
  }

  hashMap.push({
    logo: newUrl[8].toUpperCase(),
    logoType: "text",
    url: newUrl,
    link: simplifyUrl(newUrl)
  });
  console.log(hashMap);
  render();
});
/*
    当用户关闭，或跳转到其他网站时，保留用户所有网址到localstorage
 */

window.onbeforeunload = function () {
  var str = JSON.stringify(hashMap); //localStorage.clear()

  localStorage.setItem("userSite", str);
};
/**
 * 删除功能
 */


function removeSite(index) {
  hashMap.splice(index, 1);
}
/**
 * 监听键盘事件，快捷跳转页面
 */


$(document).on("keypress", function (e) {
  var key = e.key;

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.e5873aae.js.map