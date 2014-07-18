/*
 Plugin Name: Animate On Scroll
 Created on : jul 17, 2014
 Description: 
 Version: 1.0
 Author: <a href="mailto:rabartu.soft@gmail.com">RabartuSoft Solutions</a>
 License: GPLv2 or later
 */

/*
 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU General Public License
 as published by the Free Software Foundation; either version 2
 of the License, or (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 
 You should have received a copy of the GNU General Public License
 along with this program; if not, write to the Free Software
 Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */


(function($) {

    var AnimateOnScroll = function(opts) {
        var $window = $(window),
                win_height = $window.height();
        
        $window.on('scroll', animate);

        $(opts.selector).css('opacity', 0);

        function animate() {
            var scrolled = $window.scrollTop();
            $(opts.selector + ":not(." + opts.animationClass + ")").each(function() {
                var $this = $(this),
                        offsetTop = $this.offset().top;

                var usrOffsetTop = $.isNumeric($this.data('offset-top')) ? $this.data('offset-top') : opts.offsetTop,
                        usrAnimationType = $this.data('animation-type') !== null ? $this.data('animation-type') : opts.animationType,
                        usrTimeout = $.isNumeric($this.data('timeout')) ? $this.data('timeout') : opts.timeout,
                        usrAnimationDuration = $.isNumeric($this.data('animation-duration')) ? $this.data('animation-duration') : opts.animationDuration;

                if (scrolled + win_height - usrOffsetTop > offsetTop) {
                    if (usrTimeout) {
                        window.setTimeout(function() {
                            $this.addClass('animated ' + usrAnimationType)
                                    .css('-webkit-animation-duration', usrAnimationDuration + 'ms')
                                    .css('animation-duration', usrAnimationDuration + 'ms')
                                    .css('opacity', 1);
                        }, parseInt(usrTimeout, 10));
                    } else {
                        $this.addClass('animated ' + usrAnimationType)
                                .css('-webkit-animation-duration', usrAnimationDuration + 'ms')
                                .css('animation-duration', usrAnimationDuration + 'ms')
                                .css('opacity', 1);
                        ;
                    }
                }
            });
            $(opts.selector + '.' + opts.animationClass).each(function() {
                var $this = $(this),
                        offsetTop = $this.offset().top;
                if (scrolled + win_height < offsetTop) {
                    $(this).removeClass(opts.animationClass + ' ' + $this.data('animation-type')).css('opacity', 0)
                }
            });
        }
    }


    /* AnimateOnScroll PLUGIN DEFINITION
     * ======================= */
    $.fn.animateOnScroll = function(options) {
        var opts = $.extend({}, $.fn.animateOnScroll.defaults, options);
        return this.each(function() {
            AnimateOnScroll(opts);
        });
    };


    /* animateOnScroll PLUGIN DEFAULTS
     * ======================= */
    $.fn.animateOnScroll.defaults = {
        selector: '.animateOnScroll',
        animationClass: 'animated',
        animationType: 'fadeIn',
        animationDuration: 1000,
        offsetTop: 0,
        timeout: 0
    };


    /* animateOnScroll DATA_API INITIALIZATION
     * ======================= */
    $(window).on('load', function() {
        $('body').animateOnScroll();
    });

})(jQuery);

