;(function ( $, window, document, undefined ) {
    
    var pluginName = 'jpeg Sequencer',
        defaults = {
            direction: "right",
            imageAmount: 5,
            delay: 1000, // milliseconds
            directionWidth: 20, // width of the directional arrows
            directionName: 'jpegseq', // class name of directional
            css: true, //include css stylings for directional arrows
            trigger: 'hover' // trigger for movement
        };

    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
 
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }

    Plugin.prototype.init = function () {
    	
    	// Gets the width of the background image
        var path = $(this.element).css('background-image').replace('url', '').replace('(', '').replace(')', '').replace('"', '').replace('"', '');
		var bgWidthImage = '<img id="tmp" src="' + path + '"/>';
		$('body').append(bgWidthImage);
		$('#tmp').hide();
		var wholeWidth = $('#tmp').width(); //get whole width of image
		var wholeHeight = $('#tmp').height(); //get whole width of image
		$('#tmp').remove();
		
		var elementWidth = wholeWidth/this.options.imageAmount; // calculate the element width
    	
        $(this.element).width(elementWidth).height(wholeHeight); // set dimensions of element correctly
        $(this.element).css('position', 'relative');
        $(this.element).html('<div class="'+this.options.directionName+' left"></div><div class="'+this.options.directionName+' right"></div>')
        if(this.options.css === true)
        {
	        $('.'+this.options.directionName).css('height', wholeHeight).css('width', this.options.directionWidth).css('position', 'absolute').css('top', 0);
	        $('.'+this.options.directionName+'.left').css('left', 0); // position left direction
	        $('.'+this.options.directionName+'.right').css('right', 0); // position right direction
        }
        
        // mmm i want to clean this up, not sure how
        var delay = this.options.delay;
        $(this.element).children('div').bind('click', {delay: delay, movement: elementWidth}, function(e) {
			
			
			
        	$(this).parent().css('background-position', e.data.movement+'px 0');
        	
        })
        
        
		
	};

    $.fn.jpegsequencer = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    }

})(jQuery, window, document);
