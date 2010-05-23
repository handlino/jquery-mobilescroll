$.fn.mobileScroll = function(options) {
    if (options == null)
        options = { };

    if (options.inertia == null)
        options.inertia = true;

    this.live("touchstart", function(event) {
        $(this).clearQueue();
        event.preventDefault();
        var e = event.originalEvent.targetTouches[0];
        $(this).data('startY', e.pageY);
        $(this).data('scrollTop', $(this).scrollTop());
        $(this).data('startX', e.pageX);
        $(this).data('scrollLeft', $(this).scrollLeft());
        $(this).data("t", Date.now());
    }).live("touchmove", function(event) {
        event.preventDefault();
        var e = event.originalEvent.targetTouches[0];

        var startX = $(this).data('startX');
        var startY = $(this).data('startY');

        var dx = startX - e.pageX;
        var dy = startY - e.pageY;

        $(this).scrollTop(  $(this).data('scrollTop') + dy );
        $(this).scrollLeft( $(this).data('scrollLeft') + dx );

        var dt= Date.now() - $(this).data("t");
        $(this).data("s", parseInt(1000*dy/dt));
        return false;
    });

    if (!!options.inertia) {
        this.live("touchend", function() {
            var s = $(this).data("s");
            $(this).animate({scrollTop: "+=" + s + "px", scrollLeft: "+=" + s + "px"}, 1000, "easeOutCirc");
        });
    }

    return this;
};
