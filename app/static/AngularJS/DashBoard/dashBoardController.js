registrationModule.controller('dashBoardController', function ($scope, alertFactory, $rootScope, localStorageService, $route, dashBoardRepository) {
    $scope.zonaSelected = null;
    $scope.tarSelected = null;
    $scope.totalCitas = 0;
    $scope.totalCotizaciones = 0;
    $scope.totalOrdenes = 0;

    $scope.init = function () {
        $scope.devuelveZonas();
        $scope.devuelveTars();
        $scope.sumatoriaCitas();
        $scope.sumatoriaCotizaciones();
        $scope.sumatoriaOrdenes();

        Morris.Donut({
            element: 'morris-donut-cobrar',
            data: [{
                    label: "Download Sales",
                    value: 12
                },
                {
                    label: "In-Store Sales",
                    value: 30
                },
                {
                    label: "Mail-Order Sales",
                    value: 20
                }],
            resize: true,
            colors: ['#F33535', '#D8E9F0', '#33425B'],
        });
    }

    $scope.sumatoriaCitas = function () {
        dashBoardRepository.getTotalCitas($scope.tarSelected).then(function (datos) {
            if (datos.data.length > 0) {
                $('#morris-donut-citas').empty();
                var agendadas = 0;
                var confirmadas = 0;
                var canceladas = 0;
                datos.data.forEach(function (sumatoria) {
                        if (sumatoria.estatus == 'AGENDADA') agendadas = sumatoria.total;
                        if (sumatoria.estatus == 'CONFIRMADA') confirmadas = sumatoria.total;
                        if (sumatoria.estatus == 'CANCELADA') canceladas = sumatoria.total;
                    }

                );

                $scope.totalCitas = agendadas + confirmadas + canceladas;

                Morris.Donut({
                    element: 'morris-donut-citas',
                    data: [
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
                    colors: ['#591FCE', '#0C9CEE', '#3DBDC2'],
                }).on('click', function (i, row) {
                    location.href = '/reportecita?tipoCita=' + i;
                });
            }
        }, function (error) {
            alertFactory.error('No se pudo recuperar información de las citas');
        });
    }

    $scope.sumatoriaCotizaciones = function () {
        dashBoardRepository.getTotalCotizaciones($scope.tarSelected).then(function (cotizaciones) {
            if (cotizaciones.data.length > 0) {
                $('#morris-donut-cotizaciones').empty();
                var pendientes = 0;
                var autorizadas = 0;
                var rechazadas = 0;
                cotizaciones.data.forEach(function (sumatoria) {
                    if (sumatoria.estatus == 'PENDIENTES') pendientes = sumatoria.total;
                    if (sumatoria.estatus == 'AUTORIZADAS') autorizadas = sumatoria.total;
                    if (sumatoria.estatus == 'RECHAZADAS') rechazadas = sumatoria.total;
                });

                $scope.totalCotizaciones = pendientes + autorizadas + rechazadas;

                Morris.Donut({
                    element: 'morris-donut-cotizaciones',
                    data: [{
                            label: "Pendientes",
                            value: pendientes
                },
                        {
                            label: "Autorizadas",
                            value: autorizadas
                },
                        {
                            label: "Rechazadas",
                            value: rechazadas
                }],
                    resize: true,
                    colors: ['#FE7187', '#CA4B7C', '#7A2E7A'],
                }).on('click', function (i, row) {

                });
            }
        }, function (error) {
            alertFactory.error('No se pudo recuperar información de las cotizaciones');
        });
    }

    $scope.devuelveZonas = function () {
        dashBoardRepository.getZonas().then(function (zonas) {
            if (zonas.data.length > 0) {
                $scope.zonas = zonas.data;

            }
        }, function (error) {
            alertFactory.error('No se pudo recuperar información de las citas');
        });
    }

    $scope.devuelveTars = function () {
        dashBoardRepository.getTars($scope.zonaSelected).then(function (tars) {
            if (tars.data.length > 0) {
                $scope.tars = tars.data;

            }
        }, function (error) {
            alertFactory.error('No se pudo recuperar información de las citas');
        });
    }

    $scope.getDashBoard = function () {
        $scope.sumatoriaCitas();
        $scope.sumatoriaCotizaciones();
        $scope.sumatoriaOrdenes();
    }

    $scope.sumatoriaOrdenes = function () {
        dashBoardRepository.getTotalOrdenes($scope.tarSelected).then(function (ordenes) {
            if (ordenes.data.length > 0) {
                $('#morris-donut-ordenes').empty();
                var proceso = 0;
                var terminados = 0;
                var custodia = 0;
                var conformidad = 0;
                var garantia = 0;

                ordenes.data.forEach(function (sumatoria) {
                        if (sumatoria.estatus == 'EN PROCESO') proceso = sumatoria.total;
                        if (sumatoria.estatus == 'TERMINADOS') terminados = sumatoria.total;
                        if (sumatoria.estatus == 'T. CUSTODIA') custodia = sumatoria.total;
                        if (sumatoria.estatus == 'C. CONFORMIDAD') conformidad = sumatoria.total;
                        if (sumatoria.estatus == 'EN GARANTIA') garantia = sumatoria.total;
                    }

                );

                $scope.totalOrdenes = proceso + terminados + custodia + conformidad + garantia;

                Morris.Donut({
                    element: 'morris-donut-ordenes',
                    data: [
                        {
                            label: "En proceso",
                            value: proceso
                        },
                        {
                            label: "Terminados",
                            value: terminados
                        },
                        {
                            label: "T. custodia",
                            value: custodia
                        },
                        {
                            label: "C. conformidad",
                            value: conformidad
                        },
                        {
                            label: "En garantía",
                            value: garantia
                        }
                    ],
                    resize: true,
                    colors: ['#591FCE', '#0C9CEE', '#3DBDC2', '#EB76FF', '#FFA8EC'],
                }).on('click', function (i, row) {

                });
            }
        }, function (error) {
            alertFactory.error('No se pudo recuperar información de las citas');
        });
    }

});