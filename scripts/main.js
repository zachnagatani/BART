"use strict";!function(){function t(t){return Array.prototype.slice.call(t)}function e(t){return new Promise(function(e,n){t.onsuccess=function(){e(t.result)},t.onerror=function(){n(t.error)}})}function n(t,n,o){var r,i=new Promise(function(i,a){r=t[n].apply(t,o),e(r).then(i,a)});return i.request=r,i}function o(t,e,o){var r=n(t,e,o);return r.then(function(t){if(t)return new u(t,r.request)})}function r(t,e,n){n.forEach(function(n){Object.defineProperty(t.prototype,n,{get:function(){return this[e][n]}})})}function i(t,e,o,r){r.forEach(function(r){r in o.prototype&&(t.prototype[r]=function(){return n(this[e],r,arguments)})})}function a(t,e,n,o){o.forEach(function(o){o in n.prototype&&(t.prototype[o]=function(){return this[e][o].apply(this[e],arguments)})})}function c(t,e,n,r){r.forEach(function(r){r in n.prototype&&(t.prototype[r]=function(){return o(this[e],r,arguments)})})}function s(t){this._index=t}function u(t,e){this._cursor=t,this._request=e}function l(t){this._store=t}function h(t){this._tx=t,this.complete=new Promise(function(e,n){t.oncomplete=function(){e()},t.onerror=function(){n(t.error)}})}function p(t,e,n){this._db=t,this.oldVersion=e,this.transaction=new h(n)}function f(t){this._db=t}r(s,"_index",["name","keyPath","multiEntry","unique"]),i(s,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),c(s,"_index",IDBIndex,["openCursor","openKeyCursor"]),r(u,"_cursor",["direction","key","primaryKey","value"]),i(u,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(t){t in IDBCursor.prototype&&(u.prototype[t]=function(){var n=this,o=arguments;return Promise.resolve().then(function(){return n._cursor[t].apply(n._cursor,o),e(n._request).then(function(t){if(t)return new u(t,n._request)})})})}),l.prototype.createIndex=function(){return new s(this._store.createIndex.apply(this._store,arguments))},l.prototype.index=function(){return new s(this._store.index.apply(this._store,arguments))},r(l,"_store",["name","keyPath","indexNames","autoIncrement"]),i(l,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getAllKeys","count"]),c(l,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),a(l,"_store",IDBObjectStore,["deleteIndex"]),h.prototype.objectStore=function(){return new l(this._tx.objectStore.apply(this._tx,arguments))},r(h,"_tx",["objectStoreNames","mode"]),a(h,"_tx",IDBTransaction,["abort"]),p.prototype.createObjectStore=function(){return new l(this._db.createObjectStore.apply(this._db,arguments))},r(p,"_db",["name","version","objectStoreNames"]),a(p,"_db",IDBDatabase,["deleteObjectStore","close"]),f.prototype.transaction=function(){return new h(this._db.transaction.apply(this._db,arguments))},r(f,"_db",["name","version","objectStoreNames"]),a(f,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(e){[l,s].forEach(function(n){n.prototype[e.replace("open","iterate")]=function(){var n=t(arguments),o=n[n.length-1],r=(this._store||this._index)[e].apply(this._store,n.slice(0,-1));r.onsuccess=function(){o(r.result)}}})}),[s,l].forEach(function(t){t.prototype.getAll||(t.prototype.getAll=function(t,e){var n=this,o=[];return new Promise(function(r){n.iterateCursor(t,function(t){return t?(o.push(t.value),void 0!==e&&o.length==e?void r(o):void t.continue()):void r(o)})})})});var d={open:function(t,e,o){var r=n(indexedDB,"open",[t,e]),i=r.request;return i.onupgradeneeded=function(t){o&&o(new p(i.result,t.oldVersion,i.transaction))},r.then(function(t){return new f(t)})},delete:function(t){return n(indexedDB,"deleteDatabase",[t])}};"undefined"!=typeof module?module.exports=d:self.idb=d}();var app=angular.module("app",["ui.router","ngAnimate"]),dbPromise=idb.open("bart",2,function(t){switch(t.oldVersion){case 0:var e=t.createObjectStore("keyval");e.put("world","hello");case 1:t.createObjectStore("stations",{keyPath:"$$hashKey"});case 2:t.createObjectStore("pittSFO",{keyPath:"$$hashKey"}),t.createObjectStore("SFOpitt",{keyPath:"$$hashKey"}),t.createObjectStore("fremRich",{keyPath:"$$hashKey"}),t.createObjectStore("richFrem",{keyPath:"$$hashKey"}),t.createObjectStore("richMill",{keyPath:"$$hashKey"}),t.createObjectStore("millRich",{keyPath:"$$hashKey"}),t.createObjectStore("dubDaly",{keyPath:"$$hashKey"}),t.createObjectStore("dalyDub",{keyPath:"$$hashKey"}),t.createObjectStore("fremDaly",{keyPath:"$$hashKey"}),t.createObjectStore("dalyFrem",{keyPath:"$$hashKey"}),t.createObjectStore("colOak",{keyPath:"$$hashKey"}),t.createObjectStore("oakCol",{keyPath:"$$hashKey"})}});!function(){navigator.serviceWorker&&navigator.serviceWorker.register("sw.js").then(function(t){console.log("Service worker registered in scope: "+t.scope)}).catch(function(t){console.log("Do you even serviceworker, bro? Error:"+t)}),app.config(["$stateProvider","$urlRouterProvider",function(t,e){t.state("home",{url:"/home",templateUrl:"templates/home.html",controller:"homeCtrl"}).state("planner",{url:"/planner",templateUrl:"templates/planner.html",controller:"plannerCtrl"}).state("trip",{url:"/trip",templateUrl:"templates/trip.html",controller:"tripCtrl"}).state("schedule",{url:"/schedule",templateUrl:"templates/schedule.html",controller:"scheduleCtrl"}),e.otherwise("/home")}])}(),function(){app.service("apiCalls",["$http",function(t){var e=this;e.makeCall=function(e){return t.get(e)}}]),app.service("xmlToJSON",[function(){var t=this;t.dataToDoc=function(t){return jQuery.parseXML(t)},t.xmlToJSON=function(e){var n={};if(1==e.nodeType){if(e.attributes.length>0){n["@attributes"]={};for(var o=0;o<e.attributes.length;o++){var r=e.attributes.item(o);n["@attributes"][r.nodeName]=r.nodeValue}}}else 3==e.nodeType&&(n=e.nodeValue);if(e.hasChildNodes())for(var i=0;i<e.childNodes.length;i++){var a=e.childNodes.item(i),c=a.nodeName;if("undefined"==typeof n[c])n[c]=t.xmlToJSON(a);else{if("undefined"==typeof n[c].push){var s=n[c];n[c]=[],n[c].push(s)}n[c].push(t.xmlToJSON(a))}}return n}}])}(),function(){app.controller("indexCtrl",["$scope","$rootScope",function(t,e){e.$on("tripEvent",function(e,n){t.trips=n,t.$broadcast("trips",n)})}])}(),function(){app.controller("homeCtrl",["$scope",function(t){}])}(),function(){app.controller("plannerCtrl",["$scope","$filter","$state","apiCalls","xmlToJSON",function(t,e,n,o,r){function i(){t.departureSelected=!0}function a(){t.arrivalSelected=!1}function c(){t.arrivalSelected=!0}function s(){t.timeSelected=!1}function u(t){var n,o=e("date")(t,"hh:mma");return n=o.includes("PM")?"PM":"AM",o=e("date")(t,"hh:mm"),o=o+"+"+n}function l(e){t.time=u(e);var n="https://api.bart.gov/api/sched.aspx?cmd=arrive&orig="+t.departureStation+"&dest="+t.arrivalStation+"&time="+t.time+"&date=now&key=MW9S-E7SL-26DU-VV8V&b=2&a=2&l=1";return n}t.trips=null,t.arrivalSelected=!0,t.timeSelected=!0,t.time=null,t.init=function(){function e(){console.log("There were no stations in IDB... getStationsHTTP has been invoked!"),o.makeCall("https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V").then(function(t){return t.data}).then(function(t){return r.dataToDoc(t)},function(t){Materialize.toast("Please reconnect to the internet",4e3)}).then(function(t){return r.xmlToJSON(t)}).then(function(t){return t.root.stations.station}).then(function(e){dbPromise.then(function(t){var n=t.transaction("stations","readwrite"),o=n.objectStore("stations");e.forEach(function(t){o.put(t)})}),t.stations=e})}function n(){console.log("There were stations in IDB... getStationsIDB has been invoked!"),dbPromise.then(function(t){var e=t.transaction("stations"),n=e.objectStore("stations");return n.getAll()}).then(function(e){t.stations=e}).then(function(){t.$apply()})}dbPromise.then(function(t){var e=t.transaction("stations"),n=e.objectStore("stations");return n.getAllKeys()}).then(function(t){0!==t.length?n():e()})}(),t.reload=function(){n.reload()},t.setDepartureStation=function(e){t.departureStation=e.abbr["#text"],i(),a()},t.setArrivalStation=function(e){return t.arrivalStation=e.abbr["#text"],t.arrivalStation===t.departureStation?void Materialize.toast("Arrival station must be different than departure station",4e3):(c(),void s())},t.getInfo=function(i){var a=l(i),c=e("date")(new Date,"HH:mm:ss"),s=e("date")(i,"HH:mm:ss"),u=new Date("Thu Jan 1 1970 "+c+" GMT-0800").getTime(),h=new Date("Thu Jan 1 1970 "+s+" GMT-0800"),p=new Date(h).getTime();return p<=u?void Materialize.toast("Arrival time cannot be in the past",4e3):void o.makeCall(a).then(function(t){return r.dataToDoc(t.data)},function(t){Materialize.toast("Please reconnect to the internet",4e3)}).then(function(t){return r.xmlToJSON(t)}).then(function(e){t.trips=e.root.schedule.request.trip}).then(function(){t.$emit("tripEvent",t.trips),n.go("trip")})}}])}(),function(){app.controller("tripCtrl",["$scope","$state","$rootScope","$timeout",function(t,e,n,o){function r(){return new Promise(function(e){var n=1;t.trips.forEach(function(t){t.id=n,n++}),$("ul.tabs").tabs(),e()}).then(function(){i()})}function i(){$("#trip1").css("display","block")}!function(){t.trips||e.go("planner")}(),n.$on("trips",function(e,n){t.trips=n}),o(r,1e3)}])}(),function(){app.controller("scheduleCtrl",["$scope","$timeout","apiCalls","xmlToJSON",function(t,e,n,o){!function(){$(".materialboxed").materialbox(),$("ul.tabs").tabs()}(),t.getSchedule=function(e,r){function i(r){console.log("This schedule wasn't in IDB... getScheduleHTTP has been invoked!"),n.makeCall("https://api.bart.gov/api/sched.aspx?cmd=routesched&route="+e+"&key=MW9S-E7SL-26DU-VV8V").then(function(t){return o.dataToDoc(t.data)},function(t){Materialize.toast("Please reconnect to the internet",4e3)}).then(function(t){return o.xmlToJSON(t)}).then(function(t){return t.root.route.train}).then(function(e){dbPromise.then(function(t){var n=t.transaction(r,"readwrite"),o=n.objectStore(r);e.forEach(function(t){o.put(t)})}),t.preload=!1,t.schedule=e})}function a(e){console.log("This schedule was in IDB... getScheduleIDB has been invoked!"),dbPromise.then(function(t){var n=t.transaction(e),o=n.objectStore(e);return o.getAll()}).then(function(e){t.preload=!1,t.schedule=e}).then(function(){t.$apply()})}t.schedule=null,t.preload=!0,dbPromise.then(function(t){var e=t.transaction(r),n=e.objectStore(r);return n.getAllKeys()}).then(function(t){0!==t.length?a(r):i(r)})},t.hideTables=function(){$(".table--schedule").hide()}}])}();