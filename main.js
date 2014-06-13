$(document).ready(function(){

    $('.post').css({overflowY: 'hidden'});

    /* Yeah, that's right, brush that weak ass fade. - https://i.imgur.com/OTRjYgU.gif */
    $('header > h1').delay(200).animate({opacity:1}, 400, function(){
        $('header > h2:nth-of-type(1)').delay(200).animate({opacity:1}, 400, function(){
            $('header > h2:nth-of-type(2)').delay(200).animate({opacity:1}, 400, function(){
                $('.post').contents().each(function(){
                    $(this).delay(50*$(this).index()).animate({opacity:1}, 400);
                });
                $('.post').css({overflowY: 'auto'});
                $('nav').delay(50*$('.post').children().length).animate({opacity:1}, 400);
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
                $('.post').html($(data).filter('.post').contents());
                $('.post > *').css({opacity: 1});
                $('.post').fadeIn(300);
            });
            //_gaq.push(['_trackPageview', State.url]);
        });
    });

    /* Dynamic Resize */
    $(window).resize(function(){
        $('section').height(window.innerHeight-40);
    }).resize();

});