!function(e,a){function t(){return ApiClient}function n(e){if(Dashboard.hideLoadingMsg(),e.UserLinkResult){var a=e.UserLinkResult.IsPending?"MessagePendingEmbyAccountAdded":"MessageEmbyAccountAdded";Dashboard.alert({message:Globalize.translate(a),title:Globalize.translate("HeaderEmbyAccountAdded"),callback:function(){Dashboard.navigate("wizardlibrary.html")}})}else Dashboard.navigate("wizardlibrary.html")}function r(e){Dashboard.showLoadingMsg();var a=t();a.ajax({type:"POST",data:{Name:e.querySelector("#txtUsername").value,ConnectUserName:e.querySelector("#txtConnectUserName").value},url:a.getUrl("Startup/User"),dataType:"json"}).then(n,function(){o(e.querySelector("#txtConnectUserName").value)})}function o(e){Dashboard.alert(e?{message:Globalize.translate("ErrorAddingEmbyConnectAccount","apps@emby.media")}:{message:Globalize.translate("DefaultErrorMessage")})}function s(){var e=this;return r(e),!1}e(a).on("pageinit","#wizardUserPage",function(){e(".wizardUserForm").off("submit",s).on("submit",s)}).on("pageshow","#wizardUserPage",function(){Dashboard.showLoadingMsg();var e=this,a=t();a.getJSON(a.getUrl("Startup/User")).then(function(a){e.querySelector("#txtUsername").value=a.Name,e.querySelector("#txtConnectUserName").value=a.ConnectUserName,Dashboard.hideLoadingMsg()}),o("d")})}(jQuery,document,window);