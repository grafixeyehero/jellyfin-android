define([],function(){function n(n){}function i(n){var i=n.share.Id;ApiClient.ajax({type:"DELETE",url:ApiClient.getUrl("Social/Shares/"+i)})}function a(a,e){Dashboard.showLoadingMsg(),require(["sharingwidget"],function(o){ApiClient.ajax({type:"POST",url:ApiClient.getUrl("Social/Shares",{ItemId:e,UserId:a}),dataType:"json"}).then(function(a){var e={share:a};Dashboard.hideLoadingMsg(),o.showMenu(e,n,i)},function(){Dashboard.hideLoadingMsg()})})}window.SharingManager={showMenu:a}});