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
					<p>Our objective was to design a simple, user-friendly digital solution to educate and empower seniors, helping them build confidence in using everyday technology such as smartphones and mobile apps.</p>
					<div style="display: flex; align-items: flex-start; gap: 20px;">
						<div style="flex: 1;">
							<p>After much discussion and feedback, we decided to develop an app tailored for elderly users. This app served two primary functions:</p>
							<p>	1. An online learning library - offering accessible, bite-sized e-learning videos that seniors could watch at their own pace to learn how to use essential apps.</p>
							<p>	2. A volunteer support system - allowing users to request in-person help from Heartware Network volunteers whenever they needed hands-on assistance.</p>
							<p>Additionally, having understood the diverse linguistic needs of our elderly population, we made the app available in Chinese, Tamil, and Malay, and implemented accessibility features to ensure ease of use for seniors.</p>
						</div>
						<img src="images/capstone1.png" style="width: 50%; margin-top: 10px;" />
					</div>
					<p>At the end of the project, we had the opportunity to present our work to our mentors and parents. This showcase was a fulfilling conclusion to the project. Not only were we able to share what we had created, but we also received constructive feedback from multiple perspectives on how our app could be further improved.</p>
					<img src="images/capstone2.jpeg" style="width: 100%;" />
				`
			},
			{
				title: "2023 NUS Chem•Comm competition",
				description: `
					<p>In 2023, I had the opportunity to participate in the NUS Chem•Comm Competition, where my team focused on researching the impact of Carbon Capture Units (CCUs) as a strategy to help schools achieve carbon neutrality by 2030.</p>
					<p>As the chairperson, I was responsible not only for introducing our team and wrapping up our presentation, but also played a significant role in conducting research and developing our website.</p>
					<p>One of the most memorable aspects was designing the quiz section of the site. This feature added a fun, interactive element through gamification, helping to boost user engagement. We coded the quiz entirely from scratch, making it a valuable hands-on learning experience that provided a refreshing break from continuous research. You can try the quiz on its own <a href="https://waphhh.github.io/chemdotcom/" target="_blank">here</a>.</p>
					<p>This project deepened my passion for Chemistry and strengthened my commitment to environmental sustainability. It was a meaningful experience that allowed me to blend research, communication, and teamwork in tackling a real-world issue.</p>
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
					<p>For this project, our goal was to investigate the effect of colour on the absorption of infrared radiation. This project marked my first full scientific investigation, where I was actively involved in every stage, from designing the experimental setup and conducting the tests, to gathering data and analyzing the results.</p>
					<p>Our team had to ensure that our methodology remained consistent and that our findings were clearly interpreted. This hands-on experience gave me a deeper appreciation for the scientific process, and it strengthened my ability to draw data-driven conclusions through careful observation and critical thinking.</p>
					<p>It was also my first introduction to writing scientific literature, including a formal research proposal and final report. Importantly, I learnt how to properly use citations to credit sources, a key part in maintaining academic integrity and research transparency.</p>
					<img src="images/ISSposter.png" style="width: 100%; margin-bottom: 10px;" />
					<p>In addition to the written components, we presented our findings in both poster and video formats. This was a significant milestone for me, as I used Canva to design our poster and took on the task of recording and editing our video presentation.</p>
				`
			},
			{
				title: "ARTC Camp",
				description: `
						<p>During the ARTC camp, we were challenged to design a product that could enhance the effectiveness of the recycling process. My team worked together to develop a prototype for a sensor-based device that could detect whether bottles were properly cleaned before being allowed to be placed in the recycling bin. This would help prevent contamination, improving the overall efficiency and quality of recycling efforts.</p>
					`
			},
			{
				title: "2023 SYF Competition",
				description: `
					<p>I was proud to be part of the SST Guitar Ensemble, which was awarded Distinction at the 2023 Singapore Youth Festival (SYF) Competition. This experience was a golden opportunity for me to challenge myself by learning and performing complex musical pieces that demanded skill, focus, and discipline.</p>
					<p>As Vice Chairperson of the ensemble at the time, I not only strived to master each piece to the best of my abilities, but also took on a leadership role in motivating and supporting my fellow guitarists. I helped to ensure that every guitarist was able to play the pieces fluently as well as keeping them motivated during practice.</p>
					<p>This experience helped deepen my love and appretiation for music. Additionally, having to stay calm and collected on stage while performing on stage infront of a live audience helped boost my self-confidence and strengthened my ability to handle pressure.</p>
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