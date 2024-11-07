var gAutomaticReloadForwardObject = null;
function automaticReloadForward () {
    if (gAutomaticReloadForwardObject != null)
        gAutomaticReloadForwardObject.automaticReload();
}

if (typeof ut == "undefined") { var ut = new Object(); }
ut.UnityObject = function (u, i, w, h, d, a) {
    if (!document.getElementById) { return; }
    this.attributes = new Array();
    this.params = new Object();
    if (u) { this.setAttribute("src", u); }
    if (i) { this.setAttribute("id", i); }
    if (w) { this.setAttribute("width", w); }
    if (h) { this.setAttribute("height", h); }
    if (d) { this.setAttribute("div", d); }
    if (a) { this.setAttribute("anchor", a); }
}

ut.UnityObject.prototype = {    
    addParam: function (aName, aValue) {
            this.params[aName] = aValue;
      },
    automaticReload: function () {
        gAutomaticReloadForwardObject = null;
        navigator.plugins.refresh();
        if (this.detectUnityWebPlayer()) {
            window.location.reload();
        }
        else {
            gAutomaticReloadForwardObject = this;
            setTimeout('automaticReloadForward()', 500);
        }
    },
    detectUnityWebPlayer: function () {
        var tInstalled = false;
        if (navigator.appVersion.indexOf("MSIE") != -1 && navigator.appVersion.toLowerCase().indexOf("win") != -1) {
            tInstalled = DetectUnityWebPlayerActiveX();
        } else {  
          if (navigator.mimeTypes && navigator.mimeTypes["application/vnd.unity"] && navigator.mimeTypes["application/vnd.unity"].enabledPlugin) {
            if (navigator.plugins && navigator.plugins["Unity Player"]) {
                tInstalled = true;   
            }
          }
        }
        return tInstalled;  
    },
    findEar: function () {
            this.unityEar = "";

            if (navigator.appVersion.indexOf("Chrome")) {
                this.unityEar = document.getElementById(this.getAttribute("id") + "Embed");
            } else if (navigator.appVersion.indexOf("MSIE") != -1 && navigator.appVersion.toLowerCase().indexOf("win") != -1) {
                  this.unityEar = document.getElementById(this.getAttribute("id") + "Object");
            } else if (navigator.appVersion.toLowerCase().indexOf("safari") != -1) {
                  this.unityEar = document.getElementById(this.getAttribute("id") + "Object")
            } else {
                  this.unityEar = document.getElementById(this.getAttribute("id") + "Embed");
            }
          document.Unity = this.unityEar;
    },    
      getAttribute: function (aName) {
            return this.attributes[aName];
      },  
      getParams: function () {
            return this.params;
      },        
    getInstallerPath: function () {
        var tDownloadURL = ""; 
        if (navigator.platform == "MacIntel") {
            tDownloadURL = "http://webplayer.unity3d.com/download_webplayer-2.x/webplayer-i386.dmg";
        }
        else if (navigator.platform == "MacPPC") {
            tDownloadURL = "http://webplayer.unity3d.com/download_webplayer-2.x/webplayer-ppc.dmg";
        }
        else if (navigator.platform.toLowerCase().indexOf("win") != -1) {
            tDownloadURL = "http://webplayer.unity3d.com/download_webplayer-2.x/UnityWebPlayer.exe";
        }
        return tDownloadURL;
    },   
    msg: function (aObj, aFunc, aVar) {
        this.unityEar.SendMessage(aObj, aFunc, aVar);
    },
    setAttribute: function (aName, aValue) {
            this.attributes[aName] = aValue;
      },      
    write: function (aElementId) {
    
        // Write the VB detection script once
        if (navigator.appVersion.indexOf("MSIE") != -1 && navigator.appVersion.toLowerCase().indexOf("win") != -1) {
            document.write(" \n");
            document.write("<script language='VBscript'> \n");
            document.write("function DetectUnityWebPlayerActiveX \n");
            document.write("on error resume next \n");
            document.write("dim tControl \n");
            document.write("dim res \n");
            document.write("res = 0 \n");
            if (this.playerVersion == 1) {
                document.write("set tControl = CreateObject(\"UnityWebPlayer.UnityWebPlayerAXCtrl.1\") \n");
            } else if (this.playerVersion >= 2) {
                document.write("set tControl = CreateObject(\"UnityWebPlayer.UnityWebPlayer.1\") \n");
            }
            document.write("if IsObject(tControl) then \n");
            document.write("res = 1 \n");
            document.write("end if \n");
            document.write("DetectUnityWebPlayerActiveX = res\n");
            document.write("end function\n");
            document.write("</script>\n");
        }
    
        if (this.detectUnityWebPlayer()) {
        	if (this.getAttribute("div")) {
        		this.getAttribute("div").html(this.writeEmbedDOM()); 
        	} else {
        		document.write(this.writeEmbedDOM());
        	}
        	
           this.findEar();
              return true;
        } else {
        	var tInstallerPath = this.getInstallerPath();
        	if (tInstallerPath == "") {
        		tInstallerPath = "http://www.unity3d.com/unity-web-player-2.x";
        	}
        	if (this.getAttribute("div") && this.getAttribute("anchor")) {
        		this.getAttribute("anchor").attr({ href: tInstallerPath })
        	}
        	this.automaticReload();
            return false;
        }
    },
    writeEmbedDOM: function() {
          var tUniSrc = "";
          
          tUniSrc += "<object classid='clsid:444785F1-DE89-4295-863A-D46C3A781394' codebase='http://webplayer.unity3d.com/download_webplayer-2.x/UnityWebPlayer.cab#version=2,0,0,0";
 
            tUniSrc += "id='" + this.getAttribute("id") + "Object' width='" + this.getAttribute("width") + "' height='" + this.getAttribute("height") + "'><param name='src' value='" + this.getAttribute("src")+"' />";
            var params = this.getParams();
          for(var key in params) {
              tUniSrc += "<param name='" + key + "' value='" + params[key] + "' />";
          }
          tUniSrc += "<embed type='application/vnd.unity' pluginspage='http://www.unity3d.com/unity-web-player-2.x' ";
        
          tUniSrc += "id='" + this.getAttribute("id") + "Embed' width='" + this.getAttribute("width") + "' height='" + this.getAttribute("height") + "' src='" + this.getAttribute("src") + "' ";
          var params = this.getParams();
          for(var key in params){
              tUniSrc += [key] + "='" + params[key] + "' ";
          }
          tUniSrc += " /></object\>";
          return tUniSrc;
    }
}
if (!document.getElementById && document.all) { document.getElementById = function(id) { return document.all[id]; }}
var UnityObject = ut.UnityObject;