$(document).ready(function(){
    /* AJAXify */
    var siteUrl = 'http://'+(document.location.hostname||document.location.host);

    $(document).delegate('a[href^="/"],a[href^="'+siteUrl+'"]', "click", function(e) {
        e.preventDefault();
        History.pushState({}, "", this.pathname);
    });

    History.Adapter.bind(window, 'statechange', function(){
        var State = History.getState();
        $.get(State.url, function(data){
            document.title = $(data).filter("title").text();
            $('.post').removeClass('fadein').fadeOut(400, function(){
                $('.post').html($(data).filter('.post').contents()).fadeIn(400);
            });
            //_gaq.push(['_trackPageview', State.url]);
        });
    });
    /* Dynamic Resize */
    $(window).resize(function(){
        $('section').height(window.innerHeight-40);
    }).resize();
});