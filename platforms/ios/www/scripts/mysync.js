define(["jQuery"],function(e){function n(e){require(["localsync"],function(){if(LocalSync.isSupported()){var n=LocalSync.getSyncStatus();e.querySelector(".labelSyncStatus").innerHTML=Globalize.translate("LabelLocalSyncStatusValue",n),e.querySelector(".syncSpinner").active="Active"==n,"Active"==n?e.querySelector(".btnSyncNow").classList.add("hide"):e.querySelector(".btnSyncNow").classList.remove("hide")}})}function c(e){require(["localsync"],function(){LocalSync.sync(),require(["toast"],function(e){e(Globalize.translate("MessageSyncStarted"))}),n(e)})}var t;e(document).on("pageinit","#mySyncActivityPage",function(){var n=this;e(".btnSyncNow",n).on("click",function(){c(n)}),require(["localsync"],function(){LocalSync.isSupported()?n.querySelector(".localSyncStatus").classList.remove("hide"):(n.querySelector(".localSyncStatus").classList.add("hide"),n.querySelector(".syncSpinner").active=!1)})}).on("pagebeforeshow","#mySyncActivityPage",function(){var e=this;n(e),t=setInterval(function(){n(e)},5e3)}).on("pagebeforehide","#mySyncActivityPage",function(){var e=this;e.querySelector(".syncSpinner").active=!1,t&&(clearInterval(t),t=null)})});