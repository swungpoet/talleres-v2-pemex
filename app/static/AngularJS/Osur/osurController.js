// -- ==================================================================================
// -- CREATE AUTH: Uriel Godínez Martínez
// -- CREATE DATE: 07/06/2016
// -- CREATE DESC: Controlador para el mantenimiento de las Osur por TAR
// -- ==================================================================================

registrationModule.controller('osurController', function ($scope, alertFactory, osurRepository) {
    $scope.presupuesto = '0.00';
    $scope.saldo = '0.00';
    $scope.gasto = '0.00';
    $scope.conTar = false;

    $scope.init = function () {
        getTARS();
    }

    var getTARS = function () {
        osurRepository.getTars().then(function (tars) {
            if (tars.data.length > 0) {
                $scope.tars = tars.data;
                //alertFactory.success("Trabajos cargados");
            } else {
                alertFactory.info("No se encontro ninguna TAR");
            }
        }, function (error) {
            alertFactory.error("Error al cargar las TAR");
        });
    }

    $scope.GetMonto = function () {
        if ($scope.selectedTar == null) {
            $scope.conTar = false;
            alertFactory.info("Debe seleccionar una TAR");
        } else {
            $scope.conTar = true;
            osurRepository.getDatosOsur($scope.selectedTar.idTAR).then(function (result) {
                    if (result.data.length > 0) {
                        $scope.presupuesto = result.data[0].presupuesto;
                        $scope.gasto = result.data[0].gasto;
                        $scope.saldo = result.data[0].saldo;
                    } else {
                        $scope.presupuesto = '0.00';
                        $scope.saldo = '0.00';
                        $scope.gasto = '0.00';
                        alertFactory.info("No se pudo obtener la Osur");
                    }
                },
                function (error) {
                    alertFactory.error("Error al obtener la Osur");
                });
        }
    }
});