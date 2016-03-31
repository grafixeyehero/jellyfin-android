define(["jQuery"],function(e){function t(e){var t=a(e),r=l[t];return r||(r=l[t]={query:{SortBy:"SortName",SortOrder:"Ascending",IncludeItemTypes:"Movie",Recursive:!0,Fields:"PrimaryImageAspectRatio,SortName,MediaSourceCount,SyncInfo",ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Banner,Thumb",StartIndex:0,Limit:LibraryBrowser.getDefaultPageSize()},view:LibraryBrowser.getSavedView(t)||LibraryBrowser.getDefaultItemsView("Poster","Poster")},r.query.ParentId=LibraryMenu.getTopParentId(),LibraryBrowser.loadSavedQueryValues(t,r.query)),r}function r(e){return t(e).query}function a(e){return e.savedQueryKey||(e.savedQueryKey=LibraryBrowser.getSavedQueryKey("movies")),e.savedQueryKey}function i(s){Dashboard.showLoadingMsg();var l=Dashboard.getCurrentUserId(),m=r(s),u=t(s).view;ApiClient.getItems(l,m).then(function(l){window.scrollTo(0,0);var d="",y=LibraryBrowser.getQueryPagingHtml({startIndex:m.StartIndex,limit:m.Limit,totalRecordCount:l.TotalRecordCount,showLimit:!1,updatePageSizeSetting:!1,addLayoutButton:!0,sortButton:!0,currentLayout:u,layouts:"Banner,List,Poster,PosterCard,Thumb,ThumbCard,Timeline",filterButton:!0});s.querySelector(".listTopPaging").innerHTML=y,n(s),"Thumb"==u?d=LibraryBrowser.getPosterViewHtml({items:l.Items,shape:"backdrop",preferThumb:!0,lazy:!0,showDetailsMenu:!0,overlayPlayButton:!0}):"ThumbCard"==u?d=LibraryBrowser.getPosterViewHtml({items:l.Items,shape:"backdrop",preferThumb:!0,lazy:!0,showTitle:!0,cardLayout:!0,showYear:!0,showDetailsMenu:!0}):"Banner"==u?d=LibraryBrowser.getPosterViewHtml({items:l.Items,shape:"banner",preferBanner:!0,lazy:!0,showDetailsMenu:!0}):"List"==u?d=LibraryBrowser.getListViewHtml({items:l.Items,sortBy:m.SortBy}):"Poster"==u?d=LibraryBrowser.getPosterViewHtml({items:l.Items,shape:"portrait",centerText:!0,lazy:!0,showDetailsMenu:!0,overlayPlayButton:!0}):"PosterCard"==u?d=LibraryBrowser.getPosterViewHtml({items:l.Items,shape:"portrait",showTitle:!0,showYear:!0,lazy:!0,cardLayout:!0,showDetailsMenu:!0}):"Timeline"==u&&(d=LibraryBrowser.getPosterViewHtml({items:l.Items,shape:"portrait",showTitle:!0,timeline:!0,centerText:!0,lazy:!0,showDetailsMenu:!0}));var c=s.querySelector(".itemsContainer");c.innerHTML=d+y,ImageLoader.lazyChildren(c),e(".btnNextPage",s).on("click",function(){m.StartIndex+=m.Limit,i(s)}),e(".btnPreviousPage",s).on("click",function(){m.StartIndex-=m.Limit,i(s)}),e(".btnChangeLayout",s).on("layoutchange",function(e,o){"Timeline"==o&&(r(s).SortBy="ProductionYear,PremiereDate,SortName",r(s).SortOrder="Descending"),t(s).view=o,LibraryBrowser.saveViewSetting(a(s),o),i(s)}),e(".btnFilter",s).on("click",function(){o(s)}),e(".btnSort",s).on("click",function(){LibraryBrowser.showSortMenu({items:[{name:Globalize.translate("OptionNameSort"),id:"SortName"},{name:Globalize.translate("OptionBudget"),id:"Budget,SortName"},{name:Globalize.translate("OptionImdbRating"),id:"CommunityRating,SortName"},{name:Globalize.translate("OptionCriticRating"),id:"CriticRating,SortName"},{name:Globalize.translate("OptionDateAdded"),id:"DateCreated,SortName"},{name:Globalize.translate("OptionDatePlayed"),id:"DatePlayed,SortName"},{name:Globalize.translate("OptionMetascore"),id:"Metascore,SortName"},{name:Globalize.translate("OptionParentalRating"),id:"OfficialRating,SortName"},{name:Globalize.translate("OptionPlayCount"),id:"PlayCount,SortName"},{name:Globalize.translate("OptionReleaseDate"),id:"PremiereDate,SortName"},{name:Globalize.translate("OptionRevenue"),id:"Revenue,SortName"},{name:Globalize.translate("OptionRuntime"),id:"Runtime,SortName"},{name:Globalize.translate("OptionVideoBitrate"),id:"VideoBitRate,SortName"}],callback:function(){i(s)},query:m})}),LibraryBrowser.saveQueryValues(a(s),m),LibraryBrowser.setLastRefreshed(s),Dashboard.hideLoadingMsg()})}function o(e){require(["components/filterdialog/filterdialog"],function(t){var a=new t({query:r(e),mode:"movies"});Events.on(a,"filterchange",function(){i(e)}),a.show()})}function n(t){var a=r(t);e(".alphabetPicker",t).alphaValue(a.NameStartsWithOrGreater)}function s(t){e(".alphabetPicker",t).on("alphaselect",function(e,a){var o=r(t);o.NameStartsWithOrGreater=a,o.StartIndex=0,i(t)}).on("alphaclear",function(){var e=r(t);e.NameStartsWithOrGreater="",i(t)}),e(".itemsContainer",t).on("needsrefresh",function(){i(t)})}var l={};window.MoviesPage.initMoviesTab=function(e,t){s(t)},window.MoviesPage.renderMoviesTab=function(e,t){LibraryBrowser.needsRefresh(t)&&(i(t),n(t))}});