// -- =============================================
// -- Author:      Carlos Adolfo Martinez Diosdado
// -- Create date: 30/08/2016
// -- Description: Reporte Cita controller
// -- =============================================

registrationModule.controller('reporteCotizacionController', function ($scope, alertFactory, $rootScope, localStorageService, reporteCotizacionRepository) {

    //Inicializa la pagina
    $scope.init = function () {
    	$scope.getNumeroCotizaciones();
    }
    //obtiene el total de las cotizaciones
    $scope.getNumeroCotizaciones = function () {
            reporteCotizacionRepository.getNumCotizacion().then(function (cotizaciones) {
                $scope.registroCotizaciones = cotizaciones.data;
                if (cotizaciones.data.length > 0) {
                    alertFactory.success('Datos encontrados');
                } else {
                    alertFactory.info('No se encontraron datos');
                }
            }, function (error) {
                alertFactory.error('Error al obtener los datos');
            });
        }



});