'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mytodoApp
 */
 angular.module('mytodoApp')
   .controller('MainCtrl', function ($scope, localStorageService) {

     var todosInStore = localStorageService.get('todos');

     $scope.todos = todosInStore || [];


          $scope.$watch('todo', function () {
         //console.log("Todo changed!!");
          }, true);

          $scope.$watch('todos', function () {
            localStorageService.set('todos', $scope.todos);
          }, true);

          $scope.addTodo = function () {
            $scope.todos.push($scope.todo);
            $scope.todo = '';
          };

          $scope.removeTodo = function (index) {
            $scope.todos.splice(index, 1);
          };

          $scope.copy = function(){
            function copyTextToClipboard(text) {
           var textArea = document.createElement("textarea");

           textArea.style.position = 'fixed';
           textArea.style.top = 0;
           textArea.style.left = 0;

           textArea.style.width = '2em';
           textArea.style.height = '2em';

           textArea.style.padding = 0;

           textArea.style.border = 'none';
           textArea.style.outline = 'none';
           textArea.style.boxShadow = 'none';

           textArea.style.background = 'transparent';


           textArea.value = text;

           document.body.appendChild(textArea);

           textArea.select();

           try {
           var successful = document.execCommand('copy');
           var msg = successful ? 'successful' : 'unsuccessful';
           console.log('Copying text command was ' + msg);
           } catch (err) {
           console.log('Oops, unable to copy');
           }

           document.body.removeChild(textArea);
           }
           
           var todosToString="";
           for(var todoIndex=0;todoIndex<$scope.todos.length ;todoIndex++){
             todosToString=$scope.todos[todoIndex]+"\n" +todosToString ;
              }
          copyTextToClipboard(todosToString);

          }

          $scope.splitter = function(){

            if($scope.isSplitterShow){$scope.isSplitterShow=false;}
            else{$scope.isSplitterShow=true;}
          }


          $scope.splitterSave = function(){

            $scope.todos=$scope.todos.concat(splitter.value.split("\n"));
            splitter.value=[];
          }

   });
