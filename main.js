$(document).ready(function(){

    $('.post').css({overflowY: 'hidden'});
    $('#headers').css({borderBottom: 'none'});

    function fadeEach(e){
        var $this = $(e);
        $this.delay(50*$this.index()).animate({opacity:1}, 400);
    }

    /* Yeah, that's right, brush that weak ass fade. - https://i.imgur.com/OTRjYgU.gif */
    $('#headers > h1').delay(200).animate({opacity:1}, 400, function(){
        $('#headers > h2:nth-of-type(1)').delay(200).animate({opacity:1}, 400, function(){
            $('#headers > h2:nth-of-type(2)').delay(200).animate({opacity:1}, 400, function(){
                var $post = $('.post');
                $post.css({overflowY: 'auto'});
                $post.contents().each(function(){
                    fadeEach(this);
                }).promise().done(function(){
                    $('#headers').css({borderBottom: '1px dotted #dddddd'});
                    $('nav').contents().each(function(){
                        fadeEach(this);
                    });
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
            var $post = $('.post');
            $post.fadeOut(300, function(){
                $post.html($(data).filter('.post').contents());
                $post.contents().css({opacity: 1});
                $post.fadeIn(300);
            });
            //_gaq.push(['_trackPageview', State.url]);
        });
    });

    /* Dynamic Resize */
    $(window).resize(function(){
        $('section').height(window.innerHeight-40);
    }).resize();

});