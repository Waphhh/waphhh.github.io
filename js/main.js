;(function () {
	
	'use strict';



	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}

	};


	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};


	var counterWayPoint = function() {
		if ($('#colorlib-counter').length > 0 ) {
			$('#colorlib-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	// Animations
	var smoothAnchorScroll = function () {
		$('a[href^="#"]').on('click', function (e) {
			var target = $(this.getAttribute('href'));
			if (target.length) {
				e.preventDefault();
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 600);
			}
		});
	};	

	var revealSidebarOnScroll = function () {
		var $aside = $('#colorlib-aside');
		$aside.hide(); // hide initially
	
		$(window).on('scroll', function () {
			if ($(window).scrollTop() > $('#cover').height() - 50) {
				$aside.fadeIn();
			} else {
				$aside.fadeOut();
			}
		});
	};	

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};


	var burgerMenu = function() {

		$('.js-colorlib-nav-toggle').on('click', function(event){
			event.preventDefault();
			var $this = $(this);

			if ($('body').hasClass('offcanvas')) {
				$this.removeClass('active');
				$('body').removeClass('offcanvas');	
			} else {
				$this.addClass('active');
				$('body').addClass('offcanvas');	
			}
		});



	};

	// Click outside of offcanvass
	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#colorlib-aside, .js-colorlib-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-colorlib-nav-toggle').removeClass('active');
			
	    	}
	    	
	    }
		});

		$(window).scroll(function(){
			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-colorlib-nav-toggle').removeClass('active');
			
	    	}
		});

	};

	var clickMenu = function() {

		$('#navbar a:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section'),
				navbar = $('#navbar');

				if ( $('[data-section="' + section + '"]').length ) {
			    	$('html, body').animate({
			        	scrollTop: $('[data-section="' + section + '"]').offset().top - 55
			    	}, 500);
			   }

		    if ( navbar.is(':visible')) {
		    	navbar.removeClass('in');
		    	navbar.attr('aria-expanded', 'false');
		    	$('.js-colorlib-nav-toggle').removeClass('active');
		    }

		    event.preventDefault();
		    return false;
		});


	};

	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};

	var navigationSection = function() {

		var $section = $('section[data-section]');
		
		$section.waypoint(function(direction) {
		  	
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};

	var sliderMain = function() {
		
	  	$('#colorlib-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000,
			directionNav: true,
			start: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}

	  	});

	};

	var enableProjectClickPopup = function () {
		var popup = $('#project-popup');
		var details = $('#project-details');
		var closeBtn = $('.project-popup .close-btn');
	
		// Project data (adjust index order based on your layout)
		var projectContent = [
			{
				title: "ElderGuide",
				description: `
					<p>For my year-end Capstone project, I collaborated with Heartware Network alongside 3 friends to help Singapore’s pioneer generation embrace technology. Through this meaningful experience, I have developed greater patience, compassion, and understanding. I also gained valuable insight into the lives of elderly individuals across Singapore and the often unseen challenges they face daily.</p>
					<p>Our goal was to design a simple, user-friendly solution that would help to educate and empower seniors to embrace technology. Through this, we hoped to improve their confidence in using common technological items such as smartphones and the apps contained within.</p>
					<div style="display: flex; align-items: flex-start; gap: 20px;">
						<div style="flex: 1;">
							<p>We decided on creating an app that would be able to teach the elderly how to use certain apps as well as provide an option for them to request help from HWN volunteers.</p>
							<p>On the right is a screenshot of our app's home page. The app had an online library with useful e-learning resources that the elderly could watch and learn from in their own time. Additionally, the elderly could also go to the requests section to seek physical assistance from HWN volunteers.</p>
							<p>Being designed for the Singapore elderly population, our app was also available in chinese, tamil and malay with many more accessibility functions to make our app useable.</p>
						</div>
						<img src="images/capstone1.png" style="width: 50%; margin-top: 10px;" />
					</div>
					<p>Finally, at the end of our project, we were given the opportunity to present our work to our mentors and parents. This presentation was a great way to round up the project, being able to show our work to others as well as recieve feedback from many different people on how we could improve our app.</p>
					<img src="images/capstone2.jpeg" style="width: 100%;" />
				`
			},
			{
				title: "2023 NUS Chem•Comm competition",
				description: `
					<p>In 2023, I had the opportunity to participate in the NUS Chem•Comm Competition, where my team focused on researching the impact of Carbon Capture Units (CCUs) as a strategy to help schools achieve carbon neutrality by 2030.</p>
					<p>Being the chairperson of the group, apart from the basic task of introducing our group and our topic as well as closing our presentation, I was heavily involved in the research and making of our website.</p>
					<p>One of the most memorable parts was creating the quiz section of the website. The qiuz section added an element of gamifaction to our website allowing for greater engagement. As we coded out the game from scratch, it was an invaluable learning experience and brought a change of pace to the endless researching. You can try the quiz on its own <a href="https://waphhh.github.io/chemdotcom/" target="_blank">here</a>.</p>
					<p>This project not only deepened my interest in Chemistry, but also reinforced my commitment to environmental sustainability and protecting the planet for future generations. It was a valuable experience that allowed me to combine research, communication, and teamwork to address a real-world problem.</p>
					<p>You can preview our website below and click <a href="https://vernonloh6.wixsite.com/chemdotcom" target="_blank">here</a> to view our full website.</p>
					<iframe src="https://vernonloh6.wixsite.com/chemdotcom" 
						width="100%"
						height="600px"
						style="border: none;">
					</iframe>
				`
			},
			{
				title: "ISS Project",
				description: `
					<p>Investigated colour and IR heat absorption through an experiment with data collection and analysis.</p>
					<img src="images/ISS.jpg" style="width:100%; margin-top:10px;" />
				`
			},
			// Add more projects here...
		];
	
		// Attach click event to all .project elements
		$('.project').each(function (index) {
			$(this).css('cursor', 'pointer'); // indicate it's clickable
	
			$(this).on('click', function (e) {
				e.stopPropagation(); // prevent bubbling up
				const project = projectContent[index] || { title: "Coming Soon", description: "<p>Details will be updated soon.</p>" };
				details.html(`<h1><strong>${project.title}</strong></h1>${project.description}`);
				popup.addClass('open');
			});
		});
	
		// Close button
		closeBtn.on('click', function () {
			popup.removeClass('open');
		});
	};

	var owlCrouselFeatureSlide = function() {
		$('.owl-carousel').owlCarousel({
			animateOut: 'fadeOut',
		   animateIn: 'fadeIn',
		   autoplay: true,
		   loop:true,
		   margin:0,
		   nav:true,
		   dots: false,
		   autoHeight: true,
		   items: 1,
		   navText: [
		      "<i class='icon-arrow-left3 owl-direction'></i>",
		      "<i class='icon-arrow-right3 owl-direction'></i>"
	     	]
		})
	};

	var stickyFunction = function() {

		var h = $('.image-content').outerHeight();

		if ($(window).width() <= 992 ) {
			$("#sticky_item").trigger("sticky_kit:detach");
		} else {
			$('.sticky-parent').removeClass('stick-detach');
			$("#sticky_item").trigger("sticky_kit:detach");
			$("#sticky_item").trigger("sticky_kit:unstick");
		}

		$(window).resize(function(){
			var h = $('.image-content').outerHeight();
			$('.sticky-parent').css('height', h);


			if ($(window).width() <= 992 ) {
				$("#sticky_item").trigger("sticky_kit:detach");
			} else {
				$('.sticky-parent').removeClass('stick-detach');
				$("#sticky_item").trigger("sticky_kit:detach");
				$("#sticky_item").trigger("sticky_kit:unstick");

				$("#sticky_item").stick_in_parent();
			}

		});

		$('.sticky-parent').css('height', h);

		$("#sticky_item").stick_in_parent();

	};

	// Document on load.
	$(function(){
		fullHeight();
		counter();
		counterWayPoint();
		contentWayPoint();
		burgerMenu();

		clickMenu();
		// navActive();
		smoothAnchorScroll(); 
		revealSidebarOnScroll();
		navigationSection();
		// windowScroll();


		mobileMenuOutsideClick();
		sliderMain();
		owlCrouselFeatureSlide();
		enableProjectClickPopup();
		stickyFunction(); // this function is broken leave as bottom
	});


}());