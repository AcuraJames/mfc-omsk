function is_cursor_on_elem( ev, elem ){

		let mouseX = ev.clientX
		let mouseY = ev.clientY
		let rect = elem.getBoundingClientRect()

		return (
			mouseX > rect.x && mouseX < rect.bottom
			&&
			mouseY > rect.y && mouseY < rect.right
		)
}

$(document).ready(function(){
	
	new isvek.Bvi({
		target: '.for-watch-better',
		theme: 'black',
		fontSize: 14,
		builtElements: true,
		panelHide: true,
	});
	
	$('html').on('click touchstart', '.mobile-menu-opener', function(e) {
		e.preventDefault();
		if (!$(this).hasClass('active')) {
			$(this).addClass('active');


			$(".mobile-menu-handler").css('display','block').delay(10).queue(function(next){
				$(".mobile-menu-handler").addClass("active");
				next();
			}).delay(200).queue(function(next){
				$(".mobile-menu-body").addClass("active");
				$("body").css('overflow','hidden');
				$("html").css('overflow','hidden');
				next();
			});

		}
	});
	$('html').on('click touchstart', '.mobile-menu-handler', function(e) {
		e.preventDefault();
		e.stopPropagation();
		if (!$(event.target).closest('.mobile-menu-body').length) {
			if ($(".mobile-menu-body").hasClass('active')) {
				$(".mobile-menu-body").removeClass('active').delay(300).queue(function(next){
					$(".mobile-menu-handler").removeClass("active");
					next();
				}).delay(300).queue(function(next){
					$(".mobile-menu-handler").css('display','none');
					$(".mobile-menu-opener").removeClass('active');
					$("body").css('overflow','auto');
					$("html").css('overflow','auto');
					next();
				});
			}
		}
	});
	
	window.onscroll = function (e) {
		var Scroll = window.scrollY;
		if (Scroll>145) {
			if (!$('.menu-contaner').hasClass('fixed')) {
				$('.menu-contaner').addClass('fixed');
				$("body").css('padding-top','50px');
			}
		}
		else {
			if ($('.menu-contaner').hasClass('fixed')) {
				$('.menu-contaner').removeClass('fixed');
				$("body").css('padding-top','0px');
			}
		}
	};
	
	
	$('html').on('mouseenter', '.have-submenu', function(e) {
		e.preventDefault();
		if (!$(this).parent().children('.submenu').hasClass('active')) {
			$('.submenu').removeClass('active');
			$('.mainmenu').removeClass('active-submenu');
			$(this).parent().children('.submenu').addClass('active');
			$(this).addClass('active-submenu');
			$('.mainmenu.active').addClass('simple-disabled');
		}
	});
	
	const some_elem = document.querySelector( '.menu-contaner' )
	const pre = document.querySelector( '.submenu' )

	some_elem.addEventListener( 'mouseleave', ev => {
		
	setTimeout(function() { 
	if( is_cursor_on_elem( ev, pre ) ){
		}
		else {
			$('.submenu').removeClass('active');
			$('.mainmenu').removeClass('active-submenu');
		$('.mainmenu.active').removeClass('simple-disabled');
		}
	}, 300);
	} );
	
	$('html').on('mouseenter', '.mainmenu', function(e) {
		e.preventDefault();
		if (!$(this).hasClass('have-submenu')) {
			$('.submenu').removeClass('active');
			$('.mainmenu').removeClass('active-submenu');
		$('.mainmenu.active').removeClass('simple-disabled');
		}
	});
	$('html').on('mouseleave', '.menu-desktop', function(e) {
		e.preventDefault();
		$('.submenu').removeClass('active');
		$('.mainmenu').removeClass('active-submenu');
		$('.mainmenu.active').removeClass('simple-disabled');
	});
    $(document).on("click", '.category-modal', function(event) {
        let target = $(event.target).attr('data-target');
        $('#modal-text').html($('.link_container_'+target).html());
        $('.modal-wrapper').removeClass('modal-hidden');
    });
    $(document).on("click", '.category-link', function(event) {
        $('.modal-wrapper').addClass('modal-hidden');
    });
	
    document.addEventListener('click', function(event) {
        if(event.target && event.target.id === 'hide-modal') {
            $('.modal-wrapper').addClass('modal-hidden');
        }
    });
});