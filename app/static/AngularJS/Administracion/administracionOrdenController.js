// -- =============================================
// -- Author:      Vladimir Juárez Juárez
// -- Create date: 15/08/2016
// -- Description: Administración Orden controller
// -- Modificó: 
// -- Fecha: 
// -- Modificó: 
// -- Fecha:
// -- =============================================

registrationModule.controller('administracionOrdenController', function ($scope, $route, $rootScope, localStorageService, alertFactory, ordenServicioRepository) {
    //init del controller
    $scope.init = function () {
        
    }

    $scope.getAdmonOrdenes = function(numeroTrabajo){
        ordenServicioRepository.getAdmonOrdenes(numeroTrabajo).then(function(admonOrden){
            if(admonOrden.data.length > 0){
                alertFactory.success("Orden encontrada");
                $scope.admonOrdenes = admonOrden.data;
            }
            else{
                alertFactory.info("No se encontró el número de órden especificado");
            }
        }, function(error){
           alertFactory.error("Error al cargar la orden"); 
        });
    }
});