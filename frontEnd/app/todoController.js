angular.module('todo', ['formTaskModalComponent', 'redoTaskModalComponent'])
  .controller('todoCtrl', ($scope, $http) => {

    const BASE_URL = `http://localhost:3333/api/v1`;

    $scope.task = {};

    $scope.catFactsList = [];
    $scope.validating = false; // spinner
    $scope.successMessage = { success: false, message: "" };
    $scope.errorMessage = { error: false, message: "" };

    $scope.listTasks = () => {
      $scope.catFactsList = [];
      $http.get(`${BASE_URL}/tasks`).then(response => {
        $scope.taskListPending = response.data.filter(task => task.done === null);
        $scope.taskListCompleted = response.data.filter(task => task.done !== null);
      }).catch(err => {
        console.log(err);
      });
    }

    $scope.selectTask = (task) => {
      $scope.task = task;
    }

    $scope.resetTask = () => {
      $scope.task = {};
    }

    $scope.completeTask = (id) => {
      $http.post(`${BASE_URL}/tasks/complete/${id}`).then(res => {
        $scope.successMessage = { success: true, message: "Tarefa concluída!" };
        $scope.listTasks();
        setTimeout(() => $scope.successMessage = { success: false, message: "" }, 5000);
      }).catch(err => {
        $scope.errorMessage = { error: true, message: err.error };
        setTimeout(() => $scope.errorMessage = { error: false, message: "" }, 5000);
      });
    }

    $scope.realeaseCatFacts = () => {
      $scope.catFactsList = [];
      $http.get('https://cat-fact.herokuapp.com/facts/random?animal_type=dog&amount=3').then(res => {
        console.log(res.data);
        for(var i = 0; i <= 2; i++) {
          $scope.catFactsList.push({
            description: res.data[i].text,
            owner: 'Eu',
            email: 'eu@me.com'
          });
        }
      }).catch(err => {
        console.log(err);
      });
    }

    $scope.popCatFact = (index) => {
      $scope.catFactsList.splice(index, 1);
    }

    $scope.listTasks();
});