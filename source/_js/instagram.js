// source/js/instagram.js

document.addEventListener('DOMContentLoaded', function () {
    var feed = new Instafeed({
        accessToken: 'YOUR_INSTAGRAM_ACCESS_TOKEN',
        limit: 6,
        template: '<a href="{{link}}" target="_blank"><img src="{{image}}" alt="{{caption}}" /></a>'
    });
    feed.run();
});
