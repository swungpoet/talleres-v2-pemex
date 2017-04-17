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
        $scope.anexos4 = '';
		$scope.Anexo1($scope.zona,$scope.tar,1);
		$scope.Anexo2($scope.zona,$scope.tar,2);
		$scope.Anexo3($scope.zona,$scope.tar,3);
        $scope.Anexo4($scope.zona,$scope.tar,4);
    }

    $scope.Anexo1 = function (idZona, idTar, anexo) {
            $scope.cantidad1 = 0;
            $scope.noReportes1 = 0;
            $scope.diaMax1 = 0;
            $('.dataTableAnexo1').DataTable().destroy();
        reporteReclamacionRepository.getAnexos(idZona, idTar, anexo).then(function (result) {
            if (result.data.length > 0) {
            	$scope.anexos1 = result.data;
            	waitDrawDocument("dataTableAnexo1", "Anexo1");	
                $scope.noReportes1 = $scope.anexos1.length;
                $scope.diaMax1 = $scope.anexos1[0].DiasAtraso;
                for (var i = 0; i < $scope.anexos1.length; i++) {
                    $scope.cantidad1 += ($scope.anexos1[i].precioOrden);     
                }
            }
        }, function (error) {
            alertFactory.error('Error al recuperar la informacion solicitada');
        });
    }

    $scope.Anexo2 = function (idZona, idTar, anexo) {
            $scope.cantidad2 = 0;
            $scope.noReportes2 = 0;
            $scope.diaMax2 = 0;
            $('.dataTableAnexo2').DataTable().destroy();
        reporteReclamacionRepository.getAnexos(idZona, idTar, anexo).then(function (result) {
            if (result.data.length > 0) {   	
            	$scope.anexos2 = result.data;
                waitDrawDocument("dataTableAnexo2", "Anexo2");
                $scope.noReportes2 = $scope.anexos2.length;
                $scope.diaMax2 = $scope.anexos2[0].DiasAtraso;
                for (var i = 0; i < $scope.anexos2.length; i++) {
                    $scope.cantidad2 += ($scope.anexos2[i].precioOrden);     
                }
            	
            }
        }, function (error) {
            alertFactory.error('Error al recuperar la informacion solicitada');
        });
    }

    $scope.Anexo3 = function (idZona, idTar, anexo) {
            $scope.cantidad3 = 0;
            $scope.noReportes3 = 0;
            $scope.diaMax3 = 0;
            $('.dataTableAnexo3').DataTable().destroy();
        reporteReclamacionRepository.getAnexos(idZona, idTar, anexo).then(function (result) {
            if (result.data.length > 0) {
            	$scope.anexos3 = result.data;
            	waitDrawDocument("dataTableAnexo3", "Anexo3");
                $scope.noReportes3 = $scope.anexos3.length;
                $scope.diaMax3 = $scope.anexos3[0].DiasAtraso;
                for (var i = 0; i < $scope.anexos3.length; i++) {
                    $scope.cantidad3 += ($scope.anexos3[i].precioOrden);     
                }
            }
        }, function (error) {
            alertFactory.error('Error al recuperar la informacion solicitada');
        });
    }  

    $scope.Anexo4 = function (idZona, idTar, anexo) {
            $scope.cantidad4 = 0;
            $scope.noReportes4 = 0;
            $scope.diaMax4 = 0;
            $('.dataTableAnexo4').DataTable().destroy();
        reporteReclamacionRepository.getAnexos(idZona, idTar, anexo).then(function (result) {
            if (result.data.length > 0) {
                $scope.anexos4 = result.data;
                waitDrawDocument("dataTableAnexo4", "Anexo4");
                $scope.noReportes4 = $scope.anexos4.length;
                $scope.diaMax4 = $scope.anexos4[0].DiasAtraso;
                for (var i = 0; i < $scope.anexos4.length; i++) {
                    $scope.cantidad4 += ($scope.anexos4[i].precioOrden);     
                }
            }
        }, function (error) {
            alertFactory.error('Error al recuperar la informacion solicitada');
        });
    }  

    $scope.reporteReclamacion = function () {
        if (($scope.zona != undefined && $scope.zona != null) && ($scope.tar != undefined && $scope.tar != null)) {
                $scope.class_buttonReclamacion = 'fa fa-spinner fa-spin';
                    reporteReclamacionRepository.getInfoAnexos($scope.zona, $scope.tar,$scope.cantidad1,$scope.noReportes1,$scope.diaMax1,$scope.cantidad2,$scope.noReportes2,$scope.diaMax2,$scope.cantidad3,$scope.noReportes3,$scope.diaMax3,$scope.cantidad4,$scope.noReportes4,$scope.diaMax4).then(function (result) {
                    //$('.dataTableAnexo3').DataTable().destroy();
                    if (result.data.length > 0) {
                        result.data[0].noReportes1 == 0 ? result.data[0].noReportes1 = "" : result.data[0].noReportes1;
                        result.data[0].noReportes2 == 0 ? result.data[0].noReportes2 = "" : result.data[0].noReportes2;
                        result.data[0].noReportes3 == 0 ? result.data[0].noReportes3 = "" : result.data[0].noReportes3;
                        result.data[0].noReportes4 == 0 ? result.data[0].noReportes4 = "" : result.data[0].noReportes4;
                    var data = {
                    "reclamacion": 
                        {
                            "idReclamacion":result.data[0].idReclamacion,
                            "noReportes1":result.data[0].noReportes1,
                            "cantidad1":result.data[0].cantidad1,
                            "diaMax1":result.data[0].diaMax1,
                            "noReportes2":result.data[0].noReportes2,
                            "cantidad2":result.data[0].cantidad2,
                            "diaMax2":result.data[0].diaMax2,
                            "noReportes3":result.data[0].noReportes3,
                            "cantidad3":result.data[0].cantidad3,
                            "diaMax3":result.data[0].diaMax3,
                            "noReportes4":result.data[0].noReportes4,
                            "cantidad4":result.data[0].cantidad4,
                            "diaMax4":result.data[0].diaMax4,
                            "noReporte":result.data[0].noReporte,
                            "fechaLarga":result.data[0].fechaLarga,
                            "personaPemex":result.data[0].personaPemex,
                            "personaPemexA":result.data[0].personaPemexA,
                            "tar":result.data[0].TAR,
                            "representanteLegal":result.data[0].representanteLegal,
                            "nombreSAD":result.data[0].nombreSAD,
                            "nombreGAD":result.data[0].nombreGAD,
                            "letraGAD":result.data[0].zona,
                            "nombreTAD":result.data[0].nombreTAD
                        }
                    }   
                }   
   
                var jsonData = {
                    "template": {
                        "name": "reclamacion_rpt" 
                    },
                    "data": data
                }

                        reporteReclamacionRepository.callExternalPdf(jsonData).then(function (result) {               
                            setTimeout(function () {
                                  var url = $rootScope.vIpServer + result.data;
                                  var a = document.createElement('a');
                                  a.href = url;
                                  a.download = 'reporteReclamacion';
                                  //a.target = '_blank';
                                  a.click();
                                     $scope.$apply( function () { 
                                        $scope.class_buttonReclamacion = 'glyphicon glyphicon-ok';
                                     });
                                  
                               //  location.href = '/tallercita';
                             }, 5000);                          
                        });
                   
                }, function (error) {
                    alertFactory.error('Error al recuperar la informacion solicitada');
                });
        }else{
        	alertFactory.info('Para generar el reporte de reclamacion es necesario seleccionar una TAR');
        }
    }

        //espera que el documento se pinte para llenar el dataTable
    var waitDrawDocument = function (dataTable, title) {
        setTimeout(function () {
            var indicePorOrdenar = 0;
            if (dataTable == 'dataTableAnexo1') {
                indicePorOrdenar = 11;
            } else if (dataTable == 'dataTableAnexo2') {
                indicePorOrdenar = 11;
            } else if (dataTable == 'dataTableAnexo3') {
                indicePorOrdenar = 12;
            } else if (dataTable == 'dataTableAnexo4') {
                indicePorOrdenar = 11;
            } else {
                indicePorOrdenar = 11;
            }

            $('.' + dataTable).DataTable({
                order: [[indicePorOrdenar, 'desc']],
                dom: '<"html5buttons"B>lTfgitp',
                "iDisplayLength": 5,
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