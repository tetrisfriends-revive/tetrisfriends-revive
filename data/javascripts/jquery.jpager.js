/* Internal jQuery Pager */
(function($) {

$.fn.jpager = function(inElementId, inOptions) {
	var options = {
		navClass: 'pager_page_nav ',
		navSelectedClass: 'pager_page_selected',
		startPage: 1,
		pageUpdateHook: function() {}
	};
	
	if (inOptions) {
		$.extend(options, inOptions);
	}
	
	return this.each(function() {
		var obj = $(inElementId);
		var maxHeight = 0;
		for (var i=0; i < obj.length; i++) {
			// Fix page heights
			if (obj.eq(i).height() > maxHeight) {
				maxHeight = obj.eq(i).height();
			}
		}
		obj.css("min-height", maxHeight);
		
		// Add Nav Bar
		obj.parent().append("<div class='" + options.navClass + "'>" + getPageNav(inElementId, obj.length) + "</div>");
		
		// Attach click events to page nav links
		var pageNav = $(inElementId + " ~ ." + options.navClass).children();
		
		for (var j=0; j < pageNav.length; j++) {
			if (j == 0) {
				$(pageNav[j]).bind("click", {elementId: inElementId, pageNum: j, navClass: options.navClass, navSelectedClass: options.navSelectedClass, pageUpdateHook: options.pageUpdateHook}, function(event) { 
					clickFunc(event.data.elementId, "Prev", event.data.navClass, event.data.navSelectedClass, event.data.pageUpdateHook);
				});
			} else if (j == pageNav.length - 1) {
				$(pageNav[j]).bind("click", {elementId: inElementId, pageNum: j, navClass: options.navClass, navSelectedClass: options.navSelectedClass, pageUpdateHook: options.pageUpdateHook}, function(event) { 
					clickFunc(event.data.elementId, "Next", event.data.navClass, event.data.navSelectedClass, event.data.pageUpdateHook);
				});
			} else {
				$(pageNav[j]).bind("click", {elementId: inElementId, pageNum: j, navClass: options.navClass, navSelectedClass: options.navSelectedClass, pageUpdateHook: options.pageUpdateHook}, function(event) { 
					clickFunc(event.data.elementId, event.data.pageNum, event.data.navClass, event.data.navSelectedClass, event.data.pageUpdateHook);
				});
			}
		}
		
		// Show Pages and Nav Bar
		clickFunc(inElementId, parseInt(options.startPage), options.navClass, options.navSelectedClass, options.pageUpdateHook);
		
		
		// Functions
		function getPageNav(inElementId, pageCount) {
			var pageNavHtml = "";

			pageNavHtml += getPageNavLink(inElementId, "Prev");
			for (var i=0; i < pageCount; i++) {
				pageNavHtml += getPageNavLink(inElementId, i + 1);
			}
			pageNavHtml += getPageNavLink(inElementId, "Next");
			
			return pageNavHtml;
		}
			
		function getPageNavLink(inElementId, pageCount) {
			return "<a href='javascript:void(0)' rel='" + pageCount + "'>" + pageCount + "</a>";
		}

		function clickFunc(inElementId, inPageNum, inNavClass, inNavSelectedClass, callbackFunc) {
			var pageNav  = $(inElementId + " ~ ." + inNavClass).children();
			var newPage  = inPageNum;

			if (inPageNum == "Prev" || inPageNum == "Next") {
				var pages = $(inElementId).parent().children();
				var currPage = 0;
				
				for(var i=0; i < pages.length; i++) {
					if ($(pages[i]).css("display") != "none") {
						currPage = i;
						break;
					}
				}
				
				if (inPageNum == "Prev") {
					newPage = (currPage < 1) ? 1 : currPage;
				} else if (inPageNum == "Next") {
					newPage = (currPage + 2 >= pages.length) ? currPage + 1 : currPage + 2;
				}
			}

			// Reset pages and nav bar
			$(inElementId).hide();
			$(inElementId).eq(newPage - 1).show();
			$(pageNav).removeClass(inNavSelectedClass);
			if (newPage == 1) {
				$(pageNav).eq(0).addClass(inNavSelectedClass);
			} else if (newPage >= pageNav.length - 2) {
				$(pageNav).eq(newPage + 1).addClass(inNavSelectedClass);
			}
			$(pageNav).eq(newPage).addClass(inNavSelectedClass);

			// Hide prev/next if only 1 page
			if (pageNav.length == 3) {
				$(pageNav).eq(0).hide();
				$(pageNav).eq(2).hide();
			}
			
			callbackFunc(newPage);
		}
	});
};

})(jQuery);