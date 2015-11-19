"use strict";angular.module("mytodoApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.sortable","LocalStorageModule"]).config(["localStorageServiceProvider",function(a){a.setPrefix("ls")}]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),angular.module("mytodoApp").controller("MainCtrl",["$scope","localStorageService",function(a,b){var c=b.get("todos");a.todos=c||[],a.$watch("todo",function(){},!0),a.$watch("todos",function(){b.set("todos",a.todos)},!0),a.addTodo=function(){a.todos.push(a.todo),a.todo=""},a.removeTodo=function(b){a.todos.splice(b,1)},a.copy=function(){function b(a){var b=document.createElement("textarea");b.style.position="fixed",b.style.top=0,b.style.left=0,b.style.width="2em",b.style.height="2em",b.style.padding=0,b.style.border="none",b.style.outline="none",b.style.boxShadow="none",b.style.background="transparent",b.value=a,document.body.appendChild(b),b.select();try{var c=document.execCommand("copy"),d=c?"successful":"unsuccessful";console.log("Copying text command was "+d)}catch(e){console.log("Oops, unable to copy")}document.body.removeChild(b)}for(var c="",d=0;d<a.todos.length;d++)c=a.todos[d]+"\n"+c;b(c)},a.splitter=function(){a.isSplitterShow?a.isSplitterShow=!1:a.isSplitterShow=!0},a.splitterSave=function(){a.todos=a.todos.concat(splitter.value.split("\n")),splitter.value=[]}}]),angular.module("mytodoApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("mytodoApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<div class="container"> <form role="form" ng-submit="addTodo()"> <div class="row"> <div class="input-group"> <input type="text" ng-model="todo" placeholder="What needs to be done?" class="form-control"> <span class="input-group-btn"> <input type="submit" class="btn btn-primary" value="Add"> </span> </div> </div> </form> <h2>My todos</h2> <button class="btn btn-info" ng-click="copy()" aria-label="Copy all todo">Copy All</button> <button ng-class="isSplitterShow?\'btn btn-danger\':\'btn btn-info\'" ng-click="splitter()" aria-label="Splitter">Add by line break</button> <div ng-show="isSplitterShow" class="form-group"> <textarea id="splitter" class="form-control" placeholder="Type mutiple line content"></textarea> <span class="form-group-btn"> <button class="btn btn-primary" ng-click="splitterSave()" aria-label="Remove">Split and Save</button> </span> </div> <div ui-sortable ng-model="todos"> <p class="input-group" ng-repeat="todo in todos track by $index" style="padding:5px 10px; cursor:move"> <input type="text" ng-model="todo" class="form-control"> <span class="input-group-btn"> <button class="btn btn-danger" ng-click="removeTodo($index)" aria-label="Remove">X</button> </span> </p> </div> </div>')}]);