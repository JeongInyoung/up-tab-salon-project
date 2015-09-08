/*! iy-navigation.js © yamoo9.net, 2015.08.02 */

(function($) {
	// 플러그인 코드
	$.fn.iyNavigation = function(options) {

		var defaults = {
			'class': 'active'
		};

		$.iyNavigation = function(el, options) {
			this.init(el, options);
		};

		$.iyNavigation.prototype = {
			'init': function(el, options) {
				this.el = el;
				this.$el = $(el);
				this.settings = $.extend({}, defaults, options);
				this.uiSettings();
				this.events();
			},
			'uiSettings': function() {
				// 처음 로딩 시에 현재 활성화된 <li>를 찾아 메모리
				this.$initActive = this.$el.find('> ul > li.'+this.settings['class']);
				// 메모리 값에 대상이 없을 경우, 초기화
				if( this.$initActive.length <= 0) {
					this.$initActive = this.$el.find('> ul > li:first-child');
					this.$initActive
						.add( this.$initActive.children('ul') )
						.add( this.$initActive.find('ul li:first-child a') )
							.addClass(this.settings['class']);
				}
			},
			'events': function() {
				var that = this;
				this.$el
					.on('mouseenter', '.column > li', function() {
						$(this).siblings('.'+that.settings['class'])
							.removeClass(that.settings['class'])
							.end()
								.addClass(that.settings['class']);
					})
					.on('mouseleave', function() {
						that.$initActive.siblings('.'+that.settings['class']).removeClass(that.settings['class']).end().addClass(that.settings['class']);
					})
					.on('focus', 'a', function() {
						var $this = $(this);
						if($this.parent().parent().is('.column') && !$this.parent().hasClass(that.settings['class'])) {
							$this.parent().siblings('.'+that.settings['class']).removeClass(that.settings['class']).end().addClass(that.settings['class']);
						}
					})
					.find('a:last').on('blur', function() {
						$(this).closest('.'+that.settings['class']).removeClass(that.settings['class']).closest('.'+that.settings['class']).removeClass(that.settings['class']);
						that.$initActive.addClass(that.settings['class']);
					});
			}
		};

		return $.each(this, function() {
			var iynav = new $.iyNavigation(this, options);
			$.data(this, 'iyNavigation', iynav);
		});
	};
})(window.jQuery);