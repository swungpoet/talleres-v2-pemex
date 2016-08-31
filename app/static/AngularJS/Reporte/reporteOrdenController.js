// -- =============================================
// -- Author:      Carlos Adolfo Martinez Diosdado
// -- Create date: 30/08/2016
// -- Description: Reporte Orden controller
// -- =============================================
registrationModule.controller('reporteOrdenController', function ($scope, alertFactory, $rootScope, localStorageService, reporteOrdenRepository) {

    $scope.init = function () {
     $scope.getNumeroOrdenes();
     $scope.obtieneDatoUrl();
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

            //Muestra el historico de ordenes en Proceso
    $scope.ordenProceso = function () {
            $scope.tipoOrden = 4;
   				reporteOrdenRepository.getHistorialOrden(5).then(function (ordenproces) {
   				$('.dataTableProceso').DataTable().destroy();
                $scope.proceso = ordenproces.data;
                waitDrawDocument("dataTableProceso");
                if (ordenproces.data.length > 0) {
                    alertFactory.success('Exito al obtener ordenes en proceso');
                } else {
                    alertFactory.info('No se encontraron ordenes en proceso');
                }
            }, function (error) {
                alertFactory.error('Error al obtener los datos');
            });
        }
        //Muestra el historico de ordenes Terminadas
    $scope.ordenTerminada = function () {
            $scope.tipoOrden = 3;
                reporteOrdenRepository.getHistorialOrden(7).then(function (ordentermina) {
                $('.dataTableTerminada').DataTable().destroy();
                $scope.terminada = ordentermina.data;
                waitDrawDocument("dataTableTerminada");
                if (ordentermina.data.length > 0) {
                    alertFactory.success('Exito al obtener ordenes terminadas');
                } else {
                    alertFactory.info('No se encontraron ordenes terminadas');
                }
            }, function (error) {
                alertFactory.error('Error al obtener los datos');
            });
        }
        //Muestra el historico de ordenes Transferencia Custodia
    $scope.ordenCustodia = function () {
        $scope.tipoOrden = 2;
            reporteOrdenRepository.getHistorialOrden(14).then(function (ordencustodia) {
            	$('.dataTableCustodia').DataTable().destroy();
                $scope.custodia = ordencustodia.data;
                waitDrawDocument("dataTableCustodia");
                if (ordencustodia.data.length > 0) {
                    alertFactory.success('Exito al obtener transferencia de custodia');
                } else {
                    alertFactory.info('No se encontraron transferencia de custodia');
                }
            }, function (error) {
                alertFactory.error('Error al obtener los datos');
            });
    }
            //Muestra el historico de ordenes certificado Conformidad
    $scope.ordenCertificado = function () {
            $scope.tipoOrden = 1;
                reporteOrdenRepository.getHistorialOrden().then(function (ordenconformidad) {
                $('.dataTableCertificado').DataTable(17).destroy();
                $scope.conformidad = ordenconformidad.data;
                waitDrawDocument("dataTableCertificado");
                if (ordenconformidad.data.length > 0) {
                    alertFactory.success('Exito al obtener certificado de conformidad');
                } else {
                    alertFactory.info('No se encontraron certificado de conformidad');
                }
            }, function (error) {
                alertFactory.error('Error al obtener los datos');
            });
        }
        
                //Muestra el historico de ordnes en garantia
    $scope.ordenGarantia = function () {
        $scope.tipoOrden = 0;
            reporteOrdenRepository.getHistorialOrden(23).then(function (ordengarantia) {
            	$('.dataTableGarantia').DataTable().destroy();
                $scope.garantia = ordengarantia.data;
                waitDrawDocument("dataTableGarantia");
                if (ordengarantia.data.length > 0) {
                    alertFactory.success('Exito al obtener ordenes en garantia');
                } else {
                    alertFactory.info('No se encontraron ordenes en garantia');
                }
            }, function (error) {
                alertFactory.error('Error al obtener los datos');
            });
    }

        //Regresa la variable de la url
    $scope.obtieneDatoUrl = function () {
        var url = location.search.replace("?", "");
        var arrUrl = url.split("&");
        var urlObj = {};
        for (var i = 0; i < arrUrl.length; i++) {
            var x = arrUrl[i].split("=");
            urlObj[x[0]] = x[1]
        }
        $scope.tipoOrden = urlObj.tipoOrden;
        if($scope.tipoOrden==0){
      		$scope.ordenGarantia();
        }else if($scope.tipoOrden==1){
            $scope.ordenCertificado();	
        }else if($scope.tipoOrden==2){
            $scope.ordenCustodia();		
        }else if($scope.tipoOrden==3){
            $scope.ordenTerminada();
        }else if($scope.tipoOrden==4){
            $scope.ordenProceso();
        }else{
        	$scope.ordenProceso();
        }
    }

        //espera que el documento se pinte para llenar el dataTable
    var waitDrawDocument = function (dataTable) {
        setTimeout(function () {
            $('.' + dataTable).DataTable({
                dom: '<"html5buttons"B>lTfgitp',
                buttons: [
                    {
                        extend: 'copy'
                    },
                    {
                        extend: 'csv'
                    },
                    {
                        extend: 'excel',
                        title: 'OrdenesRegistradas'
                    },
                    {
                        extend: 'pdf',
                        title: 'OrdenesRegistradas'
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