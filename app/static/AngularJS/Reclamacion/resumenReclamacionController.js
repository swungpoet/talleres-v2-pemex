registrationModule.controller('resumenReclamacionController', function ($scope, $route, $modal, $rootScope, localStorageService, alertFactory, globalFactory, uploadRepository, resumenReclamacionRepository, dashBoardRepository) {
    $scope.userData = localStorageService.get('userData');


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

    $scope.callResumen = function () {
    	$scope.statusResumen();
    }

    $scope.statusResumen = function () {
			$('.dataTableResumen').DataTable().destroy();
	        resumenReclamacionRepository.getResumen().then(function (result) {
	            if (result.data.length > 0) {
	                $scope.resumenes = result.data;
					waitDrawDocument("dataTableResumen", "Resumen Certificados");
                    alertFactory.success('Resumen encontrado correctamente');
	            }
	        }, function (error) {
	            alertFactory.error('No se pudo recuperar información de las zonas');
	        });
    }

    $scope.verResumen = function (resumen) {
    	localStorageService.set('objResumen', resumen); 
		location.href = '/reporteReclamacion';
    }
        //espera que el documento se pinte para llenar el dataTable
    var waitDrawDocument = function (dataTable, title) {
        setTimeout(function () {
            var indicePorOrdenar = 0;
            if (dataTable == 'dataTableResumen') {
                indicePorOrdenar = 8;
            } else {
                indicePorOrdenar = 8;
            }

            $('.' + dataTable).DataTable({
                order: [[indicePorOrdenar, 'desc']],
                dom: '<"html5buttons"B>lTfgitp',
                "iDisplayLength": 100,
                buttons: [
                    {
                        extend: 'excel',
                        title: title
                    },
                    {
                        extend: 'print',
                        customize: function (win) {
                            $(win.document.body).addClass('white-bg');
                            $(win.document.body).css('font-size', '10px');

                            $(win.document.body).find('table')
                                .addClass('compact')
                                .css('font-size', 'inherit');
                        }
                    }
                ]
            });
        }, 2500);
    }

});