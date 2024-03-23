function Parallax(a) {
    jQuery(document).ready(function(e) {
        return a = a || {}, this.nameSpaces = {
            wrapper: a.wrapper || ".wpkoi-parallax-section",
            layers: a.layers || ".wpkoi-parallax-section__mouse-layout .wpkoi-parallax-section__image",
            deep: a.deep || "data-parallax-deep",
            scale: a.scale || "data-parallax-scale"
        }, this.init = function() {
            for (var a = this, e = document.querySelectorAll(this.nameSpaces.wrapper), l = 0; l < e.length; l++) ! function(l) {
                e[l].addEventListener("mousemove", function(t) {
                    for (var o = t.clientX, i = t.clientY, r = e[l].querySelectorAll(a.nameSpaces.layers), n = 0; n < r.length; n++) ! function(e) {
                        var l = r[e].getAttribute(a.nameSpaces.deep),
                            t = r[e].getAttribute(a.nameSpaces.scale),
                            t = t / 100,
                            n = r[e].getAttribute("data-parallax-disallow"),
                            s = n && "x" === n ? 0 : o / l - 10,
                            p = n && "y" === n ? 0 : i / l - 10;
                        n && "both" === n || (r[e].style.transform = "translateX(" + s + "%) translateY(" + p + "%) scale(" + t + ")", r[e].style.transitionDuration = "0s")
                    }(n)
                }), e[l].addEventListener("mouseleave", function(t) {
                    for (var o = e[l].querySelectorAll(a.nameSpaces.layers), i = 0; i < o.length; i++) ! function(e) {
                        var l = o[e].getAttribute(a.nameSpaces.scale),
                            l = l / 100,
                            t = o[e].getAttribute("data-parallax-disallow");
                        t && "both" === t || (o[e].style.transform = "translateX(0%) translateY(0%) scale(" + l + ")", o[e].style.transitionDuration = "0.5s")
                    }(i)
                })
            }(l)
        }, this.init(), this
    })
}! function(a, e) {
    "use strict";
    var l = {
        init: function() {
            e.hooks.addAction("frontend/element_ready/section", l.elementorSection)
        },
        elementorSection: function(a) {
            var l = null;
            e.isEditMode(), (l = new wpkoiSectionParallax(a)).init()
        }
    };
    a(window).on("elementor/frontend/init", l.init), window.wpkoiSectionParallax = function(l) {
        var t = this,
            o = l.data("id"),
            i = !1,
            r = Boolean(e.isEditMode()),
            n = a(window),
            s = (a("body"), []),
            p = n.scrollTop(),
            c = n.height(),
            u = (navigator.userAgent.match(/Version\/[\d\.]+.*Safari/), navigator.platform);
        t.init = function() {
            if (!(i = r ? t.generateEditorSettings(o) : wpkoiElements.wpkoiParallaxSections[o] || !1)) return !1;
            l.addClass("wpkoi-parallax-section"), t.generateLayouts(), 0 !== s.length && n.on("scroll.wpkoiSectionParallax resize.wpkoiSectionParallax", t.scrollHandler), t.scrollUpdate()
        }, t.generateEditorSettings = function(e) {
            var l = null,
                t = {};
            return !!window.elementor.hasOwnProperty("elements") && !!(l = window.elementor.elements).models && (a.each(l.models, function(a, l) {
                e == l.id && (t = l.attributes.settings.attributes)
            }), !!t.hasOwnProperty("wpkoi_parallax_layout_image") && 0 !== Object.keys(t).length && {
                wpkoi_parallax_layout_list: {
                    imageData: t.wpkoi_parallax_layout_image || "",
                    wpkoi_parallax_layout_image: t.wpkoi_parallax_layout_image || "",
                    wpkoi_parallax_layout_speed: t.wpkoi_parallax_layout_speed || 50,
                    wpkoi_parallax_layout_type: t.wpkoi_parallax_layout_type || "scroll",
                    wpkoi_parallax_layout_scale: t.wpkoi_parallax_layout_scale || 100,
                    wpkoi_parallax_layout_bg_x: t.wpkoi_parallax_layout_bg_x || 50,
                    wpkoi_parallax_layout_bg_y: t.wpkoi_parallax_layout_bg_y || 50,
                    wpkoi_parallax_layout_z_index: t.wpkoi_parallax_layout_z_index || "",
                    wpkoi_parallax_layout_bg_size: t.wpkoi_parallax_layout_bg_size || "auto",
                    wpkoi_parallax_layout_animation_prop: t.wpkoi_parallax_layout_animation_prop || "transform"
                }
            })
        }, t.generateLayouts = function() {
            a(".wpkoi-parallax-section__layout", l).remove(), a.each(i, function(e, t) {
                if (void 0 === t.wpkoi_parallax_layout_scale) var o = 100;
                else var o = t.wpkoi_parallax_layout_scale.size;
                var i = t.wpkoi_parallax_layout_image,
                    r = o,
                    n = t.wpkoi_parallax_layout_z_index,
                    p = t.wpkoi_parallax_layout_bg_size || "auto",
                    c = t.wpkoi_parallax_layout_animation_prop || "bgposition",
                    d = t.wpkoi_parallax_layout_bg_x,
                    x = t.wpkoi_parallax_layout_bg_y,
                    y = t.wpkoi_parallax_layout_type || "none",
                    k = t.wpkoi_parallax_layout_on || ["desktop", "tablet"],
                    w = "koi55555",
                    g = null,
                    m = {},
                    f = "MacIntel" == u ? " is-mac" : "",
                    $ = elementorFrontend.getCurrentDeviceMode();
                if ("" == i.url) return !1;
                g = "mouse" == y ? a('<div id="' + w + '" class="wpkoi-parallax-section__layout wpkoi-parallax-section__' + y + "-layout" + f + '"><div class="wpkoi-parallax-section__image" data-parallax-deep=50 data-parallax-scale=' + r + ' style="transform: scale(' + r / 100 + ');transition-duration: 0.3s;"></div></div>').prependTo(l).css({
                    "z-index": n
                }) : "matrix" == y ? a('<div id="' + w + '" class="wpkoi-parallax-section__layout wpkoi-parallax-section__' + y + "-layout" + f + '"><img src="' + i.url + '" ></div>').prependTo(l).css({
                    "z-index": n
                }) : a('<div id="' + w + '" class="wpkoi-parallax-section__layout wpkoi-parallax-section__' + y + "-layout" + f + '"><div class="wpkoi-parallax-section__image"></div></div>').prependTo(l).css({
                    "z-index": n
                }), a("> .wpkoi-parallax-section__image", g).css({
                    "background-image": "url(" + i.url + ")",
                    "background-size": p,
                    "background-position-x": d + "%",
                    "background-position-y": x + "%"
                }), -1 !== k.indexOf($) || a(g).css({
                    display: "none"
                }), m = {
                    selector: g,
                    image: i.url,
                    size: p,
                    prop: c,
                    type: y,
                    device: k,
                    xPos: d,
                    yPos: x,
                    speed: 1
                }, "none" !== y && ("scroll" === y || "zoom" === y) && s.push(m), "matrix" == y && a("#" + w).logosDistort({
                    effectWeight: 5
                })
            })
        }, t.scrollHandler = function(a) {
            p = n.scrollTop(), c = n.height(), t.scrollUpdate()
        }, t.scrollUpdate = function() {
            a.each(s, function(e, l) {
                var t = l.selector,
                    o = a(".wpkoi-parallax-section__image", t),
                    i = l.speed,
                    r = t.offset().top,
                    n = t.outerHeight(),
                    s = (l.prop, l.type),
                    u = (p - r + c) / n * 100,
                    d = elementorFrontend.getCurrentDeviceMode();
                if (-1 == l.device.indexOf(d)) return o.css({
                    transform: "translateY(0)",
                    "background-position-y": l.yPos
                }), !1;
                switch (p < r - c && (u = 0), p > r + n && (u = 200), u = parseFloat(i * u).toFixed(1), s) {
                    case "scroll":
                        "bgposition" === l.prop ? o.css({
                            "background-position-y": "calc(" + l.yPos + "% + " + u + "px)"
                        }) : o.css({
                            transform: "translateY(" + u + "px)"
                        });
                        break;
                    case "zoom":
                        var x = (p - r + c) / c * i;
                        x += 1, o.css({
                            transform: "scale(" + x + ")"
                        })
                }
            })
        }
    }
}(jQuery, window.elementorFrontend), jQuery(document).ready(function(a) {
    new Parallax
});