$.fn.mobileScroll = function() {
    this.live("touchstart", function(event) {
        $(this).clearQueue();
        event.preventDefault();
        var e = event.originalEvent.targetTouches[0];
        $(this).data('startY', e.pageY);
        $(this).data('scrollTop', $(this).scrollTop());
        $(this).data("t", Date.now());
    }).live("touchmove", function(event) {
        event.preventDefault();
        var e = event.originalEvent.targetTouches[0];
        var startY = $(this).data('startY');
        var dy = startY - e.pageY;
        $(this).scrollTop( $(this).data('scrollTop') + dy );
        var dt= Date.now() - $(this).data("t");
        $(this).data("s", parseInt(1000*dy/dt));
        return false;
    }).live("touchend", function() {
        var s = $(this).data("s");
        $(this).animate({scrollTop: "+=" + s + "px"}, 1000, "easeOutCirc");
    });

    return this;
};
