! function(t, e) {
    function i(e, i) {
        if (!e) throw Error("No element provided.");
        var s = this;
        this.options = {
                enable: !0,
                effectWeight: 1,
                enableSmoothing: !0,
                smoothingMultiplier: 1,
                activeOnlyInside: !1,
                outerBuffer: 1.1,
                elementDepth: 140,
                perspectiveMulti: 1,
                directions: [1, 1, 1, 1, -1, -1, 1, 1],
                weights: [31e-6, 18e-5, 164e-7, 19e-7, 12e-5],
                container: t,
                depthOverride: !1,
                mouseMode: "container",
                cssClasses: {
                    smartContainer: "ld-smart-container",
                    overlapContainer: "ld-overlap-container",
                    parent3d: "ld-3d-parent",
                    transformTarget: "ld-transform-target",
                    active: "ld-transform-active",
                    object3d: "ld-3d-object"
                },
                beforeInit: function() {},
                onInit: function() {},
                onDestroy: function() {},
                onResize: function() {}
            },
            function t(e, i) {
                for (var n in i) i.hasOwnProperty(n) && (e[n] = i[n])
            }(s.options, i), this.elements = e, this.eventCache = [], this.elements[0] ? (this.elements = [].slice.call(this.elements), this.elements.forEach(function(t) {
                t.distort = new n(t, s.options)
            })) : this.elements.distort = new n(e, s.options), this.addHandlers()
    }

    function n(t, e) {
        this._name = "logosDistort", this.options = e, this.element = t, this.eventCache = [], "self" === this.options.container ? (this.containerOverride = !0, this.options.container = this.element) : this.containerOverride = !1, this.container = this.options.container, this.rect = this._getBoundingClientRect(this.container), this.width = this.rect.width, this.height = this.rect.height, this.center = this.getCenterOfContainer(), this.outerCon = null, this.outerConParent = null, this.transformTarget = null, this.objects3d = null, this.mouseX = this.mouseY = 0, this.effectX = this.effectY = 0, this.has3dSupport = this._has3d(), this.paused = !1, this.options.beforeInit(this), this.init()
    }
    i.prototype.addHandlers = function() {
        var t = this;

        function e() {
            t.elements[0] ? t.elements.forEach(function(t) {
                t.distort.detectVisable()
            }) : t.elements.distort.detectVisable()
        }
        window.addEventListener ? (this._addEvent(window, "DOMContentLoaded", e), this._addEvent(window, "load", e), this._addEvent(window, "scroll", e), this._addEvent(window, "resize", e)) : window.attachEvent && (this._addEvent(window, "onDOMContentLoaded", e), this._addEvent(window, "onload", e), this._addEvent(window, "onscroll", e), this._addEvent(window, "onresize", e)), "container" === this.options.mouseMode ? this.elements[0] ? this._addEvent(window, "mousemove", function(e) {
            t.patchEvent(e), t.elements.forEach(function(t) {
                var i = Math.abs(e.x - t.distort.center.x);
                Math.abs(e.y - t.distort.center.y) < t.distort.height / 2 && i < t.distort.width / 2 && (t.distort.mouseX = e.x, t.distort.mouseY = e.y)
            })
        }) : this._addEvent(window, "mousemove", function(e) {
            t.patchEvent(e);
            var i = Math.abs(e.x - t.elements.distort.center.x);
            Math.abs(e.y - t.elements.distort.center.y) < t.elements.distort.height / 2 && i < t.elements.distort.width / 2 && (t.elements.distort.mouseX = e.x, t.elements.distort.mouseY = e.y)
        }) : "window" === this.options.mouseMode ? this.elements[0] ? this._addEvent(window, "mousemove", function(e) {
            t.patchEvent(e), t.elements.forEach(function(t) {
                t.distort.mouseX = e.x, t.distort.mouseY = e.y
            })
        }) : this._addEvent(window, "mousemove", function(e) {
            t.patchEvent(e), t.elements.distort.mouseX = e.x, t.elements.distort.mouseY = e.y
        }) : "magnetic" === this.options.mouseMode && (this.elements[0] ? this._addEvent(window, "mousemove", function(e) {
            t.patchEvent(e), t.elements.forEach(function(t) {
                var i = Math.abs(e.x - t.distort.center.x);
                (Math.abs(e.y - t.distort.center.y) < t.distort.height / 2 || i < t.distort.width / 2) && (t.distort.mouseX = e.x, t.distort.mouseY = e.y)
            })
        }) : this._addEvent(window, "mousemove", function(e) {
            t.patchEvent(e);
            var i = Math.abs(e.x - t.elements.distort.center.x);
            (Math.abs(e.y - t.elements.distort.center.y) < t.elements.distort.height / 2 || i < t.elements.distort.width / 2) && (t.elements.distort.mouseX = e.x, t.elements.distort.mouseY = e.y)
        })), this.elements[0] ? this._addEvent(window, "resize", function() {
            t.elements.forEach(function(t) {
                t.distort.resizeHandler()
            })
        }) : this._addEvent(window, "resize", function(e) {
            t.elements.distort.resizeHandler()
        })
    }, i.prototype.patchEvent = function(t) {
        t.x || (t.x = t.clientX || t.layerX), t.y || (t.y = t.clientY || t.layerY)
    }, i.prototype.destroy = function() {
        this.clearEvents(), this.elements.forEach(function(t) {
            t.distort.destroy()
        })
    }, i.prototype._addEvent = function(t, e, i) {
        window.addEventListener ? t.addEventListener(e, i, !1) : window.attachEvent && (console.log("wep"), t.attachEvent(e, i)), this.eventCache.push({
            element: t,
            type: e,
            fn: i
        })
    }, i.prototype.clearEvents = function() {
        this.eventCache.forEach(function(t) {
            window.addEventListener ? t.element.removeEventListener(t.type, t.fn, !1) : window.attachEvent && t.element.detachEvent(t.type, t.fn)
        })
    }, n.prototype.init = function() {
        this.createEnvironment(), this.options.onInit(), this.detectVisable(), this.start()
    }, n.prototype.detectVisable = function() {
        this.rect = this._getBoundingClientRect(this.element), (0 === this.rect.width || 0 === this.rect.height) && (this.rect = this._getBoundingClientRect(this.container)), this.width = this.rect.width, this.height = this.rect.height, this.center = this.getCenterOfContainer(), this.visable = this._isElementInViewport()
    }, n.prototype.start = function() {
        var t = this;
        this.paused = !1, this.initialized = !1, this.has3dSupport && (this.drawInterval = setInterval(function() {
            t.draw()
        }, 16))
    }, n.prototype.stop = function() {
        this.paused = !0, clearInterval(this.drawInterval)
    }, n.prototype.draw = function() {
        this.visable && this.effectX !== this.mouseX && this.effectY !== this.mouseY && (this.options.enableSmoothing ? (this.effectX += (this.mouseX - this.effectX) / (20 * this.options.smoothingMultiplier), this.effectY += (this.mouseY - this.effectY) / (20 * this.options.smoothingMultiplier)) : (this.effectX = this.mouseX, this.effectY = this.mouseY), this.paused || this.changePerspective(this.transformTarget, this.effectX, this.effectY))
    }, n.prototype.changePerspective = function(t, e, i) {
        var n = this;
        requestAnimationFrame(function() {
            t.setAttribute("style", n.generateTransformString(e, i))
        })
    }, n.prototype.generateTransformString = function(t, e) {
        var i = this.calculateTransform(t, e);
        return "transform: matrix3d(" + i[0] + ", 0, " + i[1] + ", 0, " + i[2] + ", " + i[3] + ", " + i[4] + ", 0, " + i[5] + ", " + i[6] + ", " + i[7] + ", 0, 0, 0, 100, 1)"
    }, n.prototype.calculateTransform = function(t, e) {
        var i = [],
            n = this.options.directions,
            s = this.getDistanceFromCenter(t, e),
            o = this.getDistanceFromCenterX(e),
            r = this.getDistanceFromCenterY(t),
            h = this.getDistanceFromEdgeCenterAndCenter(s, o, r);
        return i.push(n[0] * (1 - this.applyTransform(s, 0) * this.options.effectWeight)), i.push(n[1] * (this.applyTransform(r, 1) * this.options.effectWeight)), i.push(n[2] * (this.applyTransform(h, 2) * this.options.effectWeight)), i.push(n[3] * (1 - this.applyTransform(s, 3) * this.options.effectWeight)), i.push(n[4] * (this.applyTransform(o, 4) * this.options.effectWeight)), i.push(n[5] * i[1]), i.push(n[6] * i[4]), i.push(n[7] * Math.abs(i[3])), i.forEach(function(t, e) {
            i[e] = t.toFixed(5)
        }), i
    }, n.prototype.applyTransform = function(t, e) {
        return t * this.options.weights[e]
    }, n.prototype.getDistanceFromCenter = function(t, e) {
        return this.getDistance2d(t, e, this.center.x, this.center.y)
    }, n.prototype.getDistanceFromCenterY = function(t) {
        return t - this.center.x / 2
    }, n.prototype.getDistanceFromCenterX = function(t) {
        return t - this.center.y / 2
    }, n.prototype.getDistanceFromEdgeCenterAndCenter = function(t, e, i) {
        return -(t / 100 * (e / 50) * (i / 50))
    }, n.prototype.getDistance2d = function(t, e, i, n) {
        return Math.sqrt(Math.pow(t - i, 2) + Math.pow(e - n, 2))
    }, n.prototype.createEnvironment = function() {
        var t = e.createDocumentFragment(),
            i = this;
        this.objects3d = this.element.children, this.objects3d = [].slice.call(this.objects3d), this.element.innerHTML = "", this.objects3d.forEach(function(t) {
            t.classList.add(i.options.cssClasses.object3d)
        }), this.outerConParent = e.createElement("div"), this.outerCon = e.createElement("div"), this.parent3d = e.createElement("div"), this.transformTarget = e.createElement("div"), this.objects3d.forEach(function(t) {
            i.transformTarget.appendChild(t)
        }), this.parent3d.appendChild(this.transformTarget), this.outerCon.appendChild(this.parent3d), this.outerConParent.appendChild(this.outerCon), t.appendChild(this.outerConParent), this.outerConParent.classList.add(this.options.cssClasses.smartContainer), this.outerCon.classList.add(this.options.cssClasses.overlapContainer), this.parent3d.classList.add(this.options.cssClasses.parent3d);
        var n = 9e3 * this.options.perspectiveMulti;
        this.parent3d.setAttribute("style", "perspective: " + n + "px;"), this.transformTarget.classList.add(this.options.cssClasses.transformTarget, this.options.cssClasses.active), this.element.appendChild(t), this.calculateOuterContainer(), this.calculate3dObjects()
    }, n.prototype.calculateOuterContainer = function() {
        var t = this.outerConParent.offsetWidth * this.options.outerBuffer,
            e = this.outerConParent.offsetHeight * this.options.outerBuffer,
            i = Math.abs((t - this.width) / 2),
            n = Math.abs((e - this.height) / 2);
        this.outerCon.setAttribute("style", "width:" + t.toFixed(2) + "px; height:" + e.toFixed(2) + "px; left: -" + i.toFixed(2) + "px; top: -" + n.toFixed(2) + "px;")
    }, n.prototype.calculate3dObjects = function() {
        var t = this;
        this.objects3d.forEach(function(e) {
            t.setImageDefaults(e)
        })
    }, n.prototype.setImageDefaults = function(t) {
        var e = this;
        "img" === t.tagName.toLowerCase() ? (t.onload = function() {
            return e.calculatePerspective(t)
        }, t.addEventListener("load", function() {
            return e.calculatePerspective(t)
        }), t.complete && e.calculatePerspective(t)) : e.calculatePerspective(t)
    }, n.prototype.calculatePerspective = function(t) {
        var e, i = Array.prototype.indexOf.call(t.parentNode.childNodes, t),
            n = 0,
            s = 0;
        this.objects3d.length > 4 && !this.options.depthOverride && (i -= this.objects3d.length / 2);
        var o = i * this.options.elementDepth;
        if (t.aspect) e = t.aspect;
        else {
            var r = this.getAspectRatio(),
                h = this.getAspectRatio(t);
            e = isNaN(h[0]) || "div" === t.tagName.toLowerCase() ? r : h, t.aspect = e
        }
        var a = (this.outerConParent.offsetHeight * this.options.outerBuffer).toFixed(2),
            c = (a * e[0]).toFixed(2);
        if (c < this.width * this.options.outerBuffer && (difference = this.width / c, c = (c * difference * this.options.outerBuffer).toFixed(2), a = (a * difference * this.options.outerBuffer).toFixed(2)), n = (Math.abs(c - this.width) - Math.abs(this.outerConParent.offsetWidth * this.options.outerBuffer - this.width)) / 2, s = (Math.abs(a - this.height) - Math.abs(this.outerConParent.offsetHeight * this.options.outerBuffer - this.height)) / 2, t.setAttribute("style", "transform: translate3d( -" + Math.abs(n.toFixed(2)) + "px,  -" + Math.abs(s.toFixed(2)) + "px, " + o + "px);width: " + c + "px; height: " + a + "px; "), !this.initialized) {
            var d = this;
            setTimeout(function() {
                d.initialized = !0, d.rect = d._getBoundingClientRect(d.element), (0 === d.rect.width || 0 === d.rect.height) && (d.rect = d._getBoundingClientRect(d.container)), d.center = d.getCenterOfContainer(), d.effectX = d.mouseX = d.center.x, d.effectY = d.mouseY = d.center.y, d.changePerspective(d.transformTarget, d.effectX, d.effectY)
            }, 10)
        }
    }, n.prototype.getCenterOfContainer = function() {
        return {
            x: this.rect.left + this.width / 2,
            y: this.rect.top + this.height / 2
        }
    }, n.prototype.getAspectRatio = function(t) {
        t || (t = this.options.container);
        var e = this._getBoundingClientRect(t);
        return [e.width / e.height, e.height / e.width]
    }, n.prototype._getBoundingClientRect = function(t) {
        return t.getBoundingClientRect ? t.getBoundingClientRect() : {
            top: 0,
            bottom: window.innerHeight,
            left: 0,
            right: window.innerWidth,
            width: window.innerWidth,
            height: window.innerHeight
        }
    }, n.prototype.getDistance2d = function(t, e, i, n) {
        return Math.sqrt(Math.pow(t - i, 2) + Math.pow(e - n, 2))
    }, n.prototype.resizeHandler = function() {
        this.rect = this._getBoundingClientRect(this.container), this.width = this.rect.width, this.height = this.rect.height, this.center = this.getCenterOfContainer(), this.calculateOuterContainer(), this.calculate3dObjects(), this.options.onResize()
    }, n.prototype._has3d = function() {
        var t, e, i = document.createElement("p"),
            n = {
                WebkitTransform: "-webkit-transform",
                OTransform: "-o-transform",
                MSTransform: "-ms-transform",
                MozTransform: "-moz-transform",
                transform: "transform"
            };
        for (e in document.body.insertBefore(i, document.body.lastChild), n) void 0 !== i.style[e] && (i.style[e] = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)", t = window.getComputedStyle(i).getPropertyValue(n[e]));
        return i.parentNode.removeChild(i), void 0 !== t && "none" !== t
    }, n.prototype._isElementInViewport = function() {
        return this.rect.bottom >= 0 && this.rect.right >= 0 && this.rect.top <= window.innerHeight && this.rect.left <= window.innerWidth
    }, n.prototype._addEvent = function(t, e, i) {
        window.addEventListener ? t.addEventListener(e, i, !1) : window.attachEvent && t.attachEvent(e, i), this.eventCache.push({
            element: t,
            type: e,
            fn: i
        })
    }, n.prototype.clearEvents = function() {
        this.eventCache.forEach(function(t) {
            window.addEventListener ? t.element.removeEventListener(t.type, t.fn, !1) : window.attachEvent && t.element.detachEvent(t.type, t.fn)
        })
    }, n.prototype.destroy = function() {
        this.clearEvents(), this.element.parentNode.removeChild(this.element), this.hook("onDestroy"), this.element.removeData && this.element.removeData("plugin_" + this._name)
    }, n.prototype.hook = function(t) {
        this.options[t] && this.options[t].call(this.element)
    }, t.logosDistort = i, jQuery && jQuery.fn && (jQuery.fn.logosDistort = function(t) {
        return this.each(function() {
            jQuery.data(this, "plugin_logosDistort") || jQuery.data(this, "plugin_logosDistort", new i(this, t))
        })
    })
}(window, document),
function() {
    for (var t = 0, e = ["webkit", "moz"], i = 0; i < e.length && !window.requestAnimationFrame; ++i) window.requestAnimationFrame = window[e[i] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[i] + "CancelAnimationFrame"] || window[e[i] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function(e, i) {
        var n = new Date().getTime(),
            s = Math.max(0, 16 - (n - t)),
            o = window.setTimeout(function() {
                e(n + s)
            }, s);
        return t = n + s, o
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
        clearTimeout(t)
    })
}();