registrationModule.controller('dashBoardController', function ($scope, alertFactory, $rootScope, localStorageService, $route, dashBoardRepository) {

    $scope.init = function () {
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
            colors: ['#87d6c6', '#54cdb4', '#1ab394'],
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
            colors: ['#87d6c6', '#54cdb4', '#1ab394'],
        });
    }

    $scope.sumatoriaCitas = function () {
        dashBoardRepository.getTotalCitas().then(function (datos) {
            if (datos.data.length > 0) {
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
                    data: [{
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
                }],
                    resize: true,
                    colors: ['#591FCE', '#0C9CEE', '#3DBDC2'],
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

    $("#morris-donut-citas").click(function () {
        location.href = '/reportecita';
    });
});