! function(e, t) {
    "use strict";
    var i = {
        init: function() {
            t.hooks.addAction("frontend/element_ready/section", i.elementorSection)
        },
        elementorSection: function(e) {
            var n = e.data("id"),
                s = Boolean(t.isEditMode()),
                o = {};
            if (window.WPKoiTricksSettings && window.WPKoiTricksSettings.elements_data.sections.hasOwnProperty(n) && (o = window.WPKoiTricksSettings.elements_data.sections[n]), s && (o = i.sectionEditorSettings(n)), jQuery.isEmptyObject(o)) return !1;
            if ("false" === o.particles || "" === o.particles_json) return !1;
            var r = "wpkoi-tricks-particles-instance-" + n,
                c = JSON.parse(o.particles_json);
            e.prepend('<div id="' + r + '" class="wpkoi-tricks-particles-section__instance"></div>'), particlesJS(r, c)
        },
        sectionEditorSettings: function(t) {
            var i, n = {};
            return !!window.elementor.hasOwnProperty("elements") && (!!(i = window.elementor.elements).models && (e.each(i.models, function(e, i) {
                t == i.id && (n = i.attributes.settings.attributes)
            }), {
                particles: n.section_wpkoi_tricks_particles || "false",
                particles_json: n.section_wpkoi_tricks_particles_json || ""
            }))
        }
    };
    e(window).on("elementor/frontend/init", i.init)
}(jQuery, window.elementorFrontend);