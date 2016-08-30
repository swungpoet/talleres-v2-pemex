// -- =============================================
// -- Author:      Carlos Adolfo Martinez Diosdado
// -- Create date: 30/08/2016
// -- Description: Reporte Cita controller
// -- =============================================

registrationModule.controller('reporteCitaController', function ($scope, alertFactory, $rootScope, localStorageService, reporteCitaRepository) {

    $scope.init = function () {
     $scope.getNumeroCitas();
    }

    //OBTIENE EL TOTAL DE CITAS
    $scope.getNumeroCitas = function () {
      reporteCitaRepository.getNumCita().then(function (citas) {
            $scope.registroCitas = citas.data;
            $scope.citasagendadas = $scope.registroCitas[0].total;
            $scope.citasconfirmadas = $scope.registroCitas[1].total;
            $scope.citascanceladas = $scope.registroCitas[2].total;
            if (citas.data.length > 0) {
                alertFactory.success('Datos encontrados');
            } else {
                alertFactory.info('No se encontraron datos');
            }
        }, function (error) {
            alertFactory.error('Error al obtener los datos');
        });
    }

});