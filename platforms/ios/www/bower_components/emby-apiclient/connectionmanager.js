define(["events","apiclient","appStorage"],function(e,n,r){var t={Unavailable:0,ServerSelection:1,ServerSignIn:2,SignedIn:3,ConnectSignIn:4,ServerUpdateNeeded:5},o={Local:0,Remote:1,Manual:2},s={getServerAddress:function(e,n){switch(n){case o.Local:return e.LocalAddress;case o.Manual:return e.ManualAddress;case o.Remote:return e.RemoteAddress;default:return e.ManualAddress||e.LocalAddress||e.RemoteAddress}}},c=function(c,i,a,d,u,l,f){function v(e,n){for(var r=0,t=n.length;t>r;r++)c.addOrUpdateServer(e,n[r]);return e}function p(e){e({State:t.Unavailable,ConnectUser:Y.connectUser()})}function I(e,n){e.Name=n.ServerName,e.Id=n.Id,n.LocalAddress&&(e.LocalAddress=n.LocalAddress),n.WanAddress&&(e.RemoteAddress=n.WanAddress),n.MacAddress&&(e.WakeOnLanInfos=[{MacAddress:n.MacAddress}])}function h(e,n){return e+"/emby/"+n}function m(e){var n=e.headers||{};"json"==e.dataType&&(n.accept="application/json");var r={headers:n,method:e.type,credentials:"same-origin"},t=e.contentType;return e.data&&("string"==typeof e.data?r.body=e.data:(r.body=S(e.data),t=t||"application/x-www-form-urlencoded; charset=UTF-8")),t&&(n["Content-Type"]=t),e.timeout?g(e.url,r,e.timeout):fetch(e.url,r)}function g(e,n,r){return new Promise(function(t,o){var s=setTimeout(o,r);n=n||{},n.credentials="same-origin",fetch(e,n).then(function(e){clearTimeout(s),t(e)},function(){clearTimeout(s),o()})})}function S(e){var n=[];for(var r in e){var t=e[r];null!==t&&void 0!==t&&""!==t&&n.push(encodeURIComponent(r)+"="+encodeURIComponent(t))}return n.join("&")}function T(e){if(!e)throw new Error("Request cannot be null");return e.headers=e.headers||{},m(e).then(function(n){return n.status<400?"json"==e.dataType||"application/json"==e.headers.accept?n.json():n:Promise.reject(n)},function(e){throw e})}function A(e,n){return e=h(e,"system/info/public"),T({type:"GET",url:e,dataType:"json",timeout:n||$})}function U(n){Q=n,e.trigger(Y,"connectusersignedin",[n])}function C(r,t){var o=Y.getApiClient(r.Id);if(!o){var c=s.getServerAddress(r,t);o=new n(c,i,a,d,u,f),Z.push(o),o.serverInfo(r),o.onAuthenticated=function(e,n){w(e,n,{},!0)},e.trigger(Y,"apiclientcreated",[o])}return o}function w(e,n,r,t){var o=c.credentials(),s=o.Servers.filter(function(e){return e.Id==n.ServerId}),i=s.length?s[0]:e.serverInfo();r.updateDateLastAccessed!==!1&&(i.DateLastAccessed=(new Date).getTime()),i.Id=n.ServerId,t?(i.UserId=n.User.Id,i.AccessToken=n.AccessToken):(i.UserId=null,i.AccessToken=null),c.addOrUpdateServer(o.Servers,i),y(i,n.User),c.credentials(o),e.serverInfo(i),k(e,r),L(i,i.LastConnectionMode,n.User)}function y(e,n){var r={Id:n.Id,IsSignedInOffline:!0};c.addOrUpdateUser(e,r)}function k(e,n){n=n||{},n.reportCapabilities!==!1&&e.reportCapabilities(l),n.enableWebSocket!==!1&&!e.isWebSocketOpenOrConnecting()&&e.isWebSocketSupported()&&e.openWebSocket()}function L(n,r,t){C(n,r),e.trigger(Y,"localusersignedin",[t])}function E(e){return new Promise(function(n){Q&&Q.Id==e.ConnectUserId?n():e.ConnectUserId&&e.ConnectAccessToken?(Q=null,b(e.ConnectUserId,e.ConnectAccessToken).then(function(e){U(e),n()},function(){n()})):n()})}function P(e){return"https://connect.emby.media/service/"+e}function b(e,n){if(!e)throw new Error("null userId");if(!n)throw new Error("null accessToken");var r="https://connect.emby.media/service/user?id="+e;return T({type:"GET",url:r,dataType:"json",headers:{"X-Application":i+"/"+a,"X-Connect-UserToken":n}})}function D(e,n,r){if(!e.ExchangeToken)throw new Error("server.ExchangeToken cannot be null");if(!r.ConnectUserId)throw new Error("credentials.ConnectUserId cannot be null");var t=s.getServerAddress(e,n);return t=h(t,"Connect/Exchange?format=json&ConnectUserId="+r.ConnectUserId),T({type:"GET",url:t,dataType:"json",headers:{"X-MediaBrowser-Token":e.ExchangeToken}}).then(function(n){return e.UserId=n.LocalUserId,e.AccessToken=n.AccessToken,n},function(){return e.UserId=null,e.AccessToken=null,Promise.reject()})}function M(e,n){return new Promise(function(r){var t=s.getServerAddress(e,n);T({type:"GET",url:h(t,"System/Info"),dataType:"json",headers:{"X-MediaBrowser-Token":e.AccessToken}}).then(function(o){I(e,o),e.UserId&&T({type:"GET",url:h(t,"users/"+e.UserId),dataType:"json",headers:{"X-MediaBrowser-Token":e.AccessToken}}).then(function(t){L(e,n,t),r()},function(){e.UserId=null,e.AccessToken=null,r()})},function(){e.UserId=null,e.AccessToken=null,r()})})}function j(e){if(Q&&Q.ImageUrl)return{url:Q.ImageUrl};if(e&&e.PrimaryImageTag){var n=Y.getApiClient(e),r=n.getUserImageUrl(e.Id,{tag:e.PrimaryImageTag,type:"Primary"});return{url:r,supportsParams:!0}}return{url:null,supportsParams:!1}}function O(n){var r=n.serverInfo()||{},t={serverId:r.Id};return n.logout().then(function(){e.trigger(Y,"localusersignedout",[t])},function(){e.trigger(Y,"localusersignedout",[t])})}function N(e){if(!e.ConnectAccessToken||!e.ConnectUserId)return Promise.resolve([]);var n="https://connect.emby.media/service/servers?userId="+e.ConnectUserId;return T({type:"GET",url:n,dataType:"json",headers:{"X-Application":i+"/"+a,"X-Connect-UserToken":e.ConnectAccessToken}}).then(function(e){return e.map(function(e){return{ExchangeToken:e.AccessKey,ConnectServerId:e.Id,Id:e.SystemId,Name:e.Name,RemoteAddress:e.Url,LocalAddress:e.LocalAddress,UserLinkType:"guest"==(e.UserType||"").toLowerCase()?"Guest":"LinkedUser"}})},function(){return[]})}function X(e,n){return e.filter(function(e){return e.ExchangeToken?n.filter(function(n){return e.Id==n.Id}).length>0:!0})}function x(){return new Promise(function(e){var n=function(n){var r=n.map(function(e){var n={Id:e.Id,LocalAddress:R(e)||e.Address,Name:e.Name};return n.LastConnectionMode=n.ManualAddress?o.Manual:o.Local,n});e(r)};require(["serverdiscovery"],function(e){e.findServers(1e3).then(n,function(){n([])})})})}function R(e){if(e.Address&&e.EndpointAddress){var n=e.EndpointAddress.split(":")[0],r=e.Address.split(":");if(r.length>1){var t=r[r.length-1];isNaN(parseInt(t))||(n+=":"+t)}return B(n)}return null}function G(e){require(["wakeonlan"],function(n){for(var r=e.WakeOnLanInfos||[],t=0,o=r.length;o>t;t++)n.send(r[t])})}function W(e,n){return(e||"").toLowerCase()==(n||"").toLowerCase()}function V(e,n){e=e.split("."),n=n.split(".");for(var r=0,t=Math.max(e.length,n.length);t>r;r++){var o=parseInt(e[r]||"0"),s=parseInt(n[r]||"0");if(s>o)return-1;if(o>s)return 1}return 0}function q(e,n,r,c,i,a){if(n>=e.length)return void p(a);var d=e[n],u=s.getServerAddress(r,d),l=!1,f=!1,v=$;return d==o.Local?(l=!0,v=8e3):d==o.Manual&&(W(u,r.LocalAddress)||W(u,r.RemoteAddress))&&(f=!0),f||!u?void q(e,n+1,r,c,i,a):void A(u,v).then(function(e){1==V(Y.minServerVersion(),e.Version)?a({State:t.ServerUpdateNeeded,Servers:[r]}):F(r,e,d,i,a)},function(){if(l){{1e4-((new Date).getTime()-c)}q(e,n+1,r,c,i,a)}else q(e,n+1,r,c,i,a)})}function F(e,n,r,t,o){var s=c.credentials();s.ConnectAccessToken?E(s).then(function(){e.ExchangeToken?D(e,r,s).then(function(){z(e,s,n,r,!0,t,o)},function(){z(e,s,n,r,!0,t,o)}):z(e,s,n,r,!0,t,o)}):z(e,s,n,r,!0,t,o)}function z(n,r,o,s,i,a,d){if(i&&n.AccessToken)return void M(n,s).then(function(){z(n,r,o,s,!1,a,d)});I(n,o),n.LastConnectionMode=s,a.updateDateLastAccessed!==!1&&(n.DateLastAccessed=(new Date).getTime()),c.addOrUpdateServer(r.Servers,n),c.credentials(r);var u={Servers:[]};u.ApiClient=C(n,s),u.State=n.AccessToken?t.SignedIn:t.ServerSignIn,u.Servers.push(n),u.ApiClient.updateServerInfo(n,s),u.State==t.SignedIn&&k(u.ApiClient,a),d(u),e.trigger(Y,"connected",[u])}function B(e){return e=e.trim(),0!=e.toLowerCase().indexOf("http")&&(e="http://"+e),e=e.replace("Http:","http:"),e=e.replace("Https:","https:")}function J(e,n){return n=e.cleanPassword(n),CryptoJS.MD5(n).toString()}function H(e){e.headers=e.headers||{},e.headers["X-Application"]=i+"/"+a}function K(e){var n={type:"POST",url:P("pin/authenticate"),data:{deviceId:e.DeviceId,pin:e.Pin},dataType:"json"};return H(n),T(n)}var Q,Y=this,Z=[],$=2e4;Y.connectUser=function(){return Q};var _="3.0.5724";return Y.minServerVersion=function(e){return e&&(_=e),_},Y.appVersion=function(){return a},Y.capabilities=function(){return l},Y.deviceId=function(){return u},Y.credentialProvider=function(){return c},Y.connectUserId=function(){return c.credentials().ConnectUserId},Y.connectToken=function(){return c.credentials().ConnectAccessToken},Y.getServerInfo=function(e){var n=c.credentials().Servers;return n.filter(function(n){return n.Id==e})[0]},Y.getLastUsedServer=function(){var e=c.credentials().Servers;return e.sort(function(e,n){return(n.DateLastAccessed||0)-(e.DateLastAccessed||0)}),e.length?e[0]:null},Y.getLastUsedApiClient=function(){var e=c.credentials().Servers;if(e.sort(function(e,n){return(n.DateLastAccessed||0)-(e.DateLastAccessed||0)}),!e.length)return null;var n=e[0];return C(n,n.LastConnectionMode)},Y.addApiClient=function(n){Z.push(n);var r=c.credentials().Servers.filter(function(e){return W(e.ManualAddress,n.serverAddress())||W(e.LocalAddress,n.serverAddress())||W(e.RemoteAddress,n.serverAddress())}),t=r.length?r[0]:{};if(t.DateLastAccessed=(new Date).getTime(),t.LastConnectionMode=o.Manual,t.ManualAddress=n.serverAddress(),n.serverInfo(t),n.onAuthenticated=function(e,n){w(e,n,{},!0)},!r.length){var s=c.credentials();s.Servers=[t],c.credentials(s)}e.trigger(Y,"apiclientcreated",[n]),t.Id||n.getPublicSystemInfo().then(function(e){var r=c.credentials();t.Id=e.Id,n.serverInfo(t),r.Servers=[t],c.credentials(r)})},Y.clearData=function(){Q=null;var e=c.credentials();e.ConnectAccessToken=null,e.ConnectUserId=null,e.Servers=[],c.credentials(e)},Y.getOrCreateApiClient=function(e){var n=c.credentials(),r=n.Servers.filter(function(n){return W(n.Id,e)});if(!r.length)throw new Error("Server not found: "+e);var t=r[0];return C(t,t.LastConnectionMode)},Y.user=function(e){return new Promise(function(n){function r(){var e=j(o);n({localUser:o,name:Q?Q.Name:o?o.Name:null,imageUrl:e.url,supportsImageParams:e.supportsParams})}function t(){e&&e.getCurrentUserId()?e.getCurrentUser().then(function(e){o=e,r()},r):r()}var o,s=c.credentials();!s.ConnectUserId||!s.ConnectAccessToken||e&&e.getCurrentUserId()?t():E(s).then(t,t)})},Y.isLoggedIntoConnect=function(){return Y.connectToken()&&Y.connectUserId()?!0:!1},Y.logout=function(){for(var n=[],r=0,t=Z.length;t>r;r++){var o=Z[r];o.accessToken()&&n.push(O(o))}return Promise.all(n).then(function(){for(var n=c.credentials(),r=n.Servers.filter(function(e){return"Guest"!=e.UserLinkType}),t=0,o=r.length;o>t;t++){var s=r[t];s.UserId=null,s.AccessToken=null,s.ExchangeToken=null;for(var i=s.Users||[],a=0,d=i.length;d>a;a++)i[a].IsSignedInOffline=!1}n.Servers=r,n.ConnectAccessToken=null,n.ConnectUserId=null,c.credentials(n),Q&&(Q=null,e.trigger(Y,"connectusersignedout"))})},Y.getSavedServers=function(){var e=c.credentials(),n=e.Servers.slice(0);return n.sort(function(e,n){return(n.DateLastAccessed||0)-(e.DateLastAccessed||0)}),n},Y.getAvailableServers=function(){var e=c.credentials();return Promise.all([N(e),x()]).then(function(n){var r=n[0],t=n[1],o=e.Servers.slice(0);return v(o,t),v(o,r),o=X(o,r),o.sort(function(e,n){return(n.DateLastAccessed||0)-(e.DateLastAccessed||0)}),e.Servers=o,c.credentials(e),o})},Y.connect=function(){return new Promise(function(e){Y.getAvailableServers().then(function(n){Y.connectToServers(n).then(function(n){e(n)})})})},Y.getOffineResult=function(){},Y.connectToServers=function(e){return new Promise(function(n){if(1==e.length)Y.connectToServer(e[0]).then(function(e){e.State==t.Unavailable&&(e.State=null==e.ConnectUser?t.ConnectSignIn:t.ServerSelection),n(e)});else{var r=e.length?e[0]:null;r?Y.connectToServer(r).then(function(r){n(r.State==t.SignedIn?r:{Servers:e,State:e.length||Y.connectUser()?t.ServerSelection:t.ConnectSignIn,ConnectUser:Y.connectUser()})}):n({Servers:e,State:e.length||Y.connectUser()?t.ServerSelection:t.ConnectSignIn,ConnectUser:Y.connectUser()})}})},Y.connectToServer=function(e,n){return new Promise(function(r){var t=[];null!=e.LastConnectionMode,-1==t.indexOf(o.Manual)&&t.push(o.Manual),-1==t.indexOf(o.Local)&&t.push(o.Local),-1==t.indexOf(o.Remote)&&t.push(o.Remote),G(e);var s=(new Date).getTime();n=n||{},q(t,0,e,s,n,r)})},Y.connectToAddress=function(e){return new Promise(function(n,r){function t(){p(n)}return e?(e=B(e),void A(e,$).then(function(r){var s={ManualAddress:e,LastConnectionMode:o.Manual};I(s,r),Y.connectToServer(s).then(n,t)},t)):void r()})},Y.loginToConnect=function(e,n){return new Promise(function(r,t){return e&&n?void require(["connectservice","cryptojs-md5"],function(o){var s=J(o,n);T({type:"POST",url:"https://connect.emby.media/service/user/authenticate",data:{nameOrEmail:e,password:s},dataType:"json",contentType:"application/x-www-form-urlencoded; charset=UTF-8",headers:{"X-Application":i+"/"+a}}).then(function(e){var n=c.credentials();n.ConnectAccessToken=e.AccessToken,n.ConnectUserId=e.User.Id,c.credentials(n),U(e.User),r(e)},t)}):void t()})},Y.signupForConnect=function(e,n,r,t){return new Promise(function(o,s){return e&&n&&r?t?r!=t?void s({errorCode:"passwordmatch"}):void require(["connectservice","cryptojs-md5"],function(t){var c=J(t,r);T({type:"POST",url:"https://connect.emby.media/service/register",data:{email:e,userName:n,password:c},dataType:"json",contentType:"application/x-www-form-urlencoded; charset=UTF-8",headers:{"X-Application":i+"/"+a,"X-CONNECT-TOKEN":"CONNECT-REGISTER"}}).then(o,function(e){try{return e.json()}catch(n){s()}}).then(function(e){e&&e.Status&&s({errorCode:e.Status})},s)}):void s({errorCode:"passwordmatch"}):void s({errorCode:"invalidinput"})})},Y.getApiClient=function(e){return e.ServerId&&(e=e.ServerId),Z.filter(function(n){var r=n.serverInfo();return!r||r.Id==e})[0]},Y.getUserInvitations=function(){var e=Y.connectToken();if(!e)throw new Error("null connectToken");if(!Y.connectUserId())throw new Error("null connectUserId");var n="https://connect.emby.media/service/servers?userId="+Y.connectUserId()+"&status=Waiting";return T({type:"GET",url:n,dataType:"json",headers:{"X-Connect-UserToken":e,"X-Application":i+"/"+a}})},Y.deleteServer=function(e){if(!e)throw new Error("null serverId");var n=c.credentials().Servers.filter(function(n){return n.Id==e});return n=n.length?n[0]:null,new Promise(function(r){function t(){var n=c.credentials();n.Servers=n.Servers.filter(function(n){return n.Id!=e}),c.credentials(n),r()}if(!n.ConnectServerId)return void t();var o=Y.connectToken(),s=Y.connectUserId();if(!o||!s)return void t();var d="https://connect.emby.media/service/serverAuthorizations?serverId="+n.ConnectServerId+"&userId="+s;T({type:"DELETE",url:d,headers:{"X-Connect-UserToken":o,"X-Application":i+"/"+a}}).then(t,t)})},Y.rejectServer=function(e){var n=Y.connectToken();if(!e)throw new Error("null serverId");if(!n)throw new Error("null connectToken");if(!Y.connectUserId())throw new Error("null connectUserId");var r="https://connect.emby.media/service/serverAuthorizations?serverId="+e+"&userId="+Y.connectUserId();return fetch(r,{method:"DELETE",headers:{"X-Connect-UserToken":n,"X-Application":i+"/"+a}})},Y.acceptServer=function(e){var n=Y.connectToken();if(!e)throw new Error("null serverId");if(!n)throw new Error("null connectToken");if(!Y.connectUserId())throw new Error("null connectUserId");var r="https://connect.emby.media/service/ServerAuthorizations/accept?serverId="+e+"&userId="+Y.connectUserId();return T({type:"GET",url:r,headers:{"X-Connect-UserToken":n,"X-Application":i+"/"+a}})},Y.getRegistrationInfo=function(e,n){var t,o={serverId:n.serverInfo().Id,deviceId:Y.deviceId(),deviceName:d,appName:i,appVersion:a,embyUserName:""},s="regInfo-"+o.serverId,c=JSON.parse(r.getItem(s)||"{}");if(o.deviceId&&(new Date).getTime()-(c.lastValidDate||0)<2592e5){if(c.deviceId==o.deviceId)return Promise.resolve();t=T({url:"http://mb3admin.com/admin/service/registration/updateDevice?"+S({serverId:o.serverId,oldDeviceId:c.deviceId,newDeviceId:o.deviceId}),type:"POST"})}return t||(t=Promise.resolve()),t.then(function(){return n.getCurrentUser().then(function(e){return o.embyUserName=e.Name,T({url:"http://mb3admin.com/admin/service/registration/validateDevice?"+S(o),type:"POST"}).then(function(e){var n=e.status;return 200==n?(r.setItem(s,JSON.stringify({lastValidDate:(new Date).getTime(),deviceId:o.deviceId})),Promise.resolve()):401==n?Promise.reject():403==n?Promise.reject("overlimit"):Promise.reject()},function(e){throw e})})})},Y.createPin=function(){var e={type:"POST",url:P("pin"),data:{deviceId:u},dataType:"json"};return H(e),T(e)},Y.getPinStatus=function(e){var n={deviceId:e.DeviceId,pin:e.Pin},r={type:"GET",url:P("pin")+"?"+S(n),dataType:"json"};return H(r),T(r)},Y.exchangePin=function(e){return K(e).then(function(e){var n=c.credentials();return n.ConnectAccessToken=e.AccessToken,n.ConnectUserId=e.UserId,c.credentials(n),E(n)})},Y};return{ConnectionState:t,ConnectionMode:o,ServerInfo:s,ConnectionManager:c}});