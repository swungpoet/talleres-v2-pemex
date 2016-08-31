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
                $scope.ordengarantia = $scope.registroOrdenes[0].total;
                $scope.ordencertificado = $scope.registroOrdenes[1].total;
                $scope.ordencustodia = $scope.registroOrdenes[2].total;
                $scope.ordenterminado = $scope.registroOrdenes[3].total;
                $scope.ordenproceso = $scope.registroOrdenes[4].total;
                $scope.obtenPorcentaje();
                if (ordenes.data.length > 0) {
                    alertFactory.success('Datos encontrados');
                } else {
                    alertFactory.info('No se encontraron datos');
                }
            }, function (error) {
                alertFactory.error('Error al obtener los datos');
            });
        }

        //obtiene el procentaje de las ordenes
    $scope.obtenPorcentaje = function () {
    var totalOrdenes = $scope.ordengarantia+$scope.ordencertificado+$scope.ordencustodia+$scope.ordenterminado+$scope.ordenproceso;
    $scope.porcentajegarantia = ($scope.ordengarantia*100)/totalOrdenes;
    $scope.porcentajecertificado = ($scope.ordencertificado*100)/totalOrdenes;
    $scope.porcentajecustodia = ($scope.ordencustodia*100)/totalOrdenes;
    $scope.porcentajeterminado = ($scope.ordenterminado*100)/totalOrdenes;
    $scope.porcentajeproceso = ($scope.ordenproceso*100)/totalOrdenes;
        }   

});