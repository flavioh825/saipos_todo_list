angular.module('todo', [])
  .controller('todoCtrl', ($scope, $http) => {

    const BASE_URL = `http://localhost:3333/api/v1`;
    var tasks = this;

    $scope.task = {};

    $scope.emailValid = null;
    $scope.invalidMailMessage = null;
    $scope.validating = false; // spinner
    $scope.successMessage = { success: false, message: "" };
    $scope.errorMessage = { error: false, message: "" };
    $scope.formSuccessAlert = null;
    $scope.formErrorAlert = null;

    let listTasks = () => {
      $http.get(`${BASE_URL}/tasks`).then(response => {
        $scope.taskList = response.data;
      }).catch(err => {
        console.log(err);
      });
    }

    $scope.saveTask = () => {
      $http.post(`${BASE_URL}/tasks`, $scope.task).then(res => {
        listTasks();
        $scope.formSuccessAlert = true;
        $scope.formErrorAlert = false;
        $scope.task = {}
      }).catch(err => {
        console.log(err);
        $scope.formSuccessAlert = false;
        $scope.formErrorAlert = true;
      });
    }

    $scope.completeTask = (id) => {
      $http.post(`${BASE_URL}/tasks/complete/${id}`).then(res => {
        $scope.successMessage = { success: true, message: "Tarefa concluída!" };
        listTasks();
        setTimeout(() => $scope.successMessage = { success: false, message: "" }, 5000);
      }).catch(err => {
        $scope.errorMessage = { error: true, message: err.error };
        setTimeout(() => $scope.errorMessage = { error: false, message: "" }, 5000);
      });
    }

    $scope.completeTask = (id) => {
      $http.post(`${BASE_URL}/tasks/complete/${id}`).then(res => {
        $scope.successMessage = { success: true, message: "Tarefa concluída!" };
        listTasks();
        setTimeout(() => $scope.successMessage = { success: false, message: "" }, 5000);
      }).catch(err => {
        $scope.errorMessage = { error: true, message: err.error };
        setTimeout(() => $scope.errorMessage = { error: false, message: "" }, 5000);
      });
    }

    $scope.checkEmail = () => {
      if($scope.task.email === undefined) return
      $scope.validating = true;

      $http.post(`${BASE_URL}/tasks/email/${$scope.task.email}`).then(res => {
        $scope.validating = false;
        $scope.emailValid = true;
      }).catch(err => {
        $scope.validating = false;
        $scope.emailValid = false
        $scope.invalidMailMessage = err.data.did_you_mean;
      });
    }
    
    listTasks();
});