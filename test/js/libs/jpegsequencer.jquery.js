;(function ( $, window, document, undefined ) {
    
    var pluginName = 'jpeg Sequencer',
        defaults = {
            direction: "right",
            imageAmount: 3,
            delay: 100, // milliseconds
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
        
        var amountMoved = 0;
        
        // On click events
        $(this.element).children('div').bind('click', {movement: elementWidth, wholeWidth: wholeWidth}, function(e) {
			if($(this).hasClass('left'))
			{
				if(amountMoved != 0)
				{
					
					amountMoved += e.data.movement;
					console.log(amountMoved);
					$(this).parent().css('background-position', amountMoved+'px 0');
				}
			}
			
			if($(this).hasClass('right'))
			{
				if(amountMoved != ((wholeWidth-e.data.movement) *-1))
				{
					amountMoved -= e.data.movement;
					console.log(amountMoved);
					$(this).parent().css('background-position', amountMoved+'px 0');
				}
			}
			        	
        });
        
        
        var delay = this.options.delay;

		$(this.element).children('div').bind('mouseover', {delay: delay},function(){
			
			var thiselement = this;
			
 			myInterval = setInterval(function(){
 				hoverTrigger(thiselement);
			}, delay);
	    });
	    
	    $(this.element).children('div').bind('mouseout', {delay: delay},function(){
			clearInterval(myInterval);
			myInterval = false;
		});
		
		
		// function for triggering on hover events, if enabled
		function hoverTrigger(thiselement) {
			if($(thiselement).hasClass('left'))
			{
				$(thiselement).parent().children('.left').click();
				console.log('left');
			}
			
			if($(thiselement).hasClass('right'))
			{
				$(thiselement).parent().children('.right').click()
			}
		}
		
	};

    $.fn.jpegsequencer = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    }

})(jQuery, window, document);
