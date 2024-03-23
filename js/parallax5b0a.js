/*! UIkit 2.27.5 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */ ! function(e) {
    var t;
    window.UIkit2 && (t = e(UIkit2)), "function" == typeof define && define.amd && define("uikit-parallax", ["uikit"], function() {
        return t || e(UIkit2)
    })
}(function(e) {
    "use strict";
    var t = [],
        a = !1,
        r = 0,
        i = window.innerHeight,
        n = function() {
            r = e.$win.scrollTop(), window.requestAnimationFrame(function() {
                for (var e = 0; e < t.length; e++) t[e].process()
            })
        };
    e.component("parallax", {
        defaults: {
            velocity: .5,
            target: !1,
            viewport: !1,
            media: !1
        },
        boot: function() {
            a = function() {
                var e, t = document.createElement("div"),
                    a = {
                        WebkitTransform: "-webkit-transform",
                        MSTransform: "-ms-transform",
                        MozTransform: "-moz-transform",
                        Transform: "transform"
                    };
                for (var r in document.body.insertBefore(t, null), a) void 0 !== t.style[r] && (t.style[r] = "translate3d(1px,1px,1px)", e = window.getComputedStyle(t).getPropertyValue(a[r]));
                return document.body.removeChild(t), void 0 !== e && e.length > 0 && "none" !== e
            }(), e.$doc.on("scrolling.uk.document", n), e.$win.on("load resize orientationchange", e.Utils.debounce(function() {
                i = window.innerHeight, n()
            }, 50)), e.ready(function(t) {
                e.$("[data-uk-parallax]", t).each(function() {
                    var t = e.$(this);
                    t.data("parallax") || e.parallax(t, e.Utils.options(t.attr("data-uk-parallax")))
                })
            })
        },
        init: function() {
            this.base = this.options.target ? e.$(this.options.target) : this.element, this.props = {}, this.velocity = this.options.velocity || 1;
            var a = ["target", "velocity", "viewport", "plugins", "media"];
            Object.keys(this.options).forEach(function(e) {
                if (-1 === a.indexOf(e)) {
                    var t, r, i, n, s = String(this.options[e]).split(",");
                    e.match(/color/i) ? (t = s[1] ? s[0] : this._getStartValue(e), r = s[1] ? s[1] : s[0], t || (t = "rgba(255,255,255,0)")) : (n = (t = parseFloat(s[1] ? s[0] : this._getStartValue(e))) < (r = parseFloat(s[1] ? s[1] : s[0])) ? r - t : t - r, i = t < r ? 1 : -1), this.props[e] = {
                        start: t,
                        end: r,
                        dir: i,
                        diff: n
                    }
                }
            }.bind(this)), t.push(this)
        },
        process: function() {
            if (this.options.media) switch (typeof this.options.media) {
                case "number":
                    if (window.innerWidth < this.options.media) return !1;
                    break;
                case "string":
                    if (window.matchMedia && !window.matchMedia(this.options.media).matches) return !1
            }
            var e = this.percentageInViewport();
            !1 !== this.options.viewport && (e = 0 === this.options.viewport ? 1 : e / this.options.viewport), this.update(e)
        },
        percentageInViewport: function() {
            var e, t, a = this.base.offset().top,
                n = this.base.outerHeight();
            return a > r + i ? t = 0 : a + n < r ? t = 1 : a + n < i ? t = (r < i ? r : r - i) / (a + n) : (e = r + i - a, t = Math.round(e / ((i + n) / 100)) / 100), t
        },
        update: function(t) {
            var r, i, n = {
                    transform: "",
                    filter: ""
                },
                s = t * (1 - (this.velocity - this.velocity * t));
            s < 0 && (s = 0), s > 1 && (s = 1), void 0 !== this._percent && this._percent == s || (Object.keys(this.props).forEach(function(c) {
                switch (r = this.props[c], 0 === t ? i = r.start : 1 === t ? i = r.end : void 0 !== r.diff && (i = r.start + r.diff * s * r.dir), "bg" != c && "bgp" != c || this._bgcover || (this._bgcover = function(t, a, r) {
                    var i, n, s, o, c, l, p, f = new Image;
                    return n = t.element.css({
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat"
                    }), i = n.css("background-image").replace(/^url\(/g, "").replace(/\)$/g, "").replace(/("|')/g, ""), o = function() {
                        var e = n.innerWidth(),
                            i = n.innerHeight(),
                            o = "bg" == a ? r.diff : r.diff / 100 * i;
                        if (i += o, (e += Math.ceil(o * c)) - o < s.w && i < s.h) return t.element.css({
                            backgroundSize: "auto"
                        });
                        e / c < i ? (l = Math.ceil(i * c), p = i, i > window.innerHeight && (l *= 1.2, p *= 1.2)) : (l = e, p = Math.ceil(e / c)), n.css({
                            backgroundSize: l + "px " + p + "px"
                        }).data("bgsize", {
                            w: l,
                            h: p
                        })
                    }, f.onerror = function() {}, f.onload = function() {
                        s = {
                            w: f.width,
                            h: f.height
                        }, c = f.width / f.height, e.$win.on("load resize orientationchange", e.Utils.debounce(function() {
                            o()
                        }, 50)), o()
                    }, f.src = i, !0
                }(this, c, r)), c) {
                    case "x":
                        n.transform += a ? " translate3d(" + i + "px, 0, 0)" : " translateX(" + i + "px)";
                        break;
                    case "xp":
                        n.transform += a ? " translate3d(" + i + "%, 0, 0)" : " translateX(" + i + "%)";
                        break;
                    case "y":
                        n.transform += a ? " translate3d(0, " + i + "px, 0)" : " translateY(" + i + "px)";
                        break;
                    case "yp":
                        n.transform += a ? " translate3d(0, " + i + "%, 0)" : " translateY(" + i + "%)";
                        break;
                    case "rotate":
                        n.transform += " rotate(" + i + "deg)";
                        break;
                    case "scale":
                        n.transform += " scale(" + i + ")";
                        break;
                    case "bg":
                        n["background-position"] = "50% " + i + "px";
                        break;
                    case "bgp":
                        n["background-position"] = "50% " + i + "%";
                        break;
                    case "color":
                    case "background-color":
                    case "border-color":
                        n[c] = (l = r.start, p = r.end, f = s, l = o(l), p = o(p), function(e, t, a) {
                            var r = "rgba(" + parseInt(e[0] + a * (t[0] - e[0]), 10) + "," + parseInt(e[1] + a * (t[1] - e[1]), 10) + "," + parseInt(e[2] + a * (t[2] - e[2]), 10) + "," + (e && t ? parseFloat(e[3] + a * (t[3] - e[3])) : 1);
                            return r += ")"
                        }(l, p, f = f || 0));
                        break;
                    case "blur":
                        n.filter += " blur(" + i + "px)";
                        break;
                    case "hue":
                        n.filter += " hue-rotate(" + i + "deg)";
                        break;
                    case "grayscale":
                        n.filter += " grayscale(" + i + "%)";
                        break;
                    case "invert":
                        n.filter += " invert(" + i + "%)";
                        break;
                    case "fopacity":
                        n.filter += " opacity(" + i + "%)";
                        break;
                    case "saturate":
                        n.filter += " saturate(" + i + "%)";
                        break;
                    case "sepia":
                        n.filter += " sepia(" + i + "%)";
                        break;
                    default:
                        n[c] = i
                }
                var l, p, f
            }.bind(this)), n.filter && (n["-webkit-filter"] = n.filter), this.element.css(n), this._percent = s)
        },
        _getStartValue: function(e) {
            var t = 0;
            switch (e) {
                case "scale":
                    t = 1;
                    break;
                default:
                    t = this.element.css(e)
            }
            return t || 0
        }
    });
    var s = {
        black: [0, 0, 0, 1],
        blue: [0, 0, 255, 1],
        brown: [165, 42, 42, 1],
        cyan: [0, 255, 255, 1],
        fuchsia: [255, 0, 255, 1],
        gold: [255, 215, 0, 1],
        green: [0, 128, 0, 1],
        indigo: [75, 0, 130, 1],
        khaki: [240, 230, 140, 1],
        lime: [0, 255, 0, 1],
        magenta: [255, 0, 255, 1],
        maroon: [128, 0, 0, 1],
        navy: [0, 0, 128, 1],
        olive: [128, 128, 0, 1],
        orange: [255, 165, 0, 1],
        pink: [255, 192, 203, 1],
        purple: [128, 0, 128, 1],
        violet: [128, 0, 128, 1],
        red: [255, 0, 0, 1],
        silver: [192, 192, 192, 1],
        white: [255, 255, 255, 1],
        yellow: [255, 255, 0, 1],
        transparent: [255, 255, 255, 0]
    };

    function o(e) {
        var t;
        return (t = /#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(e)) ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16), 1] : (t = /#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(e)) ? [17 * parseInt(t[1], 16), 17 * parseInt(t[2], 16), 17 * parseInt(t[3], 16), 1] : (t = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(e)) ? [parseInt(t[1]), parseInt(t[2]), parseInt(t[3]), 1] : (t = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(e)) ? [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3], 10), parseFloat(t[4])] : s[e] || [255, 255, 255, 0]
    }
    return e.parallax
});