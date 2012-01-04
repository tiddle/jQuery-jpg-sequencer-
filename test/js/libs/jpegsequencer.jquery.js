;(function ( $, window, document, undefined ) {
    
    var pluginName = 'jpeg Sequencer',
        defaults = {
            direction: "across",
            width: 240,
            height: 320,
            delay: 1000, // milliseconds
            directionWidth: 20, // width of the directional arrows
            directionName: 'jpegseq' // class name of directional
        };

    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
 
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }

    Plugin.prototype.init = function () {
        $(this.element).width(this.options.width).height(this.options.height); // set dimensions of element correctly
        $(this.element).css('position', 'relative');
        $(this.element).html('<div class="'+this.options.directionName+' left"></div><div class="'+this.options.directionName+' right"></div>')
        $('.'+this.options.directionName).css('height', this.options.height).css('width', this.options.directionWidth).css('position', 'absolute').css('top', 0);
        $('.'+this.options.directionName+'.left').css('left', 0); // position left direction
        $('.'+this.options.directionName+'.right').css('right', 0); // position right direction
    };

    $.fn.jpegsequencer = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    }

})(jQuery, window, document);
