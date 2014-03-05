(function($) {

    //
    // Construct the html for the permalink popup div, and return it as a string
    //
    function permalink_html(url) {
        return ''
            + '<div class="permalink popup">'
            +   '<input type="text" class="url" value="' + url + '" readonly></input>'
            +   '<div class="closebutton"></div>'
            + '</div>'
        ;
    }

    // Note: this function causes the text of the given element to be selected.
    // Except, it doesn't seem to work for an <input> element.  For an <input>
    // element, just call the .select() method on the element itself; see below.
    // I'm including it here, even though it isn't currently used, just in case
    // the type of the .url element above is changed to something other than
    // <input>.
    function selectText(element) {
        var doc = document
            , range, selection
        ;    
        if (doc.body.createTextRange) { //ms
            range = doc.body.createTextRange();
            range.moveToElementText(element);
            range.select();
        } else if (window.getSelection) { //all others
            selection = window.getSelection();        
            range = doc.createRange();
            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    var methods = {
        init : function (options) {
            if (options === undefined) { options = {}; }

            var defaults = {
                'url' : 'http://www.example.com'
            };
            var settings = $.extend({}, defaults, options);
            return this.each(function () {
                var $this = $(this);
                // get or set this instance's data object
                var data = $this.data('permalink');
                if ( ! data ) {
                    data = {
                        'settings' : settings
                    };
                    $this.data('permalink', data);
                }

                $this.addClass('permalink link');
                //$this.html( '<img src="link.png">' + $this.html() );
                $this.html( '<div class="linkicon"></div>' + $this.html() );

                $this.on('click.permalink', function(e) {

                    if ($this.data('permalink').popup_open) {
                        return false;
                    }

                    var $popup = $(permalink_html($this.data('permalink').settings.url)).appendTo($('body'));
                    $popup.css('left', e.pageX);
                    $popup.css('top', e.pageY-10);

                    $this.data('permalink').popup_open = true;

                    $popup.on('click.permalink', function() {
                        // return false means consume this event, so that the click.permalink handler
                        // on the containing (body) element doesn't fire
                        return false; 
                    });

                    var dismiss = function() {
                        $popup.remove();
                        $this.data('permalink').popup_open = false;
                        $('body').off('click.permalink');
                    };

                    $('body').on('click.permalink', dismiss);
                    $('.permalink.popup .closebutton').on('click.permalink', dismiss);

                    $('.permalink.popup input.url')[0].select();

                    return false;
                });

                return this;
            });
        },

    };

    $.fn.permalink = function (method) {
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on d3_series_transition');
            return null;
        }
    };


}(jQuery));