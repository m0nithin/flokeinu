/(trident|msie)/i.test(navigator.userAgent) && document.getElementById && window.addEventListener && window.addEventListener("hashchange", function() {
        var e, t = location.hash.substring(1);
        /^[A-z0-9_-]+$/.test(t) && (e = document.getElementById(t)) && (/^(?:a|select|input|button|textarea)$/i.test(e.tagName) || (e.tabIndex = -1), e.focus())
    }, !1),
    function(e) {
        var t = e.createElement("STYLE"),
            n = "addEventListener" in e,
            s = function(t, s) {
                n ? e.addEventListener(t, s) : e.attachEvent("on" + t, s)
            },
            o = function(e) {
                t.styleSheet ? t.styleSheet.cssText = e : t.innerHTML = e
            };
        e.getElementsByTagName("HEAD")[0].appendChild(t), s("mousedown", function() {
            o(":focus{outline:0}::-moz-focus-inner{border:0;}")
        }), s("keydown", function() {
            o("")
        })
    }(document),
    function() {
        "use strict";
        if ("querySelector" in document && "addEventListener" in window && document.body.classList.contains("dropdown-hover"))
            for (var e = document.querySelectorAll("nav ul a"), t = document.querySelectorAll(".sf-menu .menu-item-has-children"), n = function() {
                    if (!this.closest("nav").classList.contains("toggled") && !this.closest("nav").classList.contains("slideout-navigation"))
                        for (var e = this; - 1 === e.className.indexOf("main-nav");) "li" === e.tagName.toLowerCase() && (-1 !== e.className.indexOf("sfHover") ? e.className = e.className.replace(" sfHover", "") : e.className += " sfHover"), e = e.parentElement
                }, s = 0; s < e.length; s++) e[s].addEventListener("focus", n), e[s].addEventListener("blur", n);
        if ("touchend" in document.documentElement)
            for (s = 0; s < t.length; s++) t[s].addEventListener("touchend", function(e) {
                if (!t[s].closest("nav").classList.contains("toggled") && 1 === e.touches.length && (e.stopPropagation(), !this.classList.contains("sfHover"))) {
                    e.target !== this && e.target.parentNode !== this || e.preventDefault();
                    var n = t[s].closest("nav").querySelectorAll("ul.toggled-on");
                    if (n && !this.closest("ul").classList.contains("toggled-on") && !this.closest("li").classList.contains("sfHover"))
                        for (var o = 0; o < n.length; o++) n[o].classList.remove("toggled-on"), n[o].closest("li").classList.remove("sfHover");
                    this.classList.add("sfHover"), document.addEventListener("touchend", closeDropdown = function(e) {
                        e.stopPropagation(), this.classList.remove("sfHover"), document.removeEventListener("touchend", closeDropdown)
                    })
                }
            }, !0)
    }();