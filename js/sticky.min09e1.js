function generateStickyDebounce(t, e, i) {
    var s;
    return function() {
        var n = this,
            a = arguments,
            o = i && !s;
        clearTimeout(s), s = setTimeout(function() {
            s = null, i || t.apply(n, a)
        }, e), o && t.apply(n, a)
    }
}! function(t, e, i) {
    var s = function(s, n) {
        var a = 0,
            o = 0,
            r = "",
            l = 0,
            c = !1,
            d = !1,
            p = !1,
            f = !1,
            m = 0,
            h = 0,
            g = 0,
            u = 0,
            b = 0,
            v = t(),
            k = t("body"),
            y = 0,
            w = 0,
            C = 0,
            I = t(s).clone().css({
                visibility: "hidden",
                display: "none"
            }).attr({
                id: "sticky-placeholder",
                itemtype: null,
                itemscope: null
            }),
            H = t(),
            x = {
                top: 0,
                bottom: 0,
                custom: []
            },
            S = {
                scrollHide: !1,
                lazyHeight: 0,
                topMargin: "auto",
                keepInWrapper: !1,
                wrapperSelector: "",
                zIndex: 100,
                namespaceClass: "stuckElement",
                fixedClass: "isStuck",
                disableOn: function() {
                    return !0
                },
                transition: "none"
            },
            U = function() {
                var t = jQuery("#wpadminbar").length > 0 && "fixed" == jQuery("#wpadminbar").css("position") ? jQuery("#wpadminbar").outerHeight() : 0;
                return "auto" === S.topMargin ? parseInt(t + v.css("marginTop")) : isNaN(S.topMargin) && S.topMargin.search("px") > 0 ? parseInt(t + S.topMargin.replace("px", "")) : isNaN(parseInt(S.topMargin)) ? 0 : parseInt(t + S.topMargin)
            },
            z = function() {
                I.hide().removeClass(S.fixedClass).removeClass("sticky-navigation-transition"), v.removeClass(S.fixedClass).css({
                    "max-width": "",
                    "margin-top": "",
                    "margin-left": "",
                    "margin-right": "",
                    position: "",
                    top: "",
                    left: "",
                    right: "",
                    bottom: "",
                    width: "",
                    opacity: "",
                    height: "",
                    overflow: "",
                    "-webkit-transform": "",
                    "-ms-transform": "",
                    transform: "",
                    "-webkit-transition": "",
                    "-ms-transition": "",
                    transition: "",
                    visibility: ""
                }).removeClass("sticky-navigation-transition").removeClass("navigation-transition"), "sticky-navigation" === v.attr("id") && v.attr("id", "site-navigation"), c = !1, d = !1, p = !1, v.trigger("stickUp:unStick")
            },
            T = function(t) {
                I.show().addClass(S.fixedClass);
                var e = I.offsetParent();
                if (t) {
                    v.css({
                        position: "absolute"
                    });
                    var i = H.offset().top + H.outerHeight() - e.offset().top - h - parseInt(H.css("paddingBottom"))
                }
                v.css({
                    position: "absolute",
                    marginTop: w,
                    bottom: "",
                    left: I.position().left,
                    top: t ? i : v.offset().top - e.offset().top - w
                }), v.trigger("stickUp:holdIt")
            },
            M = function(s) {
                if (S.disableOn()) {
                    if (f && (f = !1), !S.keepInWrapper || H.is(":visible")) {
                        if (o = t(s.target).scrollTop(), r = o >= a ? "down" : "up", l = Math.abs(a - o), g = t(e).outerHeight(), o + g, a = o, u = v.offset().top, m = parseInt(v.outerHeight() + w) + parseInt(v.css("marginBottom")), c || p || d || (parseInt(v.outerHeight(!0)), d || p ? (x.top = parseInt(I.offset().top), parseInt(v.offset().left) + 5) : x.top = parseInt(v.offset().top)), h = parseInt(v.outerHeight()) + parseInt(v.css("margin-bottom")) + w, S.keepInWrapper ? x.bottom = H.offset().top + H.outerHeight() - parseInt(H.css("paddingBottom")) : x.bottom = t(i).outerHeight(), b = v.offset().top + h, C = S.scrollHide ? m + S.lazyHeight : S.lazyHeight, "none" !== S.transition && (y = 2 * v.outerHeight()), w = null !== S.topMargin ? U() : 0, c && w !== v.css("margin-top") && v.css("margin-top", w), (!c && !d && o >= x.top - w + C + y || d && p && o <= u - w + C) && (! function() {
                                c = !0, "fade" == S.transition && v.hide(), ("slide" == S.transition || S.scrollHide) && v.css({
                                    height: "0",
                                    overflow: "hidden",
                                    visibility: "hidden"
                                }), I.show().addClass(S.fixedClass), "left" != v.css("float") && "right" != v.css("float") || (I.css("float", v.css("float")), I.attr("style", I.attr("style") + "width:auto !important")), "slide" == S.transition && "block" == I.css("display") && v.css({
                                    "-webkit-transform": "translateY(-100%)",
                                    "-ms-transform": "translateY(-100%)",
                                    transform: "translateY(-100%)",
                                    "-webkit-transition": "transform 300ms ease-in-out",
                                    "-ms-transition": "transform 300ms ease-in-out",
                                    transition: "transform 300ms ease-in-out"
                                }), v.addClass(S.fixedClass), "site-navigation" === v.attr("id") && v.attr("id", "sticky-navigation");
                                var t = -C;
                                v.css({
                                    "margin-top": w,
                                    position: "fixed",
                                    top: t + "px",
                                    left: "",
                                    right: "",
                                    bottom: ""
                                }), v.trigger("stickUp:stickIt"), "fade" == S.transition && v.fadeIn(300), "slide" == S.transition && v.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function(t) {
                                    v.css({
                                        visibility: "",
                                        height: "",
                                        overflow: ""
                                    }), setTimeout(function() {
                                        v.css({
                                            "-webkit-transform": "translateY(0)",
                                            "-ms-transform": "translateY(0)",
                                            transform: "translateY(0)"
                                        })
                                    }, 10)
                                }), S.scrollHide && v.css({
                                    height: "",
                                    overflow: "",
                                    visibility: ""
                                })
                            }(), c = !0, d = !1, p = !1), c && !d && o >= x.top - w + C + v.outerHeight() / 2 && (I.addClass("sticky-navigation-transition"), v.addClass("sticky-navigation-transition")), S.keepInWrapper && parseInt(b - w) !== parseInt(x.bottom) && o >= x.bottom - h + C && (T(!0), c = !1, d = !0, p = !0), c) {
                            var n = parseInt(v.css("top"));
                            if ("up" === r && 0 !== n) {
                                var k = l > -n ? 0 : n + l;
                                v.css("top", k + "px")
                            } else if ("down" === r && n > -C) {
                                k = l > C + n ? -C : n - l;
                                v.css("top", k + "px")
                            }
                        }(c || p || d) && o <= x.top - w && z(), (c || p || d) && I.width() !== v.outerWidth() && v.outerWidth(I.outerWidth())
                    }
                } else f || (z(), f = !0)
            },
            E = function(t) {
                p && (T(), d = !1), M(t)
            };
        (function(s, n) {
            v = t(s), I.remove(), v.after(I), t(".gen-sidebar-nav").length && I.css("height", v.outerHeight()), v.addClass(S.namespaceClass), n && t.extend(!0, S, n), w = null !== S.topMargin ? U() : 0, S.lazyHeight && (w += S.lazyHeight), S.keepInWrapper ? ("" !== S.wrapperSelector && (H = v.closest(S.wrapperSelector)), H.length || (H = v.parent())) : H = k, S.zIndex && v.css("z-index", S.zIndex), t(e).on("scroll.stickUp", M), t(e).on("resize.stickUp", E), M({
                target: i
            })
        }).call(this, s, n), t(s).on("stickUp:detach", function(i) {
            (v = t(this)).removeClass(S.namespaceClass), I.remove(), v.removeClass(S.fixedClass).css({
                maxWidth: "",
                marginTop: "",
                marginLeft: "",
                marginRight: "",
                position: "",
                top: "",
                left: "",
                right: "",
                bottom: "",
                width: ""
            }), c = !1, d = !1, p = !1, f = !0, t(e).off("scroll.stickUp", M), t(e).off("resize.stickUp", E)
        })
    };
    t.fn.stickUp = function(t) {
        return this.each(function() {
            new s(this, t)
        })
    }
}(jQuery, window, document),
function(t) {
    t.fn.GenerateSimpleSticky = function(e) {
        var i = t.extend({
                menu: t(this),
                parent: !1,
                scrollHide: !1,
                offsetElement: "#wpadminbar",
                disableOn: function() {
                    return !0
                },
                transition: "none"
            }, e),
            s = t("body"),
            n = null;
        n = i.parent ? i.parent : i.menu.parent(), (i.menu.parents(".site-header").length > 0 || i.menu.parents(".lalita-page-header").length > 0) && (n = s), !s.hasClass("nav-right-sidebar") && !s.hasClass("nav-left-sidebar") || t(".menu-toggle").is(":visible") || (i.menu = t(".gen-sidebar-nav"), n = t(".site-content"), i.menu.children().hasClass("auto-hide-sticky")), jQuery(i.offsetElement).length > 0 && "fixed" == jQuery(i.offsetElement).css("position") && jQuery(i.offsetElement).outerHeight();
        var a = {
            scrollHide: i.scrollHide,
            keepInWrapper: !0,
            wrapperSelector: n,
            fixedClass: "is_stuck navigation-stick navigation-clone",
            topMargin: 0,
            disableOn: i.disableOn,
            transition: i.transition
        };
        i.menu.stickUp(a)
    }
}(jQuery), jQuery(document).ready(function(t) {
    window;
    var e = t("body"),
        i = "none";
    if (e.hasClass("sticky-enabled")) {
        var s = t("#site-navigation");
        e.hasClass("sticky-menu-fade") && (i = "fade"), e.hasClass("sticky-menu-slide") && (i = "slide");
        var n = {
            transition: i,
            scrollHide: !!s.hasClass("auto-hide-sticky"),
            disableOn: function() {
                var e = t("body"),
                    i = t("#mobile-header"),
                    s = t(".menu-toggle");
                return !(e.hasClass("desktop-sticky-menu") && s.is(":visible") || e.hasClass("mobile-sticky-menu") && !s.is(":visible") || e.hasClass("mobile-header") && i.is(":visible"))
            }
        };
        t(s).GenerateSimpleSticky(n), e.on("lalita_navigation_location_updated", function() {
            s.trigger("stickUp:detach"), setTimeout(function() {
                t(s).GenerateSimpleSticky(n)
            }, 250)
        })
    }
    if (e.hasClass("mobile-header") && e.hasClass("mobile-header-sticky")) {
        var a = t("#mobile-header");
        a.GenerateSimpleSticky({
            scrollHide: !!a.data("auto-hide-sticky"),
            disableOn: function() {
                return !!a.is(":visible")
            }
        })
    }
    var o = t(".sidebar-nav-mobile"),
        r = t(".gen-sidebar-nav"),
        l = t(window).width(),
        c = generateStickyDebounce(function() {
            l !== t(window).width() && (o.is(":visible") && (r.trigger("stickUp:detach"), o.trigger("stickUp:detach"), o.GenerateSimpleSticky(n)), r.is(":visible") && (o.trigger("stickUp:detach"), r.trigger("stickUp:detach"), r.GenerateSimpleSticky(n)))
        }, 250);
    o.length && (window.addEventListener("resize", c), window.addEventListener("orientationchange", c)), navigator.userAgent.match(/(iPod|iPhone|iPad)/) && (e.hasClass("sticky-enabled") || e.hasClass("mobile-header") && e.hasClass("mobile-header-sticky")) && t(document).on("focus", ".navigation-stick .search-field", function() {
        t("html, body").animate({
            scrollTop: 0
        }, "fast")
    })
});