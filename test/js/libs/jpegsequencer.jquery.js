;(function ( $, window, document, undefined ) {
    
    var pluginName = 'jpeg Sequencer',
        defaults = {
            direction: "down",
            imageAmount: 3,
            delay: 200, // milliseconds
            directionWidth: 20, // width of the directional arrows
            directionName: 'jpegseq', // class name of directional
            css: true, //include css stylings for directional arrows
            trigger: 'hover' // trigger for movement
        };

    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
 
        this._defaults = defaults;
        this.  _name = pluginName;
        
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
		
		if(this.options.direction == 'right')
		{
			var elementWidth = wholeWidth/this.options.imageAmount; // calculate the element width
	    	var elementHeight = wholeHeight; // calculate the element height
		}
		else
		{
			var elementWidth = wholeWidth; // calculate the element width
	    	var elementHeight = wholeHeight/this.options.imageAmount;
		}
		    	
        $(this.element).width(elementWidth).height(elementHeight); // set dimensions of element correctly
        $(this.element).css('position', 'relative');
        $(this.element).html('<div class="'+this.options.directionName+' left"></div><div class="'+this.options.directionName+' right"></div>')
        if(this.options.css === true)
        {
	        $('.'+this.options.directionName).css('height', elementHeight).css('width', this.options.directionWidth).css('position', 'absolute').css('top', 0);
	        $('.'+this.options.directionName+'.left').css('left', 0); // position left direction
	        $('.'+this.options.directionName+'.right').css('right', 0); // position right direction
        }
        
        // mmm i want to clean this up, not sure how
        
        var amountMoved = 0;
        var direction = this.options.direction;
        
        if(this.options.direction == "right")
        	var movement = elementWidth;
        else
        	var movement = elementHeight;
        
        // On click events
        $(this.element).children('div').bind('click', {movement: movement, wholeWidth: wholeWidth, wholeHeight: wholeHeight, direction: direction}, function(e) {
			if($(this).hasClass('left'))
			{
				if(amountMoved != 0)
				{
					amountMoved += e.data.movement;
					
					if(direction == "right")
						$(this).parent().css('background-position', amountMoved+'px 0');
					else
						$(this).parent().css('background-position', '0 '+ amountMoved+'px');
				}
			}
			
			if($(this).hasClass('right'))
			{
				if(direction == "right")
					var directionWidth = wholeWidth;
				else
					var directionWidth = wholeHeight;
				if(amountMoved != ((directionWidth-e.data.movement) *-1))
				{
					amountMoved -= e.data.movement;
					
					if(direction == "right")
						$(this).parent().css('background-position', amountMoved+'px 0');
					else
						$(this).parent().css('background-position', '0 '+amountMoved+'px');
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
