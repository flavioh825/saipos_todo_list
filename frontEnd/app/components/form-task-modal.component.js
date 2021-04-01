angular.module('formTaskModalComponent', [])
  .component('formTaskModal', { 
    template: `
    <div class="modal fade" id="formTarefa" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Nova Tarefa</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="alert alert-success" role="alert" ng-if="formSuccessAlert">
                  Salvo com sucesso!
                </div>
                <div class="alert alert-danger" role="alert" ng-if="formErrorAlert">
                  Algo deu errado.
                </div>
                <form name="taskForm" ng-submit="saveTask()">
                  <div class="form-group">
                    <label>Tarefa</label>
                    <input type="text" ng-model="task.description" class="form-control" required />
                  </div>
                  <div class="form-group">
                    <label>
                      Digite seu e-mail
                      <i class="fas fa-check" ng-show="emailValid" style="color: #28a745"></i>
                      <div class="spinner-border spinner-border-sm text-primary" ng-if="validating" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </label>
                    <input 
                      type="text" 
                      ng-model="task.email"
                      ng-blur="checkEmail()" 
                      class="form-control" 
                      required />
                    <div class="alert alert-danger mt-1" role="alert" ng-if="!emailValid && invalidMailMessage !== null">
                      Email inválido. Você quis dizer: {{ invalidMailMessage }}
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Nome do responsável</label>
                    <input type="text" ng-model="task.owner" class="form-control" required />
                  </div>
                  <button type="submit" ng-disabled="taskForm.$invalid || !emailValid" class="btn btn-primary btn-lg btn-block">
                    <i class="fas fa-plus"></i>
                    Adicionar tarefa
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>
    `,
    bindings: {
      task: '<',
      refreshList: '&'
    },
    controller: function($scope, $http) {
      const BASE_URL = `http://localhost:3333/api/v1`;

      $scope.task = {};
      $scope.emailValid = null;
      $scope.invalidMailMessage = null;
      $scope.formSuccessAlert = null;
      $scope.formErrorAlert = null;

      $scope.saveTask = () => {
        $http.post(`${BASE_URL}/tasks`, $scope.task).then(res => {
          this.refreshList();
          $scope.formSuccessAlert = true;
          $scope.formErrorAlert = false;
          $scope.task = {}
          $scope.emailValid = null;
        }).catch(err => {
          console.log(err);
          $scope.formSuccessAlert = false;
          $scope.formErrorAlert = true;
        });
      }

      $scope.checkEmail = () => {
        if($scope.task.email === undefined) return
        $scope.validating = true;
  
        $http.post(`${BASE_URL}/tasks/email/${$scope.task.email}`).then(res => {
          $scope.validating = false;
          $scope.emailValid = true;
          $scope.invalidMailMessage = null;
        }).catch(err => {
          $scope.validating = false;
          $scope.emailValid = false
          $scope.invalidMailMessage = err.data.did_you_mean;
        });
      }
    }
  }
);