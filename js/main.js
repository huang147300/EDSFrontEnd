requirejs.config({
    baseUrl: "js/lib/dev",
    paths: {
    	web: "../../../js",
        jquery: "jquery",
        mousewheel: "jquery.mousewheel",
        jplayer: "jplayer/jquery.jplayer",
        jqueryui: "jqueryui/jquery-ui",
        datepickerzhCN: "jqueryui/datepicker-zh-CN",
        timepicker: "jqueryui/jquery-ui-timepicker-addon",
        underscore: "underscore",
        backbone: "backbone",
        stickit: "backbone.stickit",
        radio: "backbone.radio",
        marionette: "backbone.marionette",
        handlebars: "handlebars",
        text: "text",
        moment: "moment"
    }
});

requirejs(["web/app"], function(App) {
	new App().start();
});
