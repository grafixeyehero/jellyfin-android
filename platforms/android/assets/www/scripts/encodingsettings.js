!function(e,n){function t(n,t){n.querySelector("#chkEnableThrottle").checked=t.EnableThrottling,e("#selectVideoDecoder",n).val(t.HardwareAccelerationType),e("#selectThreadCount",n).val(t.EncodingThreadCount),e("#txtDownMixAudioBoost",n).val(t.DownMixAudioBoost),e("#txtTranscodingTempPath",n).val(t.TranscodingTempPath||""),Dashboard.hideLoadingMsg()}function o(){var n=this,t=function(){Dashboard.showLoadingMsg(),ApiClient.getNamedConfiguration("encoding").then(function(t){t.DownMixAudioBoost=e("#txtDownMixAudioBoost",n).val(),t.TranscodingTempPath=e("#txtTranscodingTempPath",n).val(),t.EncodingThreadCount=e("#selectThreadCount",n).val(),t.HardwareAccelerationType=e("#selectVideoDecoder",n).val(),t.EnableThrottling=n.querySelector("#chkEnableThrottle").checked,ApiClient.updateNamedConfiguration("encoding",t).then(Dashboard.processServerConfigurationUpdateResult)})};return e("#selectVideoDecoder",n).val()?Dashboard.alert({callback:t,title:Globalize.translate("TitleHardwareAcceleration"),message:Globalize.translate("HardwareAccelerationWarning")}):t(),!1}e(n).on("pageinit","#encodingSettingsPage",function(){var n=this;e("#btnSelectTranscodingTempPath",n).on("click.selectDirectory",function(){require(["directorybrowser"],function(t){var o=new t;o.show({callback:function(t){t&&e("#txtTranscodingTempPath",n).val(t),o.close()},header:Globalize.translate("HeaderSelectTranscodingPath"),instruction:Globalize.translate("HeaderSelectTranscodingPathHelp")})})}),e(".encodingSettingsForm").off("submit",o).on("submit",o)}).on("pageshow","#encodingSettingsPage",function(){Dashboard.showLoadingMsg();var e=this;ApiClient.getNamedConfiguration("encoding").then(function(n){t(e,n)})})}(jQuery,document,window);