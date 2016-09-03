registrationModule.controller('dashBoardController', function ($scope, alertFactory, $rootScope, localStorageService, $route, dashBoardRepository) {
    $scope.zonaSelected = null;
    $scope.tarSelected = null;
    $scope.totalCitas = 0;
    $scope.totalCotizaciones = 0;
    $scope.totalOrdenes = 0;
    $scope.totalOrdenesPorCobrar = 0;
    $scope.userData = localStorageService.get('userData');

    $scope.init = function () {
        $scope.devuelveZonas();
        $scope.sumatoriaCitas();
        $scope.sumatoriaCotizaciones();
        $scope.sumatoriaOrdenes();
        $scope.sumatoriaOrdenesPorCobrar();
    }

    $scope.sumatoriaCitas = function () {
        dashBoardRepository.getTotalCitas($scope.tarSelected, $scope.userData.idUsuario, $scope.zonaSelected).then(function (datos) {
            if (datos.data.length > 0) {
                $('#morris-donut-citas').empty();
                var solicitadas = 0;
                var agendadas = 0;
                var confirmadas = 0;
                var canceladas = 0;

                $scope.citas = datos.data;
                $scope.totalHorasCitas = 0;

                datos.data.forEach(function (sumatoria) {
                        if (sumatoria.estatus == 'Solicitadas') solicitadas = sumatoria.total;
                        if (sumatoria.estatus == 'Agendadas') agendadas = sumatoria.total;
                        if (sumatoria.estatus == 'Confirmadas') confirmadas = sumatoria.total;
                        if (sumatoria.estatus == 'Canceladas') canceladas = sumatoria.total;

                        $scope.totalHorasCitas = $scope.totalHorasCitas + sumatoria.promedio;

                    }

                );

                $scope.totalCitas = solicitadas + agendadas + confirmadas + canceladas;

                Morris.Donut({
                    element: 'morris-donut-citas',
                    data: [
                        {
                            label: "Solicitadas",
                            value: solicitadas
                        },
                        {
                            label: "Agendadas",
                            value: agendadas
                        },
                        {
                            label: "Confirmadas",
                            value: confirmadas
                        },
                        {
                            label: "Canceladas",
                            value: canceladas
                        }
                    ],
                    resize: true,
                    colors: ['#591FCE', '#0C9CEE', '#3DBDC2', '#A1F480'],
                }).on('click', function (i, row) {
                    location.href = '/reportecita?tipoCita=' + i + '&idZona=' + $scope.zonaSelected + '&idTar=' + $scope.tarSelected;
                });
            }
        }, function (error) {
            alertFactory.error('No se pudo recuperar información de las citas');
        });
    }

    $scope.sumatoriaCotizaciones = function () {
        dashBoardRepository.getTotalCotizaciones($scope.zonaSelected, $scope.tarSelected, $scope.userData.idUsuario).then(function (cotizaciones) {
            if (cotizaciones.data.length > 0) {
                $('#morris-donut-cotizaciones').empty();
                var pendientes = 0;
                var sinCotizacion = 0;

                $scope.cotizacionesD = cotizaciones.data;
                $scope.totalHorasCotizaciones = 0;

                cotizaciones.data.forEach(function (sumatoria) {
                    if (sumatoria.estatus == 'Pendientes') pendientes = sumatoria.total;
                    if (sumatoria.estatus == 'Espera Cotización') sinCotizacion = sumatoria.total;

                    $scope.totalHorasCotizaciones = $scope.totalHorasCotizaciones + sumatoria.promedio;
                });
                                

                $scope.totalCotizaciones = pendientes + sinCotizacion;

                Morris.Donut({
                    element: 'morris-donut-cotizaciones',
                    data: [{
                            label: "Pendientes",
                            value: pendientes
                },
                        {
                            label: "Espera Cotización",
                            value: sinCotizacion
                }],
                    resize: true,
                    colors: ['#FE7187', '#CA4B7C', '#7A2E7A'],
                }).on('click', function (i, row) {
                    location.href = '/reportecotizacion?tipoCotizacion=' + i + '&idZona=' + $scope.zonaSelected + '&idTar=' + $scope.tarSelected;
                });
            }
        }, function (error) {
            alertFactory.error('No se pudo recuperar información de las cotizaciones');
        });
    }

    $scope.devuelveZonas = function () {
        dashBoardRepository.getZonas($scope.userData.idUsuario).then(function (zonas) {
            if (zonas.data.length > 0) {
                $scope.zonas = zonas.data;

            }
        }, function (error) {
            alertFactory.error('No se pudo recuperar información de las citas');
        });
    }

    $scope.devuelveTars = function () {
        dashBoardRepository.getTars($scope.zonaSelected, $scope.userData.idUsuario, $scope.zonaSelected).then(function (tars) {
            if (tars.data.length > 0) {
                $scope.tars = tars.data;

            }
        }, function (error) {
            alertFactory.error('No se pudo recuperar información de las citas');
        });

        $scope.sumatoriaCitas();
        $scope.sumatoriaCotizaciones();
        $scope.sumatoriaOrdenes();
        $scope.sumatoriaOrdenesPorCobrar();
    }

    $scope.getDashBoard = function () {
        $scope.sumatoriaCitas();
        $scope.sumatoriaCotizaciones();
        $scope.sumatoriaOrdenes();
        $scope.sumatoriaOrdenesPorCobrar();
    }

    $scope.sumatoriaOrdenes = function () {
        dashBoardRepository.getTotalOrdenes($scope.zonaSelected, $scope.tarSelected, $scope.userData.idUsuario).then(function (ordenes) {
            if (ordenes.data.length > 0) {
                $('#morris-donut-ordenes').empty();
                var proceso = 0;
                var terminados = 0;
                var custodia = 0;
                var conformidad = 0;
                var garantia = 0;

                $scope.ordenesServicio = ordenes.data;
                $scope.totalHorasOrdenesServicio = 0;

                ordenes.data.forEach(function (sumatoria) {
                        if (sumatoria.estatus == 'En Proceso') proceso = sumatoria.total;
                        if (sumatoria.estatus == 'Terminados') terminados = sumatoria.total;
                        if (sumatoria.estatus == 'T. Custodia') custodia = sumatoria.total;
                        if (sumatoria.estatus == 'C. Conformidad') conformidad = sumatoria.total;
                        if (sumatoria.estatus == 'En Garantía') garantia = sumatoria.total;

                        $scope.totalHorasOrdenesServicio = $scope.totalHorasOrdenesServicio + sumatoria.promedio;
                    }

                );

                $scope.totalOrdenes = proceso + terminados + custodia + conformidad + garantia;

                Morris.Donut({
                    element: 'morris-donut-ordenes',
                    data: [
                        {
                            label: "En Garantía",
                            value: garantia
                        },
                        {
                            label: "C. Conformidad",
                            value: conformidad
                        },
                        {
                            label: "T. Custodia",
                            value: custodia
                        },
                        {
                            label: "Terminados",
                            value: terminados
                        },
                        {
                            label: "En Proceso",
                            value: proceso
                        }
                    ],
                    resize: true,
                    colors: ['#65AFFF', '#333333', '#666666', '#FAFAFA', '#FFC300'],
                }).on('click', function (i, row) {
                    location.href = '/reporteorden?tipoOrden=' + i + '&idZona=' + $scope.zonaSelected + '&idTar=' + $scope.tarSelected;
                });
            }
        }, function (error) {
            alertFactory.error('No se pudo recuperar información de las ordenes');
        });
    }

    $scope.sumatoriaOrdenesPorCobrar = function () {
        dashBoardRepository.getTotalOrdenesPorCobrar($scope.zonaSelected, $scope.tarSelected, $scope.userData.idUsuario).then(function (ordenesCobrar) {
            if (ordenesCobrar.data.length > 0) {
                $('#morris-donut-cobrar').empty();
                var sinFactura = 0;
                var revision = 0;
                var esperaCopade = 0;

                $scope.ordenesCobrarD = ordenesCobrar.data;
                $scope.totalHorasOrdenesCobrar = 0;

                ordenesCobrar.data.forEach(function (sumatoria) {
                        if (sumatoria.estatus == 'Sin Factura') sinFactura = sumatoria.total;
                        if (sumatoria.estatus == 'Sin Copade') esperaCopade = sumatoria.total;                        
                        /*if (sumatoria.estatus == 'ESPERA COPADE') revision = sumatoria.total;*/
                        $scope.totalHorasOrdenesCobrar = $scope.totalHorasOrdenesCobrar + sumatoria.promedio;
                    }

                );

                $scope.totalOrdenesPorCobrar = sinFactura + revision + esperaCopade;

                Morris.Donut({
                    element: 'morris-donut-cobrar',
                    data: [
                        {
                            label: "Sin Factura",
                            value: sinFactura
                        },
                        /*{
                            label: "EN REVISION",
                            value: revision
                        },*/
                        {
                            label: "Sin Copade",
                            value: esperaCopade
                        }
                    ],
                    resize: true,
                    colors: ['#591FCE', '#0C9CEE', '#3DBDC2'],
                }).on('click', function (i, row) {
                    location.href = '/reporteporcobrar?tipoPorCobrar=' + i + '&idZona=' + $scope.zonaSelected + '&idTar=' + $scope.tarSelected;
                });
            }
        }, function (error) {
            alertFactory.error('No se pudo recuperar información de las ordenes por cobrar');
        });
    }

});