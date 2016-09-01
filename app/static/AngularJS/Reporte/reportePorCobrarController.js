// -- =============================================
// -- Author:      Carlos Adolfo Martinez Diosdado
// -- Create date: 30/08/2016
// -- Description: Reporte Cita controller
// -- =============================================

registrationModule.controller('reportePorCobrarController', function ($scope, alertFactory, $rootScope, localStorageService, reportePorCobrarRepository) {

    //Inicializa la pagina
    $scope.init = function () {
    	$scope.getNumeroPorCobrar();
    }
    //obtiene el total de las ordenes por cobrar
    $scope.getNumeroPorCobrar = function () {
            reportePorCobrarRepository.getNumPorCobrar().then(function (porcobrar) {
                $scope.registroPorcobrar = porcobrar.data;
                if (porcobrar.data.length > 0) {
                    alertFactory.success('Datos encontrados');
                } else {
                    alertFactory.info('No se encontraron datos');
                }
            }, function (error) {
                alertFactory.error('Error al obtener los datos');
            });
        }

});