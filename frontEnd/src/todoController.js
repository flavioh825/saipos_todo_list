angular.module('todo', [])
  .controller('todoCtrl', ($scope) => {

    var todoList = this;
    todoList.todos = [
      {description: 'learn AngularJS', done:true, completed: 1},
      {description: 'build an AngularJS app', done:false, completed: 0}];

    todoList.remaining = function() {
        var count = 0;
        angular.forEach(todoList.todos, function(todo) {
          count += todo.done ? 0 : 1;
        });
        return count;
      };

    $scope.nome="flavio"
});