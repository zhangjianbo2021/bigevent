//每次发起$.post()或$.get()或$.ajax()都会
//先调用这个函数，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {

    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    console.log(options.url);


})