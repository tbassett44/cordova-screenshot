/*
 *  This code is adapted from the work of Michael Nachbaur
 *  by Simon Madine of The Angry Robot Zombie Factory
 *   - Converted to Cordova 1.6.1 by Josemando Sobral.
 *   - Converted to Cordova 2.0.0 by Simon MacDonald
 *  2012-07-03
 *  MIT licensed
 */
var exec = require('cordova/exec'), formats = ['png','jpg'];
module.exports = {
	save:function(callback,format,quality,filename,crop) {
        if(!crop){
            var crop={
	            top:0,
	            left:0,
	            width:document.body.clientWidth,
	            height:document.body.clientHeight
            }
        }
		format = (format || 'png').toLowerCase();
		filename = filename || 'screenshot_'+Math.round((+(new Date()) + Math.random()));
		if(formats.indexOf(format) === -1){
			return callback && callback(new Error('invalid format '+format));
		}
		quality = typeof(quality) !== 'number'?100:quality;
		exec(function(res){
			callback && callback(null,res);
		}, function(error){
			callback && callback(error);
		}, "Screenshot", "saveScreenshot", [format, quality, filename,crop]);
	},

	URI:function(callback, quality,crop){
		quality = typeof(quality) !== 'number'?100:quality;
        if(!crop){
           var crop={
	           top:0,
	           left:0,
	           width:document.body.clientWidth,
	           height:document.body.clientHeight
           }
       }
		exec(function(res){
			callback && callback(null, res);
		}, function(error){
			callback && callback(error);
		}, "Screenshot", "getScreenshotAsURI", [quality,crop]);

	},

	URISync:function(callback,quality){
		var method = navigator.userAgent.indexOf("Android") > -1 ? "getScreenshotAsURISync" : "getScreenshotAsURI";
		quality = typeof(quality) !== 'number'?100:quality;
		exec(function(res){
			callback && callback(null,res);
		}, function(error){
			callback && callback(error);
		}, "Screenshot", method, [quality]);
	}
};
