define(function(require,exports,module){
    var $ = require('jquery');
    var bootstrap = require('/lib/bootstrap/3.3.6/js/bootstrap.js');
	var lazyload = require('/src/js/common/lazyload.js');
    var constants = require('/src/js/common/constants.js');
	var base = require('/src/js/base.js');
	var login = require('/src/js/login.js');
    
    //main module 
    var MainModule =  function(){
        var $aside_wrap = $("#aside-wrap"),
            $aside_panel = $aside_wrap.find('.aside-panel');  
        function run(){
            initLayout();
            $(window).bind('scroll',function(){
                if($(window).scrollTop()>=30){
                    $aside_panel.css({
                        position: 'fixed',
                        top: '50px'
                    });  
                }else {
                    $aside_panel.css({
                        position: 'static',
                        top: '0'
                    }); 
                }
                lazyload.emit();
            }).bind('resize',function(){
                $aside_panel.css({
                    'width': $aside_wrap.width() + 'px' 
                }); 
            }); 
            $(window).trigger('scroll');
        }
        function initLayout(){
            $aside_panel.css({
                'height': base.clientInfo.height - 50 + 'px',
                'width': $aside_wrap.width() + 'px'
            }); 
        }
        return {
            run: run
        }
    }();
    MainModule.run();
});
