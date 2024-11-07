function getAdAkamaiPath() {
	return AD_AKAMAI_PATH;
}

function initPromoAd(TOA_AD_STYLE, TOA_AD_HEIGHT, TOA_IS_ANIMATED, TOA_MOUSEOVER, TOA_MOUSEOUT, TOA_PROMO_CALLBACK) {
	//TOA_AD_STYLE = "position: absolute; top: -94px; left: -232px; clip: rect(93px  1206px  344px  226px);";
	
	$('#OAS_RMF_x69_FLASH').attr("style", TOA_AD_STYLE);
	
	//TOA_MOUSEOVER	 = "$('#tetris_header_mouseover').show(); $('#OAS_RMF_x69_FLASH').css('clip', 'rect(0, 1400px, 460px, 0)');";
	//TOA_MOUSEOUT	 = "$('#tetris_header_mouseover').hide(); $('#OAS_RMF_x69_FLASH').css('clip', 'rect(93px, 1206px, 344px, 226px)');";

	$('#OAS_RMF_x69_FLASH').bind("mouseover", function() { eval(TOA_MOUSEOVER); });
	$('#OAS_RMF_x69_FLASH').bind("mouseout", function() { eval(TOA_MOUSEOUT); });
	$('#tetris_header_mouseover').bind("mouseover", function() { eval(TOA_MOUSEOUT); });

	if (TOA_PROMO_CALLBACK == undefined || TOA_PROMO_CALLBACK == "undefined") {
		TOA_PROMO_CALLBACK = function () { };
	}
	
	//TOA_PROMO_CALLBACK = "setTimer('expandBannerDiv(100, 10, true, 500)', 5000);";

	expandBannerDiv(Number(TOA_AD_HEIGHT), 10, TOA_IS_ANIMATED, 500, function() { eval(TOA_PROMO_CALLBACK) });
}

function initRailAds(TOA_LEFT_RAIL, TOA_LEFT_RAIL_POS, TOA_RIGHT_RAIL, TOA_RIGHT_RAIL_POS, TOA_RAIL_CALLBACK) {
	var toa_left_pos_array = TOA_LEFT_RAIL_POS.split(",");
	var toa_right_pos_array = TOA_RIGHT_RAIL_POS.split(",");

	if (TOA_RAIL_CALLBACK == undefined || TOA_RAIL_CALLBACK == "undefined") {
		TOA_RAIL_CALLBACK = function () { };
	}
	
	if (TOA_LEFT_RAIL != "") {
		loadLeftRail(TOA_LEFT_RAIL, toa_left_pos_array[0], toa_left_pos_array[1], toa_left_pos_array[2], toa_left_pos_array[3]);
	}
	if (TOA_RIGHT_RAIL != "") {
		loadRightRail(TOA_RIGHT_RAIL, toa_right_pos_array[0], toa_right_pos_array[1], toa_right_pos_array[2], toa_right_pos_array[3]);
	}
	
	eval(TOA_RAIL_CALLBACK);
}

function onBannerMouseOver(top, right, bottom, left) {
	$('#tetris_header_mouseover').show();
	$('#OAS_RMF_x69_FLASH').css(
			'clip',
			'rect(' + top + 'px  ' + right + 'px  ' + bottom + 'px  ' + left
					+ 'px)');
}

function onBannerMouseOut(top, right, bottom, left) {
	$('#tetris_header_mouseover').hide();
	$('#OAS_RMF_x69_FLASH').css(
			'clip',
			'rect(' + top + 'px  ' + right + 'px  ' + bottom + 'px  ' + left
					+ 'px)');
}

function loadLeftRail(background, top, left, width, height) {
	$("div#home_ad_left_rail").css({
		"position"  : "absolute",
		"background" : background,
		"background-repeat": "no-repeat",
		"top"   : top    + 'px', 
		"left"  : left   + 'px',
		"width" : width  + 'px',
		"height": height + 'px'
	});
	$('div#home_ad_left_rail').show();
}

function loadRightRail(background, top, right, width, height) {
	$("div#home_ad_right_rail").css({ 
		"position"  : "absolute",
		"background" : background,
		"background-repeat": "no-repeat",
		"top"   : top    + 'px', 
		"right" : right  + 'px',
		"width" : width  + 'px',
		"height": height + 'px'
	});
	$('div#home_ad_right_rail').show();
}

function expandBannerDiv(height, padding, isAnimated, animTime, callback) {
	if (animTime == "") {
		animTime = 500;
	}

	$("#home_custom_ad_container").show();

	if (isAnimated) {
		$("#home_custom_ad_container").animate({"height": height + padding}, animTime, callback);
	} else {
		$("#home_custom_ad_container").animate({"height": height + padding}, 1, callback);
	}
}

function TOA_INIT() {
	
}

