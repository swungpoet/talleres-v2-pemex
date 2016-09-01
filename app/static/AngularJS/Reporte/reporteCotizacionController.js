// -- =============================================
// -- Author:      Carlos Adolfo Martinez Diosdado
// -- Create date: 30/08/2016
// -- Description: Reporte Cita controller
// -- =============================================

registrationModule.controller('reporteCotizacionController', function ($scope, alertFactory, $rootScope, localStorageService, reporteCotizacionRepository) {

    //Inicializa la pagina
    $scope.init = function () {
        $scope.obtieneDatoUrl();
    	$scope.getNumeroCotizaciones();
    }
    //obtiene el total de las cotizaciones
    $scope.getNumeroCotizaciones = function () {
            reporteCotizacionRepository.getNumCotizacion().then(function (cotizaciones) {
                $scope.registroCotizaciones = cotizaciones.data;

                cotizaciones.data.forEach(function (sumatoria) {
                    if (sumatoria.estatus == 'PENDIENTES') $scope.cotizacionaprovacion = sumatoria.total;
                    if (sumatoria.estatus == 'SIN COTIZACION') $scope.sincotizacion = sumatoria.total;
                });
                $scope.obtenPorcentaje();
                if (cotizaciones.data.length > 0) {
                    alertFactory.success('Datos encontrados');
                } else {
                    alertFactory.info('No se encontraron datos');
                }
            }, function (error) {
                alertFactory.error('Error al obtener los datos');
            });
        }

        //obtiene el procentaje de las cotizaciones
    $scope.obtenPorcentaje = function () {
            var totalCotizacion = $scope.cotizacionaprovacion + $scope.sincotizacion;
            $scope.porcentajeaprovacion = ($scope.cotizacionaprovacion * 100) / totalCotizacion;
            $scope.porcentajecotizacion = ($scope.sincotizacion * 100) / totalCotizacion;
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
        $scope.tipoCotizacion = urlObj.tipoCotizacion;
        if ($scope.tipoCotizacion == 0) {
            $scope.cotizacionPendiente();
        } else if ($scope.tipoCotizacion == 1) {
           $scope.cotizacionSinCotizar();
        } else {
            $scope.cotizacionSinCotizar();
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
                        title: 'CotizacionesRegistradas'
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
            //Muestra el historico de citas canceldas
    $scope.cotizacionSinCotizar = function () {
            $scope.tipoCotizacion = 1;
            reporteCotizacionRepository.getHistorialCotizacion().then(function (sincotizar) {
                $('.dataTableSinCotizar').DataTable().destroy();
                $scope.datasincotizacion = sincotizar.data;
                waitDrawDocument("dataTableSinCotizar");
                if (sincotizar.data.length > 0) {
                    alertFactory.success('Exito al obtener citas canceladas');
                } else {
                    alertFactory.info('No se encontraron citas canceladas');
                }
            }, function (error) {
                alertFactory.error('Error al obtener los datos');
            });
        }
        //Muestra el historico de citas confirmadas
    $scope.cotizacionPendiente = function () {
            $scope.tipoCotizacion = 0;
            reporteCotizacionRepository.getHistorialCotizacion().then(function (pendiente) {
                $('.dataTablePendiente').DataTable().destroy();
                $scope.datapendiente = pendiente.data;
                waitDrawDocument("dataTablePendiente");
                if (pendiente.data.length > 0) {
                    alertFactory.success('Exito al obtener citas confirmadas');
                } else {
                    alertFactory.info('No se encontraron citas confirmadas');
                }
            }, function (error) {
                alertFactory.error('Error al obtener los datos');
            });
        }   

});