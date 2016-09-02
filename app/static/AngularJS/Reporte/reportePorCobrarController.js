// -- =============================================
// -- Author:      Carlos Adolfo Martinez Diosdado
// -- Create date: 30/08/2016
// -- Description: Reporte Cita controller
// -- =============================================

registrationModule.controller('reportePorCobrarController', function ($scope, alertFactory, $rootScope, localStorageService, reportePorCobrarRepository) {
    $scope.userData = localStorageService.get('userData');

    //Inicializa la pagina
    $scope.init = function () {
            $scope.obtieneDatoUrl();
            $scope.getNumeroPorCobrar();
        }
        //obtiene el total de las ordenes por cobrar
    $scope.getNumeroPorCobrar = function () {
        reportePorCobrarRepository.getNumPorCobrar().then(function (porcobrar) {
            $scope.registroPorcobrar = porcobrar.data;

            porcobrar.data.forEach(function (sumatoria) {
                if (sumatoria.estatus == 'SIN FACTURA') $scope.cobrarsinfactura = sumatoria.total;
                if (sumatoria.estatus == 'SIN COPADE') $scope.cobrarsincopade = sumatoria.total;
            });
            $scope.obtenPorcentaje();
            if (porcobrar.data.length > 0) {
                alertFactory.success('Datos encontrados');
            } else {
                alertFactory.info('No se encontraron datos');
            }
        }, function (error) {
            alertFactory.error('Error al obtener los datos');
        });
    }

    //obtiene el procentaje de las ordenes por cobrar
    $scope.obtenPorcentaje = function () {
        var totalPorCobrar = $scope.cobrarsinfactura + $scope.cobrarsincopade;
        $scope.porcentajesinfactura = ($scope.cobrarsinfactura * 100) / totalPorCobrar;
        $scope.porcentajecopade = ($scope.cobrarsincopade * 100) / totalPorCobrar;
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
        $scope.tipoPorCobrar = urlObj.tipoPorCobrar;
        if ($scope.tipoPorCobrar == 0) {
            $scope.ordensinFactura();
        } else if ($scope.tipoPorCobrar == 1) {
            $scope.ordensinCopade();
        } else {
            $scope.ordensinFactura();
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
                        title: 'OrdenesPorCobrarRegistradas'
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

    //Muestra el historico de ordenes sin copade
    $scope.ordensinCopade = function () {
        $scope.tipoPorCobrar = 1;
        reportePorCobrarRepository.getHistorialPorCobrar(12, $scope.userData.idUsuario).then(function (sincopade) {
            $('.dataTableSinCopade').DataTable().destroy();
            $scope.datasincopade = sincopade.data;
            waitDrawDocument("dataTableSinCopade");
            if (sincopade.data.length > 0) {
                alertFactory.success('Exito al obtener las copades pendientes');
            } else {
                alertFactory.info('No se encontraron las copades pendientes');
            }
        }, function (error) {
            alertFactory.error('Error al obtener los datos');
        });
    }

    //Muestra el historico de ordenes sin factura
    $scope.ordensinFactura = function () {
        $scope.tipoPorCobrar = 0;
        reportePorCobrarRepository.getHistorialPorCobrar(11, $scope.userData.idUsuario).then(function (sinfactura) {
            $('.dataTableSinFactura').DataTable().destroy();
            $scope.datasinfactura = sinfactura.data;
            waitDrawDocument("dataTableSinFactura");
            if (sinfactura.data.length > 0) {
                alertFactory.success('Exito al obtener las facturas pendientes');
            } else {
                alertFactory.info('No se encontraron las facturas pendientes');
            }
        }, function (error) {
            alertFactory.error('Error al obtener los datos');
        });
    }

});