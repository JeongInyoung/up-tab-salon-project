(function(global, doc, $) {

	// SVGInjector : Style 설정
	var svgInjection = function() {
		// IE8, console.log() 오류 안나게
		if (!window.console) {
			console = {
				log: function() {}
			};
		};
		// img.inject-me 요소 수집해서 mySVGsToInject 변수에 참조
		var mySVGsToInject = doc.querySelectorAll('img.inject-svg');
		// SVG 주입(Injector) 설정 옵션
		var injectorOptions = {
			evalScripts: 'once', // always, once, never
			pngFallback: 'images/ie-assets', // PNG 대체 폴더 설정
			each: function(svg) {
				// svg는 수집된 개별 img.inject-me를 가리킴
				// console.log(svg.id);
			}
		};
		// SVGInjector 함수에 연결
		SVGInjector(
			// 수집된 img.inject-me 요소
			mySVGsToInject,
			// SVG 주입(Injector) 설정 옵션
			injectorOptions,
			// 콜백 함수
			function(totalSVGsInjected) {
				// totalSVGsInjected는 SVG 주입된 설정 개수를 출력
				// console.log(totalSVGsInjected);
			});
	};

	// Checkbox or Radio Style 설정
	var kalypto = function() {
		// Checkbox Script
		$("input[type=checkbox].kalypto").kalypto();
		// Radio Script
		$("input[type=radio].kalypto").kalypto({
			hideInputs: false,
			toggleClass: "k_toggleR"
		});
	};

	var $html = $('html'),
		_html = global.html = doc.documentElement,
		_ua = global.UA = global.navigator.userAgent;

	// IE 10, 11 체크
	function checkSetClassPropIE() {
		if (_ua.indexOf('MSIE 10') > -1) {
			$html.addClass('lt-ie11 ie10'); // IE10 버전 체크하여 <html> 요소에 class=lt-ie11 ie10 을 적용
		} else if (_ua.indexOf('rv:11') > -1) {
			$html.addClass('lt-ie11 ie11'); // IE11 버전 체크하여 <html> 요소에 class=lt-ie11 ie11 을 적용

		}
	}

	// IE 10, 11 초기 수행코드 실행
	checkSetClassPropIE();

	// IMG => SVG로 변환, ie9 이하 버전 PNG로 대체
	svgInjection();

	// Checkbox or Radio Style 설정
	kalypto();

	// 부드럽게 스크롤 움직임
	smoothScroll.init();

	// Loading Image 사용
	echo.init({
		offset: 10,
		throttle: 250 // 불러오는 시간
	});

	// Popup Script
	// 팝업이 링크 될 요소
	$('.trigger-pop-login').popupLayer();
	$('.trigger-pop-reviews').popupLayer();
	// 위치 이동 드래그 될 팝업창
	$('.popup-layer .container').draggable({
		//지정된 영역안에서만 이동
		containment: "#container"
	});

	// Select Box Style 설정
	$('.select-style select').stbDropdown();

	// 토글 메뉴 플러그인
	(function () {

		// 토글 버튼
		var toggleBtn = [
				$('.store-search-set li .toggle'), //Store 검색 토글
				$('.designer-search-set li .toggle'), // Designer 검색 토글
				$('.hair-style-set li .btn-down'), //Book Store Service 리스트 토글
			];

		// 토글 이벤트
		for (var i = 0; i <= toggleBtn.length-1; i++) {
			toggleBtn[i].click(function(e) {
				e.preventDefault(); // 기본 속성 초기화
				if(!$(this).hasClass('active')) {
					$(this).toggleClass('active');		// 버튼 효과 class="active"로 제어
					$(this).next().stop().slideToggle();	// 토글 패널 슬라이드 효과
				}
				return;
			});
		};

	})();

	// 모바일 메뉴
	$('.menu-button').click(function() {
		var dim = $('.mobile-menu-dim'),
			menu = $('.mobile-menu'),
			sec = 300;
		if(menu.css("margin-right") == "0px")
		{
			menu.animate({"margin-right": "-=300"}, sec);
			dim.removeClass("open");
			dim.addClass("close");
		}
		else
		{
			menu.animate({"margin-right": "+=300"}, sec);
			dim.removeClass("close");
			dim.addClass("open");
		}
	});

})(window, document, window.jQuery);