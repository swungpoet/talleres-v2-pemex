registrationModule.controller('dashBoardController', function ($scope, alertFactory, $rootScope, localStorageService, $route, dashBoardRepository) {
    $scope.zonaSelected = null;
    $scope.tarSelected = null;

    $scope.init = function () {
        $scope.devuelveZonas();
        $scope.devuelveTars();
        $scope.sumatoriaCitas();
        $scope.sumatoriaCotizaciones();


        Morris.Donut({
            element: 'morris-donut-ordenes',
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
            colors: ['#F9ED69', '#F08A5D', '#B83B5E'],
        });

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
                    resize: false,
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
        dashBoardRepository.getTotalCotizaciones().then(function (cotizaciones) {
            if (cotizaciones.data.length > 0) {
                var pendientes = 0;
                var autorizadas = 0;
                var rechazadas = 0;
                cotizaciones.data.forEach(function (sumatoria) {
                    if (sumatoria.estatus == 'PENDIENTES') pendientes = sumatoria.total;
                    if (sumatoria.estatus == 'AUTORIZADAS') autorizadas = sumatoria.total;
                    if (sumatoria.estatus == 'RECHAZADAS') rechazadas = sumatoria.total;
                });

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
                    alert(i);
                });
            }
        }, function (error) {
            alertFactory.error('No se pudo recuperar información de las citas');
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
    }

});