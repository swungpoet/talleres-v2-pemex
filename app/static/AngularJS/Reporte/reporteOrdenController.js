// -- =============================================
// -- Author:      Carlos Adolfo Martinez Diosdado
// -- Create date: 30/08/2016
// -- Description: Reporte Orden controller
// -- =============================================
registrationModule.controller('reporteOrdenController', function ($scope, alertFactory, $rootScope, localStorageService, reporteOrdenRepository) {

    $scope.init = function () {
     $scope.getNumeroOrdenes();
    }
    //obtiene el total de las citas
    $scope.getNumeroOrdenes = function () {
            reporteOrdenRepository.getNumOrdenes().then(function (ordenes) {
                $scope.registroOrdenes = ordenes.data;
                if (ordenes.data.length > 0) {
                    alertFactory.success('Datos encontrados');
                } else {
                    alertFactory.info('No se encontraron datos');
                }
            }, function (error) {
                alertFactory.error('Error al obtener los datos');
            });
        }

});