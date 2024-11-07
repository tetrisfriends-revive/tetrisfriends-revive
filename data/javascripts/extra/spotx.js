function getFlashVersion()
{
    var UNDEF = "undefined",
        OBJECT = "object",
        SHOCKWAVE_FLASH = "Shockwave Flash",
        SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
        FLASH_MIME_TYPE = "application/x-shockwave-flash",
        win = window,
        doc = document,
        nav = navigator;

    // Detect the flash version
    var w3cdom = typeof doc.getElementById != UNDEF && typeof doc.getElementsByTagName != UNDEF && typeof doc.createElement != UNDEF,
        playerVersion = [0,0,0],
        d = null;
    if (typeof nav.plugins != UNDEF && typeof nav.plugins[SHOCKWAVE_FLASH] == OBJECT)
    {
        d = nav.plugins[SHOCKWAVE_FLASH].description;

        if (d && !(typeof nav.mimeTypes != UNDEF && nav.mimeTypes[FLASH_MIME_TYPE] && !nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin))
        {
            d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
            playerVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
            playerVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
            playerVersion[2] = /r/.test(d) ? parseInt(d.replace(/^.*r(.*)$/, "$1"), 10) : 0;
        }
    }
    else if (typeof win.ActiveXObject != UNDEF)
    {
        var a = null, fp6Crash = false;
        try
        {
            a = new ActiveXObject(SHOCKWAVE_FLASH_AX + ".7");
        }
        catch(e)
        {
            try
            { 
                a = new ActiveXObject(SHOCKWAVE_FLASH_AX + ".6");
                playerVersion = [6,0,21];
                a.AllowScriptAccess = "always";  // Introduced in fp6.0.47
            }
            catch(e)
            {
                if (playerVersion[0] == 6)
                {
                    fp6Crash = true;
                }
            }
            if (!fp6Crash)
            {
                try
                {
                    a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
                }
                catch(e) {}
            }
        }
        if (!fp6Crash && a)	 // a will return null when ActiveX is disabled
        {
            try
            {
                d = a.GetVariable("$version");  // Will crash fp6.0.21/23/29
                if (d)
                {
                    d = d.split(" ")[1].split(",");
                    playerVersion = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
                }
            }
            catch(e) {}
        }
    }

    return playerVersion;
}

var flashVersion = getFlashVersion();

var spotx_search_url = 'http://search.spotxchange.com/ad_code/ad.js?cookie_me=true&listing_type=5&channel_id=' + spotx_channel_id;

if (typeof(spotx_content_category) != 'undefined' && spotx_content_category != '')
{
	spotx_search_url+= '&content_category=' + spotx_content_category;
}

if (typeof(spotx_ad_type) == 'undefined' || spotx_ad_type == '')
{
	spotx_ad_type = 'preroll';
}

if (typeof(spotx_ad_max_duration) == 'undefined' || spotx_ad_max_duration == '')
{
	spotx_ad_max_duration = '30';
}

if (typeof(spotx_ad_volume) == 'undefined' || spotx_ad_volume == '')
{
	spotx_ad_volume = '75';
}

if (typeof(spotx_ad_bitrate) == 'undefined' || spotx_ad_bitrate == '')
{
	spotx_ad_bitrate = 'high';
}

if (typeof(spotx_content_format) == 'undefined' || spotx_content_format == '')
{
	spotx_content_format = 'FlashVideo';
}

// Use MP4 for Quicktime and when we have flash version 9.0.115 or higher
if (spotx_content_format == 'Quicktime' ||
	(flashVersion[0]>9 || (flashVersion[0]==9 && (flashVersion[1]>0 || (flashVersion[1]==0 && flashVersion[2]>=115)))))
{
	spotx_search_url+= '&media_format[]=MP4&media_format[]=FlashVideo';
}
else
{
	spotx_search_url+= '&media_format=FlashVideo';
}

spotx_search_url += '&content_format=' + spotx_content_format;

if (typeof(spotx_return_type) != 'undefined' && spotx_return_type != '')
{
	spotx_search_url+= '&return_type=' + spotx_return_type;
}
	
spotx_search_url += '&ad_type=' + spotx_ad_type + '&playtime=' + spotx_ad_max_duration;
spotx_search_url += '&media_transcoding=' + spotx_ad_bitrate;

if (spotx_content_format != 'FlashVideo')
{
	spotx_search_url+= '&req_id=NEW';
}
else
{
	spotx_search_url+= '&req_id=UNSET';
}

if (typeof(spotx_banner_size) != 'undefined' && spotx_banner_size != '')
{
	spotx_search_url+= '&iab_imu=' + spotx_banner_size;

	if (typeof(spotx_banner_container_id) != 'undefined' && spotx_banner_container_id != '')
	{
		spotx_search_url+= '&banner_container_id=' + spotx_banner_container_id;
	}
}

if (typeof(spotx_content_container_id) != 'undefined' && spotx_content_container_id != '')
{
	spotx_search_url += '&content_container_id=' + spotx_content_container_id;

	if (typeof(spotx_content_width) == 'undefined' || typeof(spotx_content_height) == 'undefined' ||
			spotx_content_width == '' || spotx_content_height == '')
	{
		spotx_content_width = "320";
		spotx_content_height = "240";
	}
	spotx_search_url += '&content_width=' + spotx_content_width;
	spotx_search_url += '&content_height=' + spotx_content_height;
	spotx_search_url += '&ad_volume=' + spotx_ad_volume;
}

if (typeof(spotx_content_page_url) == 'undefined' || spotx_content_page_url == '')
{
    spotx_content_page_url = '';
}
spotx_search_url+= '&content_page_url=' + spotx_content_page_url;

/* Only include the spotx ad / banner generation code if we need to */
spotx_wait_for_element = function(e_id, func)
{
	var wait_handle = setInterval(function()
	{
		if (document.getElementById(e_id))
		{
			func();
			clearInterval(wait_handle)
		}
	}, 250);
}
spotx_search_url += '&cacheBreaker=' + (new Date()).getTime() + Math.random() + Math.random();
$.getScript(spotx_search_url, function() { spotx_ad_is_ready =  true; });
//document.write('<scr'+'ipt type="text/javascript" src="' + spotx_search_url + '"></scr'+'ipt>');

/* If we aren't generating an ad, provide a content sponsoring function for use by the publisher */
if (typeof(spotx_content_container_id) == 'undefined' || spotx_content_container_id == '')
{
	spotx_get_sponsor_url = function(content_url)
	{
		return content_url;
	}
}

// Later we can add some code to identify the banner's container so that post/midroll SWFs or
// http-redirect to streams could update the request id and show a new banner
// 
// it would do something like window.setInterval(function_to_add_script_tag, 1000);
// the script tag would check the request id and if it were different from the cookie, it would
// grab a new banner and put it in the container.  Like magic!