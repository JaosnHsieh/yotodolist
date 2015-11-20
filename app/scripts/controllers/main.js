'use strict';

angular.module('demoApp')
  .controller('MainCtrl', function ($scope, $timeout ,localStorageService) {
    //select start
    $scope.copySelectMessage='Copy Selected';
    $scope.isCopySelected=false;
    $scope.isSelect = false;
    var selectTextarea = document.getElementById('selectTextarea');

    $scope.copySelect = function(){
        $scope.copySelectMessage='Copy Successfully';
        copyTextToClipboard(selectTextarea.value);
        
        $timeout(function(){
            
        $scope.isCopySelected=false;
        $scope.isSelect = false;
        },1000);

    };
    $scope.select = function(index){
        $scope.isCopySelected=true;
        $scope.isSelect = true;
        console.log('index:'+index);
        selectTextarea.value += $scope.todos[index]+'\n'; 
        
    };
    //select end
    //splitter start
    $scope.isSplitterShow=false;
    $scope.splitter = function(){

            if($scope.isSplitterShow){$scope.isSplitterShow=false;}
            else{$scope.isSplitterShow=true;}
          };


          $scope.splitterSave = function(){
            var splitter = document.getElementById('splitter');
            $scope.todos=$scope.todos.concat(splitter.value.split('\n'));
            splitter.value=[];
          };
    //splitter end
    
    
    //copy start
    $scope.copyMessage='Copy All Lists';
    $scope.isCopy=true;
    $scope.copy = function(){
        
        $scope.isCopy=false;
        $scope.copyMessage='Copied Successfully';
        
        var todosToString;
        //Arrays to String like [1,2,3] to 1,2,3
        todosToString = $scope.todos.join();
        // replace all  by regular expression like str.replace(/str1/g,"str2") 
        todosToString=todosToString.replace(/,/g,'\n');
        copyTextToClipboard(todosToString);
        
    $timeout(function(){
        $scope.copyMessage='Copy All Lists';
        $scope.isCopy=true;

        console.log('timeout success!!');
    },3000);
        
         
    };
    
    function copyTextToClipboard(text) {
  var textArea = document.createElement('textarea');

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
    
    // copy end
    
    var todosInStore = localStorageService.get('todos');

    $scope.todos = todosInStore || [];

    $scope.$watch('todos', function () {
      localStorageService.set('todos', $scope.todos);
    }, true);

    $scope.addTodo = function () {
        if($scope.todo===''){return;}
      $scope.todos.push($scope.todo);
      $scope.todo = '';
    };

    $scope.removeTodo = function (index) {
      $scope.todos.splice(index, 1);
    };

  });