
/********************************************************
 * This is used to generate a mailto link with debugging information in the subject line
 * On page using:
 	<script type="text/javascript">
		updateSupportLinks();
    	updateFeedbackLinks();
    </script>
    
    <li id="supportSmall"><a id="footerSupportLink" href="mailto:support@tetrisonline.com?subject=SUPPORT" title="Support">Support</a></li>
    <li id="feedbackSmall"><a id="footerFeedbackLink" href="mailto:support@tetrisonline.com?subject=FEEDBACK" title="Feedback">Feedback</a></li>
 */


function generateFooter(customerId, errorCode)
{
      var data = "";

      data += "%0D%0A%0D%0A%0D%0A";
      data += "***********************************";
      data += "%0D%0A";

      if (customerId != null) 
      {
         data += "Customer ID: " + customerId + "%0D%0A";
      }

	  if (errorCode != undefined && errorCode != "undefined") {
		  data += "Error Code: " + errorCode + "%0D%0A";
	  }
      
      data += "Platform: ";

      if (navigator.cpuClass != null)
      {
         data += navigator.cpuClass + ", ";
      }

      data += navigator.platform;
      data += " (" + screen.width + " x " + screen.height + ", " + screen.colorDepth + " bit)" + "%0D%0A";
      data += "Flash Detected: ";

      var swfVer = GetSwfVer();

      if (swfVer != -1)
      {
         swfVer = swfVer.replace(/\,/g,"%2C");
         swfVer = swfVer.replace(/\./g,"%2C");
         data += "Yes (" + swfVer + ")";
      } else {
         data += "No";
      }

      data += ", Cookies Enabled: ";

      if (navigator.cookieEnabled)
      {
         data += "Yes";
      } else {
         data += "No";
      }

      data += "%0D%0A";
      data += "Browser: " + navigator.userAgent;
      data += "%0D%0A";
      data += "***********************************";
      data += "%0D%0A";
      
      return data;
}


function updateSupportLinks(customerId, anchorId, errorCode) {
	  if (anchorId == undefined || anchorId == "undefined") {
		  anchorId = "footerSupportLink";
	  }
	
      var hrefStr = "mailto:support@tetrisonline.com?subject=TETRISFRIENDS.COM%20SUPPORT&BODY=";
      hrefStr += generateFooter(customerId, errorCode);

      $('#' + anchorId).attr("href", hrefStr);
      $('#' + anchorId).after("<a id='footerSupportLink' href='" + hrefStr + "'>support@tetrisonline.com</a>").remove();
}


function updateFeedbackLinks(customerId) {
      var hrefStr = "mailto:support@tetrisonline.com?subject=TETRISFRIENDS.COM%20FEEDBACK&BODY=";
      hrefStr += generateFooter();

      var feedbackLink = document.getElementById('navFeedbackLink');
      feedbackLink.href = hrefStr;
      feedbackLink = document.getElementById('footerFeedbackLink');
      feedbackLink.href = hrefStr;
}