$(document).ready(function(){
    /* Yeah, that's right, brush that weak ass fade. - https://i.imgur.com/OTRjYgU.gif */
    $('header > h1').delay(100).animate({opacity:1}, 400, function(){
        $('header > h2:nth-of-type(1)').delay(100).animate({opacity:1}, 400, function(){
            $('header > h2:nth-of-type(2)').delay(100).animate({opacity:1}, 400, function(){
                $('.post').delay(300).animate({opacity:1}, 400, function(){
                    $('nav').delay(300).animate({opacity:1}, 400);
                });
            });
        });
    });
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
            $('.post').fadeOut(300, function(){
                $('.post').html($(data).filter('.post').contents()).fadeIn(300);
            });
            //_gaq.push(['_trackPageview', State.url]);
        });
    });
    /* Dynamic Resize */
    $(window).resize(function(){
        $('section').height(window.innerHeight-40);
    }).resize();
});