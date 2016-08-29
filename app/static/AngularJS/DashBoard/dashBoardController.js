registrationModule.controller('dashBoardController', function ($scope, alertFactory, $rootScope, localStorageService, $route, dashBoardRepository) {

    $scope.init = function () {
        $scope.sumatoriaCitas();



        Morris.Donut({
            element: 'morris-donut-cotizaciones',
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
                    colors: ['#78D8D0', '#A1F6B6', '#FAF99F'],
                });
            }
        }, function (error) {
            alertFactory.error('No se pudo recuperar información de las citas');
        });
    }
});