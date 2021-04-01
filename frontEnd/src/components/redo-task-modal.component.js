angular.module('redoTaskModalComponent', [])
  .component('redoTaskModal', {
    template: `
    <div class="modal fade" id="redoTask" data-backdrop="static" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Tornar Pendente</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" ng-click="reset()">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <p>Descrição: {{ $ctrl.task.description }}<p>
                <p>Responsável: {{ $ctrl.task.owner }}<p>
                <p>E-mail: {{ $ctrl.task.email }}<p>
                <hr />
                <div class="alert alert-success text-center" role="alert" ng-if="success">
                  <strong>Sucesso!</strong> A tarefa foi movida para a lista de pendentes.
                </div>
                <div class="alert alert-danger text-center" role="alert" ng-if="error">
                  {{errorMessage}}
                </div>                
                <form name="redoForm">
                  <div class="form-group">
                    <label>Digite a senha para efetuar a ação</label>
                    <input type="password" ng-model="redoForm.password" class="form-control" required />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" ng-click="reset()" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" ng-disabled="redoForm.$invalid" ng-click="redoTask()" class="btn btn-primary">Mover para pendente</button>
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

      $scope.redoForm = {}
      $scope.success = false;
      $scope.error = false;
      $scope.errorMessage = null;

      $scope.redoTask = () => {
        let data = {
          id: this.task.id,
          password: $scope.redoForm.password
        }

        $http.post(`${BASE_URL}/tasks/redo`, data).then(res => {
          $scope.success = true;
          $scope.error = false;
          $scope.redoForm = {};
          this.refreshList();
        }).catch(err => {
          $scope.error = true;
          $scope.success = false;
          $scope.errorMessage = err.data.error;
        });
      }

      $scope.reset = () => {
        $scope.success = false;
        $scope.error = false;
        $scope.errorMessage = null;
        $scope.redoForm = {};
        this.task = {};
      }
    }
  });