//jQuery Additions
// Extended getScript forces all scripts to be injected into header
jQuery.extend({
   getScript: function(url, callback) {
      var head = document.getElementsByTagName("head")[0];
      var script = document.createElement("script");
      script.src = url;
	  
      // Handle Script loading
      {
         var done = false;
		 
         // Attach handlers for all browsers
         script.onload = script.onreadystatechange = function(){
            if ( !done && (!this.readyState ||
                  this.readyState == "loaded" || this.readyState == "complete") ) {
               done = true;
               if (callback)
                  callback();
				  
               // Handle memory leak in IE
               script.onload = script.onreadystatechange = null;
            }
         };
      }
	  
      head.appendChild(script);
	  
      // We handle everything using the script element injection
      return undefined;
   }
});

//GLOBAL
var tmpLoginId;
var g_isInterstitial = false;
var g_flvPlayer;
var s_flvTimeout;

// Console support
if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function() {};
if (!window.console.debug) window.console.debug = function() {};
if (!window.console.error) window.console.error = function() {};
if (!window.console.group) window.console.group = function() {};
if (!window.console.groupEnd) window.console.groupEnd = function() {};

// OAS
// configuration
// 1) Initialize the URL for the web server
var OAS_url = 'http://oasc11009.247realmedia.com/RealMedia/ads/';

// 2) Initialize the site/page (uncomment your choice, and
// 3) comment out the one you are not using
var OAS_site = 'www.tetrisfriends.com/openweb/';
var OAS_sitepage = 'home';

// 4) Initialize the list of positions
var OAS_listpos = '';

// 5) Initialize the query
var OAS_query = 'XE&amp;status=active&amp;XE';

// 6) Initialize the query
var OAS_target = '_top';
// end of configuration

// 7) Initialize the version of JavaScript to 11
var OAS_version = 10;

// 8) Initialize and calculate the random number (next two lines)
var OAS_rn = new String(Math.random());
var OAS_rns = OAS_rn.substring(2, 11);


function OAS_NORMAL(pos) {
	document.write('<a href="' + OAS_url + 'click_nx.ads/' + OAS_site + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + '!' + pos + '?' + OAS_query + '" target=' + OAS_target + '>');
	document.write('<img src="' + OAS_url + 'adstream_nx.ads/' + OAS_site + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + '!' + pos + '?' + OAS_query + '" border="0" alt="Loading..."></img></a>');
}

function OAS_INIT(lpos, query, page, ver){
/*
	OAS_listpos = lpos;
	OAS_query = query;
	OAS_sitepage = page;
	OAS_version = ver;

	if (lpos != '')
	{		
		if (OAS_version == 11){
			// 11) Set the version of JavaScript to 10 for a Browser 'Mozilla/3' on webTV
			if ((navigator.userAgent.indexOf('Mozilla/3') != -1) || (navigator.userAgent.indexOf('Mozilla/4.0 webTV') != -1))
				OAS_version = 10;
		}
		if (OAS_version >= 11)
		{
			// 13) This line is for the Browser Opera 4.01
			document.write('<scr' + 'ipt language="javascript1.1" src="' + OAS_url + 'adstream_mjx.ads/' + OAS_site + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + '?' + OAS_query + '"><\/script>');
		}
	}
	document.write('');
*/
}

function OAS_GET_URL(tagType, pos)
{
	var OAS_final = OAS_url + "adstream_" + tagType + ".ads/" + OAS_site + OAS_sitepage + "/1" + OAS_rns + "@" + pos + "?" + decodeHtmlSpecialChars(OAS_query);
	
	return OAS_final;
}

function OAS_AD(pos) {
	switch (pos) {
		case 'x69':
		case 'x75':		// 728x90 leaderboard replaced with TetrisFriends_OW_728x90_ROS_ATF
			GA_googleFillSlot('TetrisFriends_OW_728x90_ROS_ATF');
		break;
		
		default:		// 300x250 IAB replaced with TetrisFriends_OW_300x250_ROS_ATF
			GA_googleFillSlot('TetrisFriends_OW_300x250_ROS_ATF');
	}
	/*
	if (OAS_version >= 11)
		OAS_RICH(pos);
	else
		OAS_NORMAL(pos);
	*/
}

//SHADOWBOX.........................................
function shadowboxInit(isModal, isKeyboardEnabled, flvPlayerPath){
	var options = {
		animate: false,
		animSequence: 'sync',
		displayNav: false,
		overlayColor: '#000000',
		overlayOpacity: 0.4,
		continuous: false,
		displayCounter: true,
		counterType: 'default',
		viewportPadding: 5,
		handleOversize: 'resize',
		enableKeys: isKeyboardEnabled,
		handleUnsupported: 'remove',
		modal: isModal,
		language: "en"
	};
	Shadowbox.init(options);
}

function popUpBoxByUrl(url, w, h, title, onCloseHook){
	Shadowbox.open({
	    player:     'iframe',
	    title:      title,
	    content:    url,
	    height:     h,
	    width:      w
	});

	Shadowbox.applyOptions({onClose: onCloseHook});
}

function popUpBoxByUrlExt(url, w, h, title, onCloseHook, onFinishHook, onOpenHook) {
	Shadowbox.open({
	    player:     'iframe',
	    title:      title,
	    content:    url,
	    height:     h,
	    width:      w
	});

	Shadowbox.applyOptions({onClose: onCloseHook, onFinish: onFinishHook, onOpen: onOpenHook});
}

function popUpBoxByHtml(html, w, h, title, onCloseHook, onFinishHook){
	Shadowbox.open({
	    player:     'html',
	    title:      title,
	    content:    html,
	    height:     h,
	    width:      w
	});

	Shadowbox.applyOptions({onClose: onCloseHook, onFinish: onFinishHook});
}

function popUpBoxByFlv(content, w, h, title, caption, onOpenHook, onCloseHook){
	Shadowbox.open({
	    player:     'flv',
	    title:      title,
	    caption:	caption,
	    content:    content,
	    height:     h,
	    width:      w
	});
	Shadowbox.applyOptions({onClose: onCloseHook});
	Shadowbox.applyOptions({onFinish: onOpenHook});
}

function closePopup() {
	var Shadowbox = window.parent.Shadowbox;
  	Shadowbox.close();
}

	

//HOMEPAGE.........................................
var homepageHasLoadedMiniLbd;

function homeRenderFlash(swf, width, height){
	// Checks if user has the correct version of Flash
	var hasReqestedVersion = DetectFlashVer(9, 0, 0);

	// If user does, render flash, else display error message
	if (hasReqestedVersion) {
		swfobject.embedSWF(swf, "game_feature_swf", width, height, "9.0.0", {}, {}, {wmode: "opaque"}, {allowscriptaccess: "always"}, {id:"gameFeatureSwf", name:"gameFeatureSwf"});
	} else {
		$('#errorMessage').html('<br /><br /><p><a href="http://get.adobe.com/flashplayer/">Please upgrade your version of Adobe Flash Player</a></p>');
	}
}

function homeResetButtons(){
   	$(".games_scrollable > div.items > div").removeClass("selected");
   	$("#game_info").removeClass(); // reset class
   	$("#game_info").addClass("home_game_info"); // add home_game_info class
}

function homeSelectButton(gameName){
	homeResetButtons();
	$("#gameButton" + gameName).addClass("selected");

	if($("#gameButton" + gameName).hasClass("locked")){
		$("#game_info").addClass("locked");
	} else {
		$("#game_info").addClass("unlocked");
	}
}

function toggleHomeGameStats(productId, isAutomated) {
	if ($('#game_info').css('display') == "none") {
		$('#game_mini_lbd').fadeOut('slow', function() { $('#game_info').fadeIn('slow'); } );
	} else {
		$('#game_info').fadeOut('slow', function() { homeLoadMiniLbd(productId); $('#game_mini_lbd').fadeIn('slow'); } );
	}
	
	if (!isAutomated && intervalTimer != -1) {
		clearInterval(intervalTimer);
		intervalTimer = -1;
	}
}
function homeLoadMiniLbd(productId) {
	if (!homepageHasLoadedMiniLbd) {
		$('#game_mini_lbd_content').load('/users/ajax/user_mini_leaderboard.php?productId=' + productId, {}, function () { homepageHasLoadedMiniLbd = true; $('#game_info').fadeOut('fast', function () { $('#game_mini_lbd').fadeIn(); } ); });
	} else {
		$('#game_info').fadeOut('fast', function () { $('#game_mini_lbd').fadeIn(); });
	}
}
function homeShowBestGame() {
	$('#game_mini_lbd').fadeOut('fast', function() { $('#game_info').fadeIn(); }); 
}

function homeChangeProduct(swfUrl, gameId, gameName, gameDisplayName, gameDesc, gamesPlayed, isActive)
{
	homepageHasLoadedMiniLbd = false;
	
	if (!$("#gameButton" + gameName).hasClass("selected")) {
	    homeSelectButton(gameName);
	    homeRenderFlash(swfUrl, 630, 242);
	    $('#game_desc').html('<h2>' + gameDisplayName + '</h2>' + gameDesc + 
	    		"<div class='games_played'>" + ((gamesPlayed != '') ? gamesPlayed + " plays" : '') + "</div>");
	    
	    $('#game_info').show();
	    $('#game_mini_lbd').hide();
	    
	    if (isActive){
			$('#game_play_btn').show();
			$('#game_register_btn').hide();
			$('#game_play_btn').attr({ href: '/games/' + gameName + '/game.php' });
			$("#game_stats").hide();
			if (TOA_IS_LOGGED_IN) {
				$("#game_stats").load('/users/ajax/user_best_score.php?productId=' + gameId);
			}
			$('.home_info_footer_link').attr('href', 'javascript:' + 'toggleHomeGameStats(' + gameId + ', false)');
			$('#game_mini_lbd_link').attr('href', 'javascript:' + 'toggleHomeGameStats(' + gameId + ', false)');
			$('#game_mini_lbd_link').show();
			
	
			if (gameName == 'NBlox') {
				$('a.home_game_disclaimer_link').attr('href', 'http://www.neave.com');
				$('a.home_game_disclaimer_link').show();
			} else {
				$('a.home_game_disclaimer_link').hide();
			}
			$('#game_desc').css("borderWidth", "0 0 1px");
	    } else{
			$('#game_play_btn').hide();
			$('#game_register_btn').attr({ href: '/users/register.php?saveGame=true&linkTag=guest_view&game_id=' + gameId});
			$('#game_register_btn').show();
			$('#game_disclaimer').hide();
			$('#game_mini_lbd_link').hide();
	    	$('#game_desc').css("borderWidth", 0);
	    }
	}
}

//GAME SCREEN......................................
function js_enableGameSideButtons(isEnabled)
{
	if (isEnabled) {
		$("#game_side_buttons > a.game_tutorial_button").removeClass("button_round_tutorial_disabled");
		$("#game_side_buttons > a.game_options_button").removeClass("button_round_options_disabled");
		$("#game_side_buttons > a.button_round_side_feedback").removeClass("button_round_side_feedback_disabled");

		$("#game_side_buttons > a.game_tutorial_button").attr("href", "javascript:tetrisGameInstructions()");
		$("#game_side_buttons > a.game_options_button").attr("href", "javascript:tetrisGameOptions()");
	} else {
		$("#game_side_buttons > a.game_tutorial_button").addClass("button_round_tutorial_disabled");
		$("#game_side_buttons > a.game_options_button").addClass("button_round_options_disabled");
		$("#game_side_buttons > a.button_round_side_feedback").addClass("button_round_side_feedback_disabled");

		$("#game_side_buttons > a.game_tutorial_button").attr("href", "javascript:void(0);");
		$("#game_side_buttons > a.game_options_button").attr("href", "javascript:void(0);");
	}
	$("#game_side_buttons > div > a").show();
}

function js_analyticsTrackGameUrl(inGame, inLocation)
{
	try {
		pageTracker._trackPageview('/games/'+inGame+'/'+inLocation+'/');
	} catch (err) {	}
}

function js_analyticsTrackGameEvent(inEvent, inGame, inParam)
{
	try {
		pageTracker._trackEvent("Game", inEvent, inGame, parseInt(inParam));
	} catch (err) { }
}
var sShop;
function js_gameOpenShop(inAccessoryId, inAccessoryType)
{
	var params = "";
	if (inAccessoryId != -1)
	{
		params = "accessoryId="+inAccessoryId+"&";
	}
	if (inAccessoryType != -1)
	{
		params += "accessoryType="+inAccessoryType;
	}
	window.name = "game";
	sShop = window.open("/shop/index.php?"+params, "sShop");
}

function tetrisGameUpdateAccessories()
{
	document.getElementById("contentFlash").as3_updateAccessories();
}

function tetrisGameTutorial()
{
    document.getElementById("contentFlash").as3_tetrisGameTutorial();
}

function tetrisGameInstructions()
{
    document.getElementById("contentFlash").as3_tetrisGameInstructions();
}

function tetrisGameOptions()
{
    document.getElementById("contentFlash").as3_tetrisGameOptions();
}

function gameShowResults(inResutls, inIsLoggedIn, inGameUrl, inIsMultiplayer, inIsDev, username, userAvatar, inAkamaiPath, inIsAd, inIsEmailVerified, inWinAnimId, inWinToneId, inWinAnimName, inWinToneName, inWinnerName, inVolume) {
	$("#game_tutorial_button").attr({ href: inGameUrl + "?showInstructions=true" });
	$("#game_options_button").attr({ href: inGameUrl + "?showOptions=true" });
	gameResult = new GameResult(inResutls, inIsLoggedIn, inIsMultiplayer, inIsDev, username, userAvatar);
	var str = "/games/ajax/game_results.php?points=" + gameResult.points + "&gameUrl=" + inGameUrl +"&productId=" + gameResult.productId + "&value=" + (inIsMultiplayer ? 0 : gameResult.value[0]);
	$("#game_container").load(str, { }, function() { gameResultsUpdateResults(gameResult, inAkamaiPath, inIsAd, inIsEmailVerified, inWinAnimId, inWinToneId, inWinAnimName, inWinToneName, inWinnerName, inVolume); });
}

//FACEBOOK/TWITTER......................................
function js_sendArenaRoomInvite(inInviteLink, inInviteMethod)
{
	switch (inInviteMethod) {
		// facebook
		case 1:
			fb_sendArenaInvite(inInviteLink);
			break;

		// twitter
		case 2:
			sendTwitterRoomInvite(inInviteLink);
			break;
	}
}
function sendTwitterRoomInvite(inInviteLink) {
	var twitterMsg = "Come play real-time TETRIS with me at TetrisFriends.com! I'm waiting at: " + inInviteLink;
	var twitterUrl = "http://twitter.com/home?status=" + encodeURIComponent(twitterMsg);
	
	sendTwitterMsg(twitterUrl);
}
function sendTwitterMsg(inMsg) {
	window.open(inMsg);
}

function popUpFBLinkedPopup(inIsFirstLink) {
	popUpBoxByUrl('/users/ajax/fb_account_linked.php?isFirstLink=' + inIsFirstLink, 500, 230, "", 
		function (){
			setTimeout('popUpFBFriends(true)', 500);
		});
}

function popUpFBLoginPopup(data, actionToken) {
	var queryParams = "fb_uid=" + data[0].uid + 
					  "&first_name=" + data[0].first_name + 
					  "&last_name=" + data[0].last_name + 
					  "&locale=" + data[0].locale +  
					  "&sex=" + data[0].sex + 
					  "&pic=" + data[0].pic +
					  "&pic_small=" + data[0].pic_small + 
					  "&pic_square=" + data[0].pic_square + 
					  "&action_token=" + actionToken;
	
	popUpBoxByUrl('/users/ajax/fb_account_login.php?' + queryParams, 650, 300, "");
}

function popUpFBFriends(inIsAuto, inCloseCB) {
	popUpBoxByUrl('/friends/ajax/fb_friends_popup.php?isAuto='+inIsAuto, 625, 540, "", inCloseCB);
}

function popUpFBMoreInfo(inActionToken) {
	var popupHtml = "<h3 class='textcenter'>Tell me more about yourself!</h3><br />";
	popupHtml += "<table style='width: 75%;'><tr>";
	popupHtml += "<td style='width: 50%; text-align: right; font-weight: bold;'>Email:</td>";
	popupHtml += "<td style='width: 50%; text-align: left;'><input id='popup_email' type='text' /></td>";
	popupHtml += "</tr></table><br />";
	popupHtml += "<p id='popup_notice_msg' style='color: #24be52; text-align: center;'>We will be using this email address to contact you<br />in case you win prizes on our site.</p><br />";
	popupHtml += "<a href= 'javascript:void(0)' onclick='var email = $(\"input#popup_email\").val(); changeEmail(email, \"" + inActionToken + "\");' class='button button_small_grey button_small_grey_savechanges floatleft' style='margin-left: 120px;'>Save</a>";
	popupHtml += "<a href= 'javascript:closePopup()' class='button button_small_grey button_small_grey_notnow floatleft marginleft_5px'>Not Now</a>";
	
	popUpBoxByHtml(popupHtml, 400, 180, "", function() { }, function() { });
}
function changeEmail(inEmail, inActionToken) {
	$.post("/users/process.php", { change_email : 1, email : inEmail, action_token : inActionToken}, function (data) {
		if (data == "SUCCESS") {
			closePopup();
			addNotice("Your e-mail address has been set. Thank you!");
		} else {
			$('#popup_notice_msg').css("color", "#ff0000");
			$('#popup_notice_msg').html(data);
		}
	});
}


//GAME RESULTS......................................
var gameResultMissions;
function GameResultMission(inDOM){
	var cic;
	var gric;
	var gtic;
	
	this.amountCompleted = $(inDOM).find('AmountCompleted').text();
	this.deltaCompleted = $(inDOM).find('DeltaCompleted').text();
	this.dateCompleted = $(inDOM).find('DateCompleted').text();
	this.dateStarted = $(inDOM).find('DateStarted').text();
	this.id = $(inDOM).find('Id:first').text();
	this.missionId = $(inDOM).find('MissionId').text();
	this.status = $(inDOM).find('Status').text();
	this.userId = $(inDOM).find('UserId').text();

	this.amountToComplete = $(inDOM).find('Mission > AmountToComplete').text();
	this.daysToComplete = $(inDOM).find('Mission > DaysToComplete').text();
	this.description = $(inDOM).find('Mission > Description').text();
	this.missionType = $(inDOM).find('Mission > MissionType').text();
	this.pointsCost = $(inDOM).find('Mission > PointsCost').text();
	this.missionName = $(inDOM).find('Mission > Name').text();
	this.pointsEarned = $(inDOM).find('Mission > PointsEarned').text();
	this.productId = $(inDOM).find('Mission > ProductId').text();
	this.missionClass = $(inDOM).find('Mission > MissionClass').text();
	this.collectionName = $(inDOM).find('Mission > MissionCollection > Name').text();
	this.collectionId = $(inDOM).find('Mission > MissionCollection > Id').text();
	this.collectionPointsEarned = $(inDOM).find('Mission > MissionCollection > PointsEarned').text();
	cic = $(inDOM).find('Mission > MissionCollection > Completed').text();
	if (cic == "true")
	{
		cic = true;
	}
	else if (cic == "false")
	{
		cic = false;
	}
	this.collectionIsCompleted = cic;
	gric = $(inDOM).find('MissionGridRowComplete').text();
	if (gric == "true") {
		gric = true;
	} else if (gric == "false") {
		gric = false;
	}
	this.gridRowIsCompleted = gric;
	gtic = $(inDOM).find('MissionTetriminoComplete').text();
	if (gtic == "true") {
		gtic = true;
	} else if (gtic == "false") {
		gtic = false;
	}
	this.gridTetriminoIsCompleted = gtic;
}

var gameResult;

function GameResult(inResults, inIsLoggedIn, inIsMultiplayer, isDev, username, userAvatar){
	var tmpArray;
	var mpResultsArray;
	var missions;
	
	this.username = username;
	this.userAvatar = userAvatar;

	var resultsArray;
	var awardsArray = new Array();

	this.awardLabel = new Array();
	this.awardValue = new Array();
	this.points = 0;
	this.guestTokens = -1;
	
	gameResultMissions = new Array();
	
	if (inIsLoggedIn)
	{
		var missionIndex = inResults.indexOf('<UserMissions>');
		var endIndex = inResults.indexOf('</UserMissions>')+15;
		if (missionIndex != -1)
		{
			missions = inResults.substring(missionIndex, endIndex);
			var newResults = inResults.substring(0, missionIndex-14) + inResults.substring(endIndex+1);
			inResults = newResults;
		}
		
		$.xmlDOM(missions).find('UserMission')
			.each(function(i) {gameResultMissions.push(new GameResultMission(this));});
	}
	
	resultsArray = inResults.split('<awards>');

	if (!inIsLoggedIn && resultsArray[1].substr("<GuestAwardTotal>") != 0) {
		tmpArray = resultsArray[1].split('<GuestAwardTotal>');
		resultsArray[1] = tmpArray[0];
		this.guestTokens = tmpArray[1];
		if (this.guestTokens != "undefined" && this.guestTokens != undefined) {
			if (this.guestTokens > 500) {
				this.guestTokens = 500;
			}
			$.get("/users/ajax/guest_token.php?guestTokens="+this.guestTokens);
		}
	}
	
	// Extract and parse Award bonuses
	if (resultsArray[1] && resultsArray[1].length > 1) {
		awardsArray = resultsArray[1].split(',');
		
		for (var i=0;i<awardsArray.length;i++) {
			tmpArray = awardsArray[i].split("&");
			if (tmpArray[0] && tmpArray[1]) {
				this.awardLabel[i] = tmpArray[0];
				this.awardValue[i] = tmpArray[1];
				this.points += parseInt(tmpArray[1]);
			}
		}
	}

	// If is MP variant, extract new MP custom info for Main tab
	if (inIsMultiplayer) {
		mpResultsArray = resultsArray[0].split('<mp_results>');
		resultsArray[0] = mpResultsArray[0];
		mpResultsArray = mpResultsArray[1];
	}	
	
	resultsArray = resultsArray[0].split(',');
	
	this.isDev = isDev;
	this.isMultiplayer = Boolean(inIsMultiplayer);
	this.isLoggedIn = inIsLoggedIn;
	this.productId = resultsArray[0];
	this.advanceRank = 0;
	
	if (this.isMultiplayer) {
		// Retrieve Rank information
		tmpArray = resultsArray[1].split('&');
		
		if (tmpArray.length == 1) {
			this.rank = Number(tmpArray[0]);
			this.advanceRank = 0;
		} else {
			this.rank = Number(tmpArray[0]);
			this.advanceRank = Number(tmpArray[1]);
		}
		
		// Retrieve Star information 
		resultsArray[2] = resultsArray[2].split('&');
	
		if (resultsArray[2].length == 1) {
			this.halfStars =  Number(resultsArray[2]);
			this.prevHalfStars = this.halfStars;
		} else {
			this.halfStars = Number(resultsArray[2][0]);
			this.prevHalfStars = Number(resultsArray[2][1]);
		}

		this.starMessage = String(resultsArray[3]).replace("\n", "<br />");
		if (this.starMessage.toLowerCase().indexOf("you lost") != -1) {
			this.starType = "down";
		} else if (this.starMessage.toLowerCase().indexOf("you won") != -1 || 
				   this.starMessage.toLowerCase().indexOf("you earned") != -1) {
			this.starType = "up";
		} else {
			this.starType = "same";
		}
			
		if (this.starMessage.toLowerCase().indexOf("ranked up") != -1) {
			this.prevRank = this.rank - 1;
			this.halfStars = 10; // change to 10 half stars to show animation from 4 or 4.5 to 5
			this.starType = "up";
		} else if (this.starMessage.toLowerCase().indexOf("ranked down") != -1) {
			this.prevRank = this.rank + 1;
			this.starType = "down";
		} else {
			this.prevRank = this.rank;
		}
	} else {
		this.percentile = Number(resultsArray[1]);
		this.rankAlltime = Number(resultsArray[2]);
		this.rankDaily = Number(resultsArray[3]);
		
		if (this.rankAlltime > 0){
			this.points += 100;
		}
		if (this.rankDaily > 0){
			this.points += 10;
		}
	}
	
	this.headingId = resultsArray[4];
	this.label = new Array();
	this.value = new Array();

	if (this.isMultiplayer) {
		this.gameData = new Array();
		this.playerIds = new Array();
		this.playerNames = new Array();
		this.playerAvatars = new Array();
		var end;
		if (this.productId == 101) {
			// Sprint 5P
			
			// Player Data
			this.gameData[0] = resultsArray[resultsArray.length-17];
			 
			// Opponent Data
			for (i = 0; i < 4; i++) {
				this.playerIds[i] = resultsArray[resultsArray.length-((4-i)*4)];
				this.playerNames[i] = resultsArray[resultsArray.length-(((4-i)*4)-1)];
				this.playerAvatars[i] = resultsArray[resultsArray.length-(((4-i)*4)-2)];
				this.gameData[i+1] = resultsArray[resultsArray.length-(((4-i)*4)-3)];
			}
			end = 17;
			
			// Parse custom MP info (for Main tab)
			mpResultsArray = mpResultsArray.split(",");
			this.mpCustomResultsNames   = new Array(mpResultsArray.length);
			this.mpCustomResultsTimes   = new Array(mpResultsArray.length);
			this.mpCustomResultsIds = new Array(mpResultsArray.length);

			for (i = 0; i < mpResultsArray.length; i++) {
				tmpArray = mpResultsArray[i].split("&");
				this.mpCustomResultsNames[i] = tmpArray[0];
				this.mpCustomResultsTimes[i] = tmpArray[1];
			}

			this.mpCustomResultsAvatars = new Array(this.mpCustomResultsNames.length);
			
			for (i = 0; i < this.mpCustomResultsNames.length; i++) {
				if (this.mpCustomResultsNames[i] != 0) {
					this.mpCustomResultsAvatars[i] = this.playerAvatars[this.mpCustomResultsNames[i]-1];
					this.mpCustomResultsIds[i] = this.playerIds[this.mpCustomResultsNames[i]-1];
					this.mpCustomResultsNames[i] = this.playerNames[this.mpCustomResultsNames[i]-1];
				} else {
					this.mpCustomResultsNames[i] = username;
					this.mpCustomResultsIds[i] = -1;
					this.mpCustomResultsAvatars[i] = userAvatar;
					
					// Check if user lost due to block/lock out
					if (i != 0 && this.mpCustomResultsTimes[i] < this.mpCustomResultsTimes[i - 1]) {
						this.mpCustomResultsTimes[i] = "-1";
					}
				}
			}
		} else if (this.productId == 100 || this.productId == 2) {
			// Battle 2P
			
			// Player Data
			this.gameData[0] = resultsArray[resultsArray.length-5];
            // Opponent Data
			this.playerIds[0] = resultsArray[resultsArray.length-4];
			this.playerNames[0] = resultsArray[resultsArray.length-3];
			this.playerAvatars[0] = resultsArray[resultsArray.length-2];
			this.gameData[1] = resultsArray[resultsArray.length-1];
			end = 5;
			
			// Parse custom MP info (for Main tab)
			mpResultsArray = mpResultsArray.split(",");
			this.mpCustomResultsNames     = new Array(mpResultsArray.length);
			this.mpCustomResultsKOs       = new Array(mpResultsArray.length);
			this.mpCustomResultsLines     = new Array(mpResultsArray.length);
			this.mpCustomResultsHeight    = new Array(mpResultsArray.length);
			this.mpCustomResultsIds       = new Array(mpResultsArray.length);

			for (i = 0; i < mpResultsArray.length; i++) {
				tmpArray = mpResultsArray[i].split("&");
				this.mpCustomResultsNames[i]     = tmpArray[0];
				this.mpCustomResultsKOs[i]       = tmpArray[1];
				this.mpCustomResultsLines[i]     = tmpArray[2];
				this.mpCustomResultsHeight[i]    = tmpArray[3];
			}

			this.mpCustomResultsAvatars = new Array(this.mpCustomResultsNames.length);
			
			// Note: Player is at index 0 (Left Side)
			this.mpCustomResultsNames[0] = username;
			this.mpCustomResultsAvatars[0] = userAvatar;
			this.mpCustomResultsIds[0] = -1;
			
			this.mpCustomResultsAvatars[1] = this.playerAvatars[0];
			this.mpCustomResultsNames[1] = this.playerNames[0];
			this.mpCustomResultsIds[1] = this.playerIds[0];
		} else if (this.productId == 4) {
			// RALLY
			// Player Data
			this.gameData[0] = resultsArray[resultsArray.length-21];

			// Opponent Data
			for (i = 0; i < 7; i++) {
				this.playerIds[i] = resultsArray[resultsArray.length-((7-i)*4)];
				this.playerNames[i] = resultsArray[resultsArray.length-(((7-i)*4)-1)];
				this.playerAvatars[i] = resultsArray[resultsArray.length-(((7-i)*4)-2)];
				this.gameData[i+1] = resultsArray[resultsArray.length-(((7-i)*4)-3)];
			}
			end = 7*4 + 1;
			
			// Parse custom MP info (for Main tab)
			mpResultsArray = mpResultsArray.split(",");
			
			this.mpCustomResultsNames   = new Array(mpResultsArray.length);
			this.mpCustomResultsPlaces	= new Array(mpResultsArray.length);
			this.mpCustomResultsTimes     = new Array(mpResultsArray.length);
			this.mpCustomResultsIds     = new Array(mpResultsArray.length);
			
			for (i = 0; i < mpResultsArray.length; i++) {
				tmpArray = mpResultsArray[i].split("&");
				this.mpCustomResultsNames[i]  = tmpArray[0];
				this.mpCustomResultsPlaces[i] = tmpArray[1];
				this.mpCustomResultsTimes[i]    = tmpArray[2];
			}
			
			this.mpCustomResultsAvatars = new Array(this.mpCustomResultsNames.length);
			
			for (i = 0; i < this.mpCustomResultsNames.length; i++) {
				if (this.mpCustomResultsNames[i] != 0) {
					this.mpCustomResultsAvatars[i] = this.playerAvatars[this.mpCustomResultsNames[i]-1];
					this.mpCustomResultsIds[i] = this.playerIds[this.mpCustomResultsNames[i]-1];
					this.mpCustomResultsNames[i] = this.playerNames[this.mpCustomResultsNames[i]-1];
				} else {
					this.mpCustomResultsNames[i] = username;
					this.mpCustomResultsIds[i] = -1;
					this.mpCustomResultsAvatars[i] = userAvatar;
				}
			}

		} else if (this.productId == 86) {
			// Battle 6P
			
			// Player Data
			this.gameData[0] = resultsArray[resultsArray.length-21];

			// Opponent Data
			for (i = 0; i < 5; i++) {
				this.playerIds[i] = resultsArray[resultsArray.length-((5-i)*4)];
				this.playerNames[i] = resultsArray[resultsArray.length-(((5-i)*4)-1)];
				this.playerAvatars[i] = resultsArray[resultsArray.length-(((5-i)*4)-2)];
				this.gameData[i+1] = resultsArray[resultsArray.length-(((5-i)*4)-3)];
			}
			end = 21;
			
			// Parse custom MP info (for Main tab)
			mpResultsArray = mpResultsArray.split(",");
			
			this.mpCustomResultsNames   = new Array(mpResultsArray.length);
			this.mpCustomResultsPlaces	= new Array(mpResultsArray.length);
			this.mpCustomResultsKOs     = new Array(mpResultsArray.length);
			this.mpCustomResultsLines	= new Array(mpResultsArray.length);
			this.mpCustomResultsHeight	= new Array(mpResultsArray.length);
			this.mpCustomResultsIds     = new Array(mpResultsArray.length);

			for (i = 0; i < mpResultsArray.length; i++) {
				tmpArray = mpResultsArray[i].split("&");
				this.mpCustomResultsNames[i]  = tmpArray[0];
				this.mpCustomResultsPlaces[i] = tmpArray[1];
				this.mpCustomResultsKOs[i]    = tmpArray[2];
				this.mpCustomResultsLines[i]  = tmpArray[3];
				this.mpCustomResultsHeight[i] = tmpArray[4];
			}

			this.mpCustomResultsAvatars = new Array(this.mpCustomResultsNames.length);
			
			for (i = 0; i < this.mpCustomResultsNames.length; i++) {
				if (this.mpCustomResultsNames[i] != 0) {
					this.mpCustomResultsAvatars[i] = this.playerAvatars[this.mpCustomResultsNames[i]-1];
					this.mpCustomResultsIds[i] = this.playerIds[this.mpCustomResultsNames[i]-1];
					this.mpCustomResultsNames[i] = this.playerNames[this.mpCustomResultsNames[i]-1];
				} else {
					this.mpCustomResultsNames[i] = username;
					this.mpCustomResultsIds[i] = -1;
					this.mpCustomResultsAvatars[i] = userAvatar;
				}
			}
		}
		for (var i=5;i<resultsArray.length-end;i++) {
			tmpArray = resultsArray[i].split("&");
			this.label[i-5] = tmpArray[0];
			this.value[i-5] = tmpArray[1];
		}

		// Adding more player info to gameData[0]
		this.gameData[0] = this.gameData[0] + "&" + username + "&" + userAvatar + "&" + this.rank + "&" + this.halfStars; 
		
	} else {
		this.gameData = resultsArray[resultsArray.length-1];
		for (var i=5;i<resultsArray.length-1;i++) {
			tmpArray = resultsArray[i].split("&");
			this.label[i-5] = tmpArray[0];
			this.value[i-5] = tmpArray[1];
		}
	}
}

var rankNames = Array(	"Newbie",
		"Novice",
		"Trainee",
		"Rookie",
		"Apprentice",
		"Journeyman",
		"Hobbyist",
		"Practitioner",
		"Achiever",
		"Specialist",
		"Professional",
		"Veteran",
		"Expert",
		"Elite",
		"Champion",
		"Genius",
		"Prodigy",
		"Guru",
		"Master",
		"Grand Master");

var replayProductId;
var gameResultsGameData;
var gameResultsNames;
var gameResultsAvatars;
var gameResultsIsMultiplayer;
var isAdPlaying = false;
var isEmailVerified = false;
var isReplayReady = false;
var isReplayStarted = false;
var gameResultsMissionAchievements = false;
var gameResultsAdvanceRank = false;
var gameResultsLeaderboardRank = false;
var gameResultsMissions = false;
var gameResultsRankChangeType = null;
var gameResultsCurrentRank = -1;
var gameResultsPromotionRank = -1;
var gameResultsAchievementPopup = false;
var gameResultsGuestNotice = true;
var gameResultsHeaderInterval;
var gameResultsBgLoaded;
var gameResultsNeedsStartWinAnim;
var gameResultWinAnimId;
var windowHasFocus = true;
var intervalTimer = -1;

var gameResultNotices = new Array();
var currGameResultNotice;

function gameResultsUpdateResults(inResult, inAkamaiPath, inIsAd, inIsEmailVerified, inWinAnimId, inWinToneId, inWinAnimName, inWinToneName, inWinnerName, inVolume)
{
    var html;
    var i;
    var headerClass;

    gameResultsBgLoaded = false;
    gameResultsNeedsStartWinAnim = false;
    gameResultsAdvanceRank = false;
    gameResultsAchievementPopup = false;
    isEmailVerified = (inIsEmailVerified == "true" || inIsEmailVerified == true);

	if (inResult.headingId == 0)
	{
		headerClass = "game_results_alltime_header";
	}
	else if (inResult.headingId == 1)
	{
		headerClass = "game_results_goodgame_header";
	}
	else if (inResult.headingId == 2)
	{
		headerClass = "game_results_nicetry_header";
	}
	else if (inResult.headingId == 3)
	{
		headerClass = "game_results_first_place_header";
	}
	else if (inResult.headingId == 4)
	{
		headerClass = "game_results_second_place_header";
	}
	else if (inResult.headingId == 5)
	{
		headerClass = "game_results_third_place_header";
	}
	else if (inResult.headingId == 6)
	{
		headerClass = "game_results_fourth_place_header";
	}
	else if (inResult.headingId == 7)
	{
		headerClass = "game_results_fifth_place_header";
	}
	else if (inResult.headingId == 8)
	{
		headerClass = "game_results_winby3ko_header";
	}
	else if (inResult.headingId == 9)
	{
		headerClass = "game_results_win_header";
	}
	else if (inResult.headingId == 10)
	{
		headerClass = "game_results_lose_header";
	}
	else if (inResult.headingId == 11)
	{
		headerClass = "game_results_draw_header";
	}
	else if (inResult.headingId == 12)
	{
		headerClass = "game_results_sixth_place_header";
	}

	if (inResult.isLoggedIn)
	{
		html = $("#profile_tokens_value").html();
		var totalPoints = Number(html);
		totalPoints += inResult.points;
		$("#profile_tokens_value").html(totalPoints);
	}

	$("#game_results_header").addClass(headerClass);
	
	if (inResult.headingId == 0) {
		$("b.game_results_best_game_header").html("New Best Game!");
		$("b.game_results_best_game_header").css("color", "#FF0000");
	} else {
		$("b.game_results_best_game_header").html("Your Best Game");
	}
	
	if (inResult.isMultiplayer) {
		// Display new MP information (Main - Page 1)
		for (i=0; i<inResult.mpCustomResultsNames.length; i++) {
			var callbackFunc = function () {};
			var playerInfo = inResult.mpCustomResultsNames[i];
			var prefix = "th";
			var place = i;
			
			if (inResult.productId == 86 || inResult.productId == 4) {
				place = inResult.mpCustomResultsPlaces[i]-1;
			}
		
			switch (place+1) {
				case 1:
					prefix = "st";
					break;
				case 2:
					prefix = "nd";
					break;
				case 3:
					prefix = "rd";
					break;
			}
			
			// Create html for user info (avatar and name)
			if (inResult.productId == 100) {
				playerInfo = "<b>" + inResult.mpCustomResultsNames[i] + "</b><div"+(inWinnerName == inResult.mpCustomResultsNames[i]?" class='results_winner_frame'":"")+"><img class='game_results_avatar_image' src='" + inAkamaiPath + "/images/avatars/" + inResult.mpCustomResultsAvatars[i] + "' alt='' /></div>"
			} else {
				playerInfo = "<img class='game_results_avatar_image' src='" + inAkamaiPath + "/images/avatars/" + inResult.mpCustomResultsAvatars[i] + "' alt='' />" + "<b>" + inResult.mpCustomResultsNames[i] +  "</b>";
			}
			
			// Generate link for normal users (not guest or anonymous)
			if ((inResult.mpCustomResultsNames[i].toLowerCase().replace(/^\s+|\s+$/g, '') != "guest") 
					&& (inResult.mpCustomResultsNames[i].toLowerCase().replace(/^\s+|\s+$/g, '') != "anonymous")
					&& inResult.mpCustomResultsNames[i].toLowerCase().replace(/^\s+|\s+$/g, '') != "ai") 
			{
				var tmpId = inResult.mpCustomResultsIds[i];
				
				if (tmpId == -1) {
					tmpId = "";
				} else {
					tmpId = "?id=" + tmpId;
				}
				
				playerInfo = "<a href='/users/profile.php" + tmpId + "' target='_blank' onclick='clearInterval(intervalTimer); intervalTimer = -1;'>" + playerInfo + "</a>";
			}

			// Generate html for specific MP variants
			if (inResult.productId == 101) {
				html = "<p>" + (place+1) + prefix + playerInfo + "<font>" + formatSprintTime(inResult.mpCustomResultsTimes[i]) + "</font></p>";
			}
			else if (inResult.productId == 100 || inResult.productId == 2) {
				html = "<p>" + playerInfo + "<span id='game_results_contestant_message" + i + "' class='game_results_contestant_message'></span><span>KO<font>" + inResult.mpCustomResultsKOs[i] + "</font></span><span>Lines Sent<font>" + inResult.mpCustomResultsLines[i] + "</font></span><span>Height<font>" + inResult.mpCustomResultsHeight[i] + "</font></span></span>";
				
				// Use AJAX to fill player info post-game
				if (i == 0) {
					callbackFunc = function () { $('#game_results_contestant_message0').load('/users/ajax/player_info.php', function () { $('#game_results_contestant_message0 > p').fadeIn('slow'); }) };
				} 
				else if (i == 1) {
					callbackFunc = function () { $('#game_results_contestant_message1').load('/users/ajax/player_info.php?id=' + inResult.playerIds[0], function () { $('#game_results_contestant_message1 > p').fadeIn('slow'); }) };
				}
			}
			else if (inResult.productId == 86) {
				if (i == 0) {
					html = "<span class='game_results_ko_label'>KO</span><span class='game_results_lines_label'>Lines Sent</span><span class='game_results_lines_height'>Height</span>";
				} else {
					html = '';
				}
				html += "<p>" + (place+1) + prefix + playerInfo + "<span class='game_results_contestant_kos'>" + inResult.mpCustomResultsKOs[i] + "</span><span class='game_results_contestant_lines'>" + inResult.mpCustomResultsLines[i] + "</span><span class='game_results_contestant_height'>" + inResult.mpCustomResultsHeight[i] +"</span></p>";
			}
			else if (inResult.productId == 4) {
				if (i == 0) {
					html = "<span class='game_results_time_label'>TIME</span>";
				} else {
					html = '';
				}
				html += "<p>" + (place+1) + prefix + playerInfo + "<span class='game_results_contestant_time'>" + inResult.mpCustomResultsTimes[i] + "</span></p>";
			}
			
			$("#game_results_contestant" + i ).html(html);
			
			// html() function doesn't seem to support callbacks...
			callbackFunc();
		}

		
		// Display new MP information (Main - Page 2)
		html = "<p>" + inResult.username + "</p><img src='" + inAkamaiPath + "/images/avatars/" + inResult.userAvatar + "' alt='' />";
		
		$("#game_results_player").html(html);
		
		displayRank('game_results_rank', inResult.rank, 1, true, null, inAkamaiPath);
		displayRank('game_results_prev_rank', inResult.prevRank, 1, true, null, inAkamaiPath);
		displayHalfStars('game_results_stars', inResult.halfStars, null, inAkamaiPath);
		displayHalfStars('game_results_prev_stars', inResult.prevHalfStars, null, inAkamaiPath);
		
		if (inResult.starMessage && inResult.starMessage != "null") {
			$("#game_results_star_message").html("<p>"+inResult.starMessage+"</p>");
			
			if ((inResult.starMessage).toLowerCase().indexOf("ranked down") != -1) {
				$("#game_results_rank_change_arrow").addClass("game_results_rank_down_arrow");
				gameResultsRankChangeType = "down";
			}
			else if ((inResult.starMessage).toLowerCase().indexOf("ranked up") != -1) {
				$("#game_results_rank_change_arrow").addClass("game_results_rank_up_arrow");
				gameResultsRankChangeType = "up";
			}
			else {
				var starChange = inResult.halfStars - inResult.prevHalfStars;
				
				if (starChange == 1 || starChange == -1) {
					starChange = starChange + "/" + 2;
				} else {
					starChange = starChange/2;
				}
				
				if ((inResult.halfStars - inResult.prevHalfStars) > 0) {
					starChange = "+" + starChange;
				}
				
				$("#game_results_rank_change_arrow").html("<p>" + starChange + "</p");
			}
		} else {
			displayRank('game_results_rank', inResult.rank, 1, true, null, inAkamaiPath);
		}
		
		// TEST for Rally 8P
		if (replayProductId == 4) {
			$('#game_results_rank').hide();
			$('#game_results_prev_rank').show();
			$('#game_results_prev_stars').show();
			
			$('div.game_results_main_info2').fadeIn('slow', function () { gameResultsAnimateStars(3); } );
			$('div.game_results_main_info').hide();
			$('a.game_results_main_prev_page').show();
			$('a.game_results_main_next_page').hide();
		}
	} else {
		$("#game_results_main_stat").html(inResult.label[0] + ": " + inResult.value[0]);

		if (inResult.productId == 11) {
			$("#game_results_secondary_stat").html(inResult.label[1] + ": " + inResult.value[1]);
		}
		
		// Percentile .....
		if (inResult.productId == 84 && inResult.headingId == 2) {
			$("#percent_arrow").css("left", "43px");
			$("#percent_txt").html("Percentile Rank<font>--</font></p>");
		} else {
			$("#percent_txt").html("Percentile Rank<font>" + $("#percent_txt").html() + "</font></p>");
		}
	}

	// Tokens......
	html = "<table>";
	for (i=0;i<inResult.awardLabel.length;i++)
	{
		html += "<tr><th>";
		html += inResult.awardLabel[i];
		html += "</td><td>";
		html += inResult.awardValue[i];
		html += "</td></tr>";
	}
	if (inResult.rankAlltime > 0) {
		html += "<tr><th>";
		html += "Ranked in the Top 100 of All Time";
		html += "</td><td>";
		html += 100;
		html += "</td></tr>";
	}
	if (inResult.rankDaily > 0) {
		html += "<tr><th>";
		html += "Ranked in the Top 100 of Today";
		html += "</td><td>";
		html += 10;
		html += "</td></tr>";
	}
	
	html += "<tr class='game_total_tokens_row'><th>";
	html += "<p>Total Bonus:</p>";
	html += "</th><td>";
	html += inResult.points;
	html += "</td></tr>";
	html += "</table>";
	$("#mini_profile_token_msg").html(html);

	// Stats ........
	var index;
    var resultCount;
    var resultHalf;
    var singleIndex;
    var is6pWithMaps = false;

	resultCount = inResult.label.length;
	resultHalf = Math.round(resultCount / 2);
	
	// The right side of the page always starts with the "Singles" statistic
	// NOTE: Default to half of the data just in case "Singles" isn't found!
	singleIndex = resultHalf;	

	if (inResult.productId != 86 && inResult.productId != 4) {

		for (i=0; i<resultCount; i++)
		{
			if (inResult.label[i] == 'Singles')
			{
				singleIndex = i;
	
				if (singleIndex > (resultCount - singleIndex)) {
					resultHalf = singleIndex;
				} else {
					resultHalf = resultCount - singleIndex;
				}
			}
		}
		
	} else {
		
		for (i=0; i<resultCount; i++)
		{
			if (inResult.label[i] == 'Map') {
				if (inResult.value[i] != 'None') {
					is6pWithMaps = true;
				}
			}
		}
		
	}

	index = 0;
	
	html = "<table class='game_stat_left_column'>";
	
	for (i=0;i<resultCount;i++)
	{
		html += "<tr>";
		
		if ((index + 1) % 2 == 0)
		{
			html += "<th class='game_stat_even_row'>";

			if (i < inResult.label.length) {
				html += inResult.label[i];
			}

			html += "&nbsp;</th><td class='game_stat_even_row'>&nbsp;";

			if (i < inResult.value.length) {
				html += inResult.value[i];
			}
		}
		else
		{
			html += "<th>";

			if (i < inResult.label.length) {
				html += inResult.label[i];
			}
			
			html += "&nbsp;</th><td>&nbsp;";

			if (i < inResult.value.length) {
				html += inResult.value[i];		
			}
		}
		
		html += "</td></tr>";

		// Are we finished with the table?
		if (i+1 == singleIndex && i < resultHalf)
		{
			for (var j=0; j<(resultHalf-(i+1)); j++)
			{
				index += 1;

				if ((index + 1) % 2 == 0)
				{
					html += "<tr><th class='game_stat_even_row'>&nbsp;</th><td class='game_stat_even_row'>&nbsp;</td></tr>";
				}
				else
				{
					html += "<tr><th>&nbsp;</th><td>&nbsp;</td></tr>";
				}
			}
			
			html += "</table><table class='game_stat_right_column'>";
			index = 0;
		}
		else if (i+1 > singleIndex && resultCount - (i+1) == 0) 
		{
			// Finish Right Column
			for (var j=index; j+1<resultHalf; j++)
			{
				index += 1;

				if ((index + 1) % 2 == 0)
				{
					html += "<tr><th class='game_stat_even_row'>&nbsp;</th><td class='game_stat_even_row'>&nbsp;</td></tr>";
				}
				else
				{
					html += "<tr><th>&nbsp;</th><td>&nbsp;</td></tr>";
				}
			}
			html += "</table>";
		}
		else
		{
			index += 1;
		}
	}
	html += "</table>";
	html += "<div class='clear'></div>";
	$("#game_results_details").html(html);

	 replayProductId = inResult.productId;
	 gameResultsIsMultiplayer = inResult.isMultiplayer;
	 gameResultsGameData = inResult.gameData;
	 gameResultsNames  = inResult.playerNames;
	 gameResultsAvatars  = inResult.playerAvatars;
	 
	 if (gameResultsAvatars != undefined && gameResultsAvatars != "undefined") {
		 // Restore full filepath to avatars for replayer
		 for (var l=0; l<gameResultsAvatars.length;l++) {
			 gameResultsAvatars[l] = inAkamaiPath + "/images/avatars/40X40/" + gameResultsAvatars[l];
		 }
	 }
		 
	 // Checks if user is Guest then adds to notice array
	 if(!inResult.isLoggedIn)
	 {
		gameResultsGuestNotice = true;
		gameResultNotices.push('#game_results_guest_notice', 'auto');
	 }	 
	 
	 // Checks if user placed on leaderboard then adds to notice array
	 if (inResult.rankAlltime > 0 || inResult.rankDaily > 0)
	 {
		 if (inResult.rankAlltime > 0)
		 {
		    points = $('#mini_profile_points').html();
		    $('#mini_profile_points').html(parseInt(points) + 100);
		 } 
		 if (inResult.rankDaily > 0) {
		    points = $('#mini_profile_points').html();
		    $('#mini_profile_points').html(parseInt(points) + 10);
		 }
		 gameResultsPopUpLeaderboard(inResult.rankAlltime, inResult.rankDaily, inResult.productId);
	 }

	 // Checks if a Promotion/Demotion available then adds to notice array
	 if (inResult.advanceRank != 0)
	 {
		 var changeType = "promote";
		 
		 if (inResult.rank > inResult.advanceRank) {
			 changeType = "demote";
		 }

		 if (inResult.headingId != 10 
				 && !(inResult.productId == 86 && changeType == "promote" && inResult.headingId != 3) 
				 && !(inResult.productId == 101 && changeType == "promote" && inResult.headingId != 3)
				 && !(inResult.productId == 86 && changeType == "demote" && inResult.headingId != 12)
				 && !(inResult.productId == 101 && changeType == "demote" && inResult.headingId != 7)
				 && !is6pWithMaps)
		 {
			 gameResultsPopUpAdvanceQuestion(inResult.advanceRank, inResult.rank, inResult.productId);
		 	$('div.game_results_footer > table.game_buttons').hide();
		 }
	 }
	 
	 // Checks if user has missions then adds to notice array
	 if (inResult.isLoggedIn && gameResultMissions != undefined && gameResultMissions.length > 0)
	 {
		 var isActiveFound = false;
		 var missionIndex;
		 for(missionIndex = 0; missionIndex < gameResultMissions.length; missionIndex++)
		 {
			 if(gameResultMissions[missionIndex].status == 1)	//active
			 {
				 isActiveFound = true;
				 break;
			 }
		 }
		 if (isActiveFound)
		 {
			 gameResultsPopUpMissions();
		 }
	 }

	 // Flag isAdPlaying if user should see an ad
	 if (inIsAd) {
		 isAdPlaying = true;
	 }
		 
	 // Check if user has achievements/expirations
	 gameResultsMissionAchievements = gameResultsHasMissionAchivements();

	 if (gameResultsMissionAchievements) {
		 gameResultsDisplayAchievementPopups(inAkamaiPath);
	 } else {
		 if (inIsAd && inResult.isLoggedIn && (gameResultMissions == undefined || gameResultMissions.length == 0)) {
			 showMissionPromoPopup(true, inAkamaiPath, inResult.productId);
			 //gameResultsLoadOASVideo(inAkamaiPath);
		 } else {
			 gameResultsLoadOASIAB();
			 gameResultsShowNotices();
		 }
	 } 
	 if (inResult.isMultiplayer) {
		 gameResultWinAnimId = inWinAnimId;
		 if (gameResultWinAnimId > 6000) {
			 $("#game_results_header").hide();
		 }
		 gameResultsLoadWinAnimBg(inResult.productId, inResult.headingId, inResult.userAvatar, inResult.username, inWinAnimId, inWinToneId, inWinAnimName, inWinToneName, inWinnerName, inVolume, inAkamaiPath);
		 if (!inIsAd && !gameResultsMissionAchievements) {
			 intervalTimer = setInterval("toggleMainInfoPage(true)", 7000);
			 gameResultsPlayWinAnim();
		 }
	 } else {
		 gameResultsLoadBg(inResult.productId, inResult.headingId, inAkamaiPath);
	 }
}

function js_gameResultBgLoaded() {
	gameResultsBgLoaded = true;
	if (gameResultsNeedsStartWinAnim) {
		gameResultsStartWinAnim();
	}
}

function js_gameResultBgTextColor(inColorStr) {
	//TODO get all the styles to change color
	$('div.game_results_player > p, div.game_results_rank_change_arrow > p, div.game_results_rank > p, div.game_results_contestant > p > span, div.game_results_star_message > p').css('color', inColorStr);
}

function gameResultsStartWinAnim() {
	gameResultsNeedsStartWinAnim = false;
	document.getElementById("game_results_bg_content").as3_startResultsAnimation();
	clearInterval(gameResultsHeaderInterval);
	if (gameResultWinAnimId > 6000) {
		$("#game_results_header").hide();
		gameResultsHeaderInterval = setInterval("gameResultsShowHeader()", 6500);
	} else {
		$('#game_results_header').show();
	}
}

function gameResultsWinAnimShowPage2() {
	document.getElementById("game_results_bg_content").as3_showResultsAnimationPage2();
}

function gameResultsPlayWinAnim() {
	if (gameResultsIsMultiplayer && gameResultsBgLoaded) {
		gameResultsStartWinAnim();
	} else {
		gameResultsNeedsStartWinAnim = true;
	}
}

function gameResultsPauseWinAnim() {
	if (gameResultsIsMultiplayer && gameResultsBgLoaded) {
		clearInterval(intervalTimer);
		document.getElementById("game_results_bg_content").as3_pauseResultsAnimation();
	}
}

function gameResultsShowHeader() {
	if (gameResultsHeaderInterval != -1) {
		clearInterval(gameResultsHeaderInterval);
		gameResultsHeaderInterval = -1;
	}
	$('#game_results_header').fadeIn('slow');
}

function gameResultsLoadWinAnimBg(inProductId, headingId, userAvatar, userName, inWinAnimId, inWinToneId, inWinAnimName, inWinToneName, inWinnerName, inVolume, inAkamaiPath) {
	var swfPath;
	var playerNames;
	var playerAvatars;
	var resultsType;
	var starType;
	
	if (gameResult.starType == "up") {
		starType = 1;
	} else if (gameResult.starType == "down") {
		starType = -1;
	} else {
		starType = 0;
	}

	switch (Number(inProductId)) {
		default:
		case 100:
			if (headingId == 10) {
				resultsType = -1; // loss
				$("div#game_results_content").addClass("game_results_lose");
			} else {
				resultsType = 1;
			}
		break;
		case 101:
			if (headingId == 3) {
				resultsType = 1; // win
			} else {
				resultsType = -1;
				$("div#game_results_content").addClass("game_results_lose");
			}
		break;
		case 86:
			if (headingId == 3) {
				resultsType = 1; // win
			} else {
				resultsType = -1;
				$("div#game_results_content").addClass("game_results_lose");
			}
		break;
		case 4:
			if (headingId == 3) {
				resultsType = 1; // win
			} else {
				resultsType = -1;
				$("div#game_results_content").addClass("game_results_lose");
			}
		break;
	}
	
	if (inWinToneId <= 0 && inWinAnimId <= 0) {
		$('#game_results_wineffects_no_tone').hide();
		$('#game_results_wineffects_all').hide();
		$('#game_results_wineffects_no_grafix').hide();
		if (resultsType >= 0) {
			$('#game_results_effect_get_one').hide();
		} else {
			$('#game_results_win_anim_msg').hide();
		}
	} else if (inWinToneId <= 0) {
		$('#game_results_wineffects_none').hide();
		$('#game_results_wineffects_all').hide();
		$('#game_results_wineffects_no_grafix').hide();	
		
		$('#game_results_win_grafix_name').html(inWinAnimName);
		$('#game_results_win_grafix_name').attr("href", '/shop/index.php?accessoryType=6&accessoryId='+inWinAnimId);
		
		if (resultsType >= 0) {
			$('#game_results_effect_get_one').hide();
		} else {
			$('#game_results_effect_shop').hide();
			$('#game_results_you_use').html(inWinnerName + " is using");
		}
	} else if (inWinAnimId <= 0) {
		$('#game_results_wineffects_none').hide();
		$('#game_results_wineffects_all').hide();
		$('#game_results_wineffects_no_tone').hide();
		
		$('#game_results_win_tone_name').html(inWinToneName);
		$('#game_results_win_tone_name').attr("href", '/shop/index.php?accessoryType=5&accessoryId='+inWinToneId);

		if (resultsType >= 0) {
			$('#game_results_effect_get_one').hide();
		} else {
			$('#game_results_effect_shop').hide();
			$('#game_results_you_use1').html(inWinnerName + " is using");
		}
	} else {
		$('#game_results_wineffects_none').hide();
		$('#game_results_wineffects_no_tone').hide();
		$('#game_results_wineffects_no_grafix').hide();
		
		$('#game_results_win_grafix_name1').html(inWinAnimName);
		$('#game_results_win_grafix_name1').attr("href", '/shop/index.php?accessoryType=6&accessoryId='+inWinAnimId);
		
		$('#game_results_win_tone_name1').html(inWinToneName);
		$('#game_results_win_tone_name1').attr("href", '/shop/index.php?accessoryType=5&accessoryId='+inWinToneId);
		
		if (resultsType >= 0) {
			$('#game_results_effect_get_one').hide();
		} else {
			$('#game_results_effect_shop').hide();
			$('#game_results_you_use2').html(inWinnerName + " is using");
		}
	}

	swfPath = inAkamaiPath + "/images/winGrafix/OWResultsAnimation.swf";
	var str;
	
	if (inProductId == 100) {
		if (inWinnerName == userName) {
			playerNames = userName;
			playerNames += "," + gameResultsNames[0];
			playerAvatars = inAkamaiPath + "/images/avatars/40X40/" + userAvatar;
			str = gameResultsAvatars[0];
			if (str.lastIndexOf("/") != -1)
			{
				str = str.slice(str.lastIndexOf("/")+1, str.length);
			}
			str = inAkamaiPath + "/images/avatars/40X40/" + str;
			playerAvatars += "," + str;
		} else {
			playerNames = gameResultsNames[0];
			playerNames += "," + userName;
			str = gameResultsAvatars[0];
			if (str.lastIndexOf("/") != -1)
			{
				str = str.slice(str.lastIndexOf("/")+1, str.length);
			}
			str = inAkamaiPath + "/images/avatars/40X40/" + str;
			playerAvatars = str;
			playerAvatars += "," + inAkamaiPath + "/images/avatars/40X40/" + userAvatar;
		}
	} else {
		if (inWinnerName == userName) {
			playerNames = userName;
			playerNames += "," + gameResult.mpCustomResultsNames[1];
			playerAvatars = inAkamaiPath + "/images/avatars/40X40/" + userAvatar;
			str = gameResult.mpCustomResultsAvatars[1];
			if (str.lastIndexOf("/") != -1)
			{
				str = str.slice(str.lastIndexOf("/")+1, str.length);
			}
			str = inAkamaiPath + "/images/avatars/40X40/" + str;
			playerAvatars += "," + str;
		} else {
			playerNames = gameResult.mpCustomResultsNames[0];
			playerNames += "," + userName;
			str = gameResult.mpCustomResultsAvatars[0];
			if (str.lastIndexOf("/") != -1)
			{
				str = str.slice(str.lastIndexOf("/")+1, str.length);
			}
			str = inAkamaiPath + "/images/avatars/40X40/" + str;
			playerAvatars = str;
			playerAvatars += "," + inAkamaiPath + "/images/avatars/40X40/" + userAvatar;
		}
	}
	
	inProductId = Number(inProductId);
	inWinAnimId = Number(inWinAnimId);
	inWinToneId = Number(inWinToneId);

	flashVars = {
			productId: inProductId,
			winAnimId: inWinAnimId==6000?0:inWinAnimId,
			winToneId: inWinToneId==5000?0:inWinToneId,
			names: playerNames,
			avatars: playerAvatars,
			resultType: resultsType,
			starType: starType,
			volume: inVolume
	      };
	swfobject.embedSWF(swfPath, "game_results_bg_content", 616, 355, "9.0.0", {}, flashVars, {wmode: "opaque"}, {allowscriptaccess: "always"}, {id:"gameBGSwf", name:"gameBGSwf"});
}

function gameResultsLoadBg(productId, headingId, inAkamaiPath) {
	var swfPath;
	
	switch (Number(productId)) {
		case 10:
			swfPath = inAkamaiPath + "/images/results/AnimatedBackgroundMarathon.swf";
			break;
		case 11:
			swfPath = inAkamaiPath + "/images/results/AnimatedBackgroundIceAge.swf";
			break;
		case 12:
			swfPath = inAkamaiPath + "/images/results/AnimatedBackgroundSurvival.swf";
			break;
		case 23:
			swfPath = inAkamaiPath + "/images/results/AnimatedBackgroundUltra.swf";
			break;
		case 84:
			swfPath = inAkamaiPath + "/images/results/AnimatedBackgroundSprint.swf";
			break;
		case 102:
			swfPath = inAkamaiPath + "/images/results/AnimatedBackgroundMono.swf";
			break;
		default:
			swfPath = inAkamaiPath + "/images/results/AnimatedBackgroundMarathon.swf";
			break;
	}
	
	if (swfPath != null) {  
		swfobject.embedSWF(swfPath, "game_results_bg_content", 616, 355, "9.0.0", {}, {}, {wmode: "opaque"}, {allowscriptaccess: "always"}, {id:"gameBGSwf", name:"gameBGSwf"});
	}
}

var numOfStarAnimations = 3;
function toggleMainInfoPage(isAutomated) {
	if ($('div.game_results_main_info2').css('display') == "none") {
		$('#game_results_rank').hide();
		$('#game_results_prev_rank').show();
		$('#game_results_prev_stars').show();
		
		$('div.game_results_main_info2').fadeIn('slow', function () { gameResultsAnimateStars(numOfStarAnimations); } );
		$('div.game_results_main_info').fadeOut('slow');
		$('a.game_results_main_prev_page').show();
		$('a.game_results_main_next_page').hide();
		
		gameResultsWinAnimShowPage2();
		
	} else {
		$('div.game_results_main_info').fadeIn('slow');
		$('div.game_results_main_info2').fadeOut('slow');
		$('#game_results_prev_stars').hide();
		
		$('a.game_results_main_prev_page').hide();
		$('a.game_results_main_next_page').show();
		
		gameResultsPlayWinAnim();
	}
	
	if (!isAutomated && intervalTimer != -1) {
		clearInterval(intervalTimer);
		intervalTimer = -1;
	}
}

function gameResultsAnimateStars(numberOfFades) {
	var fadeFunc = function () { };

	if (numberOfFades >= 0) {
		$('#game_results_stars').show();
		
		fadeFunc = "$('#game_results_prev_stars').fadeIn('fast',  function() { $('#game_results_prev_stars').fadeOut('fast', function() { gameResultsAnimateStars(numberOfFades - 1); }) });";

		if (numberOfFades == 0) {
			fadeFunc += "$('#game_results_stars').fadeIn('slow');";
			
			if (gameResultsRankChangeType != null) {
				fadeFunc += "$('#game_results_prev_rank').fadeOut('slow', function () { ";
				if (gameResultsRankChangeType.indexOf("promote") == -1 
						&& gameResultsRankChangeType.indexOf("demote") == -1 
						&& gameResultsRankChangeType.indexOf("down") == -1) 
				{
					fadeFunc += "$('#game_results_rank').fadeOut('fast', function () {displayHalfStars('game_results_stars', 4, true, AD_AKAMAI_PATH); $('#game_results_rank').fadeIn('fast'); });";
					numOfStarAnimations = 0;
				}
				else if (gameResultsRankChangeType.indexOf("down") != -1) {
					numOfStarAnimations = 0;
				}
				
				fadeFunc += "$('#game_results_rank').fadeIn('fast'); } );";
			}
		}
	}

	eval(fadeFunc);
}

function gameResultsShowNotices()
{
	var funcFadeIn   = function () { };
	var funcFadeAuto = function () { };
	var noticeEffect;
	var noticeName;
	
	if (gameResultNotices.length != 0) {
		noticeEffect = gameResultNotices.pop();
		noticeName   = gameResultNotices.pop();
		
		// Set up funcFadeAuto if notice should auto-transition
		if (noticeEffect == 'auto') {
			funcFadeAuto = 
				function () {
					setTimeout('gameResultsShowNotices()', 5000);
				};
		}

		// Set up callback function for fade in of new notice
		funcFadeIn = function () { 
						$(noticeName).fadeIn('slow', funcFadeAuto);
					 };

		// Set up fade out function (and use fade in callback), else use fade in
		if (currGameResultNotice != null) {
			funcFadeOut = function () { 
							$(currGameResultNotice).fadeOut('slow', funcFadeIn);
						  };
		} else {
			funcFadeOut = funcFadeIn;
		}
		
		// Execute final combined function
		funcFadeOut();
		currGameResultNotice = noticeName;
	} else {
		if (currGameResultNotice != null) {
			$(currGameResultNotice).fadeOut('slow');
			currGameResultNotice = null;
		}
	}
}
function gameResultsPopUpAdvanceQuestion(advanceRank, rank, productId) {
	gameResultsAdvanceRank = true;
	gameResultsCurrentRank = rank;
	gameResultsPromotionRank = advanceRank;
 	gameResultNotices.push('#game_results_advance_popup', 'manual');

	$('div#game_results_advance_popup').load('/games/ajax/game_results_advance_popup.php?advanceRank=' + advanceRank + '&rank=' + rank + '&productId=' + productId);
}
function gameResultsPopUpLeaderboard(rankAlltime, rankDaily, productId) {
	gameResultsLeaderboardRank = true;
    gameResultNotices.push('#game_results_rank_popup', 'auto');		 

	$('div#game_results_rank_popup').load('/games/ajax/game_results_rank_popup.php?rankAlltime=' + rankAlltime + "&rankDaily=" + rankDaily+ "&productId=" + productId);
}
function gameResultsPopUpMissions() {
	gameResultsMissions = true;
	gameResultNotices.push('#game_results_missions_popup', 'auto');
	$('div#game_results_missions_popup').load('/games/ajax/game_results_missions_popup.php');
}
function gameResultsRankUp(isLoggedIn, loginId, rank, changeType, productId, inAkamaiPath)
{
	if (isLoggedIn) {
		
		url = "/users/ajax/rank_up.php";
		$.post(url, {rank: rank, productId: productId}, function(data)
				{
				});
	} else {
		flashVars = {
				productID: productId,
				rank: rank,
				halfStars: 4
		      };
		
		swfobject.embedSWF(inAkamaiPath + "/games/OWGuestCookieUpdate.swf", "results_hidden_swf_content", 1, 1, "9.0.0", {}, flashVars, {wmode: "opaque"}, {allowscriptaccess: "always"}, {id:"results_hidden_swf_content", name:"results_hidden_swf_content"});
	}
	
	var path = inAkamaiPath;
	displayRank('game_results_rank', rank, 1, true, true, (path=="")?null:path);
	displayHalfStars('game_results_stars', 4, true, (path=="")?null:path);
	
	$("#game_results_rank_change_arrow").html("");
	
	if (changeType == "promote") {
		$("#game_results_rank_change_arrow").addClass("game_results_rank_up_arrow");
		$("#game_results_star_message").html("You\'ve been promoted.<br />Your Star Meter has been reset.");
		gameResultsRankChangeType = "promote";
	} else if (changeType == "demote") {
		$("#game_results_rank_change_arrow").addClass("game_results_rank_down_arrow");
		$("#game_results_star_message").html("You\'ve been demoted.<br />Your Star Meter has been reset.");
		gameResultsRankChangeType = "demote";
	}

	gameResultsClosePopupLb();
}

function gameResultsShowMissions(inProductId, inAkamaiPath, inIsLoggedIn)
{
	var activeMissions = gameResultsShowActiveMissions(1, inAkamaiPath);
	var missions = "";
	var tipContent;
	var numMissions = Math.floor(activeMissions.length/2);
	for (var i = 0; i < numMissions*2; i+=2)
	{
		missions += activeMissions[i];
	}
	$("#game_results_missions_content_active").html(missions);
	for (var i = 0; i < numMissions*2; i+=2)
	{
		tipContent = activeMissions[i+1];
		$(document).ready(function() {
			$("#result_mission_icon_"+(i/2)).qtip({
				show: { delay: 0 },
				content: "<span class='tooltip_content'>"+tipContent+"</span>",
				position: { corner: { tooltip: "bottomLeft", target: "topMiddle" } },
				style: {
					width: "310",
					border: { width: 1, radius: 3, color: "#969696" },
					tip: { corner: "bottomLeft", color: "#969696", size: { x:20, y:10 } }
				}
			});
		});
	}
	$("#game_results_missions_content_active").css("height",(numMissions*60)+"px");
	if (numMissions <= 0)
	{
		$("#game_results_missions_content_active_header").html("");
	}
	gameResultsShowOtherMissions(inProductId,(numMissions<4? 4-numMissions:0), inIsLoggedIn);
}

function gameResultsShowActiveMissions(inStatus, inAkamaiPath)
{
	var mission;
	var missions = new Array();
	var missionId = 0;
	var missionProgress = 0;
	var missionName = "";
	var missionCompleted = 0;
	var missionToComplete = 0;
	var missionDateStarted = "";
	var missionDaysToComplete = 0;
	var missionType = "";
	var i;
	var missionLink = "";
	
	var numTotalMissions = gameResultMissions.length;
	var numMissions = 0;
	if (numTotalMissions > 0)
	{
		for (i=0; i<numTotalMissions; i++)
		{
			if (gameResultMissions[i].status == inStatus && numMissions < 4)
			{
				mission = "";
				missionCompleted = gameResultMissions[i].amountCompleted;
				missionToComplete = gameResultMissions[i].amountToComplete;
				missionProgress = ( missionCompleted/missionToComplete ) * 100;
				missionId = gameResultMissions[i].missionId;
				var imageprefix = "";
				if (missionId < 10)
				{
					imageprefix = "000";
				}
				else if (missionId < 100)
				{
					imageprefix = "00";
				}
				else if (missionId < 1000)
				{
					imageprefix = "0";
				}
				missionDateStarted = gameResultMissions[i].dateStarted;
				missionDaysToComplete = gameResultMissions[i].daysToComplete;
				if (missionId >= 5000) {
					missionLink = "/missions/premium_mission_list.php?tabId=available&missionId="+missionId;
				} else {
					missionLink = "/missions/personal_mission_list.php?tabId=available&collectionId="+gameResultMissions[i].collectionId+"&missionId="+missionId;
				}
	
				var imagepath = inAkamaiPath+"/images/missions/78x78/"+imageprefix+missionId+".png";
				j=0;
				var tipContent = "<div class='mission_text'><div class='mission_collection_name'>"
					+gameResultMissions[i].collectionName+"</div><div class='mission_name'>"
					+gameResultMissions[i].missionName+"</div><div class='mission_desc'>"
					+gameResultMissions[i].description+"</div>"
					+"<div class='mission_difficulty' style={height=0}></div></div>";
				mission += "<div class='mission_item'>";
				mission += "<a href='"+missionLink+"'>";
				mission += "<img class='mission_icon' id='result_mission_icon_"+numMissions+"' src='"+imagepath+"' border='0' alt='' />";
				mission += "</a>";
				mission += "<div class='mission_name'>"+gameResultMissions[i].missionName+"</div>";
				mission += "<div class='mission_progress_bar'><div class='mission_progress_bar_content' style='width:"+missionProgress+"%'/></div>";
				missionType = getMissionProgressType(gameResultMissions[i].productId, gameResultMissions[i].missionType);
				mission += "<div class='mission_progress_text'>"+missionCompleted+"/"+missionToComplete+" "+missionType+" </div>";
				mission += "<div class='mission_delta'>";
				
				if (gameResultMissions[i].deltaCompleted >= 0) {
					mission += "+";
				}
				
				mission += gameResultMissions[i].deltaCompleted;
				mission += "</div>";
				var time = calculateTimeLeft(missionDateStarted, missionDaysToComplete);
				var color = "#FF0000";
				if (time/60/60/24 > 1)
				{
					color = "#000000";
				}
				mission += "<div class='mission_time' style='color:"+color+"'>"+convertSecondsToWords(time)+" left</div>";
				mission += "</div>";
				missions.push(mission);
				missions.push(tipContent);
				numMissions++;
			}
		}
	}
	return missions;
}
var gameResultsAvailableMissions = "";
function gameResultsShowOtherMissions(inProductId, inMaxMissions, inIsLoggedIn)
{
	var omitIds = "";
	var i;
	if (inMaxMissions > 0)
	{
		for (i=0; i<gameResultMissions.length; i++)
		{
			if (i != 0)
			{
				omitIds += ",";
			}
			omitIds += gameResultMissions[i].missionId;
		}
		$.get("/missions/ajax/available_by_product.php?productId=" + inProductId + "&omitIds=" + omitIds + "&maxMissions=" + inMaxMissions,
		function(data){
			if (data == "" && gameResultsAvailableMissions != "") {
				data = gameResultsAvailableMissions;
			} else if (data != "" && gameResultsAvailableMissions == "") {
				gameResultsAvailableMissions = data;
			}
			$("#game_results_missions_content_available").html(data);
			if (data == "" && inIsLoggedIn)
			{
				gameResultsShowCompletedAll();
			}
			else 
			{
				$(".game_results_nav_item_missions").removeClass("game_results_nav_item_missions").addClass("game_results_nav_item_missions_gold");
			}
		});
	}
	else
	{
		gameResultsShowCompletedAll();
	}
}

function gameResultsShowCompletedAll()
{
	if ($("#game_results_missions_content_active_header").html() == "" && $("#game_results_missions_content_available_header").html() == "")
	{
		$("#game_results_missions_content_active").html("<div class='results_missions_all_complete'>You've completed all available Missions for this game.<br>Check out other available <a href='/missions/index.php?tabId=available'>Missions</a>.</div>");
	}
}

function gameResultsHasMissionAchivements() {
	var result = false;
	var i = 0;
	
	while (!result && i < gameResultMissions.length) {
		if (gameResultMissions[i].status == 0 || gameResultMissions[i].status == 2) {
			result = true;
		}
		i++;
	}
	
	return result;
}

function gameResultsDisplayAchievementPopups(inAkamaiPath, isNewWindow, headerHtml) {
	var totalRenderCount = 0;
	var totalCompleteCount = 0;
	var totalExpiredCount = 0;
	var totalMissionReward = 0;

	var popupHtml      = '<div id="mission_list_box" class="mission_list_box mission_achievement_popup">';
	var popupHeader    = '';
	var completedHtml  = '';
	var expiredHtml    = '';
	var collectionHtml = '';
	var isUserEmailVerified = (isEmailVerified == "true" || isEmailVerified == true);
	
	var collectionIds = new Array();
	var onFinishHook = function () { };
	var isPremiumMission = false;
	var recentCompleted = "";
	
	for (var i=0; i<gameResultMissions.length; i++) {
		var missionStatus = gameResultMissions[i].status;
		
		// Check if mission has expired or been achieved
		if (missionStatus == 0 || missionStatus == 2) {
			var tmpHtml = '';

			var collectionId       = gameResultMissions[i].collectionId;
			var collectionName     = gameResultMissions[i].collectionName;
			var collectionReward   = gameResultMissions[i].collectionPointsEarned;
			var collectionComplete = gameResultMissions[i].collectionIsCompleted;
			
			var tetriminoComplete = gameResultMissions[i].gridTetriminoIsCompleted;
			
			var missionId        = gameResultMissions[i].missionId;
			var missionName      = gameResultMissions[i].missionName;
			var missionDesc      = gameResultMissions[i].description;
			var missionReward    = gameResultMissions[i].pointsEarned;
			var missionClass     = gameResultMissions[i].missionClass;
			var missionProductId = gameResultMissions[i].productId;
			if (!isPremiumMission && missionStatus == 2 && missionClass.indexOf("premium") != -1) {
				isPremiumMission = true;
			}
			
			var swfUrl = inAkamaiPath + '/images/OWSoundPlayer.swf';
			var fileUrl = inAkamaiPath + '/images/missions/150x150/' + padNumber(missionId, 4) + '.swf';
			if (missionStatus == 2 && totalCompleteCount != 0) {
				swfUrl = fileUrl;
			}
			var flashVars = 'filePath='+fileUrl+'&'+((missionStatus == 0) ? 'swfState=1' : 'swfState=2')+'&height=150&width=150&soundName=badge0001&useControls=false';
			
			tmpHtml += '<div class="mission_item mission_detailed_item">';
			tmpHtml += '   <div class="mission_icon">';
			
			tmpHtml += getEmbedFlashHtml(swfUrl, "Badge" + missionId, 150, 150, flashVars);
			
			tmpHtml += '   </div>';
			tmpHtml += '   <div class="mission_info">';
			tmpHtml += '      <p class="name">' + collectionName + ' Collection</p>';
			tmpHtml += '      <p class="mission_name">' + missionName + '</p>';
			tmpHtml += '      <p class="mission_desc">' + missionDesc + '</p>';
			if (missionStatus != 0) {
				tmpHtml += '      <p class="textcenter mission_completion_text margintop_5px marginbottom_5px"><b>You earned this Badge';
				
				if (missionReward != 0) {
					tmpHtml += ' and ' + missionReward + ' Tokens!';
				} else {
					tmpHtml += '.';
				}
				totalMissionReward += parseInt(missionReward);
			}
			tmpHtml += '   </b></p></div>';

			tmpHtml += '   <div id="mission_star_rating' + missionId + '" class="mission_star_rating" onmouseout="updateRatingStarsState(\'#mission_star_rating' + missionId + '\', ' + 0 + ', \'Click to rate difficulty\', \'' + inAkamaiPath + '\')">';
			
			var starMessages = new Array('Piece of cake!', 'Easy enough', 'So-so', 'Kinda hard', 'Crazy hard!');
			
			for (var starCount = 1; starCount <= 5; starCount++) {
				tmpHtml += '<img border=0 src="' + inAkamaiPath + '/images/missions/circle_empty.png" onmouseover="updateRatingStarsState(\'#mission_star_rating' + missionId + '\', ' + starCount + ', \'' + starMessages[starCount-1] + '\', \'' + inAkamaiPath + '\')" onclick="submitRating(' + missionId + ',' + starCount + ');" />';
			}
			tmpHtml += '<br /><p id="mission_star_rating' + missionId + '_text" class="textright">Click to rate difficulty</p>';
			tmpHtml += '   </div>';
			
			tmpHtml += "</div>";

			tmpHtml +=  "<div class='clear'></div>";
			//check if email has been verified
			tmpHtml +=  "<a id='mission_comment_link" + missionId + "' class='floatright margin_5px mission_comment_link' href='javascript:void(0)' onclick='showCommentBox(\"mission_comment_box" + missionId + "\")'>Write a Comment</a>";
			tmpHtml +=  "<div class='clear'></div>";
			tmpHtml +=  "<div id='mission_comment_box" + missionId + "' class='mission_comment_box'>";
			tmpHtml +=  "  <div class='clear'></div>";
			if (!isUserEmailVerified)
			{
				tmpHtml +=	"<div class='no_mission_comment_box'><a class='email_verify' href='/users/email_verify.php' target='_parent'><img src='"+inAkamaiPath+"/images/alertbad_icon.gif' border=0/>&nbsp;Verify your email to enable commenting feature</a></div>";
			}
			tmpHtml +=  "  <textarea class='floatleft"+(isUserEmailVerified?" enabled":" disabled")+"'"+(isUserEmailVerified?"":" disabled='disabled'")+" cols=100 rows=2 onclick='selectComment(\"mission_comment_box" + missionId + "\")' oninput='commentCharCheck(\"mission_comment_box" + missionId + "\")' onpaste='commentCharCheck(\"mission_comment_box" + missionId + "\")' onkeyup='commentCharCheck(\"mission_comment_box" + missionId + "\")'>";
			if (isUserEmailVerified)
			{
				tmpHtml +=		"Enter comment here";
			}
			else
			{
				tmpHtml +=		"This feature has been disabled";
			}
			tmpHtml +=	"  </textarea>";
			tmpHtml +=  "	 <a class='floatleft button button_small_grey button_small_grey_post mission_comment_post_btn " + (isUserEmailVerified ? "": "button_small_grey_post_disabled") + "' href='javascript:void(0)'"+(isUserEmailVerified?" onclick='submitComment(" + missionId + ", 0, 0,\"mission_comment_box" + missionId + "\", true)'":"")+">Confirm</a>";
			
			tmpHtml +=  "  <div class='clear'></div>";
			tmpHtml +=  "  <p class='mission_comment_error'></p>";
			tmpHtml +=  "</div>";	
			tmpHtml += "<div class='line_divider'></div>";
			if (missionStatus == 0) {
				expiredHtml += tmpHtml;
				totalExpiredCount++;
			} else if (missionStatus == 2) {
				completedHtml += tmpHtml;
				totalCompleteCount++;
				if (recentCompleted.length > 0) {
					recentCompleted += ",";
				}
				recentCompleted += missionId;
				if (collectionComplete) {
					collectionIds.push(collectionId, collectionReward);
					totalRenderCount++;
					totalMissionReward += parseInt(collectionReward);
				}
				if (tetriminoComplete) {
					totalMissionReward += 100;
				}
			}
			totalRenderCount++;
		}
	}
	
	// Append Completed Missions
	if (completedHtml != "") {
		if (popupHeader == '') {
			popupHeader = 'Congratulations! You&rsquo;ve Completed the Following ' + ((totalCompleteCount == 1) ? 'Mission' : 'Missions') + '!';
		} else {
			popupHtml += '<div class="mission_divider_item"><h3 class="textcenter">Congratulations! You&rsquo;ve Completed the Following ' + ((totalCompleteCount == 1) ? 'Mission' : 'Missions') + '!</h3></div>';			
		}
		popupHtml += completedHtml;
	}
	
	if (collectionIds.length != 0) {
		collectionHtml += '<div class="mission_divider_item" style="margin: 0;"><h3 class="textcenter">Congratulations! You&rsquo;ve Completed the Following ' + ((totalCompleteCount == 1) ? 'Pak' : 'Paks') + '!</h3></div>';
		for (var i = 0; i < collectionIds.length; i = i + 2) {
			collectionHtml += '<div class="mission_collection_item">';
			collectionHtml += '   <div style="position: relative; margin: 0 auto; width: 442px;">';
			collectionHtml += getEmbedFlashHtml(inAkamaiPath + '/images/missions/Collection_' + padNumber(collectionId, 3) + '.swf', "Collection" + collectionId, 442, 98, "");
			collectionHtml += '      <p class="textcenter mission_completion_text margincenter margintop_5px marginbottom_5px"><b>You earned ' + collectionReward + ' Tokens!</b></p>';
			collectionHtml += '   </div>';
			collectionHtml += '</div>';
		}
		
		popupHtml += collectionHtml;
	}

	// Append Expired Missions
	if (expiredHtml != "") {
		if (popupHeader == '') {
			popupHeader = 'The Following ' + ((totalExpiredCount == 1) ? 'Mission' : 'Missions') + ' have Expired...';
		} else {
			popupHtml += '<div class="mission_divider_item"><h3 class="textcenter">The Following ' + ((totalExpiredCount == 1) ? 'Mission' : 'Missions') + ' have Expired...</h3></div>';			
		}
		popupHtml += expiredHtml;
	}
	
	if (!isNewWindow) {
		popupHtml += "<div id='mission_premium_upsell' style='position: relative; height: 80px'><div id='tetris_loading_spinner'></div></div>";
		popupHtml += "</div>";
	}
	
	var width  = 750;
	var height = 635;
	
	// If only one mission, expand Comment section automatically
	if (totalRenderCount == 1) {
		if (isUserEmailVerified) {
			height = 475;			
		} else {
			height = 550;
		}
	}
	
	// Retrieve Premium Mission upsell and display popup
	var omitIds = "";
	for (i=0; i<gameResultMissions.length; i++) {
		if (i != 0)	{
			omitIds += ",";
		}
		omitIds += gameResultMissions[i].missionId;
	}
	onFinishHook = function () { 
		if (totalRenderCount == 1) {
			$('.mission_comment_link').remove(); 
			$('.mission_comment_box').show();
		}
		
		$.get("/missions/ajax/available_by_product.php?productId=-1&omitIds=" + omitIds + "&maxMissions=1&isPopup=1",
		function(data){
			if (data != "") {
				upsellHtml = '<div class="mission_divider_item"><h3 class="textcenter">Want to play more Missions now? Check out Premium Missions!</h3></div>';
				upsellHtml += '<div class="results_mission_update game_results_missions_content_available">';
				upsellHtml += data;
				upsellHtml += '</div>';
				
				$('#mission_premium_upsell').html(upsellHtml);
			} else {
				removeLoadingAnimation();
			}
		});
	};
	
	if (popupHtml != '<div class="mission_list_box"></div>') {
		gameResultsAchievementPopup = true;
		popupHtml = "<div class='box_header'><h2 class='textcenter'>" + popupHeader + "</h2><a id='mission_close_btn' class='floatright button button_small_grey button_small_grey_close user_stats_close_btn' href='javascript: void(0)' onclick='"+ (isNewWindow ? "window.close()" : "closePopup()") + "'"+(isPremiumMission?" style='display:none;'":"")+"></a></div><br />" + popupHtml;
		popupHtml += "<table style='table-layout:fixed; width:100%;'><tr>";
		if (!isPremiumMission) {
			popupHtml += "  <td class='textcenter'><a href='/missions/premium_mission_list.php?tabId=my_grid' target='_parent'>Check out My Grid</a></td>";
			popupHtml += "  <td class='textcenter'><a href='/users/profile.php?tabId=my_badges' target='_parent'>Show Me My Badges</a></td>";
		} else {
			popupHtml += "  <td></td><td class='textcenter' style='width:66px;'><a id='mission_continue_btn' class='button button_small_grey button_small_grey_continue' href='javascript: void(0)' onclick='showMissionGridPopup(\""+recentCompleted+"\",\""+inAkamaiPath+"\","+missionProductId+")'></a></td><td></td>";
		}
		popupHtml += "</tr></table>";

		if (isNewWindow) {
			newWindow=window.open("", "mission_complete", "height=" + height + ", width=" + width + ",toolbar=no,scrollbars="+scroll+",menubar=no");
			newWindow.document.write("<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'><html xmlns='http://www.w3.org/1999/xhtml' xml:lang='en' lang='en'><head>"+ headerHtml + "</head><body style='background:none'>" + popupHtml + "</body></html>");
		} else {
			popUpBoxByHtml(popupHtml, width, height, "", function() { gameResultsClosePopupLb(inAkamaiPath); gameResultsAchievementPopup = false; }, onFinishHook);
		}
	}		
}
function showMissionGridPopup(inRecentCompleted, inAkamaiPath, inProductId) {
	$('#mission_list_box').load("/missions/_inc/_mission_premium_list.php?tabId=my_grid&recentCompleted="+inRecentCompleted, function(){
			$('.box_header > h2').html("Your Mission Grid Results");
			$('#mission_continue_btn').removeAttr("onclick");
			$('#mission_continue_btn').click(function() {closePopup()});
			$('#mission_list_box').css("overflow", "hidden");
		});
}
function showMissionPromoPopup(inIsNewPopup, inAkamaiPath, inProductId) {
	if (!inIsNewPopup)
	{
		closePopup();
	}
	// Retrieve Premium Mission upsell and display popup
	var omitIds = "";
	var missionId;
	for (i=0; i<gameResultMissions.length; i++) {
		if (i != 0)	{
			omitIds += ",";
		}
		omitIds += gameResultMissions[i].missionId;
	}
	$.get("/missions/ajax/available_by_product.php?productId=" + inProductId + "&omitIds=" + omitIds + "&maxMissions=1",
		function(data){
			if (data != "") {
				gameResultsAvailableMissions = data;
				missionId = data.slice(data.indexOf("missionId=")+10,data.indexOf("missionId=")+14);
				missionId = missionId.replace("'>","");
				popUpMissionStore(missionId, function() { gameResultsClosePopupLb(inAkamaiPath); }, true);
			} else {
				$.get("/missions/ajax/available_by_product.php?productId=-1&omitIds=" + omitIds + "&maxMissions=1&isPopup=1",
					function(data){
						if (data != "") {
							missionId = data.slice(data.indexOf("missionId=")+10,data.indexOf("missionId=")+14);
							popUpMissionStore(missionId, function() { gameResultsClosePopupLb(inAkamaiPath); }, true);
						}
					});
			}
		});
}
function submitRating (missionId, rating) {
	$.get("/missions/ajax/save_rating.php?missionId=" + missionId + "&rating=" + rating,
			function(data){
				if (data == "SUCCESS") {
					$('#mission_star_rating' + missionId).html("Rating submitted. Thank you!");
				} else {
					$('#mission_star_rating' + missionId).html("Unable to submit rating, please try again later.");
				}
			});	
}
function updateRatingStarsState(elementId, numOfStars, description, inAkamaiPath) {
	var stars = $(elementId).children();
	
	for(var i = 0; i < stars.length; i++) {
		$(stars[i]).attr('src', inAkamaiPath + '/images/missions/circle_empty.png');
	}
	
	for(var i = 0; i < numOfStars; i++) {
		$(stars[i]).attr('src', inAkamaiPath + '/images/missions/circle_full' + (i + 1) + '.png');
	}
	$(elementId + '_text').html(description);
}

function getMissionProgressType(inProductId, inMissionType) {
	var rc = "";
	var progressTypes	= ["b2b_tetris",
	                 	   "tetris",
	                 	   "tspin",
	                 	   "garbage_lines",
	                 	   "lines_cleared",
	                 	   "finish1"];
	var displayNames 	= ["Back-to-Back Tetrises",
	                 	   "Tetrises",
	                 	   "T-Spins",
	                 	   "Garbage Lines",
	                 	   "Lines",
	                 	   "Rank 1st",
	                 	   "Wins"];
	var numTypes = progressTypes.length;
	for (var i=0; i < numTypes; i++)
	{
		if (inMissionType == progressTypes[i])
		{
			if (inProductId == 100 && inMissionType == "finish1")
			{
				rc = displayNames[i+1];
			}
			else
			{
				rc = displayNames[i];
			}
			break;
		}
	}
	return rc;
}


// Replayer
function replayLoad(inProduct, inAkamaiPath)
{
	var swfPath; 
	switch (Number(inProduct))
	{
	case 10:
		swfPath = inAkamaiPath + "/games/Marathon/marathonWebsiteReplay.swf";
		document.getElementById("contentReplayFlash").as3_loadReplayer(inProduct, swfPath);
	break;
	case 12:
		swfPath = inAkamaiPath + "/games/Survival/survivalWebsiteReplay.swf";
		document.getElementById("contentReplayFlash").as3_loadReplayer(inProduct, swfPath);
	break;
	case 23:
		swfPath = inAkamaiPath + "/games/Ultra/ultraWebsiteReplay.swf";
		document.getElementById("contentReplayFlash").as3_loadReplayer(inProduct, swfPath);
	break;
	case 84:
		swfPath = inAkamaiPath + "/games/Sprint/sprintWebsiteReplay.swf";
		document.getElementById("contentReplayFlash").as3_loadReplayer(inProduct, swfPath);
	break;
	case 86:
		swfPath = inAkamaiPath + "/games/Battle6P/battle6PWebsiteReplay.swf";
		document.getElementById("contentReplayFlash").as3_loadReplayer(inProduct, swfPath, 5);
	break;
	case 100:
		swfPath = inAkamaiPath + "/games/Battle2P/battleWebsiteReplay.swf";
		document.getElementById("contentReplayFlash").as3_loadReplayer(inProduct, swfPath, 1);
	break;
	case 101:
		swfPath = inAkamaiPath + "/games/Sprint5P/sprint_5PWebsiteReplay.swf";
		document.getElementById("contentReplayFlash").as3_loadReplayer(inProduct, swfPath, 4);
	break;
	case 102:
		swfPath = inAkamaiPath + "/games/Mono/colorblindWebsiteReplay.swf";
		document.getElementById("contentReplayFlash").as3_loadReplayer(inProduct, swfPath);
	break;
	}
}

function replayStart(inGameData)
{
	isReplayStarted = true;
	document.getElementById("contentReplayFlash").as3_startReplay(inGameData);
}

function replayStartMP(inGameData, inAkamaiPath )
{
	isReplayStarted = true;
	tmpGameData = inGameData[0].split("&");
	
	myGameData = tmpGameData[0];
	myName     = tmpGameData[1];
	myAvatar   = inAkamaiPath + "/images/avatars/40X40/" + tmpGameData[2];
	myRank     = tmpGameData[3];
	myStars    = tmpGameData[4];
	
	opponentGameData = inGameData.slice(1);
	document.getElementById("contentReplayFlash").as3_startReplay(myGameData, myName, myAvatar, myRank, myStars, opponentGameData.toString(),  gameResultsNames, gameResultsAvatars);
}

function replayPause(inIsPause)
{
	document.getElementById("contentReplayFlash").as3_pauseReplay(inIsPause);
}


// INTERSTITIAL VIDEO CODE..............................
function gameResultsClosePopupLb(inAkamaiPath)
{
	var loadOASAds = false;
	
	if (gameResultsMissionAchievements) {
		gameResultsMissionAchievements = false;
		
		loadOASAds = true;
		if (gameResultsIsMultiplayer) {
			intervalTimer = setInterval("toggleMainInfoPage(true)", 7000);
			gameResultsPlayWinAnim();
		}
	} else if (isAdPlaying) {
		isAdPlaying = false;
		loadOASAds = true;
		if (gameResultsIsMultiplayer) {
			intervalTimer = setInterval("toggleMainInfoPage(true)", 7000);
			gameResultsPlayWinAnim();
		}
	} else if (gameResultsAdvanceRank) {
		gameResultsAdvanceRank = false;
		gameResultsCurrentRank = -1;
		gameResultsPromotionRank = -1;
		$('div.game_results_footer > table.game_buttons').attr("style", '');
		gameResultsShowNotices();
	} else if (gameResultsLeaderboardRank) {
		gameResultsLeaderboardRank = false;
	} else if (gameResultsMissions) {
		gameResultsMissions = false;
	}

	if (loadOASAds) {
		gameResultsLoadOASIAB();
		gameResultsShowNotices();
	}
}

function gameResultsLoadOASIAB() {
	/* Load OAS Ad into container */
	// oas_php_url = OAS_GET_URL("sx", "x62");
	// $("#game_advertisement_iframe").attr("src", oas_php_url);
	$("#game_advertisement_iframe").attr("src", "/ads/google_dfp_results_atf_ad.html");
	$(".game_ad_container").css("visibility", "visible");
	$("#containerAds").show();
}
function gameResultsLoadOASVideo(inAkamaiPath) {
	 oas_php_url = OAS_GET_URL("sx", "x63");
//	 oas_php_url = OAS_GET_URL("sx", "x53");
	 $.getScript(oas_php_url, function() { try { OAS_VIDEO(); } catch(err) { gameResultsClosePopupLb(inAkamaiPath); } });
}
function gameLoadDFPPrerollVideo(inVideoFn) {
	try {
   		inVideoFn();
   	} catch(err) {
   		console.error("gameLoadDFPPrerollVideo() called with invalid <inVideoFn>");
   		gamePrerollComplete();
	}
   	intervalTimer = setTimeout("gamePrerollComplete()", 15000);
   	console.debug("gameLoadDFPPrerollVideo: intervalTimer = " + intervalTimer);
}
function gameLoadOASPrerollVideo() {
	oas_php_url = OAS_GET_URL("sx", "x74");
	$.getScript(oas_php_url, function() { try { OAS_VIDEO(); } catch(err) { gamePrerollComplete(); } });
	intervalTimer = setTimeout("gamePrerollComplete()", 15000);
}
function gameLoadOASPrerollTest() {
	// SpotX
//	var video_iframe_width  = 800;
//	var video_iframe_height = 375;
//	var src='spotx780x385.html';
	
	// Tremor
//	var video_iframe_width  = 780;
//	var video_iframe_height = 385;
	var src='tremor780x385_Preroll.html';
	$('.game_loading').css("height", "574px");
	
	$('.game_preroll_container').attr("width", video_iframe_width + "px");
	$('.game_preroll_container').attr("height", video_iframe_height + "px");
	setTimeout("gamePrerollStart('" + src + "')", 30000);
}
var videoProvider = "Unknown";
function gamePrerollStart(preroll_src) {
	if (preroll_src.indexOf("spotx") != -1) {
		videoProvider = "SpotX";
	} else if (preroll_src.indexOf("tremor") != -1) {
		videoProvider = "Tremor";
	} else if (preroll_src.indexOf("alfy") != -1) {
		videoProvider = "Alfy";
	} else if (preroll_src.indexOf("jwplayer") != -1) {
		videoProvider = "JWPlayer";
	}
	else {
		videoProvider = "unknown";
	}
	
   	console.debug("gamePrerollStart(" + preroll_src + ") with videoProvider: " + videoProvider);

	$(".game_preroll_container").attr("src", "/marketing/" + preroll_src);
	$(".game_preroll_container").css('display', 'block');
	
	gamePrerollTrackEvent("Start", window.productName);
}
function gamePrerollLoaded() {
   	console.debug("gamePrerollLoaded() with intervalTimer: " + intervalTimer);
	if (intervalTimer != -1) {
		clearTimeout(intervalTimer);
		intervalTimer = -1;
	}
	gamePrerollTrackEvent("Loaded", window.productName);
}
var prerollDone = false;
function gamePrerollComplete() {
   	console.debug("gamePrerollComplete() with prerollDone: " + prerollDone);
   	console.groupEnd();
   	
	$('.game_loading').hide();
	$('#game_container').css('height', 'auto');
	$('#contentFlash').css('visibility', 'visible');
	if (!prerollDone) {
		prerollDone = true;
		$.get("/games/ajax/preroll_done.php?sk=" + sk);
		
		gamePrerollTrackEvent("Complete", window.productName);
	}
	var el = document.getElementById('contentFlash');
	if (el && el.as3_prerollDone) {
		el.as3_prerollDone();
	}
	
	var el = document.getElementById('home_custom_ad_container');
	if (el) {
		// Adjust the padding-bottom
		$('#home_custom_ad_container').css('padding-bottom', '28px');
	}
}

function gamePrerollTrackEvent(action, label) {
	try {
		if (videoProvider != "Unknown") {
			pageTracker = _gat._getTracker("UA-886022-5");
			pageTracker._trackEvent("Video", action + " - " + videoProvider, label);
		}
	} catch (ex) {}
}


// Internal
function gameResultsInterstitialAdCB(click, flv, timeoutMSEC) {
	g_isInterstitial = true;

	if (flv != "") {
		popUpBoxByFlv(flv, 800, 400, "This game is brought to you by", "", function() { gameResultsInterstitialAdOpened(click, timeoutMSEC, true) }, function() { gameResultsClosePopupLb(AD_AKAMAI_PATH) });
	}
}
function gameResultsInterstitialAdOpened(click, timeoutMSEC, enableMoreInfo)
{
	if (typeof(enableMoreInfo) == 'undefined' || enableMoreInfo == '') {
		enableMoreInfo = false;
	}

	if (click != null || click != '') {
		$('#shadowbox_learn_more_btn > a').attr("href", click);
	}
	
	// Set a safety timeout to popup close button for ad
	if (timeoutMSEC != -1) {
		s_flvTimeout = setTimeout("gameResultsDisplayCloseButton()", timeoutMSEC);		
	}

	if (enableMoreInfo) {
		$('#shadowbox_body_more_info').height($('#shadowbox_content').css("height"));
		$('#shadowbox_body_more_info').width($('#shadowbox_body_inner').width());
	}
}
function gameResultsInterstitialAdState(obj)
{
    // * id (String): ID of the player in the HTML DOM. Used by javascript to reference the player.
    // * client (String): A string representing the client the player runs in
	// (e.g. FLASH WIN 9,0,115,0).
    // * version (String): A string representing the major version, minor
	// version and revision number of the player (e.g. 4.2.95).
	if (obj.newstate == "COMPLETED")
	{
		gameResultsInterstitialAdCompleted();
	}
}
function gameResultsInterstitialAdCompleted()
{
	// Hide video... Using hide() or overwriting via html() crashes Safari
	$('#shadowbox_body_inner').css("left", "-9999px"); 
	$('#shadowbox_body_more_info').show();
	$('#shadowbox_container').show();
	
	gameResultsDisplayCloseButton();
}
function gameResultsDisplayCloseButton()
{
	var html = "<a class='button button_small_grey button_small_grey_close' href='javascript: void(0)' onclick='gameResultsInterstitialAdClose();'></a>";
	$('#sb-title-sidecontent').html(html);
	
	// Clear the timeout
	clearTimeout(s_flvTimeout);
}
function gameResultsInterstitialAdClose()
{
	g_isInterstitial = false;

	$('#shadowbox_body_inner').css("left", "0");
	$('#shadowbox_body_more_info').hide();

	window.parent.Shadowbox.close();
}


// Acudeo Tremor Media Interstitial
function gameResultsInterstitialTremorMediaAdCB(tremorDescriptorURL, closeTimeoutMSEC) {
	if (typeof(closeTimeoutMSEC) == 'undefined' || closeTimeoutMSEC == '') {
		closeTimeoutMSEC = 7000;
	}
	
	popUpBoxByUrlExt("/marketing/" + tremorDescriptorURL, 806, 390, "This game is brought to you by <div id='sb-title-sidecontent'></div>", 
		function() { gameResultsClosePopupLb(); },
		function() { gameResultsInterstitialTremorMediaAdLoaded(closeTimeoutMSEC); },
		function() { });
}

function gameResultsInterstitialTremorMediaAdLoaded(closeTimeoutMSEC) {
  // Need to figure out a way to detect whether the request for a video ad failed!
  
  // Set the timer for the CLOSE button
  gameResultsInterstitialAdOpened(null, closeTimeoutMSEC);
}

// SpotX Custom Interstital
function gameResultsInterstitialSpotXChangeAdCB(timeoutMSEC) {
    spotx_channel_id = "71727";
    if (typeof(spotx_content_category) == 'undefined' || spotx_content_category == '')
    {
    	spotx_content_category = "Casual Games";
    }
    if (typeof(spotx_content_tags) == 'undefined' || spotx_content_tags == '')
    {
    	spotx_content_tags = "free,games";
    }
    if (typeof(spotx_ad_max_duration) == 'undefined' || spotx_ad_max_duration == '')
    {
    	spotx_ad_max_duration = "35";
    }
    if (typeof(spotx_ad_click_target) == 'undefined' || spotx_ad_click_target == '')
    {
    	spotx_ad_click_target = "_blank";
    }
    if (typeof(spotx_ad_volume) == 'undefined' || spotx_ad_volume == '')
    {
    	spotx_ad_volume = "80";
    }
    if (typeof(spotx_ad_is_ready_interval_MSEC) == 'undefined' || spotx_ad_is_ready_interval_MSEC == '')
    {
    	spotx_ad_is_ready_interval_MSEC = 250;;
    }
    if (typeof(spotx_ad_is_ready_interval_limit_MSEC) == 'undefined' || spotx_ad_is_ready_interval_limit_MSEC == '')
    {
    	spotx_ad_is_ready_interval_limit_MSEC = 3000;
    }
    spotx_content_url = "http://www.tetrisfriends.com";
    spotx_content_title = "Casual Games";
    spotx_content_desc = "Free Web Games";
    spotx_content_page_url = "http://www.tetrisfriends.com";
    spotx_content_duration = "60";
    spotx_content_format = "FlashVideo"; 
 
    spotx_content_width = "500"; // "728"; 
    spotx_content_height = "375"; // "410"; 
    spotx_ad_type = "preroll"; 
    spotx_banner_size = "300x250"; // "728x90";  
    spotx_content_container_id = "shadowbox_video";
    spotx_banner_container_id = "shadowbox_companion"; 

    spotx_ad_done_function = function()
    {
		if (typeof(isPromoAdCheckboxEnabled) == "function" && isPromoAdCheckboxEnabled()) {
			promoAdInterstitialLoadUpsell();
		} else {
			gameResultsInterstitialAdClose();
		}
    };
    
    // Nested getScripts appear to cause timing issues with callbacks preventing
    // `spotx_ad_found` from being detected properly.
    // 
    // WORKAROUND: Add a interval timer that checks if variable is ready before
    // launching shadowbox popup. Use variables to adjust timeout interval, max time, etc.
    spotx_ad_is_ready = false;
    spotx_ad_is_ready_interval_id = -1;
    spotx_ad_is_ready_interval_count = 0;
    
    $.getScript(AD_AKAMAI_PATH + "/javascripts/extra/spotx.js", function() {
    	spotx_ad_is_ready_interval_id = 
    		setInterval("gameResultsInterstitalSpotXIsReadyCB(" + timeoutMSEC + ")", spotx_ad_is_ready_interval_MSEC);
    });
}

function gameResultsInterstitalSpotXIsReadyCB(timeoutMSEC) {
	if (spotx_ad_is_ready) {
		// Trigger popup if ad is ready
		clearInterval(spotx_ad_is_ready_interval_id);
		gameResultsInterstitialSpotXChangeAdLoaded(timeoutMSEC);
	} else if (spotx_ad_is_ready_interval_count > (spotx_ad_is_ready_interval_limit_MSEC/spotx_ad_is_ready_interval_MSEC)) {
		// If spotx takes too long to load, abort and continue JS flow
		clearInterval(spotx_ad_is_ready_interval_id);
		gameResultsInterstitialAdClose();
		gameResultsClosePopupLb(); 
	} else {
		// Ad is not ready, increment interval count and wait longer
		spotx_ad_is_ready_interval_count++;
	}
}

function gameResultsInterstitialSpotXChangeAdLoaded(timeoutMSEC)
{
	if (typeof(spotx_ad_found) == 'undefined' || spotx_ad_found == false)
	{
		// No SpotXChange ad was found
		gameResultsInterstitialAdClose();
		gameResultsClosePopupLb(); 
	}
	else
	{
		var popupHtml = '<div id="interstitial_body">' + 
						'   <div id="shadowbox_video" style="position: absolute; top: 0; left: 0;"></div>' + 
					    '   <div id="shadowbox_companion" style="position: absolute; top: 0; left: 505px;"></div>' +
					    '   <div id="promo_ad_small" style="position: absolute; top: 255px; left: 505px; z-index: 100;"></div>' +
					    '</div>' +
					    '<div id="promo_ad_large_container" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: none;">' +
					    '</div>';
		
		g_isInterstitial = true;
		
		popUpBoxByHtml(popupHtml, 806, 375, "This game is brought to you by <div id='sb-title-sidecontent'></div>",
			function() { gameResultsClosePopupLb(); },
			function() { gameResultsInterstitialAdOpened(null, timeoutMSEC);
						 $("#promo_ad_small").load("/marketing/promoAd300x110.html"); 
						 });
	}
}



// Leaderboard...................................
var leaderboardCurrentProductId = -1;
var leaderboardCurrentlbType = -1;
var leaderboardCurrentStartIndex = -1;
var leaderboardCurrentRegion = -1;
var leaderboardMpFilter = -1;
var leaderboardRallyMapFilter = -1;

function leaderboardPageNext(index, gameName)
{
    index = Number(leaderboardCurrentStartIndex);
	index += 10;
	leaderboardChange(3, -1, -1, - 1, index, gameName); 
}

function leaderboardPagePrev(index, gameName)
{
	index =  Number(leaderboardCurrentStartIndex);
	index -= 10;
	leaderboardChange(3, -1, -1, -1, index, gameName); 
}

function leaderboardResetButtons(){
   	$("#game_list > ul > li").removeClass("selected");
}

function leaderboardSelectButton(gameName){
	leaderboardResetButtons();
	$("#gameButton" + gameName).addClass("selected");
}

function leaderboardChange(platformId, productId, lbType, region, startIndex, gameName, filter, mapId) {
	var str;
	
	if (filter == null){
		filter = -1;
	}
	
	if (mapId == null){
		mapId = -1;
	}
	
	if (leaderboardCurrentProductId == productId && 
        lbType == leaderboardCurrentlbType && 
        startIndex == leaderboardCurrentStartIndex &&
        leaderboardCurrentRegion == region &&
        leaderboardMpFilter == filter &&
        leaderboardRallyMapFilter == mapId)
    {
     	return;
    }

    if (gameName != null) {
    	leaderboardSelectButton(gameName);
    	
    	// Update Leaderboard tip
    	str = "/leaderboard/ajax/leaderboard_tips.php?gameName=" + gameName;
    	$("#tetris_tip").load(str);
    }

    if (productId != -1)
    {
    	var leaderboardPreviousProductId = leaderboardCurrentProductId;
    	leaderboardCurrentProductId = productId;
    }
    if (lbType != -1)
    {
    	leaderboardCurrentlbType = lbType;
    }
    if (region != -1)
    {
    	leaderboardCurrentRegion = region;
    }
    if (filter != -1)
    {
    	leaderboardMpFilter = filter;
    }   
    else {
    	// Correct MP Filter for Sprint 5P, Battle 2P, and default MP filter
		if (leaderboardMpFilter == "kos_rank" && leaderboardCurrentProductId == 101) {
			leaderboardMpFilter = "best_time_rank";
		} 
		else if (leaderboardMpFilter == "best_time_rank" && leaderboardCurrentProductId == 100) {
			leaderboardMpFilter = "kos_rank";
		}
		else if (leaderboardMpFilter == "most_played_rank" && leaderboardCurrentProductId == 3) {
			leaderboardMpFilter = "most_won";
		}
		else if (leaderboardMpFilter == "most_won" && leaderboardCurrentProductId != 3) {
			leaderboardMpFilter = "most_played_rank";
		}
    }
    if (mapId == -2)
    {
    	leaderboardRallyMapFilter = -1;
    }
    else if (mapId != -1)
    {
    	leaderboardRallyMapFilter = mapId;
    }
    
    if (startIndex != -1)
    {
    	leaderboardCurrentStartIndex = Number(startIndex);
    }
    
    str = "/leaderboard/ajax/leaderboard_page.php?platformId=" + platformId + "&productId=" + leaderboardCurrentProductId  + "&leaderboardType=" + leaderboardCurrentlbType + "&startIndex=" + leaderboardCurrentStartIndex;
    
    if(gameName != null) {
    	str += "&gameName=" + gameName;
    }
    
    if (leaderboardCurrentRegion != -1) {
    	str += "&lbRegion="  + leaderboardCurrentRegion;
    }
    if (leaderboardMpFilter != -1) {
    	str += "&lbMpFilter="  + leaderboardMpFilter;
    }
    if (leaderboardRallyMapFilter != -1) {
    	str += "&mapId="  + leaderboardRallyMapFilter;
    }
    
    $("#leaderboard_page").load(str);
}

function leaderboardChangeRegion(region, gameName) {
	leaderboardChange(3, -1, -1, region, 0, gameName); 
}

function leaderboardChangeMpFilter(filter, gameName) {
	leaderboardChange(3, -1, -1, -1, 0, gameName, filter, -2); 
}

function leaderboardChangeRallyMapFilter(mapId, gameName) {
	leaderboardChange(3, -1, -1, 0, 0, gameName, "best_time_rank", mapId); 
}

function leaderboardViewDetails(userId, inGameRecordId, inProductId, inLbType, name, stat0,stat1,avatar,message, isBetaUser){
	popUpBoxByUrl('/leaderboard/ajax/leaderboard_details.php?gameRecordId='+inGameRecordId+'&userId=' + userId +"&productId="+inProductId+"&leaderboardType="+inLbType+"&name="+name+"&stat0="+stat0+"&stat1="+stat1+"&avatar="+avatar+"&isBetaUser="+isBetaUser+"&message="+message, 760, 550, "");		
}

function leaderboardMPViewDetails(userId, productId, name, stat0, stat1, avatar, message, isBetaUser) {
	popUpBoxByUrl('/leaderboard/ajax/leaderboard_mp_details.php?userId=' + userId + '&productId=' + productId + "&name=" + name + '&stat0='+stat0+ '&stat1='+stat1 + '&avatar='+avatar +"&isBetaUser="+isBetaUser +'&message='+ message, 760, 550, "");		
}

function leaderboardRegionOnSelection(value, gameName) 
{ 
	leaderboardChangeRegion(value, gameName); 
}


// Profile.......................................
function profileViewDetails(username, productId, userId, value){
	popUpBoxByUrl('/leaderboard/ajax/user_stats.php?username=' + username  +'&value=' + value+'&productId=' + productId + '&userId=' + userId, 760, 508, "");		
}
function profileViewMPDetails(username, productId, userId){
	popUpBoxByUrl('/leaderboard/ajax/mp_user_stats.php?username=' + username  + '&productId=' + productId + '&userId=' + userId, 800, 525, "");		
}
function profileViewConnectDetails(username, productId, userId){
	popUpBoxByUrl('/leaderboard/ajax/connect_user_stats.php?username=' + username  +'&productId=' + productId + '&userId=' + userId, 760, 508, "");		
}

function profileReportUser(userId, username, userAvatar, roomName){
	popUpBoxByUrl('/users/ajax/report_user_popup.php?&userId=' + userId + '&username=' + username + '&userAvatar=' + userAvatar + "&room_name" + roomName, 584, 300, "");		
}
function submitReportUser(userId, username, reportComment, commentBoxId, chat, roomName,akamaiPath) {
	reportComment = $("#" + commentBoxId + " > textarea").val();
	if (trim(reportComment) == '' || (trim(reportComment) == "Enter comment here")) {
		commentErrorMsg(commentBoxId, "You must enter a reason why you are reporting this user!", "#f00");
	} else if (reportComment.length < 200) {
		reportComment = encodeURIComponent(reportComment);
		$("#friend_report_popup_btns").html("<img src='" + akamaiPath + "/images/spinner.gif' style='vertical-align:middle; margin:5 auto;'/>");
		$("#friend_report_popup_btns").removeClass();
		$.post("/users/ajax/report_user.php", {"userId" : userId, "username" : username, "reportComment" : reportComment, "chat" : chat, "roomName" : roomName},
				function(data){
					if (data == "SUCCESS") {
						var message = "<br /><br />The User Report has been sent to our Support Team for review.<br />Thank you.<br /><br />Did you know you can also add users to your <a href='/users/block_list.php?block_user=1&id=" + userId + "' target='_parent'>User Block List</a> to minimize interactions?<br />You can manage the User Block List by visiting the Privacy Settings inside your Profile.";
						
						$('.box_header').html("<h3>Report has been sent</h3>");
						$('#friend_report_popup').html("<div class='friends_popup_response'>" + message + "</div>");
						$('#friend_report_popup').css("height", "210px");
						$("#friend_report_popup_btns").addClass('buttons_area');
						$('#friend_report_popup_btns').html("<a class='button button_small_grey button_small_grey_ok okbtn' href='javascript:void(0)' onclick='closePopup()' style='left:45%;'>Ok</a>");
					} else {
						commentErrorMsg(commentBoxId, "There was an error while submitting. Please try again later.", "#f00");
					}
				}); 
	}
}

function profileBlockUser(userId, username, userAvatar, callback){
	popUpBoxByUrl('/users/ajax/block_user_popup.php?&userId=' + userId + '&username=' + username + '&userAvatar=' + userAvatar, 584, 320, "", callback);		
}
function submitBlockUser(userId) {
	$.get("/users/ajax/block_user.php?userId=" + userId,
			function(data){
				if (data == "SUCCESS") {
					closePopup();
				} else {
					var message = "There was a problem in submitting your request.<br />Please try again later.";
					$('.box_header').html("<h3>There was a problem...</h3>");
					$('#friend_report_popup').html("<div class='friends_popup_response'>" + message + "</div>");
					$('#friend_report_popup').css("height", "210px");
					$('#friend_report_popup_btns').html("<a class='button button_small_grey button_small_grey_ok okbtn' href='javascript:void(0)' onclick='closePopup()' style='left:45%;'>Ok</a>");
				}
			}); 
}
function submitUnblockUser(userId) {
	$.get("/users/ajax/block_user.php?userId=" + userId + "&unblock=1",
			function(data){
				if (data == "SUCCESS") {
					reloadBlockList(true);
				} else {
					var message = "There was a problem in submitting your request.<br />Please try again later.";
					$('.box_header').html("<h3>There was a problem...</h3>");
					$('#friend_report_popup').html("<div class='friends_popup_response'>" + message + "</div>");
					$('#friend_report_popup').css("height", "210px");
					$('#friend_report_popup_btns').html("<a class='button button_small_grey button_small_grey_ok okbtn' href='javascript:void(0)' onclick='closePopup()' style='left:45%;'>Ok</a>");
				}
			}); 
}


//Friends........................................
function popUpFriendStore(friendId, callbackFunc) {
	popUpBoxByUrl('/friends/ajax/friend_browser.php?id=' + friendId, 584, 300, "", callbackFunc);
}

function popUpRemoveFriend(friendId, callbackFunc) {
	popUpBoxByUrl('/friends/ajax/friend_remove_popup.php?id=' + friendId, 584, 300, "", callbackFunc);
}
function removeFriend(userId, friendId) {
  	$('a.sendbtn').attr('onclick', 'javascript:void(0);');
  	$('a.cancelbtn').attr('onclick', 'javascript:void(0);');
    url = "/users/ajax/purchase_friend.php?toId=" + friendId + "&remove_friend=1";
	$.get(url, 
		function(data){
			var message = "";
			if (data == "SUCCESS")
			{
				message = "Friend has been removed...";
			}
			else
			{
				message = "Failed to remove friend from list.";
			}
			$('#friend_befriend_popup').html("<div class='friends_popup_response'>" + message + "</div>");
			$('#friend_button_area').css("width", 64);
			$('#friend_button_area').html("<a class='button button_small_grey button_small_grey_ok okbtn' href='javascript:void(0)' onclick='closePopup()'>Ok</a>");
		});
}

function popUpFriendList(userId, callbackFunc) {
	popUpBoxByUrl('/friends/_inc/_friends_list.php?id='+userId+'&isPopup=true', 584, 500, "", callbackFunc);
}


//Messages......................................
function popUpMessagesConfirmed(sessionId, akamaiPath, friendName, friendAvatar, type, error, callbackFunc) {
	var html;
	html = "<div class='friend_popup'>\n" +
				"<div class='box_header' style='text-align:center;'><h3>";
					if (type != 'SUCCESS')
					{
						html += friendName+" could not be added as a Friend";
					}
					else
					{
						html += friendName+" has been added as a Friend";
					}
	html +=		"</h3></div><br/>\n" +
				"<div id='friend_confirm_popup' class='friend_confirm_popup'>\n";
					if (type == 'SUCCESS')
					{
						var swfUrl = akamaiPath + '/images/OWSoundPlayer.swf';
						var fileUrl = akamaiPath + '/images/friends/friend_confirmed.swf';
						var flashVars = 'sessionId='+sessionId+'&filePath='+fileUrl+'&height=100&width=100&soundName=friendConfirmed&useControls=false';
						
						html += "<div class='friend_confirmed_animation'>" +
									getEmbedFlashHtml(swfUrl, "FriendConfirmed", 100, 100, flashVars) +
								"</div>";
					}
	html +=			"<img class='friend_avatar' src='"+friendAvatar+"' "+((type == 'failed' || type == 'blocked')?"style='left:40px;'":"")+"/>" +
					"<div class='friend_desc' "+((type != 'SUCCESS')?"style='width:330px;'":"")+">";
						if (type == 'SUCCESS')
						{
							html += "You are now Friends with "+friendName+"!";
						}
						else if (type == 'BLOCKED')
						{
							html += "<p>You have blocked " + friendName + ". Please visit" +
									"<br>your <a href='/users/block_list.php'>User Block List</a> and remove this" +
									"<br>user first before adding as a Friend.";
						}
						else
						{
							html += "<p>"+friendName+" could not be added as a Friend</p>";
							if (type != 'FAILURE')
							{
								html += "<br/>"+type;
							}
						}
	html +=			"</div>" +
				"</div>\n" +
			"</div>\n" +
			"<div id='friend_button_area' class='buttons_area'>\n" +
				"<a class='floatleft button button_small_grey button_small_grey_ok okbtn' href='javascript:void(0)' onclick='messageFriendConfirmed("+(type == 'SUCCESS'?true:false)+")' style='left:45%;'>Ok</a>" +
			"</div>\n";
	popUpBoxByHtml(html, 584, 300, "", callbackFunc, null);
}
function messageFriendConfirmed(inIsSuccessful)
{
	if (inIsSuccessful)
	{
		$("#messageFriendConfirmed > .acceptbtn").hide();
		$("#messageFriendConfirmed > .deletebtn").css('left', '45%');
	}
	closePopup();
}

function popUpReportMessage(fromId, friendName, friendAvatar, messageId, messageSubject, messageTime, messageContent, callbackFunc)
{
	var html = "";
	html = "<div id='report_message_popup'>" +
				"<div class='box_header' style='text-align:center;'>" +
					"<h3>Are you sure you want to report this message?</h3>" +
				"</div>" +
				"<br/>" +
				"<div class='report_message_info'>" +
					"<img src='" + friendAvatar + "'/>" +
					"<a class='report_user_name' href=''>" + friendName + "</a>" +
					"<div class='report_subject'>" + messageSubject + "</div>" +
					"<div class='report_time'>" + messageTime + "</div>" +
				"</div>" +
				"<br/>" +
				"<div id='report_message_comment_box' class='report_message_comment_area'>" +
					"<div class='report_comment_title'>Comment:<br/>(Required)</div>" +
					"<textarea id='report_message_comment' onclick='selectComment(\"report_message_comment_box\")' 'rows='3' cols='60' oninput='commentCharCheck(\"report_message_comment_box\",\"button_small_grey_sendreport\")' onpaste='commentCharCheck(\"report_message_comment_box\",\"button_small_grey_sendreport\")' onkeyup='commentCharCheck(\"report_message_comment_box\",\"button_small_grey_sendreport\")'>Enter comment here</textarea>" +
					"<p class='mission_comment_error'></p>"+
				"</div>" +
				"<div class='buttons_area'>" +
					"<a class='button button_small_grey button_small_grey_sendreport' href='javascript:void(0)' onclick='submitReportMessage("+messageId+","+fromId+",\""+friendName+"\",\""+encodeURIComponent(messageContent)+"\",\"report_message_comment_box\",\"report_message_popup\")' style='left:38%;'>Report</a>" +
					"<a class='button button_small_grey button_small_grey_cancel' href='javascript:void(0)' onclick='closePopup()' style='left:55%;'>Cancel</a>" +
				"</div>" +
			"</div>";
	popUpBoxByHtml(html, 584, 250, "", callbackFunc, null);
}
function submitReportMessage(inMessageId, inUserId, inUserName, inMessage, inCommentBoxId, popupId) {
	reportComment = $('#' + inCommentBoxId + ' > textarea').val();
	if ((trim(reportComment) == "Enter comment here") || (trim(reportComment).length == 0)) {
		commentErrorMsg(inCommentBoxId, "Please enter a comment before submitting.", "#f00");
	} else if (reportComment.length < 200) {
		$.get("/messages/ajax/report_message.php?messageId="+inMessageId+"&userId="+inUserId+"&username="+inUserName+"&comment="+encodeURIComponent(inMessage)+"&reportComment="+encodeURIComponent(reportComment),
				function(data){
					if (data == "SUCCESS") {
						reportConfirmedMessage(popupId, inUserId);
					} else {
						commentErrorMsg(inCommentBoxId, "There was an error while submitting. Please try again later.", "#f00");
					}
				});
	}
}
function reportConfirmedMessage(popupId, inUserId)
{
	var html = "";
	html =	"<div class='box_header' style='text-align:center;'>" +
				"<h3>Report has been sent</h3>" +
			"</div>" +
			"<br/>" +
			"<div class='report_message_confirmed'>" +
				"<div class='report_confirmed'>" +
					"<p>The Spam/Abuse Report has been sent to our Support Team for review." +
					"<br/>Thank you.</p>" +
					"<br/>" +
					"<p>Did you know you can also add users to your <a href='/users/block_list.php?block_user=1&id="+inUserId+"' target='_parent'>User Block List</a> to minimize interactions?" +
					"<br/>You can manage the User Block List by visiting the Privacy Settings inside your Profile." +
					"</p>" +
				"</div>" +
			"</div>" +
			"<div class='buttons_area'>" +
				"<a class='button button_small_grey button_small_grey_ok' href='javascript:void(0)' onclick='closePopup()' style='left:45%;'>Cancel</a>" +
			"</div>";
	$('#'+popupId).html(html);
}


//Missions....................................
function popUpMissionStore(missionId, callbackFunc, isMissionUpsell) {
  	popUpBoxByUrl('/shop/shop_popup.php?rdir=/shop/index.php&missionId=' + missionId + "&isPromo=" + isMissionUpsell, 620, 540, "", callbackFunc);
}

function submitComment(missionId, collectionId, parentId, commentBoxId, isPopupComment) {
	comment = $("#" + commentBoxId + " > textarea").val();
	if ((trim(comment) == "Enter comment here") || (trim(comment).length == 0)) {
		commentErrorMsg(commentBoxId, "Please enter a comment before submitting.", "#f00");
	} else if (comment.length < 200) {
		comment = decodeHtmlSpecialChars(comment);
		addLoadingAnimation("#" + commentBoxId);
		$.get("/missions/ajax/save_comment.php?missionId=" + missionId + "&comment=" + comment + "&parentId=" + parentId,
			function(data){
				if (data == "SUCCESS") {
					if (isPopupComment) {
						$('#' + commentBoxId).html("<p class='textright'><i>Comment Submitted!</i></p>");
						$('#' + "mission_comment_link" + missionId).remove();
					} else {
						$('#' + commentBoxId).hide();
						showMissionDetails(missionId, collectionId);
					}
				} else if (data == "SPAM") {
					$("#" + commentBoxId + " > div#tetris_loading_spinner").remove();
					$("#" + commentBoxId + " > div#tetris_loading_mask").remove();
					commentErrorMsg(commentBoxId, "Please wait 5 minutes to regain commenting feature.", "#f00");
				}
				else {
					$("#" + commentBoxId + " > div#tetris_loading_spinner").remove();
					$("#" + commentBoxId + " > div#tetris_loading_mask").remove();
					commentErrorMsg(commentBoxId, "Please review your message and try again.", "#f00");
				}
			});

	}
}
function submitGalleryComment(galleryId, parentId, commentBoxId) {
	comment = $("#" + commentBoxId + " > textarea").val();
	if ((trim(comment) == "Enter comment here") || (trim(comment).length == 0)) {
		commentErrorMsg(commentBoxId, "Please enter a comment before submitting.", "#f00");
	} else if (comment.length < 200) {
		comment = decodeHtmlSpecialChars(comment);
		addLoadingAnimation("#" + commentBoxId);
		$.get("/gallery/ajax/save_comment.php?galleryId=" + galleryId + "&comment=" + comment + "&parentId=" + parentId,
			function(data){
				if (data == "SUCCESS") {
					$('#' + commentBoxId).hide();
					refreshComments();
				} else if (data == "SPAM") {
					$("#" + commentBoxId + " > div#tetris_loading_spinner").remove();
					$("#" + commentBoxId + " > div#tetris_loading_mask").remove();
					commentErrorMsg(commentBoxId, "Please wait 5 minutes to regain commenting feature.", "#f00");
				}
				else {
					$("#" + commentBoxId + " > div#tetris_loading_spinner").remove();
					$("#" + commentBoxId + " > div#tetris_loading_mask").remove();
					commentErrorMsg(commentBoxId, "Please review your message and try again.", "#f00");
				}
			});

	}
}
function selectComment(commentBoxId) {
	comment = $("#" + commentBoxId + " > textarea").val();
	
	if (trim(comment) == 'Enter comment here') {
		$("#" + commentBoxId + " > textarea").css('font-style', 'normal');
		$("#" + commentBoxId + " > textarea").css('color', '#666');
		$("#" + commentBoxId + " > textarea").val('');
	}
}
function commentCharCheck(commentBoxId, inButtonClass) {
	comment = $("#" + commentBoxId + " > textarea").val();
	
	if (htmlspecialchars(comment).length >= 200) {
		if (inButtonClass)
		{
			$('.' + inButtonClass).addClass(inButtonClass+'_disabled');
		}
		commentErrorMsg(commentBoxId, "Message too long!", "#f00");
	} else {
		if (inButtonClass)
		{
			$('.' + inButtonClass).removeClass(inButtonClass+'_disabled');
		}
		commentErrorMsg(commentBoxId, "", "#c0c0c0");
	}
}
function commentErrorMsg(commentBoxId, errorMsg, borderColor) {
	$('#' + commentBoxId + " > p.mission_comment_error").html(errorMsg);
	$("#" + commentBoxId + " > textarea").css("border-color", borderColor);
}
function discardComment(commentBoxId) {
	comment = $('#' + commentBoxId).hide();
	comment = $('#' + commentBoxId + "> textarea").val('Enter comment here');
	$('#' + commentBoxId).css('font-style', 'italic');
	$('#' + commentBoxId).css('color', '#c0c0c0');
}

function removeMissionComment(commentId) {
	$.get("/missions/ajax/remove_comment.php?commentId=" + commentId,
			function(data){
				if (data == "SUCCESS") {
					refreshMissionsPage();
				} else {
					alert("There was a problem while removing your comment. Please try again later.");
				}
			});	
}
function removeGalleryComment(commentId) {
	$.get("/gallery/ajax/remove_comment.php?commentId=" + commentId,
			function(data){
				if (data == "SUCCESS") {
					refreshComments();
				} else {
					alert("There was a problem while removing your comment. Please try again later.");
				}
			});	
}

function missionReportComment(commentId, userId, username, userAvatar, timeElapsed, comment){
	popUpBoxByUrl('/missions/ajax/report_comment_popup.php?commentId=' + commentId  + '&userId=' + userId + '&username=' + username + '&userAvatar=' + userAvatar + '&timeElapsed=' + timeElapsed + '&comment=' + comment, 600, 325, "");		
}
function submitReportComment(commentId, userId, username, comment, commentBoxId) {
	reportComment = $("#" + commentBoxId + " > textarea").val();

	$.get("/missions/ajax/report_comment.php?commentId=" + commentId + "&userId=" + userId + "&username=" + username + "&comment=" + comment + "&reportComment=" + reportComment,
		function(data){
			if (data == "SUCCESS") {
				closePopup();
			} else {
				commentErrorMsg(commentBoxId, "There was an error while submitting. Please try again later.", "#f00");
			}
		});
}

function galleryReportComment(commentId, userId, username, userAvatar, timeElapsed, comment){
	popUpBoxByUrl('/gallery/ajax/report_comment_popup.php?commentId=' + commentId  + '&userId=' + userId + '&username=' + username + '&userAvatar=' + userAvatar + '&timeElapsed=' + timeElapsed + '&comment=' + comment, 600, 325, "");		
}
function submitGalleryReportComment(commentId, userId, username, comment, commentBoxId) {
	reportComment = $("#" + commentBoxId + " > textarea").val();

	$.get("/gallery/ajax/report_comment.php?commentId=" + commentId + "&userId=" + userId + "&username=" + username + "&comment=" + comment + "&reportComment=" + reportComment,
		function(data){
			if (data == "SUCCESS") {
				closePopup();
			} else {
				commentErrorMsg(commentBoxId, "There was an error while submitting. Please try again later.", "#f00");
			}
		});
}

function setFavoriteUserMission(userMissionId) {
	$.get("/users/ajax/set_favorite_mission.php?userMissionId=" + userMissionId,
			function(data){
				if (data == "SUCCESS") {
					refreshMissionsPage();
				} else {
					alert("There was a problem while setting this as your favorite. Please try again later.");
				}
			});	
}


//General/Shared Funcs..............................
function displayRank(outDiv, inRank, headingType, isLargeIcon, inParent, inAkamaiPath){

	var html = "";
	if (inAkamaiPath != null) {
		imageGamePath = inAkamaiPath+"/images/games/";
	} else {
		imageGamePath = "/images/games/";
	}
	if (isLargeIcon) {
		imageGamePath += "rankIcons40x40/";
	}
	
	imageGamePath += "rankIcon_";
	if (inRank > 9) {
		imageGamePath = imageGamePath + (inRank);
	} else {
		imageGamePath = imageGamePath + "0" + (inRank);
	}
	imageGamePath = imageGamePath + ".png";
	if (headingType == 0 && headingType != 3) {
		html += "<p>Rank " + inRank + "</p>";
	}
	if (headingType != 2) {
		html += "<img class = 'rank_icon' src = '" + imageGamePath + "' alt='' />";
	}
	if (headingType == 1) {
		html += "<p>Rank " + inRank + " (" + rankNames[inRank-1] + ")</p>";
	} else if (headingType == 2) {
		html += "<p>Your Rank: " + inRank + " (" + rankNames[inRank-1] + ")</p>";
	}
	if (inParent != null) {
		window.parent.$("#" + outDiv).html(html);
	} else {
		$("#" + outDiv).html(html);
	}
}

function displayHalfStars(outDiv, inHalfStars, inParent, inAkamaiPath){
	var html = "";
	
	if (inAkamaiPath != null) {
		imageGamePath = inAkamaiPath+"/images/games/";
	} else {
		imageGamePath = "/images/games/";
	}
	fullStars = Math.floor(inHalfStars/2);
	remainderStars = inHalfStars%2;
	for (i = 0; i < fullStars; i++) {
		html += "<img src = '" + imageGamePath + "star_full.png' alt='' />";
	}
	if (remainderStars > 0) {
		html += "<img src = '" + imageGamePath + "star_half.png' alt='' />";
	}
	for (i = 0; i < 5-(fullStars+remainderStars); i++) {
		html += "<img src = '" + imageGamePath + "star_empty.png' alt='' />";
	}
	if (inParent != null) {
		window.parent.$("#" + outDiv).html(html);
	} else {
		$("#" + outDiv).html(html);
	}
}

function displayLiveBar(outDiv, inRank, inUserRating, headingType, inParent, inAkamaiPath){
	var v1 = Math.floor(inUserRating / 1000);
	var v2 = inUserRating % 1000;
	var v3 = inUserRating - (v1 * 1000);
	var offset = (v2 > 0 && v3 > 0) ? 1 : 0;

	var percentage = 0;
	var currentRating = 0;
	
	if (offset == 1) {
		percentage = (v3 / 1000) * 100;
		currentRating = v3;
	} else if (inUserRating == '') {
		currentRating = 500;
		percentage = 50;
		inRank = 1;
	} else {
		percentage = 100;
		currentRating = 1000;
	}
	
	var header = (headingType == 0) ? "Rank " + inRank + " (" + rankNames[inRank-1] + ")" : "";
	
	var html  = "<p style='text-align: " + ((headingType == 1) ? "center" : "left" ) + ";'>" + header + 
				"<span style='position: absolute; " + ((headingType == 1) ? "top: 10px; left: 0; width: 100%;" : "right: 0;" ) + "; font-weight: bold; color: #000;'>" + currentRating + "/1000</span></p>";

		html += "<div class='tetris_progress_bar'>";
		html += "   <div class='tetris_progress_bar_content tetris_progress_green_bar_content' style='width:" + (percentage) + "%;'></div>";
		html += "</div>";
		
	$("#" + outDiv).html(html);
}

function displayLoginForm(showLoginForm)
{
	var pageUrl = window.location.href;

	if (pageUrl.match('game.php') == null && pageUrl.match('login.php') == null) {
		if (showLoginForm) {
			$('div.tetris_login_form').css("left", "auto");
			$('div.tetris_login_form').css("right", "65px");
		} else {
			$('div.tetris_login_form').css("left", "-9999px");
			$('div.tetris_login_form').css("right", "auto");
		}
	} else {
		window.location.href = '/users/login.php';
	}
}

function displayShareThisPopup()
{
	// Check if game swf exists and pauses game if side buttons are not disabled
	if ($('#game_swf').length) {
		if ($('#game_side_buttons').length && !$('#game_side_buttons > a').hasClass('disabled_game_button')) {
			tetrisGameOptions();
		}
	}
	
	var url = '/users/ajax/sharethis.php';
	url = url + '?pageUrl=' + window.location.href;
	url = url + '&pageTitle=' + window.document.title;
	popUpBoxByUrl(url, 400, 200);
}

function popUpGameErrorNotice(userId, errorCode, errorMsg, errorRQ, errorRS, sendError)
{
	popUpBoxByUrlExt('/games/ajax/game_results_error_popup.php?userId=' + userId + '&errorCode=' + errorCode, 616, 375, '', null, 
			function() { if (sendError) { $.post("/games/ajax/process_error_msg.php", { userId: userId, errorCode: errorCode, errorMsg: errorMsg, errorRQ: errorRQ, errorRS: errorRS}); } }, null);
}

function popUpHolidayNotice()
{
	$("#tetris_token_notice").css('background-color', "#fff");
	$(document).ready(function() { 
		addNotice("<a parent='_top' href='/shop/index.php'><img style='height: 100px; width: 872px; display: block; margin: 0 auto;' src='" + AD_AKAMAI_PATH+ "/images/promo_ads/holidays/christmasRubies.png' /></a>");
	});
}

function popUpHolidayPopup()
{
	$("#tetris_token_notice").css({'height': '0', 'overflow': 'hidden'});

	var popupHtml = "";
	popupHtml = "<div id='holiday_popup'>" +
				"<div class='box_header'><a class='floatright button button_small_grey button_small_grey_close user_stats_close_btn' href='javascript: void(0)' onclick='closePopup();'></a></div>" +
				"<br />" + 
				"<div style='border: 1px solid #c0c0c0; border-width: 1px 0 0 0;'>" +
					getEmbedFlashHtml(AD_AKAMAI_PATH + "/images/promo_ads/holidays/RubyPresent.swf", "HolidayNotice", 650, 350, {}) +
				"</div>" +
				"<a class='button button_large_blue button_go_shopping margincenter' parent='_top' href='/shop/index.php'>Go Shopping</a>" +
			"</div>";
	
	$(document).ready(function() { 
		popUpBoxByHtml(popupHtml, 650, 435, "", function () { }, function () {});
	});
}

function popUpPromoNotice(promo_js_url)
{
	if (typeof(promo_js_url) == 'undefined' || promo_js_url == false) {
		promo_js_url = "http://videoads2.tetrisfriends.com/inHouse_ads/html/primary_promo_notice.html";
	}
	$.getScript(promo_js_url, function() { try { } catch(err) { } });
}

function popUpPromoPopup(promo_js_url)
{
	if (typeof(promo_js_url) == 'undefined' || promo_js_url == false) {
		promo_js_url = "http://videoads2.tetrisfriends.com/inHouse_ads/html/primary_promo_popup.html";
	}
	$.getScript(promo_js_url, function() { try { } catch(err) { } });
}

function popUpRegisterPopup(callbackFunc) {
	if (typeof(callbackFunc) == 'undefined' || callbackFunc == '') {
		callbackFunc = function () { };
	}
	popUpBoxByUrlExt("/users/_inc/_registerForm.php?isPopup=true&$saveGame=true", 650, 480, "", callbackFunc, function() {});
}

function popUpRegisterPromoPopup(callbackFunc,inIsOptionPopup) {
	if (typeof(callbackFunc) == 'undefined' || callbackFunc == '') {
		callbackFunc = function () { };
	}
	if (inIsOptionPopup) {
		popUpBoxByUrlExt("/users/_inc/_arenaGuestInvite.php", 650, 400, "", callbackFunc, function() {});
	} else {
		popUpBoxByUrlExt("/users/_inc/_registerPromo.php?isPopup=true", 650, 400, "", callbackFunc, function() {});
	}
}

function popUpDailySpin(inActionToken) {
	 popUpBoxByUrl("/users/ajax/daily_spin_popup.php?action_token=" + inActionToken, 640, 510, "", function() { setTimeout("refreshMiniProfile()", 0); });
}
function refreshMiniProfile() {
	addLoadingAnimation("#home_mini_profile_container");
	$("#home_mini_profile_container").load("/users/_inc/mini_profile.php", function() { removeLoadingAnimation("#home_mini_profile_container"); });
}

function popUpArenaTimeUpPopup() {
	var popupHtml = "<div id='arena_timeup_popup'>" +
					"<div class='box_header'>" +
						"<h2 class='textcenter'>Viewing Time Ended</h2>"+
						"<a class='floatright button button_small_grey button_small_grey_close user_stats_close_btn' href='javascript: void(0)' onclick='closePopup(); window.location.href = \"/index.php\";'></a>" +
					"</div>" +
					"<br />" +
					"<div style='text-align:center; font-size:18px; margin:40px 10px;'>" +
						"You have reached the max viewing time for the day.<br />Come back tomorrow or <a href='/users/register.php'>sign-up</a> for a Free Account to get an unlimited access." +
					"</div>" +
				"</div>";
	
	popUpBoxByHtml(popupHtml, 550, 300, "", function(){}, function(){});
}

function resetTabStates(tabListId) {
	$("ul#" + tabListId + " > li > a").removeClass("selected");
}

function selectTab(tabListId, tabName) {
	resetTabStates(tabListId);
	$("ul#" + tabListId + " > li." + tabName + " > a").addClass("selected");
}

function resetButtonStates(buttonDivClass) {
	var buttons = $("div#" + buttonDivClass + " > a");
	
	for(var i = 0; i < buttons.length; i++) {
		var buttonClasses = $(buttons[i]).attr('class'); 
		buttonClasses = buttonClasses.split(" ");
		
		for (var j = 0; j < buttonClasses.length; j++) {
			if (buttonClasses[j].search(/\w_selected/) != -1) {
				$(buttons).removeClass(buttonClasses[j]);
			}
		}
	}
}

function selectButton(buttonDivClass, buttonName) {
	resetButtonStates(buttonDivClass);
	$("div#" + buttonDivClass + " > a." + buttonName).addClass(buttonName + "_selected");
}

function showCommentBox(commentBoxId) {
	$('.mission_comment_box').hide();
	$('#' + commentBoxId).show();
}

function addLoadingAnimation(elementId) {
	$(elementId).html('<div id="tetris_loading_spinner" ></div><div id="tetris_loading_mask"></div>' + $(elementId).html());
}

function removeLoadingAnimation(elementId) {
	var parentNode = "";
	
	if (typeof(elementId) != undefined && typeof(elementId) != "undefined") {
		parentNode = elementId + " > ";
	}
	
	$(parentNode + ' #tetris_loading_spinner').remove();
	$(parentNode + ' #tetris_loading_mask').remove();
}

function generatePages(elementId, itemsPerPage, startPage, inAutoHeight, inPageUpdateHook) {
	var items = $(elementId).children();
	var itemCounter = 0;
	var autoHeight = ((typeof(inAutoHeight) == 'undefined') ? false : inAutoHeight );
	var startPage  = ((typeof(startPage) == 'undefined') ? 1 : startPage );
	var inPageUpdateHook  = ((typeof(inPageUpdateHook) == 'undefined') ? function () { } : inPageUpdateHook );
		
	for (var i = 0; i < items.length; i = i + itemsPerPage) {
		var endIndex = i + itemsPerPage;
		
		if (endIndex > items.length) {
			endIndex = items.length;
		}
		
		$(items).slice(i, endIndex).wrapAll("<div class='" + elementId.substring(1) + "_page'></div>");
	}

	// init Pager
	initPager(elementId, autoHeight, startPage, inPageUpdateHook);
}

function initPager(elementId, autoHeight, startPage, inPageUpdateHook) {
	if (autoHeight == undefined || autoHeight == 'undefined') {
		autoHeight = false;
	}
	if (startPage == undefined || startPage == 'undefined') {
		startPage = 1;
	}
	if (inPageUpdateHook == undefined || inPageUpdateHook == 'undefined') {
		inPageUpdateHook = function() { };
	}

	$(document).ready(function() {
		$(elementId).jpager('.' + elementId.substring(1) + '_page', {
			navClass: 'pager_page_nav ',
			highlightClass: 'pager_page_selected',
			prevText: 'Prev',
			nextText: 'Next',
			autoHeight: autoHeight,
			startPage: startPage,
			pageUpdateHook: inPageUpdateHook
		});
	});
}

function addNotice(noticeString, enableAutoHide, secondaryCallback) {
	if (secondaryCallback == undefined || secondaryCallback == 'undefined') {
		secondaryCallback = function () { };
	}
	
	var tmpHtml = $("#tetris_token_notice").html();
	var callbackFunc = function () { };
	
	if (tmpHtml.length != 0) {
		tmpHtml = tmpHtml + "<br />";
	}
	
	if (typeof(enableAutoHide) == 'undefined' || enableAutoHide == '') {
		enableAutoHide = false;
	}
	
	if (enableAutoHide) {
		callbackFunc = function () { intervalTimer = setTimeout("$('#tetris_token_notice').hide('slow');", 3000); };
	} else {
		// cancel auto hide if a subsequent notice disables it
		if (intervalTimer != -1) {
			clearTimeout(intervalTimer);
			intervalTimer = -1;
		}
	}
	
	$("#tetris_token_notice").html( tmpHtml + noticeString);
	$('#tetris_token_notice').show('fast', function () { callbackFunc(); secondaryCallback(); });
}

function clearNotice() {
	$("#tetris_token_notice").hide();
	$("#tetris_token_notice").html("");
}

function clearSessionNotifications() {
	$.get("/users/ajax/clear_notifications.php");
}

var activateSent = false;
function activatePromoItem(accessoryId) {
	if (!activateSent) {
		activateSent = true;
		
		$.get("/users/ajax/activate_promo_item.php?accessoryId="+accessoryId, 
				function(data) {
					if (data == "SUCCESS") {
						showItemDetails(accessoryId , accessoryType);
						addNotice("<p style=\"color: #000;\">This <i>limited-time</i> promotional item has now been added to your account. Have fun!</p>");
					} else {
					}
				});
	}
}

function activatePromoMission(missionId) {
	if (!activateSent) {
		activateSent = true;
		
		$.get("/users/ajax/activate_promo_item.php?missionId="+missionId, 
				function(data) {
					if (data == "SUCCESS") {
						addNotice("<p style=\"color: #000;\">This promotional item has now been added to your account. Have fun!</p>");
						setTimeout('refreshMissionsPage(); popUpMissionStore('+missionId+');', 0);
					} else {
					}
				});
	}
}

function activateRewards(inTFActionToken) {
	if (!activateSent) {
		activateSent = true;
		
		try {
			if (typeof(spinCount) == undefined || typeof(spinCount) == "undefined") {
				spinCount = 1;
			}
			
			var rewards = prizeTags.split("&");
			
			pageTracker = _gat._getTracker("UA-886022-5");
		  	pageTracker._trackPageview("/daily_spin_popup/spin" + spinCount);
		  	
		  	for (var pCount = 0; pCount < rewards.length; pCount++) {
		  		var item = rewards[pCount].split(":");
		  		pageTracker._trackEvent("DailySpin", item[0], item[1]);
		  	}
		} catch(err) {}
		
		$.get("/users/ajax/activate_promo_item.php?rewardSpin=1", 
				function(data) {});
	}
}

function toggleTroubleElements(on){
	var troubleElements = ['select', 'object', 'embed', 'canvas'];

	for(var i=0; i<troubleElements.length; i++) {
		var elements = document.getElementsByTagName(troubleElements[i]);
		for(var k=0; k<elements.length; k++) {
			if(on){
				$(elements[k]).css("visibility", "visible");
		    } else {
		    	$(elements[k]).css("visibility", "hidden");
		    }
	    }
	}
}

//Utilities.................................
function getNowPlusMinutes(minutes){
    var x = new Date();
    return new Date().setTime(x.getUTCSeconds + (minutes * 60 * 1000));
}

function formatLoginId(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes.toString();
    }
    return hours.toString() + minutes.toString();
}

function isMainPage(requestUri) {
    if (requestUri.search(/index.php/) != -1 
        || requestUri == "/"
        || requestUri.search(/users\/profile.php/) != -1 
        || requestUri.search(/leaderboard\/index.php/) != -1 
        || requestUri.search(/help\/tips.php/) != -1 
        || requestUri.search(/help\/help.php/) != -1         
        || requestUri.search(/game.php/) != -1) {
        return true;
    }
    return false;
}

function getExternalId(sessionId) {
    if (sessionId == 0) {
        var cookie = unescape($.cookie("guest_cookie"));
        cookie = cookie.split(':');
        return cookie[0];
    }
    return "u7tpFP8R0Cg=";
}

function getLoginId(loginId) {
    if (loginId == 0) {
        var cookie = unescape($.cookie("guest_cookie"));
        cookie = cookie.split(':');
        if (cookie[2] == -1) {
            return tmpLoginId;
        } else {
            return cookie[2]; 
        }
    }
    return loginId;
}

function encodeHtmlSpecialChars(input_content) {
	input_content = input_content.replace(/\"/g, "&quot;");
	input_content = input_content.replace(/'/g, "&#039;");
	input_content = input_content.replace(/</g, "&lt;");
	input_content = input_content.replace(/>/g, "&gt;");
	input_content = input_content.replace(/&/g, "&amp;");

	return input_content;
}

function decodeHtmlSpecialChars(input_content) {
	input_content = input_content.replace(/&quot;/g, "\"");
	input_content = input_content.replace(/&#039;/g, "'");
	input_content = input_content.replace(/&lt;/g, "<");
	input_content = input_content.replace(/&gt;/g, ">");
	input_content = input_content.replace(/&amp;/g, "&");

	return input_content;
}

function convertToLocalTimezone(timestamp) {
	tmpDateObj = new Date();
	localOffset = tmpDateObj.getTimezoneOffset();
	localOffset = localOffset * 60 * 1000;
	timestamp = timestamp - localOffset;
	return timestamp;
}

function formatDateTime(dateObj) {
	date  = dateObj.getDate();
	month = dateObj.getMonth() + 1;
	year  = dateObj.getFullYear();
	time  = dateObj.toLocaleTimeString(); 
	
	return year + "-" + month + "-" + date + " <br /> " + time;
}

function formatSprintTime(timeMSEC) {
	var result;
	
	if (timeMSEC == -1) {
		result = "---";
	} else {
		minutes = Math.floor((timeMSEC/1000)/60);
		seconds = (timeMSEC/1000) - (minutes*60);
		decimal = Math.floor(new Number(seconds%1).toPrecision(2) * 100);
		seconds = Math.floor(seconds);
		
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		if (decimal < 10) {
			decimal = "0" + decimal;
		}
		result = "" + minutes + ":" + seconds + "." + decimal;
	}
	
	return result;
}

function htmlspecialchars(str) {
	if (typeof(str) == "string") {
		str = str.replace(/&/g, "&amp;"); /* must do &amp; first */
		str = str.replace(/"/g, "&quot;");
		str = str.replace(/'/g, "&#039;");
		str = str.replace(/</g, "&lt;");
		str = str.replace(/>/g, "&gt;");
	}
	return str;
}

function trim(str) {
	s = str.replace(/^(\s)*/, '');
	s = s.replace(/(\s)*$/, '');
	return s;
}

function getEmbedFlashHtml(swfUrl, swfId, swfWidth, swfHeight, flashVars) {	
	if (flashVars == undefined || flashVars == 'undefined') {
		flashVars = "swfState = 1";
	}
	
	var tmpHtml = '<object id="' + swfId + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + swfWidth + '" height="' + swfHeight + '" data="' + swfUrl + '">';
	tmpHtml += '<param name="movie" value="' + swfUrl + '">';
	tmpHtml += '<param name="quality" value="high">';
	tmpHtml += '<param name="wmode" value="transparent">';
	tmpHtml += '<param name="scale" value="noscale">';
	tmpHtml += '<param name="salign" value="tl">';
	tmpHtml += '<param name="allowScriptAccess" value="always">';
	tmpHtml += '<param name="FlashVars" value="' + flashVars + '">';
	tmpHtml += '<embed name="'+swfId+'" src="' + swfUrl + '" width="' + swfWidth + '" FlashVars="' + flashVars + '" allowScriptAccess="always" quality="high" wmode="transparent" scale="noscale" salign="tl" height="' + swfHeight + '"></embed>';
	tmpHtml += '</object>';
	
	return tmpHtml;
}

function calculateTimeLeft (dateStarted, timeAllowed) {
	var now = new Date();
	var ds;
	var tmpArray;
	var dateArray;
	var timeArray;
	tmpArray = dateStarted.split(" ");
	dateArray = tmpArray[0].split("/");
	timeArray = tmpArray[1].split(":");
	//month starts from 0?!?
	ds = new Date(dateArray[2], dateArray[1]-1, dateArray[0], timeArray[0], timeArray[1], timeArray[2]);
	var timeleft = Math.floor((now - ds)/1000);
	timeleft = (timeAllowed * 24*60*60) - timeleft;
	
	return timeleft;
}
function convertSecondsToWords(inSec) {
	var label   = "";
	var result  = "";
	
	if (inSec < 60) {
		label  = (inSec == 1) ? " second" : " seconds";
	} else if (inSec/60 < 60) {
		inSec   = Math.floor(inSec/60);
		label  = (inSec == 1) ? " minute" : " minutes";
	} else if (inSec/60/60 <= 24) {
		inSec   = Math.floor(inSec/60/60);
		label  = (inSec == 1) ? " hour" : " hours";
	} else if (inSec/60/60/24 <= 14) {
		inSec   = Math.ceil(Math.round(inSec/60/60/24, 2));
		label  = (inSec == 1) ? " day" : " days";
	} else if (inSec/60/60/24/7 < 4) {
		inSec   = Math.ceil(inSec/60/60/24/7);
		label  = (inSec == 1) ? " week" : " weeks";
	} else if (inSec/60/60/24/7/4 < 12) {
		inSec   = Math.floor(inSec/60/60/24/7/4);
		label  = (inSec == 1) ? " month" : " months";
	} else {
		inSec   = Math.floor(inSec/60/60/24/7/12);
		label  = (inSec == 1) ? " year" : " years";
	}

	return inSec+label;
}

function padNumber(inNum, paddingCount) {
	var numLength = inNum.length;
	var result = inNum;
	
	for (var i=numLength; i < paddingCount; i++) {
		result = "0" + result;
	}
	return result;
}

function validateEmailAddress(emailAddress) {
	var pattern = /[\w\d_\-\.]+@[\w\d_\-\.]+\.[\w\W\d]+/;
	return pattern.test(emailAddress);
}

function getIndex(array, value) {
	var result = -1;
	for(var i = 0; i < array.length && result == -1; i++) {
		if (array[i] == value) {
			result = i;
		}
	}
	return result;
}

function getBaseUrl(customUrl) {
	var safeParamList = new Array( "id",
								   "newsId",
								   "itemName", 
								   "accessoryId", "accessoryType",
								   "missionId", "collectionId");
	
	if (typeof(customUrl) == undefined || typeof(customUrl) == "undefined") {
		customUrl = document.location.href;
	}

	var finalUrl = "";
	
	if (customUrl.indexOf("?") == -1) {
		// no query params, return encoded URL
		finalUrl = encodeURIComponent(customUrl);
	} else {
		// parse through params and filter out extras...
		var urlArray = customUrl.split("?");
		var queryParams = urlArray[1].split("&");
		
		finalUrl = urlArray[0];

		// search array for param and add to list if in safe list		
		for (var i = 0; i < queryParams.length; i++) {
			var result = getIndex(safeParamList, queryParams[i].split("=")[0]);
			if (result != -1) {
				finalUrl += (i == 0 ? "?" : "&") + queryParams[i];
			}
		}
		finalUrl = encodeURIComponent(finalUrl);
	}
	return finalUrl;
}



//Metrics/Guest Cookie
function checkGuest(ip, hostname, requestUri, serverTime) {
    if (isMainPage(requestUri)) {
        var guestCookie = $.cookie("guest_cookie");
        
        if (guestCookie && guestCookie.length > 4) {
            var cookie = unescape(guestCookie);
            cookie = cookie.split(':');
            if (!guestHasAccount(cookie[2]) && !guestSavedThisHour(cookie[2])) {
                saveDailyGuestActivity(cookie[0],cookie[1],formatLoginId(new Date()), hostname, serverTime);
            }
        } else {
            if (canSaveCookie()) {
                saveGuestCookie(ip , -1, -1, serverTime);
            }
        }
    }
}

function canSaveCookie() {
    $.cookie("chk_cookie", "true", {expires: getNowPlusMinutes(5)});
    if ($.cookie("chk_cookie")) {
        return true;
    }
    return false;  
}

function guestHasAccount(loginId) {
    return (loginId == "true" ? true : false);
}

function guestSavedThisHour(loginId) {
    if (loginId.toString().length == 4) {
        hours = loginId.toString().substr(0,2);
        min = loginId.toString().substr(2,2)
    } else {
        hours = loginId.toString().substr(0,1);
        min = loginId.toString().substr(2,2)
    }
    date = new Date();
    date.setHours(hours);
    date.setMinutes(min);
    return (Math.abs((date.getTime() - new Date().getTime())) < 3600000 ) ;
}

function saveGuestCookie(ip, loginId, externalId, serverTime) {
    var x = new Date();
    if (externalId == -1) {
        externalId = serverTime;
    }
    $.cookie("guest_cookie", escape(externalId.toString() + ":" + ip + ":" + loginId), {expires: 30, path: '/'}); // 30
																													// days
}

function saveDailyGuestActivity(externalId, ip, loginId, hostname, serverTime) {
    tmpLoginId = loginId;
    $.post("http://" + hostname + "/adm/metrics.php", 
           {external_id: externalId, ip: ip, login_id: loginId},
           function (data, status) {
               if (data.toString().search(/Success/) != -1) {
                   saveGuestCookie(ip,loginId,externalId, serverTime);
               }
           });
}


//Google Analitics

$(document).ready(function() {
	//home screen game list
	$("div#game_menu div#game_list li").click(function() {
		pageTracker._trackPageview('/home_screen/game_selector/');
	});
	// home screen accessory lists see accessories.pgp
	// home screen status msg
	$("h2#mini_profile_message").click(function() {
		pageTracker._trackPageview('/home_screen/change_status_msg');
	});					
	// game screen how to play
	$(".game_side_buttons .game_tutorial_button a").click(function() {
		pageTracker._trackPageview('/game_screen/how_to_play/' + replayProductId);
	});	
	// game options how to play
	$(".game_side_buttons .game_options_button a").click(function() {
		pageTracker._trackPageview('/game_screen/options/' + replayProductId);
	});	
	// leaderboard see leaderboard_page.php
	// profile edit
	$("#profile_edit_button").click(function() {
		pageTracker._trackPageview('/profile/edit/');
	});
});