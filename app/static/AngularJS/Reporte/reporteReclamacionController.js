// -- =============================================
// -- Author:      Carlos Adolfo Martinez Diosdado
// -- Create date: 30/03/2017
// -- Description: Reporte Cita controller
// -- =============================================

registrationModule.controller('reporteReclamacionController', function ($scope, alertFactory, $rootScope, localStorageService, reporteReclamacionRepository, dashBoardRepository, globalFactory) {
    $scope.userData = localStorageService.get('userData');

    //Inicializa la pagina
    $scope.init = function () {
		$scope.devuelveZonas();
    }

        $scope.devuelveTars = function (zona) {
        if (zona != null) {
            dashBoardRepository.getTars(zona).then(function (tars) {
                if (tars.data.length > 0) {
                    $scope.tars = tars.data;

                }
            }, function (error) {
                alertFactory.error('No se pudo recuperar información de las TARs');
            });
        } else {
            $scope.tar = null;
        }
    }

    $scope.devuelveZonas = function () {
        dashBoardRepository.getZonas($scope.userData.idUsuario).then(function (zonas) {
            if (zonas.data.length > 0) {
                $scope.zonas = zonas.data;

            }
        }, function (error) {
            alertFactory.error('No se pudo recuperar información de las zonas');
        });
    }

    $scope.callAnexos = function () {
    	$scope.anexos1 = '';
    	$scope.anexos2 = '';
    	$scope.anexos3 = '';
		$scope.Anexo1($scope.zona,$scope.tar,1);
		$scope.Anexo2($scope.zona,$scope.tar,2);
		$scope.Anexo3($scope.zona,$scope.tar,3);
    }

    $scope.Anexo1 = function (idZona, idTar, anexo) {
        reporteReclamacionRepository.getAnexos(idZona, idTar, anexo).then(function (result) {
        	$('.dataTableAnexo1').DataTable().destroy();
            if (result.data.length > 0) {
            	$scope.anexos1 = result.data;
            	globalFactory.minDrawDocument("dataTableAnexo1", "Anexo1");	
            }
        }, function (error) {
            alertFactory.error('Error al recuperar la informacion solicitada');
        });
    }

    $scope.Anexo2 = function (idZona, idTar, anexo) {
        reporteReclamacionRepository.getAnexos(idZona, idTar, anexo).then(function (result) {
        	$('.dataTableAnexo2').DataTable().destroy();
            if (result.data.length > 0) {   	
            	$scope.anexos2 = result.data;
            	globalFactory.minDrawDocument("dataTableAnexo2", "Anexo2");
            }
        }, function (error) {
            alertFactory.error('Error al recuperar la informacion solicitada');
        });
    }

    $scope.Anexo3 = function (idZona, idTar, anexo) {
        reporteReclamacionRepository.getAnexos(idZona, idTar, anexo).then(function (result) {
        	$('.dataTableAnexo3').DataTable().destroy();
            if (result.data.length > 0) {
            	$scope.anexos3 = result.data;
            	globalFactory.minDrawDocument("dataTableAnexo3", "Anexo3");
            }
        }, function (error) {
            alertFactory.error('Error al recuperar la informacion solicitada');
        });
    }  
    $scope.reporteReclamacion = function () {
        if (($scope.zona != undefined && $scope.zona != null) && ($scope.tar != undefined && $scope.tar != null)) {
			alertFactory.success('Bien');
        }else{
        	alertFactory.info('Para generar el reporte de reclamacion es necesario seleccionar una TAR');
        }
    }
});