registrationModule.controller('resumenReclamacionController', function ($scope, $route, $modal, $rootScope, localStorageService, alertFactory, globalFactory, uploadRepository, resumenReclamacionRepository, dashBoardRepository, reporteReclamacionRepository) {
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
        $scope.cantidadTotal = 0;
        var data1 = {};
        var estructura = {};
        var zona1 = {};
        var zona2 = {};
        var zona3 = {};
        var zona4 = {};

        var anexo1N = [];
        var anexo2N = [];
        var anexo3N = [];

        var anexo1C = [];
        var anexo2C = [];
        var anexo3C = [];

        var anexo1P = [];
        var anexo2P = [];
        var anexo3P = [];

        var anexo1G = [];
        var anexo2G = [];
        var anexo3G = [];


			$('.dataTableResumen').DataTable().destroy();
	        resumenReclamacionRepository.getResumen().then(function (result) {
	            if (result.data.length > 0) {
	                $scope.resumenes = result.data;
					waitDrawDocument("dataTableResumen", "Resumen Certificados");
                    alertFactory.success('Resumen encontrado correctamente');
                    $scope.anexosInfo = result.data;
                    for (var i = 0; i < $scope.anexosInfo.length; i++) {
                        $scope.cantidadTotal += ($scope.anexosInfo[i].Total);
                            if($scope.anexosInfo[i].idZona == 1){
                                if($scope.anexosInfo[i].anexo1 == 1){
                                    var data1 = {
                                                "zona":result.data[i].zona,
                                                "TAR":result.data[i].TAR,
                                                "cantidad1":result.data[i].cantidad1,
                                                "precio1":result.data[i].precio1
                                        } 
                                    anexo1N.push(data1);
                                }
                                if($scope.anexosInfo[i].anexo2 == 2){
                                    var data1 = {
                                                "zona":result.data[i].zona,
                                                "TAR":result.data[i].TAR,
                                                "cantidad2":result.data[i].cantidad2,
                                                "precio2":result.data[i].precio2
                                        } 
                                    anexo2N.push(data1);
                                }
                                if($scope.anexosInfo[i].anexo3 == 3){
                                    var data1 = {
                                                "zona":result.data[i].zona,
                                                "TAR":result.data[i].TAR,
                                                "cantidad3":result.data[i].cantidad3,
                                                "precio3":result.data[i].precio3
                                        } 
                                    anexo3N.push(data1);
                                }
                            } 
                            if($scope.anexosInfo[i].idZona == 2){
                                if($scope.anexosInfo[i].anexo1 == 1){
                                    var data1 = {
                                                "zona":result.data[i].zona,
                                                "TAR":result.data[i].TAR,
                                                "cantidad1":result.data[i].cantidad1,
                                                "precio1":result.data[i].precio1
                                        } 
                                    anexo1C.push(data1);
                                }
                                if($scope.anexosInfo[i].anexo2 == 2){
                                    var data1 = {
                                                "zona":result.data[i].zona,
                                                "TAR":result.data[i].TAR,
                                                "cantidad2":result.data[i].cantidad2,
                                                "precio2":result.data[i].precio2
                                        } 
                                    anexo2C.push(data1);
                                }
                                if($scope.anexosInfo[i].anexo3 == 3){
                                    var data1 = {
                                                "zona":result.data[i].zona,
                                                "TAR":result.data[i].TAR,
                                                "cantidad3":result.data[i].cantidad3,
                                                "precio3":result.data[i].precio3
                                        } 
                                    anexo3C.push(data1);
                                }
                            }
                            if($scope.anexosInfo[i].idZona == 3){
                                if($scope.anexosInfo[i].anexo1 == 1){
                                    var data1 = {
                                                "zona":result.data[i].zona,
                                                "TAR":result.data[i].TAR,
                                                "cantidad1":result.data[i].cantidad1,
                                                "precio1":result.data[i].precio1
                                        } 
                                    anexo1P.push(data1);
                                }
                                if($scope.anexosInfo[i].anexo2 == 2){
                                    var data1 = {
                                                "zona":result.data[i].zona,
                                                "TAR":result.data[i].TAR,
                                                "cantidad2":result.data[i].cantidad2,
                                                "precio2":result.data[i].precio2
                                        } 
                                    anexo2P.push(data1);
                                }
                                if($scope.anexosInfo[i].anexo3 == 3){
                                    var data1 = {
                                                "zona":result.data[i].zona,
                                                "TAR":result.data[i].TAR,
                                                "cantidad3":result.data[i].cantidad3,
                                                "precio3":result.data[i].precio3
                                        } 
                                    anexo3P.push(data1);
                                }
                            }
                            if($scope.anexosInfo[i].idZona == 4){
                                if($scope.anexosInfo[i].anexo1 == 1){
                                    var data1 = {
                                                "zona":result.data[i].zona,
                                                "TAR":result.data[i].TAR,
                                                "cantidad1":result.data[i].cantidad1,
                                                "precio1":result.data[i].precio1
                                        } 
                                    anexo1G.push(data1);
                                }
                                if($scope.anexosInfo[i].anexo2 == 2){
                                    var data1 = {
                                                "zona":result.data[i].zona,
                                                "TAR":result.data[i].TAR,
                                                "cantidad2":result.data[i].cantidad2,
                                                "precio2":result.data[i].precio2
                                        } 
                                    anexo2G.push(data1);
                                }
                                if($scope.anexosInfo[i].anexo3 == 3){
                                    var data1 = {
                                                "zona":result.data[i].zona,
                                                "TAR":result.data[i].TAR,
                                                "cantidad3":result.data[i].cantidad3,
                                                "precio3":result.data[i].precio3
                                        } 
                                    anexo3G.push(data1);
                                }
                            }      
                    }
                                    var zona1 = {
                                        "anexo1": anexo1N,
                                        "anexo2": anexo2N,
                                        "anexo3": anexo3N
                                    }  
                                    var zona2 = {
                                        "anexo1": anexo1C,
                                        "anexo2": anexo2C,
                                        "anexo3": anexo3C
                                    }  
                                    var zona3 = {
                                        "anexo1": anexo1P,
                                        "anexo2": anexo2P,
                                        "anexo3": anexo3P
                                    }  
                                    var zona4 = {
                                        "anexo1": anexo1G,
                                        "anexo2": anexo2G,
                                        "anexo3": anexo3G
                                    }  

                        var estructura = {
                            "zona1": zona1,
                            "zona2": zona2,
                            "zona3": zona3,
                            "zona4": zona4
                        }  
	            }
	        }, function (error) {
	            alertFactory.error('No se pudo recuperar información de las zonas');
	        });
    }

    $scope.verResumen = function (resumen) {
    	localStorageService.set('objResumen', resumen); 
		location.href = '/reporteReclamacion';
    }

    $scope.callAnexos = function () {
        $scope.jsonDataAnexo1 = undefined;
        $scope.jsonDataAnexo2 = undefined;
        $scope.jsonDataAnexo3 = undefined;
        ///////////////////////////////////
        $scope.anexos1 = '';
        $scope.anexos2 = '';
        $scope.anexos3 = '';
        ///////////////////////////////////
        $scope.Anexo1(null,null,1);
        $scope.Anexo2(null,null,2);
        $scope.Anexo3(null,null,3);
    }

    $scope.Anexo1 = function (idZona, idTar, anexo) {
            $('.dataTableAnexo1').DataTable().destroy();
        reporteReclamacionRepository.getAnexos(idZona, idTar, anexo).then(function (result) {
            if (result.data.length > 0) {       
            }
        }, function (error) {
            alertFactory.error('Error al recuperar la informacion solicitada');
        });
    }

    $scope.Anexo2 = function (idZona, idTar, anexo) {
            $('.dataTableAnexo2').DataTable().destroy();
        reporteReclamacionRepository.getAnexos(idZona, idTar, anexo).then(function (result) {
            if (result.data.length > 0) {

            }
        }, function (error) {
            alertFactory.error('Error al recuperar la informacion solicitada');
        });
    }  

    $scope.Anexo3 = function (idZona, idTar, anexo) {
            $('.dataTableAnexo3').DataTable().destroy();
        reporteReclamacionRepository.getAnexos(idZona, idTar, anexo).then(function (result) {
            if (result.data.length > 0) {

            }
        }, function (error) {
            alertFactory.error('Error al recuperar la informacion solicitada');
        });
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